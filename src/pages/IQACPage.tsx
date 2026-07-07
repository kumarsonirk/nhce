import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck, LayoutDashboard, FileText, MessageSquare,
  BookOpen, Users, ClipboardList, Award, Settings,
  ChevronRight, Mail, Phone, MapPin, CheckCircle2,
  TrendingUp, BarChart3, Layers, Zap, GraduationCap,
  FolderOpen, Database, ScrollText,
  Leaf, Globe, FileCheck, ClipboardCheck,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Nav ───────────────────────────────────────────────── */

const NAV = [
  { id: 'about',         label: 'About IQAC',             icon: ShieldCheck     },
  { id: 'governance',    label: 'Governance',              icon: Users           },
  { id: 'framework',     label: 'Quality Framework',       icon: Layers          },
  { id: 'feedback',      label: 'Feedback System',         icon: MessageSquare   },
  { id: 'audits',        label: 'Audits & Reviews',        icon: ClipboardCheck  },
  { id: 'initiatives',   label: 'IQAC Initiatives',        icon: Zap             },
  { id: 'accreditation', label: 'Accreditation & Ranking', icon: Award           },
  { id: 'repository',    label: 'Document Repository',     icon: FolderOpen      },
  { id: 'practices',     label: 'Best Practices',          icon: BookOpen        },
  { id: 'dashboard',     label: 'Quality Dashboard',       icon: LayoutDashboard },
  { id: 'policies',      label: 'Policies & SOPs',         icon: ScrollText      },
  { id: 'contact',       label: 'Contact IQAC',            icon: Mail            },
];

/* ─── Data ──────────────────────────────────────────────── */

const GOVERNANCE_ROWS = [
  { level: 'Chairperson IQAC',   role: 'Principal',             responsibility: 'Strategic leadership and policy direction'                              },
  { level: 'Dean IQAC',          role: 'Head of IQAC',          responsibility: 'Planning, implementation and monitoring of quality systems'              },
  { level: 'Associate Heads',    role: 'Operational Leadership', responsibility: 'Audits, feedback systems, documentation and analytics'                  },
  { level: 'IQAC Executives',    role: 'Coordination',          responsibility: 'Data collection, documentation and reporting'                            },
  { level: 'Dept. Coordinators', role: 'Department Linkage',    responsibility: 'Evidence, compliance and implementation at department level'             },
];

const PROCESS_STEPS = ['Plan', 'Implement', 'Monitor', 'Analyze', 'Improve', 'Document'];

const FRAMEWORK_CARDS = [
  { title: 'Academic Quality',       icon: GraduationCap, bg: 'bg-blue-50',   border: 'border-blue-100',   icon_bg: 'bg-blue-100',   icon_cl: 'text-blue-700',   dot: 'bg-blue-400',   items: ['OBE implementation', 'CO-PO mapping', 'Curriculum review', 'Teaching-learning enhancement'] },
  { title: 'Administrative Quality', icon: Settings,      bg: 'bg-violet-50', border: 'border-violet-100', icon_bg: 'bg-violet-100', icon_cl: 'text-violet-700', dot: 'bg-violet-400', items: ['Process standardization', 'Documentation compliance', 'Governance monitoring', 'Service improvement'] },
  { title: 'Teaching-Learning',      icon: BookOpen,      bg: 'bg-amber-50',  border: 'border-amber-100',  icon_bg: 'bg-amber-100',  icon_cl: 'text-amber-700',  dot: 'bg-amber-400',  items: ['Innovative methods', 'ICT integration', 'Continuous assessment', 'Student-centric learning'] },
];

const FEEDBACK_TYPES = ['Student Feedback', 'Faculty Feedback', 'Alumni Feedback', 'Employer Feedback', 'Graduate Exit Survey', 'Curriculum Feedback'];
const FEEDBACK_STEPS = ['Collection', 'Analysis', 'Report Generation', 'Action Taken', 'Monitoring'];

