export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import BlogForm, { type BlogFormData } from '@/components/admin/BlogForm';

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single();

  if (!post) notFound();

  const initialData: BlogFormData = {
    id: post.id,
    slug: post.slug || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    content_json: post.content_json,
    featured_image_url: post.featured_image_url || '',
    featured_image_alt: post.featured_image_alt || '',
    category_id: post.category_id,
    category_name: post.category_name || '',
    tags: post.tags || [],
    author_name: post.author_name || 'Matthew Piwko',
    reading_time: post.reading_time || '',
    meta_title: post.meta_title || '',
    meta_description: post.meta_description || '',
    focus_keyword: post.focus_keyword || '',
    og_image_url: post.og_image_url || '',
    canonical_url: post.canonical_url || '',
    scheduled_for: post.scheduled_for ?? '',
    status: post.status || 'draft',
    featured: post.featured || false,
  };

  return <BlogForm mode="edit" initialData={initialData} />;
}