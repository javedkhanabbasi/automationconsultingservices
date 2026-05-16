import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { services } from '@/content/services';

export const metadata: Metadata = buildMetadata({
  title: 'Services | Sales, Operations, Admin, and Integration Automation',
  description:
    'Four service surfaces. One engineering methodology. Sales automation, operations automation, admin workflows, and integration architecture for $1M-$10M operators.',
  path: '/services',
});

const alwaysIncluded = [
  { title: 'Written specification', body: 'Every workflow ships with a spec naming trigger, steps, failure modes, and rollback.' },
  { title: 'Integration architecture map', body: 'A diagram of how data moves between tools. Replaces tribal knowledge with a visual contract.' },
  { title: 'Runbook for the operator', body: 'Written for the person who inherits the system. Common failures, who to call, rollback procedure.' },
  { title: 'Two-week first ship', body: 'First workflow in production within two weeks, regardless of total engagement scope.' },
];

const decisionRows = [
  { symptom: 'Leads sit in a shared inbox or land in three places', service: 'Sales automation', slug: 'sales-automation' },
  { symptom: 'Bids and quotes live in spreadsheets, no audit trail', service: 'Operations automation', slug: 'operations-automation' },
  { symptom: 'Meetings produce no action items the team can act on', service: 'Admin workflows', slug: 'admin-workflows' },
  { symptom: 'Tools cannot talk to each other, data goes stale weekly', service: 'Integration builds', slug: 'integration-builds' },
];

const faqs = [
  {
    question: 'Do I have to commit to all four services at once?',
    answer:
      'No. Most engagements start with the single workflow eating the most hours. We prove value in two to three weeks, then expand. The methodology compounds across services, but the entry point is always one specific bottleneck.',
  },
  {
    question: 'How does pricing work across the four services?',
    answer:
      'All four services use the same engagement model. Discovery audit from $500, simple workflow projects $5K-$15K, mid-complexity builds $15K-$50K, CRM and operations overhauls $50K+.',
  },
  {
    question: 'What tools do you work with?',
    answer:
      'Zapier (verified Certified Solutions Partner), Make, and n8n for workflow orchestration. Attio (verified Expert Partner), HubSpot, Salesforce, Pipedrive, and Close for CRM. Custom Node.js or Python when needed.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer:
      'Discovery audit is 1-2 weeks. Simple workflows ship in 2-4 weeks. Mid-complexity builds run 4-8 weeks. Full operations or CRM overhauls run 8-16 weeks.',
  },
];