const AUDIT_ROWS = [
  { type: 'Academic Audit',    frequency: 'Semester-wise',     by: 'IQAC / Dean Academics', output: 'Audit Report + ATR'           },
  { type: 'Class Observation', frequency: 'Semester-wise',     by: 'IQAC + Subject Expert', output: 'CO-SAR + CO-ATR'             },
  { type: 'Department Audit',  frequency: 'Annual / Semester', by: 'IQAC',                  output: 'Compliance Report'           },
  { type: 'External Audit',    frequency: 'As scheduled',      by: 'External Expert',       output: 'Validation & Recommendations' },
];

const INITIATIVES = [
  { title: 'Quality Enhancement', icon: TrendingUp, bg: 'bg-blue-50',   border: 'border-blue-100',   icon_bg: 'bg-blue-100',   icon_cl: 'text-blue-700',   dot: 'bg-blue-400',   items: ['Internal Academic Audits', 'Class Observation System', 'OBE Workshops', 'Digital Documentation'] },
  { title: 'Capacity Building',   icon: Users,      bg: 'bg-emerald-50',border: 'border-emerald-100',icon_bg: 'bg-emerald-100',icon_cl: 'text-emerald-700',dot: 'bg-emerald-400',items: ['Faculty Development Programs', 'Staff training programs', 'Accreditation awareness sessions'] },
  { title: 'Digital Quality',     icon: Database,   bg: 'bg-violet-50', border: 'border-violet-100', icon_bg: 'bg-violet-100', icon_cl: 'text-violet-700', dot: 'bg-violet-400', items: ['ERP integration', 'Evidence repository', 'Data analytics and dashboards'] },
];

const ACCRED_CARDS = [
  { name: 'NAAC', icon: Award,        badge: 'bg-blue-50 border-blue-100 text-blue-700',     desc: 'Coordination of SSR, AQAR, compliance reports and evidence validation.'              },
  { name: 'NBA',  icon: CheckCircle2, badge: 'bg-emerald-50 border-emerald-100 text-emerald-700', desc: 'Support for OBE implementation, SAR preparation and criteria-wise evidence mapping.' },
  { name: 'NIRF', icon: BarChart3,    badge: 'bg-amber-50 border-amber-100 text-amber-700',   desc: 'Data collection, validation, submission and institutional benchmarking.'              },
];

