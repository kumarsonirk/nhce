import { useState } from 'react';
import { Users, ChevronRight, Calendar, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Category config ───────────────────────────────────────── */

const CAT_MAP = {
  Workshop:    { bar: 'bg-navy-700', pill: 'bg-navy-50 text-navy-700 border-navy-200', dot: 'bg-navy-700' },
  Awareness:   { bar: 'bg-red-600',  pill: 'bg-red-50 text-red-700 border-red-200',   dot: 'bg-red-600' },
  Orientation: { bar: 'bg-navy-700', pill: 'bg-navy-50 text-navy-700 border-navy-200', dot: 'bg-navy-700' },
  Initiative:  { bar: 'bg-red-600',  pill: 'bg-red-50 text-red-700 border-red-200',   dot: 'bg-red-600' },
} as const;

type Cat = keyof typeof CAT_MAP;
const CATS: ('All' | Cat)[] = ['All', 'Workshop', 'Awareness', 'Orientation', 'Initiative'];

/* ─── Events data ───────────────────────────────────────────── */

const EVENTS = [
  {
    id: 1,
    title: 'Faculty Workshop – An Experiential Journey to Inner Balance',
    date: '28 February 2026',
    day: '28', month: 'FEB', year: '2026', hasDay: true,
    category: 'Workshop' as Cat,
    audience: 'Faculty',
    description: 'An immersive experiential workshop for faculty focused on achieving inner balance, managing professional stress, and building resilience in academic environments.',
    pdf: '#',
  },
  {
    id: 2,
    title: 'Observance of Veer Bal Diwas',
    date: '26–31 December 2025',
    day: '26', month: 'DEC', year: '2025', hasDay: true,
    category: 'Awareness' as Cat,
    audience: 'All',
    description: 'A week-long commemorative observance honoring Veer Bal Diwas, integrating themes of courage, sacrifice, and mental fortitude into the campus wellness narrative.',
    pdf: '#',
  },
  {
    id: 3,
    title: 'Drug-Free Campus Environment Initiative',
    date: 'ODD Semester 2025–26',
    day: '', month: 'SEM', year: '2025', hasDay: false,
    category: 'Initiative' as Cat,
    audience: 'All',
    description: 'A semester-long campus-wide initiative promoting a drug-free lifestyle through awareness sessions, peer education, and environmental wellness campaigns across all departments.',
    pdf: '#',
  },
  {
    id: 4,
    title: 'Report on National Task Force — Student Mental Health',
    date: '1 December 2025',
    day: '01', month: 'DEC', year: '2025', hasDay: true,
    category: 'Initiative' as Cat,
    audience: 'Faculty',
    description: 'Submission of the institutional report on student mental health and wellbeing support to the National Task Force, reflecting NHCE\'s commitment to evidence-based counselling practice.',
    pdf: '#',
  },
  {
    id: 5,
    title: 'World Mental Health Day Observation 2025',
    date: '11 October 2025',
    day: '11', month: 'OCT', year: '2025', hasDay: true,
    category: 'Awareness' as Cat,
    audience: 'All',
    description: 'Campus-wide programs marking World Mental Health Day 2025 — raising awareness, breaking stigma, and encouraging open conversations about emotional well-being among students and staff.',
    pdf: '#',
  },
  {
    id: 6,
    title: 'Campus Harmony Orientation Program',
    date: '16 September 2025',
    day: '16', month: 'SEP', year: '2025', hasDay: true,
    category: 'Orientation' as Cat,
    audience: 'First Year',
    description: 'A structured integration program helping incoming first-year students adapt to college life, build peer connections, and access counselling resources from their very first week.',
    pdf: '#',
  },
  {
    id: 7,
    title: 'Peer Counselling Training Program',
    date: '2024',
    day: '', month: '', year: '2024', hasDay: false,
    category: 'Workshop' as Cat,
    audience: 'Students',
    description: 'A comprehensive training program equipping student volunteers with foundational counselling skills, active listening techniques, and crisis referral protocols to support their peers.',
    pdf: '#',
  },
  {
    id: 8,
    title: 'Body Image & Eating Disorders Awareness Session',
    date: '2024',
    day: '', month: '', year: '2024', hasDay: false,
    category: 'Awareness' as Cat,
    audience: 'Students',
    description: 'An educational session addressing body image concerns, eating disorders, and self-esteem — delivered by experienced counsellors in a safe, supportive, and non-judgmental setting.',
    pdf: '#',
  },
  {
    id: 9,
    title: 'Faculty Development: Workplace Resilience & Dynamics',
    date: '2024',
    day: '', month: '', year: '2024', hasDay: false,
    category: 'Workshop' as Cat,
    audience: 'Faculty',
    description: 'A professional development session helping faculty navigate workplace dynamics, manage burnout, and maintain healthy boundaries in academic settings through resilience-building strategies.',
    pdf: '#',
  },
  {
    id: 10,
    title: 'Exam Stress Management Workshop',
    date: '2023',
    day: '', month: '', year: '2023', hasDay: false,
    category: 'Workshop' as Cat,
    audience: 'Students',
    description: 'A skill-building workshop on managing exam anxiety and academic pressure — equipping students with evidence-based coping strategies and time-management tools before examination season.',
    pdf: '#',
  },
  {
    id: 11,
    title: 'International Women\'s Day Celebration & Panel',
    date: '8 March 2023',
    day: '08', month: 'MAR', year: '2023', hasDay: true,
    category: 'Awareness' as Cat,
    audience: 'All',
    description: 'A special event honoring International Women\'s Day through panel discussions, wellness activities, and talks on gender equity, mental health, and empowerment — open to the entire campus.',
    pdf: '#',
  },
  {
    id: 12,
    title: 'Emotional Wellness & Self-Care Session',
    date: '2023',
    day: '', month: '', year: '2023', hasDay: false,
    category: 'Workshop' as Cat,
    audience: 'Students',
    description: 'An interactive session exploring emotional wellness, mindfulness practices, and daily self-care habits — giving students practical tools to manage stress and nurture long-term mental health.',
    pdf: '#',
  },
  {
    id: 13,
    title: 'Substance Abuse Prevention Campaign',
    date: '2022',
    day: '', month: '', year: '2022', hasDay: false,
    category: 'Initiative' as Cat,
    audience: 'Students',
    description: 'A targeted campus-wide awareness campaign on the dangers of substance abuse, featuring expert talks, interactive activities, and accessible resources for students seeking help or supporting peers.',
    pdf: '#',
  },
  {
    id: 14,
    title: 'Mindfulness & Stress Reduction Workshop',
    date: '2022',
    day: '', month: '', year: '2022', hasDay: false,
    category: 'Workshop' as Cat,
    audience: 'Students',
    description: 'Guided sessions introducing students to mindfulness techniques, breathing exercises, and progressive relaxation — practical methods for reducing daily stress and improving academic focus.',
    pdf: '#',
  },
  {
    id: 15,
    title: 'Anti-Ragging & Safe Campus Awareness Program',
    date: '2022',
    day: '', month: '', year: '2022', hasDay: false,
    category: 'Awareness' as Cat,
    audience: 'First Year',
    description: 'A mandatory awareness program on anti-ragging policies, campus safety protocols, and available support channels — fostering a secure and inclusive college environment from day one.',
    pdf: '#',
  },
];


/* ─── Component ─────────────────────────────────────────────── */

export default function CounsellingEventsPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | Cat>('All');

  const filtered = activeFilter === 'All'
    ? EVENTS
    : EVENTS.filter(e => e.category === activeFilter);

  // Group by year, newest first
  const years = [...new Set(filtered.map(e => e.year))].sort((a, b) => Number(b) - Number(a));

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="/hero5.jpg"
        badge="Counselling Events · 2020 – 2026"
        headingSmall="NHCE Student Wellness"
        headingMain="Moments "
        headingGhost="That Matter"
        description="Six years of workshops, awareness campaigns, webinars, and orientations — each one a step toward a stronger, more compassionate campus community."
        button={{ label: 'Explore Services', to: '/counselling-services' }}
        secondaryButton={{ label: 'Meet Our Team', to: '/professional-counselling' }}
      />

      {/* ── Events Section ── */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">

          {/* Heading */}
          <AnimateIn variant="fade-up">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 bg-navy-50 border border-navy-100 text-navy-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-700" />
                Campus Wellness Events
              </span>
              <h2 className="font-display font-bold text-navy-950 text-xl lg:text-3xl mb-3">
                Our Counselling Events
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                Workshops, awareness drives, orientations, and webinars that have shaped mental well-being at NHCE — from 2022 to today.
              </p>
            </div>
          </AnimateIn>

          {/* Filter pills */}
          <AnimateIn variant="fade-up" delay={80}>
            <div className="flex gap-2 flex-wrap justify-center mb-10">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                    activeFilter === c
                      ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300 hover:text-navy-700'
                  }`}
                >
                  {c}
                  {c !== 'All' && (
                    <span className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle ${CAT_MAP[c as Cat].dot}`} />
                  )}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Count */}
          <AnimateIn variant="fade-up" delay={120}>
            <p className="text-center text-xs text-slate-400 font-medium mb-12">
              {filtered.length} event{filtered.length !== 1 ? 's' : ''}
              {activeFilter !== 'All' ? ` in ${activeFilter}` : ' across all categories'}
              {' · '}{years.length} academic year{years.length !== 1 ? 's' : ''}
            </p>
          </AnimateIn>

          {/* Year-grouped events */}
          {filtered.length > 0 ? (
            <div className="space-y-16">
              {years.map((year, yi) => {
                const yearEvents = filtered.filter(e => e.year === year);
                return (
                  <AnimateIn key={year} variant="fade-up" delay={yi * 60}>
                    {/* Year header */}
                    <div className="flex items-center gap-5 mb-8">
                      <div className="flex-shrink-0">
                        <span className="font-display font-black text-5xl sm:text-6xl text-navy-950/[0.07] leading-none select-none">
                          {year}
                        </span>
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="flex-shrink-0 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {yearEvents.length} event{yearEvents.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {yearEvents.map((ev, i) => (
                        <EventCard key={ev.id} ev={ev} i={i} />
                      ))}
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Calendar size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">No events found for this category.</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

/* ─── Event Card ─────────────────────────────────────────────── */

function EventCard({ ev, i }: { ev: typeof EVENTS[number]; i: number }) {
  const style = CAT_MAP[ev.category];

  return (
    <AnimateIn variant="fade-up" delay={i * 40}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

        {/* Colored top bar */}
        <div className={`h-1 w-full ${style.bar}`} />

        <div className="p-5 flex flex-col flex-1">

          {/* Category pill */}
          <div className="mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.pill}`}>
              {ev.category}
            </span>
          </div>

          {/* Date + Title */}
          <div className="flex items-start gap-3 mb-4">
            {/* Calendar badge */}
            <div className="flex-shrink-0 w-12 rounded-xl overflow-hidden border border-slate-100 text-center">
              {ev.hasDay ? (
                <>
                  <div className={`${style.bar} py-0.5`}>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">{ev.month}</span>
                  </div>
                  <div className="bg-white pt-1 pb-1">
                    <div className="text-navy-950 font-black text-lg leading-none">{ev.day}</div>
                    <div className="text-slate-400 text-[9px] font-semibold">{ev.year}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`${style.bar} py-0.5`}>
                    <span className="text-[9px] font-black text-white uppercase tracking-wider">YEAR</span>
                  </div>
                  <div className="bg-white py-2">
                    <div className="text-navy-950 font-black text-sm leading-none">{ev.year}</div>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-navy-950 text-sm leading-snug flex-1">
              {ev.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-xs leading-relaxed flex-1">{ev.description}</p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center gap-1.5">
              <Users size={11} className="text-slate-400 flex-shrink-0" />
              <span className="text-slate-400 text-[10px] font-semibold">For: {ev.audience}</span>
              <span className="ml-auto text-[10px] text-slate-300 font-medium">{ev.date}</span>
            </div>
            <a
              href={ev.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-navy-200 bg-navy-50 hover:bg-navy-700 hover:border-navy-700 hover:text-white text-navy-700 text-xs font-bold transition-all duration-200 group"
            >
              <FileText size={13} className="flex-shrink-0" />
              View PDF
            </a>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
