import { CheckCircle, ChevronRight, GraduationCap, FileText, Calendar, DollarSign } from 'lucide-react';

const STEPS = [
  { n: '01', title: 'Check Eligibility', desc: '10+2 with PCM, min 45% aggregate. Valid KCET/COMEDK/JEE score.', icon: <CheckCircle size={16} /> },
  { n: '02', title: 'Fill Application', desc: 'Complete online application form with academic details and documents.', icon: <FileText size={16} /> },
  { n: '03', title: 'Counseling', desc: 'Attend allotment counseling (KCET/COMEDK). Direct admission also available.', icon: <Calendar size={16} /> },
  { n: '04', title: 'Fee Payment', desc: 'Pay tuition and other fees online. Apply for scholarships if eligible.', icon: <DollarSign size={16} /> },
  { n: '05', title: 'Join NHCE!', desc: 'Report with documents, complete verification, and begin your journey.', icon: <GraduationCap size={16} /> },
];

export default function Admissions() {
  return (
    <section id="admissions" className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50/50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge bg-blue-100 text-blue-700 mb-3">🎓 Admissions 2025–26</span>
          <h2 className="heading-md text-navy-950 mb-4">
            Your Journey{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">
              Starts Here
            </span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Applications are now open for the 2025–26 academic year. Secure your seat today.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Steps */}
          <div className="lg:col-span-2">
            <h3 className="font-display font-bold text-navy-900 text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" /> Admission Process
            </h3>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-200 to-navy-200 hidden md:block" />
              <div className="space-y-5">
                {STEPS.map((step, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-blue-200 group-hover:border-navy-600 flex items-center justify-center text-navy-700 font-black text-sm transition-colors duration-300 shadow-sm z-10">
                      {step.n}
                    </div>
                    <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group-hover:border-navy-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-navy-700">{step.icon}</span>
                        <h4 className="font-semibold text-navy-900 text-sm">{step.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick info card */}
          <div className="space-y-4">
            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-3xl p-6">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-display font-bold text-lg mb-2">Apply Online</h3>
              <p className="text-white/60 text-xs mb-4">Applications for 2025–26 batch are now open. Limited seats available.</p>
              <button className="btn-gold w-full justify-center">
                Start Application <ChevronRight size={15} />
              </button>
              <button className="mt-2 w-full border border-white/20 text-white/70 hover:text-white text-xs font-medium py-2.5 rounded-full transition-colors">
                Download Prospectus
              </button>
            </div>

            {/* Fee card */}
            <div className="card p-5">
              <h4 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
                <DollarSign size={14} className="text-gold-500" /> Fee Structure 2025
              </h4>
              <div className="space-y-2">
                {[
                  { prog: 'B.E. (all branches)', fee: '₹95,000–1,10,000', per: 'per year' },
                  { prog: 'M.Tech', fee: '₹65,000–75,000', per: 'per year' },
                  { prog: 'MBA', fee: '₹1,20,000', per: 'per year' },
                  { prog: 'MCA', fee: '₹60,000', per: 'per year' },
                ].map(f => (
                  <div key={f.prog} className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
                    <span className="text-xs font-medium text-slate-600">{f.prog}</span>
                    <div className="text-right">
                      <div className="text-xs font-bold text-navy-900">{f.fee}</div>
                      <div className="text-xs text-slate-400">{f.per}</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">* Scholarships available for merit & SC/ST/OBC students</p>
            </div>

            {/* Contact card */}
            <div className="card p-5 bg-blue-50 border-blue-100">
              <h4 className="font-bold text-navy-900 text-sm mb-2">Need Help?</h4>
              <p className="text-xs text-slate-600 mb-3">Our admission counselors are available Mon–Sat, 9 AM – 5 PM.</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <span>📞</span> +91 80 2321 6776
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <span>📧</span> admissions@nhce.edu.in
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
