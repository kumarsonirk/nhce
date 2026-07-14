import { useEffect, useState } from 'react';
import { ChevronRight, ChevronDown, Award, Users, BookOpen, Globe, Zap, Heart, Shield, Star, FileText, Download, CheckCircle2 } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ────────────────────────────────────────────────── */


const MISSION = [
  'Strengthening theoretical, practical and ethical dimensions through research and innovation.',
  'Fostering academia-industry partnerships in curriculum design and implementation.',
  "Developing students' professional, ethical, social and environmental competencies.",
];

const CORE_VALUES = [
  { icon: BookOpen, label: 'Academic Freedom',     color: 'from-blue-500 to-indigo-600'   },
  { icon: Shield,   label: 'Integrity',            color: 'from-emerald-500 to-teal-600'  },
  { icon: Heart,    label: 'Inclusiveness',        color: 'from-pink-500 to-rose-500'     },
  { icon: Zap,      label: 'Innovation',           color: 'from-amber-500 to-orange-500'  },
  { icon: Star,     label: 'Professionalism',      color: 'from-violet-500 to-purple-600' },
  { icon: Globe,    label: 'Social Responsibility',color: 'from-cyan-500 to-sky-600'      },
];


const WHY_REASONS = [
  {
    title: 'Academic Excellence',
    icon: Award,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    points: [
      'Autonomous College permanently affiliated to VTU',
      'NAAC A Grade & NBA TIER-1 Accreditation',
      'Ranked 121st among top engineering colleges — NIRF',
      'Ranked 4th among private engineering colleges in Bangalore',
      'AICTE & UGC Approved institution',
    ],
  },
  {
    title: 'Programs & Flexibility',
    icon: BookOpen,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    points: [
      'Diverse specializations — AI/ML, Data Science, ECE, Mechanical and more',
      'Choice Based Credit System (CBCS) for flexible learning',
      'Minor degree programs in emerging technology areas',
      'Postgraduate options: M.Tech, MBA, MCA, PhD, M.Sc by Research',
    ],
  },
  {
    title: 'Career Development',
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    points: [
      '100% placement opportunities across all degree programs',
      'Partnerships with IBM, TCS, Wipro and 120+ companies',
      'Japan Career Centre for international placements',
      'Study abroad and student exchange programs',
    ],
  },
  {
    title: 'Campus & Infrastructure',
    icon: Globe,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    points: [
      "Modern, Wi-Fi enabled campus in Bangalore's IT corridor",
      'Green campus with serene environment away from city hustle',
      'Hostels, cafeterias, transport and sports facilities',
      'Active student clubs — NSS, NCC, IEEE, ISTE, SAE, CSI',
    ],
  },
  {
    title: 'Industry Connections',
    icon: Zap,
    color: 'from-cyan-500 to-sky-600',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    points: [
      'Multiple MOUs with industries for internships and recruitment',
      'Regular industrial visits, workshops and seminars',
      'Recognized for Excellence in Promoting Industry-Academia Interface',
      'Professional society memberships — ISTE, IEEE, SAE, CSI',
    ],
  },
];

