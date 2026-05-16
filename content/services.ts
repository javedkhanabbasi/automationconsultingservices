export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  workflow: { step: string; tag?: string }[];
  metricLabel: string;
  metricValue: string;
  relatedCaseStudy: { slug: string; label: string };
  stack: string[];
  faqs: { question: string; answer: string }[];
}

export const services: Service[] = [
  {
    slug: 'sales-automation',
    name: 'Sales automation',
    shortDesc: 'Lead routing, CRM enrichment, competitor intelligence, quote generation, and outreach systems.',
    longDesc:
      'Sales automation turns inbound data into actionable pipeline without humans copying anything between tools. We design lead routing rules that match deal type to rep, enrich every record with firmographic data on entry, and generate look-alike account lists from closed-won deals automatically.',
    features: [
      'Lead capture and routing rules',
      'CRM enrichment workflows',
      'Competitor sync automation',
      'Quote generation systems',
      'Outbound sequence orchestration',
      'Pipeline reporting automation',
    ],
    workflow: [
      { step: 'Deal closes in HubSpot', tag: 'Trigger' },
      { step: 'Enrich firmographics via Apollo + Crunchbase' },
      { step: 'Generate 12-25 look-alike accounts' },
      { step: 'Stage for RevOps review in Sheets', tag: 'Output' },
    ],
    metricLabel: 'Per closed deal',
    metricValue: '12-25 accounts',
    relatedCaseStudy: { slug: 'competitor-intelligence', label: 'AdTech case study' },
    stack: ['HubSpot', 'Apollo', 'Crunchbase', 'Clay', 'Attio', 'Gmail'],
    faqs: [
      {
        question: 'Does this require a specific CRM?',
        answer:
          'No. We have shipped sales automation on HubSpot, Salesforce, Attio, Pipedrive, and Close. The CRM choice depends on your motion, not the automation pattern.',
      },
      {
        question: 'How is this different from buying ZoomInfo or Apollo?',
        answer:
          'Data vendors give you records. Sales automation wires the records into your CRM, your enrichment workflow, and your outreach so the data actually moves the pipeline forward.',
      },
    ],
  },
  {
    slug: 'operations-automation',
    name: 'Operations automation',
    shortDesc: 'End-to-end workflow engineering across bidding, scheduling, dispatch, inventory, and reporting.',
    longDesc:
      'Operations automation is what turns a 150-person field operation from chaos into a documented system. We engineer the workflows that handle bid management, crew scheduling, dispatch logic, inventory sync, and reporting — with explicit failure modes, audit trails, and rollback procedures.',
    features: [
      'Bid and quote management',
      'Scheduling and dispatch automation',
      'Inventory and lead time sync',
      'Operational dashboards',
      'Silent failure monitoring',
      'Stack documentation',
    ],
    workflow: [
      { step: 'Bid won in Monday.com', tag: 'Trigger' },
      { step: 'Auto-generate job records and assignments' },
      { step: 'Schedule crews via dispatch rules' },
      { step: 'Nightly enforcement and conflict checks', tag: 'Output' },
    ],
    metricLabel: 'Workflows managed',
    metricValue: '100+',
    relatedCaseStudy: { slug: 'fencing-automation-management', label: 'Fencing case study' },
    stack: ['Monday.com', 'Make', 'n8n', 'Slack', 'QuickBooks', 'Samsara'],
    faqs: [
      {
        question: 'Will this break my team\'s existing process?',
        answer:
          'No. We map current state in discovery, identify which parts work, and automate around them. Existing process is the starting point, not the obstacle.',
      },
      {
        question: 'What if our tools cannot all talk to each other?',
        answer:
          'Most cannot natively. That is what integration architecture solves. We declare data contracts between systems so they connect through known contracts, not through hope.',
      },
    ],
  },
  {
    slug: 'admin-workflows',
    name: 'Admin workflows',
    shortDesc: 'Meeting capture, document generation, approval routing, and executive rollups.',
    longDesc:
      'The administrative layer of a growing business eats more hours than any other category. Admin workflows remove that drag. Meeting transcripts get captured automatically. Action items get extracted, owner-tagged, and routed to the right Slack channels. Weekly executive rollups assemble themselves.',
    features: [
      'Meeting-to-action automation',
      'Document and report generation',
      'Approval and signature routing',
      'Weekly executive rollups',
      'Onboarding and HR workflows',
      'Compliance audit trails',
    ],
    workflow: [
      { step: 'Meeting transcript captured via Fireflies', tag: 'Trigger' },
      { step: 'AI extracts owner-tagged action items' },
      { step: 'Executive approval gate via Gmail' },
      { step: 'Same-day distribution + weekly rollup', tag: 'Output' },
    ],
    metricLabel: 'CEO time saved',
    metricValue: '6-8 hrs/week',
    relatedCaseStudy: { slug: 'healthcare-meeting-automation', label: 'Healthcare case study' },
    stack: ['Fireflies', 'Notion', 'Gmail', 'DocuSign', 'Slack', 'Zapier'],
    faqs: [
      {
        question: 'Does this require my team to learn new tools?',
        answer:
          'Minimal. Admin workflows usually layer onto existing tools (Slack, Gmail, Notion) without forcing migration. The automation runs underneath.',
      },
      {
        question: 'What about data privacy on AI-extracted action items?',
        answer:
          'For sensitive industries we use enterprise-tier AI vendors with no-training policies, or self-hosted alternatives. Privacy posture is part of discovery.',
      },
    ],
  },
  {
    slug: 'integration-builds',
    name: 'Integration builds',
    shortDesc: 'Custom connectors, API integrations, supplier portal automation, and unified dashboards.',
    longDesc:
      'Integration builds turn disconnected tools into one operational nervous system. When two systems do not have a native integration, we build the custom connector. When data needs to flow through five tools, we architect the pipeline with explicit contracts at each handoff.',
    features: [
      'Custom API connectors',
      'Supplier portal scrapers',
      'Webhook orchestration',
      'Unified operations dashboards',
      'Data normalization layers',
      'Error monitoring and alerting',
    ],
    workflow: [
      { step: 'Pull live data from GE + Bosch portals', tag: 'Trigger' },
      { step: 'Normalize across SKU taxonomy' },
      { step: 'Sync to website CMS via CSV pipeline' },
      { step: 'Error monitoring with auto-alerts', tag: 'Output' },
    ],
    metricLabel: 'SKUs managed',
    metricValue: '5,500+',
    relatedCaseStudy: { slug: 'hvac-lead-time-automation', label: 'HVAC case study' },
    stack: ['Node.js', 'Python', 'Webhooks', 'PostgreSQL', 'Make', 'n8n'],
    faqs: [
      {
        question: 'When should I build custom vs use Zapier?',
        answer:
          'Zapier wins on volume under 5,000 runs/month and simple logic. Custom wins on high volume, complex branching, governance requirements, or stable integrations that need to outlive vendor changes.',
      },
      {
        question: 'Who maintains the integration after launch?',
        answer:
          'Every build includes a runbook. You can maintain it in-house, or keep us on retainer for monitoring and evolution. Both paths are documented.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
