import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { crmPlatforms } from '@/content/crm';
import { crmComparisons } from '@/content/crm-comparisons';

export const metadata: Metadata = buildMetadata({
  title: 'CRM Implementation, Migration, and Architecture | Attio Expert Partner',
  description:
    'Verified Attio Expert Partner and Zapier Certified Solutions Partner. CRM implementation, migration, and architecture across Attio, HubSpot, Salesforce, Pipedrive, and Close.',
  path: '/crm',
});

const anatomy = [
  { n: '01', label: 'Data audit', desc: 'What you already have, ugly truth and all' },
  { n: '02', label: 'Object model', desc: 'People, companies, deals, plus what is custom' },
  { n: '03', label: 'Field rules', desc: 'Required, picklists, validations, hygiene rules' },
  { n: '04', label: 'Pipeline design', desc: 'Stages with declared exit criteria' },
  { n: '05', label: 'Automations', desc: 'Routing, enrichment, follow-up workflows' },
  { n: '06', label: 'Integrations', desc: 'Email, calendar, billing, support contracts' },
  { n: '07', label: 'Reporting & training', desc: 'Dashboards, runbooks, operator handover' },
];

const failureModes = [
  { title: 'Data model designed by accident', body: 'Most CRMs are configured by adding fields as the team encounters new needs. Six months in, the object model is a museum of dead fields.' },
  { title: 'Adopted by sales, ignored by ops', body: 'CRM that does not connect to operations becomes a sales-only system that the rest of the business works around.' },
  { title: 'Field hygiene treated as a rule, not a system', body: 'Required fields and validation rules slow data entry without solving the underlying problem. Hygiene is a workflow problem.' },
  { title: 'Migration done as a spreadsheet copy-paste', body: 'A clean migration includes deduplication, field mapping, picklist normalization, owner reassignment, and history preservation.' },
  { title: 'Pipeline stages with no exit criteria', body: 'A pipeline stage without explicit exit criteria becomes a graveyard. Forecasts are fiction and stuck deals stay stuck.' },
  { title: 'No declared contract with billing or support', body: 'Customer state lives in three places. The CRM stops being the source of truth long before anyone notices.' },
];

const faqs = [
  { question: 'Do you actually do data deduplication during migration?', answer: 'Yes. Every migration runs a deduplication pass before data moves. Email + domain matching for people and companies, fuzzy matching on company name with manual review.' },
  { question: 'How do you handle field hygiene without slowing sales down?', answer: 'Progressive field requirements (required at stage transition, not at record creation), nightly cleanup workflows, and a weekly Slack rollup of records missing critical fields.' },
  { question: 'What does a typical CRM migration cost?', answer: '$5K-$10K for clean datasets under 25,000 contacts. $10K-$30K for messy datasets or multi-source migrations. $40K+ for migrations with custom object rebuilds.' },
  { question: 'Can the team self-train, or do you handle that?', answer: 'Every implementation includes a 90-minute training session on workflows and the rollback procedure, plus a written runbook for future hires.' },
  { question: 'What about data residency for EU or healthcare clients?', answer: 'Attio, HubSpot, Salesforce, and Pipedrive all offer EU data residency. Salesforce and HubSpot offer healthcare-grade configurations.' },
  { question: 'How do you connect the CRM to billing and support?', answer: 'Through declared integration contracts. Each integration specifies which system owns which fields, which direction data flows, and what happens on conflict.' },
];

const platformSlugs = ['attio', 'hubspot', 'salesforce', 'pipedrive', 'close'] as const;

function findComparison(a: string, b: string) {
  return crmComparisons.find((c) => c.slug === `${a}-vs-${b}` || c.slug === `${b}-vs-${a}`);
}

