import { useState } from 'react';
import {
  CheckCircle, ChevronRight, GraduationCap, Phone, Mail,
  MapPin, FileText, Users, BookOpen, Award, Clock
} from 'lucide-react';

/* ─── Data ─────────────────────────────────────────────────── */

const UG_PROGRAMS = [
  { name: 'Computer Science & Engineering',           seats: 240, code: 'CSE'  },
  { name: 'Artificial Intelligence & Machine Learning', seats: 120, code: 'AIML' },
  { name: 'Electronics & Communication Engg.',        seats: 120, code: 'ECE'  },
  { name: 'Electrical & Electronics Engineering',     seats: 60,  code: 'EEE'  },
  { name: 'Mechanical Engineering',                   seats: 120, code: 'MECH' },
  { name: 'Civil Engineering',                        seats: 60,  code: 'CIVIL'},
  { name: 'Applied Sciences & Engineering',           seats: 60,  code: 'ASE'  },
];

const PG_PROGRAMS = [
  { name: 'M.Tech – Computer Science & Engineering', eligibility: 'B.E./B.Tech + GATE', duration: '2 Years' },
  { name: 'MBA',                                      eligibility: 'Any Degree + PGCET/MAT/KMAT', duration: '2 Years' },
  { name: 'MCA',                                      eligibility: 'Any Degree + KMAT/MAT/PGCET', duration: '2 Years' },
];

const PHD_STREAMS = [
  'Computer Science & Engineering', 'Electrical & Electronics Engg.',
  'Mechanical Engineering', 'Computer Applications',
  'Management Studies', 'Chemistry', 'Mathematics',
];

const PROCESS_STEPS = [
  { n: '01', icon: FileText,      title: 'Check Eligibility',   desc: '10+2 with PCM, minimum 45% aggregate. Valid KCET / COMEDK / JEE score.' },
  { n: '02', icon: BookOpen,      title: 'Fill Application',    desc: 'Complete the online application form with academic details and documents.' },
  { n: '03', icon: Users,         title: 'Attend Counseling',   desc: 'Participate in KCET/COMEDK allotment counseling or opt for management quota direct admission.' },
  { n: '04', icon: CheckCircle,   title: 'Document Verification', desc: 'Submit originals: 10th & 12th marksheets, ID proof, transfer certificate, photos.' },
  { n: '05', icon: GraduationCap, title: 'Join NHCE!',          desc: 'Pay fees, complete formalities, and begin your engineering journey at NHCE.' },
];

const FEES = [
  { prog: 'B.E. / B.Tech (all branches)', fee: '₹95,000 – ₹1,10,000', per: 'per year' },
  { prog: 'M.Tech',                        fee: '₹65,000 – ₹75,000',   per: 'per year' },
  { prog: 'MBA',                           fee: '₹1,20,000',           per: 'per year' },
  { prog: 'MCA',                           fee: '₹60,000',             per: 'per year' },
];

const DATES = [
  { label: 'KCET Application Opens',      date: 'Jan 2025',  done: true  },
  { label: 'KCET Examination',            date: 'Apr 2025',  done: true  },
  { label: 'KCET Counseling (Round 1)',   date: 'Jun 2025',  done: false },
  { label: 'Management Quota Closes',     date: 'Jul 2025',  done: false },
  { label: 'Classes Commence',            date: 'Aug 2025',  done: false },
];

const HELPLINES = [
  { region: 'Karnataka & Tamil Nadu', phone: '+91-98805 34935' },
  { region: 'Kerala',                 phone: '+91-99451 33772' },
  { region: 'North India',            phone: '+91-97400 76446' },
  { region: 'Andhra & Telangana',     phone: '+91-97400 76447' },
  { region: 'East India',             phone: '+91-97400 76936' },
  { region: 'General Enquiry',        phone: '+91-80-6629 7777' },
];

/* ─── Sub-components ────────────────────────────────────────── */

type Tab = 'ug' | 'pg' | 'phd';

