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
  status: 'draft' | 'published' | 'archived';
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
  status: 'draft', featured: false,
};

export default function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [data, setData] = useState<BlogFormData>(initialData || EMPTY);
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

  const save = async (publishStatus?: 'draft' | 'published') => {
    if (!data.title.trim()) { alert('Title is required'); return; }
    if (!data.slug.trim()) { alert('Slug is required'); return; }

    setSaving(true);
    const supabase = createClient();
    const payload = {
      ...data,
      status: publishStatus || data.status,
      published_at: (publishStatus === 'published' && !initialData?.id) ? new Date().toISOString() : undefined,
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
      router.push(`/admin/blog/${result.data.id}`);
    } else {
      router.refresh();
      alert('Saved successfully');
    }
  };

  const handleDelete = async () => {
    if (!data.id) return;
    if (!confirm('Delete this post permanently? This cannot be undone.')) return;
    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', data.id);
    if (error) { alert('Delete failed: ' + error.message); return; }
    router.push('/admin/blog');
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <Link href="/admin/blog" className="text-sm text-ink-60 hover:text-black">← Back to all posts</Link>
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
          <button onClick={() => save('published')} disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving...' : data.status === 'published' ? 'Update published' : 'Publish'}
          </button>
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
            }}
            onChange={(field, value) => update(field as keyof BlogFormData, value)}
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
                  onChange={(e) => update('status', e.target.value as 'draft' | 'published' | 'archived')}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
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
                <Link href="/admin/categories" className="text-xs text-ink-60 hover:text-black mt-1 inline-block">Manage categories →</Link>
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
                <input
                  type="text"
                  value={data.author_name}
                  onChange={(e) => update('author_name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-ink-20 rounded-md text-black focus:border-black focus:outline-none text-sm"
                />
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