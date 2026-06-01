import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { caseStudies, getCaseStudy } from '@/content/case-studies';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) return { title: 'Case study not found' };
  return buildMetadata({
    title: `${cs.shortTitle} | Case Study`,
    description: cs.description,
    path: `/case-studies/${cs.slug}`,
  });
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  const related = cs.related.map((slug) => getCaseStudy(slug)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
        { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
          { name: 'Case Studies', url: 'https://www.automationconsultingservices.org/case-studies' },
          { name: cs.shortTitle, url: `https://www.automationconsultingservices.org/case-studies/${cs.slug}` },
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
              <Link href="/case-studies" className="hover:text-lime">Case Studies</Link>
              <span className="mx-2">→</span>
              <span className="text-white">{cs.industryTag}</span>
            </nav>
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-lime text-black px-2.5 py-1 rounded">{cs.industryTag}</span>
                  <span className="text-xs font-semibold text-white/70">{cs.revenue} · {cs.region} · {cs.timeline}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-7">{cs.title}</h1>
                <p className="text-lg text-white/80 leading-relaxed">{cs.description}</p>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-white text-black rounded-xl p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-ink-60 mb-4">Results</div>
                  <div className="space-y-4">
                    {cs.results.map((r, i) => (
                      <div key={i} className="flex items-baseline justify-between border-b border-ink-10 pb-3 last:border-0">
                        <span className="text-sm text-ink-70">{r.label}</span>
                        <span className="text-xl font-bold text-black">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHALLENGE */}
        <section className="bg-white section-padding">
          <div className="container-x max-w-4xl">
            <div className="eyebrow mb-3">The challenge</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">{cs.challenge.heading}</h2>
            {cs.challenge.paragraphs.map((p, i) => (
              <p key={i} className="text-base text-ink-70 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </section>

        {/* SOLUTION */}
        <section className="bg-lime section-padding">
          <div className="container-x max-w-4xl">
            <div className="eyebrow mb-3">The solution</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">{cs.solution.heading}</h2>
            {cs.solution.paragraphs.map((p, i) => (
              <p key={i} className="text-base text-black leading-relaxed mb-4">{p}</p>
            ))}
            <div className="mt-8 space-y-3">
              {cs.solution.steps.map((step) => (
                <div key={step.num} className="bg-white rounded-lg p-5 flex items-start gap-4">
                  <span className="w-9 h-9 bg-black text-white rounded-md flex items-center justify-center font-bold flex-shrink-0">
                    {step.num}
                  </span>
                  <p className="text-base text-black leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK */}
        <section className="bg-white border-t border-ink-10 section-padding">
          <div className="container-x max-w-4xl">
            <div className="eyebrow mb-3">Stack used</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">What we shipped on.</h2>
            <div className="flex flex-wrap gap-2">
              {cs.techStack.map((tool) => (
                <span key={tool} className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME */}
        <section className="bg-white section-padding">
          <div className="container-x max-w-4xl">
            <div className="eyebrow mb-3">The outcome</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-6">{cs.outcome.heading}</h2>
            {cs.outcome.paragraphs.map((p, i) => (
              <p key={i} className="text-base text-ink-70 leading-relaxed mb-4">{p}</p>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL */}
        {cs.testimonial && (
          <section className="bg-black text-white section-padding">
            <div className="container-x max-w-3xl">
              <div className="text-lime text-5xl mb-6">&ldquo;</div>
              <p className="text-2xl lg:text-3xl text-white leading-relaxed font-semibold mb-8">
                {cs.testimonial.quote}
              </p>
              <div className="pt-6 border-t border-white/20">
                <div className="font-bold text-white">{cs.testimonial.attribution}</div>
                <div className="text-white/60 text-sm mt-1">{cs.testimonial.role}</div>
              </div>
            </div>
          </section>
        )}

        {/* RELATED */}
        {related.length > 0 && (
          <section className="bg-white section-padding border-t border-ink-10">
            <div className="container-x">
              <div className="max-w-2xl mb-8">
                <div className="eyebrow mb-3">Related engagements</div>
                <h2 className="text-3xl font-bold text-black leading-tight">More work like this.</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((r) => r && (
                  <Link key={r.slug} href={`/case-studies/${r.slug}`} className="card p-6 hover:border-black transition-colors group">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-lime text-black px-2 py-1 rounded">{r.industryTag}</span>
                    <h3 className="text-base font-bold text-black mt-4 mb-2 leading-tight group-hover:text-lime-dark">{r.shortTitle}</h3>
                    <p className="text-xs text-ink-60">{r.headlineMetric}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
