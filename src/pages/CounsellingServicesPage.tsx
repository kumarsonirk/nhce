import { useState, useEffect, useRef } from 'react';
import {
  Heart, Users, BookOpen, Sparkles, Eye, Mic,
  CheckCircle, MapPin, Phone, Clock, Shield,
  Brain, UserCheck, Target, Lightbulb,
  ChevronRight, MessageCircle,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ─────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Sparkles,
    title: 'Induction Counselling',
    tag: 'New Students',
    desc: 'Transition support for first-year students — managing initial anxiety, building peer connections, and aligning with academic expectations from day one.',
    bar: 'bg-violet-500',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    tag_bg: 'bg-violet-100 text-violet-700',
  },
  {
    icon: UserCheck,
    title: 'Individual Counselling',
    tag: 'Most Sought',
    desc: 'Confidential one-on-one sessions addressing personal, emotional, or psychological challenges in a safe, non-judgmental environment. Walk in anytime.',
    bar: 'bg-rose-500',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    tag_bg: 'bg-rose-100 text-rose-700',
  },
  {
    icon: BookOpen,
    title: 'Academic Counselling',
    tag: 'Academic Focus',
    desc: 'Targeted support for study habits, time management, exam stress, and career direction — strategies tailored to your learning style and goals.',
    bar: 'bg-blue-500',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag_bg: 'bg-blue-100 text-blue-700',
  },
  {
    icon: Eye,
    title: 'Awareness Programs',
    tag: 'Campus-Wide',
    desc: 'Workshops and campaigns on mental health, self-care, digital detox, stress management, and peer pressure — bringing well-being into the open.',
    bar: 'bg-emerald-500',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tag_bg: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Mic,
    title: 'Interactive Sessions',
    tag: 'Group Based',
    desc: 'Facilitated group activities and discussion forums promoting self-awareness, empathy, communication skills, and mutual peer support.',
    bar: 'bg-amber-500',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    tag_bg: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Users,
    title: 'Parent Meetings',
    tag: 'Family Inclusive',
    desc: 'Collaborative sessions bridging communication between counsellors, students, and families — building a holistic support system at home and on campus.',
    bar: 'bg-sky-500',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    tag_bg: 'bg-sky-100 text-sky-700',
  },
];

const BENEFITS = [
  { icon: Heart,     title: 'Emotional Well-being',     desc: 'A safe outlet for honest expression, helping students process and overcome emotional challenges.' },
  { icon: Target,    title: 'Academic Performance',     desc: 'Tools to manage pressure, improve focus, and strategies tailored to your learning style.' },
  { icon: Shield,    title: 'Positive Coping Skills',   desc: 'Evidence-based techniques that build healthier responses to stress, setbacks, and uncertainty.' },
  { icon: Brain,     title: 'Self-Awareness',           desc: 'Guided reflection that deepens self-knowledge and helps students recognise their strengths.' },
  { icon: Lightbulb, title: 'Informed Decision-Making', desc: 'Frameworks for thoughtful choices — academically, personally, and in relationships.' },
];

