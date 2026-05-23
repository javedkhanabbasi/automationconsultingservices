export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

// Badge colour per status
function statusBadge(status: string) {
  switch (status) {
    case 'published': return 'bg-lime text-black';
    case 'scheduled': return 'bg-amber-200 text-amber-900';
    case 'archived': return 'bg-ink-10 text-ink-60';
    default: return 'bg-ink-10 text-black'; // draft
  }
}

// Short, readable date+time for scheduled posts — Pakistan timezone (Asia/Karachi)
function formatScheduled(value: string) {
  return new Date(value).toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default async function BlogListPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, status, featured, category_name, updated_at, published_at, scheduled_for')
    .order('updated_at', { ascending: false });

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Blog posts</h1>
          <p className="text-ink-60 text-sm">{posts?.length || 0} total</p>
        </div>
        <Link href="/acs-1000-admin/blog/new" className="btn-primary">+ New post</Link>
      </div>

      <div className="card overflow-hidden">
        {posts && posts.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ink-5 border-b border-ink-10">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Title</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Category</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Updated</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((p) => (
                    <tr key={p.id} className="border-b border-ink-10 hover:bg-ink-5">
                      <td className="px-6 py-4">
                        <Link href={`/acs-1000-admin/blog/${p.id}`} className="font-semibold text-black hover:text-lime-dark">
                          {p.title}
                          {p.featured && <span className="ml-2 text-[10px] font-bold uppercase tracking-wider bg-lime text-black px-2 py-0.5 rounded">Featured</span>}
                        </Link>
                        <div className="text-xs text-ink-50 mt-0.5">/{p.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-70">{p.category_name || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${statusBadge(p.status)}`}>
                          {p.status}
                        </span>
                        {p.status === 'scheduled' && p.scheduled_for && (
                          <div className="text-xs text-ink-50 mt-1">→ {formatScheduled(p.scheduled_for)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-60">{new Date(p.updated_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/acs-1000-admin/blog/${p.id}`} className="text-sm font-semibold text-black hover:text-lime-dark">Edit →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <ul className="sm:hidden divide-y divide-ink-10">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link href={`/acs-1000-admin/blog/${p.id}`} className="flex items-center justify-between p-4 hover:bg-ink-5 transition-colors gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black text-sm truncate">
                        {p.title}
                        {p.featured && <span className="ml-2 text-[10px] font-bold uppercase bg-lime text-black px-1.5 py-0.5 rounded">Featured</span>}
                      </div>
                      <div className="text-xs text-ink-50 mt-0.5 truncate">/{p.slug}</div>
                      <div className="text-xs text-ink-50 mt-1">{p.category_name || '—'} · {new Date(p.updated_at).toLocaleDateString()}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${statusBadge(p.status)}`}>
                        {p.status}
                      </span>
                      {p.status === 'scheduled' && p.scheduled_for && (
                        <span className="text-[10px] text-ink-50">{formatScheduled(p.scheduled_for)}</span>
                      )}
                      <span className="text-xs font-semibold text-black">Edit →</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <div className="text-4xl mb-3">✎</div>
            <h3 className="text-lg font-bold text-black mb-2">No posts yet</h3>
            <p className="text-ink-60 text-sm mb-5">Write your first blog post to get started.</p>
            <Link href="/acs-1000-admin/blog/new" className="btn-primary">+ Write first post</Link>
          </div>
        )}
      </div>
    </div>
  );
}