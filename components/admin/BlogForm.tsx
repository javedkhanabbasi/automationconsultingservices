'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/slug';
import RichTextEditor from './RichTextEditor';
import SeoPanel from './SeoPanel';
import FeaturedImagePicker from './FeaturedImagePicker';

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Available authors (add/remove here whenever you like)
const AUTHORS = ['Matthew Piwko', 'Usman Ishaq'];

export interface BlogFormData {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  content_json: object | null;
  featured_image_url: string;
  featured_image_alt: string;
  category_id: string | null;
  category_name: string;
  tags: string[];
  author_name: string;
  reading_time: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  og_image_url: string;
  canonical_url: string;
  no_index: boolean;
  no_follow: boolean;
  scheduled_for: string; // local 'YYYY-MM-DDTHH:mm' for the input, ISO is stored in DB
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  featured: boolean;
}

interface BlogFormProps {
  initialData?: BlogFormData;
  mode: 'new' | 'edit';
}

const EMPTY: BlogFormData = {
  slug: '', title: '', excerpt: '', content: '', content_json: null,
  featured_image_url: '', featured_image_alt: '', category_id: null, category_name: '',
  tags: [], author_name: 'Matthew Piwko', reading_time: '',
  meta_title: '', meta_description: '', focus_keyword: '', og_image_url: '', canonical_url: '',
  no_index: false, no_follow: false,
  scheduled_for: '', status: 'draft', featured: false,
};

// Convert an ISO/DB timestamp to the value a <input type="datetime-local"> expects (local time).
function toLocalInput(value?: string | null): string {
  if (!value) return '';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '';
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 16);
}

