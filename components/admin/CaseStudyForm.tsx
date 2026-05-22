'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/slug';
import RichTextEditor from './RichTextEditor';
import SeoPanel from './SeoPanel';
import FeaturedImagePicker from './FeaturedImagePicker';

export interface CaseStudyFormData {
  id?: string;
  slug: string;
  title: string;
  short_title: string;
  description: string;
  industry: string;
  industry_tag: string;
  revenue: string;
  region: string;
  timeline: string;
  headline_metric: string;
  featured_image_url: string;
  featured_image_alt: string;
  results: { value: string; label: string }[];
  tech_stack: string[];
  challenge_heading: string;
  challenge_content: string;
  challenge_content_json: object | null;
  solution_heading: string;
  solution_content: string;
  solution_content_json: object | null;
  solution_steps: { num: number; text: string }[];
  outcome_heading: string;
  outcome_content: string;
  outcome_content_json: object | null;
  testimonial_quote: string;
  testimonial_attribution: string;
  testimonial_role: string;
  related_slugs: string[];
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_image_url: string;
  status: 'draft' | 'published' | 'archived';
}

const EMPTY: CaseStudyFormData = {
  slug: '', title: '', short_title: '', description: '',
  industry: '', industry_tag: '', revenue: '', region: '', timeline: '', headline_metric: '',
  featured_image_url: '', featured_image_alt: '',
  results: [{ value: '', label: '' }], tech_stack: [],
  challenge_heading: 'The challenge', challenge_content: '', challenge_content_json: null,
  solution_heading: 'The solution', solution_content: '', solution_content_json: null,
  solution_steps: [{ num: 1, text: '' }],
  outcome_heading: 'The outcome', outcome_content: '', outcome_content_json: null,
  testimonial_quote: '', testimonial_attribution: '', testimonial_role: '',
  related_slugs: [],
  meta_title: '', meta_description: '', focus_keyword: '', og_image_url: '',
  status: 'draft',
};

function safeArray<T>(val: any, fallback: T[]): T[] {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try { const p = JSON.parse(val); if (Array.isArray(p)) return p; } catch {}
  }
  return fallback;
}

