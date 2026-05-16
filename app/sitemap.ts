import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import { services } from '@/content/services';
import { caseStudies } from '@/content/case-studies';
import { crmPlatforms } from '@/content/crm';
import { crmComparisons } from '@/content/crm-comparisons';
import { blogPosts } from '@/content/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogRoutes = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.modifiedTime || p.publishedTime,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...crmRoutes, ...comparisonRoutes, ...caseStudyRoutes, ...blogRoutes];
}
