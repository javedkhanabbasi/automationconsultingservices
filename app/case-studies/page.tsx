"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { caseStudies } from '@/content/case-studies';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface DbCase {
  id: string;
  title: string;
  short_title: string;
  slug: string;
  industry: string;
  industry_tag: string;
  revenue: string;
  region: string;
  timeline: string;
  headline_metric: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
}

const patterns = [
  { n: '01', title: 'Ships before contract value is recouped', body: 'Every engagement gets the first workflow into production within two weeks. The median project hits live in 4-6 weeks.' },
  { n: '02', title: 'Data hygiene before automation', body: 'In every case, the first thing we ship is a data audit, not a workflow. Automating on top of dirty data multiplies cost.' },
  { n: '03', title: 'Documentation ships with the system', body: 'Every engagement closes with a runbook the operator can hand to a future hire.' },
  { n: '04', title: 'Named operators, not anonymous testimonials', body: 'Five of seven engagements feature named operators with real titles verifiable on LinkedIn.' },
];

const outcomes = [
  { type: 'Time reclaimed', studies: [{ slug: 'healthcare-meeting-automation', label: 'Healthcare SaaS', metric: '6-8 hrs/week' }, { slug: 'supplement-quoting-automation', label: 'Manufacturing', metric: '80% faster quotes' }] },
  { type: 'Accuracy unlocked', studies: [{ slug: 'hvac-lead-time-automation', label: 'HVAC Distribution', metric: '5,500+ SKUs hourly' }, { slug: 'competitor-intelligence', label: 'AdTech', metric: '<2% duplicate rate' }] },
  { type: 'Revenue accelerated', studies: [{ slug: 'led-display-lead-gen', label: 'Events & AV', metric: '60+ opps in 14 days' }, { slug: 'competitor-intelligence', label: 'AdTech', metric: '12-25 accts per deal' }] },
  { type: 'Data unified', studies: [{ slug: 'mobile-pet-grooming-dashboard', label: 'Field Services', metric: '3 tools unified' }, { slug: 'fencing-automation-management', label: 'Construction', metric: '100+ workflows' }] },
];