export default function CrmHubPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'CRM', url: 'https://automationconsultingservices.org/crm' },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white relative overflow-hidden">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-lime">★</span>
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  Verified Attio Expert Partner
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                CRM implementation,<br />
                <span className="text-lime">engineered to outlive the rollout.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mb-8">
                Most CRMs become glorified spreadsheets within twelve months. We engineer the seven layers underneath so the system holds.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-on-dark">Book a CRM audit →</Link>



                <Link href="#comparisons" className="btn-on-dark">Compare platforms →</Link>



                
              </div>
            </div>
          </div>
        </section>

        {/* ANATOMY */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">What a CRM implementation actually is</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Seven layers. Skip one and the system rots.
              </h2>
              <p className="text-ink-70 leading-relaxed">
                CRM implementation gets pitched as a configuration job. It is not. A CRM that holds for years is a seven-layer system, and every layer has a failure mode if you cut corners.
              </p>
            </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-2">
  {anatomy.map((a) => (
    <div
      key={a.n}
      className="rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-lg"
      style={{ border: "2px solid rgb(156 204 101)", backgroundColor: "white" }}
    >
      <div className="text-2xl font-bold mb-2" style={{ color: "rgb(156 204 101)" }}>{a.n}</div>
      <h3 className="text-sm font-bold text-black mb-2 leading-tight">{a.label}</h3>
      <p className="text-xs text-ink-60 leading-relaxed">{a.desc}</p>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">The five platforms</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Practitioner fingerprint, not a logo grid.
              </h2>
              <p className="text-ink-80 leading-relaxed">
                Each platform has a real motion it serves well and a real motion it punishes.
              </p>
            </div>
            <div className="space-y-5">
              {crmPlatforms.map((p) => (
                <Link
                  key={p.slug}
                  href={`/crm/${p.slug}`}
                  className="block bg-white rounded-xl p-7 hover:bg-black hover:text-white transition-colors group"
                >
                  <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-2xl font-bold text-black group-hover:text-white">{p.name}</h3>
                        {p.partnerVerified && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-lime text-black px-2 py-0.5 rounded">
                            {p.partnerStatus}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-ink-60 group-hover:text-white/70">{p.tagline}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs font-bold text-black group-hover:text-lime uppercase tracking-wider mb-1">Best for</div>
                          <p className="text-sm text-black group-hover:text-white/85">{p.bestFor}</p>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-ink-60 group-hover:text-lime uppercase tracking-wider mb-1">Fails at</div>
                          <p className="text-sm text-ink-60 group-hover:text-white/70">{p.failsAt}</p>
                        </div>
                      </div>
                      <div className="text-xs italic text-ink-70 group-hover:text-white/80 border-l-2 border-black group-hover:border-lime pl-3">
                        {p.practitionerNote}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAILURE MODES */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Information gain</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">
                Six reasons most CRM rollouts fail.
              </h2>
              <p className="text-ink-70 leading-relaxed">
                Every failure pattern below shows up in CRM audits we run. None are platform-specific. All are decisions made early in the implementation that compound over twelve months.
              </p>
            </div>
           <div className="grid md:grid-cols-2 gap-5">
  {failureModes.map((mode, i) => (
    <div
      key={i}
      className="rounded-lg p-7 transition-transform transform hover:scale-105 hover:shadow-lg"
      style={{ border: "2px solid rgb(156 204 101)", backgroundColor: "white" }}
    >
      <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-2">
        Failure mode {String(i + 1).padStart(2, '0')}
      </div>
      <h3 className="text-lg font-bold text-black mb-3 leading-tight">{mode.title}</h3>
      <p className="text-ink-70 text-sm leading-relaxed">{mode.body}</p>
    </div>
  ))}
</div>
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section id="comparisons" className="bg-black text-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow-light mb-3">Head-to-head</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Ten platform comparisons.
              </h2>
              <p className="text-white/70 leading-relaxed">
                Each comparison is written from the perspective of someone who actually implements both platforms.
              </p>
            </div>

            <div className="bg-white text-black rounded-xl p-4 md:p-6 overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-3"></th>
                    {platformSlugs.map((p) => (
                      <th key={p} className="p-3 text-xs font-bold uppercase tracking-wider text-center">
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {platformSlugs.map((rowSlug) => (
                    <tr key={rowSlug}>
                      <td className="p-3 text-xs font-bold uppercase tracking-wider">
                        {rowSlug.charAt(0).toUpperCase() + rowSlug.slice(1)}
                      </td>
                      {platformSlugs.map((colSlug) => {
                        if (rowSlug === colSlug) {
                          return <td key={colSlug} className="p-3 text-center"><span className="inline-block w-8 h-8 bg-ink-5 rounded-md"></span></td>;
                        }
                        const comp = findComparison(rowSlug, colSlug);
                        if (!comp) return <td key={colSlug} className="p-3 text-center text-ink-30 text-xs">—</td>;
                        return (
                          <td key={colSlug} className="p-2 text-center">
                            <Link href={`/crm/compare/${comp.slug}`} className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-lime text-black font-bold text-xs hover:bg-black hover:text-white transition-colors">
                              vs
                            </Link>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Link href="/crm/compare" className="btn-on-dark">See all comparisons →</Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">CRM questions</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                  What operators ask about CRM specifically.
                </h2>
              </div>
            <div className="lg:col-span-3 space-y-3">
  {faqs.map((f, i) => (
    <details
      key={i}
      className="rounded-lg p-5 transition-transform transform hover:scale-105 hover:shadow-lg"
      style={{ border: "2px solid rgb(156 204 101)", backgroundColor: "white" }}
    >
      <summary className="font-semibold text-black cursor-pointer list-none flex justify-between items-center gap-3">
        <span>{f.question}</span>
        <span className="text-xl flex-shrink-0" style={{ color: "rgb(156 204 101)" }}>
          <span className="group-open:rotate-45 transition-transform">+</span>
        </span>
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