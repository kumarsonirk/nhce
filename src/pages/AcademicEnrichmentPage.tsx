import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, GraduationCap, DollarSign, Globe, BookOpen,
  Award, Users, ChevronDown, ExternalLink, Zap, Cpu, Cog, TrendingUp,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const MINOR_TRACKS = [
  {
    id: 'computing', label: 'Computing & IT', Icon: Cpu, color: 'blue',
    accent: 'border-blue-500', badge: 'bg-blue-50 border-blue-100 text-blue-700',
    programs: [
      'Programming', 'System', 'Data Science', 'Artificial Intelligence',
      'Foundation for Computing', 'VLSI Design', 'Communication and Signal Processing',
    ],
  },
  {
    id: 'electrical', label: 'Electrical & Power', Icon: Zap, color: 'amber',
    accent: 'border-amber-500', badge: 'bg-amber-50 border-amber-100 text-amber-700',
    programs: [
      'Power Systems and Power Electronics', 'Control and Instrumentation', 'Photonics',
    ],
  },
  {
    id: 'mechanical', label: 'Mechanical Engineering', Icon: Cog, color: 'emerald',
    accent: 'border-emerald-500', badge: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    programs: [
      'Computational Engineering', 'Computational Thermo Fluids', 'Advanced Mechanics',
      'Propulsion', 'Manufacturing Processes and Technology', 'Product Design',
      'Advanced Dynamics and Vibration', 'Computational Mechanics', 'Robotics',
    ],
  },
  {
    id: 'business', label: 'Business & Economics', Icon: TrendingUp, color: 'violet',
    accent: 'border-violet-500', badge: 'bg-violet-50 border-violet-100 text-violet-700',
    programs: [
      'Marketing', 'Operations', 'Patents and Intellectual Property',
      'Economics', 'Managerial Economics', 'Economics and Finance',
    ],
  },
];

const SCHOLARSHIP_SECTIONS = [
  {
    id: 'ug', emoji: '🎓', title: 'UG Merit Scholarships (AY 2026–27)',
    desc: 'For First Year B.E. students based on 10+2 performance.',
    accent: 'border-blue-500',
    table: {
      cols: ['Criteria', 'NHCE Students', 'Students from Other Colleges'],
      rows: [['85%+ in II PUC / 12th', '₹25,000', '₹20,000']],
    },
  },
  {
    id: 'kea', emoji: '🏆', title: 'KEA / CET Rank Scholarship (Code: E099)',
    desc: 'Fee concessions awarded based on KCET rank.',
    accent: 'border-indigo-500',
    table: {
      cols: ['CET Rank', 'Concession'],
      rows: [
        ['1 – 1,000', '100% fee waiver'],
        ['1,001 – 3,000', '50% fee concession'],
        ['3,001 – 5,000', '25% fee concession'],
      ],
    },
  },
  {
    id: 'pg', emoji: '📘', title: 'PG Merit Scholarships',
    desc: 'For First Year MBA & MCA students based on degree percentage.',
    accent: 'border-violet-500',
    table: {
      cols: ['Criteria', 'NHCE Students', 'Students from Other Colleges'],
      rows: [['Above 75% in Degree', '₹20,000', '₹15,000']],
    },
  },
  {
    id: 'sports', emoji: '🏅', title: 'Sports Scholarships',
    desc: 'Awarded to outstanding sports achievers at State or National level. Valid for 1 academic year.',
    accent: 'border-emerald-500',
    table: {
      cols: ['Achievement', 'NHCE Students', 'Students from Other Colleges'],
      rows: [
        ['National Level Winner', '₹25,000', '₹20,000'],
        ['State Level Winner', '₹20,000', '₹15,000'],
      ],
    },
  },
];

const PARTNER_UNIVERSITIES = [
  { name: 'ESIGELEC Rouen',      type: 'Grand École — French Ivy League',        city: 'Rouen'    },
  { name: 'CESI Rouen',          type: 'Graduate School of Engineering',           city: 'Rouen'    },
  { name: 'University of Rouen', type: 'Public Research University',               city: 'Rouen'    },
  { name: 'University of Le Havre', type: 'Multidisciplinary University',          city: 'Le Havre' },
  { name: 'INSA Rouen',          type: 'National Institute of Applied Sciences',   city: 'Rouen'    },
  { name: 'ISPA Alençon',        type: 'Engineering School',                       city: 'Alençon'  },
];

