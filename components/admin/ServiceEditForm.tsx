'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import SeoPanel from '@/components/admin/SeoPanel';
import FeaturedImagePicker from '@/components/admin/FeaturedImagePicker';

export interface ServiceFormData {
  id: string;
  slug: string;
  name: string;
  short_desc: string;
  long_desc: string;
  features: string[];
  workflow: { step: string; tag?: string }[];
  metric_label: string;
  metric_value: string;
  related_case_study_slug: string;
  related_case_study_label: string;
  stack: string[];
  faqs: { question: string; answer: string }[];
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_image_url: string;
  status: 'draft' | 'published' | 'archived';
}

export default function ServiceEditForm({ initialData }: { initialData: ServiceFormData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [featuresInput, setFeaturesInput] = useState(initialData.features.join('\n'));
  const [stackInput, setStackInput] = useState(initialData.stack.join(', '));

  const update = <K extends keyof ServiceFormData>(key: K, value: ServiceFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from('services').update(data).eq('id', data.id);
    setSaving(false);
    if (error) { alert('Save failed: ' + error.message); return; }
    router.refresh();
    alert('Saved successfully');
  };

  const addWorkflowStep = () => update('workflow', [...data.workflow, { step: '', tag: '' }]);
  const removeWorkflowStep = (i: number) => update('workflow', data.workflow.filter((_, idx) => idx !== i));
  const updateWorkflowStep = (i: number, key: 'step' | 'tag', val: string) => {
    const next = [...data.workflow]; next[i] = { ...next[i], [key]: val }; update('workflow', next);
  };

  const addFaq = () => update('faqs', [...data.faqs, { question: '', answer: '' }]);
  const removeFaq = (i: number) => update('faqs', data.faqs.filter((_, idx) => idx !== i));
  const updateFaq = (i: number, key: 'question' | 'answer', val: string) => {
    const next = [...data.faqs]; next[i] = { ...next[i], [key]: val }; update('faqs', next);
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link href="/admin/services" className="text-sm text-ink-60 hover:text-black">← Back to services</Link>
          <h1 className="text-3xl font-bold text-black mt-2">Edit service</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary text-sm">
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-5">Service info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Name</label>
                <input type="text" value={data.name} onChange={(e) => update('name', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Short description</label>
                <textarea value={data.short_desc} onChange={(e) => update('short_desc', e.target.value)} rows={2} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Long description</label>
                <textarea value={data.long_desc} onChange={(e) => update('long_desc', e.target.value)} rows={5} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Features (one per line)</label>
                <textarea
                  value={featuresInput}
                  onChange={(e) => { setFeaturesInput(e.target.value); update('features', e.target.value.split('\n').map((l) => l.trim()).filter(Boolean)); }}
                  rows={6}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm font-mono"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Metric label</label>
                  <input type="text" value={data.metric_label} onChange={(e) => update('metric_label', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Metric value</label>
                  <input type="text" value={data.metric_value} onChange={(e) => update('metric_value', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Tech stack (comma separated)</label>
                <input type="text" value={stackInput} onChange={(e) => { setStackInput(e.target.value); update('stack', e.target.value.split(',').map((t) => t.trim()).filter(Boolean)); }} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black">Workflow steps</h2>
              <button type="button" onClick={addWorkflowStep} className="text-sm font-semibold text-black hover:text-lime-dark">+ Add step</button>
            </div>
            <div className="space-y-3">
              {data.workflow.map((w, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={w.tag || ''} onChange={(e) => updateWorkflowStep(i, 'tag', e.target.value)} placeholder="Tag (e.g. Trigger)" className="w-32 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                  <input type="text" value={w.step} onChange={(e) => updateWorkflowStep(i, 'step', e.target.value)} placeholder="Step description" className="flex-1 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
                  <button type="button" onClick={() => removeWorkflowStep(i)} className="px-3 py-2 text-black hover:bg-ink-5 rounded-md">✕</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-black">FAQs</h2>
              <button type="button" onClick={addFaq} className="text-sm font-semibold text-black hover:text-lime-dark">+ Add FAQ</button>
            </div>
            <div className="space-y-4">
              {data.faqs.map((f, i) => (
                <div key={i} className="bg-ink-5 rounded-md p-4 space-y-2">
                  <div className="flex gap-2 items-start">
                    <input type="text" value={f.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="Question" className="flex-1 px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm font-semibold bg-white" />
                    <button type="button" onClick={() => removeFaq(i)} className="px-3 py-2 text-black hover:bg-ink-10 rounded-md">✕</button>
                  </div>
                  <textarea value={f.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} placeholder="Answer" rows={3} className="w-full px-3 py-2 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white" />
                </div>
              ))}
            </div>
          </div>

          <SeoPanel
            values={{ meta_title: data.meta_title, meta_description: data.meta_description, focus_keyword: data.focus_keyword, og_image_url: data.og_image_url }}
            onChange={(field, value) => update(field as keyof ServiceFormData, value)}
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
            <div className="mt-4 pt-4 border-t border-ink-10">
              <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">URL</div>
              <div className="text-sm text-ink-70">/services/{data.slug}</div>
            </div>
          </div>

          <FeaturedImagePicker
            imageUrl={data.featured_image_url}
            altText=""
            onChange={(url) => update('featured_image_url', url)}
          />

          {data.status === 'published' && (
            <a href={`/services/${data.slug}`} target="_blank" rel="noopener noreferrer" className="block btn-ghost text-sm justify-center">
              View live service →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
