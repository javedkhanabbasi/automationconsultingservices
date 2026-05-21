import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing | Fixed-Fee Projects, Refundable Discovery',
  description:
    'Fixed-fee builds. Refundable discovery. No hourly billing. Discovery from $500, project tiers $5K-$50K+, monthly retainers $2K-$10K.',
  path: '/pricing',
});

const principles = [
  { n: '01', title: 'Fixed-fee, not hourly', body: 'Hourly billing pays the consultant to think slowly. Fixed-fee pays for the outcome and pushes us to ship faster. Every project below has a price ceiling that does not move once the scope is locked.' },
  { n: '02', title: 'Paid discovery, refundable', body: 'Discovery is paid because it has to produce a real diagnostic, not a sales pitch. If we find the bottleneck is not automation, we refund the discovery fee and tell you what the actual problem is.' },
  { n: '03', title: 'Scope locked at end of discovery', body: 'New requirements that surface mid-build do not silently inflate the invoice. They either defer to a follow-up engagement or go through a written change order.' },
  { n: '04', title: 'Three retainer tiers, not one', body: 'A flat monthly retainer hides whether the work being done justifies the price. Three tiers make capacity and cost visible.' },
];

const projectTiers = [
  { name: 'Discovery audit', range: 'From $500', duration: '1-2 weeks', tagline: 'Map the operational pain before spending on the fix.', deliverables: ['Workflow map of current state', 'Prioritized bottleneck list', 'Recommended architecture', 'Written scope for build phase', '60-minute walkthrough with founder'], payment: 'Paid in full at kickoff. Refundable if the real bottleneck is not automation.', featured: false },
  { name: 'Simple workflow', range: '$5K – $15K', duration: '2-4 weeks', tagline: 'One well-defined workflow built right the first time.', deliverables: ['Workflow architecture document', 'Production build in Zapier, Make, or n8n', 'Native integrations with CRM and tools', 'Error monitoring and retry logic', 'Operator training and runbook', '30 days of post-launch tuning'], payment: '50% at kickoff, 50% at production launch.', featured: false },
  { name: 'Mid-complexity build', range: '$10K – $50M', duration: '4-8 weeks', tagline: 'Multi-workflow systems with real engineering rigor.', deliverables: ['Full operational map and architecture', '3-8 connected workflows', 'CRM data model design and migration', 'Custom API integrations', 'Idempotent design with observability', 'Phased rollout with change management', '60 days of post-launch tuning'], payment: '40% kickoff, 30% milestone, 30% production.', featured: true },
  { name: 'CRM + operations overhaul', range: '$50M+', duration: '8-16 weeks', tagline: 'Full operations infrastructure rebuild.', deliverables: ['CRM platform selection or migration', 'Complete data model architecture', 'Historical data migration with deduplication', '10+ connected workflows', 'Custom integration layer', 'Engineering-grade observability', 'Phased rollout with weekly reviews', '90 days of optimization'], payment: '4 milestone payments tied to discovery, kickoff, midpoint, production.', featured: false },
];

const retainers = [
  { name: 'Maintain', range: '$2K/mo', hours: '~8 hrs/month', tagline: 'Keep the system running.', inclusions: ['Workflow monitoring', 'Credential rotations and API updates', 'Monthly health-check report', 'Up to 2 small enhancements per month'], featured: false },
  { name: 'Iterate', range: '$5K/mo', hours: '~20 hrs/month', tagline: 'Active improvement, not just keeping the lights on.', inclusions: ['Everything in Maintain', 'Quarterly ops review and roadmap', '2-4 new workflows per month', 'Direct Slack/email channel', 'Priority production response'], featured: true },
  { name: 'Embed', range: '$10K/mo', hours: '~40 hrs/month', tagline: 'Effectively a fractional automation lead.', inclusions: ['Everything in Iterate', 'Weekly working sessions', 'Continuous workflow capacity', 'CRM/tool implementation included', 'On-call coverage for critical workflows'], featured: false },
];

const comparison = [
  { option: 'ACS mid-tier build', cost: '$10K – $50M', timeline: '4-8 weeks', delivers: ['3-8 production workflows', 'CRM data model design', 'Custom integrations included', 'Runbook and training', '60 days of tuning'], risks: 'Scope locked at end of discovery. Change orders are explicit.', featured: true },
  { option: 'In-house automation engineer', cost: '$120K – $180K/yr', timeline: '3-6 months to productivity', delivers: ['Continuous in-house capacity', 'Direct on-call coverage', 'Deep institutional knowledge'], risks: 'Hard to hire at $10K-$50M scale. Single point of failure. Workflows stay in their head.', featured: false },
  { option: 'Enterprise consultancy', cost: '$80K – $250K+', timeline: '12-26 weeks', delivers: ['Large team', 'Brand-name on engagement', 'Deep process documentation'], risks: 'Sized for enterprise. Junior consultants on delivery. Reports over running systems.', featured: false },
  { option: 'Fiverr / Upwork freelancer', cost: '$500 – $5K', timeline: '1-3 weeks', delivers: ['Single workflow', 'Fast on simple tasks', 'Low up-front cost'], risks: 'No architecture. No runbook. Workflow rots within 6 months. No accountability.', featured: false },
];

