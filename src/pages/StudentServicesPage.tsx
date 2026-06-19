import { useState, useEffect } from 'react';
import {
  Heart, Shield, Star, Leaf, Stethoscope, ShieldCheck,
  Clock, MapPin, Phone, ArrowRight, Users, BookOpen,
  FileX, GraduationCap, Scale, BadgeMinus,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const SERVICES = [
  {
    id: 'counselling',
    label: 'Counselling',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/Mental-Health.jpg',
    icon: Heart,
    tagline: 'Free, confidential sessions every weekday.',
    accentBg: 'bg-rose-600',
    accentHex: '#e11d48',
    badgeCls: 'bg-rose-100 text-rose-700',
    textCls: 'text-rose-600',
  },
  {
    id: 'ncc',
    label: 'NCC',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/ncc1.jpg',
    icon: Shield,
    tagline: 'Drill, camps & community service year-round.',
    accentBg: 'bg-green-700',
    accentHex: '#15803d',
    badgeCls: 'bg-green-100 text-green-700',
    textCls: 'text-green-700',
  },
  {
    id: 'antiragging',
    label: 'Anti-Ragging',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2024/08/QWQ-v-scaled.jpg',
    icon: ShieldCheck,
    tagline: 'Zero tolerance. 24/7 campus monitoring.',
    accentBg: 'bg-red-600',
    accentHex: '#dc2626',
    badgeCls: 'bg-red-100 text-red-700',
    textCls: 'text-red-600',
  },
  {
    id: 'clubs',
    label: 'Student Clubs',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/student1.jpg',
    icon: Star,
    tagline: '34+ clubs — run by students, for students.',
    accentBg: 'bg-purple-600',
    accentHex: '#9333ea',
    badgeCls: 'bg-purple-100 text-purple-700',
    textCls: 'text-purple-600',
  },
  {
    id: 'nss',
    label: 'NSS',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/11/nss-activity-03.webp',
    icon: Leaf,
    tagline: '93 tribal villages adopted in 3 regions.',
    accentBg: 'bg-teal-600',
    accentHex: '#0d9488',
    badgeCls: 'bg-teal-100 text-teal-700',
    textCls: 'text-teal-600',
  },
  {
    id: 'medical',
    label: 'Medical Centre',
    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/medical.jpg',
    icon: Stethoscope,
    tagline: 'On-campus staff & emergency ambulance.',
    accentBg: 'bg-blue-600',
    accentHex: '#2563eb',
    badgeCls: 'bg-blue-100 text-blue-700',
    textCls: 'text-blue-600',
  },
];

const COUNSELLING_SERVICES = [
  { label: 'Academic Counselling',  img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/academic_counselling.png' },
  { label: 'Awareness Programs',    img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/awareness_program.png' },
  { label: 'Individual Sessions',   img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/individual_couselling.png' },
  { label: "Parents' Meetings",     img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/parents_meeting.webp' },
  { label: 'Induction Counselling', img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/induction_couselling.png' },
  { label: 'Interactive Sessions',  img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/interactive_session.png' },
];


const NSS_PHOTOS = [
  'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/11/nss-activity-03.webp',
  'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/11/nss-3.webp',
  'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/08/nss-activity-1-2025.webp',
  'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/bharat-nss.jpg',
];

/* ─── Content panels ─────────────────────────────────────────── */

function Counselling() {
  const APPROACH = [
    {
      title: 'Confidentiality',
      desc: 'What you share stays between you and your counsellor. Always.',
      img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/social_approach-1.png',
    },
    {
      title: 'Empathy & Respect',
      desc: 'Your background, pace and story are recognised and honoured without judgment.',
      img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/alliance.png',
    },
    {
      title: 'Self-Awareness',
      desc: 'Sessions guide you toward reflection, insight and informed decision-making.',
      img: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/why_counselling2.png',
    },
  ];

  const CONDITIONS = [
    'Exam Anxiety', 'Academic Pressure', 'Low Self-Esteem', 'Family Conflict',
    'Interpersonal Issues', 'Body Image Issues', 'Phobias', 'Eating Disorders',
    'Childhood Trauma', 'Emotional Concerns', 'Coming Out',
  ];

  return (
    <div className="space-y-14">

      {/* ── Hero block ── */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge bg-rose-100 text-rose-700 mb-5">Professional Counselling</span>
          <h2 className="font-display font-black text-2xl lg:text-5xl text-navy-950 leading-tight mb-4">
            Your Mental<br />
            <span className="text-rose-600">Well-being Matters</span>
          </h2>
          <p className="text-slate-400 italic text-base mb-6 border-l-4 border-rose-200 pl-4">
            "Taking care of your mind is just as important as taking care of your grades."
          </p>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            The Counselling Centre is a free, confidential space — walk in any weekday without an appointment. Whether it's academic pressure, homesickness, anxiety or anything in between, the counsellors are here without judgment.
          </p>

          {/* Contact info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {[
              { icon: Clock,  label: 'Mon – Fri',            sub: '9:30 AM – 4:30 PM'             },
              { icon: MapPin, label: 'Chhatrapati Shivaji',  sub: '3rd & 4th Floor'                },
              { icon: Phone,  label: '+91-98805 34935',      sub: 'Walk-in, no appointment'        },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-3 bg-rose-50 rounded-2xl p-3.5">
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <f.icon size={14} className="text-rose-600" />
                </div>
                <div>
                  <p className="font-bold text-navy-900 text-sm">{f.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="/counselling"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 border-rose-200 text-rose-600 font-semibold text-base bg-white hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
          >
            Explore More
            <span className="w-6 h-6 rounded-full bg-rose-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </span>
          </a>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden h-64 sm:h-[420px]">
            <img
              src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/why_counselling1.jpg"
              alt="Counselling"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-5 -left-4 bg-white rounded-2xl shadow-xl border border-rose-100 px-5 py-4">
            <p className="font-black text-3xl text-navy-950 leading-none">1–12</p>
            <p className="text-rose-600 font-semibold text-sm mt-1">Sessions per student</p>
            <p className="text-slate-400 text-xs mt-0.5">Brief, goal-focused therapy</p>
          </div>
        </div>
      </div>

      {/* ── Services grid ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">What We Offer</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COUNSELLING_SERVICES.map(s => (
            <div key={s.label} className="bg-slate-50 border border-slate-100 hover:border-rose-100 rounded-2xl overflow-hidden group hover:shadow-sm transition-all duration-300">
              <div className="h-24 flex items-center justify-center p-4">
                <img src={s.img} alt={s.label} className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="px-3 pb-3">
                <p className="text-sm font-semibold text-navy-900 leading-snug">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Approach pillars ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">Our Approach</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {APPROACH.map(a => (
            <div key={a.title} className="group bg-white border border-slate-100 hover:border-rose-100 hover:shadow-md rounded-3xl p-6 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src={a.img} alt={a.title} className="w-10 h-10 object-contain" />
              </div>
              <p className="font-bold text-navy-950 text-base mb-2">{a.title}</p>
              <p className="text-slate-500 text-base leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── When to approach ── */}
      <div className="bg-rose-50 rounded-3xl p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-rose-400 mb-2">When to Reach Out</p>
        <h3 className="font-display font-black text-2xl text-navy-950 mb-6">It's okay to ask for help</h3>
        <div className="flex flex-wrap gap-2">
          {CONDITIONS.map(c => (
            <span key={c} className="bg-white border border-rose-100 text-navy-900 text-xs font-semibold px-3.5 py-2 rounded-full">
              {c}
            </span>
          ))}
        </div>
        <p className="text-slate-500 text-base mt-5 leading-relaxed">
          These are just some of the situations where reaching out makes a real difference. If something is weighing on you — whatever it is — the counsellors are there.
        </p>
      </div>

    </div>
  );
}

function NCC() {
  const EVENT_YEARS = [
    { year: '2021', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2021/' },
    { year: '2022', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2022/' },
    { year: '2023', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2023/' },
    { year: '2024', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2024/' },
    { year: '2025', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2025/' },
    { year: '2026', href: 'https://newhorizoncollegeofengineering.in/ncc-events-2026/' },
  ];

  const HIGHLIGHTS = [
    { icon: Shield,   label: 'Drill & Parades',        desc: 'Structured drill sessions and ceremonial parades under commissioned officers.' },
    { icon: Users,    label: 'Adventure Camps',         desc: 'Trekking, rock climbing, and outdoor leadership activities.' },
    { icon: Leaf,     label: 'Community Service',       desc: 'Social outreach, cleanliness drives and awareness programmes.' },
    { icon: BookOpen, label: 'Skill Development',       desc: 'Map reading, first aid, communication and leadership training.' },
  ];

  return (
    <div className="space-y-12">

      {/* ── Hero block ── */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge bg-green-100 text-green-700 mb-5">National Cadet Corps</span>
          <h2 className="font-display font-black text-2xl lg:text-5xl text-navy-950 leading-tight mb-4">
            Discipline Beyond<br />
            <span className="text-green-700">the Classroom</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mb-8">
            The NCC unit at NHCE runs one of the more active cadet programmes in Bengaluru. Affiliated to Visvesvaraya Technological University, cadets participate in drill, adventure camps and community service under commissioned officers — a sustained, year-round commitment that goes well beyond a token programme.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { num: '2021',  label: 'Running since'      },
              { num: 'VTU',   label: 'Affiliated to'      },
              { num: '6 yrs', label: 'Documented events'  },
            ].map(s => (
              <div key={s.label} className="bg-green-50 border border-green-100 rounded-2xl px-4 py-3 text-center">
                <p className="font-black text-xl text-navy-950">{s.num}</p>
                <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Affiliation badges */}
          <div className="flex flex-wrap gap-2">
            {['VTU Affiliated', 'AICTE Approved', 'UGC Recognised', 'Autonomous College'].map(b => (
              <span key={b} className="text-xs font-semibold text-green-700 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden h-64 sm:h-[420px]">
            <img
              src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/ncc1.jpg"
              alt="NCC at NHCE"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-white font-bold text-base">National Cadet Corps — NHCE Unit</p>
            <p className="text-white/60 text-sm mt-0.5">Bengaluru · Active since 2021</p>
          </div>
        </div>
      </div>

      {/* ── What NCC offers ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">Programme Highlights</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map(h => (
            <div key={h.label} className="bg-white border border-slate-100 hover:border-green-100 hover:shadow-md rounded-3xl p-5 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <h.icon size={18} className="text-green-700" />
              </div>
              <p className="font-bold text-navy-950 text-base mb-1.5">{h.label}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Events timeline ── */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Event Archive</p>
        <h3 className="font-display font-black text-2xl text-navy-950 mb-6">NCC Events by Year</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {EVENT_YEARS.map(e => (
            <a
              key={e.year}
              href={e.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white border border-slate-100 hover:border-green-200 hover:shadow-md rounded-2xl p-3 sm:p-4 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 group-hover:bg-green-600 flex items-center justify-center transition-colors duration-300">
                <Shield size={16} className="text-green-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <p className="font-black text-navy-950 text-base group-hover:text-green-700 transition-colors duration-200">{e.year}</p>
              <ArrowRight size={11} className="text-slate-300 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all duration-200" />
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}

function AntiRagging() {
  const COMMITTEE = [
    { name: 'Dr. Manjunatha',               role: 'Principal',                               position: 'Chairman' },
    { name: 'Ms. Aruna Machani',            role: 'Director – Admissions, Branding & Mktg', position: 'Member'   },
    { name: 'Dr. R.J. Anandhi',             role: 'Prof & Dean Academics',                   position: 'Member'   },
    { name: 'Dr. Revathi Shankar',          role: 'HOD – BSH Physics',                       position: 'Member'   },
    { name: 'Police Inspector',             role: 'Marathalli Police Station',               position: 'Member'   },
    { name: 'Ms. Karthik',                  role: 'Parent Representative',                   position: 'Member'   },
    { name: 'Mr. Nanjundaiah',              role: 'Retired BEO',                             position: 'Member'   },
    { name: 'Ms. Shanthy P',               role: 'Girls Hostel Warden',                     position: 'Member'   },
    { name: 'Mr. Ramesh Babu',             role: 'Boys Hostel Warden',                      position: 'Member'   },
    { name: 'Basi Reddy C.M. Reddy',       role: 'Student Representative (1NH19CV021)',     position: 'Member'   },
    { name: 'Shaik Anju Minayar',          role: 'Student Representative (1NH19IS143)',     position: 'Member'   },
  ];

  const CATEGORIES = [
    'Teasing or treating with rudeness through words or acts',
    'Rowdy activities causing annoyance or physical/psychological harm',
    'Forcing acts generating shame, torment or embarrassment',
    'Preventing or disrupting regular academic activity',
    'Exploiting services of juniors for personal academic tasks',
    'Financial extortion or forceful expenditure burden',
    'Physical or sexual abuse, stripping or bodily harm',
    'Verbal or written abuse via email, posts or public insults',
    'Acts affecting mental health derived from sadistic pleasure',
  ];

  return (
    <div className="space-y-10">

      {/* ── Hero block ── */}
      <div className="rounded-3xl bg-navy-950 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-red-400/80 bg-red-400/10 border border-red-400/20 px-4 py-2 rounded-full mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Zero Tolerance Policy
            </span>
            <h2 className="font-display font-black text-2xl lg:text-5xl text-white leading-tight mb-4">
              Ragging Free<br /><span className="text-gold-400">Campus</span>
            </h2>
            <p className="text-white/50 italic text-base leading-relaxed mb-6 border-l-2 border-gold-500 pl-4">
              "If ragging is a crime, then learning to accept exploitation is a bigger crime."
            </p>
            <p className="text-white/60 text-base leading-relaxed mb-8">
              Ragging is a social evil with deep psychological and physical impacts. NHCE enforces a strict zero-tolerance policy — every single incident results in an FIR being filed without exception, regardless of severity.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { num: '11',   label: 'Committee Members' },
                { num: '9',    label: 'Ragging Categories' },
                { num: '24/7', label: 'Campus Monitoring'  },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl px-2.5 py-3 sm:px-3 sm:py-3.5 text-center">
                  <p className="font-black text-lg sm:text-2xl text-white">{s.num}</p>
                  <p className="text-white/40 text-[10px] sm:text-xs mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-56 sm:h-72 lg:h-auto">
            <img
              src="/anti_ragging.jpg"
              alt="Ragging Free Campus"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-950/40" />
          </div>
        </div>
      </div>

      {/* ── Policy points ── */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { icon: ShieldCheck, title: 'Student Affidavits',  desc: 'All enrolled students must submit signed affidavits to their assigned counsellors as per AICTE regulations.' },
          { icon: ShieldCheck, title: 'Hostel Residents',    desc: 'Hostel students must additionally submit affidavits to the respective warden per AICTE norms.' },
          { icon: ShieldCheck, title: 'Anti-Ragging Squads', desc: 'Squads patrol the campus, hostels and common areas at all times to deter and respond immediately.' },
          { icon: ShieldCheck, title: 'Immediate FIR',       desc: 'Every reported incident — without exception — results in a First Information Report filed with police.' },
        ].map(p => (
          <div key={p.title} className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-2xl p-4">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <p.icon size={15} className="text-red-600" />
            </div>
            <div>
              <p className="font-bold text-navy-900 text-base">{p.title}</p>
              <p className="text-slate-500 text-sm mt-0.5 leading-snug">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 9 Categories ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Legal Definition</p>
        <h3 className="font-display font-black text-2xl text-navy-950 mb-6">9 Acts That Constitute Ragging</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CATEGORIES.map((c, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-4 hover:border-red-100 hover:shadow-sm transition-all duration-200">
              <span className="font-black text-2xl text-red-100 leading-none flex-shrink-0 w-8">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-slate-600 text-base leading-relaxed mt-1">{c}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Consequences ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Consequences</p>
        <h3 className="font-display font-black text-2xl text-navy-950 mb-6">What Happens to Offenders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Scale,         label: 'FIR Filed',           desc: 'Every incident — no exceptions. First Information Report filed with police immediately.',  bg: 'bg-red-50',    iconBg: 'bg-red-100',    iconCl: 'text-red-600'    },
            { icon: GraduationCap, label: 'Admission Cancelled', desc: 'Cancellation of admission and suspension from classes with immediate effect.',              bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconCl: 'text-orange-600' },
            { icon: BadgeMinus,    label: 'Degree Embossed',     desc: 'University degree permanently marked "student was involved in Ragging."',                   bg: 'bg-amber-50',  iconBg: 'bg-amber-100',  iconCl: 'text-amber-600'  },
            { icon: FileX,         label: 'Legal Action',        desc: 'Imprisonment under IPC, passport blocked, scholarship withheld or withdrawn.',              bg: 'bg-rose-50',   iconBg: 'bg-rose-100',   iconCl: 'text-rose-700'   },
          ].map(c => (
            <div key={c.label} className={`${c.bg} rounded-3xl p-5 flex gap-4 sm:flex-col sm:gap-0 transition-all duration-300`}>
              <div className={`w-10 h-10 rounded-2xl ${c.iconBg} flex items-center justify-center flex-shrink-0 mb-0 sm:mb-4`}>
                <c.icon size={18} className={c.iconCl} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-navy-950 text-base mb-1.5 sm:mb-2">{c.label}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Committee ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Governance</p>
        <h3 className="font-display font-black text-2xl text-navy-950 mb-6">Anti-Ragging Committee</h3>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {COMMITTEE.map((m, i) => {
            const isChairman = i === 0;
            const avatarCls = [
              'bg-navy-950 text-white',
              'bg-blue-100 text-blue-700',
              'bg-blue-100 text-blue-700',
              'bg-blue-100 text-blue-700',
              'bg-green-100 text-green-700',
              'bg-purple-100 text-purple-700',
              'bg-green-100 text-green-700',
              'bg-teal-100 text-teal-700',
              'bg-teal-100 text-teal-700',
              'bg-orange-100 text-orange-700',
              'bg-orange-100 text-orange-700',
            ][i];
            const initials = m.name.split(' ').filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join('');
            return (
              <div key={i} className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl ${isChairman ? 'bg-navy-950 text-white' : 'bg-slate-50 border border-slate-100 hover:border-slate-200'}`}>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-base sm:truncate ${isChairman ? 'text-white' : 'text-navy-900'}`}>{m.name}</p>
                  <p className={`text-sm mt-0.5 leading-snug break-words ${isChairman ? 'text-white/50' : 'text-slate-400'}`}>{m.role}</p>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${isChairman ? 'bg-gold-400 text-navy-950' : 'bg-white border border-slate-200 text-slate-500'}`}>
                  {m.position}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Helpline strip ── */}
      <div className="bg-navy-950 rounded-3xl p-8 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-white/50 text-sm font-bold uppercase tracking-widest mb-1">Report Ragging</p>
          <p className="text-white font-black text-2xl">+91-98805 34935</p>
          <p className="text-white/40 text-sm mt-1">helpdesk.newhorizonindia.edu</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="tel:+919880534935" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-base font-bold px-5 py-2.5 rounded-full transition-colors">
            <Phone size={14} /> Call Helpline
          </a>
        </div>
      </div>

    </div>
  );
}

function Clubs() {
  const [activeTab, setActiveTab] = useState<'co' | 'extra' | 'sports'>('co');

  const CO_CURRICULAR = [
    { name: 'EMSYS Club',            logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/emsysclub.jpg' },
    { name: 'AeroBots',              logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/aerobotsclub.jpg' },
    { name: 'Green Energy Club',     logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/GC-club.jpg' },
    { name: 'RoboHorizon',           logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/robohorizonclub.jpg' },
    { name: 'Innovation Club',       logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/epsone.jpg' },
    { name: 'Evolve.AI',             logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/evovleclub.jpg' },
    { name: 'Tech Forge',            logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/techforgeclub.jpg' },
    { name: 'Mobile App Dev',        logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/md-club-1.jpg' },
    { name: 'BIT Club',              logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/bit-club.jpg' },
    { name: 'HealthXcel',            logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/healthexe.jpg' },
    { name: 'Cybersecurity Club',    logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/cseh-club.jpg' },
    { name: 'STEM Club',             logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/stem-1.jpg' },
    { name: 'Data Analytics Club',   logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/data-analytics-1.jpg' },
    { name: 'ED & Startup Club',     logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/edcelllogo.jpg' },
    { name: 'FOSS Club',             logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/FOS.jpg' },
  ];

  const EXTRA_CURRICULAR = [
    { name: 'Rotaract NHCE',  logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/rotratcnhce.jpg' },
    { name: 'Extantus',       logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Dance-club-logo150x150.jpg' },
    { name: 'Expressivo',     logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Music-club-logo150x150.jpg' },
    { name: 'VIBGYOR',        logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Art-club-logo150x150.jpg' },
    { name: 'LIT',            logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Literary-club-logo150x150.jpg' },
    { name: 'TEDx NHCE',      logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/01/TeDx-logo.png' },
    { name: 'NSS',            logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/NSS-logo-150x150-1.jpg' },
    { name: 'Politikos',      logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Sociopolitical-club-logo150x150.jpg' },
    { name: 'Fitness Beat',   logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/Fitness-clib-logo150x150.jpg' },
    { name: 'NHCE Media',     logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/NHCE-Media-Club-Logo150x150.jpg' },
    { name: 'Fashionista',    logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/fashionista1.png' },
    { name: 'LEO Club',       logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/LEO-logo150x150.jpg' },
    { name: 'Green Warriors', logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/1-1-1-1.jpg' },
    { name: 'Drama Club',     logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/drama-logo1.png' },
    { name: 'Alumni Club',    logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/cropped-Alumni-Club-logo.png' },
  ];

  const SPORTS = [
    { name: 'Volleyball Club', logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/150x150-2.jpg' },
    { name: 'Basketball Club', logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/150x150-4-1.jpg' },
    { name: 'Badminton Club',  logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/150x150.jpg' },
    { name: 'Kabaddi Club',    logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/IMG-20170215-WA0083.jpg' },
    { name: 'Football Club',   logo: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/10/1-1-2.jpg' },
  ];

  const WHY_JOIN = [
    { icon: Users,    label: 'Networking',               desc: 'Build connections with peers, seniors and industry professionals.' },
    { icon: Heart,    label: 'Social Skills',             desc: 'Collaborate, communicate and grow in team environments.'          },
    { icon: Star,     label: 'Professional Experience',   desc: 'Gain real skills and projects for your resume.'                  },
    { icon: BookOpen, label: 'Personal Development',      desc: 'Explore interests beyond engineering coursework.'                 },
    { icon: Shield,   label: 'Leadership',                desc: 'Take charge — every club is student-run and annually elected.'   },
    { icon: Leaf,     label: 'Organisation & Management', desc: 'Plan events, manage budgets and lead initiatives from day one.'  },
  ];

  const TABS = [
    { key: 'co',     label: 'Co-Curricular',    count: 15, clubs: CO_CURRICULAR  },
    { key: 'extra',  label: 'Extra-Curricular', count: 15, clubs: EXTRA_CURRICULAR },
    { key: 'sports', label: 'Sports',           count: 5,  clubs: SPORTS          },
  ] as const;

  const current = TABS.find(t => t.key === activeTab)!;

  return (
    <div className="space-y-12">

      {/* ── Header ── */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge bg-purple-100 text-purple-700 mb-5">Student Clubs</span>
          <h2 className="font-display font-black text-2xl lg:text-5xl text-navy-950 leading-tight mb-4">
            Find Your<br /><span className="text-purple-600">Community</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            35 clubs across engineering, arts, sports and social causes. Every club is student-run, annually elected and open to one membership per student — so every member commits fully.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: '15', label: 'Co-Curricular',    bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600' },
            { num: '15', label: 'Extra-Curricular', bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600' },
            { num: '5',  label: 'Sports Clubs',     bg: 'bg-violet-50', border: 'border-violet-100', text: 'text-violet-600' },
          ].map(s => (
            <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl sm:rounded-3xl p-3 sm:p-5 text-center`}>
              <p className={`font-black text-xl sm:text-2xl ${s.text} leading-none`}>{s.num}</p>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-tight font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Join ── */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">Why Join a Club?</p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {WHY_JOIN.map(w => (
            <div key={w.label} className="flex items-start gap-3 bg-white border border-slate-100 hover:border-purple-100 hover:shadow-sm rounded-2xl p-4 transition-all duration-200 group">
              <div className="w-9 h-9 rounded-xl bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <w.icon size={15} className="text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-navy-900 text-base">{w.label}</p>
                <p className="text-slate-400 text-sm mt-0.5 leading-snug">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Club categories + tab selector ── */}
      <div>
        {/* Tab bar */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mb-6 border-b border-slate-100 pb-4">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === t.key
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === t.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Club grid */}
        <div
          key={activeTab}
          className={`grid gap-3 ${current.clubs.length <= 5 ? 'grid-cols-3 sm:grid-cols-5' : 'grid-cols-3 sm:grid-cols-5 lg:grid-cols-8'}`}
          style={{ animation: 'fadeIn 0.3s ease both' }}
        >
          {current.clubs.map(c => (
            <div key={c.name} className="flex flex-col items-center gap-2 group">
              <div className="w-full aspect-square rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden group-hover:shadow-md group-hover:border-purple-100 transition-all duration-300">
                <img
                  src={c.logo}
                  alt={c.name}
                  className="w-full h-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-sm text-slate-500 font-medium text-center leading-tight">{c.name}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function NSS() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      <div>
        <span className="badge bg-teal-100 text-teal-700 mb-5">NSS Unit Cell</span>
        <h2 className="font-display font-black text-2xl lg:text-5xl text-navy-950 leading-tight mb-4">
          Service Beyond<br /><span className="text-teal-600">the Campus</span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-7">
          New Horizon's NSS unit has adopted 93 tribal villages in Bandipur, Nagarwala and Kabini — working on ground to improve living conditions and run skills training. Year-round, sustained engagement.
        </p>
        <div className="bg-slate-50 border border-teal-100 rounded-2xl p-5 mb-7 flex items-end gap-4">
          <p className="font-black text-7xl text-navy-950 leading-none">93</p>
          <div>
            <p className="text-teal-600 font-bold text-base">Tribal villages adopted</p>
            <p className="text-slate-400 text-sm mt-0.5">Bandipur · Nagarwala · Kabini</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { icon: Leaf,     label: 'AI Skills Training',      desc: 'Teaching practical technology skills in remote communities.' },
            { icon: Users,    label: 'Youth Engagement',        desc: 'Running under Bharat NSS and Viksit Bharat campaigns.'       },
            { icon: BookOpen, label: 'Life Skills Development',  desc: 'Workshops on health, hygiene and livelihood skills.'          },
          ].map(f => (
            <div key={f.label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <f.icon size={14} className="text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-navy-900 text-base">{f.label}</p>
                <p className="text-slate-400 text-sm mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 rounded-2xl overflow-hidden h-52">
          <img src={NSS_PHOTOS[0]} alt="" className="w-full h-full object-cover" />
        </div>
        {NSS_PHOTOS.slice(1).map((img, i) => (
          <div key={i} className="rounded-2xl overflow-hidden h-40">
            <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Medical() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="rounded-3xl overflow-hidden h-64 sm:h-[360px]">
        <img src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/11/medical.jpg" alt="Medical Centre" className="w-full h-full object-cover" />
      </div>
      <div>
        <span className="badge bg-blue-100 text-blue-700 mb-5">Medical Centre</span>
        <h2 className="font-display font-black text-2xl lg:text-5xl text-navy-950 leading-tight mb-4">
          Health Care<br /><span className="text-blue-600">On Campus</span>
        </h2>
        <p className="text-slate-500 text-lg leading-relaxed mb-7">
          NHCE maintains an on-campus Medical Centre staffed by trained professionals. Students can walk in for first aid, consultations and health monitoring — without leaving campus.
        </p>
        <div className="space-y-3">
          {[
            { icon: Stethoscope, primary: 'On-Campus Medical Staff', sub: 'First aid, consultations and health monitoring' },
            { icon: ArrowRight,  primary: 'Ambulance on Call',        sub: 'Emergency transport available at all times'   },
            { icon: Phone,       primary: '+91-98805 34935',           sub: 'Main campus helpline'                         },
          ].map(f => (
            <div key={f.primary} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-navy-900 text-base">{f.primary}</p>
                <p className="text-slate-400 text-sm mt-0.5">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PANELS: Record<string, () => JSX.Element> = {
  counselling: Counselling,
  ncc:         NCC,
  antiragging: AntiRagging,
  clubs:       Clubs,
  nss:         NSS,
  medical:     Medical,
};

/* ─── Page ──────────────────────────────────────────────────── */

export default function StudentServicesPage() {
  const [active, setActive] = useState('counselling');
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const Panel = PANELS[active];

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="/student_service_hero.png"
        badge="Student Life · NHCE"
        headingSmall="Beyond the Classroom"
        headingMain="Student"
        headingGhost="Services"
        description="From professional counselling to NCC drills, student clubs to NSS outreach — built around one idea: college is about more than your degree."
        button={{ label: 'Explore Services', onClick: () => document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth' }) }}
      />

      {/* ── Tab bar ── */}
      <div id="tabs" className="sticky top-20 sm:top-16 z-30 bg-white border-b border-slate-100 shadow-sm scroll-mt-20 sm:scroll-mt-16">
        <AnimateIn variant="fade-up">
        <div className="container-wide py-4 px-0 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-3 pb-2 px-4 sm:px-0 sm:grid sm:grid-cols-6 sm:pb-0 sm:overflow-visible">
            {SERVICES.map(s => {
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActive(s.id);
                    setTimeout(() => {
                      document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                  className={`relative h-24 rounded-2xl overflow-hidden group text-left transition-all duration-300 flex-shrink-0 w-36 sm:w-auto snap-start
                    ${isActive ? 'scale-[1.03] shadow-md' : 'opacity-55 hover:opacity-90 hover:scale-[1.01]'}
                  `}
                >
                  <img src={s.img} alt={s.label} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Active accent bar at top */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundColor: s.accentHex }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <div className="w-5 h-5 rounded-md border border-white/30 flex items-center justify-center mb-1">
                      <s.icon size={10} className="text-white" />
                    </div>
                    <p className="text-white font-bold text-xs leading-tight">{s.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        </AnimateIn>
      </div>

      {/* ── Content panel ── */}
      <div
        key={active}
        className="container-wide py-14 lg:py-20"
        style={{ animation: 'fadeIn 0.35s ease both' }}
      >
        <Panel />
      </div>

    </div>
  );
}