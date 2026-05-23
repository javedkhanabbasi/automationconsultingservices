/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seed script — pushes existing /content TypeScript content into Supabase.
 *
 * Run with: npm run seed
 *
 * Requires environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Safe to re-run. Uses upsert on slug, so existing rows are updated, not duplicated.
 */

import { createClient } from '@supabase/supabase-js';
import { services } from '../content/services';
import { caseStudies } from '../content/case-studies';
import { blogPosts, type BlogSection } from '../content/blog-posts';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  console.error('Create a .env.local file with these values, then run: npm run seed');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// =====================================================
// HELPER: Convert blog post sections to HTML
// =====================================================
function sectionsToHtml(sections: BlogSection[]): string {
  return sections.map((s) => {
    switch (s.type) {
      case 'heading':
        return `<h2>${escapeHtml(s.content as string)}</h2>`;
      case 'paragraph':
        return `<p>${escapeHtml(s.content as string)}</p>`;
      case 'list':
        return `<ul>${(s.content as string[]).map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>`;
      case 'callout':
        return `<blockquote><strong>${escapeHtml(s.content as string)}</strong></blockquote>`;
      case 'quote':
        return `<blockquote>${escapeHtml(s.content as string)}</blockquote>`;
      default:
        return '';
    }
  }).join('\n');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// =====================================================
// SEED CATEGORIES
// =====================================================
async function seedCategories() {
  console.log('Seeding categories...');
  const categoriesData = [
    { name: 'Architecture', slug: 'architecture', description: 'Workflow and integration architecture' },
    { name: 'CRM', slug: 'crm', description: 'CRM implementation and migration' },
    { name: 'Methodology', slug: 'methodology', description: 'Engagement methodology and process' },
    { name: 'Operations', slug: 'operations', description: 'Operations engineering and monitoring' },
    { name: 'Case study deep dives', slug: 'case-study-deep-dives', description: 'Behind-the-scenes engagement breakdowns' },
    { name: 'Finance ops', slug: 'finance-ops', description: 'Finance and revenue operations' },
    { name: 'Engagement model', slug: 'engagement-model', description: 'How engagements work commercially' },
    { name: 'Tools', slug: 'tools', description: 'Tool selection and comparison' },
  ];

  for (const cat of categoriesData) {
    const { error } = await supabase.from('categories').upsert(cat, { onConflict: 'slug' });
    if (error) console.error(`  Error seeding category ${cat.name}:`, error.message);
  }
  console.log(`  Seeded ${categoriesData.length} categories`);
}

// =====================================================
// SEED SERVICES
// =====================================================
async function seedServices() {
  console.log('Seeding services...');
  let count = 0;

  for (let i = 0; i < services.length; i++) {
    const s: any = services[i];

    const payload = {
      slug: s.slug,
      name: s.name,
      short_desc: s.shortDesc || s.short_desc || '',
      long_desc: s.longDesc || s.long_desc || '',
      features: s.features || [],
      workflow: s.workflow || [],
      metric_label: s.metric?.label || '',
      metric_value: s.metric?.value || '',
      related_case_study_slug: s.relatedCaseStudy?.slug || '',
      related_case_study_label: s.relatedCaseStudy?.label || '',
      stack: s.stack || [],
      faqs: s.faqs || [],
      meta_title: `${s.name} | Automation Consulting Services`,
      meta_description: s.shortDesc || s.short_desc || '',
      focus_keyword: s.name?.toLowerCase() || '',
      status: 'published',
      display_order: i,
    };

    const { error } = await supabase.from('services').upsert(payload, { onConflict: 'slug' });
    if (error) {
      console.error(`  Error seeding service ${s.slug}:`, error.message);
    } else {
      count++;
    }
  }
  console.log(`  Seeded ${count} services`);
}

// =====================================================
// SEED CASE STUDIES
// =====================================================
async function seedCaseStudies() {
  console.log('Seeding case studies...');
  let count = 0;

  for (const cs of caseStudies as any[]) {
    const challengeHtml = cs.challenge?.body
      ? `<p>${escapeHtml(cs.challenge.body)}</p>`
      : '';
    const solutionHtml = cs.solution?.body
      ? `<p>${escapeHtml(cs.solution.body)}</p>`
      : '';
    const outcomeHtml = cs.outcome?.body
      ? `<p>${escapeHtml(cs.outcome.body)}</p>`
      : '';

    const payload = {
      slug: cs.slug,
      title: cs.title || cs.shortTitle || '',
      short_title: cs.shortTitle || cs.title || '',
      description: cs.description || '',
      industry: cs.industry || '',
      industry_tag: cs.industryTag || cs.industry || '',
      revenue: cs.revenue || '',
      region: cs.region || '',
      timeline: cs.timeline || '',
      headline_metric: cs.headlineMetric || '',
      results: cs.results || [],
      tech_stack: cs.techStack || [],
      challenge_heading: cs.challenge?.heading || 'The challenge',
      challenge_content: challengeHtml,
      solution_heading: cs.solution?.heading || 'The solution',
      solution_content: solutionHtml,
      solution_steps: cs.solution?.steps || [],
      outcome_heading: cs.outcome?.heading || 'The outcome',
      outcome_content: outcomeHtml,
      testimonial_quote: cs.testimonial?.quote || '',
      testimonial_attribution: cs.testimonial?.attribution || '',
      testimonial_role: cs.testimonial?.role || '',
      related_slugs: cs.related || [],
      meta_title: cs.title || cs.shortTitle || '',
      meta_description: cs.description || '',
      focus_keyword: cs.industryTag?.toLowerCase() || '',
      status: 'published',
      published_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('case_studies').upsert(payload, { onConflict: 'slug' });
    if (error) {
      console.error(`  Error seeding case study ${cs.slug}:`, error.message);
    } else {
      count++;
    }
  }
  console.log(`  Seeded ${count} case studies`);
}

// =====================================================
// SEED BLOG POSTS
// =====================================================
async function seedBlogPosts() {
  console.log('Seeding blog posts...');
  let count = 0;

  // Get categories for ID lookup
  const { data: cats } = await supabase.from('categories').select('id, name, slug');
  const categoryMap = new Map((cats || []).map((c) => [c.name.toLowerCase(), { id: c.id, name: c.name }]));

  for (const post of blogPosts) {
    const cat = categoryMap.get(post.category.toLowerCase());

    const payload = {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: sectionsToHtml(post.sections),
      category_id: cat?.id || null,
      category_name: cat?.name || post.category,
      tags: [],
      author_name: post.author,
      reading_time: post.readingTime,
      meta_title: post.title,
      meta_description: post.excerpt,
      focus_keyword: post.category.toLowerCase(),
      status: 'published',
      featured: post.featured,
      published_at: new Date(post.publishedTime).toISOString(),
    };

    const { error } = await supabase.from('posts').upsert(payload, { onConflict: 'slug' });
    if (error) {
      console.error(`  Error seeding post ${post.slug}:`, error.message);
    } else {
      count++;
    }
  }
  console.log(`  Seeded ${count} blog posts`);
}

// =====================================================
// SEED PAGES (static marketing pages metadata)
// =====================================================
async function seedPages() {
  console.log('Seeding static pages...');

  const staticPages = [
    {
      slug: 'about',
      title: 'About',
      hero_heading: 'Engineering discipline. Applied to your operations.',
      hero_subheading: 'Ten years of software engineering, applied to the operations layer of $10M-$50M companies.',
      meta_title: 'About | Founded by Matthew Piwko',
      meta_description: 'Founded by Matthew Piwko in late 2024. Ten years building production software. Now applied to operations infrastructure for growth-stage operators.',
      focus_keyword: 'about automation consulting services',
    },
    {
      slug: 'pricing',
      title: 'Pricing',
      hero_heading: 'Pricing is a feature. Not a negotiation.',
      hero_subheading: 'Fixed-fee builds. Refundable discovery. No hourly billing.',
      meta_title: 'Pricing | Fixed-Fee Projects, Refundable Discovery',
      meta_description: 'Fixed-fee builds. Refundable discovery. No hourly billing. Discovery from $500, project tiers $5K-$50K+, monthly retainers $2K-$10K.',
      focus_keyword: 'automation consulting pricing',
    },
    {
      slug: 'contact',
      title: 'Contact',
      hero_heading: 'Book a discovery call.',
      hero_subheading: 'Paid discovery from $500. Refundable if automation is not the answer.',
      meta_title: 'Contact | Book a Discovery Call',
      meta_description: 'Book a discovery call with Matthew Piwko. Paid audit from $500. Output is a written diagnostic, ranked bottleneck list, and recommended scope.',
      focus_keyword: 'contact automation consulting',
    },
    {
      slug: 'faq',
      title: 'FAQ',
      hero_heading: 'Frequently asked.',
      hero_subheading: 'Six categories. Twenty-four questions.',
      meta_title: 'FAQ | Questions Operators Ask Before Engaging',
      meta_description: 'Frequently asked questions about engagement model, methodology, pricing, CRM, and the firm itself.',
      focus_keyword: 'automation consulting faq',
    },
    {
      slug: 'partners',
      title: 'Partners',
      hero_heading: 'Verified partners.',
      hero_subheading: 'Two verified partnerships. Six practitioner-level platforms.',
      meta_title: 'Partners | Verified Zapier Certified and Attio Expert',
      meta_description: 'Verified Zapier Certified Solutions Partner and Attio Expert Partner. Practitioner-level fluency on HubSpot, Salesforce, Pipedrive, Close, n8n, Make.',
      focus_keyword: 'zapier attio partner',
    },
  ];

  let count = 0;
  for (const p of staticPages) {
    const { error } = await supabase.from('pages').upsert({ ...p, status: 'published' }, { onConflict: 'slug' });
    if (error) {
      console.error(`  Error seeding page ${p.slug}:`, error.message);
    } else {
      count++;
    }
  }
  console.log(`  Seeded ${count} pages`);
}

// =====================================================
// RUN
// =====================================================
async function main() {
  console.log('\n🌱 Starting Supabase seed...\n');
  try {
    await seedCategories();
    await seedServices();
    await seedCaseStudies();
    await seedBlogPosts();
    await seedPages();
    console.log('\n✓ Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('\n✗ Seed failed:', err);
    process.exit(1);
  }
}

main();