const TEAM = [
  {
    name: 'Ms. Srividya Anand',
    title: 'Sr. Student Counsellor',
    qual: 'M.S. (Counselling & Psychotherapy)',
    bar: 'bg-rose-500',
    desc: 'An expert in Crisis Management, Career Guidance, and Academic Stress Management, she leads the team and handles complex individual cases with compassion. She also conducts workshops and forums for students and teachers, promoting awareness and support through interactive engagement.',
    specialties: ['Crisis Management', 'Career Guidance', 'Academic Stress'],
  },
  {
    name: 'Ms. Anna Jogie',
    title: 'Student Counsellor',
    qual: "Master's in Counselling Psychology",
    bar: 'bg-violet-500',
    desc: 'Highly specialized in Cognitive Behavioral Therapy (CBT) and Adolescent Counselling, she works closely with students to help them understand and manage their thoughts, emotions, and behaviors. Her sessions focus on building coping skills, emotional awareness, and positive mental health practices tailored to young adults.',
    specialties: ['CBT', 'Adolescent Counselling', 'Coping Skills'],
  },
  {
    name: 'Ms. Kajal Janardhanan',
    title: 'Student Counsellor',
    qual: 'M.Sc (Counselling Psychology)',
    bar: 'bg-navy-700',
    desc: 'Dedicated counselling professional experienced in individual and group therapy for college students. Skilled in psychological screenings to create targeted, evidence-based support plans. Builds an empathetic, supportive environment that strengthens student resilience and helps them navigate college challenges effectively.',
    specialties: ['Group Therapy', 'Psychological Screening', 'Resilience Building'],
  },
  {
    name: 'Ms. Nidhi Parate',
    title: 'Student Counsellor',
    qual: 'M.Sc. (Counselling Psychology)',
    bar: 'bg-emerald-500',
    desc: 'Clinical Psychology specialist trained in REBT, CBT, life coaching, and adolescent counselling. She supports students with emotional regulation, relationships, stress, and anxiety. With a holistic, evidence-based approach, she creates a safe, non-judgmental space for personal growth and emotional well-being.',
    specialties: ['REBT', 'CBT', 'Life Coaching', 'Adolescent Counselling'],
  },
];

/* ─── Component ─────────────────────────────────────────────── */

