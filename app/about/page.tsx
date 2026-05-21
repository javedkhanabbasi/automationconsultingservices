import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata, breadcrumbSchema, personSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import Image from "next/image";

export const metadata: Metadata = buildMetadata({
  title: `About ${siteConfig.name} | Founder, Methodology, and Philosophy`,
  description: `Founded by ${siteConfig.founder.name}, ${siteConfig.founder.background}. ${siteConfig.predicate}. Verified Zapier Certified Solutions Partner and Attio Expert Partner.`,
  path: '/about',
});

const principles = [
  { n: '01', title: 'Engineering discipline over consulting deliverables', body: 'Operations infrastructure is engineered, not authored. Every workflow has a specification, a failure mode, and a runbook. Decks describe systems. We build them.' },
  { n: '02', title: 'Operational leverage over headcount', body: 'A $5M operator does not need ten more people. They need their existing team to stop rebuilding the same work three times a week. Leverage compounds when the system does the redundant work.' },
  { n: '03', title: 'Integration architecture over tool sprawl', body: 'Most stacks are a collection of subscriptions held together by tribal knowledge. A real architecture has named data flows, declared contracts, and integration patterns that survive personnel changes.' },
  { n: '04', title: 'Documentation as a deliverable, not a favor', body: 'Every system we ship includes runbooks, integration maps, and operator-readable specs. When the person who built it leaves, the system does not collapse.' },
];

const processPhases = [
  { phase: 'Phase 01', title: 'Discovery audit', duration: '1-2 weeks', range: 'From $500', body: 'A 90-minute structured operational audit. We map the existing stack, identify the highest-leverage bottleneck, and quantify the cost of inaction. Output is a written audit document.' },
  { phase: 'Phase 02', title: 'Build & ship', duration: '2-12 weeks', range: '$5K-$50K+', body: 'Iterative builds shipped in usable increments. The first workflow is in production within two weeks, even on multi-month engagements.' },
  { phase: 'Phase 03', title: 'Stabilize & document', duration: '2-4 weeks', range: 'Included', body: 'Real-world traffic exposes assumptions the spec missed. Stabilization tightens edge cases, completes documentation, and trains the operator-owner on the system.' },
  { phase: 'Phase 04', title: 'Monitor & evolve', duration: 'Optional retainer', range: '$2K-$10K/mo', body: 'Operations infrastructure rots without maintenance. The monitor phase catches breaking integrations, vendor API changes, and natural drift.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'About', url: 'https://automationconsultingservices.org/about' },
          ]),
          personSchema(),
        ]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white relative overflow-hidden">
          <div className="container-x py-20 lg:py-28 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">About Automation Consulting Services</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Built by engineers.<br />
                <span className="text-lime">Accountable to operators.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
                Automation Consulting Services builds operations infrastructure for $10M-$50M operators. Founded in late 2024 by Matthew Piwko. Run by people who treat your back office the way they would treat production software.
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDER ORIGIN */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <div className="card overflow-hidden sticky top-24">
                  <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] bg-ink-5">
                    <Image src="/math.jpg" alt="Matthew Piwko" fill className="object-cover object-top" priority />
                  </div>
                  <div className="p-7">
                    <div className="mb-5">
                      <div className="font-bold text-black text-xl">Matthew Piwko</div>
                      <div className="text-sm text-ink-60 mt-1">Founder & Lead Architect</div>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2"><span className="text-lime-dark">✓</span><span>10+ years software development</span></li>
                      <li className="flex items-start gap-2"><span className="text-lime-dark">✓</span><span>Zapier Certified Solutions Partner</span></li>
                      <li className="flex items-start gap-2"><span className="text-lime-dark">✓</span><span>Attio Expert Partner (verified)</span></li>
                      <li className="flex items-start gap-2"><span className="text-lime-dark">✓</span><span>United States based</span></li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-ink-10 flex gap-4">
                      <a href={siteConfig.founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-black hover:text-lime-dark">
                        LinkedIn →
                      </a>
                      <a href="mailto:Matthew@AutomationConsultingServices.org" className="text-sm font-semibold text-black hover:text-lime-dark">
                        Email →
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="eyebrow mb-3">The origin</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-7">Why ACS was founded.</h2>
                <div className="space-y-5 text-ink-70 leading-relaxed">
                  <p>Matt Piwko spent more than a decade building production software. The patterns that show up in engineering culture version control, declared contracts, runbooks, observability are the same patterns missing from how most growth-stage operators run their business.</p>
                  <p>Working alongside founders in the $10M-$50M revenue band, one pattern repeated. The CRM was a spreadsheet with extra steps. Operations lived in Slack threads and tribal knowledge. Admin work rebuilt itself in three places every week. Owners hired more people to compensate, and the operational debt compounded faster than the team could absorb.</p>
                  <p>Automation Consulting Services was founded in late 2024 to apply software engineering discipline to that exact problem. Not as a marketing campaign or a "digital transformation" pitch. As an operations infrastructure firm engineered to ship working systems that survive personnel changes and scale faster than headcount.</p>
                  <p className="text-black font-semibold">The thesis is simple. Treat your operations the way you would treat your software, because at $10M-$50M, your operations is your software.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOUR PRINCIPLES */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-12">
              <div className="eyebrow mb-3">The four principles</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">What we build by, refuse by, and document by.</h2>
              <p className="text-ink-80 leading-relaxed">Each principle decides a class of decisions before the decisions arrive. The point is to make tradeoffs visible, not to make them disappear.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {principles.map((p) => (
                <div key={p.n} className="bg-white rounded-xl p-7 border border-[#9CCC65]/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-bold text-black">{p.n}</span>
                    <div className="h-px flex-1 bg-ink-10" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3 leading-tight">{p.title}</h3>
                  <p className="text-ink-70 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="bg-black text-white section-padding">
          <div className="container-x">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="eyebrow-light mb-3">How we work</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">Four phases. No surprise invoices.</h2>
              <p className="text-white/70 leading-relaxed">Every engagement begins with paid discovery so neither side guesses. Build phase ships in iterations you can use. Stabilize phase tightens edge cases. Monitor phase keeps the system from quietly rotting.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {processPhases.map((phase) => (
                <div key={phase.phase} className="bg-white/5 backdrop-blur rounded-xl p-7 border border-white/15 transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
                  <div className="flex items-start justify-between mb-3 gap-3">
                    <div>
                      <div className="text-xs font-bold text-lime uppercase tracking-wider mb-1">{phase.phase}</div>
                      <h3 className="text-xl font-bold text-white leading-tight">{phase.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/60 uppercase tracking-wider">{phase.duration}</div>
                      <div className="text-sm font-bold text-lime mt-1">{phase.range}</div>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{phase.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING ARGUMENT */}
        <section className="bg-white section-padding border-t border-ink-10">
          <div className="container-x">
            <div className="max-w-3xl mx-auto text-center">
              <div className="eyebrow mb-4">The closing argument</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight mb-6">Engineering discipline applied to your operations.</h2>
              <p className="text-lg text-ink-70 leading-relaxed mb-4">That is the predicate. Not a slogan. The operating definition of the firm.</p>
              <p className="text-ink-70 leading-relaxed">Every workflow we ship has a specification. Every integration has a contract. Every system has a runbook. Every engagement closes with documentation the operator can hand to a future hire without an inheritance ceremony.</p>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}