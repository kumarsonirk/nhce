import { ArrowRight } from 'lucide-react';
import AnimateIn from '../ui/AnimateIn';

export default function CallToAction() {
  return (
    <div className="bg-white py-16 md:py-20">
      <div className="container-wide">
        <AnimateIn variant="scale">
          <div className="relative overflow-hidden bg-navy-950 rounded-3xl p-10 sm:p-16 text-center">
            {/* Decorative blobs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-14 w-60 h-60 bg-blue-500/10 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <span className="badge bg-white/10 text-gold-400 mb-5">🎓 25 Years of Excellence</span>
              <h2 className="heading-md text-white mb-4">
                Ready to Begin Your{' '}
                <span className="text-gradient bg-gradient-to-r from-gold-400 to-amber-300">Engineering Journey?</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
                Join 15,000+ students who chose NHCE for academic excellence, industry-ready programmes and a campus built for growth.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://newhorizoncollegeofengineering.in/admissions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  Apply Now 2026–27 <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
