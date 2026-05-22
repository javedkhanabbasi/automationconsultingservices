import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { services } from '@/content/services';
import { caseStudies } from '@/content/case-studies';
import { crmPlatforms } from '@/content/crm';
import { crmComparisons } from '@/content/crm-comparisons';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date().toISOString();

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/crm',
    '/crm/compare',
    '/case-studies',
    '/pricing',
    '/contact',
    '/faq',
    '/partners',
    '/blog',
    '/tools',
    '/tools/stripe-calculator',
    '/tools/automation-tool-finder',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const crmRoutes = crmPlatforms.map((p) => ({
    url: `${base}/crm/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const comparisonRoutes = crmComparisons.map((c) => ({
    url: `${base}/crm/compare/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const caseStudyRoutes = caseStudies.map((cs) => ({
    url: `${base}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch blogs from Supabase (published only)
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published');

    blogRoutes = (posts || []).map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.updated_at || p.published_at || now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (err) {
    // If Supabase fetch fails, return empty array — sitemap still generates
    blogRoutes = [];
  }

  // Fetch case studies from Supabase (published only)
  let dbCaseStudyRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: dbCases } = await supabase
      .from('case_studies')
      .select('slug, published_at, updated_at')
      .eq('status', 'published');

    dbCaseStudyRoutes = (dbCases || []).map((cs) => ({
      url: `${base}/case-studies/${cs.slug}`,
      lastModified: cs.updated_at || cs.published_at || now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    dbCaseStudyRoutes = [];
  }

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...crmRoutes,
    ...comparisonRoutes,
    ...caseStudyRoutes,
    ...dbCaseStudyRoutes,
    ...blogRoutes,
  ];
}