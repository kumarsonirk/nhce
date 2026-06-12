import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Users, BookOpen, ClipboardList,
  Target, Download, Layers, CheckCircle2, ArrowRight,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

const NAV = [
  { id: 'nab',   label: 'National Advisory Board',       icon: Globe        },
  { id: 'gc',    label: 'Governing Council',              icon: Users        },
  { id: 'ac',    label: 'Academic Council',               icon: BookOpen     },
  { id: 'sc',    label: 'Statutory Committees',           icon: ClipboardList },
  { id: 'isp',   label: 'Institutional Strategic Plan',  icon: Target       },
  { id: 'md',    label: 'Mandatory Disclosure',           icon: Download     },
  { id: 'steer', label: 'Steering Committee',             icon: Layers       },
];

const NAB_MEMBERS = [
  { name: 'Dr. K. Balaveera Reddy', designation: 'Former Vice Chancellor of the Visvesvaraya Technological University (VTU), Belagavi' },
  { name: 'Dr. T G Sitharam',       designation: 'Chairman, All India Council for Technical Education (AICTE), New Delhi and Former Director, Indian Institute of Technology, Guwahati' },
  { name: 'Mr. Chandra Reddy K',    designation: 'EVP and Managing Director, India GEC, Capgemini Engineering' },
  { name: 'Prof. Anandi Giridharan',designation: 'Principal Research Scientist, Dept. of Electrical Communication Engineering (ECE), Indian Institute of Science, Bengaluru' },
  { name: 'Mr. M K Ramesh',         designation: 'Chief Manager, Power Grid Corporation Of India Ltd, Bengaluru' },
  { name: 'Dr. Subhash Chaudhari',  designation: 'Vice Chancellor, RTM Nagpur University' },
  { name: 'Dr. A. S. Deshpande',    designation: 'Former Registrar, Visvesvaraya Technological University (VTU)' },
  { name: 'Dr. J. Ramkumar',        designation: 'Asst Professor, IIT-Kanpur' },
  { name: 'Dr. GP. PrabhuKumar',    designation: 'Former Principal, BDT College of Engineering, Davangere, Karnataka, NBA Expert Member' },
];

const GC_MEMBERS = [
  { name: 'Dr. Mohan Manghnani',    designation: 'Managing Trustee & Chairman',                                                                           position: 'Chairman'         },
  { name: 'Mr. Dhermesh Manghnani', designation: 'President-NHEI',                                                                                        position: 'Member'           },
  { name: 'Dr. L Ravi Kumar',       designation: 'Professor & Vice Principal, B.M.S. College of Engineering (BMSCE) Bengaluru',                           position: 'Member'           },
  { name: 'Dr. Shanmukha Nagaraj',  designation: 'Professor & Member Secretary, IQAC and HoD Mechanical Eng, RV College of Engineering, Bengaluru',       position: 'Member'           },
  { name: 'Dr. R Bodhisatvan',      designation: 'Principal- NHC(M)',                                                                                     position: 'Member'           },
  { name: 'Mr. H N Surya Prakash',  designation: 'Registrar',                                                                                             position: 'Member'           },
  { name: 'Mr. Pradeep Kote',       designation: 'Sr. Director – CDC',                                                                                    position: 'Member'           },
  { name: 'Dr. Anitha Rai',         designation: 'Director- Library & Alumni Relations',                                                                  position: 'Member'           },
  { name: 'Dr. R J Anandhi',        designation: 'Dean-Academics',                                                                                        position: 'Member'           },
  { name: 'Dr. Revathi V',          designation: 'Dean R&D',                                                                                              position: 'Member'           },
  { name: 'Dr. Babita Jain',        designation: 'Dean IQAC',                                                                                             position: 'Member'           },
  { name: 'Dr. Vijilius H Raj',     designation: 'Controller Of Examinations',                                                                            position: 'Member'           },
  { name: 'VTU Nominee',            designation: 'University Nominee',                                                                                    position: 'Member'           },
  { name: 'AICTE Nominee',          designation: 'Council (AICTE) Nominee',                                                                               position: 'Member'           },
  { name: 'DTE Nominee',            designation: 'State Government Nominee',                                                                              position: 'Member'           },
  { name: 'Dr. Manjunatha',         designation: 'Principal',                                                                                             position: 'Member Secretary' },
];

