export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PageEditForm, { type PageFormData } from '@/components/admin/PageEditForm';

export default async function EditPagePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: p } = await supabase.from('pages').select('*').eq('id', params.id).single();
  if (!p) notFound();

  const initialData: PageFormData = {
    id: p.id,
    slug: p.slug || '',
    title: p.title || '',
    hero_heading: p.hero_heading || '',
    hero_subheading: p.hero_subheading || '',
    content: p.content || '',
    content_json: p.content_json,
    featured_image_url: p.featured_image_url || '',
    meta_title: p.meta_title || '',
    meta_description: p.meta_description || '',
    focus_keyword: p.focus_keyword || '',
    og_image_url: p.og_image_url || '',
    status: p.status || 'published',
    is_locked: p.is_locked || false,
  };

  return <PageEditForm initialData={initialData} />;
}