export default function CaseStudiesIndex() {
  const [dbCases, setDbCases] = useState<DbCase[]>([]);

  useEffect(() => {
    supabase
      .from('case_studies')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setDbCases(data); });
  }, []);

  const totalCount = caseStudies.length + dbCases.length;

  return (
    <>
      <Header />
      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  {totalCount} engagements · Five named operators
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Evidence over claims.<br />
                <span className="text-lime">Work over decks.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
                Every case study below names the operator, the revenue band, the timeline, and the headline metric. Five include real testimonials from people you can verify on LinkedIn.
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-ink-10">
          <div className="container-x py-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { val: totalCount, label: 'Published' },
                { val: 5, label: 'Named operators' },
                { val: 7, label: 'Industries' },
                { val: '4-6 wks', label: 'Median ship' },
                { val: '$1.5-25M', label: 'Revenue range', span: true },
              ].map((s) => (
                <div key={s.label} className={`${s.span ? 'col-span-2 md:col-span-1' : ''} rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg`}
                  style={{ border: '2px solid rgb(156 204 101)', backgroundColor: 'white' }}>
                  <div className="text-3xl font-bold text-black">{s.val}</div>
                  <div className="text-xs text-ink-60 uppercase tracking-wider mt-1 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PATTERNS */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">What repeats across every engagement</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">Different industries. Same shape underneath.</h2>
              <p className="text-ink-70 leading-relaxed">Four patterns show up in every case study below. The patterns are the methodology made visible.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {patterns.map((p) => (
                <div key={p.n} className="rounded-lg p-7 transition-transform transform hover:scale-105 hover:shadow-lg"
                  style={{ border: '2px solid rgb(156 204 101)', backgroundColor: 'white' }}>
                  <div className="text-2xl font-bold mb-3" style={{ color: 'rgb(156 204 101)' }}>{p.n}</div>
                  <h3 className="text-lg font-bold text-black mb-3 leading-tight">{p.title}</h3>
                  <p className="text-ink-70 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME TAXONOMY */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Outcome taxonomy</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-4">Four kinds of outcome we ship.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {outcomes.map((o) => (
                <div key={o.type} className="bg-white rounded-xl p-7">
                  <h3 className="text-xl font-bold text-black mb-4">{o.type}</h3>
                  <div className="space-y-2">
                    {o.studies.map((s) => (
                      <Link key={s.slug} href={`/case-studies/${s.slug}`} className="flex items-center justify-between p-3 bg-ink-5 rounded-lg hover:bg-black hover:text-white transition-colors group">
                        <span className="text-sm font-semibold text-black group-hover:text-white">{s.label}</span>
                        <span className="text-xs font-bold text-black group-hover:text-lime">{s.metric}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALL CASE STUDIES — static + database ek saath */}
        <section className="bg-white section-padding border-t border-ink-10">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">The engagements</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Named operators. Real numbers. Verifiable outcomes.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Database se nai case studies pehle */}
              {dbCases.map((cs) => (
                <Link key={`db-${cs.id}`} href={`/case-studies/${cs.slug}`} className="card p-7 hover:border-black transition-colors group flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold text-black bg-lime px-2.5 py-1 rounded uppercase tracking-wider">
                      {cs.industry_tag || cs.industry || 'Case Study'}
                    </span>
                    {cs.revenue && <span className="text-xs font-semibold text-ink-60">{cs.revenue}</span>}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3 leading-snug group-hover:text-lime-dark transition-colors">
                    {cs.short_title || cs.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    {cs.region && <div><div className="text-ink-60 uppercase tracking-wider font-semibold mb-0.5">Region</div><div className="text-black font-semibold">{cs.region}</div></div>}
                    {cs.timeline && <div><div className="text-ink-60 uppercase tracking-wider font-semibold mb-0.5">Timeline</div><div className="text-black font-semibold">{cs.timeline}</div></div>}
                  </div>
                  {cs.headline_metric && (
                    <div className="bg-black text-white rounded-lg p-4 mb-4">
                      <div className="text-[10px] font-bold text-lime uppercase tracking-wider mb-1">Headline metric</div>
                      <div className="text-white font-bold text-sm leading-tight">{cs.headline_metric}</div>
                    </div>
                  )}
                  {cs.description && <p className="text-sm text-ink-70 leading-relaxed mb-4 flex-1">{cs.description}</p>}
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm mt-auto">
                    Read engagement <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              ))}

              {/* Static case studies baad mein */}
              {caseStudies.map((cs) => (
                <Link key={`static-${cs.slug}`} href={`/case-studies/${cs.slug}`} className="card p-7 hover:border-black transition-colors group flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold text-black bg-lime px-2.5 py-1 rounded uppercase tracking-wider">{cs.industryTag}</span>
                    <span className="text-xs font-semibold text-ink-60">{cs.revenue}</span>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3 leading-snug group-hover:text-lime-dark transition-colors">{cs.shortTitle}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div><div className="text-ink-60 uppercase tracking-wider font-semibold mb-0.5">Region</div><div className="text-black font-semibold">{cs.region}</div></div>
                    <div><div className="text-ink-60 uppercase tracking-wider font-semibold mb-0.5">Timeline</div><div className="text-black font-semibold">{cs.timeline}</div></div>
                  </div>
                  <div className="bg-black text-white rounded-lg p-4 mb-4">
                    <div className="text-[10px] font-bold text-lime uppercase tracking-wider mb-1">Headline metric</div>
                    <div className="text-white font-bold text-sm leading-tight">{cs.headlineMetric}</div>
                  </div>
                  <p className="text-sm text-ink-70 leading-relaxed mb-4 flex-1">{cs.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm mt-auto">
                    Read engagement <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
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