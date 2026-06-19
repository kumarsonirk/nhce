import { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Award, FileText, GraduationCap, ChevronRight,
  Download, ShieldCheck, Clock, CheckCircle2, ExternalLink 
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const QUICK_LINKS = [
  { 
    icon: Award, label: 'Exam Results', 
    desc: 'Check your Continuous Internal Evaluation (CIE) and Semester End Examination (SEE) results.', 
    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'hover:border-emerald-200',
    href: 'https://newhorizoncollegeofengineering.in/exam-results/'
  },
  { 
    icon: Calendar, label: 'Exam Guidlines', 
    desc: 'Download the latest schedules for upcoming semester examinations and assessments.', 
    color: 'text-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-200',
    href: 'https://newhorizoncollegeofengineering.in/exam-time-table/'
  },
  { 
    icon: FileText, label: 'Exam Policies', 
    desc: 'Important announcements, fee payment deadlines, and updates from the COE office.', 
    color: 'text-amber-600', bg: 'bg-amber-50', border: 'hover:border-amber-200',
    href: 'https://newhorizoncollegeofengineering.in/exam-circulars/'
  },
  { 
    icon: GraduationCap, label: 'Malpractice', 
    desc: 'Information regarding graduation ceremonies, degree certificates, and gold medals.', 
    color: 'text-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-200',
    href: 'https://newhorizoncollegeofengineering.in/convocation/'
  },
];

const NAV = [
  { id: 'application_form',  label: 'Application Forms',  icon: Download },
  { id: 'examination_forms', label: 'Examination Forms',  icon: Download },
  { id: 'notifications',     label: 'Notifications',      icon: FileText },
  { id: 'timetable',         label: 'SEE Timetable',      icon: Calendar },
  { id: 'results',           label: 'Exam Results',       icon: Award },
  { id: 'annual_report',     label: 'Annual Report',      icon: FileText },
  { id: 'convocation',       label: 'Convocation',        icon: GraduationCap },
];

const DOWNLOAD_FORMS = [
  { title: 'Application for Name Correction in Grade Card', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Name-Correction-in-Grade-Card.pdf' },
  { title: 'Application for Make-Up Examination', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Make-Up-Examination.pdf' },
  { title: 'Application for Duplicate Marks Card', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Duplicate-Marks-Card.pdf' },
  { title: 'Application for Re-evaluation of answer scripts', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Re-evaluation-of-answer-scripts.pdf' },
  { title: 'Application for Official Transcript', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Official-Transcript.pdf' },
  { title: 'Application for Provisional Degree Certificate', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2020/01/Application-for-Provisional-Degree-Certificate.pdf' },
];

const EXAMINATION_FORMS = [
  { title: 'Examination Registration Form', href: '#' },
  { title: 'Re-evaluation Registration Form', href: '#' },
  { title: 'Make-up Examination Registration Form', href: '#' },
];

const NOTIFICATION_DOCS = [
  { title: 'Notification for Odd Semester Exams', href: '#' },
  { title: 'Notification for Even Semester Exams', href: '#' },
];

const TIMETABLE_DOCS = [
  { title: 'SEE Timetable - B.E. Odd Semester', href: '#' },
  { title: 'SEE Timetable - B.E. Even Semester', href: '#' },
  { title: 'SEE Timetable - M.Tech / MBA / MCA', href: '#' },
];

const ANNUAL_REPORTS = [
  { title: 'Annual Report of COE 2023-24', href: '#' },
  { title: 'Annual Report of COE 2022-23', href: '#' },
  { title: 'Annual Report of COE 2021-22', href: '#' },
];

function SectionCard({
  icon: Icon, accent, badge, title, desc, children,
}: {
  icon: React.ElementType; accent: string; badge: string;
  title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className={`border-l-4 ${accent} px-4 sm:px-6 pt-5 pb-3 sm:pt-6 sm:pb-4`}>
        <span className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full border ${badge} mb-3`}>
          <Icon size={12} /> {title}
        </span>
        <h2 className="font-display font-bold text-navy-950 text-xl sm:text-3xl mb-2">{title}</h2>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">{desc}</p>
      </div>
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">{children}</div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function ExamPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTab, setActiveTab] = useState('notifications');
  const contentRef = useRef<HTMLDivElement>(null);

  function selectTab(id: string) {
    setActiveTab(id);
    requestAnimationFrame(() => {
      if (contentRef.current) {
        const top = contentRef.current.getBoundingClientRect().top + window.scrollY - 140;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out] overflow-x-hidden flex flex-col">
      
      {/* ── Hero ── */}
      <div className="order-none w-full">
        <HeroSection
          image="/hero13.jpg"
          badge="Office of the COE · NHCE"
          headingSmall="Autonomous Evaluation"
          headingMain="Controller of"
          headingGhost="Examinations"
          description="Dedicated to ensuring a fair, transparent, and rigorous academic evaluation process for all undergraduate and postgraduate programmes under our autonomous framework."
          button={{ label: 'Check Results', href: 'https://newhorizoncollegeofengineering.in/exam-results/' }}
          secondaryButton={{ label: 'Application Forms', onClick: () => selectTab('application_form') }}
        />
      </div>

      {/* ── Mobile section pills ── */}
      <div className="lg:hidden bg-white border-b border-slate-100 sticky top-20 sm:top-16 z-30 shadow-sm order-1 w-full">
        <AnimateIn variant="fade-up">
          <div className="overflow-x-auto no-scrollbar px-4 py-3">
            <div className="flex gap-2 whitespace-nowrap">
              {NAV.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => selectTab(s.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
                    activeTab === s.id
                      ? 'bg-navy-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-xs font-black opacity-60">{i + 1}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* ── Quick Links ── */}
      <div id="portals" className="bg-slate-50 border-b border-slate-200 order-3 lg:order-1 w-full">
        <div className="container-wide py-12 lg:py-16">          
          <AnimateIn variant="fade-up" delay={100}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
              {QUICK_LINKS.map(link => (
                <a 
                  key={link.label}
                  href={link.href}
                  target="_blank" rel="noopener noreferrer"
                  className={`group bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg sm:hover:-translate-y-1 transition-all duration-300 flex items-start sm:flex-col gap-4 sm:gap-0 h-full ${link.border}`}
                >
                  <div className={`w-12 h-12 rounded-xl sm:rounded-2xl ${link.bg} flex items-center justify-center flex-shrink-0 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon size={20} className={link.color} />
                  </div>
                  <div className="flex-1 flex flex-col h-full min-w-0">
                    <h3 className="font-bold text-navy-900 text-lg sm:text-xl mb-1 sm:mb-2">{link.label}</h3>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5 flex-1">{link.desc}</p>
                    <span className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold ${link.color} group-hover:translate-x-1 transition-transform mt-auto`}>
                      Open Portal <ChevronRight size={14} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── About the Examination Cell ── */}
      <div className="bg-white py-16 lg:py-24 border-b border-slate-200 order-4 lg:order-2 w-full">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-center">
              <div>
                <span className="badge bg-blue-100 text-blue-700 mb-3 inline-flex">Overview</span>
                <h2 className="font-display font-bold text-navy-950 text-3xl sm:text-4xl leading-tight mb-6">
                  Office of the <br className="hidden sm:block" />
                  <span className="text-blue-600">Controller of Examinations</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-lg sm:text-xl leading-relaxed">
                  <p>
                    New Horizon College of Engineering is an autonomous institute, effective from August 2015, affiliated to Visvesvaraya Technological University, Belgaum. The institute promotes academic curriculum as per the needs of the industry and new developments in the various fields.
                  </p>
                  <p>
                    The office of the Controller of Examinations was established in the year 2015 after the conferment of Autonomous status to the institute.
                  </p>
                  <p>
                    The examination for the autonomous courses is conducted by the Institute, in two stages emphasizing continuous Internal Evaluation [CIE] throughout the semester and Semester End Examination [SEE] at the end of the semester. Complete examination process is executed by the Office of the Controller of Examination in coordination with all departments.
                  </p>
                </div>
              </div>

              <div className="bg-navy-950 rounded-3xl p-8 relative overflow-hidden text-white shadow-xl h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="relative z-10">
                  <div className="flex flex-col items-center text-center gap-4 mb-6">
                    <div className="w-48 h-48 overflow-hidden mb-2">
                      <img 
                        src="vijilius_mam.jpg" 
                        alt="Dr. Vijilius Helena Raj" 
                        className="w-full h-full object-cover bg-slate-800"
                        onError={e => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=VR&background=0D2B68&color=fff&size=150'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl leading-tight mb-1">Dr. Vijilius Helena Raj</h3>
                      <p className="text-white/60 text-base font-medium">Controller of Examinations</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 text-center">
                    <p className="text-base text-white/80 italic leading-relaxed">
                      "Our mission is to ensure a fair, transparent, and rigorous academic evaluation process for all our students, upholding the highest standards of integrity."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Main: sidebar + content ── */}
      <div className="container-wide py-6 sm:py-10 lg:py-16 order-2 lg:order-3 w-full">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* Sticky sidebar */}
          <AnimateIn variant="fade-right" className="min-w-0">
          <aside className="hidden lg:block sticky top-24 self-start">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Exam Portals & Resources</p>
              <nav className="space-y-0.5">
                {NAV.map((s, i) => {
                  const Icon = s.icon;
                  const active = activeTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      className={`w-full flex items-center gap-3 px-3 py-4 rounded-xl text-base font-medium transition-all text-left ${
                        active
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-sm font-bold flex items-center justify-center flex-shrink-0 ${
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
          </aside>
          </AnimateIn>

          {/* Active section content */}
          <AnimateIn variant="fade-up" delay={80} className="min-w-0">
          <div className="min-w-0" ref={contentRef}>

            {activeTab === 'notifications' && (
              <SectionCard icon={FileText} accent="border-teal-500"
                badge="bg-teal-50 border-teal-100 text-teal-700"
                title="Notifications"
                desc="Latest examination notifications and general instructions for students.">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {NOTIFICATION_DOCS.map((form, i) => (
                    <a 
                      key={i} 
                      href={form.href} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white border border-slate-100 hover:border-teal-200 hover:shadow-sm rounded-2xl p-5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-50 group-hover:border-teal-100 transition-colors">
                        <FileText size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-semibold text-base text-navy-900 leading-snug group-hover:text-teal-700 transition-colors mb-1">
                          {form.title}
                        </h4>
                        <p className="text-sm text-slate-400">PDF Document</p>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-teal-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'timetable' && (
              <SectionCard icon={Calendar} accent="border-blue-500"
                badge="bg-blue-50 border-blue-100 text-blue-700"
                title="SEE Timetable"
                desc="Download the latest schedules for upcoming semester end examinations (SEE).">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {TIMETABLE_DOCS.map((form, i) => (
                    <a 
                      key={i} 
                      href={form.href} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white border border-slate-100 hover:border-blue-200 hover:shadow-sm rounded-2xl p-5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <Calendar size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-semibold text-base text-navy-900 leading-snug group-hover:text-blue-700 transition-colors mb-1">
                          {form.title}
                        </h4>
                        <p className="text-sm text-slate-400">PDF Document</p>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'results' && (
              <SectionCard icon={Award} accent="border-emerald-500"
                badge="bg-emerald-50 border-emerald-100 text-emerald-700"
                title="Exam Results"
                desc="Check your Continuous Internal Evaluation (CIE) and Semester End Examination (SEE) results securely.">
                
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 sm:p-6 mb-5">
                  <p className="text-slate-600 text-base leading-relaxed mb-5">
                    Results for all autonomous examinations are published through our secure student portal. You will need your USN (University Seat Number) and credentials to access your current semester grades and cumulative performance.
                  </p>
                  <a
                    href="https://newhorizoncollegeofengineering.in/exam-results/"
                    target="_blank" rel="noopener noreferrer"
                    className="flex sm:inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-base font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    View Results Portal <ExternalLink size={14} />
                  </a>
                </div>
              </SectionCard>
            )}

            {activeTab === 'application_form' && (
              <SectionCard icon={Download} accent="border-indigo-500"
                badge="bg-indigo-50 border-indigo-100 text-indigo-700"
                title="Application Forms"
                desc="Download necessary application forms for post-examination requests like re-evaluation, make-up exams, and transcripts.">
                
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Please submit filled applications directly to the COE office along with required attachments and fee receipts (if applicable).
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {DOWNLOAD_FORMS.map((form, i) => (
                    <a 
                      key={i} 
                      href={form.href} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-sm rounded-2xl p-5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                        <FileText size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-semibold text-base text-navy-900 leading-snug group-hover:text-indigo-700 transition-colors mb-1">
                          {form.title}
                        </h4>
                        <p className="text-sm text-slate-400">PDF Document</p>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-indigo-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'examination_forms' && (
              <SectionCard icon={Download} accent="border-indigo-500"
                badge="bg-indigo-50 border-indigo-100 text-indigo-700"
                title="Examination Forms"
                desc="Download examination registration and other related forms.">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {EXAMINATION_FORMS.map((form, i) => (
                    <a 
                      key={i} 
                      href={form.href} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-sm rounded-2xl p-5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                        <FileText size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-semibold text-base text-navy-900 leading-snug group-hover:text-indigo-700 transition-colors mb-1">
                          {form.title}
                        </h4>
                        <p className="text-sm text-slate-400">PDF Document</p>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-indigo-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'annual_report' && (
              <SectionCard icon={FileText} accent="border-rose-500"
                badge="bg-rose-50 border-rose-100 text-rose-700"
                title="Annual Report"
                desc="Annual reports of the Controller of Examinations detailing examination processes, pass percentages, and other statistics.">
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {ANNUAL_REPORTS.map((form, i) => (
                    <a 
                      key={i} 
                      href={form.href} 
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-4 bg-white border border-slate-100 hover:border-rose-200 hover:shadow-sm rounded-2xl p-5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-rose-50 group-hover:border-rose-100 transition-colors">
                        <FileText size={18} className="text-slate-400 group-hover:text-rose-600 transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-semibold text-base text-navy-900 leading-snug group-hover:text-rose-700 transition-colors mb-1">
                          {form.title}
                        </h4>
                        <p className="text-sm text-slate-400">PDF Document</p>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-rose-600 flex-shrink-0 transition-colors" />
                    </a>
                  ))}
                </div>
              </SectionCard>
            )}

            {activeTab === 'convocation' && (
              <SectionCard icon={GraduationCap} accent="border-purple-500"
                badge="bg-purple-50 border-purple-100 text-purple-700"
                title="Convocation & Graduation"
                desc="Information regarding graduation ceremonies, degree certificates, rank lists, and gold medals.">
                
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 sm:p-6 mb-5">
                  <p className="text-slate-600 text-base leading-relaxed mb-5">
                    The annual convocation ceremony is a proud moment for NHCE students. Find all details regarding the convocation application process, eligibility lists for degree awards, guidelines for the ceremony, and rank holder announcements.
                  </p>
                  <a
                    href="https://newhorizoncollegeofengineering.in/convocation/"
                    target="_blank" rel="noopener noreferrer"
                    className="flex sm:inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-base font-bold px-6 py-3 rounded-xl transition-colors"
                  >
                    Convocation Details <ExternalLink size={14} />
                  </a>
                </div>
              </SectionCard>
            )}

          </div>
          </AnimateIn>
        </div>
      </div>

    </div>
  );
}