// Default schedule time = 1 hour from now (in local time for the input).
// Guarantees a valid future value so users never hit the AM/PM past-time error.
function defaultScheduleTime(): string {
  return toLocalInput(new Date(Date.now() + 60 * 60 * 1000).toISOString());
}

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [data, setData] = useState<BlogFormData>(
    initialData
      ? { ...initialData, scheduled_for: toLocalInput(initialData.scheduled_for) }
      : EMPTY
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [autoSlug, setAutoSlug] = useState(mode === 'new');
  const [tagsInput, setTagsInput] = useState(Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : (typeof initialData?.tags === 'string' ? initialData.tags : ''));

  useEffect(() => {
    const supabase = createClient();
    supabase.from('categories').select('id, name, slug').order('name').then(({ data }) => {
      if (data) setCategories(data);
    });
  }, []);

  const update = <K extends keyof BlogFormData>(key: K, value: BlogFormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // Changing status — when switching to "scheduled" with no time yet, pre-fill +1 hour.
  const onStatusChange = (next: BlogFormData['status']) => {
    setData((prev) => ({
      ...prev,
      status: next,
      scheduled_for:
        next === 'scheduled' && !prev.scheduled_for
          ? defaultScheduleTime()
          : prev.scheduled_for,
    }));
  };

  const onTitleChange = (title: string) => {
    setData((prev) => ({
      ...prev,
      title,
      ...(autoSlug && { slug: slugify(title) }),
      ...(!prev.meta_title && { meta_title: title }),
    }));
  };

  const onContentChange = (html: string, json: object) => {
    const words = html.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 220));
    setData((prev) => ({
      ...prev,
      content: html,
      content_json: json,
      reading_time: `${minutes} min read`,
    }));
  };

  const onCategoryChange = (id: string) => {
    const cat = categories.find((c) => c.id === id);
    setData((prev) => ({ ...prev, category_id: id || null, category_name: cat?.name || '' }));
  };

  const updateTags = (value: string) => {
    setTagsInput(value);
    const tags = value.split(',').map((t) => t.trim()).filter(Boolean);
    setData((prev) => ({ ...prev, tags }));
  };

  const save = async (action: 'draft' | 'published' | 'scheduled') => {
    if (!data.title.trim()) { alert('Title is required'); return; }
    if (!data.slug.trim()) { alert('Slug is required'); return; }

    if (action === 'scheduled') {
      if (!data.scheduled_for) { alert('Pick a date & time to schedule the post'); return; }
      if (new Date(data.scheduled_for).getTime() <= Date.now()) {
        alert('Scheduled time must be in the future'); return;
      }
    }

    setSaving(true);
    const supabase = createClient();

    const payload = {
      ...data,
      status: action,
      // store ISO when scheduled, otherwise clear it
      scheduled_for:
        action === 'scheduled' && data.scheduled_for
          ? new Date(data.scheduled_for).toISOString()
          : null,
      // only stamp published_at the first time a brand-new post is published
      published_at:
        action === 'published' && !initialData?.id
          ? new Date().toISOString()
          : undefined,
    };

    const result = mode === 'new'
      ? await supabase.from('posts').insert(payload).select().single()
      : await supabase.from('posts').update(payload).eq('id', data.id!).select().single();

    setSaving(false);

    if (result.error) {
      alert('Save failed: ' + result.error.message);
      return;
    }

    if (mode === 'new' && result.data) {
      router.push(`/acs-1000-admin/blog/${result.data.id}`);
    } else {
      router.refresh();
      alert(action === 'scheduled' ? 'Post scheduled' : 'Saved successfully');
    }
  };

  const handleDelete = async () => {
    if (!data.id) return;
    if (!confirm('Delete this post permanently? This cannot be undone.')) return;
    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', data.id);
    if (error) { alert('Delete failed: ' + error.message); return; }
    router.push('/acs-1000-admin/blog');
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link href="/acs-1000-admin/blog" className="text-sm text-ink-60 hover:text-black">← Back to all posts</Link>
          <h1 className="text-3xl font-bold text-black mt-2">
            {mode === 'new' ? 'New blog post' : 'Edit blog post'}
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          {mode === 'edit' && (
            <button onClick={handleDelete} className="btn-ghost text-sm text-black">Delete</button>
          )}
          <button onClick={() => save('draft')} disabled={saving} className="btn-ghost text-sm">
            {saving ? 'Saving...' : 'Save draft'}
          </button>
          {data.status === 'scheduled' ? (
            <button onClick={() => save('scheduled')} disabled={saving} className="btn-primary text-sm">
              {saving ? 'Saving...' : 'Schedule'}
            </button>
          ) : (
            <button onClick={() => save('published')} disabled={saving} className="btn-primary text-sm">
              {saving ? 'Saving...' : data.status === 'published' ? 'Update published' : 'Publish'}
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* MAIN COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Your post title"
              className="w-full px-4 py-3 text-2xl font-bold border border-ink-20 rounded-md text-black focus:border-black focus:outline-none"
            />

            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-black uppercase tracking-wider">URL slug</label>
                <label className="flex items-center gap-2 text-xs text-ink-60 cursor-pointer">
                  <input type="checkbox" checked={autoSlug} onChange={(e) => setAutoSlug(e.target.checked)} />
                  Auto-generate from title
                </label>
              </div>
              <div className="flex items-center border border-ink-20 rounded-md overflow-hidden focus-within:border-black">
                <span className="px-3 py-2.5 bg-ink-5 text-sm text-ink-60 border-r border-ink-10">/blog/</span>
                <input
                  type="text"
                  value={data.slug}
                  onChange={(e) => { setAutoSlug(false); update('slug', slugify(e.target.value)); }}
                  placeholder="your-post-url"
                  className="flex-1 px-4 py-2.5 text-black focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Excerpt</label>
              <textarea
                value={data.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
                rows={3}
                placeholder="One- or two-sentence summary shown on blog index"
                className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Content</label>
            <RichTextEditor
              value={data.content}
              onChange={onContentChange}
              placeholder="Start writing your post..."
            />
            {data.reading_time && (
              <p className="text-xs text-ink-50 mt-2">Estimated reading time: {data.reading_time}</p>
            )}
          </div>

          <SeoPanel
            values={{
              meta_title: data.meta_title,
              meta_description: data.meta_description,
              focus_keyword: data.focus_keyword,
              og_image_url: data.og_image_url,
              canonical_url: data.canonical_url,
              no_index: data.no_index,
              no_follow: data.no_follow,
            }}
            onChange={(field, value) => update(field as keyof BlogFormData, value as BlogFormData[keyof BlogFormData])}
            showCanonical
          />
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-black mb-5">Publish</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Status</label>
                <select
                  value={data.status}
                  onChange={(e) => onStatusChange(e.target.value as BlogFormData['status'])}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {data.status === 'scheduled' && (
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Publish date &amp; time</label>
                  <input
                    type="datetime-local"
                    value={data.scheduled_for}
                    min={toLocalInput(new Date().toISOString())}
                    onChange={(e) => update('scheduled_for', e.target.value)}
                    className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white"
                  />
                  <p className="text-xs text-ink-50 mt-1">Post will go live automatically at this time.</p>
                </div>
              )}

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={data.featured} onChange={(e) => update('featured', e.target.checked)} />
                <span className="text-sm text-black">Feature this post on blog index</span>
              </label>
            </div>
          </div>

          <FeaturedImagePicker
            imageUrl={data.featured_image_url}
            altText={data.featured_image_alt}
            onChange={(url, alt) => {
              update('featured_image_url', url);
              update('featured_image_alt', alt);
            }}
          />

          <div className="card p-6">
            <h3 className="text-lg font-bold text-black mb-5">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Category</label>
                <select
                  value={data.category_id || ''}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white"
                >
                  <option value="">— None —</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <Link href="/acs-1000-admin/categories" className="text-xs text-ink-60 hover:text-black mt-1 inline-block">Manage categories →</Link>
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Tags</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => updateTags(e.target.value)}
                  placeholder="comma, separated, tags"
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">Author</label>
                <select
                  value={data.author_name}
                  onChange={(e) => update('author_name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white"
                >
                  {AUTHORS.map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {mode === 'edit' && data.status === 'published' && (
            <a href={`/blog/${data.slug}`} target="_blank" rel="noopener noreferrer" className="block btn-ghost text-sm justify-center">
              View live post →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}