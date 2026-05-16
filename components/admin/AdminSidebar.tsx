'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const NAV = [
  { label: 'Dashboard', href: '/admin', exact: true, icon: '⊟' },
  { label: 'Blog posts', href: '/admin/blog', icon: '✎' },
  { label: 'Case studies', href: '/admin/case-studies', icon: '★' },
  { label: 'Services', href: '/admin/services', icon: '◈' },
  { label: 'Pages', href: '/admin/pages', icon: '◻' },
  { label: 'Media library', href: '/admin/media', icon: '📁' },
  { label: 'Categories', href: '/admin/categories', icon: '⊞' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙' },
];

export default function AdminSidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  const SidebarContent = () => (
    <aside className="w-64 bg-black text-white h-full flex flex-col">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-white/10">
        <Link href="/" className="inline-flex items-start gap-2" onClick={() => setOpen(false)}>
          <span className="text-white font-extrabold text-lg leading-tight">
            Automation{' '}
            <span className="text-lime">Consulting<br />Services</span>
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-lime text-black'
                      : 'text-white/65 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="text-base w-5 text-center leading-none">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-5 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/65 hover:bg-white/8 hover:text-white transition-all duration-150"
          >
            <span className="text-base w-5 text-center">↗</span>
            View live site
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/10">
        {userEmail && (
          <div className="px-3 py-2 mb-1 text-xs text-white/40 truncate">
            {userEmail}
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/65 hover:bg-white/8 hover:text-white transition-all duration-150 text-left"
        >
          <span className="text-base w-5 text-center">⏻</span>
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* ── DESKTOP: fixed sidebar ── */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">
        <SidebarContent />
      </div>

      {/* ── MOBILE: hamburger button ── */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center shadow-lg"
        aria-label="Open menu"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect width="18" height="2" rx="1" fill="white"/>
          <rect y="6" width="12" height="2" rx="1" fill="white"/>
          <rect y="12" width="18" height="2" rx="1" fill="white"/>
        </svg>
      </button>

      {/* ── MOBILE: overlay + drawer ── */}
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button inside drawer */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-md bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          aria-label="Close menu"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 1L11 11M11 1L1 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>
        <SidebarContent />
      </div>
    </>
  );
}