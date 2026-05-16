import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import ToolFinderClient from './ToolFinderClient';

export const metadata: Metadata = buildMetadata({
  title: 'Automation Platform Finder | Zapier vs Make vs n8n',
  description: 'Free four-question diagnostic returning a ranked recommendation across Zapier, Make, n8n, and native CRM automation.',
  path: '/tools/automation-tool-finder',
});

export default function ToolFinderPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://automationconsultingservices.org/' },
          { name: 'Tools', url: 'https://automationconsultingservices.org/tools' },
          { name: 'Automation Platform Finder', url: 'https://automationconsultingservices.org/tools/automation-tool-finder' },
        ])}
      />
      <Header />

      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-24">
            <nav className="text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-lime">Home</Link>
              <span className="mx-2">→</span>
              <Link href="/tools" className="hover:text-lime">Tools</Link>
              <span className="mx-2">→</span>
              <span className="text-white">Automation Platform Finder</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-4xl">
              Which automation platform fits?
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              Four questions. Ranked recommendation across Zapier, Make, n8n, and native CRM automation.
            </p>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-x max-w-4xl">
            <ToolFinderClient />
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
