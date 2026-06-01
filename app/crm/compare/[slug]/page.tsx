import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { crmComparisons, getComparison } from '@/content/crm-comparisons';

export function generateStaticParams() {
  return crmComparisons.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getComparison(params.slug);
  if (!c) return { title: 'Comparison not found' };
  return buildMetadata({
    title: `${c.title} | CRM Comparison`,
    description: c.excerpt,
    path: `/crm/compare/${c.slug}`,
  });
}

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const c = getComparison(params.slug);
  if (!c) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
         { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
          { name: 'CRM', url: 'https://www.automationconsultingservices.org/crm' },
          { name: 'Compare', url: 'https://www.automationconsultingservices.org/crm/compare' },
          { name: c.title, url: `https://www.automationconsultingservices.org/crm/compare/${c.slug}` },
        ])}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-lime">Home</Link>
              <span className="mx-2">→</span>
              <Link href="/crm/compare" className="hover:text-lime">Compare</Link>
              <span className="mx-2">→</span>
              <span className="text-white">{c.title}</span>
            </nav>
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="bg-lime text-black px-4 py-2 rounded-md">
                  <div className="text-xs font-bold">{c.a.name}</div>
                  <div className="text-[10px] opacity-70">{c.a.tag}</div>
                </div>
                <span className="text-lime text-2xl font-bold">vs</span>
                <div className="bg-white text-black px-4 py-2 rounded-md">
                  <div className="text-xs font-bold">{c.b.name}</div>
                  <div className="text-[10px] opacity-70">{c.b.tag}</div>
                </div>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">{c.title}</h1>
              <p className="text-lg text-white/80 leading-relaxed">{c.excerpt}</p>
            </div>
          </div>
        </section>

        {/* VERDICT */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="eyebrow mb-3">The verdict</div>
              <p className="text-2xl text-black leading-relaxed font-semibold">{c.verdict}</p>
            </div>
          </div>
        </section>

        {/* WHEN A WINS / WHEN B WINS */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-black rounded-xl p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-black mb-3">Pick {c.a.name} when</div>
                <ul className="space-y-3">
                  {c.whenAWins.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-black">
                      <span className="w-6 h-6 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-xs font-bold">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-black text-white rounded-xl p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-lime mb-3">Pick {c.b.name} when</div>
                <ul className="space-y-3">
                  {c.whenBWins.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-white">
                      <span className="w-6 h-6 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-black text-xs font-bold">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CRITERIA TABLE */}
        <section className="bg-white border-t border-ink-10 section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-8">
              <div className="eyebrow mb-3">Side by side</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Criteria comparison.
              </h2>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Criterion</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">{c.a.name}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">{c.b.name}</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {c.criteria.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-ink-5'}>
                      <td className="px-6 py-4 text-sm font-semibold text-black">{row.name}</td>
                      <td className="px-6 py-4 text-sm text-black">{row.a}</td>
                      <td className="px-6 py-4 text-sm text-black">{row.b}</td>
                      <td className="px-6 py-4">
                        {row.winner === 'a' && <span className="text-xs font-bold uppercase tracking-wider bg-lime text-black px-2 py-1 rounded">{c.a.name}</span>}
                        {row.winner === 'b' && <span className="text-xs font-bold uppercase tracking-wider bg-black text-white px-2 py-1 rounded">{c.b.name}</span>}
                        {row.winner === 'tie' && <span className="text-xs font-bold uppercase tracking-wider bg-white border border-ink-20 text-black px-2 py-1 rounded">Tie</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
