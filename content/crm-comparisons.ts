export interface CrmComparison {
  slug: string;
  a: { name: string; tag: string };
  b: { name: string; tag: string };
  title: string;
  excerpt: string;
  verdict: string;
  whenAWins: string[];
  whenBWins: string[];
  criteria: { name: string; a: string; b: string; winner: 'a' | 'b' | 'tie' }[];
}

export const crmComparisons: CrmComparison[] = [
  {
    slug: 'attio-vs-hubspot',
    a: { name: 'Attio', tag: 'Modern GTM-native' },
    b: { name: 'HubSpot', tag: 'All-in-one growth' },
    title: 'Attio vs HubSpot',
    excerpt:
      'Attio is a CRM-first platform with a flexible data model. HubSpot is a marketing-first platform with a CRM bolted on. The choice comes down to your data model and your motion.',
    verdict:
      'Pick Attio when your motion is account-based, partner-led, or product-led, and your data model does not fit the standard B2B shape. Pick HubSpot when you want marketing and sales in one platform and your motion is inbound-heavy.',
    whenAWins: [
      'Custom data model with non-standard objects',
      'Account-based or partner-led motion',
      'Per-seat cost matters at 10+ users',
      'Modern API surface is required',
    ],
    whenBWins: [
      'Marketing automation is a primary driver',
      'Inbound-heavy motion with forms and landing pages',
      'Native integration breadth matters',
      'Team will not invest in custom data modeling',
    ],
    criteria: [
      { name: 'Data model flexibility', a: 'Custom objects native', b: 'Fixed objects + properties', winner: 'a' },
      { name: 'Marketing automation', a: 'Limited', b: 'Mature', winner: 'b' },
      { name: 'Per-seat at 10 users', a: '~$30/seat', b: '~$90/seat', winner: 'a' },
      { name: 'Time to first value', a: '2-4 weeks', b: '1-2 weeks', winner: 'b' },
      { name: 'Native integrations', a: '~50', b: '~1000+', winner: 'b' },
      { name: 'API quality', a: 'Modern', b: 'Mature', winner: 'tie' },
    ],
  },
  {
    slug: 'attio-vs-salesforce',
    a: { name: 'Attio', tag: 'Modern GTM-native' },
    b: { name: 'Salesforce', tag: 'Enterprise standard' },
    title: 'Attio vs Salesforce',
    excerpt: 'Modern flexibility vs enterprise depth. Most $10K-$50M operators do not need Salesforce capability yet.',
    verdict:
      'Pick Attio for $1M-$10M operators. Pick Salesforce when you are 50+ users, have complex integration estate, or industry compliance demands it.',
    whenAWins: ['Under $25M revenue', 'Modern data model', 'Speed to value matters', 'Cost-sensitive'],
    whenBWins: ['50+ users', 'Existing Salesforce integration estate', 'Industry compliance', 'Enterprise procurement'],
    criteria: [
      { name: 'Speed to first value', a: '2-4 weeks', b: '6-12 weeks', winner: 'a' },
      { name: 'Per-seat cost', a: '~$30/seat', b: '~$150+/seat', winner: 'a' },
      { name: 'Enterprise features', a: 'Limited', b: 'Mature', winner: 'b' },
      { name: 'Integration ecosystem', a: 'Modern, small', b: 'Vast AppExchange', winner: 'b' },
      { name: 'Custom object depth', a: 'First-class', b: 'First-class', winner: 'tie' },
    ],
  },
  {
    slug: 'attio-vs-pipedrive',
    a: { name: 'Attio', tag: 'Multi-object flexibility' },
    b: { name: 'Pipedrive', tag: 'Pipeline-first focus' },
    title: 'Attio vs Pipedrive',
    excerpt: 'Multi-object data model vs pipeline focus. Pipedrive wins when the deal-stage view IS the operating surface.',
    verdict:
      'Pick Attio if your data model has multiple object types that need relationships. Pick Pipedrive if your sales motion is purely pipeline-stage based.',
    whenAWins: ['Multiple object types needed', 'Partner or account-based motion', 'Custom data relationships'],
    whenBWins: ['Pure pipeline-stage motion', 'Mobile-first sales team', 'Lowest learning curve needed'],
    criteria: [
      { name: 'Multi-object support', a: 'Native', b: 'Limited', winner: 'a' },
      { name: 'Pipeline view', a: 'Good', b: 'Best-in-class', winner: 'b' },
      { name: 'Per-seat at 10 users', a: '~$30/seat', b: '~$50/seat', winner: 'a' },
      { name: 'Mobile experience', a: 'Adequate', b: 'Excellent', winner: 'b' },
    ],
  },
  {
    slug: 'attio-vs-close',
    a: { name: 'Attio', tag: 'GTM-native data model' },
    b: { name: 'Close', tag: 'Call-centric outbound' },
    title: 'Attio vs Close',
    excerpt: 'Data-model-first vs call-experience-first. Different motions, different winners.',
    verdict: 'Pick Attio for account-led motions. Pick Close for outbound-heavy, call-volume-driven motions.',
    whenAWins: ['Account-based motion', 'Multi-touch enterprise sales', 'Data model complexity'],
    whenBWins: ['Outbound dial-heavy motion', 'SMS workflows critical', 'Speed and call quality matter'],
    criteria: [
      { name: 'Call experience', a: 'Basic', b: 'Best-in-class', winner: 'b' },
      { name: 'Data model depth', a: 'Native multi-object', b: 'Pipeline-focused', winner: 'a' },
      { name: 'Per-seat at 10 users', a: '~$30/seat', b: '~$60/seat', winner: 'a' },
    ],
  },
  {
    slug: 'hubspot-vs-salesforce',
    a: { name: 'HubSpot', tag: 'All-in-one growth' },
    b: { name: 'Salesforce', tag: 'Enterprise standard' },
    title: 'HubSpot vs Salesforce',
    excerpt: 'The classic mid-market debate. Cost trajectory, integration estate, and team complexity decide it.',
    verdict:
      'HubSpot for $1M-$10M operators with marketing automation needs. Salesforce when you cross 50 users or inherit Salesforce-locked infrastructure.',
    whenAWins: ['Under 25 users', 'Marketing automation critical', 'Speed to value matters', 'Inbound motion'],
    whenBWins: ['50+ users', 'Complex hierarchies', 'Enterprise compliance', 'Existing Salesforce estate'],
    criteria: [
      { name: 'Speed to first value', a: '1-2 weeks', b: '6-12 weeks', winner: 'a' },
      { name: 'Marketing automation', a: 'Mature', b: 'Via Pardot add-on', winner: 'a' },
      { name: 'Cost trajectory past 25 users', a: 'Steep', b: 'Linear', winner: 'b' },
      { name: 'Enterprise integration', a: 'Good', b: 'Best-in-class', winner: 'b' },
    ],
  },
  {
    slug: 'pipedrive-vs-hubspot',
    a: { name: 'Pipedrive', tag: 'Pipeline-first' },
    b: { name: 'HubSpot', tag: 'Marketing + sales' },
    title: 'Pipedrive vs HubSpot',
    excerpt: 'Sales-first vs marketing-first. Two completely different motions wearing the same CRM label.',
    verdict:
      'Pipedrive when sales is the engine and marketing is light. HubSpot when marketing automation is doing real work.',
    whenAWins: ['Outbound or transactional motion', 'Light marketing automation', 'Lower per-seat budget'],
    whenBWins: ['Inbound-driven pipeline', 'Marketing nurture is critical', 'Content + sales unified'],
    criteria: [
      { name: 'Pipeline view quality', a: 'Best-in-class', b: 'Good', winner: 'a' },
      { name: 'Marketing automation', a: 'Basic', b: 'Mature', winner: 'b' },
      { name: 'Per-seat cost', a: '~$50/seat', b: '~$90/seat', winner: 'a' },
    ],
  },
  {
    slug: 'close-vs-hubspot',
    a: { name: 'Close', tag: 'Call-centric outbound' },
    b: { name: 'HubSpot', tag: 'Marketing-led inbound' },
    title: 'Close vs HubSpot',
    excerpt: 'Call-centric outbound vs marketing-led inbound. Volume of dials determines the right call.',
    verdict: 'Close when your team makes 30+ calls/day. HubSpot when inbound forms drive most pipeline.',
    whenAWins: ['Dial-heavy outbound', 'SMS workflows', 'Power-dialer features critical'],
    whenBWins: ['Marketing automation critical', 'Inbound-led motion', 'Native integration breadth'],
    criteria: [
      { name: 'Call experience', a: 'Best-in-class', b: 'Bolt-on dialers', winner: 'a' },
      { name: 'Marketing automation', a: 'None', b: 'Mature', winner: 'b' },
      { name: 'SMS native', a: 'Built-in', b: 'Add-on', winner: 'a' },
    ],
  },
  {
    slug: 'pipedrive-vs-salesforce',
    a: { name: 'Pipedrive', tag: 'Pipeline-first' },
    b: { name: 'Salesforce', tag: 'Enterprise standard' },
    title: 'Pipedrive vs Salesforce',
    excerpt: 'Most $10K-$50M operators do not need Salesforce. Pipedrive ships in weeks at one-third the cost.',
    verdict: 'Pipedrive for under-25-user teams. Salesforce when you scale past 50 or inherit Salesforce infrastructure.',
    whenAWins: ['Under 25 users', 'Pipeline-driven motion', 'Speed matters', 'Cost-sensitive'],
    whenBWins: ['50+ users', 'Complex multi-team hierarchies', 'Enterprise integration estate'],
    criteria: [
      { name: 'Implementation time', a: '1-2 weeks', b: '6-12 weeks', winner: 'a' },
      { name: 'Per-seat at 10 users', a: '~$50/seat', b: '~$150+/seat', winner: 'a' },
      { name: 'Enterprise depth', a: 'Limited', b: 'Mature', winner: 'b' },
    ],
  },
  {
    slug: 'close-vs-salesforce',
    a: { name: 'Close', tag: 'Call-centric outbound' },
    b: { name: 'Salesforce', tag: 'Enterprise standard' },
    title: 'Close vs Salesforce',
    excerpt: 'Outbound velocity vs enterprise depth. Different operators entirely.',
    verdict: 'Close when call volume drives revenue. Salesforce when team is 50+ and integration estate is already there.',
    whenAWins: ['Outbound-driven motion', 'Under 25 users', 'Call experience matters'],
    whenBWins: ['Enterprise scale', 'Complex hierarchies', 'Existing Salesforce estate'],
    criteria: [
      { name: 'Implementation time', a: '1-2 weeks', b: '6-12 weeks', winner: 'a' },
      { name: 'Call experience', a: 'Best-in-class', b: 'Add-on', winner: 'a' },
      { name: 'Enterprise scaling', a: 'Limited', b: 'Best-in-class', winner: 'b' },
    ],
  },
  {
    slug: 'pipedrive-vs-close',
    a: { name: 'Pipedrive', tag: 'Pipeline-first' },
    b: { name: 'Close', tag: 'Call-centric outbound' },
    title: 'Pipedrive vs Close',
    excerpt: 'Pipeline-stage view vs call-centric outbound. Both serve sales-led teams differently.',
    verdict: 'Pipedrive for pipeline visibility. Close for dial-heavy outbound velocity.',
    whenAWins: ['Pipeline stages drive sales motion', 'Mobile-first team', 'Mixed inbound/outbound'],
    whenBWins: ['Outbound-only motion', 'Call volume drives revenue', 'SMS workflows critical'],
    criteria: [
      { name: 'Pipeline view', a: 'Best-in-class', b: 'Good', winner: 'a' },
      { name: 'Call experience', a: 'Bolt-on', b: 'Best-in-class', winner: 'b' },
      { name: 'Per-seat at 10 users', a: '~$50/seat', b: '~$60/seat', winner: 'a' },
    ],
  },
];

export function getComparison(slug: string): CrmComparison | undefined {
  return crmComparisons.find((c) => c.slug === slug);
}
