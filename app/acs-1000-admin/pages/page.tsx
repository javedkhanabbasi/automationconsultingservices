export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function PagesListPage() {
  const supabase = createClient();
  const { data: items } = await supabase.from('pages').select('*').order('slug');

  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-1">Pages</h1>
        <p className="text-ink-60 text-sm">SEO and content settings for static marketing pages (About, Pricing, FAQ, etc.)</p>
      </div>

      <div className="card overflow-hidden">
        {items && items.length > 0 ? (
          <>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-ink-5 border-b border-ink-10">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Page</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">URL</th>
                    <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Meta title</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-b border-ink-10 hover:bg-ink-5">
                      <td className="px-6 py-4">
                        <Link href={`/acs-1000-admin/pages/${p.id}`} className="font-semibold text-black hover:text-lime-dark">{p.title}</Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-70">/{p.slug}</td>
                      <td className="px-6 py-4 text-sm text-ink-70 truncate max-w-md">{p.meta_title || '—'}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/acs-1000-admin/pages/${p.id}`} className="text-sm font-semibold text-black hover:text-lime-dark">Edit →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile card list */}
            <ul className="sm:hidden divide-y divide-ink-10">
              {items.map((p) => (
                <li key={p.id}>
                  <Link href={`/acs-1000-admin/pages/${p.id}`} className="flex items-center justify-between p-4 hover:bg-ink-5 transition-colors gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black text-sm">{p.title}</div>
                      <div className="text-xs text-ink-50 mt-0.5">/{p.slug}</div>
                      {p.meta_title && <div className="text-xs text-ink-50 mt-1 truncate">{p.meta_title}</div>}
                    </div>
                    <span className="text-xs font-semibold text-black shrink-0">Edit →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <p className="text-ink-60 text-sm">No pages in database. Initialize via the database seed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
