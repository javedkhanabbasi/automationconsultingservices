import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { crmComparisons } from '@/content/crm-comparisons';

export const metadata: Metadata = buildMetadata({
  title: 'Compare CRM Platforms | Attio, HubSpot, Salesforce, Pipedrive, Close',
  description: 'Ten head-to-head CRM comparisons written from a practitioner perspective. Attio vs HubSpot, Salesforce vs Pipedrive, and more.',
  path: '/crm/compare',
});

export default function CompareHub() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://automationconsultingservices.org/' },
          { name: 'CRM', url: 'https://automationconsultingservices.org/crm' },
          { name: 'Compare', url: 'https://automationconsultingservices.org/crm/compare' },
        ])}
      />
      <Header />

      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-lime">Home</Link>
              <span className="mx-2">→</span>
              <Link href="/crm" className="hover:text-lime">CRM</Link>
              <span className="mx-2">→</span>
              <span className="text-white">Compare</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-4xl">
              Ten CRM comparisons.<br />
              <span className="text-lime">Written by practitioners.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              Each comparison is written from the perspective of someone who implements both platforms. No vendor bias. No referral fees behind the recommendations.
            </p>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid md:grid-cols-2 gap-5">
              {crmComparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/crm/compare/${c.slug}`}
                  className="card p-7 hover:border-black transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <span className="px-3 py-1 bg-lime text-black rounded-md text-xs font-bold">{c.a.name}</span>
                    <span className="text-ink-60 text-xs font-bold">vs</span>
                    <span className="px-3 py-1 bg-black text-white rounded-md text-xs font-bold">{c.b.name}</span>
                  </div>
                  <h2 className="text-xl font-bold text-black mb-3 leading-tight">{c.title}</h2>
                  <p className="text-sm text-ink-70 leading-relaxed mb-4">{c.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm">
                    Read comparison <span className="group-hover:translate-x-1 transition-transform">→</span>
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
