export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import CaseStudyForm, { type CaseStudyFormData } from '@/components/admin/CaseStudyForm';

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: cs } = await supabase.from('case_studies').select('*').eq('id', params.id).single();

  if (!cs) notFound();

  const initialData: CaseStudyFormData = {
    id: cs.id,
    slug: cs.slug || '',
    title: cs.title || '',
    short_title: cs.short_title || '',
    description: cs.description || '',
    industry: cs.industry || '',
    industry_tag: cs.industry_tag || '',
    revenue: cs.revenue || '',
    region: cs.region || '',
    timeline: cs.timeline || '',
    headline_metric: cs.headline_metric || '',
    featured_image_url: cs.featured_image_url || '',
    featured_image_alt: cs.featured_image_alt || '',
    results: cs.results || [{ value: '', label: '' }],
    tech_stack: cs.tech_stack || [],
    challenge_heading: cs.challenge_heading || 'The challenge',
    challenge_content: cs.challenge_content || '',
    challenge_content_json: cs.challenge_content_json,
    solution_heading: cs.solution_heading || 'The solution',
    solution_content: cs.solution_content || '',
    solution_content_json: cs.solution_content_json,
    solution_steps: cs.solution_steps || [{ num: 1, text: '' }],
    outcome_heading: cs.outcome_heading || 'The outcome',
    outcome_content: cs.outcome_content || '',
    outcome_content_json: cs.outcome_content_json,
    testimonial_quote: cs.testimonial_quote || '',
    testimonial_attribution: cs.testimonial_attribution || '',
    testimonial_role: cs.testimonial_role || '',
    related_slugs: cs.related_slugs || [],
    meta_title: cs.meta_title || '',
    meta_description: cs.meta_description || '',
    focus_keyword: cs.focus_keyword || '',
    og_image_url: cs.og_image_url || '',
    status: cs.status || 'draft',
  };

  return <CaseStudyForm mode="edit" initialData={initialData} />;
}