const REPO_DOCS = [
  { label: 'AQAR',                   icon: FileText,      color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-100'   },
  { label: 'SSR / Accreditation',    icon: Award,         color: 'text-violet-600', bg: 'bg-violet-50',  border: 'border-violet-100' },
  { label: 'IQAC MoM',               icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-50',  border: 'border-indigo-100' },
  { label: 'Action Taken Reports',   icon: FileCheck,     color: 'text-emerald-600',bg: 'bg-emerald-50', border: 'border-emerald-100'},
  { label: 'Academic Audit Reports', icon: ClipboardCheck,color: 'text-sky-600',    bg: 'bg-sky-50',     border: 'border-sky-100'    },
  { label: 'Feedback Reports',       icon: MessageSquare, color: 'text-rose-600',   bg: 'bg-rose-50',    border: 'border-rose-100'   },
  { label: 'Policies',               icon: ScrollText,    color: 'text-amber-600',  bg: 'bg-amber-50',   border: 'border-amber-100'  },
  { label: 'SOPs',                   icon: BookOpen,      color: 'text-teal-600',   bg: 'bg-teal-50',    border: 'border-teal-100'   },
  { label: 'Best Practices',         icon: Award,         color: 'text-navy-600',   bg: 'bg-navy-50',    border: 'border-navy-100'   },
  { label: 'Green / Energy Audit',   icon: Leaf,          color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-100'  },
  { label: 'Gender Audit',           icon: Users,         color: 'text-pink-600',   bg: 'bg-pink-50',    border: 'border-pink-100'   },
  { label: 'Extension Reports',      icon: Globe,         color: 'text-cyan-600',   bg: 'bg-cyan-50',    border: 'border-cyan-100'   },
];

const KPIS = [
  { value: '04',  label: 'IQAC Meetings',       icon: ClipboardList, bg: 'bg-blue-50',   num: 'text-blue-800',   ic: 'text-blue-500'   },
  { value: '86%', label: 'Feedback Completion', icon: MessageSquare, bg: 'bg-emerald-50',num: 'text-emerald-800',ic: 'text-emerald-500' },
  { value: '72%', label: 'ATR Closure',         icon: CheckCircle2,  bg: 'bg-amber-50',  num: 'text-amber-800',  ic: 'text-amber-500'  },
  { value: '12',  label: 'FDPs / Workshops',    icon: GraduationCap, bg: 'bg-violet-50', num: 'text-violet-800', ic: 'text-violet-500' },
];

const ACCRED_READINESS = [
  { framework: 'NAAC', status: 'In Progress',     evidence: 'Partial / Complete', risk: 'amber' as const },
  { framework: 'NBA',  status: 'Department-wise', evidence: 'Partial / Complete', risk: 'amber' as const },
  { framework: 'NIRF', status: 'Under Validation',evidence: 'In Progress',        risk: 'amber' as const },
];

const FEEDBACK_DASHBOARD = [
  { type: 'Student Feedback',    frequency: 'Semester-wise', responses: '4,500', pct: 92, atr: 'green' as const },
  { type: 'Curriculum Feedback', frequency: 'Semester-wise', responses: '3,800', pct: 85, atr: 'amber' as const },
  { type: 'Alumni Feedback',     frequency: 'Annual',        responses: '650',   pct: 70, atr: 'amber' as const },
  { type: 'Employer Feedback',   frequency: 'Annual',        responses: '120',   pct: 60, atr: 'red'   as const },
];

const ATR_STYLE  = { green: 'bg-emerald-100 text-emerald-700', amber: 'bg-amber-100 text-amber-700', red: 'bg-red-100 text-red-700' };
const ATR_LABEL  = { green: 'Closed', amber: 'In Progress', red: 'Open' };

const POLICIES   = ['Feedback Policy', 'Research Policy', 'Green Campus Policy', 'Mentor-Mentee Policy', 'Examination Reforms Policy'];
const SOPS       = ['Academic Audit SOP', 'Class Observation SOP', 'Curriculum Feedback SOP', 'Documentation SOP', 'Evidence Management SOP'];
const INSPECTION = ['Year-wise filters', 'Department-wise filters', 'Download buttons', 'Evidence links', 'Risk flag column'];

/* ─── Reusable components (matching GovernancePage style) ─ */

function SectionCard({ icon: Icon, accent, badge, title, desc, children }: {
  icon: React.ElementType; accent: string; badge: string;
  title: string; desc: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-[fadeIn_0.3s_ease-out]">
      <div className={`border-l-4 ${accent} px-4 sm:px-6 pt-5 pb-3 sm:pt-6 sm:pb-4`}>
        <span className={`inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full border ${badge} mb-3`}>
          <Icon size={12} /> {title}
        </span>
        <h2 className="font-display font-bold text-navy-950 text-lg sm:text-2xl mb-2">{title}</h2>
        <p className="text-slate-500 text-base leading-relaxed max-w-2xl">{desc}</p>
      </div>
      <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-2">{children}</div>
    </div>
  );
}

function DataTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full text-sm sm:text-base min-w-[480px]">
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

/* ─── Page ──────────────────────────────────────────────── */

export default function IQACPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTab, setActiveTab] = useState('about');
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

      {/* ── Hero ── */}
      <HeroSection
        image="/hero1.png"
        imageWidth="w-[52%]"
        gradientWidth="w-3/4"
        contentMaxWidth="lg:max-w-[50%]"
        badge="Internal Quality Assurance Cell · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="IQAC"
        headingGhost="Quality Assured"
        description="Institutionalizing Quality. Strengthening Outcomes. Sustaining Excellence — through structured processes, audits, feedback and accreditation support."
        button={{ label: 'View AQAR', onClick: () => selectTab('repository') }}
        secondaryButton={{ label: 'Quality Dashboard', onClick: () => selectTab('dashboard') }}
      />

      {/* ── Mobile pills ── */}
      <AnimateIn variant="fade-up">
        <div className="lg:hidden bg-white border-b border-slate-100">
          <div className="overflow-x-auto no-scrollbar px-4 py-3">
            <div className="flex gap-2 whitespace-nowrap">
              {NAV.map((s, i) => (
                <button key={s.id} onClick={() => selectTab(s.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 ${
                    activeTab === s.id ? 'bg-navy-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}>
                  <span className="text-xs font-black opacity-60">{i + 1}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* ── Main layout ── */}
      <div className="container-wide py-6 sm:py-10 lg:py-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* ── Sidebar ── */}
          <AnimateIn variant="fade-right" className="min-w-0">
            <aside className="hidden lg:block sticky top-24 self-start">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Sections</p>
                <nav className="space-y-0.5">
                  {NAV.map((s, i) => {
                    const Icon = s.icon;
                    const active = activeTab === s.id;
                    return (
                      <button key={s.id} onClick={() => selectTab(s.id)}
                        className={`w-full flex items-center gap-3 px-3 py-4 rounded-xl text-base font-medium transition-all text-left ${
                          active ? 'bg-navy-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-navy-900'
                        }`}>
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

          {/* ── Content ── */}
          <AnimateIn variant="fade-up" delay={80} className="min-w-0">
            <div className="min-w-0" ref={contentRef}>

              {/* ── ABOUT ── */}
              {activeTab === 'about' && (
                <SectionCard icon={ShieldCheck} accent="border-blue-500"
                  badge="bg-blue-50 border-blue-100 text-blue-700"
                  title="About IQAC"
                  desc="The Internal Quality Assurance Cell (IQAC) functions as the central mechanism for institutionalizing quality assurance and continuous improvement — aligning with NAAC, NBA and OBE frameworks.">
                  <div className="grid sm:grid-cols-2 gap-4 mb-5">
                    <div className="bg-navy-950 rounded-xl p-5">
                      <p className="text-xs font-black tracking-[3px] uppercase text-blue-400 mb-3">Vision</p>
                      <p className="text-white/80 text-base leading-relaxed">
                        To institutionalize a culture of quality, innovation and continuous improvement, ensuring academic excellence and holistic institutional development.
                      </p>
                    </div>
                    <div className="bg-blue-600 rounded-xl p-5">
                      <p className="text-xs font-black tracking-[3px] uppercase text-blue-100 mb-3">Mission</p>
                      <ul className="space-y-2">
                        {['Develop robust quality assurance systems', 'Promote outcome-based education', 'Enable data-driven decision-making', 'Support accreditation and ranking frameworks', 'Enhance stakeholder satisfaction'].map(m => (
                          <li key={m} className="flex items-start gap-2 text-white/85 text-sm">
                            <CheckCircle2 size={13} className="text-blue-200 mt-0.5 flex-shrink-0" /> {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl border border-slate-100 p-5">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Objectives</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {['Develop structured academic and administrative processes', 'Monitor teaching-learning effectiveness', 'Strengthen feedback mechanisms and analysis', 'Conduct regular internal audits', 'Facilitate accreditation and compliance'].map((o, i) => (
                        <div key={o} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <p className="text-slate-600 text-base leading-snug">{o}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── GOVERNANCE ── */}
              {activeTab === 'governance' && (
                <SectionCard icon={Users} accent="border-indigo-500"
                  badge="bg-indigo-50 border-indigo-100 text-indigo-700"
                  title="Governance"
                  desc="IQAC operates through a structured governance framework with clearly defined roles and responsibilities to ensure effective quality implementation and monitoring.">
                  <DataTable
                    cols={['Sl.', 'Level', 'Role', 'Responsibility']}
                    rows={GOVERNANCE_ROWS.map((r, i) => [(i + 1).toString(), r.level, r.role, r.responsibility])}
                  />
                </SectionCard>
              )}

              {/* ── FRAMEWORK ── */}
              {activeTab === 'framework' && (
                <SectionCard icon={Layers} accent="border-violet-500"
                  badge="bg-violet-50 border-violet-100 text-violet-700"
                  title="Quality Framework"
                  desc="IQAC follows a structured Continuous Quality Improvement cycle for academic and administrative excellence.">
                  {/* Process flow */}
                  <div className="flex flex-wrap gap-2 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    {PROCESS_STEPS.map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                          <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          <span className="text-sm font-semibold text-navy-900">{step}</span>
                        </div>
                        {i < PROCESS_STEPS.length - 1 && <ChevronRight size={14} className="text-slate-300 flex-shrink-0" />}
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {FRAMEWORK_CARDS.map((card) => (
                      <div key={card.title} className={`${card.bg} border ${card.border} rounded-xl p-5`}>
                        <div className={`w-10 h-10 rounded-xl ${card.icon_bg} flex items-center justify-center mb-4`}>
                          <card.icon size={20} className={card.icon_cl} />
                        </div>
                        <p className="font-bold text-navy-900 text-base mb-3">{card.title}</p>
                        <ul className="space-y-2">
                          {card.items.map(item => (
                            <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                              <div className={`w-1.5 h-1.5 rounded-full ${card.dot} mt-1.5 flex-shrink-0`} /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* ── FEEDBACK ── */}
              {activeTab === 'feedback' && (
                <SectionCard icon={MessageSquare} accent="border-rose-500"
                  badge="bg-rose-50 border-rose-100 text-rose-700"
                  title="Feedback System"
                  desc="A comprehensive stakeholder feedback system to capture inputs and drive continuous improvement through Action Taken Reports.">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5">
                      <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-4">Feedback Types</p>
                      <ul className="space-y-2.5">
                        {FEEDBACK_TYPES.map((t, i) => (
                          <li key={t} className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-white border border-rose-200 text-rose-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                            <span className="text-sm text-slate-700 font-medium">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-navy-950 rounded-xl p-5">
                      <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-4">Process</p>
                      <div className="flex flex-col gap-3">
                        {FEEDBACK_STEPS.map((step, i) => (
                          <div key={step} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</div>
                              {i < FEEDBACK_STEPS.length - 1 && <div className="w-px h-3 bg-white/10 my-0.5" />}
                            </div>
                            <p className="text-white/75 text-sm font-medium pt-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Output</p>
                      <p className="text-slate-600 text-sm leading-relaxed flex-1">
                        Feedback outcomes are converted into actionable improvements and monitored through ATR closure tracking.
                      </p>
                      <div className="mt-4 flex items-start gap-3 bg-white rounded-lg p-3 border border-slate-100">
                        <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-500 leading-relaxed">ATR = Action Taken Report — all improvements are tracked to closure</p>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── AUDITS ── */}
              {activeTab === 'audits' && (
                <SectionCard icon={ClipboardCheck} accent="border-amber-500"
                  badge="bg-amber-50 border-amber-100 text-amber-700"
                  title="Audits & Reviews"
                  desc="Systematic audit mechanisms to ensure evidence-based compliance across all academic and administrative functions.">
                  <DataTable
                    cols={['Sl.', 'Audit Type', 'Frequency', 'Conducted By', 'Output']}
                    rows={AUDIT_ROWS.map((r, i) => [(i + 1).toString(), r.type, r.frequency, r.by, r.output])}
                  />
                </SectionCard>
              )}

              {/* ── INITIATIVES ── */}
              {activeTab === 'initiatives' && (
                <SectionCard icon={Zap} accent="border-emerald-500"
                  badge="bg-emerald-50 border-emerald-100 text-emerald-700"
                  title="IQAC Initiatives"
                  desc="Structured programmes to enhance quality, build institutional capacity and harness digital tools for quality management.">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {INITIATIVES.map((init) => (
                      <div key={init.title} className={`${init.bg} border ${init.border} rounded-xl p-5`}>
                        <div className={`w-10 h-10 rounded-xl ${init.icon_bg} flex items-center justify-center mb-4`}>
                          <init.icon size={20} className={init.icon_cl} />
                        </div>
                        <p className="font-bold text-navy-900 text-base mb-3">{init.title}</p>
                        <ul className="space-y-2">
                          {init.items.map(item => (
                            <li key={item} className="flex items-start gap-2 text-slate-600 text-sm">
                              <div className={`w-1.5 h-1.5 rounded-full ${init.dot} mt-1.5 flex-shrink-0`} /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* ── ACCREDITATION ── */}
              {activeTab === 'accreditation' && (
                <SectionCard icon={Award} accent="border-cyan-500"
                  badge="bg-cyan-50 border-cyan-100 text-cyan-700"
                  title="Accreditation & Ranking"
                  desc="IQAC coordinates all major accreditation and ranking frameworks to ensure institutional compliance, credibility and continuous quality elevation.">
                  <div className="grid sm:grid-cols-3 gap-4">
                    {ACCRED_CARDS.map((card) => (
                      <div key={card.name} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                          <card.icon size={22} className="text-navy-700" />
                        </div>
                        <p className="font-display font-black text-2xl text-navy-950 mb-1">{card.name}</p>
                        <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${card.badge} mb-3`}>{card.name} Framework</span>
                        <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      All accreditation evidence is compiled, validated and submitted by IQAC in coordination with department coordinators and the Dean R&D.
                    </p>
                  </div>
                </SectionCard>
              )}

              {/* ── REPOSITORY ── */}
              {activeTab === 'repository' && (
                <SectionCard icon={FolderOpen} accent="border-slate-500"
                  badge="bg-slate-50 border-slate-200 text-slate-700"
                  title="Document Repository"
                  desc="Quick access to audit-ready documentation across all quality categories — from AQAR and SSR to feedback reports, best practices and audit records.">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {REPO_DOCS.map((doc) => (
                      <div key={doc.label} className={`group ${doc.bg} border ${doc.border} rounded-xl p-4 flex flex-col items-center gap-3 text-center cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all duration-200`}>
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                          <doc.icon size={18} className={doc.color} />
                        </div>
                        <p className="text-xs font-semibold text-slate-700 leading-snug">{doc.label}</p>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* ── BEST PRACTICES ── */}
              {activeTab === 'practices' && (
                <SectionCard icon={BookOpen} accent="border-teal-500"
                  badge="bg-teal-50 border-teal-100 text-teal-700"
                  title="Best Practices"
                  desc="Systematically documented best practices that showcase NHCE's distinctive academic and administrative strengths, compiled using a structured 7-step format.">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Best Practice Format</p>
                      <div className="space-y-2.5">
                        {['Title', 'Objective', 'Context', 'Practice', 'Evidence of Success', 'Problems Encountered', 'Impact'].map((step, i) => (
                          <div key={step} className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                            <p className="text-sm font-medium text-slate-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-teal-700 rounded-xl p-5">
                      <p className="text-xs font-bold text-teal-200 uppercase tracking-widest mb-4">Focus Areas</p>
                      <div className="space-y-4">
                        {['Institutional Best Practices', 'Department-wise Best Practices', 'Outcome and Impact Analysis', 'Institutional Distinctiveness'].map((f, i) => (
                          <div key={f} className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-white/15 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                            <p className="text-white/80 text-sm leading-relaxed">{f}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── DASHBOARD ── */}
              {activeTab === 'dashboard' && (
                <SectionCard icon={LayoutDashboard} accent="border-navy-500"
                  badge="bg-navy-50 border-navy-100 text-navy-700"
                  title="Quality Dashboard"
                  desc="Live monitoring of institutional quality processes, audits, feedback, accreditation readiness and continuous improvement — Academic Year 2025–26.">
                  {/* KPIs */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {KPIS.map((kpi) => (
                      <div key={kpi.label} className={`${kpi.bg} rounded-xl p-5 text-center border border-slate-100`}>
                        <kpi.icon size={20} className={`${kpi.ic} mx-auto mb-2`} />
                        <p className={`text-3xl font-black ${kpi.num} leading-none mb-1`}>{kpi.value}</p>
                        <p className="text-slate-500 text-sm font-medium leading-tight">{kpi.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Accreditation Readiness */}
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Accreditation Readiness</p>
                  <div className="overflow-x-auto rounded-xl border border-slate-100 mb-5">
                    <table className="w-full text-sm min-w-[480px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          {['Framework', 'Status', 'Evidence', 'Risk', 'Action'].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-bold text-navy-900 text-xs uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ACCRED_READINESS.map((row, i) => (
                          <tr key={row.framework} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                            <td className="px-4 py-3 font-black text-navy-950 text-base">{row.framework}</td>
                            <td className="px-4 py-3 text-slate-700 font-medium">{row.status}</td>
                            <td className="px-4 py-3 text-slate-700 font-medium">{row.evidence}</td>
                            <td className="px-4 py-3"><span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">Medium</span></td>
                            <td className="px-4 py-3">
                              <button className="text-navy-600 text-sm font-semibold hover:text-navy-800 inline-flex items-center gap-1 transition-colors">
                                View Files <ChevronRight size={12} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Feedback Dashboard */}
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Feedback Dashboard</p>
                  <div className="overflow-x-auto rounded-xl border border-slate-100">
                    <table className="w-full text-sm min-w-[560px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          {['Feedback Type', 'Frequency', 'Responses', 'Completion', 'ATR Status'].map(h => (
                            <th key={h} className="text-left px-4 py-3 font-bold text-navy-900 text-xs uppercase tracking-wide">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {FEEDBACK_DASHBOARD.map((row, i) => (
                          <tr key={row.type} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                            <td className="px-4 py-3 font-bold text-slate-800">{row.type}</td>
                            <td className="px-4 py-3 text-slate-700 font-medium">{row.frequency}</td>
                            <td className="px-4 py-3 font-bold text-navy-800">{row.responses}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-20 bg-slate-200 rounded-full h-1.5">
                                  <div className="bg-navy-600 h-1.5 rounded-full" style={{ width: `${row.pct}%` }} />
                                </div>
                                <span className="text-sm font-bold text-navy-900">{row.pct}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ATR_STYLE[row.atr]}`}>{ATR_LABEL[row.atr]}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </SectionCard>
              )}

              {/* ── POLICIES ── */}
              {activeTab === 'policies' && (
                <SectionCard icon={ScrollText} accent="border-orange-500"
                  badge="bg-orange-50 border-orange-100 text-orange-700"
                  title="Policies & SOPs"
                  desc="Documented policies and standard operating procedures that govern all quality-related activities at NHCE, with built-in inspection and filtering features.">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Policies</p>
                      <ul className="space-y-2.5">
                        {POLICIES.map((p, i) => (
                          <li key={p} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                            <p className="text-sm text-slate-700 font-medium">{p}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-navy-950 rounded-xl p-5">
                      <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-4">SOPs</p>
                      <ul className="space-y-2.5">
                        {SOPS.map((s, i) => (
                          <li key={s} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-white/10 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                            <p className="text-sm text-white/75 font-medium">{s}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                      <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">Inspection Features</p>
                      <ul className="space-y-2.5">
                        {INSPECTION.map(f => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-slate-700 font-medium">{f}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SectionCard>
              )}

              {/* ── CONTACT ── */}
              {activeTab === 'contact' && (
                <SectionCard icon={Mail} accent="border-green-500"
                  badge="bg-green-50 border-green-100 text-green-700"
                  title="Contact IQAC"
                  desc="Reach out to the IQAC office for suggestions, quality improvement inputs, accreditation queries or feedback submissions.">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-6">
                      <p className="font-bold text-navy-950 text-base mb-0.5">Internal Quality Assurance Cell</p>
                      <p className="text-slate-400 text-sm mb-5 font-medium">New Horizon College of Engineering</p>
                      <div className="space-y-3.5">
                        {[
                          { icon: Mail,   label: 'iqac@newhorizonindia.edu',         href: 'mailto:iqac@newhorizonindia.edu', sub: 'Email for queries' },
                          { icon: Phone,  label: '[Contact number to be updated]',   href: undefined,                        sub: 'IQAC office'       },
                          { icon: MapPin, label: 'IQAC Office, NHCE Campus',         href: undefined,                        sub: 'Marathalli, Bengaluru' },
                        ].map(f => (
                          <div key={f.label} className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0">
                              <f.icon size={15} className="text-navy-600" />
                            </div>
                            <div>
                              {f.href
                                ? <a href={f.href} className="text-sm font-semibold text-navy-900 hover:text-navy-600 transition-colors">{f.label}</a>
                                : <p className="text-sm font-semibold text-navy-900">{f.label}</p>}
                              <p className="text-xs text-slate-400 mt-0.5">{f.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-navy-950 rounded-xl p-6 flex flex-col">
                      <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-3">Quality Improvement Inputs</p>
                      <p className="text-white/60 text-sm leading-relaxed flex-1">
                        Suggestions and quality improvement inputs from stakeholders — students, faculty, alumni and employers — are actively welcomed to drive continuous institutional improvement.
                      </p>
                      <a href="mailto:iqac@newhorizonindia.edu"
                        className="mt-6 self-start inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                        Send Feedback <ChevronRight size={13} />
                      </a>
                    </div>
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
