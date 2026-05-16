"use client";

import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
import { siteConfig } from '@/lib/site-config';

const services = [
  { label: 'Sales Automation', href: '/services/sales-automation', desc: 'Automate your sales pipeline' },
  { label: 'Operations Automation', href: '/services/operations-automation', desc: 'Streamline operations workflows' },
  { label: 'Admin Workflows', href: '/services/admin-workflows', desc: 'Automate repetitive admin tasks' },
  { label: 'Integration Builds', href: '/services/integration-builds', desc: 'Connect your tools together' },
];

const crms = [
  { label: 'Attio', href: '/crm/attio', desc: 'Modern GTM-native CRM', badge: 'Expert Partner' },
  { label: 'HubSpot', href: '/crm/hubspot', desc: 'All-in-one growth platform' },
  { label: 'Salesforce', href: '/crm/salesforce', desc: 'Enterprise standard CRM' },
  { label: 'Pipedrive', href: '/crm/pipedrive', desc: 'Pipeline-first CRM' },
  { label: 'Close', href: '/crm/close', desc: 'Call-centric outbound CRM' },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-dropdown{opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity 0.18s ease,transform 0.18s ease;}
        .nav-trigger:hover .nav-dropdown,.nav-trigger:focus-within .nav-dropdown{opacity:1;transform:translateY(0);pointer-events:auto;}
        .nav-dropdown::before{content:'';position:absolute;top:-12px;left:0;right:0;height:12px;}
      `}</style>

      <header className="bg-white border-b border-ink-10 sticky top-0 z-40">
        <div className="container-x flex items-center justify-between py-4">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Automation Consulting Services" width={220} height={90}
              className="h-auto w-[50px] sm:w-[80px] md:w-[90px]" priority />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {siteConfig.nav.map((item) => {

              /* SERVICES */
              if (item.label === 'Services') return (
                <div key={item.href} className="nav-trigger relative">
                  <Link href={item.href} className="flex items-center gap-1 text-ink-70 hover:text-black font-medium transition-colors">
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 opacity-50">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white border border-ink-10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-ink-10 rotate-45" />
                    <div className="p-2">
                      {services.map((s) => (
                        <Link key={s.href} href={s.href} className="group flex items-start gap-3 px-4 py-3 rounded-lg hover:bg-ink-5 transition-colors">
                          <div className="w-7 h-7 bg-lime rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-black leading-tight">{s.label}</div>
                            <div className="text-xs text-ink-50 mt-0.5 leading-snug">{s.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-ink-10 px-4 py-3">
                      <Link href="/services" className="flex items-center justify-between text-xs font-semibold text-black hover:text-lime-dark transition-colors">
                        View all services <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );

              /* CRM */
              if (item.label === 'CRM') return (
                <div key={item.href} className="nav-trigger relative">
                  <Link href={item.href} className="flex items-center gap-1 text-ink-70 hover:text-black font-medium transition-colors">
                    {item.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 opacity-50">
                      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                  <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white border border-ink-10 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-ink-10 rotate-45" />
                    <div className="p-2">
                      {crms.map((c) => (
                        <Link key={c.href} href={c.href} className="group flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-ink-5 transition-colors">
                          <div className="w-7 h-7 bg-black rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                            {c.label[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-black leading-tight">{c.label}</span>
                              {c.badge && <span className="text-[9px] font-bold uppercase tracking-wider bg-lime text-black px-1.5 py-0.5 rounded">{c.badge}</span>}
                            </div>
                            <div className="text-xs text-ink-50 mt-0.5 leading-snug">{c.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-ink-10 px-4 py-3">
                      <Link href="/crm" className="flex items-center justify-between text-xs font-semibold text-black hover:text-lime-dark transition-colors">
                        Compare all CRMs <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );

              /* DEFAULT */
              return (
                <Link key={item.href} href={item.href} className="text-ink-70 hover:text-black font-medium transition-colors">
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Book a call */}
          <div className="flex items-center gap-3">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold border border-[#9CCC65] bg-[#9CCC65] text-black rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7CB342] hover:border-[#7CB342] hover:shadow-md">
              Book a call
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}