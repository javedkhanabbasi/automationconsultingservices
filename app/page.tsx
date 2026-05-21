import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import Particles from '@/components/Particles';
import WorkflowDiagram from '@/components/WorkflowDiagram';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.tagline} | ${siteConfig.name}`,
  description: `${siteConfig.name} builds ${siteConfig.predicate}. Zapier Certified Solutions Partner and Attio Expert Partner. CRM implementation, workflow engineering, integration architecture.`,
  path: '/',
});

const homepageFaqs = [
  { question: 'What does Automation Consulting Services do?', answer: 'We build operations infrastructure for $10M-$50M companies. CRM implementation, workflow engineering, integration architecture, and admin systems engineered to scale rather than glued together with one-off Zaps.' },
  { question: 'Who is the right fit for ACS?', answer: 'Operators in the $10M-$50M revenue band running on a mix of CRMs, spreadsheets, and shared inboxes. Teams that need real infrastructure before the next growth stage compounds the chaos.' },
  { question: 'What tools does ACS work with?', answer: 'Attio, HubSpot, Salesforce, Pipedrive, Close on the CRM side. Zapier and Make for workflows. n8n for self-hosted automation. Custom Python and Node when off-the-shelf stops being enough.' },
  { question: 'How is this different from hiring an agency?', answer: 'Most agencies sell Zaps and call it automation. We engineer systems. Matthew Piwko has 10+ years of software development experience, holds Zapier Certified Solutions Partner status, and is a verified Attio Expert Partner.' },
];

const services = [
  { slug: 'sales-automation', name: 'Sales automation', desc: 'Lead routing, CRM enrichment, competitor intelligence, quote generation.' },
  { slug: 'operations-automation', name: 'Operations automation', desc: 'Workflow engineering across bidding, scheduling, dispatch, inventory.' },
  { slug: 'admin-workflows', name: 'Admin workflows', desc: 'Meeting capture, document generation, approval routing, executive rollups.' },
  { slug: 'integration-builds', name: 'Integration builds', desc: 'Custom connectors, API integrations, supplier portal automation.' },
];

const featuredCases = [
  {
    slug: 'hvac-lead-time-automation',
    industry: 'HVAC distribution',
    revenue: '$8M',
    metric: '5,500+ SKUs hourly',
    bullets: [
      '500+ SKUs processed hourly',
      'Real-time inventory visibility',
      'Reduced manual order errors',
    ],
  },
  {
    slug: 'fencing-automation-management',
    industry: 'Construction',
    revenue: '$25M',
    metric: '100+ workflows',
    bullets: [
      '100+ workflows automated',
      'Faster project handoffs',
      'Clear team accountability',
    ],
  },
  {
    slug: 'healthcare-meeting-automation',
    industry: 'Healthcare SaaS',
    revenue: 'Series B',
    metric: '6-8 hrs/week saved',
    bullets: [
      '6–8 hours saved weekly',
      'Streamlined patient workflows',
      'Improved reporting accuracy',
    ],
  },
];

const crms = [
  {
    name: 'Attio',
    tag: 'Expert Partner',
    href: '/crm/attio',
    badge: true,
    image: '/images/attio.png',
    imageBg: '#F7F8F5',
  },
  {
    name: 'HubSpot',
    tag: 'Marketing + sales',
    href: '/crm/hubspot',
    image: '/images/hubspot.png',
    imageBg: '#FFF3EE',
  },
  {
    name: 'Salesforce',
    tag: 'Enterprise',
    href: '/crm/salesforce',
    image: '/images/salesforce.png',
    imageBg: '#EEF8FF',
  },
  {
    name: 'Pipedrive',
    tag: 'Pipeline-first',
    href: '/crm/pipedrive',
    image: '/images/p.png',
    imageBg: '#FFF1F1',
  },
  {
    name: 'Close',
    tag: 'Inside sales',
    href: '/crm/close',
    image: '/images/close.jpg',
    imageBg: '#F4F0FF',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(homepageFaqs)} />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white relative overflow-hidden">
          <Particles />
          <div className="container-x py-20 lg:py-32 relative z-10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT — text */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime" />
                  <span className="text-xs font-semibold text-lime uppercase tracking-wider">Operations infrastructure for $10M-$50M operators</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-7">
                  Engineering discipline.<br />
                  <span className="text-lime">Applied to your operations.</span>
                </h1>
                <p className="text-base lg:text-xl text-white/80 leading-relaxed mb-9 max-w-2xl">
                  We build CRM systems, workflow infrastructure, and integration architecture for $10M-$50M operators who need their back office to scale faster than their headcount.
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link href="/contact" className="btn-on-dark">Book a discovery call →</Link>
                  <Link href="/case-studies" className="btn-on-dark">See client outcomes →</Link>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2"><span className="text-lime">✓</span> Zapier Certified Partner</span>
                  <span className="inline-flex items-center gap-2"><span className="text-lime">✓</span> Attio Expert Partner</span>
                  <span className="inline-flex items-center gap-2"><span className="text-lime">✓</span> 500+ workflows shipped</span>
                </div>
              </div>

              {/* RIGHT — Workflow Diagram (hidden on mobile) */}
              <div className="hidden lg:block lg:col-span-5">
                <WorkflowDiagram />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-ink-10">
          <div className="container-x py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 text-center">
              {[
                { val: siteConfig.stats.workflows, label: 'Workflows shipped' },
                { val: siteConfig.stats.hoursReclaimed, label: 'Hours reclaimed' },
                { val: siteConfig.stats.clientSavings, label: 'Client savings' },
                { val: siteConfig.stats.industries, label: 'Industries served' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-[#9CCC65]/50 p-4 lg:p-6 transition-all duration-300 hover:border-[#9CCC65] hover:bg-[#9CCC65]/10 hover:shadow-lg hover:-translate-y-1">
                  <div className="text-3xl lg:text-4xl font-bold text-[#9CCC65]">{s.val}</div>
                  <div className="text-xs text-ink-60 uppercase tracking-wider mt-1 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE PROBLEM */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="eyebrow mb-3">The problem we solve</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">Most operations break the same way.</h2>
                <p className="text-ink-70 leading-relaxed mb-5">Sales runs in a spreadsheet. Operations lives in Slack threads. Admin work rebuilds itself in three places every week. The team works harder. Output stays flat. Owners hire more people to compensate.</p>
                <p className="text-ink-70 leading-relaxed">The real fix is structural. Treat your operations as infrastructure rather than as a pile of tools. Engineer it the way software is engineered.</p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: 'CRM in three places', desc: 'Sales spreadsheet, marketing tool, support inbox. None agree.' },
                    { title: 'Workflows in heads', desc: 'When the senior rep leaves, the process leaves with them.' },
                    { title: 'Tools that do not connect', desc: "Data lives where you can't use it. Weekly exports become a job." },
                    { title: 'Hiring as the fix', desc: 'Adding people solves load, not structure. The debt compounds.' },
                  ].map((item) => (
                    <div key={item.title} className="card p-6 border border-[#9CCC65] rounded-xl transition-all duration-300 hover:border-[#7CB342] hover:bg-[#9CCC65]/10 hover:shadow-lg hover:-translate-y-1">
                      <div className="font-bold text-black mb-2">{item.title}</div>
                      <div className="text-sm text-ink-60 leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-black text-white section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-12">
              <div className="eyebrow-light mb-3">Four service surfaces</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-5">One engineering practice. Four ways to apply it.</h2>
              <p className="text-white/70 leading-relaxed">Each service stands on its own. All compound when run together.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s, i) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="bg-white text-black rounded-xl p-7 hover:bg-lime transition-colors group block">
                  <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-3">Service 0{i + 1}</div>
                  <h3 className="text-xl font-bold text-black mb-3 leading-tight">{s.name}</h3>
                  <p className="text-sm text-ink-70 leading-relaxed mb-4">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/services" className="btn-on-dark">See all services →</Link>
            </div>
          </div>
        </section>

        {/* CRM HUB */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="eyebrow mb-3">CRM implementation</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">Five CRMs. One implementation philosophy.</h2>
                <p className="text-ink-70 leading-relaxed mb-6">We are a verified Attio Expert Partner and a Zapier Certified Solutions Partner. We also implement HubSpot, Salesforce, Pipedrive, and Close. The CRM you should run depends on what you sell, how you sell it, and where the operational debt actually sits.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/crm" className="group btn-dark inline-flex items-center gap-2 border border-[#9CCC65] bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md">
                    CRM implementation hub <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                  <Link href="/crm/compare" className="group btn-ghost inline-flex items-center gap-2 border border-[#9CCC65] bg-[#9CCC65] text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:text-black hover:shadow-md">
                    Compare platforms
                  </Link>
                </div>
              </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {crms.map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    className="card group relative overflow-hidden rounded-2xl border border-[#9CCC65]/35 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#F8FBF3] hover:shadow-[0_18px_45px_rgba(43,76,19,0.12)]"
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#9CCC65]/10 transition-transform duration-300 group-hover:scale-125" />

                    <div className="relative flex items-center gap-4">
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                        style={{ background: c.imageBg }}
                      >
                        <img
                          src={c.image}
                          alt={`${c.name} logo`}
                          className="h-10 w-10 object-contain"
                        />
                      </div>

                      <div className="min-w-0 text-left">
                        <div className="font-bold text-black text-lg leading-tight transition-colors duration-300 group-hover:text-[#558B2F]">
                          {c.name}
                        </div>
                        <div className="text-sm text-ink-60 mt-1">
                          {c.tag}
                        </div>

                        {c.badge && (
                          <span
                            className="mt-3 inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: '#f0f6e8', color: '#3B6D11' }}
                          >
                            Partner
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES PREVIEW */}
        <section className="bg-white section-padding border-t border-ink-10">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
              <div className="max-w-2xl">
                <div className="eyebrow mb-3">Selected work</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">Operations infrastructure, shipped.</h2>
              </div>
              <Link href="/case-studies" className="group btn-ghost inline-flex items-center gap-2 border border-[#9CCC65]/50 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9CCC65] hover:bg-[#9CCC65]/10 hover:text-[#7CB342] hover:shadow-md">
                See all 7 case studies <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {featuredCases.map((cs) => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`}
                  className="card group p-7 rounded-2xl border border-[#9CCC65]/40 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#9CCC65]/20 border border-[#9CCC65]/40 px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#9CCC65]/30 group-hover:border-[#9CCC65]">{cs.industry}</span>
                    <span className="text-xs font-semibold text-ink-60 transition-colors duration-300 group-hover:text-black">{cs.revenue}</span>
                  </div>
                  <div className="text-2xl font-bold text-black mb-2 leading-tight transition-colors duration-300 group-hover:text-[#7CB342]">{cs.metric}</div>
                  <div className="mb-5 space-y-2">
                    {cs.bullets.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-ink-60">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#6FAF3A] text-white text-[11px] font-bold">
                          ✓
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm transition-colors duration-300 group-hover:text-[#7CB342]">
                    Read engagement <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </Link>
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
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">What operators ask first.</h2>
                <Link href="/faq" className="group btn-ghost inline-flex items-center gap-2 border border-[#9CCC65]/50 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9CCC65] hover:bg-[#9CCC65]/10 hover:text-[#7CB342] hover:shadow-md">
                  See full FAQ <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
              <div className="lg:col-span-3 space-y-3">
                {homepageFaqs.map((f, i) => (
                  <details key={i} className="card group rounded-2xl border border-[#9CCC65]/40 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9CCC65] hover:bg-[#9CCC65]/5 hover:shadow-[0_14px_35px_rgba(0,0,0,0.08)] open:border-[#9CCC65] open:bg-[#9CCC65]/5 open:shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-black">
                      <span className="transition-colors duration-300 group-hover:text-[#7CB342] group-open:text-[#7CB342]">{f.question}</span>
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#9CCC65]/50 bg-[#9CCC65]/10 text-xl font-medium text-[#7CB342] transition-all duration-300 group-hover:border-[#9CCC65] group-hover:bg-[#9CCC65]/20 group-open:rotate-45 group-open:border-[#9CCC65] group-open:bg-[#9CCC65]/20">+</span>
                    </summary>
                    <div className="grid grid-rows-[0fr] transition-all duration-300 group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 border-t border-[#9CCC65]/20 pt-4 text-sm leading-relaxed text-ink-70">{f.answer}</p>
                      </div>
                    </div>
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