const PARTICIPATION = [
  { year: '2025–26', count: 4,  detail: 'Across 2 universities' },
  { year: '2024–25', count: 4,  detail: 'Across 2 universities' },
  { year: '2023–24', count: 15, detail: '6 at CESI · 8 at ESIGELEC · 1 internship' },
  { year: '2018–19', count: 45, detail: '11-week exchange programme (inaugural cohort)' },
];

const ELIGIBLE_BRANCHES = ['ECE', 'CSE', 'ISE', 'AI & ML', 'Civil Engineering', 'EEE', 'Aerospace Engineering'];

/* ─── Sub-components ─────────────────────────────────────────── */

function ScholarshipTable({ cols, rows }: { cols: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 mt-4">
      <table className="w-full text-xs sm:text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            {cols.map(c => (
              <th key={c} className="text-left px-4 py-2.5 font-bold text-navy-900 text-sm uppercase tracking-wide whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-slate-50 even:bg-slate-50/40">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-700 font-medium">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-navy-900 text-base sm:text-lg">{item.title}</span>
            <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="px-4 pb-4">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function AcademicEnrichmentPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeTrack, setActiveTrack] = useState('computing');

  const currentTrack = MINOR_TRACKS.find(t => t.id === activeTrack)!;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <HeroSection
        image="/Academic_enrichment_hero.jpg"
        badge="Academic Enrichment · NHCE"
        headingSmall="Beyond the Curriculum"
        headingMain="Enrich Your"
        headingGhost="Academic Journey"
        description="Minor Degree Programs, Scholarships, and Study Abroad Initiatives — designed to expand your expertise, support your finances, and connect you to the world."
        button={{ label: 'Explore Programs', href: '#minor-degree' }}
        secondaryButton={{ label: 'Apply Now', href: 'https://newhorizoncollegeofengineering.in/admissions/', }}
      />

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-wide py-3 flex items-center gap-2 text-base text-slate-400">
          <Link to="/admissions" className="hover:text-navy-900 transition-colors">Admissions</Link>
          <ChevronRight size={14} />
          <span className="text-navy-900 font-semibold">Academic Enrichment Programs</span>
        </div>
      </div>

      {/* ── Intro ── */}
      <div className="bg-white border-b border-slate-100">
        <AnimateIn variant="fade-up">
        <div className="container-wide py-10 max-w-3xl">
          <p className="text-slate-600 text-lg sm:text-xl leading-relaxed">
            At <strong className="text-navy-900">New Horizon College of Engineering</strong>, students are provided with opportunities that extend beyond the regular curriculum. Through <strong>Minor Degree Programs</strong>, <strong>Scholarships</strong>, and <strong>Study Abroad Initiatives</strong>, students can enhance their academic profile, gain global exposure, and receive financial support for their educational journey.
          </p>
        </div>
        </AnimateIn>
      </div>

      {/* ── 3 Feature Cards ── */}
      <div className="container-wide py-10">
        <AnimateIn variant="fade-up">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              emoji: '🎓', color: 'blue', title: 'Specialized Learning',
              sub: 'Minor Degree Programs',
              desc: '25 programs across 4 tracks — Computing, Electrical, Mechanical & Business to complement your primary degree.',
              href: '#minor-degree',
            },
            {
              emoji: '💰', color: 'emerald', title: 'Financial Support',
              sub: 'Scholarships & Freeships',
              desc: 'Merit, rank-based, PG and sports scholarships — up to 100% fee waiver for top KCET performers.',
              href: '#scholarships',
            },
            {
              emoji: '🌍', color: 'violet', title: 'Global Exposure',
              sub: 'International Exchange Programs',
              desc: 'Semester-long study abroad in France with 6 partner universities including ESIGELEC and INSA Rouen.',
              href: '#study-abroad',
            },
          ].map(card => (
            <a key={card.title} href={card.href}
              className={`group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer`}>
              <span className="text-3xl mb-3 block">{card.emoji}</span>
              <p className={`text-sm font-bold uppercase tracking-widest mb-1 text-${card.color}-600`}>{card.title}</p>
              <h3 className="font-display font-bold text-navy-900 text-xl mb-2 leading-snug">{card.sub}</h3>
              <p className="text-slate-500 text-base leading-relaxed">{card.desc}</p>
              <span className={`inline-flex items-center gap-1 text-sm font-semibold text-${card.color}-600 mt-4`}>
                Learn more <ChevronRight size={12} />
              </span>
            </a>
          ))}
        </div>
        </AnimateIn>
      </div>

      <div className="container-wide pb-16 space-y-14">

        {/* ── Section 1: Minor Degree Programs ── */}
        <div id="minor-degree" className="scroll-mt-28" />
        <AnimateIn variant="fade-up" as="section">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">

            {/* Dark hero header */}
            <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-5 sm:px-10 pt-8 pb-10 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="absolute bottom-0 left-1/4 w-36 h-36 rounded-full bg-indigo-400/10 blur-2xl" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 mb-4">
                  <GraduationCap size={12} /> Minor Degree Programs
                </span>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                  Minor Degree in<br className="hidden sm:block" /> Engineering Programs
                </h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                  Supplementary programs offered alongside your primary B.E / B.Tech degree — enhance employability with 25 emerging specializations across 4 tracks.
                </p>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { num: '25',   label: 'Specializations', icon: '📚' },
                    { num: '4',    label: 'Tracks',           icon: '🎯' },
                    { num: 'All',  label: 'B.E. Branches',    icon: '🏛️' },
                    { num: '4 yr', label: 'Duration',         icon: '📅' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3.5 text-center">
                      <span className="text-xl block mb-1">{s.icon}</span>
                      <p className="font-black text-white text-xl sm:text-2xl leading-none">{s.num}</p>
                      <p className="text-white/50 text-xs sm:text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-5 sm:px-8 py-8 space-y-8">

              {/* Objectives */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-blue-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Program Objectives</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { icon: '🔬', text: 'Promote advanced, multidisciplinary education' },
                    { icon: '🎯', text: 'Enable specialization in chosen focus areas' },
                    { icon: '⚡', text: 'Develop new skills and methodologies' },
                    { icon: '🎨', text: 'Foster creative expression and personal interests' },
                    { icon: '📈', text: 'Build sustained academic and research engagement' },
                  ].map(obj => (
                    <div key={obj.text} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                      <span className="text-lg flex-shrink-0">{obj.icon}</span>
                      <p className="text-slate-700 text-sm sm:text-base font-medium leading-snug">{obj.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Track selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-blue-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Explore by Track</p>
                </div>
                {/* Tab buttons */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {MINOR_TRACKS.map(t => {
                    const active = activeTrack === t.id;
                    return (
                      <button key={t.id} onClick={() => setActiveTrack(t.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-base font-semibold transition-all border ${
                          active
                            ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}>
                        <t.Icon size={14} />
                        {t.label}
                        <span className={`text-xs font-black rounded-full px-1.5 py-0.5 ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {t.programs.length}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active track content */}
                <div className={`rounded-2xl border-2 ${currentTrack.accent} overflow-hidden`}>
                  <div className={`px-5 py-3 flex items-center gap-3 ${currentTrack.badge} border-b border-opacity-20`}>
                    <currentTrack.Icon size={16} />
                    <h3 className="font-bold text-base">{currentTrack.label}</h3>
                    <span className="ml-auto font-black text-sm">{currentTrack.programs.length} programs</span>
                  </div>
                  <div className="bg-white p-5">
                    <div className="flex flex-wrap gap-2">
                      {currentTrack.programs.map((p, i) => (
                        <span key={p} className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 text-sm sm:text-base font-medium px-3 py-2 rounded-full transition-colors">
                          <span className="w-4 h-4 rounded-full bg-navy-900 text-white text-xs font-black flex items-center justify-center flex-shrink-0">{i + 1}</span>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Eligibility note */}
              <div className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-base mb-0.5">Eligibility</p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Open to all B.E / B.Tech students across all branches. Some programs restrict students from closely related major disciplines. Contact the academic office for branch-specific eligibility.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </AnimateIn>

        {/* ── Section 2: Scholarships ── */}
        <div id="scholarships" className="scroll-mt-28" />
        <AnimateIn variant="fade-up" as="section">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">

            {/* Dark hero header */}
            <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-5 sm:px-10 pt-8 pb-10 overflow-hidden">
              <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="absolute bottom-0 left-1/4 w-36 h-36 rounded-full bg-indigo-400/10 blur-2xl" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80 mb-4">
                  <DollarSign size={12} /> Scholarships & Financial Support
                </span>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                  Scholarships &<br className="hidden sm:block" /> Financial Support
                </h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                  NHCE offers a wide range of scholarships — merit-based, rank-based, PG and sports — ensuring financial constraints never come in the way of quality education.
                </p>
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { num: '100%', label: 'Max Fee Waiver',       icon: '🏆' },
                    { num: '₹25K', label: 'UG Merit Award',        icon: '🎓' },
                    { num: '50%',  label: 'Freeship for Toppers',  icon: '⭐' },
                    { num: '4+',   label: 'Scholarship Categories', icon: '📋' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3.5 text-center">
                      <span className="text-xl block mb-1">{s.icon}</span>
                      <p className="font-black text-white text-xl sm:text-2xl leading-none">{s.num}</p>
                      <p className="text-white/50 text-xs sm:text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-white px-5 sm:px-8 py-8 space-y-8">

              {/* Scholarship categories */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-1 h-5 bg-violet-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Scholarship Categories</p>
                </div>
                <Accordion items={SCHOLARSHIP_SECTIONS.map(s => ({
                  title: `${s.emoji}  ${s.title}`,
                  content: (
                    <div>
                      <p className="text-slate-500 text-base mb-3">{s.desc}</p>
                      <ScholarshipTable cols={s.table.cols} rows={s.table.rows} />
                    </div>
                  ),
                }))} />
              </div>

              {/* Highlights */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-violet-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Key Highlights</p>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { icon: '🏅', title: 'KCET Rank Reward', desc: 'Top 1000 KCET rankers receive up to 100% fee waiver for the first year' },
                    { icon: '📚', title: 'Merit Scholarship', desc: '₹25,000 awarded to UG students with outstanding academic performance' },
                    { icon: '🤸', title: 'Sports Excellence', desc: 'Special fee concessions for students excelling in national/state-level sports' },
                  ].map(h => (
                    <div key={h.title} className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-4">
                      <span className="text-2xl mb-2 block">{h.icon}</span>
                      <p className="font-bold text-navy-900 text-base mb-1">{h.title}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-Metric note */}
              <div className="flex items-start gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <Award size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-base mb-0.5">Post-Metric Scholarships</p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Available through the State Post Matric Scholarship Portal for eligible candidates. A 50% freeship is also offered for top performers in B.E. AI & ML, Civil, CSE, MCA, and MBA programs. Contact the admissions office for details.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </AnimateIn>

        {/* ── Section 3: Study Abroad ── */}
        <div id="study-abroad" className="scroll-mt-28" />
        <AnimateIn variant="fade-up" as="section">
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">

            {/* ── Dark hero header ── */}
            <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-5 sm:px-10 pt-8 pb-10 overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-violet-500/10 blur-2xl" />
              <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-indigo-400 blur-2xl" />
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/80">
                    <Globe size={12} /> Study Abroad Program
                  </span>
                  <span className="text-lg">🇫🇷</span>
                </div>
                <h2 className="font-display font-black text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-3">
                  International Study<br className="hidden sm:block" /> Abroad Program
                </h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                  A semester-long student exchange in collaboration with six leading French engineering institutions, backed by a tripartite MoU with the French Ministry of National Education and Schneider Electric.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { num: '6',      label: 'Partner Universities', icon: '🏛️' },
                    { num: '45+',    label: 'Students Exchanged',   icon: '✈️'  },
                    { num: '11 wks', label: 'Exchange Duration',    icon: '📅'  },
                    { num: '2017',   label: 'MoU Signed',           icon: '🤝'  },
                  ].map(s => (
                    <div key={s.label} className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3.5 text-center">
                      <span className="text-xl block mb-1">{s.icon}</span>
                      <p className="font-black text-white text-xl sm:text-2xl leading-none">{s.num}</p>
                      <p className="text-white/50 text-xs sm:text-sm mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="bg-white px-5 sm:px-8 py-8 space-y-8">

              {/* Partner universities */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-violet-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Partner Universities in France</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PARTNER_UNIVERSITIES.map((u, i) => (
                    <div key={u.name}
                      className="group relative bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl px-4 py-4 hover:border-violet-300 hover:shadow-md transition-all overflow-hidden">
                      {/* Number badge */}
                      <span className="absolute top-3 right-3 text-xs font-black text-slate-300">#{i + 1}</span>
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 border border-violet-100 flex items-center justify-center flex-shrink-0 group-hover:from-violet-200 group-hover:to-indigo-200 transition-colors">
                          <span className="text-base">🇫🇷</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-navy-900 text-base leading-snug">{u.name}</p>
                          <p className="text-slate-400 text-sm mt-0.5 leading-snug">{u.type}</p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                            <p className="text-violet-600 text-sm font-semibold">{u.city}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Programme highlights */}
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: '📚', title: 'VTU-Recognised Credits', desc: 'Credits earned abroad are recognized in your NHCE degree programme.' },
                  { icon: '🌐', title: 'International Faculty', desc: 'Learn from French professors and industry experts in cutting-edge labs.' },
                  { icon: '🤝', title: 'Schneider Electric Partnership', desc: 'Technical training and curriculum co-designed by Schneider Electric experts.' },
                ].map(h => (
                  <div key={h.title} className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                    <span className="text-2xl block mb-2">{h.icon}</span>
                    <p className="font-bold text-navy-900 text-base mb-1">{h.title}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{h.desc}</p>
                  </div>
                ))}
              </div>

              {/* Participation history — visual bars */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-violet-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Student Participation History</p>
                </div>
                <div className="space-y-3">
                  {PARTICIPATION.map((p) => (
                    <div key={p.year} className="flex items-center gap-4 bg-slate-50 rounded-xl px-4 py-3.5 border border-slate-100">
                      <span className="font-black text-navy-900 text-base w-16 flex-shrink-0">{p.year}</span>
                      <div className="flex-1 min-w-0">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all"
                            style={{ width: `${Math.min(100, (p.count / 45) * 100)}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-800 text-sm font-black px-2.5 py-1 rounded-full">
                          <Users size={10} /> {p.count}
                        </span>
                        <span className="text-slate-400 text-sm hidden sm:block max-w-[180px] truncate">{p.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligible branches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1 h-5 bg-violet-500 rounded-full" />
                  <p className="text-base font-bold text-navy-900">Eligible Branches</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ELIGIBLE_BRANCHES.map(b => (
                    <span key={b} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 text-violet-800 text-sm sm:text-base font-semibold px-4 py-2 rounded-full hover:bg-violet-100 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Centre of Excellence */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <div className="grid lg:grid-cols-[1fr_auto]">

                  {/* Left: content */}
                  <div className="bg-white px-6 py-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                        <Zap size={10} /> Centre of Excellence
                      </span>
                      <span className="text-slate-300 text-base">·</span>
                      <span className="text-slate-400 text-sm">Electricity · Automation · Energy</span>
                    </div>

                    <div>
                      <h4 className="font-black text-navy-900 text-lg sm:text-xl leading-snug mb-2">
                        Indian-French Centre of Excellence
                      </h4>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                        A tripartite initiative delivering comprehensive technical training and curriculum development — enabling deep knowledge transfer between India and France in cutting-edge engineering.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {[
                        { icon: '👨‍🏫', label: 'Teacher Training' },
                        { icon: '🔧', label: 'Student Technical Training' },
                        { icon: '🔬', label: 'Research & Innovation' },
                        { icon: '📐', label: 'Curriculum Modernization' },
                      ].map(tag => (
                        <div key={tag.label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                          <span className="text-base flex-shrink-0">{tag.icon}</span>
                          <span className="text-navy-800 text-sm font-semibold leading-tight">{tag.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: partner logos panel */}
                  <div className="bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-row lg:flex-col items-center justify-center gap-0 divide-x lg:divide-x-0 lg:divide-y divide-slate-200 min-w-[220px]">
                    <div className="flex-1 lg:flex-none flex flex-col items-center justify-center gap-2 px-6 py-5 w-full">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">Industry Partner</p>
                      <img src="/Schneider_Electric-logo.png" alt="Schneider Electric" className="h-14 w-auto object-contain" />
                    </div>
                    <div className="flex-1 lg:flex-none flex flex-col items-center justify-center gap-2 px-6 py-5 w-full">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400 text-center">Government Partner</p>
                      <div className="flex items-center gap-3">
                        <img src="/french_ministry.png" alt="French Ministry" className="h-24 w-auto object-contain flex-shrink-0" />
                        <p className="text-base font-bold text-slate-700 leading-snug max-w-[90px]">French Ministry of National Education</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* <a href="https://newhorizoncollegeofengineering.in/study-abroad-program/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
                View Full Study Abroad Details <ExternalLink size={13} />
              </a> */}

            </div>
          </div>
        </AnimateIn>

      </div>

      {/* ── CTA ── */}
      <AnimateIn variant="scale">
      <div className="container-wide pb-16">
        <div className="bg-navy-950 rounded-3xl px-6 sm:px-10 py-10 text-white text-center">
          <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3">Ready to Explore Your Options?</h3>
          <p className="text-white/60 text-base sm:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
            Speak with our admissions counselors to find the right enrichment program, scholarship, or exchange opportunity for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center gap-2">
              Apply Now 2025–26 <ChevronRight size={14} />
            </a>
            <Link to="/admissions"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:text-white hover:border-white/50 text-base font-semibold px-6 py-2.5 rounded-full transition-all">
              Back to Admissions
            </Link>
          </div>
        </div>
      </div>
      </AnimateIn>

    </div>
  );
}
