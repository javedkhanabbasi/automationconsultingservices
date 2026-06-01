import Link from 'next/link';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/seo';
import Header from './Header';
import Footer from './Footer';
import FinalCTA from './FinalCTA';
import type { Service } from '@/content/services';

export default function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
{ name: 'Services', url: 'https://www.automationconsultingservices.org/services' },
{ name: service.name, url: `https://www.automationconsultingservices.org/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
          serviceSchema({ name: service.name, description: service.shortDesc, slug: `services/${service.slug}` }),
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
              <Link href="/services" className="hover:text-lime">Services</Link>
              <span className="mx-2">→</span>
              <span className="text-white">{service.name}</span>
            </nav>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  Service detail
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6">
                {service.name}
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
                {service.longDesc}
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES + WORKFLOW */}
        <section className="bg-white section-padding">
          <div className="container-x grid lg:grid-cols-2 gap-12">
            <div>
              <div className="eyebrow mb-3">What we build</div>
              <h2 className="text-3xl font-bold text-black leading-tight mb-6">Capabilities</h2>
              <ul className="space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-base text-black">
                    <span className="w-6 h-6 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-black text-xs font-bold">✓</span>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-3">In practice</div>
              <h2 className="text-3xl font-bold text-black leading-tight mb-6">Example workflow</h2>
              <div className="bg-lime rounded-xl p-7">
                <div className="space-y-2 mb-5">
                  {service.workflow.map((step, idx) => (
                    <div key={idx} className="bg-white rounded-lg px-4 py-3 flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-black">{step.step}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-black text-white rounded-lg p-4 flex justify-between items-center">
                  <span className="text-xs text-lime uppercase tracking-wider font-bold">{service.metricLabel}</span>
                  <span className="text-2xl font-bold">{service.metricValue}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STACK */}
        <section className="bg-white border-t border-ink-10 section-padding">
          <div className="container-x">
            <div className="max-w-2xl mb-8">
              <div className="eyebrow mb-3">Common stack</div>
              <h2 className="text-3xl font-bold text-black leading-tight">
                Tools we ship on for {service.name.toLowerCase()}.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.stack.map((tool) => (
                <span key={tool} className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED CASE STUDY */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="eyebrow mb-3">Proof in production</div>
              <h2 className="text-3xl font-bold text-black leading-tight mb-5">
                See {service.name.toLowerCase()} shipped.
              </h2>
              <p className="text-ink-80 leading-relaxed mb-6">
                The most relevant case study for this service line.
              </p>
              <Link href={`/case-studies/${service.relatedCaseStudy.slug}`} className="btn-dark">
                Read the {service.relatedCaseStudy.label} →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2">
                <div className="eyebrow mb-3">FAQ</div>
                <h2 className="text-3xl font-bold text-black leading-tight">
                  Questions specific to {service.name.toLowerCase()}.
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-3">
                {service.faqs.map((f, i) => (
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
