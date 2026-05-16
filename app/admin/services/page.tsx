export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function ServicesListPage() {
  const supabase = createClient();
  const { data: items } = await supabase.from('services').select('*').order('display_order');

  return (
    <div className="p-8 lg:p-12 max-w-7xl">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">Services</h1>
          <p className="text-ink-60 text-sm">Service pages on the site. {items?.length || 0} total.</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        {items && items.length > 0 ? (
          <table className="w-full">
            <thead className="bg-ink-5 border-b border-ink-10">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Service</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Slug</th>
                <th className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider text-black">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s.id} className="border-b border-ink-10 hover:bg-ink-5">
                  <td className="px-6 py-4">
                    <Link href={`/admin/services/${s.id}`} className="font-semibold text-black hover:text-lime-dark">{s.name}</Link>
                    <div className="text-xs text-ink-50 mt-0.5">{s.short_desc}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-ink-70">/services/{s.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${s.status === 'published' ? 'bg-lime text-black' : 'bg-ink-10 text-black'}`}>{s.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/services/${s.id}`} className="text-sm font-semibold text-black hover:text-lime-dark">Edit →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <p className="text-ink-60 text-sm">No services in the database yet. Run the seed script to populate them, or add through the database directly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
