import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Download, FileText, ExternalLink, BookOpen, Users, DollarSign, BarChart2 } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const GOVERNANCE_DOCS = [
  { title: 'Structure of Governing Body and Norms',      year: '2024',  icon: '🏛️' },
  { title: 'Structure of Academic Council and Norms',    year: '2024',  icon: '🎓' },
  { title: 'Structure of Board of Studies (BOS) and Norms', year: '2024', icon: '📚' },
  { title: 'Structure of Finance Committee and Norms',   year: '2024',  icon: '💰' },
];

const FINANCIAL_YEARS = [
  '2024–25', '2023–24', '2022–23', '2021–22', '2020–21',
  '2019–20', '2018–19', '2017–18', '2016–17',
];

const GB_MEETINGS = [
  23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10,
].map(n => `${n}${n === 23 ? 'rd' : n === 22 ? 'nd' : n === 21 ? 'st' : 'th'} Governing Body Meeting Proceedings`);

const AC_MEETINGS = [
  27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15,
].map(n => `${n}${n === 21 ? 'st' : n === 22 ? 'nd' : n === 23 ? 'rd' : 'th'} Academic Council Meeting Proceedings`);

const BOS_DEPTS = [
  { dept: 'Applied Science',                       code: 'ASC'   },
  { dept: 'Artificial Intelligence & ML',           code: 'AIML'  },
  { dept: 'Computer Engineering',                   code: 'CE'    },
  { dept: 'Computer Science and Engineering',       code: 'CSE'   },
  { dept: 'Mechanical Engineering',                 code: 'ME'    },
  { dept: 'Electrical and Electronics Engineering', code: 'EEE'   },
  { dept: 'Electronics & Communication Engineering',code: 'ECE'   },
  { dept: 'Computer Engineering – Data Science',    code: 'CE-DS' },
  { dept: 'Information Science & Engineering',      code: 'ISE'   },
  { dept: 'Master of Business Administration',      code: 'MBA'   },
  { dept: 'Master of Computer Applications',        code: 'MCA'   },
];

const MAIN_DISCLOSURE_URL = 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2024/06/Mandatory-Disclosure-2024-25.pdf';
const REFERENCE_URL = 'https://newhorizoncollegeofengineering.in/mandatory-disclosure/';

/* ─── Reusable document card ─────────────────────────────────── */

function DocCard({ title, subtitle, icon: Icon, href }: { title: string; subtitle?: string; icon?: React.ElementType; href: string }) {
  const I = Icon ?? FileText;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-white border border-slate-100 hover:border-navy-200 hover:shadow-sm rounded-xl px-4 py-3.5 transition-all group"
    >
      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-navy-50 group-hover:border-navy-100 transition-colors">
        <I size={15} className="text-slate-400 group-hover:text-navy-700 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base text-navy-900 leading-snug group-hover:text-blue-700 transition-colors">{title}</p>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <Download size={13} className="text-slate-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
    </a>
  );
}

/* ─── Section wrapper ────────────────────────────────────────── */