const ACCREDITATIONS = [
  {
    logo: '/acc/naac.png',
    name: 'NAAC',
    full: 'National Assessment and Accreditation Council',
    detail: 'A Grade',
    badge: 'bg-green-50 text-green-700 border-green-100',
  },
  {
    logo: '/acc/nba.png',
    name: 'NBA',
    full: 'National Board of Accreditation',
    detail: 'TIER-1',
    badge: 'bg-blue-50 text-blue-700 border-blue-100',
  },
  {
    logo: '/acc/aicte.png',
    name: 'AICTE',
    full: 'All India Council for Technical Education',
    detail: 'Approved',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  },
  {
    logo: '/acc/ugc.png',
    name: 'UGC',
    full: 'University Grants Commission',
    detail: 'Recognised',
    badge: 'bg-violet-50 text-violet-700 border-violet-100',
  },
  {
    logo: '/acc/vtu.webp',
    name: 'VTU',
    full: 'Visvesvaraya Technological University',
    detail: 'Permanent Affiliation',
    badge: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  {
    logo: '/acc/Gov-of-karanataka-logo.jpg',
    name: 'GoK',
    full: 'Govt. of Karnataka',
    detail: 'Autonomous Status',
    badge: 'bg-rose-50 text-rose-700 border-rose-100',
  },
  {
    logo: '/acc/qs-i-gauge-logo.jpg',
    name: 'QS I-GAUGE',
    full: 'QS Quacquarelli Symonds',
    detail: 'Quality Certification',
    badge: 'bg-teal-50 text-teal-700 border-teal-100',
  },
];

const REGULATIONS_PDF = 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/BE-NHCE-Guideline-for-2022-23.pdf';

const DRESS_CODE_MALE = [
  'Smart casuals at all times',
  'No shorts or sleeveless wear',
  'No headgear (except Sikh pagdi)',
  'No severely damaged/torn jeans',
  'No slip-on shoes inside campus',
];

const DRESS_CODE_FEMALE = [
  'Smart casuals at all times',
  'No shorts or miniskirts',
  'No midriff-bearing or strapless tops',
  'No severely damaged/torn jeans',
];

/* ─── Why Accordion ──────────────────────────────────────── */

function WhyAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="flex flex-wrap justify-center gap-5">
      {WHY_REASONS.map((r, idx) => {
        const Icon = r.icon;
        const isOpen = openIdx === idx;
        return (
          <div key={r.title} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
            {/* Header — clickable on mobile, static on desktop */}
            <button
              className={`w-full bg-gradient-to-r ${r.color} px-4 py-3 flex items-center gap-2 sm:cursor-default`}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <Icon size={16} className="text-white flex-shrink-0" />
              <span className="text-white font-bold text-base flex-1 text-left">{r.title}</span>
              <ChevronDown
                size={15}
                className={`text-white/70 flex-shrink-0 transition-transform duration-200 sm:hidden ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {/* Content — smooth accordion on mobile, always visible on desktop */}
            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out sm:grid-rows-[1fr] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <ul className="min-h-0 overflow-hidden">
                <div className="p-4 space-y-2">
                  {r.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-base text-slate-700 list-none">
                      <CheckCircle2 size={13} className={`mt-0.5 flex-shrink-0 ${r.text}`} />
                      {p}
                    </li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        image="/hero5.jpg"
        imageWidth="w-[46%]"
        contentMaxWidth="lg:max-w-[52%]"
        badge="Est. 2001 · Autonomous · Bangalore"
        headingSmall="About"
        headingMain="New Horizon"
        headingGhost="College of Engineering"
        description="One of Bangalore's top engineering institutions — permanently affiliated to VTU, with world-class infrastructure and 100% placement opportunities."
        button={{ label: 'Apply Now 2026–27', to: '/admissions' }}
      />

      {/* ── About the College ── */}
      <div className="bg-white relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/25 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-400/25 rounded-full blur-3xl -z-10" />

        <div className="container-wide py-14">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <AnimateIn variant="fade-right">
            <div>
              <span className="badge bg-blue-100 text-blue-700 mb-3">About the College</span>
              <h2 className="heading-md text-navy-950 mb-5">
                Shaping Future{' '}
                <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">Engineers</span>
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  <strong className="text-navy-900">New Horizon College of Engineering (NHCE)</strong> is an autonomous college permanently affiliated to Visvesvaraya Technological University (VTU), approved by AICTE &amp; UGC, and accredited by NAAC with an 'A' Grade. It is one of the top engineering colleges in Bangalore, strategically positioned in the IT corridor near Marathahalli.
                </p>
                <p>
                  Surrounded by global technology leaders including Intel, Accenture, Capgemini, ARM, Wipro, Nokia, JP Morgan and Cisco, NHCE offers students unparalleled access to industry and internship opportunities right at their doorstep.
                </p>
                <p>
                  The college offers a scenic and serene campus environment conducive to intellectual growth, with state-of-the-art laboratories, libraries, sports facilities, hostels and transport services.
                </p>
              </div>
            </div>
            </AnimateIn>

            {/* Right — Vision, Mission, Values */}
            <AnimateIn variant="fade-left" delay={120}>
            <div className="space-y-6">
              {/* Vision */}
              <div className="bg-navy-950 text-white rounded-2xl p-6">
                <h3 className="font-bold text-gold-400 text-lg uppercase tracking-wider mb-3">Our Vision</h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  To emerge as an institute of eminence in engineering, technology and management — serving the industry and nation by empowering students with high degrees of technical, managerial and practical competence.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-navy-900 text-lg uppercase tracking-wider mb-3">Our Mission</h3>
                <ul className="space-y-2">
                  {MISSION.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-lg text-slate-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            </AnimateIn>
          </div>

          {/* Core Values — full width */}
          {/* <div className="mt-10">
            <h3 className="font-bold text-navy-900 text-sm uppercase tracking-wider mb-5 text-center">Core Values</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CORE_VALUES.map(({ icon: Icon, label, color }) => (
                <div key={label} className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-navy-900 text-center leading-snug">{label}</span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>

      {/* ── Why Join NHCE ── */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="container-wide py-14">
          <AnimateIn variant="fade-up">
          <div className="text-center mb-10">
            <span className="badge bg-emerald-100 text-emerald-700 mb-3">Why Join NHCE</span>
            <h2 className="heading-md text-navy-950">
              Why Choose{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-500">New Horizon</span>
            </h2>
            <p className="text-slate-500 text-base mt-2 max-w-lg mx-auto">
              From academic excellence to career opportunities, here's what makes NHCE stand out.
            </p>
          </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
          <WhyAccordion />
          </AnimateIn>
        </div>
      </div>

      {/* ── Accreditations ── */}
      <div className="bg-blue-100 border-b border-slate-100">
        <div className="container-wide py-14">
          <AnimateIn variant="fade-up">
          <div className="text-center mb-10">
            <span className="badge bg-gold-100 text-gold-700 mb-3">Accreditations & Rankings</span>
            <h2 className="heading-md text-navy-950">
              Recognised by the{' '}
              <span className="text-gradient bg-gradient-to-r from-gold-600 to-amber-500">Best</span>
            </h2>
          </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
          <div className="flex flex-wrap justify-center gap-4">
            {ACCREDITATIONS.map(a => (
              <div key={a.name} className="bg-white border border-slate-100 rounded-2xl p-2 lg:p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center gap-3 w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]">
                {a.logo ? (
                  <img src={a.logo} alt={a.name} className="h-14 w-auto object-contain" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="font-black text-navy-900 text-sm">{a.name}</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-navy-900 text-base">{a.name}</p>
                  <p className="text-sm text-slate-500 leading-snug mt-0.5">{a.full}</p>
                </div>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${a.badge}`}>{a.detail}</span>
              </div>
            ))}
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Academic Rules & Regulations ── */}
      <div className="bg-slate-50">
        <div className="container-wide py-14">
          <AnimateIn variant="fade-up">
          <div className="text-center mb-10">
            <span className="badge bg-slate-200 text-slate-700 mb-3">Academic Rules & Regulations</span>
            <h2 className="heading-md text-navy-950">
              Guidelines &{' '}
              <span className="text-gradient bg-gradient-to-r from-slate-600 to-slate-800">Policies</span>
            </h2>
          </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* PDF Download */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <FileText size={18} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-base">BE NHCE Academic Guideline 2022-23</h3>
                  <p className="text-sm text-slate-500">Official PDF document</p>
                </div>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-5">
                This document contains the complete set of academic rules, regulations and guidelines for B.E. programmes at NHCE as approved for the 2022-23 academic year. Covers attendance, examination rules, grading system, promotion criteria and code of conduct.
              </p>
              <a
                href={REGULATIONS_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-base font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                <Download size={14} /> Download PDF
              </a>
            </div>

            {/* Dress Code — hidden on mobile */}
            <div className="hidden sm:block bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-navy-900 text-base mb-4 flex items-center gap-2">
                <Shield size={16} className="text-navy-600" /> Campus Dress Code
              </h3>
              <p className="text-lg text-slate-500 mb-4">Smart casuals are required at all times. The institution reserves the right to restrict entry to students not following the dress code.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-base font-bold text-slate-700 mb-2 uppercase tracking-wide">For Men</p>
                  <ul className="space-y-1.5">
                    {DRESS_CODE_MALE.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-base text-slate-600">
                        <ChevronRight size={12} className="mt-0.5 text-slate-400 flex-shrink-0" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-base font-bold text-slate-700 mb-2 uppercase tracking-wide">For Women</p>
                  <ul className="space-y-1.5">
                    {DRESS_CODE_FEMALE.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-base text-slate-600">
                        <ChevronRight size={12} className="mt-0.5 text-slate-400 flex-shrink-0" />{d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Sister Concern Institutes ── */}
      <div className="bg-slate-100">
        <div className="container-wide py-14">
          <AnimateIn variant="fade-up">
          <div className="text-center mb-10">
            <span className="text-navy-700 text-sm font-semibold uppercase tracking-widest">New Horizon Group</span>
            <h2 className="font-display font-bold text-navy-950 text-2xl sm:text-3xl mt-2">
              Sister Concern Institutes
            </h2>
          </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'New Horizon Public School',          location: 'Indiranagar',  year: '1982' },
              { name: 'New Horizon PU College',             location: 'Kasturinagar', year: '1982' },
              { name: 'New Horizon Degree College',         location: 'Kasturinagar', year: '2009' },
              { name: 'New Horizon Degree College',         location: 'Marathahalli', year: '1998' },
              { name: 'New Horizon Gurukul',                location: 'Marathahalli', year: '2010' },
              { name: 'New Horizon Gurukul Pre School',     location: 'Bellandur',    year: '2012' },
              { name: 'New Horizon International School',   location: 'Hennur',       year: '2022' },
            ].map(inst => (
              <div key={inst.name + inst.location}
                className="group relative bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition-all duration-300 overflow-hidden">
                {/* Year watermark */}
                <span className="absolute right-4 bottom-2 text-5xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none leading-none">
                  {inst.year}
                </span>
                {/* Content */}
                <div className="relative z-10">
                  <span className="inline-block text-sm font-bold text-blue-700 border border-blue-200 bg-blue-50 rounded-full px-2.5 py-0.5 mb-3">
                    Estd. {inst.year}
                  </span>
                  <p className="font-bold text-navy-900 text-base leading-snug mb-1">{inst.name}</p>
                  <p className="text-slate-500 text-sm">{inst.location}, Bengaluru</p>
                </div>
              </div>
            ))}
          </div>
          </AnimateIn>
        </div>
      </div>

    </div>
  );
}