const dontCharge = [
  { title: 'Discovery audit credits', body: 'When you move from discovery to build, the discovery fee credits against the build invoice. You do not pay twice.' },
  { title: 'Post-launch tuning', body: '30 days included on simple builds, 60 days on mid-tier, 90 days on overhauls.' },
  { title: 'Hourly overruns on fixed-fee work', body: 'When a fixed-fee build takes longer on our end, that risk is on us, not on the invoice.' },
  { title: 'Re-explaining scope mid-engagement', body: 'The written scope at end of discovery is the contract. We do not re-pitch the work.' },
  { title: 'Documentation and runbooks', body: 'Documentation is part of the build, not an upcharge for knowledge transfer.' },
];

const wontDo = [
  { title: 'Hourly billing', body: 'Hourly creates the wrong incentives. We bill outcomes, not stopwatches.' },
  { title: 'Value-based pricing capturing upside', body: 'We charge what the work costs to deliver plus margin. Upside belongs to the operator.' },
  { title: 'Surprise change orders', body: 'Every change order is explicit, written, and priced separately.' },
  { title: 'Token or subscription billing for builds', body: 'Projects are projects. Subscription billing for fixed scope obscures usage.' },
  { title: 'Long-term contract lock-ins', body: 'Retainers are month-to-month. No 12-month commitments to keep your business.' },
];

