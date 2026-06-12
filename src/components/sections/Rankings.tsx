import MobileSlider from '../ui/MobileSlider';
import AnimateIn from '../ui/AnimateIn';

export default function Rankings() {
  return (
    <section id="rankings" className="section-padding bg-gradient-to-br from-gold-50 to-amber-50/50">
      <div className="container-wide">
        {/* <div className="text-center mb-12">
          <span className="badge bg-gold-100 text-gold-700 mb-3">🏆 Rankings & Achievements</span>
          <h2 className="heading-md text-navy-950 mb-3">
            Recognized by{' '}
            <span className="text-gradient bg-gradient-to-r from-gold-600 to-amber-500">
              the Best
            </span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Our consistent performance across all metrics has placed NHCE among India's finest
            engineering institutions.
          </p>
        </div> */}

        {/* Accreditation logos */}
        <AnimateIn variant="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* VTU */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <img src="/acc/vtu.webp" alt="VTU" className="h-16 w-auto object-contain" />
            <p className="text-slate-700 text-sm font-medium leading-snug">Autonomous College<br />Permanently Affiliated to VTU</p>
          </div>

          {/* AICTE + UGC together */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <img src="/acc/aicte.png" alt="AICTE" className="h-16 w-auto object-contain" />
              <img src="/acc/ugc.png" alt="UGC" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-slate-700 text-sm font-medium leading-snug">Approved by AICTE & UGC</p>
          </div>

          {/* NBA */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <img src="/acc/nba.png" alt="NBA" className="h-16 w-auto object-contain" />
            <p className="text-slate-700 text-sm font-medium leading-snug">Accredited by NBA</p>
          </div>

          {/* NAAC */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-4 shadow-sm">
            <img src="/acc/naac.png" alt="NAAC" className="h-16 w-auto object-contain" />
            <p className="text-slate-700 text-sm font-medium leading-snug">Accredited by NAAC with 'A' Grade</p>
          </div>
        </div>
        </AnimateIn>

        {/* Awards strip */}
        <AnimateIn variant="fade-up" delay={120}>
        <div className="hidden md:block bg-white rounded-3xl p-6 shadow-card mt-4">
          <h3 className="font-display font-bold text-navy-900 text-lg mb-5 text-center">Awards & Recognition</h3>
          <MobileSlider desktopClass="grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { award: 'Best Engineering College — South India', by: 'Education World 2024', year: '2024' },
              { award: 'Excellence in Technical Education Award', by: 'Karnataka Govt.', year: '2023' },
              { award: 'Top Placement Record — Bangalore', by: 'Silicon India Magazine', year: '2024' },
              { award: 'Best Infrastructure Award', by: 'Times Engineering Survey', year: '2023' },
              { award: 'Innovation & Research Excellence', by: 'AICTE National Awards', year: '2022' },
              { award: 'Outstanding Green Campus', by: 'CII – Environmental Award', year: '2023' },
            ].map((a) => (
              <div key={a.award} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gold-50 transition-colors">
                <span className="text-gold-500 mt-0.5 flex-shrink-0">🏅</span>
                <div>
                  <div className="text-sm font-semibold text-navy-900">{a.award}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{a.by} · {a.year}</div>
                </div>
              </div>
            ))}
          </MobileSlider>
        </div>
        </AnimateIn>
      </div>
    </section>
  );
}
