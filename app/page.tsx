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
  { question: 'What does Automation Consulting Services do?', answer: 'We build operations infrastructure for $1M-$10M companies. CRM implementation, workflow engineering, integration architecture, and admin systems engineered to scale rather than glued together with one-off Zaps.' },
  { question: 'Who is the right fit for ACS?', answer: 'Operators in the $1M-$10M revenue band running on a mix of CRMs, spreadsheets, and shared inboxes. Teams that need real infrastructure before the next growth stage compounds the chaos.' },
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
  { slug: 'hvac-lead-time-automation', industry: 'HVAC distribution', revenue: '$8M', metric: '5,500+ SKUs hourly' },
  { slug: 'fencing-automation-management', industry: 'Construction', revenue: '$25M', metric: '100+ workflows' },
  { slug: 'healthcare-meeting-automation', industry: 'Healthcare SaaS', revenue: 'Series B', metric: '6-8 hrs/week saved' },
];

const crms = [
  {
    name: 'Attio', tag: 'Expert Partner', href: '/crm/attio', badge: true,
    iconBg: '#f0f0f0',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z" fill="#1a1a1a"/><circle cx="12" cy="12" r="3" fill="white"/></svg>,
  },
  {
    name: 'HubSpot', tag: 'Marketing + sales', href: '/crm/hubspot',
    iconBg: '#fff4f0',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.164 7.93V5.768a1.875 1.875 0 10-1.875 0V7.93a5.616 5.616 0 00-2.677 1.472L7.857 6.354a2.07 2.07 0 10-.93 1.604l5.593 3.01A5.556 5.556 0 0012.25 12a5.613 5.613 0 00.309 1.84l-3.87 2.235a2.063 2.063 0 10.937 1.597l3.86-2.229a5.625 5.625 0 108.678-5.513zm-4.913 6.82a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" fill="#FF7A59"/></svg>,
  },
  {
    name: 'Salesforce', tag: 'Enterprise', href: '/crm/salesforce',
    iconBg: '#f0f6ff',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.002 6.168a3.94 3.94 0 012.857-1.23c1.29 0 2.43.624 3.143 1.587a4.895 4.895 0 011.788-.337c2.728 0 4.94 2.231 4.94 4.983 0 2.75-2.212 4.982-4.94 4.982a4.88 4.88 0 01-1.038-.112 3.574 3.574 0 01-3.2 1.999 3.552 3.552 0 01-1.517-.337 4.204 4.204 0 01-3.872 2.577c-2.055 0-3.8-1.477-4.262-3.453A3.96 3.96 0 013 16.4a3.99 3.99 0 013.987-3.995c.152 0 .301.01.449.027a4.444 4.444 0 01-.337-1.7c0-2.404 1.9-4.384 4.28-4.508a3.95 3.95 0 01-.377-.056z" fill="#00A1E0"/></svg>,
  },
  {
    name: 'Pipedrive', tag: 'Pipeline-first', href: '/crm/pipedrive',
    iconBg: '#fff0f0',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 13.5c-3.315 0-6.255-1.575-8.145-4.02.045-2.7 5.43-4.185 8.145-4.185 2.7 0 8.1 1.485 8.145 4.185C18.255 16.425 15.315 18 12 18z" fill="#E8392A"/></svg>,
  },
  {
    name: 'Close', tag: 'Inside sales', href: '/crm/close',
    iconBg: '#f5f0ff',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="6" fill="#7C3AED"/><path d="M7 12h10M12 7l5 5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
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
                  <span className="text-xs font-semibold text-lime uppercase tracking-wider">Operations infrastructure for $10K-$50M operators</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.02] tracking-tight mb-7">
                  Engineering discipline.<br />
                  <span className="text-lime">Applied to your operations.</span>
                </h1>
                <p className="text-base lg:text-xl text-white/80 leading-relaxed mb-9 max-w-2xl">
                  We build CRM systems, workflow infrastructure, and integration architecture for $10K-$50M operators who need their back office to scale faster than their headcount.
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
             <div className="grid grid-cols-2 gap-3">
  {crms.map((c) => (
    <Link key={c.name} href={c.href}
      className="card p-4 rounded-xl border border-[#9CCC65]/40 transition-all duration-200 hover:border-[#9CCC65] hover:-translate-y-0.5 hover:shadow-sm flex flex-col gap-2">
      <div>
        <div className="font-semibold text-black text-sm leading-tight">{c.name}</div>
        <div className="text-xs text-ink-60 mt-0.5">{c.tag}</div>
      </div>
      {c.badge && (
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded w-fit"
          style={{ background: '#f0f6e8', color: '#3B6D11' }}
        >
          Partner
        </span>
      )}
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
                  <div className="text-xs text-ink-60 mb-5">Headline metric</div>
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