function Section({
  emoji, accent, title, desc, count, children,
}: {
  emoji: string; accent: string; title: string; desc: string; count?: string; children: React.ReactNode;
}) {
  return (
    <div className={`bg-white rounded-2xl border-l-4 ${accent} border border-slate-100 shadow-sm overflow-hidden`}>
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-start gap-3">
            <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
            <h3 className="font-display font-bold text-navy-950 text-base sm:text-lg leading-tight">{title}</h3>
          </div>
          {count && (
            <span className="text-sm font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">{count}</span>
          )}
        </div>
        <p className="text-slate-500 text-base leading-relaxed">{desc}</p>
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function MandatoryDisclosurePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white sm:min-h-screen sm:flex sm:items-center">
        <img src="/campus.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" aria-hidden="true" />
        <div className="relative z-10 container-wide pt-28 pb-10 sm:py-16 w-full">
          <div className="flex items-center gap-2 text-base text-slate-400 mb-4">
            <Link to="/governance" className="hover:text-navy-900 transition-colors">Governance</Link>
            <ChevronRight size={14} />
            <span className="text-navy-900 font-semibold">Mandatory Disclosure</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimateIn variant="fade-right">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full mb-5">
                📋 Mandatory Disclosure · AICTE · NHCE
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-navy-950 leading-tight mb-4">
                Mandatory<br />
                <span className="text-rose-600">Disclosure</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-6 max-w-md">
                Complete AICTE-mandated institutional transparency documents — governance structure, financial records, council proceedings, and Board of Studies minutes for all academic departments.
              </p>
              <div className="flex flex-wrap gap-3 mb-5">
                <a
                  href={MAIN_DISCLOSURE_URL}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  <Download size={14} /> Download Full Disclosure 2024–25
                </a>
                <a
                  href={REFERENCE_URL}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-base font-semibold px-5 py-2.5 rounded-full transition-all"
                >
                  Official Website <ExternalLink size={13} />
                </a>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 text-center">
                {[
                  { num: '47+', label: 'Documents' },
                  { num: '38',  label: 'Meeting Minutes' },
                  { num: '9',   label: 'Financial Years' },
                  { num: '11',  label: 'BOS Departments' },
                ].map(s => (
                  <div key={s.label} className="bg-rose-50 border border-rose-100 rounded-xl px-4 py-2.5">
                    <p className="font-black text-rose-700 text-xl leading-none">{s.num}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            </AnimateIn>
            <AnimateIn variant="fade-left" delay={120}>
            <div className="hidden lg:block">
              <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 space-y-3">
                {[
                  { icon: Users,       label: 'Governance Structure', sub: 'Norms for all bodies'              },
                  { icon: FileText,    label: 'Mandatory Disclosure',  sub: 'AICTE 2024–25 document'           },
                  { icon: DollarSign,  label: 'Financial Statements',  sub: '2016–17 to 2024–25'               },
                  { icon: BarChart2,   label: 'Council Proceedings',   sub: '23 GB + 27 AC meetings'           },
                  { icon: BookOpen,    label: 'Board of Studies',       sub: '11 departments · minutes'         },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-rose-100">
                    <item.icon size={16} className="text-rose-500 flex-shrink-0" />
                    <div>
                      <p className="text-base font-bold text-navy-900 leading-none">{item.label}</p>
                      <p className="text-sm text-slate-400 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── Content sections ── */}
      <div className="container-wide py-10 space-y-6">

        {/* 1. Governance Structure */}
        <AnimateIn variant="fade-up">
        <Section emoji="🏛️" accent="border-indigo-500" title="Governance Structure"
          desc="Official norms and composition for all statutory governance bodies as per VTU and AICTE guidelines." count="4 Documents">
          <div className="grid sm:grid-cols-2 gap-3">
            {GOVERNANCE_DOCS.map(d => (
              <DocCard key={d.title} title={d.title} subtitle={`Updated: ${d.year}`} icon={FileText} href={REFERENCE_URL} />
            ))}
          </div>
        </Section>
        </AnimateIn>

        {/* 2. Mandatory Disclosure */}
        <AnimateIn variant="fade-up" delay={60}>
        <Section emoji="📋" accent="border-rose-500" title="Mandatory Disclosure Document"
          desc="The principal AICTE mandatory disclosure containing all institutional information as mandated for the current academic year.">
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={MAIN_DISCLOSURE_URL}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl px-5 py-4 transition-colors group flex-1"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <FileText size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base leading-snug">Mandatory Disclosure 2024–25</p>
                <p className="text-white/60 text-sm mt-0.5">AICTE | NHCE | Updated April 2024</p>
              </div>
              <Download size={16} className="opacity-60 flex-shrink-0" />
            </a>
          </div>
        </Section>
        </AnimateIn>

        {/* 3. Financial Statements */}
        <AnimateIn variant="fade-up" delay={80}>
        <Section emoji="📊" accent="border-emerald-500" title="Financial Statements"
          desc="Audited annual financial statements submitted to regulatory authorities, available for 9 consecutive years." count={`${FINANCIAL_YEARS.length} Years`}>
          <div className="grid sm:grid-cols-3 gap-3">
            {FINANCIAL_YEARS.map(y => (
              <DocCard key={y} title={`Financial Statement ${y}`} subtitle="Annual Audited Report" icon={DollarSign} href={REFERENCE_URL} />
            ))}
            <DocCard title="Accreditation Status Document" subtitle="NAAC · NBA · 2024" icon={FileText} href={REFERENCE_URL} />
          </div>
        </Section>
        </AnimateIn>

        {/* 4. Governing Body Meetings */}
        <AnimateIn variant="fade-up" delay={100}>
        <Section emoji="🏢" accent="border-blue-500" title="Governing Body Meeting Proceedings"
          desc="Official minutes and proceedings of all Governing Body meetings, documenting policy decisions and institutional governance actions." count={`${GB_MEETINGS.length} Meetings`}>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {GB_MEETINGS.map((m, i) => (
              <DocCard key={i} title={m} subtitle={i === 0 ? 'Most Recent · 2026' : i === 1 ? '2025' : '2020–2025'} icon={Users} href={REFERENCE_URL} />
            ))}
          </div>
        </Section>
        </AnimateIn>

        {/* 5. Academic Council Meetings */}
        <AnimateIn variant="fade-up" delay={100}>
        <Section emoji="🎓" accent="border-violet-500" title="Academic Council Meeting Proceedings"
          desc="Minutes and resolutions from all Academic Council meetings, covering curriculum decisions, examination reforms, and academic policy changes." count={`${AC_MEETINGS.length} Meetings`}>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {AC_MEETINGS.map((m, i) => (
              <DocCard key={i} title={m} subtitle={i === 0 ? 'Most Recent' : 'Previous Meetings'} icon={BookOpen} href={REFERENCE_URL} />
            ))}
          </div>
        </Section>
        </AnimateIn>

        {/* 6. BOS Minutes */}
        <AnimateIn variant="fade-up" delay={100}>
        <Section emoji="📚" accent="border-amber-500" title="Board of Studies (BOS) Minutes"
          desc="Department-wise Board of Studies meeting minutes documenting syllabus revisions, course approvals, and academic recommendations." count={`${BOS_DEPTS.length} Departments`}>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {BOS_DEPTS.map(d => (
              <a
                key={d.code}
                href={REFERENCE_URL}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white border border-slate-100 hover:border-amber-200 hover:shadow-sm rounded-xl px-4 py-3.5 transition-all group"
              >
                <span className="w-11 text-center text-sm font-black text-amber-700 bg-amber-50 border border-amber-100 px-2 py-1.5 rounded-lg flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                  {d.code}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base text-navy-900 leading-snug group-hover:text-blue-700 transition-colors">{d.dept}</p>
                  <p className="text-sm text-slate-400 mt-0.5">BOS Meeting Minutes</p>
                </div>
                <Download size={13} className="text-slate-300 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
              </a>
            ))}
          </div>
          <DocCard title="Service Rules Document" subtitle="NHCE Service Rules · 2019 (Revised 2021)" icon={FileText} href={REFERENCE_URL} />
        </Section>
        </AnimateIn>

        {/* Footer CTA */}
        <AnimateIn variant="scale" delay={80}>
        <div className="bg-navy-950 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-display font-bold text-white text-xl mb-1">Need Official Documents?</p>
            <p className="text-white/60 text-base">All documents are available for download on the official NHCE website. For queries, contact the administrative office.</p>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href={MAIN_DISCLOSURE_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-base font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              <Download size={14} /> Download PDF
            </a>
            <a
              href={REFERENCE_URL}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-base font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              Official Website <ExternalLink size={13} />
            </a>
          </div>
        </div>
        </AnimateIn>

      </div>
    </div>
  );
}