export default function CounsellingServicesPage() {
  const SVC_LEN = SERVICES.length;
  const svcExt = [SERVICES[SVC_LEN - 1], ...SERVICES, SERVICES[0]];
  const [svcIdx, setSvcIdx] = useState(1);
  const [svcAnimate, setSvcAnimate] = useState(true);
  const svcTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const svcRestartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const svcTouchX = useRef(0);

  const goSvcNext = () => setSvcIdx(i => i + 1);
  const goSvcPrev = () => setSvcIdx(i => i - 1);
  const stopSvcAuto = () => { if (svcTimer.current) { clearInterval(svcTimer.current); svcTimer.current = null; } };
  const startSvcAuto = () => { stopSvcAuto(); svcTimer.current = setInterval(goSvcNext, 2500); };

  useEffect(() => {
    startSvcAuto();
    return () => { stopSvcAuto(); if (svcRestartTimer.current) clearTimeout(svcRestartTimer.current); };
  }, []);

  const onSvcTransitionEnd = () => {
    if (svcIdx >= SVC_LEN + 1) { setSvcAnimate(false); setSvcIdx(1); }
    else if (svcIdx <= 0) { setSvcAnimate(false); setSvcIdx(SVC_LEN); }
  };

  useEffect(() => {
    if (!svcAnimate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setSvcAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [svcAnimate, svcIdx]);

  const onSvcTouchStart = (e: React.TouchEvent) => {
    svcTouchX.current = e.touches[0].clientX;
    stopSvcAuto();
    if (svcRestartTimer.current) { clearTimeout(svcRestartTimer.current); svcRestartTimer.current = null; }
  };

  const onSvcTouchEnd = (e: React.TouchEvent) => {
    const diff = svcTouchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) goSvcNext(); else goSvcPrev(); }
    svcRestartTimer.current = setTimeout(startSvcAuto, 3000);
  };

  const svcReal = (svcIdx - 1 + SVC_LEN) % SVC_LEN;

  // ── Team slider ──────────────────────────────────────────
  const TEAM_LEN = TEAM.length;
  const teamExt = [TEAM[TEAM_LEN - 1], ...TEAM, TEAM[0]];
  const [teamIdx, setTeamIdx] = useState(1);
  const [teamAnimate, setTeamAnimate] = useState(true);
  const teamTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const teamRestartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const teamTouchX = useRef(0);

  const goTeamNext = () => setTeamIdx(i => i + 1);
  const goTeamPrev = () => setTeamIdx(i => i - 1);
  const stopTeamAuto = () => { if (teamTimer.current) { clearInterval(teamTimer.current); teamTimer.current = null; } };
  const startTeamAuto = () => { stopTeamAuto(); teamTimer.current = setInterval(goTeamNext, 2500); };

  useEffect(() => {
    startTeamAuto();
    return () => { stopTeamAuto(); if (teamRestartTimer.current) clearTimeout(teamRestartTimer.current); };
  }, []);

  const onTeamTransitionEnd = () => {
    if (teamIdx >= TEAM_LEN + 1) { setTeamAnimate(false); setTeamIdx(1); }
    else if (teamIdx <= 0) { setTeamAnimate(false); setTeamIdx(TEAM_LEN); }
  };

  useEffect(() => {
    if (!teamAnimate) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setTeamAnimate(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [teamAnimate, teamIdx]);

  const onTeamTouchStart = (e: React.TouchEvent) => {
    teamTouchX.current = e.touches[0].clientX;
    stopTeamAuto();
    if (teamRestartTimer.current) { clearTimeout(teamRestartTimer.current); teamRestartTimer.current = null; }
  };

  const onTeamTouchEnd = (e: React.TouchEvent) => {
    const diff = teamTouchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) goTeamNext(); else goTeamPrev(); }
    teamRestartTimer.current = setTimeout(startTeamAuto, 3000);
  };

  const teamReal = (teamIdx - 1 + TEAM_LEN) % TEAM_LEN;

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <HeroSection
        image="/academic_counselling.png"
        badge="NHCE · Student Well-being Centre"
        headingSmall="Free & Confidential Support"
        headingMain="Speak."
        headingGhost="Be Heard."
        description="Six dedicated services, four expert counsellors, one safe space — free and confidential support available to every NHCE student, every day."
        button={{ label: 'Explore Services', to: '#services' }}
        secondaryButton={{ label: 'Call Us', href: 'tel:+919880534935' }}
      />

      {/* ══════════════════════════════════════════════════════
          INTRO SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 pb-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <AnimateIn variant="fade-up">
              <span className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                <Heart size={12} />
                About the Centre
              </span>
              <h2 className="font-display text-xl lg:text-3xl font-bold text-navy-950 leading-tight mb-5">
                Supporting You Today,{' '}
                <span className="text-rose-600">Preparing You for Tomorrow</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                At NHCE, we recognise that student success is about more than just academics.
                Our Counselling Team provides confidential, one-on-one guidance to help you
                manage emotional challenges, improve mental well-being, and make the most of
                your college years.
              </p>
            </AnimateIn>
          </div>

          {/* Highlight cards — 2×2 on mobile, 4 col on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { icon: Shield,      label: 'Confidential',    sub: 'Nothing leaves the room',   bg: 'bg-rose-50',    border: 'border-rose-100',    iconBg: 'bg-rose-100',    iconC: 'text-rose-600'    },
              { icon: CheckCircle, label: 'Walk-in Ready',   sub: 'No appointment needed',      bg: 'bg-blue-50',    border: 'border-blue-100',    iconBg: 'bg-blue-100',    iconC: 'text-blue-600'    },
              { icon: Heart,       label: 'Completely Free', sub: 'For all enrolled students',  bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', iconC: 'text-emerald-600' },
              { icon: Users,       label: '4 Counsellors',   sub: '6 service types',            bg: 'bg-violet-50',  border: 'border-violet-100',  iconBg: 'bg-violet-100',  iconC: 'text-violet-600'  },
            ].map((h, i) => (
              <AnimateIn key={i} variant="fade-up" delay={i * 60}>
                <div className={`${h.bg} border ${h.border} rounded-2xl p-3.5 md:p-5 flex flex-col items-center text-center gap-2.5`}>
                  <div className={`w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${h.iconBg} flex items-center justify-center`}>
                    <h.icon size={16} className={`md:w-5 md:h-5 ${h.iconC}`} />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950 text-xs md:text-sm">{h.label}</p>
                    <p className="text-slate-400 text-[10px] md:text-xs mt-0.5 leading-snug">{h.sub}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="py-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <MessageCircle size={12} />
                What We Offer
              </span>
              <h2 className="font-display text-xl lg:text-3xl font-bold text-navy-950 mb-3">
                Our Counselling <span className="text-rose-600">Services</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
                Tailored support at every stage of your college journey — from your first week to graduation.
              </p>
            </div>
          </AnimateIn>

          {/* ── Mobile slider ── */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={onSvcTouchStart}
            onTouchEnd={onSvcTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${svcIdx * 100}%)`,
                transition: svcAnimate ? 'transform 0.5s ease-in-out' : 'none',
              }}
              onTransitionEnd={onSvcTransitionEnd}
            >
              {svcExt.map((s, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mx-1">
                    <div className={`h-1.5 w-full ${s.bar}`} />
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <s.icon size={20} className={s.iconColor} />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.tag_bg}`}>
                          {s.tag}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-navy-950 text-base mb-2">{s.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopSvcAuto(); setSvcIdx(i + 1); if (svcRestartTimer.current) clearTimeout(svcRestartTimer.current); svcRestartTimer.current = setTimeout(startSvcAuto, 3000); }}
                  className={`h-2 rounded-full transition-all duration-300 ${svcReal === i ? 'w-5 bg-rose-600' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          </div>

          {/* ── Desktop grid ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <AnimateIn key={i} variant="fade-up" delay={i * 60}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group">
                  <div className={`h-1.5 w-full ${s.bar}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl ${s.iconBg} flex items-center justify-center`}>
                        <s.icon size={22} className={s.iconColor} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.tag_bg}`}>
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-navy-950 text-lg mb-3 group-hover:text-rose-600 transition-colors duration-200">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{s.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          BENEFITS SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 lg:24 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-rose-500/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            <AnimateIn variant="fade-up" className="lg:col-span-2">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                  <Heart size={12} className="text-rose-400" />
                  Why It Helps
                </span>
                <h2 className="font-display text-xl lg:text-3xl font-bold text-white leading-tight mb-6">
                  Benefits of <span className="text-rose-400">Counselling</span>
                </h2>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                  <p className="font-display text-base font-bold text-white leading-snug mb-3">
                    "We recognize that student success is about more than just academics."
                  </p>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">— NHCE Counselling Centre</p>
                </div>
                <a
                  href="tel:+919880534935"
                  className="inline-flex items-center gap-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl transition-colors text-sm shadow-sm"
                >
                  <Phone size={15} />
                  Reach Out Today
                </a>
              </div>
            </AnimateIn>

            <AnimateIn variant="fade-up" delay={80} className="lg:col-span-3">
              <div className="space-y-4">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/30 rounded-2xl p-5 transition-all duration-200">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/25 flex items-center justify-center flex-shrink-0">
                      <b.icon size={18} className="text-rose-400" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm mb-1">{b.title}</p>
                      <p className="text-white/55 text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          MEET THE TEAM
      ══════════════════════════════════════════════════════ */}
      <section id="team" className="py-14 bg-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <Users size={12} />
                Our Counsellors
              </span>
              <h2 className="font-display text-xl lg:text-3xl font-bold text-navy-950 mb-3">
                Meet the <span className="text-rose-600">Team</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
                Qualified professionals dedicated to your mental health and personal growth — here for you every step of the way.
              </p>
            </div>
          </AnimateIn>

          {/* ── Mobile slider ── */}
          <div
            className="md:hidden overflow-hidden"
            onTouchStart={onTeamTouchStart}
            onTouchEnd={onTeamTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${teamIdx * 100}%)`,
                transition: teamAnimate ? 'transform 0.5s ease-in-out' : 'none',
              }}
              onTransitionEnd={onTeamTransitionEnd}
            >
              {teamExt.map((m, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mx-1">
                    <div className={`h-1.5 w-full ${m.bar}`} />
                    <div className="bg-navy-950 px-5 py-4">
                      <h3 className="font-display font-bold text-white text-base leading-snug mb-1">{m.name}</h3>
                      <p className="text-white/55 text-xs">{m.title} · {m.qual}</p>
                    </div>
                    <div className="px-5 py-5">
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">{m.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.specialties.map((sp, j) => (
                          <span key={j} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                            {sp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {TEAM.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopTeamAuto(); setTeamIdx(i + 1); if (teamRestartTimer.current) clearTimeout(teamRestartTimer.current); teamRestartTimer.current = setTimeout(startTeamAuto, 3000); }}
                  className={`h-2 rounded-full transition-all duration-300 ${teamReal === i ? 'w-5 bg-rose-600' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          </div>

          {/* ── Desktop grid ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <AnimateIn key={i} variant="fade-up" delay={i * 70}>
                <div className="bg-white border border-slate-100 rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  <div className={`h-1.5 w-full ${m.bar}`} />
                  <div className="bg-navy-950 px-5 py-5">
                    <h3 className="font-display font-bold text-white text-base leading-snug mb-1">{m.name}</h3>
                    <p className="text-white/55 text-xs">{m.title} · {m.qual}</p>
                  </div>
                  <div className="px-5 py-5 flex flex-col flex-1">
                    <p className="text-slate-500 text-xs leading-relaxed flex-1">{m.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {m.specialties.map((sp, j) => (
                        <span key={j} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          VISIT THE COUNSELLING CENTRE
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="container-wide">

          <AnimateIn variant="fade-up">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <MapPin size={12} />
                Find Us
              </span>
              <h2 className="font-display text-xl lg:text-3xl font-bold text-navy-950 mb-3">
                Visit the Counselling <span className="text-rose-600">Centre</span>
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Walk in anytime during working hours — no appointment needed. We are always here.
              </p>
            </div>
          </AnimateIn>

          {/* Two-column layout: info left, image right */}
          <div className="grid lg:grid-cols-2 gap-10 items-stretch mb-10">

            {/* Left: 3 info cards stacked */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: MapPin, label: 'Location', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', border: 'border-rose-100',
                  content: (
                    <>
                      <p className="font-bold text-navy-950 text-sm">Chhatrapati Shivaji Block</p>
                      <p className="text-slate-500 text-xs">Student Counselling Centre, 3rd & 4th Floor</p>
                    </>
                  ),
                },
                {
                  icon: Clock, label: 'Working Hours', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', border: 'border-blue-100',
                  content: (
                    <>
                      <p className="font-bold text-navy-950 text-sm">Monday – Friday</p>
                      <p className="text-slate-500 text-xs">9:30 AM – 4:30 PM · Walk-in welcome</p>
                    </>
                  ),
                },
                {
                  icon: Phone, label: 'Contact', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', border: 'border-violet-100',
                  content: (
                    <>
                      <p className="font-bold text-navy-950 text-sm">+91 98805 34935</p>
                      <p className="text-slate-500 text-xs">+91-80-6629-7777</p>
                    </>
                  ),
                },
              ].map((card, i) => (
                <AnimateIn key={i} variant="fade-up" delay={i * 70}>
                  <div className={`flex items-center gap-5 p-5 bg-white rounded-2xl border-2 ${card.border} shadow-card hover:shadow-card-hover transition-shadow`}>
                    <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <card.icon size={24} className={card.iconColor} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{card.label}</p>
                      {card.content}
                    </div>
                  </div>
                </AnimateIn>
              ))}

            
            </div>

            {/* Right: Image of the counselling block */}
            <AnimateIn variant="fade-up" delay={100}>
              <div className="relative rounded-3xl overflow-hidden h-full min-h-[300px] lg:min-h-0">
                <img
                  src="/student_service_hero.png"
                  alt="Student Services Block"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/counseling.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                {/* CTA overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">Ready to talk?</p>
                      <p className="text-white/60 text-xs">Our counsellors are just a walk away</p>
                    </div>
                    <a
                      href="tel:+919880534935"
                      className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex-shrink-0"
                    >
                      <Phone size={13} />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

          </div>

        </div>
      </section>

    </div>
  );
}
