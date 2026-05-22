import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbSchema, articleSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import { createClient } from '@/lib/supabase/server';
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const supabase = createClient();
    const { data } = await supabase.from('posts').select('slug').eq('status', 'published');
    return (data || []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, meta_title, meta_description, og_image_url, canonical_url, slug, featured_image_url, no_index, no_follow')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) return { title: 'Article not found' };

  return buildMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || '',
    path: `/blog/${post.slug}`,
    image: post.og_image_url || post.featured_image_url || undefined,
    noIndex: post.no_index ?? false,
    noFollow: post.no_follow ?? false,
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  const { data: related } = await supabase
    .from('posts')
    .select('id, slug, title, category_name, reading_time')
    .eq('status', 'published')
    .neq('id', post.id)
    .eq('category_id', post.category_id || '00000000-0000-0000-0000-000000000000')
    .limit(3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://automationconsultingservices.org/' },
            { name: 'Resources', url: 'https://automationconsultingservices.org/blog' },
            { name: post.title, url: `https://automationconsultingservices.org/blog/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.excerpt || '',
            slug: post.slug,
            publishedTime: post.published_at || post.created_at,
            modifiedTime: post.updated_at,
            author: post.author_name || 'Matthew Piwko',
          }),
        ]}
      />
      <Header />

      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-lime">Home</Link>
              <span className="mx-2">→</span>
              <Link href="/blog" className="hover:text-lime">Resources</Link>
              {post.category_name && (
                <>
                  <span className="mx-2">→</span>
                  <span className="text-white">{post.category_name}</span>
                </>
              )}
            </nav>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                {post.category_name && (
                  <span className="bg-lime text-black px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {post.category_name}
                  </span>
                )}
                {post.reading_time && <span className="text-xs text-white/70 font-semibold">{post.reading_time}</span>}
                {post.published_at && (
                  <>
                    <span className="text-xs text-white/70 font-semibold">·</span>
                    <span className="text-xs text-white/70 font-semibold">
                      {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-6">{post.title}</h1>
              {post.excerpt && <p className="text-lg text-white/80 leading-relaxed mb-6">{post.excerpt}</p>}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
                  <Image
                    src="/images/UI.png"
                    alt={post.author_name || "Author"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-sm text-white font-semibold leading-none">
                    {post.author_name || "Usman Ishaq"}
                  </div>

                  <div className="text-xs text-white/60 mt-1">
                    Author, Semantic SEO Strategist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {post.featured_image_url && (
          <section className="bg-white pt-12">
            <div className="container-x max-w-4xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.featured_image_url} alt={post.featured_image_alt || post.title} className="w-full rounded-xl" />
            </div>
          </section>
        )}

        <article className="bg-white section-padding">
          <div className="container-x max-w-3xl">
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>
        </article>

        {related && related.length > 0 && (
          <section className="bg-lime section-padding">
            <div className="container-x">
              <div className="max-w-2xl mb-8">
                <div className="eyebrow mb-3">Related reading</div>
                <h2 className="text-3xl font-bold text-black leading-tight">More on this topic.</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="bg-white rounded-xl p-6 hover:bg-black hover:text-white transition-colors group">
                    {r.category_name && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-lime text-black px-2 py-1 rounded group-hover:bg-white">
                        {r.category_name}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-black mt-4 mb-2 leading-tight group-hover:text-white">{r.title}</h3>
                    {r.reading_time && <p className="text-xs text-ink-60 group-hover:text-white/60">{r.reading_time}</p>}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>

      <Footer />

      <style>{`
        .article-content h2 { font-size: 1.875rem; font-weight: 700; color: #000; margin-top: 3rem; margin-bottom: 1rem; line-height: 1.2; }
        .article-content h3 { font-size: 1.5rem; font-weight: 700; color: #000; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.3; }
        .article-content h4 { font-size: 1.25rem; font-weight: 700; color: #000; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .article-content p { font-size: 1.0625rem; line-height: 1.75; color: rgba(0,0,0,0.8); margin-bottom: 1.25rem; }
        .article-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .article-content ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.5rem; }
        .article-content li { font-size: 1.0625rem; line-height: 1.75; color: rgba(0,0,0,0.8); margin-bottom: 0.5rem; }
        .article-content blockquote { border-left: 4px solid #9ccc65; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; font-size: 1.25rem; color: #000; line-height: 1.5; }
        .article-content a { color: #000; text-decoration: underline; text-decoration-color: #9ccc65; text-decoration-thickness: 2px; font-weight: 600; }
        .article-content a:hover { text-decoration-color: #000; }
        .article-content img { max-width: 100%; height: auto; border-radius: 0.5rem; margin: 2rem 0; }
        .article-content hr { border: none; border-top: 1px solid rgba(0,0,0,0.1); margin: 2.5rem 0; }
        .article-content strong { font-weight: 700; color: #000; }
        .article-content em { font-style: italic; }
        .article-content code { background: rgba(0,0,0,0.05); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.9em; font-family: monospace; }
      `}</style>
    </>
  );
}