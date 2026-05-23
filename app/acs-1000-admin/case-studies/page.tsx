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

// Short, readable date+time for scheduled posts
function formatScheduled(value: string) {
  return new Date(value).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default async function CaseStudiesListPage() {
  const supabase = createClient();
  const { data: items } = await supabase
    .from('case_studies')
    .select('id, short_title, slug, status, industry_tag, revenue, region, timeline, headline_metric, updated_at, scheduled_for')
    .order('updated_at', { ascending: false });

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-6 sm:mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Case studies</h1>
          <p className="text-ink-60 text-sm">{items?.length || 0} total</p>
        </div>
        <Link href="/acs-1000-admin/case-studies/new" className="btn-primary">+ New case study</Link>
      </div>

      <div className="card overflow-hidden">
        {items && items.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ink-5 border-b border-ink-10">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Title</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Industry</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Revenue</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((c) => (
                    <tr key={c.id} className="border-b border-ink-10 hover:bg-ink-5">
                      <td className="px-6 py-4">
                        <Link href={`/acs-1000-admin/case-studies/${c.id}`} className="font-semibold text-black hover:text-lime-dark">
                          {c.short_title}
                        </Link>
                        <div className="text-xs text-ink-50 mt-0.5">/{c.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-70">{c.industry_tag || '—'}</td>
                      <td className="px-6 py-4 text-sm text-ink-70">{c.revenue || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${statusBadge(c.status)}`}>
                          {c.status}
                        </span>
                        {c.status === 'scheduled' && c.scheduled_for && (
                          <div className="text-xs text-ink-50 mt-1">→ {formatScheduled(c.scheduled_for)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/acs-1000-admin/case-studies/${c.id}`} className="text-sm font-semibold text-black hover:text-lime-dark">Edit →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <ul className="sm:hidden divide-y divide-ink-10">
              {items.map((c) => (
                <li key={c.id}>
                  <Link href={`/acs-1000-admin/case-studies/${c.id}`} className="flex items-center justify-between p-4 hover:bg-ink-5 transition-colors gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black text-sm truncate">{c.short_title}</div>
                      <div className="text-xs text-ink-50 mt-0.5 truncate">/{c.slug}</div>
                      <div className="text-xs text-ink-50 mt-1">{c.industry_tag || '—'} · {c.revenue || '—'}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${statusBadge(c.status)}`}>
                        {c.status}
                      </span>
                      {c.status === 'scheduled' && c.scheduled_for && (
                        <span className="text-[10px] text-ink-50">{formatScheduled(c.scheduled_for)}</span>
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
            <div className="text-4xl mb-3">★</div>
            <h3 className="text-lg font-bold text-black mb-2">No case studies yet</h3>
            <Link href="/acs-1000-admin/case-studies/new" className="btn-primary mt-4">+ Add first</Link>
          </div>
        )}
      </div>
    </div>
  );
}