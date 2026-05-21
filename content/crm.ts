export interface CrmPlatform {
  slug: string;
  name: string;
  tagline: string;
  partnerStatus: string;
  partnerVerified: boolean;
  bestFor: string;
  failsAt: string;
  timeline: string;
  costNote: string;
  practitionerNote: string;
  capabilities: string[];
  faqs: { question: string; answer: string }[];
}

export const crmPlatforms: CrmPlatform[] = [
  {
    slug: 'attio',
    name: 'Attio',
    tagline: 'Modern GTM-native CRM with flexible data model',
    partnerStatus: 'Expert Partner',
    partnerVerified: true,
    bestFor: 'Account-based, partner-led, or product-led motion with a non-standard data model',
    failsAt: 'Marketing automation depth, very large native integration catalog',
    timeline: '2-4 weeks to first value',
    costNote: '~$30/seat at 10 users',
    practitionerNote:
      'The flexibility of the data model is the reason and the risk. Attio rewards careful object modeling and punishes the "let it grow organically" approach.',
    capabilities: [
      'Custom object modeling with first-class relationships',
      'Native automation on the data model',
      'Modern API surface with well-documented endpoints',
      'Slack, Gmail, calendar native integrations',
      'Reference fields and computed properties',
    ],
    faqs: [
      {
        question: 'Is Attio ready for production at $5M+ scale?',
        answer:
          'Yes. We have shipped Attio implementations for operators at $1M, $3M, and $10M+ revenue. The platform handles team sizes from 5 to 80+ users reliably.',
      },
      {
        question: 'How does Attio compare to HubSpot on cost?',
        answer:
          'Attio runs roughly one-third the per-seat cost of HubSpot at 10 users. The savings compound as teams grow.',
      },
    ],
  },
  {
    slug: 'hubspot',
    name: 'HubSpot',
    tagline: 'All-in-one growth platform with mature marketing automation',
    partnerStatus: 'Solutions Partner',
    partnerVerified: false,
    bestFor: 'Marketing-first teams who want CRM and marketing automation in one platform',
    failsAt: 'Non-standard B2B data shapes, cost scaling past 10 paid users',
    timeline: '1-2 weeks to first value',
    costNote: '~$90/seat at 10 users',
    practitionerNote:
      'HubSpot is fastest to ship and most expensive to live with. Per-seat pricing compounds as the team grows.',
    capabilities: [
      'Mature marketing automation',
      '1,000+ native integrations',
      'Workflow builder with branching logic',
      'Sales sequences and templates',
      'Customer service hub',
    ],
    faqs: [
      {
        question: 'When does HubSpot pricing become a problem?',
        answer:
          'Usually around 10-15 paid users. Per-seat pricing compounds quickly. Operators outgrowing HubSpot on cost typically migrate to Attio, Pipedrive, or Salesforce depending on motion.',
      },
      {
        question: 'Can we use HubSpot for CRM only without marketing?',
        answer:
          'Yes, but you pay for the bundled platform either way. If you do not use marketing, Pipedrive or Close usually fit better.',
      },
    ],
  },
  {
    slug: 'salesforce',
    name: 'Salesforce',
    tagline: 'Enterprise standard with deep customization',
    partnerStatus: 'Practitioner',
    partnerVerified: false,
    bestFor: 'Enterprise sales teams with complex hierarchies, custom objects, and integration estate',
    failsAt: 'Speed-to-first-value, small-team economics, simple use cases',
    timeline: '6-12 weeks to first value',
    costNote: '~$150+/seat at 10 users (with implementation)',
    practitionerNote:
      'Salesforce is overkill for most $10K-$50M operators. The platform is excellent at what it does, but you pay for capability you will not use until $25M+.',
    capabilities: [
      'Deep custom object support',
      'Mature Flow Builder automation',
      'Enterprise integration estate',
      'Multi-currency, multi-language',
      'Salesforce ecosystem and AppExchange',
    ],
    faqs: [
      {
        question: 'When is Salesforce actually the right choice?',
        answer:
          'When the integration estate already lives on Salesforce, when the team is 50+ users, or when industry compliance requires Salesforce-specific tooling.',
      },
      {
        question: 'How long does a Salesforce migration take?',
        answer:
          '12-24 weeks for $10K-$50M operators. Longer if extensive custom objects or compliance requirements are involved.',
      },
    ],
  },
  {
    slug: 'pipedrive',
    name: 'Pipedrive',
    tagline: 'Pipeline-first CRM for transactional sales motions',
    partnerStatus: 'Practitioner',
    partnerVerified: false,
    bestFor: 'Pipeline-driven sales teams where the deal-stage view is the operating surface',
    failsAt: 'Multi-object data models, marketing automation, complex routing',
    timeline: '1-2 weeks to first value',
    costNote: '~$50/seat at 10 users',
    practitionerNote:
      'Pipedrive is the most underrated CRM for transactional B2B motions. Operators who think they need HubSpot often do better on Pipedrive plus a separate marketing tool.',
    capabilities: [
      'Clean pipeline-stage view',
      'Native deal-stage automation',
      'Forecasting and pipeline reporting',
      'Mobile-first interface',
      'Standard CRM integrations',
    ],
    faqs: [
      {
        question: 'Is Pipedrive too simple for a growing team?',
        answer:
          'Not for pipeline-driven motions. Where it fails is when the team needs heavy marketing automation or multi-object data models.',
      },
      {
        question: 'Can Pipedrive integrate with our other tools?',
        answer:
          'Yes, via Zapier, Make, or native integrations. Standard SaaS-stack integrations are well covered.',
      },
    ],
  },
  {
    slug: 'close',
    name: 'Close',
    tagline: 'Call-centric CRM for outbound and inside sales',
    partnerStatus: 'Practitioner',
    partnerVerified: false,
    bestFor: 'Outbound and inside-sales teams where call volume and dial-time drive revenue',
    failsAt: 'Marketing automation, enterprise-style account hierarchies',
    timeline: '1-2 weeks to first value',
    costNote: '~$60/seat at 10 users',
    practitionerNote:
      'Close treats the phone as a first-class object the way Pipedrive treats the deal-stage. If your team lives on calls and SMS, Close removes more friction per dollar than any other platform.',
    capabilities: [
      'Native call dialing and recording',
      'SMS workflows and templates',
      'Email sequencing with deliverability',
      'Power-dialer and call coaching',
      'Built-in voicemail drop',
    ],
    faqs: [
      {
        question: 'Is Close worth migrating from HubSpot?',
        answer:
          'Yes if your team is outbound-heavy and call volume drives revenue. The call experience is materially better than HubSpot bolt-on dialers.',
      },
      {
        question: 'Can Close handle non-outbound teams?',
        answer:
          'It can, but the platform shines on outbound. For inbound-heavy motions, HubSpot, Attio, or Pipedrive usually fit better.',
      },
    ],
  },
];

export function getCrm(slug: string): CrmPlatform | undefined {
  return crmPlatforms.find((c) => c.slug === slug);
}
