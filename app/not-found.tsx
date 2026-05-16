import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-black text-white">
          <div className="container-x py-20 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-9xl font-bold text-lime mb-6">404</div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Page not found.
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-10">
                The page you are looking for does not exist or has been moved.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/" className="btn-on-dark">Back to home →</Link>
                <Link href="/contact" className="btn-on-dark">Contact Us →</Link>
               
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white section-padding">
          <div className="container-x">
            <div className="max-w-3xl mx-auto">
              <div className="eyebrow mb-3">Popular destinations</div>
              <h2 className="text-2xl font-bold text-black mb-8">Where you might be heading.</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'Services', href: '/services' },
                  { label: 'CRM implementation', href: '/crm' },
                  { label: 'Case studies', href: '/case-studies' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'About', href: '/about' },
                  { label: 'FAQ', href: '/faq' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="card p-5 hover:border-black transition-colors group">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-black">{link.label}</span>
                      <span className="text-black group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </Link>
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
