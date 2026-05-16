'use client';
import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { label: 'Dashboard', href: '/admin', exact: true },
  { label: 'Blog posts', href: '/admin/blog' },
  { label: 'Case studies', href: '/admin/case-studies' },
  { label: 'Services', href: '/admin/services' },
  { label: 'Pages', href: '/admin/pages' },
  { label: 'Media library', href: '/admin/media' },
  { label: 'Categories', href: '/admin/categories' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-black text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="px-6 pt-6 pb-0 border-b border-white/10">
         
          <Link href="/" className="inline-flex items-center mb-5">
  <span className="text-white font-extrabold text-2x1 sm:text-2x1 leading-tight">
    Automation{" "}
    <span className="text-lime">Consulting Services</span>
  </span>
</Link>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href, item.exact)
                    ? 'bg-lime text-black'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="block px-4 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
          >
            View live site →
          </Link>
        </div>
      </nav>

      <div className="px-4 py-5 border-t border-white/10">
        {userEmail && (
          <div className="px-4 py-2 mb-2 text-xs text-white/50 truncate">
            {userEmail}
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