export default function CaseStudyForm({ initialData, mode }: { initialData?: CaseStudyFormData; mode: 'new' | 'edit' }) {
  const router = useRouter();
  const safeInitial = initialData ? {
    ...initialData,
    results: safeArray(initialData.results, [{ value: '', label: '' }]),
    tech_stack: safeArray(initialData.tech_stack, []),
    solution_steps: safeArray(initialData.solution_steps, [{ num: 1, text: '' }]),
    related_slugs: safeArray(initialData.related_slugs, []),
  } : undefined;
  const [data, setData] = useState<CaseStudyFormData>(safeInitial || EMPTY);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === 'new');
  const [stackInput, setStackInput] = useState(safeArray(initialData?.tech_stack, []).join(', '));

  const update = <K extends keyof CaseStudyFormData>(key: K, value: CaseStudyFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const onTitleChange = (title: string) => {
    setData((prev) => ({
      ...prev,
      title,
      ...(autoSlug && !prev.short_title && { short_title: title, slug: slugify(title) }),
    }));
  };

  const addResult = () => update('results', [...data.results, { value: '', label: '' }]);
  const removeResult = (i: number) => update('results', data.results.filter((_, idx) => idx !== i));
  const updateResult = (i: number, key: 'value' | 'label', val: string) => {
    const next = [...data.results];
    next[i] = { ...next[i], [key]: val };
    update('results', next);
  };

  const addStep = () => update('solution_steps', [...data.solution_steps, { num: data.solution_steps.length + 1, text: '' }]);
  const removeStep = (i: number) => {
    const next = data.solution_steps.filter((_, idx) => idx !== i).map((s, idx) => ({ ...s, num: idx + 1 }));
    update('solution_steps', next);
  };
  const updateStep = (i: number, val: string) => {
    const next = [...data.solution_steps];
    next[i] = { ...next[i], text: val };
    update('solution_steps', next);
  };

  const updateStack = (value: string) => {
    setStackInput(value);
    update('tech_stack', value.split(',').map((t) => t.trim()).filter(Boolean));
  };

  const save = async (publishStatus?: 'draft' | 'published') => {
    if (!data.short_title.trim() || !data.slug.trim()) { alert('Title and slug are required'); return; }

    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      status: publishStatus || data.status,
      published_at: (publishStatus === 'published' && !initialData?.id) ? new Date().toISOString() : undefined,
    };

    const result = mode === 'new'
      ? await supabase.from('case_studies').insert(payload).select().single()
      : await supabase.from('case_studies').update(payload).eq('id', data.id!).select().single();

    setSaving(false);

    if (result.error) {
      alert('Save failed: ' + result.error.message);
      return;
    }

    if (mode === 'new' && result.data) {
      router.push(`/admin/case-studies/${result.data.id}`);
    } else {
      router.refresh();
      alert('Saved successfully');
    }
  };

  const handleDelete = async () => {
    if (!data.id || !confirm('Delete this case study permanently?')) return;
    const supabase = createClient();
    await supabase.from('case_studies').delete().eq('id', data.id);
    router.push('/admin/case-studies');
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link href="/admin/case-studies" className="text-sm text-ink-60 hover:text-black">← Back to all case studies</Link>
          <h1 className="text-3xl font-bold text-black mt-2">{mode === 'new' ? 'New case study' : 'Edit case study'}</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          {mode === 'edit' && <button onClick={handleDelete} className="btn-ghost text-sm">Delete</button>}
          <button onClick={() => save('draft')} disabled={saving} className="btn-ghost text-sm">{saving ? 'Saving...' : 'Save draft'}</button>
          <button onClick={() => save('published')} disabled={saving} className="btn-primary text-sm">{saving ? 'Saving...' : 'Publish'}</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* BASIC */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-5">Basic info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Full title</label>
                <input type="text" value={data.title} onChange={(e) => onTitleChange(e.target.value)} placeholder="Full case study title" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Short title (used on cards)</label>
                <input type="text" value={data.short_title} onChange={(e) => update('short_title', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-black uppercase tracking-wider">URL slug</label>
                  <label className="flex items-center gap-2 text-xs text-ink-60 cursor-pointer">
                    <input type="checkbox" checked={autoSlug} onChange={(e) => setAutoSlug(e.target.checked)} />
                    Auto-generate
                  </label>
                </div>
                <div className="flex items-center border border-ink-20 rounded-md overflow-hidden focus-within:border-black">
                  <span className="px-3 py-2.5 bg-ink-5 text-sm text-ink-60 border-r border-ink-10">/case-studies/</span>
                  <input type="text" value={data.slug} onChange={(e) => { setAutoSlug(false); update('slug', slugify(e.target.value)); }} className="flex-1 px-4 py-2.5 text-black focus:outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Description</label>
                <textarea value={data.description} onChange={(e) => update('description', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Industry tag (short, for badges)</label>
                  <input type="text" value={data.industry_tag} onChange={(e) => update('industry_tag', e.target.value)} placeholder="e.g. Distribution" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Industry (full)</label>
                  <input type="text" value={data.industry} onChange={(e) => update('industry', e.target.value)} placeholder="e.g. Distribution & supplier networks" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Revenue</label>
                  <input type="text" value={data.revenue} onChange={(e) => update('revenue', e.target.value)} placeholder="e.g. $8M" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Region</label>
                  <input type="text" value={data.region} onChange={(e) => update('region', e.target.value)} placeholder="e.g. Massachusetts" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Timeline</label>
                  <input type="text" value={data.timeline} onChange={(e) => update('timeline', e.target.value)} placeholder="e.g. 5 weeks to live" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Headline metric</label>
                  <input type="text" value={data.headline_metric} onChange={(e) => update('headline_metric', e.target.value)} placeholder="e.g. 5,500+ SKUs hourly" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black">Results</h2>
              <button type="button" onClick={addResult} className="text-sm font-semibold text-black hover:text-lime-dark">+ Add result</button>
            </div>
            <div className="space-y-3">
              {data.results.map((r, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={r.value} onChange={(e) => updateResult(i, 'value', e.target.value)} placeholder="Value (e.g. 5,500+)" className="w-1/3 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                  <input type="text" value={r.label} onChange={(e) => updateResult(i, 'label', e.target.value)} placeholder="Label (e.g. SKUs managed automatically)" className="flex-1 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                  <button type="button" onClick={() => removeResult(i)} className="px-3 py-2 text-black hover:bg-ink-5 rounded-md">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* TECH STACK */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-4">Tech stack</h2>
            <input type="text" value={stackInput} onChange={(e) => updateStack(e.target.value)} placeholder="comma, separated, technologies" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
          </div>

          {/* CHALLENGE */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-4">Challenge</h2>
            <input type="text" value={data.challenge_heading} onChange={(e) => update('challenge_heading', e.target.value)} placeholder="Section heading" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm mb-3" />
            <RichTextEditor value={data.challenge_content} onChange={(html, json) => { update('challenge_content', html); update('challenge_content_json', json); }} placeholder="Describe the challenge..." />
          </div>

          {/* SOLUTION */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-4">Solution</h2>
            <input type="text" value={data.solution_heading} onChange={(e) => update('solution_heading', e.target.value)} placeholder="Section heading" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm mb-3" />
            <RichTextEditor value={data.solution_content} onChange={(html, json) => { update('solution_content', html); update('solution_content_json', json); }} placeholder="Describe the solution..." />

            <div className="mt-5">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-bold text-black uppercase tracking-wider">Solution steps</label>
                <button type="button" onClick={addStep} className="text-sm font-semibold text-black hover:text-lime-dark">+ Add step</button>
              </div>
              <div className="space-y-2">
                {data.solution_steps.map((s, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <span className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center font-bold text-sm flex-shrink-0">{s.num}</span>
                    <input type="text" value={s.text} onChange={(e) => updateStep(i, e.target.value)} placeholder="What happens in this step" className="flex-1 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                    <button type="button" onClick={() => removeStep(i)} className="px-3 py-2 text-black hover:bg-ink-5 rounded-md">✕</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* OUTCOME */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-4">Outcome</h2>
            <input type="text" value={data.outcome_heading} onChange={(e) => update('outcome_heading', e.target.value)} placeholder="Section heading" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm mb-3" />
            <RichTextEditor value={data.outcome_content} onChange={(html, json) => { update('outcome_content', html); update('outcome_content_json', json); }} placeholder="Describe the outcome..." />
          </div>

          {/* TESTIMONIAL */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-4">Testimonial (optional)</h2>
            <div className="space-y-3">
              <textarea value={data.testimonial_quote} onChange={(e) => update('testimonial_quote', e.target.value)} rows={3} placeholder="Quote from the operator" className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" value={data.testimonial_attribution} onChange={(e) => update('testimonial_attribution', e.target.value)} placeholder="Name (e.g. Tony Velasquez)" className="px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                <input type="text" value={data.testimonial_role} onChange={(e) => update('testimonial_role', e.target.value)} placeholder="Role (e.g. CEO, Company)" className="px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
            </div>
          </div>

          <SeoPanel
            values={{ meta_title: data.meta_title, meta_description: data.meta_description, focus_keyword: data.focus_keyword, og_image_url: data.og_image_url }}
            onChange={(field, value) => update(field as keyof CaseStudyFormData, value as CaseStudyFormData[keyof CaseStudyFormData])}
          />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-black mb-5">Publish</h3>
            <select value={data.status} onChange={(e) => update('status', e.target.value as 'draft' | 'published' | 'archived')} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

        

          {mode === 'edit' && data.status === 'published' && (
            <a href={`/case-studies/${data.slug}`} target="_blank" rel="noopener noreferrer" className="block btn-ghost text-sm justify-center">
              View live case study →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}