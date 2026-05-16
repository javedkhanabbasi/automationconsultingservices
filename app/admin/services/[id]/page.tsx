export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ServiceEditForm, { type ServiceFormData } from '@/components/admin/ServiceEditForm';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: s } = await supabase.from('services').select('*').eq('id', params.id).single();
  if (!s) notFound();

  const initialData: ServiceFormData = {
    id: s.id,
    slug: s.slug || '',
    name: s.name || '',
    short_desc: s.short_desc || '',
    long_desc: s.long_desc || '',
    features: s.features || [],
    workflow: s.workflow || [],
    metric_label: s.metric_label || '',
    metric_value: s.metric_value || '',
    related_case_study_slug: s.related_case_study_slug || '',
    related_case_study_label: s.related_case_study_label || '',
    stack: s.stack || [],
    faqs: s.faqs || [],
    featured_image_url: s.featured_image_url || '',
    meta_title: s.meta_title || '',
    meta_description: s.meta_description || '',
    focus_keyword: s.focus_keyword || '',
    og_image_url: s.og_image_url || '',
    status: s.status || 'published',
  };

  return <ServiceEditForm initialData={initialData} />;
}
