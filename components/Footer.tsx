import Link from 'next/link';

const FOOTER = {
  services: [
    { label: 'Sales automation', href: '/services/sales-automation' },
    { label: 'Operations automation', href: '/services/operations-automation' },
    { label: 'Admin workflows', href: '/services/admin-workflows' },
    { label: 'Integration builds', href: '/services/integration-builds' },
  ],
  crm: [
    { label: 'Attio implementation', href: '/crm/attio' },
    { label: 'HubSpot implementation', href: '/crm/hubspot' },
    { label: 'Salesforce implementation', href: '/crm/salesforce' },
    { label: 'Pipedrive implementation', href: '/crm/pipedrive' },
    { label: 'Close implementation', href: '/crm/close' },
    { label: 'Compare platforms', href: '/crm/compare' },
  ],
  resources: [
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' },
    { label: 'Free tools', href: '/tools' },
    { label: 'FAQ', href: '/faq' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Partners', href: '/partners' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-x py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
          


          
          <Link href="/" className="inline-flex items-center mb-5">
  <span className="text-white font-extrabold text-1x1 sm:text-2x1 leading-tight">
    Automation{" "}
    <span className="text-lime">Consulting Services</span>
  </span>
</Link>



            <p className="text-sm text-white/70 leading-relaxed mb-4">
              Operations infrastructure built with engineering discipline for $10M-$50M operators.
            </p>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider font-bold">
              <span className="px-2 py-1 bg-lime text-black rounded">Zapier Certified</span>
              <span className="px-2 py-1 bg-lime text-black rounded">Attio Expert</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-lime mb-4">
              Services
            </div>
            <ul className="space-y-2.5">
              {FOOTER.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-lime mb-4">
              CRM
            </div>
            <ul className="space-y-2.5">
              {FOOTER.crm.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-lime mb-4">
              Resources
            </div>
            <ul className="space-y-2.5">
              {FOOTER.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-lime mb-4">
              Company
            </div>
            <ul className="space-y-2.5">
              {FOOTER.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-3 text-xs text-white/50">
          <div>© 2026 Automation Consulting Services. All rights reserved.</div>
             <div>
      <Link href="https://www.digitalvikingz.com">
        Powered by Digital Vikingz
      </Link>
    </div>
        </div>
      </div>
    </footer>
  );
}
