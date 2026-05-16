import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ | Questions Operators Ask Before Engaging',
  description: 'Frequently asked questions about engagement model, methodology, pricing, CRM, and the firm itself.',
  path: '/faq',
});

const categories = [
  {
    name: 'The firm',
    qs: [
      { question: 'What does Automation Consulting Services do?', answer: 'We build operations infrastructure for $1M-$10M companies. CRM implementation, workflow engineering, integration architecture, and admin systems engineered to scale rather than glued together with one-off Zaps.' },
      { question: 'Who founded the firm?', answer: 'Matthew Piwko founded ACS in late 2024 after 10+ years building production software. The thesis is to apply software engineering discipline to operations infrastructure for growth-stage operators.' },
      { question: 'Where is ACS based?', answer: 'United States. We work with operators in the US, UK, Canada, Australia, and EU on the same rate card.' },
      { question: 'What partnerships does ACS hold?', answer: 'Verified Zapier Certified Solutions Partner. Verified Attio Expert Partner. We also implement HubSpot, Salesforce, Pipedrive, and Close as practitioners.' },
    ],
  },
  {
    name: 'Engagement model',
    qs: [
      { question: 'How does an engagement start?', answer: 'With a free 20-minute qualification call, followed by a paid discovery audit (from $500, 1-2 weeks). Discovery output is a written diagnostic, ranked bottleneck list, and recommended scope. Build phase is optional and quoted at fixed fee.' },
      { question: 'How long does a typical engagement take?', answer: 'Discovery is 1-2 weeks. Simple workflows ship in 2-4 weeks. Mid-complexity builds run 4-8 weeks. Full operations or CRM overhauls run 8-16 weeks.' },
      { question: 'Do we have to commit to a multi-month contract?', answer: 'No. Projects close when the scope completes. Retainers are month-to-month with no minimum.' },
      { question: 'What is included in every engagement?', answer: 'Written specification per workflow, integration architecture map, runbook the operator can use, and 30-90 days of post-launch tuning depending on tier.' },
    ],
  },
  {
    name: 'Pricing & money',
    qs: [
      { question: 'How is pricing structured?', answer: 'Fixed-fee on projects. Month-to-month on retainers. Discovery from $500, simple workflow $5K-$15K, mid-complexity $15K-$50K, CRM/ops overhaul $50K+. Retainers $2K, $5K, or $10K per month.' },
      { question: 'Do you charge hourly?', answer: 'No. Hourly billing pays the consultant to think slowly. Fixed-fee pays for the outcome and pushes us to ship faster.' },
      { question: 'What if the project runs over scope?', answer: 'Scope is locked at the end of discovery. New requirements either defer to a follow-up engagement or go through a written change order with a separate price. We do not bill hourly overruns.' },
      { question: 'Is the discovery fee refundable?', answer: 'Yes, when the discovery audit shows the real bottleneck is not automation. We refund the fee and tell you what the actual problem is.' },
    ],
  },
  {
    name: 'Tools & CRM',
    qs: [
      { question: 'What CRM platforms do you implement?', answer: 'Attio (verified Expert Partner), HubSpot, Salesforce, Pipedrive, and Close. We help operators pick the right one during discovery if they are not already committed.' },
      { question: 'What workflow platforms do you use?', answer: 'Zapier (verified Certified Solutions Partner), Make, and n8n for off-the-shelf orchestration. Custom Node.js and Python when off-the-shelf stops being enough.' },
      { question: 'Can you migrate us off our current CRM?', answer: 'Yes. We have migrated operators between every combination of the five platforms above. Migration includes deduplication, field mapping, picklist normalization, owner reassignment, and history preservation.' },
      { question: 'Will you recommend tools we are not already using?', answer: 'When the existing tool is the bottleneck, yes. When the existing tool can do the job, we work with what is already there.' },
    ],
  },
  {
    name: 'Methodology',
    qs: [
      { question: 'What does engineering discipline mean in practice?', answer: 'Every workflow has a written specification, declared failure modes, and a runbook. Every integration has a data contract. Every system has a rollback procedure. Every engagement closes with documentation that survives personnel change.' },
      { question: 'How do you handle ongoing changes after launch?', answer: 'Through monthly retainers. Operators with stable foundations stay on Maintain ($2K) or Iterate ($5K). Operators needing fractional automation lead capacity use Embed ($10K).' },
      { question: 'What happens to the runbook when we hire someone new?', answer: 'The runbook is written for the next operator. It includes common failures, escalation paths, rollback procedures, and the location of every dependency. New hires can ramp without an inheritance ceremony.' },
      { question: 'How do you measure whether the engagement worked?', answer: 'Pre-defined success metrics at end of discovery. Usually hours reclaimed, accuracy of data, time-to-action, or pipeline impact. The audit names what we are measuring before the build starts.' },
    ],
  },
  {
    name: 'Fit & boundaries',
    qs: [
      { question: 'Who is the right fit for ACS?', answer: 'Operators in the $1M-$10M revenue band running on a mix of CRMs, spreadsheets, and shared inboxes. Teams that need real infrastructure before the next growth stage compounds the chaos.' },
      { question: 'Who is not a fit?', answer: 'Operators under $1M revenue (the engagement math does not work yet), operators looking for one-off Zaps (we engineer systems), teams that cannot commit anyone to a discovery call, and engagements that require 12-month contract lock-ins on our side.' },
      { question: 'Do you offer equity or revenue-share deals?', answer: 'No. We bill what the work costs to deliver plus margin. Revenue-share entangles consulting incentives with operator outcomes in ways that compromise the diagnostic.' },
      { question: 'Can I see references before engaging?', answer: 'Yes. Five of our seven published case studies feature named operators with real titles you can verify on LinkedIn. Two more are protected by NDA but we can share contact details with permission.' },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = categories.flatMap((c) => c.qs);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'FAQ', url: 'https://automationconsultingservices.org/faq' },
          ]),
          faqSchema(allFaqs),
        ]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <div className="max-w-4xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Frequently asked.<br />
                <span className="text-lime">Carefully answered.</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
                Six categories. Twenty-four questions. The ones operators ask before they engage.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ CATEGORIES */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="space-y-16">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-baseline gap-4 mb-8 border-b border-ink-10 pb-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-black">{cat.name}</h2>
                    <span className="text-sm text-ink-60 font-semibold">{cat.qs.length} questions</span>
                  </div>
                  <div className="space-y-3">
                    {cat.qs.map((q, i) => (
                      <details key={i} className="card p-6 group">
                        <summary className="font-semibold text-black cursor-pointer list-none flex justify-between items-center gap-3">
                          <span>{q.question}</span>
                          <span className="text-lime-dark text-2xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
                        </summary>
                        <p className="mt-4 text-ink-70 leading-relaxed">{q.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
