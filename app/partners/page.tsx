import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinalCTA from '@/components/FinalCTA';

export const metadata: Metadata = buildMetadata({
  title: 'Partners | Verified Zapier Certified and Attio Expert',
  description: 'Verified Zapier Certified Solutions Partner and Attio Expert Partner. Practitioner-level fluency on HubSpot, Salesforce, Pipedrive, Close, n8n, Make, and more.',
  path: '/partners',
});

const verified = [
  {
    name: 'Zapier',
    status: 'Certified Solutions Partner',
    badge: 'Verified',
    body: 'Zapier is the most widely deployed workflow platform in the world. The Certified Solutions Partner designation is held by a small number of practitioners who have demonstrated production-grade implementation capability.',
    capabilities: ['Workflow design and architecture', 'Multi-step Zap implementation', 'Custom code by Zapier integrations', 'Webhook orchestration', 'Error handling and retry logic', 'Filter and path optimization'],
  },
  {
    name: 'Attio',
    status: 'Expert Partner',
    badge: 'Verified',
    body: 'Attio is the modern CRM platform with a flexible data model. Expert Partner status is reserved for implementation practitioners who have shipped production deployments and understand the platform at the data-model level.',
    capabilities: ['Custom object modeling', 'Data model architecture', 'Migration from legacy CRMs', 'Workflow automation in Attio', 'Native integration setup', 'Reporting and view design'],
  },
];

const practitioners = [
  { name: 'HubSpot', body: 'Implementation, migration, marketing automation, sales hub configuration, and HubSpot-to-other-platform migrations.' },
  { name: 'Salesforce', body: 'Implementation for mid-market operators, Flow Builder automation, custom object configuration, integration architecture.' },
  { name: 'Pipedrive', body: 'Pipeline design, deal-stage automation, sales process configuration, and migration from spreadsheet-based CRMs.' },
  { name: 'Close', body: 'Outbound sales configuration, call-centric workflows, sequencing setup, and migration from HubSpot or Salesforce.' },
  { name: 'Make', body: 'Branching workflow design, complex multi-step automation, error-handling scenarios, and Make-vs-Zapier architecture decisions.' },
  { name: 'n8n', body: 'Self-hosted automation for high-volume or governance-sensitive workloads. Custom node development and scaling architecture.' },
];

const philosophy = [
  { title: 'Partnership status is a signal, not a sales mechanism', body: 'We hold verified partnerships because they require us to maintain implementation capability. They are not channels for kickbacks or paid recommendations.' },
  { title: 'Practitioner depth over breadth claims', body: 'A real practitioner has shipped twenty implementations on a platform. A logo-collector has clicked through the certification quiz once. The distinction matters.' },
  { title: 'No platform lock-in via partner agreement', body: 'We will recommend platforms outside our partnership network when they fit better. Holding a partnership does not bias the recommendation.' },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
         { name: 'Home', url: 'https://www.automationconsultingservices.org/' },
          { name: 'Partners', url: 'https://www.automationconsultingservices.org/partners' },
        ])}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-lime/40 bg-lime/10">
                <span className="text-lime">★</span>
                <span className="text-xs font-semibold text-lime uppercase tracking-wider">
                  Two verified partnerships. Six practitioner-level platforms.
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.02] mb-7">
                Verified partners.<br />
                <span className="text-lime">Not logo collectors.</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl">
                Partnership status is a signal that we have implemented the platform at production scale. Below are the two we are verified on and the six we have shipped on as practitioners.
              </p>
            </div>
          </div>
        </section>

        {/* VERIFIED PARTNERS */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Verified partnerships</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Two badges issued, not bought.
              </h2>
            </div>
            <div className="space-y-6">
              {verified.map((p) => (
                <div key={p.name} className="card p-8 border-2 border-black">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <div className="text-4xl font-bold text-black mb-2">{p.name}</div>
                      <div className="inline-block bg-lime text-black px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider mb-4">
                        ★ {p.status}
                      </div>
                      <p className="text-ink-70 text-sm leading-relaxed">{p.body}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <div className="text-xs font-bold text-black uppercase tracking-wider mb-4">What we ship on {p.name}</div>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {p.capabilities.map((c) => (
                          <li key={c} className="flex items-start gap-2 text-sm text-black">
                            <span className="w-5 h-5 bg-lime rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-black text-[10px] font-bold">✓</span>
                            </span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRACTITIONER PLATFORMS */}
        <section className="bg-lime section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Practitioner-level platforms</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Six more platforms we have shipped on.
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {practitioners.map((p) => (
                <div key={p.name} className="bg-white rounded-xl p-7">
                  <h3 className="text-xl font-bold text-black mb-3">{p.name}</h3>
                  <p className="text-sm text-ink-70 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIP PHILOSOPHY */}
        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mb-12">
              <div className="eyebrow mb-3">Partnership philosophy</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
                Three rules we hold about partnerships.
              </h2>
            </div>
            <div className="space-y-5">
              {philosophy.map((item, i) => (
                <div key={i} className="card p-7">
                  <div className="flex items-start gap-5">
                    <span className="w-10 h-10 bg-black text-white rounded-md flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                      <p className="text-ink-70 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
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
