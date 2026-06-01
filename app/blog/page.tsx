import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: 'Resources | Practitioner Writing on Automation, CRM, and Operations',
  description:
    'Articles on workflow architecture, CRM implementation, automation tools, and operations engineering. Written by practitioners for operators.',
  path: '/blog',
});

export default async function BlogIndex() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id, slug, title, excerpt, category_name, reading_time, featured, featured_image_url, featured_image_alt, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const allPosts = posts || [];
  const featured = allPosts.find((p) => p.featured) || allPosts[0];
  const rest = featured ? allPosts.filter((p) => p.id !== featured.id) : allPosts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
          { name: 'Resources', url: 'https://www.automationconsultingservices.org/blog' },
        ])}
      />
      <Header />

      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7 max-w-4xl">
              Practitioner writing.<br />
              <span className="text-lime">No fluff. No SEO sludge.</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              Articles on workflow architecture, CRM implementation, automation tools, and operations engineering. Written by practitioners for operators.
            </p>
          </div>
        </section>

        {allPosts.length === 0 ? (
          <section className="bg-white section-padding">
            <div className="container-x text-center max-w-2xl mx-auto">
              <p className="text-ink-60">No published articles yet. Check back soon.</p>
            </div>
          </section>
        ) : (
          <>
            {featured && (
              <section className="bg-white section-padding">
                <div className="container-x">
                  <div className="eyebrow mb-3">Featured</div>
                  <Link href={`/blog/${featured.slug}`} className="block card p-8 lg:p-10 hover:border-black transition-colors group">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                      <div>
                        <div className="flex items-center gap-3 mb-5 flex-wrap">
                          {featured.category_name && (
                            <span className="bg-lime text-black px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                              {featured.category_name}
                            </span>
                          )}
                          {featured.reading_time && <span className="text-xs text-ink-60 font-semibold">{featured.reading_time}</span>}
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5 group-hover:text-lime-dark transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-base text-ink-70 leading-relaxed mb-6">{featured.excerpt}</p>
                        <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm">
                          Read article <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                      </div>
                      <div className="bg-lime rounded-xl overflow-hidden flex items-center justify-center min-h-[280px]">
                        {featured.featured_image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={featured.featured_image_url} alt={featured.featured_image_alt || featured.title} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-6xl font-bold text-black opacity-30 text-center px-6">
                            {featured.category_name || 'Article'}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              </section>
            )}

            {rest.length > 0 && (
              <section className="bg-white border-t border-ink-10 section-padding">
                <div className="container-x">
                  <div className="eyebrow mb-3">All articles</div>
                  <h2 className="text-3xl font-bold text-black leading-tight mb-10">{rest.length} more reads.</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((p) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="card overflow-hidden hover:border-black transition-colors group flex flex-col">
                        {p.featured_image_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.featured_image_url} alt={p.featured_image_alt || p.title} className="w-full aspect-[16/9] object-cover" />
                        )}
                        <div className="p-7 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-4 flex-wrap">
                            {p.category_name && (
                              <span className="bg-lime text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                {p.category_name}
                              </span>
                            )}
                            {p.reading_time && <span className="text-xs text-ink-60 font-semibold">{p.reading_time}</span>}
                          </div>
                          <h3 className="text-lg font-bold text-black mb-3 leading-tight group-hover:text-lime-dark transition-colors">
                            {p.title}
                          </h3>
                          <p className="text-sm text-ink-70 leading-relaxed mb-4 flex-1">{p.excerpt}</p>
                          <span className="inline-flex items-center gap-1.5 text-black font-semibold text-sm mt-auto">
                            Read <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
