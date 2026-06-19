import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ────────────────────────────────────────────────── */

const UG_PROGRAMS = [
  {
    name: 'Computer Science & Engineering',
    code: 'CSE', seats: 240,
    desc: 'Fundamentals of computing, algorithms, OS, cloud and software engineering with industry-grade project exposure.',
    color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600',
    href: 'https://department-of-computer-science-engineering.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    code: 'AIML', seats: 120,
    desc: 'Deep learning, NLP, computer vision, data science and intelligent systems for the AI-first world.',
    color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600',
    href: 'https://artificial-intelligence-machine-learning.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Electronics & Communication Engineering',
    code: 'ECE', seats: 120,
    desc: 'Analog & digital circuits, VLSI, embedded systems, IoT and communication technology.',
    color: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600',
    href: 'https://department-of-electronics-and-communication-engineering.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Electrical & Electronics Engineering',
    code: 'EEE', seats: 60,
    desc: 'Power systems, control systems, electric machines, drives and renewable energy technologies.',
    color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600',
    href: 'https://department-of-electrical-and-electronics-engineering.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Mechanical Engineering',
    code: 'ME', seats: 120,
    desc: 'Thermodynamics, fluid mechanics, machine design, manufacturing, CAD/CAM and robotics.',
    color: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-600',
    href: 'https://mechanical-engineering.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Computer Engineering',
    code: 'CE', seats: 60,
    desc: 'Blending hardware and software — computer architecture, networks, systems and project-based learning.',
    color: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600',
    href: 'https://computer-engineering.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Applied Sciences & Engineering',
    code: 'ASE', seats: 60,
    desc: 'Engineering mathematics, physics, chemistry, materials science and nanotechnology fundamentals.',
    color: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600',
    href: 'https://bsh.newhorizoncollegeofengineering.in/',
  },
];

const PG_PROGRAMS = [
  {
    name: 'M.Tech – Computer Science & Engineering',
    code: 'M.Tech', seats: 18,
    desc: 'Advanced algorithms, machine learning, cloud computing, distributed systems and thesis-based research.',
    color: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700',
    eligibility: 'B.E./B.Tech + GATE',
    href: '#',
  },
  {
    name: 'Master of Computer Applications',
    code: 'MCA', seats: 30,
    desc: 'IT fundamentals, advanced Java, mobile app development, cloud computing and software testing.',
    color: 'bg-violet-600', light: 'bg-violet-50', text: 'text-violet-700',
    eligibility: 'Any Degree + KMAT / PGCET',
    href: 'https://mca.newhorizoncollegeofengineering.in/',
  },
  {
    name: 'Master of Business Administration',
    code: 'MBA', seats: 60,
    desc: 'Marketing, finance, HR, business analytics, entrepreneurship and enterprise management.',
    color: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-700',
    eligibility: 'Any Degree + PGCET / MAT / KMAT',
    href: 'https://mba.newhorizoncollegeofengineering.in/',
  },
];

const PHD_PROGRAMS = [
  { name: 'Computer Science & Engineering',       area: 'AI · Cloud · Cyber Security · Data Mining'            },
  { name: 'Electrical & Electronics Engineering', area: 'Power Electronics · Smart Grid · VLSI'                },
  { name: 'Mechanical Engineering',               area: 'Robotics · Thermal Engg · CAD/CAM · Composites'       },
  { name: 'Electronics & Communication Engg.',    area: 'Signal Processing · IoT · Embedded Systems'           },
  { name: 'Information Science & Engineering',    area: 'Data Science · Network Security · Software Engg.'     },
  { name: 'Computer Applications',                area: 'AI · Data Mining · Network Security'                  },
  { name: 'Mathematics',                          area: 'Applied Maths · Graph Theory · Cryptography'          },
  { name: 'Management Studies',                   area: 'Strategy · Marketing Analytics · HR · Finance'        },
];

/* ─── Eligibility Section (different per type) ─────────────── */

