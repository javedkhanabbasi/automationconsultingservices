export interface CaseStudy {
  slug: string;
  shortTitle: string;
  title: string;
  industry: string;
  industryTag: string;
  revenue: string;
  region: string;
  timeline: string;
  headlineMetric: string;
  description: string;
  results: { value: string; label: string }[];
  techStack: string[];
  challenge: { heading: string; paragraphs: string[] };
  solution: { heading: string; paragraphs: string[]; steps: { num: number; text: string }[] };
  outcome: { heading: string; paragraphs: string[] };
  testimonial?: { quote: string; attribution: string; role: string };
  related: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hvac-lead-time-automation',
    title: 'Real-time lead time automation across 5,500+ SKUs for an $8M HVAC distributor',
    shortTitle: 'Real-time lead time automation for an $8M HVAC distributor',
    industry: 'Distribution & supplier networks',
    industryTag: 'Distribution',
    revenue: '$8M',
    region: 'Massachusetts',
    timeline: '5 weeks to live',
    headlineMetric: '5,500+ SKUs updated automatically',
    description:
      'Scheduled automation pulling live availability from GE and Bosch supplier portals and pushing accurate hourly lead times to a Massachusetts HVAC distributor website.',
    results: [
      { value: '5,500+', label: 'SKUs managed automatically' },
      { value: 'Hourly', label: 'refresh from source systems' },
      { value: '0', label: 'manual updates required' },
    ],
    techStack: ['Custom Python scrapers', 'Bosch distributor API', 'Scheduled cron', 'CSV CMS sync', 'Slack monitoring'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'A Massachusetts HVAC distributor with $8M in revenue carried 5,500+ SKUs across GE, Bosch, and three smaller supplier lines. Lead times changed daily based on supplier availability, but the website showed "stock estimate" placeholders that hadn\'t been updated in weeks.',
        'Contractors started calling to verify before quoting. Inside sales spent 4-6 hours per day answering "is this actually in stock?" calls. The website was supposed to remove that friction. Instead it added a layer of distrust.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We built scheduled scrapers and API pulls that hit each supplier portal every hour, normalized the data across vendor-specific SKU taxonomies, and synced the consolidated lead time map to the website CMS via a CSV pipeline.',
      ],
      steps: [
        { num: 1, text: 'Map each supplier\'s data surface (API, portal, CSV export)' },
        { num: 2, text: 'Build Python scrapers and API clients per source' },
        { num: 3, text: 'Normalize SKU taxonomy across vendors into one record set' },
        { num: 4, text: 'Sync to website CMS hourly with diff-based update' },
        { num: 5, text: 'Slack alerts on scraper failure or anomaly' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        'Contractors stopped calling to verify lead times. The inside sales team got their day back. The website went from a liability to an asset. Five weeks from kickoff to production.',
      ],
    },
    testimonial: {
      quote:
        'Our contractor base stopped calling to verify lead times. The website is accurate enough they just trust it. That alone freed up our inside sales team for actual selling.',
      attribution: 'Operations Lead',
      role: '$8M HVAC distributor, Massachusetts',
    },
    related: ['fencing-automation-management', 'supplement-quoting-automation', 'mobile-pet-grooming-dashboard'],
  },
  {
    slug: 'fencing-automation-management',
    title: 'Operations automation for a $25M fencing contractor across 150 employees',
    shortTitle: 'Operations automation for a $25M fencing contractor',
    industry: 'Construction & contractors',
    industryTag: 'Construction',
    revenue: '$25M',
    region: 'United States',
    timeline: 'Ongoing retainer',
    headlineMetric: '100+ workflows managed',
    description:
      'Ongoing retainer engagement managing 100+ workflows across a 150-person field operation, including bid management, scheduling, dispatch, and reporting.',
    results: [
      { value: '100+', label: 'workflows actively managed' },
      { value: '150', label: 'employees on the platform' },
      { value: '$25M', label: 'annual revenue supported' },
    ],
    techStack: ['Monday.com', 'Zapier', 'Make', 'Slack', 'QuickBooks', 'Custom integrations'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'Complete Fence runs a $25M operation across multiple states with 150 employees. The team had a working operational stack on Monday.com but workflows lived in tribal knowledge. New hires took weeks to ramp. Routine errors compounded.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We took on the ongoing automation management as a retainer engagement. 100+ workflows are now documented, monitored, and evolving as the business changes. New requests get scoped against the existing system rather than added as one-off Zaps.',
      ],
      steps: [
        { num: 1, text: 'Audit and document existing workflow estate' },
        { num: 2, text: 'Build monitoring layer across all critical workflows' },
        { num: 3, text: 'Establish change management process for new requests' },
        { num: 4, text: 'Weekly health reports and roadmap maintenance' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        'The system holds. New automation requests get evaluated, scoped, and shipped through a process. Workflow estate has grown by 40% during the retainer with zero increase in incidents.',
      ],
    },
    testimonial: {
      quote:
        'Multiple issues we needed resolved in a very complicated workspace. Matthew was very communicative and detail oriented. Would definitely recommend.',
      attribution: 'Tony Velasquez',
      role: 'Business Improvement, Complete Fence',
    },
    related: ['hvac-lead-time-automation', 'mobile-pet-grooming-dashboard', 'supplement-quoting-automation'],
  },
  {
    slug: 'healthcare-meeting-automation',
    title: 'Meeting-to-action automation reclaiming 6-8 hours per week for a Series B healthcare SaaS CEO',
    shortTitle: 'Meeting-to-action automation for a healthcare SaaS CEO',
    industry: 'Healthcare SaaS',
    industryTag: 'Healthcare SaaS',
    revenue: 'Series B',
    region: 'United States',
    timeline: '4 weeks to live',
    headlineMetric: '6-8 hours saved per week',
    description:
      'AI-powered meeting capture and action item extraction that returns 6-8 hours per week to a Series B healthcare SaaS CEO.',
    results: [
      { value: '6-8 hrs', label: 'reclaimed per week' },
      { value: '100%', label: 'meeting capture coverage' },
      { value: '4 wks', label: 'time to production' },
    ],
    techStack: ['Fireflies.ai', 'OpenAI API', 'Gmail', 'Notion', 'Slack', 'Custom logic'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'Steve Wiggins, CEO of Oxbridge Health, ran 20+ external meetings per week. Action items emerged from every meeting. Most lived in handwritten notes that never reached the team. Important commitments slipped.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We built an AI-powered meeting-to-action pipeline. Fireflies transcribed every call. A custom prompt extracted action items, identified owners, and routed each item to the right Slack channel or Notion doc. The CEO reviewed and approved via a daily Gmail digest.',
      ],
      steps: [
        { num: 1, text: 'Meeting transcript captured via Fireflies' },
        { num: 2, text: 'OpenAI extracts action items with owners and deadlines' },
        { num: 3, text: 'CEO reviews via daily Gmail digest' },
        { num: 4, text: 'Approved items route to Slack/Notion automatically' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        'CEO reclaimed 6-8 hours per week from manual note-taking and follow-up. Action item completion rate increased measurably. Commitments stopped slipping.',
      ],
    },
    testimonial: {
      quote: 'Matt is first class in every respect.',
      attribution: 'Steve Wiggins',
      role: 'CEO, Oxbridge Health',
    },
    related: ['supplement-quoting-automation', 'fencing-automation-management', 'competitor-intelligence'],
  },
  {
    slug: 'supplement-quoting-automation',
    title: '80% faster quote generation for a $10M supplement manufacturer',
    shortTitle: 'Quote generation automation for a $10M supplement manufacturer',
    industry: 'Manufacturing',
    industryTag: 'Manufacturing',
    revenue: '$10M',
    region: 'United States',
    timeline: '3 weeks to live',
    headlineMetric: '80% faster quote generation',
    description:
      'Automated quote generation system replacing manual spreadsheet calculations and copy-paste pricing across a multi-SKU supplement manufacturer.',
    results: [
      { value: '80%', label: 'faster quote turnaround' },
      { value: '$10M', label: 'annual revenue operator' },
      { value: '3 wks', label: 'time to production' },
    ],
    techStack: ['HubSpot', 'Google Sheets', 'Zapier', 'PandaDoc', 'Custom pricing logic'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'A $10M supplement manufacturer generated quotes through manual spreadsheet calculations and copy-paste pricing. Each quote took 30-45 minutes. Sales reps closed quotes slower than the market demanded. Pricing errors made it into customer hands.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We built a quote generation system tying HubSpot deal records to a centralized pricing logic engine. Sales rep enters quantity and SKU mix, system returns priced quote with margin protection rules baked in. Quote goes through PandaDoc for e-signature without manual document assembly.',
      ],
      steps: [
        { num: 1, text: 'Centralize pricing logic in Google Sheets with version control' },
        { num: 2, text: 'Wire HubSpot deal fields to pricing engine via Zapier' },
        { num: 3, text: 'Auto-generate PandaDoc quote from deal record' },
        { num: 4, text: 'Margin protection rules block under-priced quotes' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        '80% faster quote generation. Sales reps closed 30%+ more quotes per week at the prior conversion rate, which translated directly to net new revenue. Pricing errors dropped to zero.',
      ],
    },
    related: ['healthcare-meeting-automation', 'competitor-intelligence', 'hvac-lead-time-automation'],
  },
  {
    slug: 'competitor-intelligence',
    title: 'Competitor intelligence automation generating 12-25 look-alike accounts per closed deal for a Series B AdTech',
    shortTitle: 'Competitor intelligence automation for a Series B AdTech',
    industry: 'AdTech & B2B SaaS',
    industryTag: 'AdTech',
    revenue: 'Series B',
    region: 'United States',
    timeline: '6 weeks to live',
    headlineMetric: '12-25 look-alike accounts per closed deal',
    description:
      'Auto-enrichment of closed deals with 12-25 look-alike accounts from Crunchbase and Apollo, staged for RevOps review with <2% duplicate rate.',
    results: [
      { value: '12-25', label: 'look-alike accounts per close' },
      { value: '<2%', label: 'duplicate rate' },
      { value: '6 wks', label: 'time to production' },
    ],
    techStack: ['HubSpot', 'Crunchbase API', 'Apollo', 'Clay', 'Google Sheets', 'Custom dedup logic'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'A Series B AdTech operator closed roughly 8 deals per quarter. Sales leadership knew that closed deals were the strongest signal for the next sales targets, but manually finding look-alikes from each closed deal was a weekly half-day exercise that never quite happened.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We built an enrichment pipeline: closed-won deal triggers Crunchbase + Apollo queries against firmographic signals, returns 12-25 ranked look-alikes, stages them in a sheet for RevOps review with deduplication against existing pipeline.',
      ],
      steps: [
        { num: 1, text: 'Deal closes in HubSpot, trigger fires' },
        { num: 2, text: 'Crunchbase + Apollo queries against firmographic profile' },
        { num: 3, text: 'Dedup against existing CRM records' },
        { num: 4, text: 'Stage 12-25 look-alikes in Google Sheet for RevOps' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        '12-25 look-alike accounts now generated automatically per closed deal. Duplicate rate stayed under 2% thanks to email + domain matching plus fuzzy company name matching. RevOps got their half-day back.',
      ],
    },
    related: ['supplement-quoting-automation', 'led-display-lead-gen', 'healthcare-meeting-automation'],
  },
  {
    slug: 'led-display-lead-gen',
    title: '60+ qualified opportunities in 14 days for a $5M LED display company',
    shortTitle: 'Lead generation engine for a $5M LED display company',
    industry: 'Events & AV rentals',
    industryTag: 'Events & AV',
    revenue: '$5M',
    region: 'United States',
    timeline: '14 days to pipeline',
    headlineMetric: '60+ qualified opportunities',
    description:
      'Outbound lead generation system that delivered 60+ qualified opportunities valued at $2.5K-$10K each in the first 14 days post-launch.',
    results: [
      { value: '60+', label: 'qualified opportunities' },
      { value: '$2.5K-$10K', label: 'per opportunity value' },
      { value: '14 days', label: 'to first pipeline' },
    ],
    techStack: ['Apollo', 'Instantly', 'Custom enrichment', 'HubSpot', 'Google Sheets'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'A $5M LED display company needed pipeline fast. The motion was high-velocity, low-touch outbound to event planners and AV rental shops. Existing inbound was inconsistent.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We stood up a complete outbound stack in 14 days: Apollo for sourcing, custom enrichment for event-vertical signals, Instantly for sequencing, HubSpot for pipeline management.',
      ],
      steps: [
        { num: 1, text: 'Apollo audience build against event-planning verticals' },
        { num: 2, text: 'Custom enrichment for venue size and event frequency' },
        { num: 3, text: 'Instantly sequencing with personalized openers' },
        { num: 4, text: 'Qualified responses routed to HubSpot pipeline' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        '60+ qualified opportunities in pipeline within 14 days of launch. Average deal value $2.5K-$10K. Pipeline coverage problem solved.',
      ],
    },
    related: ['competitor-intelligence', 'supplement-quoting-automation', 'hvac-lead-time-automation'],
  },
  {
    slug: 'mobile-pet-grooming-dashboard',
    title: 'Unified operations dashboard for a $1.5M mobile pet grooming operator',
    shortTitle: 'Unified operations dashboard for a $1.5M field service operator',
    industry: 'Field services',
    industryTag: 'Field services',
    revenue: '$1.5M',
    region: 'United States',
    timeline: '4 weeks to live',
    headlineMetric: '3 disconnected tools unified',
    description:
      'Custom dashboard unifying QuickBooks, Gusto, and Samsara data into a single operating surface for a mobile pet grooming franchise.',
    results: [
      { value: '3', label: 'systems unified' },
      { value: '1', label: 'single source of truth' },
      { value: '4 wks', label: 'to production' },
    ],
    techStack: ['Custom Node.js dashboard', 'QuickBooks API', 'Gusto API', 'Samsara API', 'Voice AI', 'Browser automation'],
    challenge: {
      heading: 'The challenge',
      paragraphs: [
        'Wayne Murry runs Maddie\'s Mobile Makeovers, a $1.5M mobile pet grooming operation. Financial data lived in QuickBooks, payroll in Gusto, fleet telematics in Samsara. No single view existed of the business.',
      ],
    },
    solution: {
      heading: 'The solution',
      paragraphs: [
        'We built a custom Node.js dashboard that pulled live data from QuickBooks, Gusto, and Samsara into one operating surface. The build included a Voice AI integration for customer inquiries and browser automation for repetitive admin tasks.',
      ],
      steps: [
        { num: 1, text: 'Audit existing data sources and access methods' },
        { num: 2, text: 'Build custom integration layer with each vendor API' },
        { num: 3, text: 'Custom Node.js dashboard with unified views' },
        { num: 4, text: 'Voice AI integration for customer inquiry routing' },
      ],
    },
    outcome: {
      heading: 'The outcome',
      paragraphs: [
        'Three disconnected systems unified into one dashboard. Operations decisions now made against current data, not last month\'s exports.',
      ],
    },
    testimonial: {
      quote:
        'This was a complex, multi-layered project involving a custom dashboard integrating several third-party vendor APIs, a Voice AI system, and browser automation workflows. The team handled all of it.',
      attribution: 'Wayne Murry',
      role: "CEO, Maddie's Mobile Makeovers",
    },
    related: ['fencing-automation-management', 'hvac-lead-time-automation', 'healthcare-meeting-automation'],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
