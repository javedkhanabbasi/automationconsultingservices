export interface BlogSection {
  type: 'paragraph' | 'heading' | 'list' | 'callout' | 'quote';
  content: string | string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  readingTime: string;
  category: string;
  featured: boolean;
  related: string[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'event-driven-vs-batch-automation',
    title: 'Event-driven vs batch automation: when to pick which',
    excerpt:
      'Most operators default to batch automation because Zapier defaults to it. Real architecture decisions hinge on data freshness, error recovery, and cost.',
    author: 'Matthew Piwko',
    publishedTime: '2026-04-12',
    readingTime: '8 min read',
    category: 'Architecture',
    featured: true,
    related: ['four-ways-zapier-breaks-silently', 'idempotent-automation', 'n8n-vs-zapier-vs-make'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Automation architecture is mostly invisible until it breaks. The choice between event-driven and batch design decides how the system behaves under load, how errors propagate, and how much the platform actually costs per month.',
      },
      {
        type: 'heading',
        content: 'The two patterns',
      },
      {
        type: 'paragraph',
        content:
          'Event-driven automation fires when something happens. A deal closes in HubSpot, a webhook fires, and the downstream workflow runs immediately. Latency is seconds. Each event is independent.',
      },
      {
        type: 'paragraph',
        content:
          'Batch automation runs on a schedule. Every fifteen minutes, every hour, every night at 3 AM. It checks for new records, processes them in bulk, and writes results in one pass.',
      },
      {
        type: 'heading',
        content: 'When event-driven wins',
      },
      {
        type: 'list',
        content: [
          'Data freshness matters — sales reps cannot wait 60 minutes for a lead to appear',
          'Volume is moderate — under 5,000 events per day',
          'Error recovery is per-event — one failed event does not block 999 others',
          'Webhooks are available from the source system',
        ],
      },
      {
        type: 'heading',
        content: 'When batch wins',
      },
      {
        type: 'list',
        content: [
          'Volume is high — 50,000+ records per day',
          'Source system has no webhooks, only polling',
          'Cost per operation matters — Zapier per-task pricing breaks at high volume',
          'Reconciliation is more important than freshness',
        ],
      },
      {
        type: 'callout',
        content:
          'The classic mistake is using batch when event-driven would fit. Operators tolerate hourly delays for years before realizing webhooks have been available the whole time.',
      },
      {
        type: 'paragraph',
        content:
          'The reverse mistake is using event-driven at high volume on per-task pricing. A workflow firing 100,000 times per day on Zapier becomes a $3,000/month bill very quickly.',
      },
    ],
  },
  {
    slug: 'attio-vs-hubspot',
    title: 'Attio vs HubSpot: the practitioner read after twenty implementations',
    excerpt:
      'Attio is a CRM-first platform with a flexible data model. HubSpot is a marketing-first platform with a CRM bolted on. Pick by motion, not by feature list.',
    author: 'Matthew Piwko',
    publishedTime: '2026-04-08',
    readingTime: '12 min read',
    category: 'CRM',
    featured: false,
    related: ['when-to-migrate-off-hubspot', 'attio-data-modeling', 'crm-comparison-framework'],
    sections: [
      {
        type: 'paragraph',
        content:
          'The Attio vs HubSpot debate gets framed as old vs new. That framing misses the point. They are different products serving different motions, and the comparison hinges on what you sell and how you sell it.',
      },
      {
        type: 'heading',
        content: 'Data model: the underlying difference',
      },
      {
        type: 'paragraph',
        content:
          'Attio treats custom objects as first-class. You can model partner programs, deal stages, signals, and account relationships natively. HubSpot has the standard CRM objects (contacts, companies, deals) and custom objects on higher tiers, but the platform is built around the standard shape.',
      },
      {
        type: 'paragraph',
        content:
          'For account-based, partner-led, or product-led motions, Attio rewards the modeling work. For standard inbound B2B with marketing automation, HubSpot wins by default.',
      },
    ],
  },
  {
    slug: 'mapping-operational-pain-in-30-minutes',
    title: 'How to map operational pain in 30 minutes',
    excerpt:
      'Most discovery calls waste 90 minutes on context. A structured 30-minute map produces more usable output. The framework below is what we use on every engagement.',
    author: 'Matthew Piwko',
    publishedTime: '2026-04-01',
    readingTime: '6 min read',
    category: 'Methodology',
    featured: false,
    related: ['four-ways-zapier-breaks-silently', 'when-to-migrate-off-hubspot', 'idempotent-automation'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Discovery calls fail when they try to be comprehensive. Thirty minutes is enough to map the operational pain if the questions are structured around what actually predicts engagement success.',
      },
    ],
  },
  {
    slug: 'four-ways-zapier-breaks-silently',
    title: 'Four ways Zapier breaks silently — and how to catch each one',
    excerpt:
      'Zaps fail without notification more often than operators realize. The four most common silent failure modes, and how to instrument each.',
    author: 'Matthew Piwko',
    publishedTime: '2026-03-25',
    readingTime: '9 min read',
    category: 'Operations',
    featured: false,
    related: ['idempotent-automation', 'event-driven-vs-batch-automation', 'n8n-vs-zapier-vs-make'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Zapier sends error emails. It does not catch every failure. Four patterns slip past the default monitoring, and they account for most of the "the automation just stopped working" calls we get.',
      },
    ],
  },
  {
    slug: 'behind-the-hvac-lead-time-automation',
    title: 'Behind the HVAC lead time automation: scraping five supplier portals at scale',
    excerpt: 'The technical anatomy of the HVAC distributor case study. Three failure modes we had to handle.',
    author: 'Matthew Piwko',
    publishedTime: '2026-03-18',
    readingTime: '11 min read',
    category: 'Case study deep dives',
    featured: false,
    related: ['four-ways-zapier-breaks-silently', 'idempotent-automation', 'event-driven-vs-batch-automation'],
    sections: [
      {
        type: 'paragraph',
        content:
          'The HVAC case study reads simply. Pull from supplier portals, normalize SKUs, sync to CMS. The actual build had three failure modes that took weeks to handle correctly.',
      },
    ],
  },
  {
    slug: 'when-to-migrate-off-hubspot',
    title: 'When to migrate off HubSpot: the signals operators miss',
    excerpt: 'Per-seat cost is the obvious signal. Three other signals matter more and show up earlier.',
    author: 'Matthew Piwko',
    publishedTime: '2026-03-10',
    readingTime: '7 min read',
    category: 'CRM',
    featured: false,
    related: ['attio-vs-hubspot', 'crm-comparison-framework', 'attio-data-modeling'],
    sections: [
      {
        type: 'paragraph',
        content:
          'HubSpot migration calls usually come from cost. By the time cost is the trigger, three earlier signals have already been ignored for six to twelve months.',
      },
    ],
  },
  {
    slug: 'hidden-cost-of-manual-quoting',
    title: 'The hidden cost of manual quoting: small fees compound at scale',
    excerpt:
      'A $25 quote loses $1.03 to Stripe fees, a 4.1% effective rate. Most operators do not run the math at small invoice sizes.',
    author: 'Matthew Piwko',
    publishedTime: '2026-03-03',
    readingTime: '5 min read',
    category: 'Finance ops',
    featured: false,
    related: ['behind-the-hvac-lead-time-automation', 'four-ways-zapier-breaks-silently', 'idempotent-automation'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Stripe fees seem trivial per transaction. At scale they become a meaningful cost center. The math matters at small invoice sizes where the fixed fee dominates the effective rate.',
      },
    ],
  },
  {
    slug: 'retainers-beat-one-shot-projects',
    title: 'Why retainers beat one-shot projects (for operators with stable foundations)',
    excerpt:
      'One-shot automation projects rot within twelve months. The math on retainers vs sequential one-shot work.',
    author: 'Matthew Piwko',
    publishedTime: '2026-02-24',
    readingTime: '6 min read',
    category: 'Engagement model',
    featured: false,
    related: ['mapping-operational-pain-in-30-minutes', 'four-ways-zapier-breaks-silently', 'when-to-migrate-off-hubspot'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Operators who buy one-shot automation projects rebuild them every twelve to eighteen months on average. The total cost of three rebuilds usually exceeds the same period on a maintenance retainer.',
      },
    ],
  },
  {
    slug: 'n8n-vs-zapier-vs-make',
    title: 'n8n vs Zapier vs Make: the honest cost-and-complexity comparison',
    excerpt: 'Three platforms, three pricing models, three failure modes. The decision framework we use on every audit.',
    author: 'Matthew Piwko',
    publishedTime: '2026-02-17',
    readingTime: '10 min read',
    category: 'Tools',
    featured: false,
    related: ['event-driven-vs-batch-automation', 'four-ways-zapier-breaks-silently', 'idempotent-automation'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Three workflow platforms cover most of the automation market for $1M-$10M operators. The choice between them depends on volume, complexity, and engineering capacity.',
      },
    ],
  },
  {
    slug: 'idempotent-automation',
    title: 'Idempotent automation: the design pattern that prevents 80% of incidents',
    excerpt:
      'When the same event fires twice, does your workflow produce the same result? If not, you have an idempotency problem.',
    author: 'Matthew Piwko',
    publishedTime: '2026-02-10',
    readingTime: '8 min read',
    category: 'Architecture',
    featured: false,
    related: ['four-ways-zapier-breaks-silently', 'event-driven-vs-batch-automation', 'n8n-vs-zapier-vs-make'],
    sections: [
      {
        type: 'paragraph',
        content:
          'Most automation incidents come from the same event firing twice. Idempotent design means the second firing produces the same result as the first — no duplicate records, no duplicate emails, no duplicate invoices.',
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