function InfoTabs({ type }: { type: 'ug' | 'pg' }) {
  return (
    <div className={`${type === 'ug' ? 'bg-slate-50' : 'bg-blue-50'} border-b border-slate-200`}>
      <div className="container-wide pt-5 pb-20">
        <h3 className="font-bold text-navy-950 text-lg mb-5 flex items-center gap-2">
          <span className="w-1 h-5 bg-blue-600 rounded-full" />
          Eligibility Criteria
        </h3>

        {type === 'ug' && (
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-600 text-base leading-relaxed">
                The student should have passed 2nd PUC / 12th standard or equivalent examination with English as one of the languages and should have scored an aggregate of <strong>45% in Physics and Mathematics</strong> as compulsory subjects along with Chemistry / Bio-Technology / Computer Science / Electronics / Biology.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mt-3">
                For Karnataka SC, ST and other Backward Classes (Category I, 2A, 2B, 3A and 3B), the minimum marks will be <strong>40% aggregate</strong> in the optional subjects.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-1">Duration</p>
              <p className="text-slate-700 text-base">
                <strong>4 academic years</strong> · 8 semesters · Each semester 16 weeks
              </p>
            </div>
          </div>
        )}

        {type === 'pg' && (
          <div className="space-y-3">
            {[
              { prog: 'M.Tech – Computer Science & Engineering', criteria: 'B.E. / B.Tech in CSE / IT / ECE with a valid GATE score. Duration: 2 years.', exam: 'GATE' },
              { prog: 'Master of Computer Applications (MCA)',   criteria: "Any Bachelor's degree with Mathematics as a subject. Duration: 2 years.", exam: 'KMAT / PGCET / MAT' },
              { prog: 'Master of Business Administration (MBA)', criteria: "Any Bachelor's degree from a recognised university. Duration: 2 years.", exam: 'PGCET / MAT / KMAT' },
            ].map(p => (
              <div key={p.prog} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-semibold text-navy-900 text-base mb-1">{p.prog}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.criteria}</p>
                </div>
                <span className="flex-shrink-0 text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">{p.exam}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Common Tabs (Documents + How to Apply) — shown once ─── */

const COMMON_TABS = ['Documents Required', 'How to Apply'] as const;
type CommonTab = typeof COMMON_TABS[number];

function CommonTabs() {
  const [active, setActive] = useState<CommonTab>('Documents Required');

  return (
    <div className="bg-white border-b border-slate-200">
      <div className="container-wide py-12">
        <div className="flex flex-col sm:flex-row gap-8">

          {/* Left: vertical tab list */}
          <div className="flex flex-wrap sm:flex-col gap-1 sm:w-44 flex-shrink-0">
            {COMMON_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active === tab
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right: content */}
          <div className="flex-1 min-w-0">
            {active === 'Documents Required' && (
              <div>
                <p className="text-slate-500 text-base mb-5">Once the seat is confirmed, candidates must submit original documents along with photocopies.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: '10th / SSLC Marks Card',    detail: 'Original + 2 sets of Photocopy' },
                    { label: '12th / PUC Marks Card',      detail: 'Original + 2 sets of Photocopy' },
                    { label: 'Transfer Certificate',       detail: 'Original + 2 sets of Photocopy' },
                    { label: 'Caste Certificate',          detail: 'SC/ST Candidates — Karnataka students only' },
                    { label: 'Photographs',                detail: '4 Passport size + 4 Stamp size' },
                    { label: 'Migration Certificate',      detail: 'For students from boards other than Karnataka PU Board' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-navy-900 text-white text-sm font-black flex items-center justify-center">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="font-semibold text-navy-900 text-base leading-snug">{doc.label}</p>
                        <p className="text-slate-500 text-sm mt-0.5">{doc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {active === 'How to Apply' && (
              <div>
                {/* Steps */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { step: '01', title: 'Fill Online Form',    desc: 'Complete the application form with your academic details and upload scanned documents.' },
                    { step: '02', title: 'Visit / Call Us',     desc: 'Visit the Admission Office in person or call us on the helpline numbers for guidance.' },
                    { step: '03', title: 'Submit & Confirm',    desc: 'Submit the form with complete and accurate information. Incomplete forms will not be processed.' },
                  ].map(s => (
                    <div key={s.step} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                      <span className="inline-block text-2xl font-black text-slate-200 leading-none mb-3">{s.step}</span>
                      <h4 className="font-bold text-navy-900 text-base mb-1">{s.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
                    className="bg-navy-700 hover:bg-navy-800 text-white text-base font-bold px-6 py-2.5 rounded-full transition-colors">
                    Enquiry Form
                  </a>
                  <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-base font-bold px-6 py-2.5 rounded-full transition-colors">
                    E-Application Form
                  </a>
                  <a href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/BE-NHCE-Guideline-for-2022-23.pdf" target="_blank" rel="noopener noreferrer"
                    className="bg-slate-600 hover:bg-slate-700 text-white text-base font-bold px-6 py-2.5 rounded-full transition-colors">
                    Download Form
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function ProgramsPage() {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState<'ug' | 'pg' | 'phd'>('ug');

  useEffect(() => {
    if (hash) {
      const tabId = hash.replace('#', '');
      if (tabId === 'ug' || tabId === 'pg' || tabId === 'phd') {
        setActiveTab(tabId);
        setTimeout(() => {
          const el = document.getElementById('programs-tabs');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out]">

      <HeroSection
        image="/hero6.png"
        badge="NAAC A Accredited · VTU Affiliated"
        headingSmall="Discover Your"
        headingMain="Perfect"
        headingGhost="Programme at NHCE"
        description="From B.E. to Ph.D — 20+ industry-aligned programmes, VTU affiliated, designed to launch world-class careers."
        button={{
          label: 'Explore Programmes',
          href: '#programs-tabs',
          onClick: e => {
            e?.preventDefault();
            document.querySelector('#programs-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          },
        }}
      />

      {/* ── Tabs Navigation ── */}
      <div id="programs-tabs" className="bg-white border-b border-slate-200 sticky top-20 sm:top-16 z-30 shadow-sm scroll-mt-24 sm:scroll-mt-20">
        <div className="container-wide py-4">
          <div className="flex justify-center gap-2 sm:gap-4">
            {[
              { id: 'ug', label: 'Undergraduate' },
              { id: 'pg', label: 'Postgraduate' },
              { id: 'phd', label: 'Doctoral' },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as 'ug' | 'pg' | 'phd');
                    window.history.pushState(null, '', `#${tab.id}`);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-navy-950'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Tab Content ── */}
      <div className="min-h-[400px]">
        {activeTab === 'ug' && (
          <div key="ug" className="animate-[fadeIn_0.35s_ease-out]">
            {/* ── UG Programs ── */}
            <div id="ug" className="container-wide pt-10 sm:pt-16 pb-12">
              {/* Section header */}
              <AnimateIn variant="fade-up">
                <div className="flex items-end justify-between mb-4 pb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">01 — Undergraduate</p>
                    <h2 className="font-display font-bold text-navy-950 text-xl sm:text-2xl">B.E. Programmes</h2>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-slate-500">Duration: 4 Years</p>
                    <p className="text-sm text-slate-500">Eligibility: 10+2 PCM · Min 50%</p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <div className="pb-7 text-slate-600 text-base leading-relaxed">
                  <p>Our Undergraduate programs comprise a syllabus that is worked on for months to bring out the best to students across the country who are picking up application forms for engineering colleges. We have state-of-the-art labs, excellent facilities for outstation students, multiple co-curricular activities to be a part of impeccable placement offers with over 126+ companies as recruiters.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {UG_PROGRAMS.map((p, i) => (
                    <a
                      key={p.code}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Top accent bar */}
                      <div className={`h-1.5 ${p.color}`} />
                      <div className="p-5 flex flex-col flex-1">
                        {/* Number + code */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-sm font-black px-2.5 py-1 rounded-lg ${p.light} ${p.text}`}>{p.code}</span>
                          <span className="text-slate-300 font-black text-lg">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>
                        {/* Name */}
                        <h3 className="font-bold text-navy-900 text-sm sm:text-base leading-snug mb-2 flex-1">{p.name}</h3>
                        {/* Desc */}
                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">{p.desc}</p>
                        {/* Footer */}
                        <div className="flex items-end justify-end pt-3 border-t border-slate-100">
                          <span className={`${p.text} flex items-center gap-0.5 text-xs font-semibold opacity-100`}>
                            Explore <ArrowUpRight size={12} />
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimateIn>
            </div>
            <InfoTabs type="ug" />
          </div>
        )}

        {activeTab === 'pg' && (
          <div key="pg" className="animate-[fadeIn_0.35s_ease-out]">
            {/* ── PG Programs ── */}
            <div id="pg" className="bg-blue-50">
              <div className="container-wide py-12">
                <AnimateIn variant="fade-up">
                  <div className="flex items-end justify-between mb-4 border-b border-slate-200 pb-4">
                    <div>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">02 — Postgraduate</p>
                      <h2 className="font-display font-bold text-navy-950 text-xl sm:text-2xl">Masters Programmes</h2>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-slate-500">Duration: 2 Years</p>
                      <p className="text-sm text-slate-500">Eligibility: Degree + GATE / PGCET / KMAT</p>
                    </div>
                  </div>
                </AnimateIn>

                <AnimateIn variant="fade-up" delay={100}>
                  <div className="pb-7 text-slate-600 text-base leading-relaxed">
                    <p>We offers quality postgraduate programs including M.Tech (Computer Science & Engineering), MBA, and MCA. M.Tech admissions require a valid GATE score, while MBA and MCA admissions are based on PGCET, MAT, or KMAT scores. With experienced faculty and industry-focused education, NHCE is a preferred choice for postgraduate studies.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {PG_PROGRAMS.map((p, i) => (
                      <a
                        key={p.code}
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-200 hover:shadow-lg hover:bg-white transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        <div className={`h-1.5 ${p.color}`} />
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`text-base font-black px-3 py-1 rounded-lg ${p.light} ${p.text}`}>{p.code}</span>
                            <span className="text-slate-300 font-black text-lg">{String(i + 1).padStart(2, '0')}</span>
                          </div>
                          <h3 className="font-bold text-navy-900 text-base sm:text-base leading-snug mb-2 flex-1">{p.name}</h3>
                          <p className="text-base text-slate-500 leading-relaxed mb-4">{p.desc}</p>
                          <div className="pt-3 border-t border-slate-200 space-y-1">
                            <p className="text-sm text-slate-400">Eligibility: {p.eligibility}</p>
                          </div>
                          <div className="flex items-end justify-end pt-3 border-t border-slate-100">
                            <span className={`${p.text} flex items-center gap-0.5 text-sm font-semibold opacity-100`}>
                              Explore <ArrowUpRight size={12} />
                            </span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </AnimateIn>
              </div>
            </div>
            <InfoTabs type="pg" />
          </div>
        )}

        {activeTab === 'phd' && (
          <div key="phd" className="animate-[fadeIn_0.35s_ease-out]">
            {/* ── PhD Programs ── */}
            <div id="phd" className="container-wide pt-12 pb-20">
              <AnimateIn variant="fade-up">
                <div className="flex items-end justify-between mb-4 border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">03 — Doctoral</p>
                    <h2 className="font-display font-bold text-navy-950 text-2xl">Ph.D &amp; Research</h2>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-sm text-slate-500">Full-time &amp; Part-time</p>
                    <p className="text-sm text-slate-500">VTU / UGC Recognised</p>
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn variant="fade-up" delay={100}>
                <div className="pb-7 text-slate-600 text-base leading-relaxed">
                  <p>For students seeking PhD admission 2026–27 in Engineering, New Horizon College of Engineering provides excellent opportunities. We are proud of the strong turnout for PhD admissions in 2025 across all disciplines in Bangalore.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {PHD_PROGRAMS.map((p, i) => (
                    <div
                      key={p.name}
                      className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-emerald-200 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="bg-emerald-50 text-emerald-700 text-sm font-bold px-2 py-0.5 rounded-md">Ph.D</span>
                        <span className="text-slate-200 font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="font-bold text-navy-900 text-base leading-snug mb-2">{p.name}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{p.area}</p>
                    </div>
                  ))}
                </div>
              </AnimateIn>
            </div>
          </div>
        )}
      </div>

      {activeTab !== 'phd' && <CommonTabs />}

    </div>
  );
}
