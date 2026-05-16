import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';
import Header from './Header';
import Footer from './Footer';
import FinalCTA from './FinalCTA';
import type { CrmPlatform } from '@/content/crm';
import { crmComparisons } from '@/content/crm-comparisons';

export default function CrmPlatformPage({ platform }: { platform: CrmPlatform }) {
  const relatedComparisons = crmComparisons.filter(
    (c) => c.a.name.toLowerCase() === platform.slug || c.b.name.toLowerCase() === platform.slug
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'CRM', url: 'https://automationconsultingservices.org/crm' },
            { name: platform.name, url: `https://automationconsultingservices.org/crm/${platform.slug}` },
          ]),
          faqSchema(platform.faqs),
        ]}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-lime">Home</Link>
              <span className="mx-2">→</span>
              <Link href="/crm" className="hover:text-lime">CRM</Link>
              <span className="mx-2">→</span>
              <span className="text-white">{platform.name}</span>
            </nav>
            <div className="max-w-4xl">
              {platform.partnerVerified && (
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-lime text-black">
                  <span>★</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Verified {platform.partnerStatus}</span>
                </div>
              )}
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                {platform.name} <span className="text-lime">implementation.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed">{platform.tagline}</p>
            </div>
          </div>
        </section>

        {/* PRACTITIONER FINGERPRINT */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-lime rounded-xl p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-black mb-3">Best for</div>
                <p className="text-base text-black leading-relaxed">{platform.bestFor}</p>
              </div>
              <div className="bg-black text-white rounded-xl p-7">
                <div className="text-xs font-bold uppercase tracking-wider text-lime mb-3">Fails at</div>
                <p className="text-base text-white/85 leading-relaxed">{platform.failsAt}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              <div className="card p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-60 mb-1">Time to value</div>
                <div className="text-lg font-bold text-black">{platform.timeline}</div>
              </div>
              <div className="card p-5">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-60 mb-1">Cost reference</div>
                <div className="text-lg font-bold text-black">{platform.costNote}</div>
              </div>
              <div className="card p-5 col-span-2 md:col-span-1">
                <div className="text-xs font-bold uppercase tracking-wider text-ink-60 mb-1">Partner status</div>
                <div className="text-lg font-bold text-black">{platform.partnerStatus}</div>
              </div>
            </div>

            <div className="bg-white border-l-4 border-lime pl-6 py-2">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-60 mb-2">Practitioner note</div>
              <p className="text-base text-black italic leading-relaxed">{platform.practitionerNote}</p>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="bg-white border-t border-ink-10 section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-8">
              <div className="eyebrow mb-3">Capabilities</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                What we ship on {platform.name}.
              </h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {platform.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 card p-5">
                  <span className="w-6 h-6 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">✓</span>
                  </span>
                  <span className="text-base text-black">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RELATED COMPARISONS */}
        {relatedComparisons.length > 0 && (
          <section className="bg-lime section-padding">
            <div className="container-x">
              <div className="max-w-2xl mb-8">
                <div className="eyebrow mb-3">Head-to-head</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                  {platform.name} compared.
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedComparisons.slice(0, 4).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/crm/compare/${c.slug}`}
                    className="bg-white rounded-xl p-6 hover:bg-black hover:text-white transition-colors group"
                  >
                    <h3 className="text-lg font-bold text-black group-hover:text-white mb-2">{c.title}</h3>
                    <p className="text-sm text-ink-70 group-hover:text-white/70 leading-relaxed">{c.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-black group-hover:text-lime font-semibold text-sm mt-4">
                      Read comparison →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">{platform.name} FAQ</div>
                <h2 className="text-3xl font-bold text-black leading-tight">
                  Questions specific to {platform.name}.
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-3">
                {platform.faqs.map((f, i) => (
                  <details key={i} className="card p-5 group">
                    <summary className="font-semibold text-black cursor-pointer list-none flex justify-between items-center gap-3">
                      <span>{f.question}</span>
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