export default function ServicesPage() {
  const ldData: object[] = [
    breadcrumbSchema([
      { name: 'Home', url: 'https://automationconsultingservices.org/' },
      { name: 'Services', url: 'https://automationconsultingservices.org/services' },
    ]),
    faqSchema(faqs),
  ];
  services.forEach((s) => {
    ldData.push(serviceSchema({ name: s.name, description: s.shortDesc, slug: `services/${s.slug}` }));
  });

  return (
    <>
      <JsonLd data={ldData} />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white relative overflow-hidden">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  Four services. One methodology.
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Operations infrastructure,<br />
                <span className="text-lime">across four service surfaces.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mb-8">
                Sales automation, operations automation, admin workflows, and integration builds. Each stands on its own. All compound when run together. Engineered the same way underneath.
              </p>
            <div className="flex flex-wrap gap-3">
  <Link
    href="/contact"
    className="group btn-on-dark inline-flex items-center gap-2 border border-[#9CCC65] bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md"
  >
    Book a discovery call
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </Link>

  <Link
    href="#decision"
    className="btn-outline border border-[#9CCC65] bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md"
  >
    Find your starting point
  </Link>
</div>
            </div>
          </div>
        </section>

        {/* THESIS */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">The thesis</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                  Four services. One engineering practice underneath.
                </h2>
                <p className="text-ink-70 leading-relaxed">
                  Operations infrastructure is one discipline. The four service surfaces are facets of the same underlying practice. Specifications, runbooks, integration contracts, and documentation are the same regardless of which surface a workflow lives on.
                </p>
              </div>
              <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
  {services.map((s, i) => (
    <Link
      key={s.slug}
      href={`/services/${s.slug}`}
      className="card group p-6 border border-[#9CCC65]/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
    >
      <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-2 transition-colors duration-300 group-hover:text-[#7CB342]">
        Service 0{i + 1}
      </div>

      <h3 className="text-lg font-bold text-black mb-2 leading-tight transition-colors duration-300 group-hover:text-[#7CB342]">
        {s.name}
      </h3>

      <p className="text-sm text-ink-70 leading-relaxed mb-3">
        {s.shortDesc}
      </p>

      <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm transition-colors duration-300 group-hover:text-[#7CB342]">
        Explore
        <span className="transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  ))}
</div>
            </div>
          </div>
        </section>

        {/* SERVICE DETAILS */}
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            className={`${i % 2 === 0 ? 'bg-white' : 'bg-lime'} section-padding border-t border-ink-10`}
          >
            <div className="container-x">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <div>
                  <div className="text-xs font-bold text-black uppercase tracking-wider mb-3">
                    Service 0{i + 1}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">{s.name}</h2>
                  <p className="text-ink-80 leading-relaxed mb-6">{s.shortDesc}</p>

                  <div className="mb-6">
                    <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-3">What we build</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-black">
                          <span className="text-black flex-shrink-0">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                <div className="flex flex-wrap gap-3">
  <Link
    href={`/services/${s.slug}`}
    className="group btn-dark inline-flex items-center gap-2 border border-[#9CCC65] bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md"
  >
    Explore {s.name.toLowerCase()}
    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  </Link>

  <Link
    href={`/case-studies/${s.relatedCaseStudy.slug}`}
    className="group btn-ghost inline-flex items-center gap-2 border border-[#9CCC65]/50 bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md"
  >
    {s.relatedCaseStudy.label}
  </Link>
</div>
                </div>

               <div className="group bg-white border border-[#9CCC65]/40 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
  <div className="text-xs font-bold text-black uppercase tracking-wider mb-4">
    Example workflow
  </div>

  <div className="space-y-2 mb-5">
    {s.workflow.map((step, idx) => (
      <div
        key={idx}
        className="flex items-center gap-3 text-sm text-black bg-white border border-[#9CCC65]/30 rounded-lg px-4 py-3 transition-all duration-300 hover:border-[#9CCC65] hover:bg-[#9CCC65]/10 hover:translate-x-1"
      >
        <span className="w-6 h-6 rounded-full bg-[#9CCC65] text-black flex items-center justify-center text-xs font-bold flex-shrink-0">
          {idx + 1}
        </span>
        {step.step}
      </div>
    ))}
  </div>

  <div className="rounded-xl border border-[#9CCC65]/40 bg-black px-4 py-4 flex justify-between items-center transition-all duration-300 group-hover:border-[#9CCC65] group-hover:shadow-md">
    <span className="text-xs text-[#9CCC65] uppercase tracking-wider font-bold">{s.metricLabel}</span>
    <span className="text-2xl font-bold text-white">{s.metricValue}</span>
  </div>
</div>
              </div>
            </div>
          </section>
        ))}

        {/* DECISION MATRIX */}
        <section id="decision" className="bg-black text-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow-light mb-3">Where to start</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">
                Which service to start with.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Most operators do not need all four services on day one. They need the one that fixes the symptom currently costing the most hours or revenue.
              </p>
            </div>

            <div className="space-y-3">
              {decisionRows.map((row) => (
                <Link
                  key={row.slug}
                  href={`/services/${row.slug}`}
                  className="bg-white/5 backdrop-blur border border-white/15 rounded-xl p-5 hover:bg-white hover:text-black transition-colors group grid md:grid-cols-[1fr_auto_1fr_auto] gap-4 items-center"
                >
                  <div>
                    <div className="text-xs font-bold text-lime uppercase tracking-wider mb-1 group-hover:text-black">
                      If you see this symptom
                    </div>
                    <div className="text-white group-hover:text-black font-semibold">{row.symptom}</div>
                  </div>
                  <span className="text-lime group-hover:text-black hidden md:block">→</span>
                  <div>
                    <div className="text-xs font-bold text-lime uppercase tracking-wider mb-1 group-hover:text-black">
                      Start here
                    </div>
                    <div className="text-white group-hover:text-black font-semibold">{row.service}</div>
                  </div>
                  <span className="text-lime group-hover:text-black text-sm font-semibold">Explore →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ALWAYS INCLUDED */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-10">
              <div className="eyebrow mb-3">What every engagement includes</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Four artifacts shipped on every workflow.
              </h2>
            </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
  {alwaysIncluded.map((item, i) => (
    <div
      key={item.title}
      className="card group p-6 border border-[#9CCC65]/40 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]"
    >
      <div className="w-10 h-10 bg-lime rounded-md flex items-center justify-center text-black font-bold mb-4">
        {i + 1}
      </div>
      <h3 className="text-base font-bold text-black mb-2 leading-tight">{item.title}</h3>
      <p className="text-sm text-ink-70 leading-relaxed">{item.body}</p>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white section-padding border-t border-ink-10">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">Common questions</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                  What operators ask before they engage.
                </h2>
               <Link
  href="/faq"
  className="group btn-ghost inline-flex items-center gap-2 border border-[#9CCC65]/50 bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md"
>
  See full FAQ
  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
</Link>
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
