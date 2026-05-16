import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = buildMetadata({
  title: 'Free Tools | Stripe Fee Calculator and Automation Platform Finder',
  description: 'Free practitioner-grade tools. Stripe fee calculator with gross-up option. Automation platform finder comparing Zapier, Make, and n8n.',
  path: '/tools',
});

const tools = [
  {
    slug: 'stripe-calculator',
    name: 'Stripe fee calculator',
    desc: 'Calculate forward fees or gross-up an invoice to receive a target net amount. Includes international and ACH variants.',
    tag: 'Finance ops',
  },
  {
    slug: 'automation-tool-finder',
    name: 'Automation platform finder',
    desc: 'Four-question diagnostic returning a ranked recommendation across Zapier, Make, n8n, and native CRM automation.',
    tag: 'Tool selection',
  },
];

export default function ToolsIndex() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://automationconsultingservices.org/' },
          { name: 'Tools', url: 'https://automationconsultingservices.org/tools' },
        ])}
      />
      <Header />

      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7 max-w-4xl">
              Free tools.<br />
              <span className="text-lime">Built for operators.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              Practitioner-grade calculators and decision tools. No email gate, no signup wall, no upsell.
            </p>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid md:grid-cols-2 gap-5">
              {tools.map((t) => (
                <Link key={t.slug} href={`/tools/${t.slug}`} className="card p-8 hover:border-black transition-colors group">
                  <div className="inline-block bg-lime text-black px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-4">
                    {t.tag}
                  </div>
                  <h2 className="text-2xl font-bold text-black mb-3 group-hover:text-lime-dark transition-colors">{t.name}</h2>
                  <p className="text-base text-ink-70 leading-relaxed mb-5">{t.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm">
                    Open tool <span className="group-hover:translate-x-1 transition-transform">→</span>
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
