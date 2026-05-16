import ContactForm from './ContactForm';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | Book a Discovery Call',
  description: 'Book a discovery call with Matthew Piwko. Paid audit from $500. Output is a written diagnostic, ranked bottleneck list, and recommended scope.',
  path: '/contact',
});

const howItWorks = [
  { n: '01', title: 'Submit a request', desc: 'Use the form on the right or email directly. We respond within one business day.' },
  { n: '02', title: 'Short qualification call', desc: '20 minutes. Free. We confirm fit, surface obvious bottlenecks, and discuss whether a paid discovery audit makes sense.' },
  { n: '03', title: 'Paid discovery audit', desc: '1-2 weeks. From $500. Output is a written operational audit, ranked bottleneck list, recommended architecture, and fixed-fee build scope.' },
  { n: '04', title: 'Build or walk away', desc: 'If the audit shows automation is the right answer, we scope a build. If not, you have the diagnostic and we refund the audit fee.' },
];

const prepare = [
  'Names of the tools currently in your stack (CRM, finance, communication, ops)',
  'A rough sense of where hours are getting eaten weekly',
  'Headcount and revenue range (helps us size the engagement)',
  'Any prior automation work and what worked or did not',
];

const wontFit = [
  'Operators under $1M revenue (the engagement math does not work yet)',
  'Operators looking for one-off Zaps (we engineer systems, not point fixes)',
  'Teams that cannot commit anyone to a 90-minute discovery call',
  'Engagements that require 12-month contract lock-ins on our side',
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: 'https://automationconsultingservices.org/' },
          { name: 'Contact', url: 'https://automationconsultingservices.org/contact' },
        ])}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  One business day response time
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Book a discovery call.<br />
                <span className="text-lime">We respond in one business day.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
                Paid discovery from $500. Output is a written audit, ranked bottleneck list, and recommended scope. If automation is not the right fix, we refund the audit and tell you what is.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS + FORM */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="eyebrow mb-3">How it works</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-8">
                  Four steps from request to scoped engagement.
                </h2>
                <div className="space-y-6">
                  {howItWorks.map((step) => (
                    <div key={step.n} className="flex items-start gap-5">
                      <span className="w-12 h-12 bg-lime rounded-md flex items-center justify-center font-bold text-black text-lg flex-shrink-0">
                        {step.n}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                        <p className="text-ink-70 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

             
                  <div>
  <ContactForm />
</div>





            </div>
          </div>
        </section>

        {/* PREPARE */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="eyebrow mb-3">What to prepare</div>
                <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                  Four pieces of info that shorten the call.
                </h2>
                <p className="text-ink-80 leading-relaxed">
                  Bringing these to the qualification call lets us move faster from context to recommendation. None are required, all are helpful.
                </p>
              </div>
              <div className="bg-white rounded-xl p-7">
                <ul className="space-y-4">
                  {prepare.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black">
                      <span className="w-7 h-7 bg-black text-white rounded flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NOT A FIT */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl">
              <div className="eyebrow mb-3">Who we are not a fit for</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight mb-5">
                Four cases where we will say no on the first call.
              </h2>
              <p className="text-ink-70 leading-relaxed mb-8">
                We would rather save both sides time than try to make a bad fit work. If you see your situation in the list below, that is not a problem — it is just a sign we are not the right firm right now.
              </p>
              <div className="space-y-3">
                {wontFit.map((item, i) => (
                  <div key={i} className="card p-5 flex items-start gap-4">
                    <span className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center font-bold flex-shrink-0">✕</span>
                    <p className="text-base text-black leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