const faqs = [
  { question: 'Do you offer payment plans?', answer: 'Projects under $25K split 50/50 (kickoff and completion). $25K-$50K splits into three milestones. $50K+ engagements split into four milestones. Retainers bill monthly in advance.' },
  { question: 'What currency do you bill in?', answer: 'USD by default. International clients pay via Wise or wire transfer in USD-equivalent. We work with US, UK, Canadian, Australian, and EU operators at the same rate card.' },
  { question: 'What happens if the project runs over scope?', answer: 'Scope is locked at end of discovery. New requirements either defer to a follow-up engagement or go through a written change order. We do not bill hourly overruns on fixed-fee builds.' },
  { question: 'Is the discovery fee really refundable?', answer: 'Yes, when the discovery audit shows the real bottleneck is not automation. We refund the fee and tell you what the actual problem is.' },
  { question: 'Can I move between retainer tiers?', answer: 'Yes, month-to-month. Move from Maintain to Iterate, or down from Embed to Iterate. No penalty for changing tiers.' },
  { question: 'Do you offer equity-based or revenue-share pricing?', answer: 'No. We bill what the work costs to deliver plus margin. Revenue-share entangles consulting incentives with operator outcomes in ways that compromise the diagnostic.' },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'Pricing', url: 'https://automationconsultingservices.org/pricing' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  Fixed-fee. Refundable discovery. No hourly billing.
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Pricing is a feature.<br />
                <span className="text-lime">Not a negotiation.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
                Every project below has a written scope, a fixed price, and an explicit set of deliverables. Scope is locked at the end of discovery. Change orders are written, not whispered.
              </p>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Why pricing is structured this way</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Four pricing decisions that shape every engagement.
              </h2>
              <p className="text-ink-70 leading-relaxed">
                Pricing structure is a design decision. The four principles below decide what we charge for and how money moves through the engagement.
              </p>
            </div>
          <div className="grid md:grid-cols-2 gap-5">
  {principles.map((p) => (
    <div
      key={p.n}
      className="card p-7 border border-[#9CCC65]/40 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
    >
      <div className="text-2xl font-bold text-lime-dark mb-3">{p.n}</div>
      <h3 className="text-lg font-bold text-black mb-3 leading-tight">{p.title}</h3>
      <p className="text-ink-70 text-sm leading-relaxed">{p.body}</p>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* PROJECT TIERS */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Project pricing</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Four fixed-fee tiers.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {projectTiers.map((t) => (
                <div key={t.name} className={`bg-white rounded-xl p-7 lg:p-8 relative ${t.featured ? 'border-2 border-black' : ''}`}>
                  {t.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Most common
                    </div>
                  )}
                  <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                    <h3 className="text-2xl font-bold text-black">{t.name}</h3>
                    <div className="text-2xl font-bold text-black">{t.range}</div>
                  </div>
                  <div className="text-xs text-ink-60 mb-4 font-semibold">{t.duration}</div>
                  <p className="text-ink-70 text-sm leading-relaxed mb-5 italic">{t.tagline}</p>
                  <div className="mb-5">
                    <div className="text-xs font-bold text-black uppercase tracking-wider mb-3">Deliverables</div>
                    <ul className="space-y-2">
                      {t.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-black">
                          <span className="w-5 h-5 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-black text-[10px] font-bold">✓</span>
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-ink-5 rounded-lg p-3 border-l-2 border-black">
                    <div className="text-xs font-bold text-black mb-1">Payment schedule</div>
                    <p className="text-xs text-ink-70">{t.payment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">The alternatives</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                What a $10K-$50M mid-tier build actually buys.
              </h2>
              <p className="text-ink-70 leading-relaxed">
                Four paths exist at that budget level. The honest comparison below explains what each delivers and what each risks.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {comparison.map((c) => (
                <div key={c.option} className={`rounded-xl overflow-hidden ${c.featured ? 'border-2 border-black' : 'border border-ink-10'}`}>
                  <div className={`px-7 py-5 ${c.featured ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    <h3 className="text-lg font-bold mb-1">{c.option}</h3>
                    <div className="flex items-baseline gap-3 text-sm">
                      <span className="font-bold">{c.cost}</span>
                      <span className="opacity-70">·</span>
                      <span className="opacity-70">{c.timeline}</span>
                    </div>
                    {c.featured && (
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-lime text-black px-2.5 py-1 rounded text-[11px] font-bold">
                        ✓ Recommended for $10K-$50M operators
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-7">
                    <div className="text-xs font-bold text-black uppercase tracking-wider mb-3">Delivers</div>
                    <ul className="space-y-2 mb-5">
                      {c.delivers.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-black">
                          <span className="text-black mt-0.5">✓</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-ink-5 rounded-lg p-4 border-l-2 border-black">
                      <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">Risks</div>
                      <p className="text-sm text-ink-70">{c.risks}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RETAINERS */}
        <section className="bg-black text-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow-light mb-3">Retainer pricing</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Three monthly tiers. Month-to-month.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Retainers are month-to-month with no minimum commitment. Three tiers exist because flat-rate hides whether the work justifies the price.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {retainers.map((t) => (
                <div key={t.name} className={`bg-white text-black rounded-xl p-7 relative ${t.featured ? 'border-2 border-lime' : ''}`}>
                  {t.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime text-black px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Most common
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-black mb-1">{t.name}</h3>
                  <div className="text-3xl font-bold text-black mb-1">{t.range}</div>
                  <div className="text-xs text-ink-60 mb-4 font-semibold">{t.hours}</div>
                  <p className="text-ink-70 text-sm leading-relaxed mb-5 italic">{t.tagline}</p>
                  <ul className="space-y-2">
                    {t.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-black">
                        <span className="w-5 h-5 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-black text-[10px] font-bold">✓</span>
                        </span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DON'T CHARGE */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Buyer protection</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                What we do not charge for.
              </h2>
            </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
  {dontCharge.map((d) => (
    <div
      key={d.title}
      className="card p-7 border border-[#9CCC65]/40 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
    >
      <div className="w-10 h-10 bg-lime rounded-md flex items-center justify-center mb-4">
        <span className="text-black font-bold">✓</span>
      </div>
      <h3 className="text-base font-bold text-black mb-2 leading-tight">{d.title}</h3>
      <p className="text-ink-70 text-sm leading-relaxed">{d.body}</p>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* WON'T DO */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Pricing structures we refuse</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Five pricing models we will not use.
              </h2>
            </div>
            <div className="space-y-3">
              {wontDo.map((w) => (
                <div key={w.title} className="bg-white rounded-xl p-6 flex items-start gap-5">
                  <div className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center flex-shrink-0 font-bold">
                    ✕
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black mb-1.5">{w.title}</h3>
                    <p className="text-ink-70 text-sm leading-relaxed">{w.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">Money questions only</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                  Six pricing questions operators ask.
                </h2>
              </div>
           <div className="lg:col-span-3 space-y-3">
  {faqs.map((f, i) => (
    <details
      key={i}
      className="group card p-5 border border-[#9CCC65]/40 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
    >
      <summary className="font-semibold text-black cursor-pointer list-none flex justify-between items-center gap-3">
        <span className="transition-colors duration-300 group-hover:text-[#7CB342]">{f.question}</span>
        <span className="text-lime-dark text-xl group-open:rotate-45 transition-transform flex-shrink-0">+</span>
      </summary>
      <p className="mt-4 text-ink-70 text-sm leading-relaxed">{f.answer}</p>
    </details>
  ))}
</div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
