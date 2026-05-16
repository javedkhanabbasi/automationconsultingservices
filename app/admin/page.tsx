export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = createClient();

  const [postsCount, csCount, servicesCount, pagesCount, recentPosts, recentCs] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('case_studies').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('pages').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('id, title, slug, status, updated_at').order('updated_at', { ascending: false }).limit(5),
    supabase.from('case_studies').select('id, short_title, slug, status, updated_at').order('updated_at', { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: 'Blog posts', count: postsCount.count || 0, href: '/admin/blog', cta: '+ New post' },
    { label: 'Case studies', count: csCount.count || 0, href: '/admin/case-studies', cta: '+ New case study' },
    { label: 'Services', count: servicesCount.count || 0, href: '/admin/services', cta: 'Manage' },
    { label: 'Pages', count: pagesCount.count || 0, href: '/admin/pages', cta: 'Manage' },
  ];

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-ink-60">Welcome back. Here is what is happening on the site.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-4 sm:p-6 hover:border-black transition-colors group">
            <div className="text-xs font-bold text-ink-60 uppercase tracking-wider mb-2">{s.label}</div>
            <div className="text-3xl sm:text-4xl font-bold text-black mb-2 sm:mb-3">{s.count}</div>
            <span className="text-sm font-semibold text-black group-hover:text-lime-dark">{s.cta} →</span>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl font-bold text-black mb-4 sm:mb-5">Quick actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Link href="/admin/blog/new" className="bg-lime text-black rounded-xl p-4 sm:p-5 hover:bg-lime-dark transition-colors block">
            <div className="text-2xl mb-2">✎</div>
            <div className="font-bold text-sm">Write blog post</div>
          </Link>
          <Link href="/admin/case-studies/new" className="bg-black text-white rounded-xl p-4 sm:p-5 hover:bg-ink-90 transition-colors block">
            <div className="text-2xl mb-2">★</div>
            <div className="font-bold text-sm">New case study</div>
          </Link>
          <Link href="/admin/media" className="card p-4 sm:p-5 hover:border-black transition-colors block">
            <div className="text-2xl mb-2">📁</div>
            <div className="font-bold text-sm text-black">Upload media</div>
          </Link>
          <Link href="/admin/categories" className="card p-4 sm:p-5 hover:border-black transition-colors block">
            <div className="text-2xl mb-2">⊞</div>
            <div className="font-bold text-sm text-black">Manage categories</div>
          </Link>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-lg font-bold text-black">Recent blog posts</h2>
            <Link href="/admin/blog" className="text-sm font-semibold text-black hover:text-lime-dark">View all →</Link>
          </div>
          {recentPosts.data && recentPosts.data.length > 0 ? (
            <ul className="space-y-2 sm:space-y-3">
              {recentPosts.data.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/blog/${p.id}`} className="flex items-center justify-between p-2 sm:p-3 rounded-md hover:bg-ink-5 transition-colors gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black text-sm truncate">{p.title}</div>
                      <div className="text-xs text-ink-50 mt-0.5 truncate">/{p.slug}</div>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${p.status === 'published' ? 'bg-lime text-black' : 'bg-ink-10 text-black'}`}>
                      {p.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-50 text-center py-8">No posts yet. <Link href="/admin/blog/new" className="text-black font-semibold underline">Write the first one</Link>.</p>
          )}
        </div>

        <div className="card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-lg font-bold text-black">Recent case studies</h2>
            <Link href="/admin/case-studies" className="text-sm font-semibold text-black hover:text-lime-dark">View all →</Link>
          </div>
          {recentCs.data && recentCs.data.length > 0 ? (
            <ul className="space-y-2 sm:space-y-3">
              {recentCs.data.map((c) => (
                <li key={c.id}>
                  <Link href={`/admin/case-studies/${c.id}`} className="flex items-center justify-between p-2 sm:p-3 rounded-md hover:bg-ink-5 transition-colors gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black text-sm truncate">{c.short_title}</div>
                      <div className="text-xs text-ink-50 mt-0.5 truncate">/{c.slug}</div>
                    </div>
                    <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${c.status === 'published' ? 'bg-lime text-black' : 'bg-ink-10 text-black'}`}>
                      {c.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-50 text-center py-8">No case studies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
