import { useState, useEffect, useRef } from 'react';
import {
  Heart, Eye, Sparkles, Users, BookOpen,
  Clock, MapPin, Phone, CheckCircle, Brain,
  Lock, Shield, Lightbulb, AlertCircle, UserCheck,
  Target, MessageCircle, Mic, ChevronRight, Calendar, LayoutGrid,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ─────────────────────────────────────────────────── */

const STATS = [
  { value: '1,000+', label: 'Students Supported', icon: Users },
  { value: '100%',   label: 'Free of Charge',      icon: Heart },
  { value: '100%',   label: 'Confidential',         icon: Lock },
  { value: 'Walk-in',label: 'No Appointment',       icon: CheckCircle },
];

const SERVICES = [
  {
    label: 'Individual Counselling',
    category: 'Individual',
    desc: 'Confidential one-on-one sessions tailored to each student\'s personal concerns and goals. Our counsellors create a safe, non-judgmental environment where you can speak freely.',
    img: '/individual_counselling.png',
    icon: UserCheck,
    chip: 'bg-rose-100 text-rose-700',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    activeTab: 'bg-rose-600 text-white shadow-lg',
    highlights: ['Strictly private — all sessions are confidential', 'Personalised plan crafted around your needs', 'Walk-in anytime, no appointment required'],
  },
  {
    label: 'Academic Counselling',
    category: 'Academic',
    desc: 'Guidance on study habits, time management, academic pressure and career direction. We help you find strategies that fit your unique learning style and goals.',
    img: '/academic_counselling.png',
    icon: BookOpen,
    chip: 'bg-blue-100 text-blue-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    activeTab: 'bg-blue-600 text-white shadow-lg',
    highlights: ['Study strategies tailored to your learning style', 'Managing exam stress and performance anxiety', 'Academic goal-setting and career direction'],
  },
  {
    label: 'Induction Counselling',
    category: 'Induction',
    desc: 'Helping new students settle into college life and build a strong foundation from day one. Transition support to help you feel at home quickly.',
    img: '/induction_counselling.png',
    icon: Sparkles,
    chip: 'bg-violet-100 text-violet-700',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    activeTab: 'bg-violet-600 text-white shadow-lg',
    highlights: ['Easing the transition into college life', 'Building new social networks and friendships', 'Understanding campus resources and support systems'],
  },
  {
    label: 'Interactive Sessions',
    category: 'Interactive',
    desc: 'Group activities and peer discussions to improve communication, empathy and social skills. A collaborative space to grow alongside fellow students.',
    img: '/interactive_sessions.png',
    icon: Mic,
    chip: 'bg-amber-100 text-amber-700',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    activeTab: 'bg-amber-500 text-white shadow-lg',
    highlights: ['Group-based skill-building activities', 'Improve communication and social confidence', 'Peer support in a structured, safe environment'],
  },
  {
    label: 'Awareness Programs',
    category: 'Awareness',
    desc: 'Campus-wide initiatives on mental health, emotional well-being and life skills. We bring the conversation about mental health into the open.',
    img: '/awareness_program.png',
    icon: Eye,
    chip: 'bg-emerald-100 text-emerald-700',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    activeTab: 'bg-emerald-600 text-white shadow-lg',
    highlights: ['Campus-wide mental health campaigns', 'Life skills workshops and seminars', 'Destigmatising conversations around well-being'],
  },
  {
    label: 'Parent Meetings',
    category: 'Family',
    desc: 'Collaborative sessions with families to create a holistic support system for the student. Strong family involvement leads to stronger student outcomes.',
    img: '/parents_meeting.png',
    icon: Users,
    accentColor: 'sky',
    chip: 'bg-sky-100 text-sky-700',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    activeTab: 'bg-sky-600 text-white shadow-lg',
    highlights: ['Collaborative family-counsellor discussions', 'Strengthening the student\'s support network at home', 'Bridging communication between student and family'],
  },
];

const APPROACH = [
  {
    num: '01',
    icon: Lock,
    title: 'Confidentiality',
    desc: 'What you share stays between you and your counsellor. Shared information is strictly private — always.',
    gradient: 'from-navy-950 to-navy-800',
    blob1: 'bg-white/5',
    blob2: 'bg-rose-500/15',
    iconBg: 'bg-rose-500/20 border border-rose-400/30',
    iconColor: 'text-rose-400',
  },
  {
    num: '02',
    icon: Heart,
    title: 'Empathy & Respect',
    desc: 'Your background, pace and story are recognised and honoured without judgment in every session.',
    gradient: 'from-rose-600 to-rose-500',
    blob1: 'bg-white/10',
    blob2: 'bg-navy-900/20',
    iconBg: 'bg-white/20 border border-white/30',
    iconColor: 'text-white',
  },
  {
    num: '03',
    icon: Brain,
    title: 'Self-Awareness & Growth',
    desc: 'Sessions guide you toward reflection, insight and informed decision-making for lasting personal growth.',
    gradient: 'from-violet-900 to-violet-700',
    blob1: 'bg-white/10',
    blob2: 'bg-violet-300/15',
    iconBg: 'bg-white/20 border border-white/25',
    iconColor: 'text-white',
  },
];

const WHY_REASONS = [
  { icon: AlertCircle, title: 'Fast-Paced Modern Life',   desc: 'Rapid lifestyle changes and nuclear families can create isolation and emotional disconnect.', color: 'bg-rose-50 border-rose-200', iconColor: 'bg-rose-500' },
  { icon: Lightbulb,   title: 'Digital Distractions',    desc: 'Constant digital engagement impacts focus, sleep, and meaningful personal connections.', color: 'bg-amber-50 border-amber-200', iconColor: 'bg-amber-500' },
  { icon: Shield,      title: 'College Transition',       desc: 'Adapting to new environments, expectations, and social circles is a major life adjustment.', color: 'bg-emerald-50 border-emerald-200', iconColor: 'bg-emerald-500' },
  { icon: Target,      title: 'Academic Pressure',        desc: 'Examination stress and performance anxiety can affect both health and academic outcomes.', color: 'bg-blue-50 border-blue-200', iconColor: 'bg-blue-500' },
  { icon: Users,       title: 'Personal & Family Issues', desc: 'Home-life challenges often spill into academic performance and emotional well-being.', color: 'bg-violet-50 border-violet-200', iconColor: 'bg-violet-500' },
  { icon: Heart,       title: 'Finding Balance',          desc: 'Counselling provides the tools and perspective needed to achieve a healthy, fulfilling life.', color: 'bg-sky-50 border-sky-200', iconColor: 'bg-sky-500' },
];

const CONDITIONS = [
  'Childhood Trauma', 'Body Image Issues', 'Phobias', 'Eating Disorders',
  'Low Self-Esteem', 'Sexual Orientation', 'Family Conflict', 'Interpersonal Issues',
  'Lack of Motivation', 'Exam Anxiety', 'Emotional Concerns', 'Social Challenges',
];

const BRIEF_THERAPY_POINTS = [
  'Time-limited, present-focused approach (1–12 sessions)',
  'Focus on current symptoms and immediate circumstances',
  'Builds on client strengths and available resources',
  'Collaborative goal-setting between student and counsellor',
  'Includes homework assignments to reinforce progress',
  'Effective for situational problems and mild anxiety',
];

const QUOTES = [
  { text: 'Taking care of your mind is just as important as taking care of your grades.', author: 'NHCE Counselling Centre' },
  { text: "You don't have to be in crisis to seek counselling. Prevention is as important as cure.", author: 'NHCE Counselling Centre' },
  { text: 'Asking for help is a sign of strength, not weakness.', author: 'NHCE Counselling Centre' },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function ProfessionalCounsellingPage() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const [allianceExpanded, setAllianceExpanded] = useState(false);
  const [introExpanded, setIntroExpanded] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);
  const allianceRef = useRef<HTMLDivElement>(null);

  // Why Counselling mobile slider — infinite loop via cloned slides
  const WHY_LEN = WHY_REASONS.length;
  // Extended: [clone-of-last, ...real slides, clone-of-first]
  const whyExtSlides = [WHY_REASONS[WHY_LEN - 1], ...WHY_REASONS, WHY_REASONS[0]];
  const [whyIdx, setWhyIdx] = useState(1); // 1 = first real slide
  const [whyAnimate, setWhyAnimate] = useState(true);
  const whyTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const whyRestartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const whyTouchX = useRef(0);

  const goWhyNext = () => setWhyIdx(i => i + 1);
  const goWhyPrev = () => setWhyIdx(i => i - 1);

  const stopWhyAuto = () => {
    if (whyTimer.current) { clearInterval(whyTimer.current); whyTimer.current = null; }
  };
  const startWhyAuto = () => {
    stopWhyAuto();
    whyTimer.current = setInterval(goWhyNext, 2000);
  };

  useEffect(() => {
    startWhyAuto();
    return () => {
      stopWhyAuto();
      if (whyRestartTimer.current) clearTimeout(whyRestartTimer.current);
    };
  }, []);

  // After reaching a clone, silently jump to the real counterpart
  const onWhyTransitionEnd = () => {
    if (whyIdx >= WHY_LEN + 1) {
      setWhyAnimate(false);
      setWhyIdx(1);
    } else if (whyIdx <= 0) {
      setWhyAnimate(false);
      setWhyIdx(WHY_LEN);
    }
  };

  // Re-enable animation after the silent jump renders
  useEffect(() => {
    if (!whyAnimate) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setWhyAnimate(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [whyAnimate, whyIdx]);

  const onWhyTouchStart = (e: React.TouchEvent) => {
    whyTouchX.current = e.touches[0].clientX;
    stopWhyAuto();
    if (whyRestartTimer.current) { clearTimeout(whyRestartTimer.current); whyRestartTimer.current = null; }
  };
  const onWhyTouchEnd = (e: React.TouchEvent) => {
    const diff = whyTouchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goWhyNext();
      else goWhyPrev();
    }
    // Resume auto-play 3 s after user lifts finger
    whyRestartTimer.current = setTimeout(startWhyAuto, 3000);
  };

  const whyRealSlide = (whyIdx - 1 + WHY_LEN) % WHY_LEN;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/Mental-Health.jpg"
        badge="Professional Counselling"
        headingSmall="Student Well-being"
        headingMain="You Are Not Alone"
        headingGhost="Support"
        description="A safe, free and confidential space — professional counselling for every NHCE student, no appointment needed."
        button={{ label: 'Call Us Now', href: 'tel:+919880534935' }}
        secondaryButton={{ label: 'Our Services', to: '#services' }}
      />



      {/* ══════════════════════════════════════════════════════
          1. INTRODUCTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">


          {/* ── Unified split card ── */}
          <AnimateIn variant="fade-up" delay={60}>
            <div className="grid lg:grid-cols-5 rounded-3xl overflow-hidden shadow-card-hover border border-slate-200">

              {/* Left — image with frosted info overlay (2 cols = 40%) */}
              <div className="lg:col-span-2 relative h-48 lg:h-auto min-h-[350px]">
                <img
                  src="/individual_counselling.png"
                  alt="NHCE Counselling Centre"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient — clear top, dark only at bottom for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />

              </div>

              {/* Right — content panel (3 cols = 60%) */}
              <div className="lg:col-span-3 bg-white p-5 lg-p-10 flex flex-col justify-center gap-8">

                {/* Heading + body copy */}
                <div ref={introRef}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-3">We’re here to listen</p>
                  <h3 className="font-display text-xl lg:text-3xl font-bold text-navy-950 leading-snug mb-4">
                    Your mental well-being matters
                  </h3>
                  <p className="text-slate-500 text-sm pb-2 leading-relaxed">
                    The Department of Counselling at New Horizon College of Engineering offers a professional and confidential space for all registered students to seek support and guidance. Counselling Centre provides a safe and non-judgemental environment to talk things through, be it academic challenges, emotional stress, or personal concerns.
                  </p>
                  <div className={introExpanded ? "block md:block" : "hidden md:block"}>
                    <p className="text-slate-500 text-sm pb-2 leading-relaxed">Our goal is to help students gain clarity, build self-awareness, and grow in confidence. The counselling process focuses on recognizing individual strengths and fostering self-growth, self-acceptance, and emotional well-being.</p>
                    <p className="text-slate-500 text-sm pb-2 leading-relaxed">Sessions are typically one-on-one, short-term, free of charge, and strictly confidential. Students are encouraged to walk in and reach out—no appointment necessary. Your mental and emotional health matters, and we’re here to support you every step of the way.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (introExpanded) introRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      setIntroExpanded(v => !v);
                    }}
                    className="md:hidden inline-flex items-center gap-1.5 text-rose-600 font-semibold text-sm hover:text-rose-700 transition-colors mt-1 mb-2"
                  >
                    {introExpanded ? "Read Less" : "Read More"}
                    <ChevronRight size={15} className={introExpanded ? "transition-transform duration-200 rotate-90" : "transition-transform duration-200"} />
                  </button>
                </div>


                {/* Phone CTA */}
                <a
                  href="tel:+919880534935"
                  className="inline-flex items-center gap-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold px-6 py-3.5 rounded-xl transition-colors text-sm w-fit shadow-sm"
                >
                  <Phone size={15} />
                  Call +91 98805 34935
                </a>

              </div>
            </div>
          </AnimateIn>

        </div>
      </section>

            {/* ══════════════════════════════════════════════════════
          2. OUR APPROACH
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                <Brain size={12} />
                Our Approach
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-950">
                Built on Trust
              </h2>
              <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto">
                Three core principles shape every counselling interaction at NHCE.
              </p>
            </div>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-4 md:gap-7">
            {APPROACH.map((a, i) => (
              <AnimateIn key={a.title} variant="fade-up" delay={i * 80}>
                <div className={`relative bg-gradient-to-br ${a.gradient} rounded-2xl md:rounded-3xl p-5 md:p-8 h-full overflow-hidden flex flex-col group hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300`}>
                  {/* Decorative blobs — desktop only */}
                  <div className={`absolute -top-10 -right-10 w-44 h-44 ${a.blob1} rounded-full pointer-events-none hidden md:block`} />
                  <div className={`absolute -bottom-8 -left-8 w-32 h-32 ${a.blob2} rounded-full pointer-events-none hidden md:block`} />
                  {/* Watermark number */}
                  <div className="absolute top-3 right-4 font-black text-5xl md:text-8xl leading-none select-none pointer-events-none text-white/10">
                    {a.num}
                  </div>
                  {/* Mobile: row layout — icon left, text right. Desktop: column */}
                  <div className="relative z-10 flex flex-row md:flex-col items-start gap-4 md:gap-0 flex-1">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${a.iconBg} flex items-center justify-center flex-shrink-0 md:mb-6`}>
                      <a.icon size={18} className={a.iconColor} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1 md:mb-2">Principle {a.num}</p>
                      <h3 className="font-display text-base md:text-xl font-bold text-white mb-1 md:mb-4">{a.title}</h3>
                      <p className="text-white/65 text-xs md:text-sm leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          3. COUNSELLING SERVICES
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="py-14 bg-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                <Heart size={12} />
                Services
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-950">
                Counselling Services
              </h2>
              <p className="text-slate-500 text-sm mt-3 max-w-xl mx-auto">
                Comprehensive support covering every dimension of student well-being — academic, emotional and social.
              </p>
            </div>
          </AnimateIn>

          {/* ── Feature panel ── */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-card-hover grid lg:grid-cols-5 lg:min-h-[420px]">

            {/* Image — top on mobile (order-1), right on desktop (order-2) */}
            <div className="order-1 lg:order-2 lg:col-span-2 relative h-56 sm:h-72 lg:h-auto overflow-hidden">
              <img
                key={active}
                src={svc.img}
                alt={svc.label}
                className="absolute inset-0 w-full h-full object-cover object-top animate-slide-down"
              />
              {/* Desktop: left-edge gradient blends into white content panel */}
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent hidden lg:block" />
              {/* Mobile: bottom fade softens the cut between image and content */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent lg:hidden" />
              {/* Prev / Next arrows */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setActive((active - 1 + SERVICES.length) % SERVICES.length)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronRight size={16} className="text-navy-950 rotate-180" />
                </button>
                <button
                  onClick={() => setActive((active + 1) % SERVICES.length)}
                  className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                >
                  <ChevronRight size={16} className="text-navy-950" />
                </button>
              </div>
            </div>

            {/* Content — below image on mobile (order-2), left on desktop (order-1) */}
            <div key={`content-${active}`} className="order-2 lg:order-1 lg:col-span-3 bg-white p-6 sm:p-8 lg:p-10 flex flex-col gap-5 animate-slide-up">

              {/* Category chip */}
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full w-fit ${svc.chip}`}>
                {svc.category}
              </span>

              {/* Title + desc */}
              <div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-navy-950 leading-snug mb-3">
                  {svc.label}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5">
                {svc.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full ${svc.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <CheckCircle size={11} className={svc.iconColor} />
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Progress dots + counter */}
              <div className="flex items-center gap-2 mt-auto pt-2">
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to service ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      active === i ? 'w-6 h-2.5 bg-navy-950' : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
                <span className="ml-2 text-slate-400 text-xs font-semibold">{active + 1} / {SERVICES.length}</span>
              </div>
            </div>

          </div>

          <div className="flex justify-center">
            <Link
              to="/counselling-services"
              className="group inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full border-2 border-navy-200 text-navy-900 font-semibold text-sm bg-white hover:bg-navy-950 hover:text-white hover:border-navy-950 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <LayoutGrid size={15} />
              View All Counselling Services
              <span className="w-6 h-6 rounded-full bg-navy-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </Link>
          </div>
        </div>
      </section>



      {/* ══════════════════════════════════════════════════════
          4. WHY COUNSELLING IS REQUIRED
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Background watermark illustration */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src="/counseling.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
          />
        </div>
        {/* Subtle white vignette so edges fade cleanly */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,white_90%)]" />

        <div className="container-wide relative z-10">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-blue-950 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                <AlertCircle size={12} />
                Why It Matters
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-950 leading-tight mb-4">
                Why Counselling <span className="text-rose-600">Is Required</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
                Modern college life brings a unique set of challenges. Counselling equips students with the tools to navigate them effectively.
              </p>
            </div>
          </AnimateIn>
          {/* Mobile slider */}
          <div
            className="sm:hidden overflow-hidden"
            onTouchStart={onWhyTouchStart}
            onTouchEnd={onWhyTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${whyIdx * 100}%)`,
                transition: whyAnimate ? 'transform 0.5s ease-in-out' : 'none',
              }}
              onTransitionEnd={onWhyTransitionEnd}
            >
              {whyExtSlides.map((r, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className={`flex items-start gap-4 p-5 rounded-2xl border ${r.color}`}>
                    <div className={`w-12 h-12 rounded-xl ${r.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <r.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-navy-950 text-sm mb-1">{r.title}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {WHY_REASONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setWhyIdx(i + 1); stopWhyAuto(); whyRestartTimer.current = setTimeout(startWhyAuto, 3000); }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === whyRealSlide ? 'w-5 bg-navy-950' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_REASONS.map((r, i) => (
              <AnimateIn key={i} variant="fade-up" delay={i * 60}>
                <div className={`flex items-start gap-4 p-5 rounded-2xl border ${r.color} h-full`}>
                  <div className={`w-12 h-12 rounded-xl ${r.iconColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <r.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950 text-sm mb-1">{r.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              to="/counselling-events"
              className="group inline-flex items-center gap-3 mt-8 px-6 py-3 rounded-full border-2 border-rose-200 text-rose-600 font-semibold text-sm bg-white hover:bg-rose-600 hover:text-white hover:border-rose-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Calendar size={15} />
              View Counselling Events &amp; Workshops
              <span className="w-6 h-6 rounded-full bg-rose-50 group-hover:bg-white/20 flex items-center justify-center transition-colors duration-300">
                <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          5. WHEN TO APPROACH THE COUNSELLOR
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                <UserCheck size={12} />
                When to Approach
              </span>
              <h2 className="font-display text-xl lg:text-3xl font-bold text-white leading-tight mb-4">
                When to Approach <span className="text-rose-400">the Counsellor</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-2xl mx-auto">
                Students may approach counsellors for any of the following concerns — or anything else weighing on them. No issue is too small.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="flex flex-wrap justify-center gap-3">
              {CONDITIONS.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-rose-500/30 border border-white/15 hover:border-rose-400/50 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200 cursor-default"
                >
                  <CheckCircle size={11} className="text-rose-400" />
                  {c}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          6. THERAPEUTIC ALLIANCE
      ══════════════════════════════════════════════════════ */}
      <section className="py-10 lg:py-14 lg:pt-20 bg-white">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Image — shown first on mobile */}
            <AnimateIn variant="fade-up" className="order-1 lg:order-2">
              <div className="rounded-2xl lg:rounded-3xl overflow-hidden shadow-card">
                <img
                  src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/04/alliance.png"
                  alt="Therapeutic Alliance"
                  className="w-full h-52 sm:h-72 lg:h-[500px] object-cover"
                />
              </div>
            </AnimateIn>

            {/* Text content */}
            <AnimateIn variant="fade-up" delay={80} className="order-2 lg:order-1">
              <div ref={allianceRef}>
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-navy-950 leading-tight mb-4">
                  The Therapeutic <span className="text-rose-600">Alliance</span>
                </h2>
                <div className="space-y-3">
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    A therapeutic alliance is a professional relationship between a counsellor and a counselee that creates a framework for exploring emotions, behaviors, and thought patterns while facilitating positive change.
                  </p>
                  <div className={allianceExpanded ? "block md:block" : "hidden md:block"}>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      In this alliance, a personal space of mutual trust is established, allowing the client to share concerns in an accepting, non-judgmental, and confidential environment. Within this space, the client feels truly heard, which empowers them to find solutions by connecting with their internal and external resources.
                    </p>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed mt-3">
                      Advice-giving is not part of counselling, as solutions imposed from the outside are often ineffective. Every person is unique, shaped by their circumstances, and true growth comes from within.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (allianceExpanded) allianceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                      setAllianceExpanded(v => !v);
                    }}
                    className="md:hidden inline-flex items-center gap-1.5 text-rose-600 font-semibold text-sm hover:text-rose-700 transition-colors mt-2"
                  >
                    {allianceExpanded ? "Read Less" : "Read More"}
                    <ChevronRight size={15} className={allianceExpanded ? "transition-transform duration-200 rotate-90" : "transition-transform duration-200"} />
                  </button>
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          7. VISIT THE COUNSELLING CENTRE
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-8 md:mb-14">
              <span className="inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                <MapPin size={12} />
                Visit Us
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-navy-950">
                Visit the Counselling Centre
              </h2>
              <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
                We are here for you — walk in, no appointment needed.
              </p>
            </div>
          </AnimateIn>

          {/* Contact cards */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-7 mb-8">
            <AnimateIn variant="fade-up" delay={0}>
              <div className="bg-rose-50 border-2 border-rose-100 rounded-2xl p-4 md:p-8 flex flex-row md:flex-col items-center gap-4 md:gap-5 md:text-center hover:shadow-card transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-rose-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-1">Location</p>
                  <h4 className="font-bold text-navy-950 text-sm md:text-base mb-1">Chhatrapati Shivaji Block</h4>
                  <p className="text-slate-600 text-xs md:text-sm font-semibold">Student Counselling Centre</p>
                  <p className="text-slate-600 text-xs md:text-sm font-semibold">3rd &amp; 4th Floor</p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={80}>
              <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-4 md:p-8 flex flex-row md:flex-col items-center gap-4 md:gap-5 md:text-center hover:shadow-card transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Working Hours</p>
                  <h4 className="font-bold text-navy-950 text-sm md:text-base mb-1">Monday – Friday</h4>
                  <p className="text-slate-600 text-xs md:text-sm font-semibold">9:30 AM – 4:30 PM</p>
                  <p className="text-slate-400 text-xs mt-1">Walk-in · No appointment required</p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={160}>
              <div className="bg-violet-50 border-2 border-violet-100 rounded-2xl p-4 md:p-8 flex flex-row md:flex-col items-center gap-4 md:gap-5 md:text-center hover:shadow-card transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-violet-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-violet-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-violet-500 mb-1">Contact</p>
                  <h4 className="font-bold text-navy-950 text-sm md:text-base mb-1">Call Us</h4>
                  <a href="tel:+919880534935" className="block font-bold text-navy-900 hover:text-rose-600 transition-colors text-xs md:text-sm">+91 98805 34935</a>
                  <a href="tel:+918066297777" className="block text-slate-500 hover:text-rose-600 transition-colors text-xs md:text-sm mt-1">+91-80-6629-7777</a>
                </div>
              </div>
            </AnimateIn>
          </div>

        </div>
      </section>

    </div>
  );
}
