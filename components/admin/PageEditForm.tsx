'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import RichTextEditor from '@/components/admin/RichTextEditor';
import SeoPanel from '@/components/admin/SeoPanel';
import FeaturedImagePicker from '@/components/admin/FeaturedImagePicker';

export interface PageFormData {
  id: string;
  slug: string;
  title: string;
  hero_heading: string;
  hero_subheading: string;
  content: string;
  content_json: object | null;
  featured_image_url: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_image_url: string;
  status: 'draft' | 'published' | 'archived';
  is_locked: boolean;
}

export default function PageEditForm({ initialData }: { initialData: PageFormData }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof PageFormData>(key: K, value: PageFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.from('pages').update(data).eq('id', data.id);
    setSaving(false);
    if (error) { alert('Save failed: ' + error.message); return; }
    router.refresh();
    alert('Saved successfully');
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link href="/acs-1000-admin/pages" className="text-sm text-ink-60 hover:text-black">← Back to pages</Link>
          <h1 className="text-3xl font-bold text-black mt-2">Edit page: {data.title}</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary text-sm">
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-black mb-5">Page content</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Page title (browser tab)</label>
                <input type="text" value={data.title} onChange={(e) => update('title', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Hero heading (main H1)</label>
                <input type="text" value={data.hero_heading} onChange={(e) => update('hero_heading', e.target.value)} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Hero subheading</label>
                <textarea value={data.hero_subheading} onChange={(e) => update('hero_subheading', e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Page body content</label>
            <RichTextEditor
              value={data.content}
              onChange={(html, json) => { update('content', html); update('content_json', json); }}
              placeholder="Page content..."
            />
          </div>

          <SeoPanel
            values={{ meta_title: data.meta_title, meta_description: data.meta_description, focus_keyword: data.focus_keyword, og_image_url: data.og_image_url }}
            onChange={(field, value) => update(field as keyof PageFormData, value)}
          />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-black mb-5">Page info</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">URL</div>
                <div className="text-sm text-ink-70">/{data.slug}</div>
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Status</label>
                <select value={data.status} onChange={(e) => update('status', e.target.value as 'draft' | 'published' | 'archived')} className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <FeaturedImagePicker
            imageUrl={data.featured_image_url}
            altText=""
            onChange={(url) => update('featured_image_url', url)}
          />

          {data.status === 'published' && (
            <a href={`/${data.slug}`} target="_blank" rel="noopener noreferrer" className="block btn-ghost text-sm justify-center">
              View live page →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