function ProgramTabs() {
  const [tab, setTab] = useState<Tab>('ug');

  return (
    <div>
      {/* Tab pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['ug', 'pg', 'phd'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              tab === t
                ? 'bg-navy-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t === 'ug' ? 'Under Graduate' : t === 'pg' ? 'Post Graduate' : 'PhD / Research'}
          </button>
        ))}
      </div>

      {/* UG */}
      {tab === 'ug' && (
        <div>
          <p className="text-xs text-slate-500 mb-4">Eligibility: 10+2 with PCM — minimum 50% aggregate in each subject</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {UG_PROGRAMS.map(p => (
              <div key={p.code} className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md hover:border-navy-100 transition-all">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 text-xs font-black flex items-center justify-center flex-shrink-0">{p.code}</span>
                  <span className="text-sm font-medium text-slate-700 leading-snug">{p.name}</span>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <div className="text-xs font-bold text-navy-800">{p.seats}</div>
                  <div className="text-xs text-slate-400">seats</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PG */}
      {tab === 'pg' && (
        <div className="space-y-3">
          {PG_PROGRAMS.map(p => (
            <div key={p.name} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-navy-100 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-navy-900 text-sm mb-1">{p.name}</h4>
                  <p className="text-xs text-slate-500">Eligibility: {p.eligibility}</p>
                </div>
                <span className="flex-shrink-0 flex items-center gap-1 text-xs text-gold-700 bg-gold-50 border border-gold-100 rounded-full px-2.5 py-1">
                  <Clock size={11} /> {p.duration}
                </span>
              </div>
            </div>
          ))}
          <p className="text-xs text-slate-400 pt-1">Applications via VTU notifications — twice yearly (June & February)</p>
        </div>
      )}

      {/* PhD */}
      {tab === 'phd' && (
        <div>
          <p className="text-xs text-slate-500 mb-4">Full-time and part-time Ph.D & M.Sc (Engineering) by Research available</p>
          <div className="flex flex-wrap gap-2">
            {PHD_STREAMS.map(s => (
              <span key={s} className="bg-white border border-slate-100 text-slate-700 rounded-full px-4 py-2 text-sm font-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">Admissions conducted as per VTU / UGC guidelines. Contact the Research Cell for details.</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

export default function Admissions() {
  return (
    <section id="admissions" className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/40">

      {/* ── Hero intro ── */}
      <div className="section-padding pb-0">
        <div className="container-wide text-center">
          <span className="badge bg-blue-100 text-blue-700 mb-3">🎓 Admissions 2025–26</span>
          <h2 className="heading-md text-navy-950 mb-4">
            Your Engineering Journey{' '}
            <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">Starts Here</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto mb-8">
            NAAC A+ accredited, AICTE & UGC approved, VTU affiliated — NHCE offers world-class engineering education
            with 100% placement assistance and 120+ recruiting companies.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
            {[
              { icon: Award,      value: 'NAAC A+',  label: 'Accreditation' },
              { icon: Users,      value: '3000+',    label: 'Annual Placements' },
              { icon: BookOpen,   value: '20+',      label: 'Programs' },
              { icon: GraduationCap, value: '25+',  label: 'Years of Excellence' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm text-center">
                <Icon size={18} className="text-blue-600 mx-auto mb-1.5" />
                <div className="font-bold text-navy-900 text-lg leading-tight">{value}</div>
                <div className="text-slate-500 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Programs ── */}
      <div className="section-padding pt-6">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left: Programs + Process */}
            <div className="lg:col-span-2 space-y-10">

              {/* Programs */}
              <div>
                <h3 className="font-display font-bold text-navy-900 text-xl mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                  Programs Offered
                </h3>
                <ProgramTabs />
              </div>

              {/* Admission Process */}
              <div>
                <h3 className="font-display font-bold text-navy-900 text-xl mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-navy-500 rounded-full" />
                  Admission Process
                </h3>

                {/* Route pills */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-600 text-white rounded-2xl p-4">
                    <div className="font-bold text-sm mb-1">Route 1 — KCET / COMEDK</div>
                    <p className="text-white/75 text-xs">Through Karnataka Examination Authority. Open to Karnataka domicile students & all-India candidates.</p>
                  </div>
                  <div className="bg-navy-800 text-white rounded-2xl p-4">
                    <div className="font-bold text-sm mb-1">Route 2 — Management Quota</div>
                    <p className="text-white/75 text-xs">Direct admission through the college. Min 45% aggregate. Sports quota scholarships available.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-blue-200 to-navy-200 hidden sm:block" />
                  <div className="space-y-4">
                    {PROCESS_STEPS.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={i} className="flex gap-4 group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-blue-200 group-hover:border-navy-600 flex items-center justify-center text-navy-700 font-black text-xs transition-colors shadow-sm z-10">
                            {step.n}
                          </div>
                          <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm hover:shadow-md border border-slate-100 group-hover:border-navy-100 transition-all">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon size={14} className="text-blue-600" />
                              <h4 className="font-semibold text-navy-900 text-sm">{step.title}</h4>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Important Dates */}
              <div>
                <h3 className="font-display font-bold text-navy-900 text-xl mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-gold-500 rounded-full" />
                  Important Dates
                </h3>
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                  {DATES.map((d, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < DATES.length - 1 ? 'border-b border-slate-100' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${d.done ? 'bg-green-500' : 'bg-gold-400'}`} />
                        <span className="text-sm text-slate-700">{d.label}</span>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${d.done ? 'bg-green-50 text-green-700' : 'bg-gold-50 text-gold-700'}`}>
                        {d.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sidebar */}
            <div className="space-y-4">

              {/* Apply CTA */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-3xl p-6">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-display font-bold text-lg mb-1">Apply Online</h3>
                <p className="text-white/60 text-xs mb-5">Applications for 2025–26 are open. Limited seats — apply early.</p>
                <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full justify-center flex items-center gap-2">
                  Start Application <ChevronRight size={15} />
                </a>
                <button className="mt-2 w-full border border-white/20 text-white/70 hover:text-white text-xs font-medium py-2.5 rounded-full transition-colors">
                  Download Brochure
                </button>
              </div>

              {/* Fee structure */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
                  <span className="text-base">💰</span> Fee Structure 2025
                </h4>
                <div className="space-y-0">
                  {FEES.map((f, i) => (
                    <div key={i} className={`flex items-center justify-between py-2.5 ${i < FEES.length - 1 ? 'border-b border-slate-100' : ''}`}>
                      <span className="text-xs font-medium text-slate-600">{f.prog}</span>
                      <div className="text-right">
                        <div className="text-xs font-bold text-navy-900">{f.fee}</div>
                        <div className="text-xs text-slate-400">{f.per}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">* Scholarships available for merit & SC/ST/OBC students</p>
              </div>

              {/* General contact */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h4 className="font-bold text-navy-900 text-sm mb-3">Admissions Office</h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-blue-600 flex-shrink-0" />
                    <a href="tel:+919880534935" className="hover:text-navy-800 transition-colors">+91-98805 34935</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-blue-600 flex-shrink-0" />
                    <a href="mailto:admissionsnhce@newhorizonindia.edu" className="hover:text-navy-800 transition-colors break-all">admissionsnhce@newhorizonindia.edu</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Bellandur Main Road, Near Marathahalli, Bengaluru – 560103</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-3">Mon – Sat · 9:00 AM – 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Regional Helpline ── */}
      <div className="section-padding pt-6">
        <div className="container-wide">
          <h3 className="font-display font-bold text-navy-900 text-xl mb-5 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-green-500 rounded-full" />
            Regional Helpline Numbers
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {HELPLINES.map(h => (
              <a
                key={h.region}
                href={`tel:${h.phone.replace(/\s/g, '')}`}
                className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-navy-100 transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-2 group-hover:bg-green-100 transition-colors">
                  <Phone size={13} className="text-green-600" />
                </div>
                <div className="text-xs font-semibold text-navy-900 mb-1">{h.region}</div>
                <div className="text-xs text-slate-500 group-hover:text-navy-700 transition-colors">{h.phone}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="section-padding pt-4">
        <div className="container-wide">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900 rounded-3xl p-8 text-center text-white">
            <h3 className="font-display font-bold text-2xl mb-2">Ready to Join NHCE?</h3>
            <p className="text-white/60 text-sm mb-6 max-w-lg mx-auto">
              15,000+ students have built their careers here. Be the next success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://newhorizoncollegeofengineering.in/admissions/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                Apply for 2025–26 <ChevronRight size={15} />
              </a>
              <button className="border border-white/25 text-white/80 hover:text-white hover:border-white/50 text-sm font-semibold px-6 py-2.5 rounded-full transition-all">
                Schedule a Campus Visit
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