const AC_CATEGORIES = [
  { roman: 'I',    category: 'Principal of the College – Chairman',
    members: ['Dr. Manjunatha'] },
  { roman: 'II',   category: 'Dean – R&D',
    members: ['Dr Revathi V'] },
  { roman: 'III',  category: 'Controller of Examination',
    members: ['Dr. Vijilius H Raj'] },
  { roman: 'IV',   category: 'Director – Library and Alumni Relations',
    members: ['Dr. Anitha S Rai'] },
  { roman: 'V',    category: 'All Heads of the Dept. – Members',
    members: ['Dr. B Rajalakshmi', 'Dr. Aravinda K', 'Dr. Uma Reddy', 'Dr. Sujitha S', 'Dr. Asha Joseph', 'Dr. Baswaraju Swathi', 'Dr. Vandana C P', 'Dr. Asha V', 'Dr. Rose Kavitha', 'Dr. Anusuya Devi V S', 'Dr. Srinivasa G', 'Mr. Rakesh Chandrashekar'] },
  { roman: 'VI',   category: 'Teachers of the College representing different level of teaching staff',
    members: ['Dr M. Jayanthi, Associate Professor', 'Dr. Vijayasekaran G, Associate Professor', 'Dr.J KarthiyayiniJ, Sr Assistant Professor', 'Ms Asha Rani Borah, Sr Assistant Professor', 'Dr Karthika M, Associate Professor', 'Dr Umamaheshwaran, Professor', 'Dr. J. Joshua Daniel Raj, Associate Professor', 'Dr Srinath M K, Associate Professor', 'Dr Arpana Prasad, Associate Professor', 'Dr Dhanalakshmi R V, Associate Professor', 'Dr Prashanth K S, Professor'] },
  { roman: 'VII',  category: 'Experts from outside the college representing areas such as industry, R & D, Tech. Edn',
    members: ['Mr. Rajesh Sakri, Segment Head, Europe/UK Sap Labs', 'Mr. Ananthamani, Vice President – PLM & Mech/Elec Capgemini Engineering', 'Dr Shanmukha Nagaraj, Member Secretary – IQAC, RV College of Engineering'] },
  { roman: 'VIII', category: 'Nominees of University (VTU)',
    members: ['Dr. Shadashive Gowda, Principal-Vidya Vardhaka College of Engineering, Mysore', 'Dr. Shivyogimath, Prof., Dept. of Civil Engineering, Basaveswara Engineering College, Bagalkot'] },
  { roman: 'IX',   category: 'Dean Academics – Member Secretary',
    members: ['Dr. R. J. Anandhi'] },
];


const STEER_MEMBERS = [
  { name: 'Dr. Manjunatha',          designation: 'Principal',                                  role: 'Chairman' },
  { name: 'Mrs. Malathi Madhusudan', designation: 'Sr. Executive Director- Accounts & Finance', role: 'Member'   },
  { name: 'Mr. Pradeep Kote',        designation: 'Sr. Director, CDC',                          role: 'Member'   },
  { name: 'Mr. H N Suryaprakash',    designation: 'Registrar',                                  role: 'Member'   },
  { name: 'Dr. R.J. Anandhi',        designation: 'Dean-Academics',                             role: 'Member'   },
  { name: 'Dr. Revathi V',           designation: 'Dean R&D',                                   role: 'Member'   },
  { name: 'Dr. Babita Jain',         designation: 'Dean IQAC',                                  role: 'Member'   },
  { name: 'Dr. Vijilius Helena Raj', designation: 'Controller of Examinations',                 role: 'Member'   },
  { name: 'Ms. Manjula V.',          designation: 'Executive Director- Human Resources',        role: 'Member'   },
];

function MemberTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 -mx-0">
      <table className="w-full text-xs sm:text-sm min-w-[480px]">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {cols.map(c => (
              <th key={c} className="text-left px-3 sm:px-4 py-2.5 sm:py-3 font-bold text-navy-900 text-xs uppercase tracking-wide whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-3 sm:px-4 py-2.5 sm:py-3 text-slate-700 font-medium">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionCard({
  icon: Icon, accent, badge, title, desc, children,
}: {
  icon: React.ElementType; accent: string; badge: string;
  title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className={`border-l-4 ${accent} px-4 sm:px-6 pt-5 pb-3 sm:pt-6 sm:pb-4`}>
        <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border ${badge} mb-3`}>
          <Icon size={12} /> {title}
        </span>
        <h2 className="font-display font-bold text-navy-950 text-lg sm:text-2xl mb-2">{title}</h2>
        <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{desc}</p>
      </div>
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">{children}</div>
    </div>
  );
}

export default function GovernancePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTab, setActiveTab] = useState('nab');
  const contentRef = useRef<HTMLDivElement>(null);

  function selectTab(id: string) {
    setActiveTab(id);
    requestAnimationFrame(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out] overflow-x-hidden">

      <HeroSection
        image="/hero14.jpg"
        badge="Governance & Compliance · NHCE"
        headingSmall="Transparent"
        headingMain="Governance"
        headingGhost="at NHCE"
        description="Committed to accountability, integrity and excellence — our governance framework ensures NHCE operates at the highest standards of academic and institutional quality."
        button={{ label: 'Explore Governance', onClick: () => setActiveTab('gc') }}
      />

      {/* ── Mobile section pills ── */}
      <AnimateIn variant="fade-up">
      <div className="lg:hidden bg-white border-b border-slate-100">
        <div className="overflow-x-auto no-scrollbar px-4 py-3">
          <div className="flex gap-2 whitespace-nowrap">
            {NAV.map((s, i) => (
              <button
                key={s.id}
                onClick={() => selectTab(s.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
                  activeTab === s.id
                    ? 'bg-navy-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="text-[10px] font-black opacity-60">{i + 1}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile PDF download */}
        {/* <div className="px-4 pb-3 flex gap-2">
          <button
            onClick={() => setActiveTab('md')}
            className="flex-1 flex items-center justify-center gap-2 bg-navy-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl"
          >
            <Download size={13} /> Mandatory Disclosure
          </button>
          <a
            href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2024/06/Mandatory-Disclosure-2024-25.pdf"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2.5 rounded-xl whitespace-nowrap"
          >
            <Download size={12} /> PDF
          </a>
        </div> */}
      </div>
      </AnimateIn>

      {/* ── Main: sidebar + content ── */}
      <div className="container-wide py-6 sm:py-10 lg:py-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* Sticky sidebar */}
          <AnimateIn variant="fade-right" className="min-w-0">
          <aside className="hidden lg:block sticky top-24 self-start">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Sections</p>
              <nav className="space-y-0.5">
                {NAV.map((s, i) => {
                  const Icon = s.icon;
                  const active = activeTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-4 rounded-xl text-sm font-medium transition-all text-left ${
                        active
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 ${
                        active ? 'bg-white/20 text-white' : 'bg-navy-900 text-white'
                      }`}>
                        {i + 1}
                      </span>
                      <span className="flex-1 leading-snug">{s.label}</span>
                      {active && <Icon size={12} className="opacity-60 flex-shrink-0" />}
                    </button>
                  );
                })}
              </nav>
            </div>
            {/* <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('md')}
                className="flex items-center gap-2 w-full bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors"
              >
                <Download size={14} /> Mandatory Disclosure
              </button>
              <a
                href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2024/06/Mandatory-Disclosure-2024-25.pdf"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Download size={12} /> Download PDF directly
              </a>
            </div> */}
          </aside>
          </AnimateIn>

          {/* Active section content */}
          <AnimateIn variant="fade-up" delay={80} className="min-w-0">
          <div className="min-w-0" ref={contentRef}>

            {activeTab === 'nab' && (
              <SectionCard icon={Globe} accent="border-blue-500"
                badge="bg-blue-50 border-blue-100 text-blue-700"
                title="National Advisory Board"
                desc="Comprising distinguished academics, industry leaders and policy makers who provide strategic direction for institutional development and academic excellence.">
                <MemberTable
                  cols={['Sl. No.', 'Member', 'Designation']}
                  rows={NAB_MEMBERS.map((m, i) => [(i + 1).toString(), m.name, m.designation])}
                />
              </SectionCard>
            )}

            {activeTab === 'gc' && (
              <SectionCard icon={Users} accent="border-indigo-500"
                badge="bg-indigo-50 border-indigo-100 text-indigo-700"
                title="Governing Council"
                desc="The apex statutory body constituted as per VTU regulations, responsible for overall governance, major policy decisions and regulatory compliance of the institution.">
                <MemberTable
                  cols={['S.No.', 'Name', 'Designation', 'Position in Governing Council']}
                  rows={GC_MEMBERS.map((m, i) => [(i + 1).toString(), m.name, m.designation, m.position])}
                />
              </SectionCard>
            )}

            {activeTab === 'ac' && (
              <SectionCard icon={BookOpen} accent="border-violet-500"
                badge="bg-violet-50 border-violet-100 text-violet-700"
                title="Academic Council"
                desc="The principal academic body responsible for maintaining academic standards, approving curriculum changes, and overseeing examination and evaluation frameworks.">
                <div className="space-y-2.5">
                  {AC_CATEGORIES.map((cat) => (
                    <div key={cat.roman} className="rounded-xl border border-slate-100 overflow-hidden">
                      {/* Category header */}
                      <div className="flex items-center gap-3 px-4 py-3 bg-violet-50 border-b border-violet-100">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-600 text-white text-xs font-black flex items-center justify-center">
                          {cat.roman}
                        </span>
                        <p className="font-bold text-navy-900 text-sm leading-snug">{cat.category}</p>
                      </div>
                      {/* Members */}
                      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row sm:flex-wrap gap-2">
                        {cat.members.map((member, mi) => (
                          <div key={mi} className="flex items-center gap-2 text-sm text-slate-700 sm:min-w-[260px]">
                            <span className="w-5 h-5 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                              {mi + 1}
                            </span>
                            <span>{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'sc' && (
              <SectionCard icon={ClipboardList} accent="border-amber-500"
                badge="bg-amber-50 border-amber-100 text-amber-700"
                title="Statutory Committees"
                desc="30 mandatory committees constituted as per UGC, AICTE and Government directives covering anti-ragging, ICC, IQAC, grievance, placement, research and more.">
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 sm:p-6 mb-5">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
                    {[
                      { num: '30',   label: 'Committees',     icon: '🏛️' },
                      { num: '250+', label: 'Members',         icon: '👥' },
                      { num: '80+',  label: 'Meeting Records', icon: '📄' },
                    ].map(s => (
                      <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 text-center border border-amber-100">
                        <span className="text-xl sm:text-2xl">{s.icon}</span>
                        <p className="font-black text-navy-900 text-lg sm:text-2xl mt-1">{s.num}</p>
                        <p className="text-slate-500 text-[10px] sm:text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    NHCE has constituted <strong>30 statutory committees</strong> as mandated by regulatory bodies including UGC, AICTE, VTU and the Government of Karnataka. Each committee has a defined composition, clear mandate and documented meeting minutes available for transparency.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Anti-Ragging Committee', 'Internal Complaints Committee', 'IQAC', 'Grievance Redressal', "Women's Cell", 'Placement Committee', 'Research & Development', 'SC/ST Cell', 'NSS Committee', 'NCC Committee'].map(tag => (
                      <span key={tag} className="text-xs font-semibold bg-white border border-amber-200 text-amber-800 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                    <span className="text-xs font-semibold bg-amber-200 text-amber-900 px-3 py-1 rounded-full">+20 more</span>
                  </div>
                  <Link
                    to="/statutory-committee"
                    className="flex sm:inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Explore All 30 Committees <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All committees are reconstituted annually with updated member lists and meeting schedules. Minutes of meetings are recorded and available as downloadable PDFs on the full committees page.
                  </p>
                </div>
              </SectionCard>
            )}

            {activeTab === 'isp' && (
              <SectionCard icon={Target} accent="border-emerald-500"
                badge="bg-emerald-50 border-emerald-100 text-emerald-700"
                title="Institutional Strategic Plan"
                desc="NHCE's long-term vision document outlining goals across academic excellence, research, infrastructure and student outcomes through 2027–28.">
                <div className="flex flex-col sm:flex-row items-start gap-5 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:p-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center flex-shrink-0">
                    <Target size={24} className="text-emerald-600" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-navy-900 text-base mb-1">Institutional Strategic Plan 2025–2028</p>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      The strategic plan sets a roadmap for NHCE's growth covering academic quality, research output, industry collaboration, infrastructure expansion and student placement targets for the next three years.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {['Academic Excellence', 'Research & Innovation', 'Industry Collaboration', 'Infrastructure', 'Student Outcomes', 'Global Connect'].map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-white border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <a
                      href="https://newhorizoncollegeofengineering.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      <Download size={14} /> Download Strategic Plan PDF
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100 mt-4">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    The Institutional Strategic Plan is reviewed annually by the Steering Committee and updated in alignment with NAAC, NBA and AICTE quality benchmarks.
                  </p>
                </div>
              </SectionCard>
            )}

            {activeTab === 'md' && (
              <SectionCard icon={Download} accent="border-rose-500"
                badge="bg-rose-50 border-rose-100 text-rose-700"
                title="Mandatory Disclosure"
                desc="Complete AICTE-mandated institutional disclosure covering governance structure, financial statements, council meeting proceedings, and Board of Studies records.">
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 sm:p-6 mb-5">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
                    {[
                      { num: '47+', label: 'Documents',          icon: '📁' },
                      { num: '38',  label: 'Meeting Minutes',     icon: '📋' },
                      { num: '9',   label: 'Years of Financials', icon: '📊' },
                    ].map(s => (
                      <div key={s.label} className="bg-white rounded-xl p-3 sm:p-4 text-center border border-rose-100">
                        <span className="text-xl sm:text-2xl">{s.icon}</span>
                        <p className="font-black text-navy-900 text-lg sm:text-2xl mt-1">{s.num}</p>
                        <p className="text-slate-500 text-[10px] sm:text-xs">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    The mandatory disclosure includes governance body structures and norms, annual financial statements from <strong>2016–17 to 2024–25</strong>, proceedings of <strong>23 Governing Body</strong> and <strong>27 Academic Council</strong> meetings, plus Board of Studies minutes for <strong>11 academic departments</strong>.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Governing Body Norms', 'Academic Council Norms', 'Finance Committee', 'Financial Statements', 'BOS Minutes', 'Meeting Proceedings', 'Service Rules', 'NAAC/NBA Status'].map(tag => (
                      <span key={tag} className="text-xs font-semibold bg-white border border-rose-200 text-rose-800 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <Link
                    to="/mandatory-disclosure"
                    className="flex sm:inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    View Full Disclosure <ArrowRight size={14} />
                  </Link>
                </div>
                <a
                  href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2024/06/Mandatory-Disclosure-2024-25.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="flex sm:inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                >
                  <Download size={14} /> Quick Download: Disclosure PDF 2024–25
                </a>
              </SectionCard>
            )}

            {activeTab === 'steer' && (
              <SectionCard icon={Layers} accent="border-cyan-500"
                badge="bg-cyan-50 border-cyan-100 text-cyan-700"
                title="Steering Committee"
                desc="The Steering Committee monitors implementation of the institutional strategic plan and ensures all key initiatives remain aligned with the college's long-term vision.">
                <MemberTable
                  cols={['Sl.No.', 'Name', 'Designation', 'Role']}
                  rows={STEER_MEMBERS.map((m, i) => [(i + 1).toString(), m.name, m.designation, m.role])}
                />
              </SectionCard>
            )}

          </div>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
