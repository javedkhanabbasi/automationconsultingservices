import Link from 'next/link';
import Particles from './Particles';

export default function FinalCTA() {
  return (
    <section className="bg-black text-white relative overflow-hidden">
      <Particles />
      <div className="container-x py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow-light mb-4">Ready to start</div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Book a discovery call.
          </h2>
          <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            Paid discovery from $500K. Output is a written audit, ranked bottleneck list, and recommended scope. If we are not the right fit, we say so on the call.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="btn-on-dark">
              Book a discovery call →
            </Link>



             <Link href="/pricing" className="btn-on-dark">
              See pricing →
            </Link>



           
          </div>
        </div>
      </div>
    </section>
  );
}
