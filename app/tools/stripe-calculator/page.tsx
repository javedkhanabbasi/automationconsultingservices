import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';
import StripeCalculatorClient from './StripeCalculatorClient';

export const metadata: Metadata = buildMetadata({
  title: 'Stripe Fee Calculator | Forward and Gross-Up | Free Tool',
  description: 'Free Stripe fee calculator with forward and gross-up modes. Supports US/Canada, international, and ACH variants. No signup required.',
  path: '/tools/stripe-calculator',
});

const notes = [
  { title: 'Forward calculation', body: 'Enter the invoice amount you plan to charge. The calculator returns the Stripe fee and the net amount you actually receive.' },
  { title: 'Gross-up calculation', body: 'Enter the target net amount you want to receive. The calculator returns the invoice amount you need to charge so the net lands at your target.' },
  { title: 'ACH cap behavior', body: 'ACH is 0.8% capped at $5. For invoices over $625, the cap kicks in and the effective rate drops below 0.8%. The calculator handles this automatically.' },
  { title: 'International cards', body: '3.9% + $0.30 is the published international rate. Some operators see additional currency conversion fees that this calculator does not capture.' },
];

export default function StripeCalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
          { name: 'Tools', url: 'https://www.automationconsultingservices.org/tools' },
          { name: 'Stripe Calculator', url: 'https://www.automationconsultingservices.org/tools/stripe-calculator' },
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
              <span className="text-white">Stripe Calculator</span>
            </nav>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6 max-w-4xl">
              Stripe fee calculator.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-3xl">
              Forward and gross-up modes. Three variants. No signup, no email gate.
            </p>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-x max-w-4xl">
            <StripeCalculatorClient />
          </div>
        </section>

        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-10">
              <div className="eyebrow mb-3">How to use it</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Four notes on the calculation.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {notes.map((n) => (
                <div key={n.title} className="bg-white rounded-xl p-6">
                  <h3 className="text-base font-bold text-black mb-2">{n.title}</h3>
                  <p className="text-sm text-ink-70 leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
