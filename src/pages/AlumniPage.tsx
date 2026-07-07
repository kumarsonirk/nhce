import { useState, useEffect, useRef } from 'react';
import {
  Users, Globe, MessageSquare,
  ArrowUpRight, Phone, ExternalLink, GraduationCap,
  Shield, Star, Calendar, Mic, FileText,
  Trophy, Bell, UserPlus, ScrollText,
  Building2, ChevronLeft, ChevronRight, Download, MapPin
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ─────────────────────────────────────────────────── */

const MISSION_POINTS = [
  'Creating programs and opportunities for alumni-corporation partnerships.',
  'Contributing to the overall development and growth of the institution.',
  'Strengthening alumni engagement across all academic disciplines.',
  'Establishing strong links between alumni, staff, and current students.',
  'Supporting alumni in solving technical and professional challenges.',
  'Promoting scientific and technological developments through the network.',
];

const NETWORK_CARDS = [
  {
    icon: UserPlus,
    title: 'Alumni Registration',
    desc: 'Join the official NHCE alumni network. Register on the portal to connect with 10,000+ batchmates globally.',
    href: 'https://alumni.newhorizonindia.edu',
    label: 'Register Now',
    color: 'bg-blue-50 text-blue-700',
    border: 'hover:border-blue-300',
    accent: 'bg-blue-600',
  },
  {
    icon: ScrollText,
    title: 'Alumni Certificate',
    desc: 'Obtain your official alumni membership certificate after completing registration on the alumni portal.',
    href: 'https://alumni.newhorizonindia.edu',
    label: 'Get Certificate',
    color: 'bg-violet-50 text-violet-700',
    border: 'hover:border-violet-300',
    accent: 'bg-violet-600',
  },
  {
    icon: Bell,
    title: 'Notice Board',
    desc: 'Stay informed with the latest announcements, upcoming events, and important updates from the alumni cell.',
    href: 'https://newhorizoncollegeofengineering.in/alumni/',
    label: 'View Notices',
    color: 'bg-amber-50 text-amber-700',
    border: 'hover:border-amber-300',
    accent: 'bg-amber-500',
  },
];

const RESOURCE_TABS = [
  { id: 'events',       label: 'Events',           icon: Calendar  },
  { id: 'achievements', label: 'Achievements',     icon: Trophy    },
  { id: 'calendar',     label: 'Calendar',         icon: Star      },
  { id: 'talks',        label: 'Alumni Talks',     icon: Mic       },
  { id: 'sop',          label: 'Association SOP',  icon: FileText  },
];

const EVENT_YEARS = ['2026', '2025', '2024', '2023'] as const;
type EventYear = typeof EVENT_YEARS[number];

const EVENTS_BY_YEAR: Record<EventYear, { title: string; tag: string; tagColor: string; href: string; isPdf?: boolean }[]> = {
  '2026': [
    { title: 'Wellness Awareness Programme', tag: 'Wellness', tagColor: 'bg-emerald-100 text-emerald-700', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/Report-on-Wellness-Awareness-Programme.pdf', isPdf: true },
    { title: 'Pitchback Event for Alumni', tag: 'Networking', tagColor: 'bg-blue-100 text-blue-700', href: 'https://newhorizoncollegeofengineering.in/pitchback-event-for-alumni-2/' },
    { title: 'From NHCE to the Indian Army – Maj. Swathi Shantha Kumar', tag: 'Alumni Talk', tagColor: 'bg-navy-100 text-navy-800', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/06/Edited-Report-on-Alumni-Talk-Major-Swathi-Shantha-Kumar.pdf', isPdf: true },
  ],
  '2025': [
    { title: 'Alumni Meet 2025', tag: 'Alumni Meet', tagColor: 'bg-gold-100 text-gold-800', href: 'https://newhorizoncollegeofengineering.in/alumni-meet-2025/' },
    { title: 'Using AI to Solve Real-World Problems – Mr. Abhay Nagaraj B R', tag: 'Alumni Talk', tagColor: 'bg-violet-100 text-violet-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-from-student-to-innovator-using-ai-to-solve-real-world-problems/' },
    { title: 'Start-up Stories – Mr. Saurav, Co-Founder, Marmeto', tag: 'Alumni Talk', tagColor: 'bg-amber-100 text-amber-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-about-start-up-stories/' },
    { title: 'Computer Vision & Its Quantized Nature – Mr. Abhay Nagaraj B R', tag: 'Alumni Talk', tagColor: 'bg-sky-100 text-sky-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-computer-vision-and-its-quantized-nature/' },
    { title: 'QuantumX-25 – Annual Technical Festival', tag: 'Technical Fest', tagColor: 'bg-blue-100 text-blue-700', href: 'https://www.quantumxfest.com/' },
  ],
  '2024': [
    { title: 'Entrepreneurship Insights – Mohammed K P', tag: 'Alumni Talk', tagColor: 'bg-amber-100 text-amber-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Life After College – Chirag V Kashyap', tag: 'Alumni Talk', tagColor: 'bg-violet-100 text-violet-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Workshop: How to Protect Your Posture & Prevent Pain', tag: 'Workshop', tagColor: 'bg-emerald-100 text-emerald-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Belling the CAT: Journey to MBA', tag: 'Alumni Talk', tagColor: 'bg-blue-100 text-blue-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Turning Your Idea into Reality', tag: 'Alumni Talk', tagColor: 'bg-sky-100 text-sky-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Alumni Sports Meet 2024', tag: 'Sports Meet', tagColor: 'bg-rose-100 text-rose-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'MOU Signing – PrePOD Corp Pvt Ltd', tag: 'MOU', tagColor: 'bg-slate-100 text-slate-700', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
    { title: 'Job Mela 2024', tag: 'Placement', tagColor: 'bg-navy-100 text-navy-800', href: 'https://newhorizoncollegeofengineering.in/events-2024/' },
  ],
  '2023': [
    { title: 'Alumni Talk: Product Management in Financial Services', tag: 'Alumni Talk', tagColor: 'bg-violet-100 text-violet-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-product-management-in-financial-services-industry/' },
    { title: 'Career After MBA & Campus to Corporate', tag: 'Alumni Talk', tagColor: 'bg-amber-100 text-amber-700', href: 'https://newhorizoncollegeofengineering.in/a-talk-on-career-after-mba-and-campus-to-corporate/' },
    { title: 'Alumni Talk: Reaching Beyond the Horizon', tag: 'Alumni Talk', tagColor: 'bg-sky-100 text-sky-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-reaching-beyond-the-horizon/' },
    { title: 'Essentials for Efficient Data & ML Pipelines – Krishnav B Dave', tag: 'Alumni Talk', tagColor: 'bg-blue-100 text-blue-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-essentials-for-building-efficient-data-and-ml-pipelines-by-mr-krishnav-b-dave/' },
    { title: 'Alumni Talk: Technology Demystified', tag: 'Alumni Talk', tagColor: 'bg-indigo-100 text-indigo-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-technology-demystified/' },
    { title: 'Hands-on Training: Introduction to AI/ML', tag: 'Workshop', tagColor: 'bg-emerald-100 text-emerald-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-hands-on-training-on-introduction-to-aiml/' },
    { title: 'Student to Industry: Opportunities & Challenges', tag: 'Alumni Talk', tagColor: 'bg-teal-100 text-teal-700', href: 'https://newhorizoncollegeofengineering.in/transitioning-from-life-as-a-student-to-a-job-in-the-industry-opportunities-and-challenges/' },
    { title: 'Alumni Talk: Employee Relations & People Management', tag: 'Alumni Talk', tagColor: 'bg-rose-100 text-rose-700', href: 'https://newhorizoncollegeofengineering.in/alumni-talk-on-employee-relations-people-management/' },
    { title: 'Alumni Meet 2023', tag: 'Alumni Meet', tagColor: 'bg-gold-100 text-gold-800', href: 'https://newhorizoncollegeofengineering.in/report-on-alumni-meet-2023/' },
    { title: 'Social Awareness Activity 2023', tag: 'Social Service', tagColor: 'bg-green-100 text-green-700', href: 'https://newhorizoncollegeofengineering.in/a-report-on-social-awareness-activity/' },
    { title: 'Revelations 2023', tag: 'Cultural', tagColor: 'bg-purple-100 text-purple-700', href: 'https://newhorizoncollegeofengineering.in/report-on-revelation23/' },
    { title: 'Alumni Recognition Award Ceremony 2023', tag: 'Awards', tagColor: 'bg-gold-100 text-gold-800', href: 'https://newhorizoncollegeofengineering.in/alumni-recognition-award-ceremony/' },
  ],
};

const TALK_YEARS = [
  { label: '2024 – 2025', href: 'https://newhorizoncollegeofengineering.in/alumni-talk/', color: 'bg-navy-50 border-navy-200 text-navy-800' },
  { label: '2023 – 2024', href: 'https://newhorizoncollegeofengineering.in/alumni-talk/', color: 'bg-blue-50 border-blue-200 text-blue-800' },
  { label: '2022 – 2023', href: 'https://newhorizoncollegeofengineering.in/alumni-talk/', color: 'bg-indigo-50 border-indigo-200 text-indigo-800' },
  { label: '2021 – 2022', href: 'https://newhorizoncollegeofengineering.in/alumni-talk/', color: 'bg-violet-50 border-violet-200 text-violet-800' },
  { label: '2020 – 2021', href: 'https://newhorizoncollegeofengineering.in/alumni-talk/', color: 'bg-slate-50 border-slate-200 text-slate-800' },
];

const CALENDAR_PDFS = [
  {
    year: '2026',
    label: 'Alumni Calendar 2026',
    desc: 'Complete schedule of alumni events, meets, webinars and institutional celebrations for the year 2026.',
    href: 'https://newhorizoncollegeofengineering.in/alumni-calendar-of-events/',
    color: 'border-navy-200 bg-navy-50',
    accent: 'text-navy-800',
  },
  {
    year: '2025',
    label: 'Alumni Calendar 2025',
    desc: 'Full calendar of alumni events, reunions, department meets and milestone celebrations for the year 2025.',
    href: 'https://newhorizoncollegeofengineering.in/alumni-calendar-of-events/',
    color: 'border-blue-200 bg-blue-50',
    accent: 'text-blue-800',
  },
];

const DEFENCE_ALUMNI = [
  {
    name: 'Lt. Cdr. Navjot Kaur',
    batch: '2011–2015',
    branch: 'Electronics & Communication',
    force: 'Indian Navy',
    designation: 'Lieutenant Commander',
    image: '/alumni/navjot.png',
    gradient: 'from-blue-900 via-navy-950 to-slate-900',
    accent: 'text-blue-300',
    tag: 'bg-blue-900/60 text-blue-200 border-blue-700/40',
  },
  {
    name: 'Maj. Tej Bahadur',
    batch: '2009–2013',
    branch: 'Mechanical Engineering',
    force: 'Indian Army',
    designation: 'Major',
    image: '/alumni/tajendar.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Swathi S',
    batch: '2010–2014',
    branch: 'Computer Science Engineering',
    force: 'Indian Army',
    designation: 'Captain',
    image: '/alumni/swathi.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Nithish V',
    batch: '2012–2016',
    branch: 'Civil Engineering',
    force: 'Indian Army',
    designation: 'Lieutenant',
    image: '/alumni/nithish.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Swapnil',
    batch: '2013–2017',
    branch: 'Electrical Engineering',
    force: 'Indian Air Force',
    designation: 'Flight Lieutenant',
    image: '/alumni/swapnil.png',
    gradient: 'from-sky-900 via-indigo-950 to-slate-900',
    accent: 'text-sky-300',
    tag: 'bg-sky-900/60 text-sky-200 border-sky-700/40',
  },
  {
    name: 'Satish',
    batch: '2011–2015',
    branch: 'Electronics & Communication',
    force: 'Indian Army',
    designation: 'Captain',
    image: '/alumni/satish.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Jitender',
    batch: '2010–2014',
    branch: 'Mechanical Engineering',
    force: 'Indian Army',
    designation: 'Major',
    image: '/alumni/jitendra.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Gaurav',
    batch: '2012–2016',
    branch: 'Computer Science Engineering',
    force: 'Indian Air Force',
    designation: 'Flying Officer',
    image: '/alumni/gaurav.png',
    gradient: 'from-sky-900 via-indigo-950 to-slate-900',
    accent: 'text-sky-300',
    tag: 'bg-sky-900/60 text-sky-200 border-sky-700/40',
  },
  {
    name: 'Jagannath',
    batch: '2009–2013',
    branch: 'Civil Engineering',
    force: 'Indian Navy',
    designation: 'Sub Lieutenant',
    image: '/alumni/jagannath.png',
    gradient: 'from-blue-900 via-navy-950 to-slate-900',
    accent: 'text-blue-300',
    tag: 'bg-blue-900/60 text-blue-200 border-blue-700/40',
  },
  {
    name: 'Divin',
    batch: '2013–2017',
    branch: 'Information Science & Engineering',
    force: 'Indian Army',
    designation: 'Lieutenant',
    image: '/alumni/divin.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Bipul',
    batch: '2011–2015',
    branch: 'Mechanical Engineering',
    force: 'Indian Army',
    designation: 'Captain',
    image: '/alumni/bipul.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Sachin',
    batch: '2010–2014',
    branch: 'Electronics & Communication',
    force: 'Indian Army',
    designation: 'Lieutenant',
    image: '/alumni/sachin.png',
    gradient: 'from-green-900 via-emerald-950 to-slate-900',
    accent: 'text-emerald-300',
    tag: 'bg-emerald-900/60 text-emerald-200 border-emerald-700/40',
  },
  {
    name: 'Sahil',
    batch: '2012–2016',
    branch: 'Computer Science Engineering',
    force: 'Indian Air Force',
    designation: 'Flying Officer',
    image: '/alumni/sahil.png',
    gradient: 'from-sky-900 via-indigo-950 to-slate-900',
    accent: 'text-sky-300',
    tag: 'bg-sky-900/60 text-sky-200 border-sky-700/40',
  },
];

const COMPANY_ROW1 = [
  '/industry/aricent.jpg', '/industry/capgemini.jpg', '/industry/cerner.jpg',
  '/industry/cognizant.jpg', '/industry/deloitte.jpg', '/industry/eurofins.jpg',
  '/industry/goldman.jpg', '/industry/hsbc.jpg', '/industry/ibm.jpg',
];

const COMPANY_ROW2 = [
  '/industry/infosys.jpg', '/industry/l&t.jpg', '/industry/mindtree.jpg',
  '/industry/mphasis.jpg', '/industry/oracle.jpg', '/industry/sony.jpg',
  '/industry/wipro.jpg', '/industry/bata.jpg',
];

const TESTIMONIALS = [
  {
    quote: 'NHCE provided the best knowledge with a top-notch library and infrastructure. The automobile department gave me skills that I use every single day.',
    name: 'Akarsh R',
    dept: 'Automobile Engineering',
    initials: 'AR',
    color: 'border-blue-200',
    accent: 'text-blue-600',
  },
  {
    quote: 'The ISE Department made me a better person. Teachers are friendly, caring and genuinely invested in each student\'s growth and wellbeing.',
    name: 'Sumanth Reddy',
    dept: 'Information Science & Engineering',
    initials: 'SR',
    color: 'border-violet-200',
    accent: 'text-violet-600',
  },
  {
    quote: 'I got placed at Wipro because of the great technical knowledge and placement support NHCE gave me. Forever grateful to this institution.',
    name: 'Sai Shankar',
    dept: 'Computer Science Engineering',
    initials: 'SS',
    color: 'border-amber-200',
    accent: 'text-amber-600',
  },
  {
    quote: 'Four wonderful years. NHCE nurtured leadership, innovation, and work ethics that I carry every day in my professional life.',
    name: 'Kuber S.V',
    dept: 'Civil Engineering',
    initials: 'KS',
    color: 'border-emerald-200',
    accent: 'text-emerald-600',
  },
  {
    quote: 'NHCE helped me overcome an 8-year career gap. The mentoring and placement support placed me at ArisGlobal Software — life-changing.',
    name: 'Subbulakhmi R',
    dept: 'Master of Computer Applications',
    initials: 'SL',
    color: 'border-rose-200',
    accent: 'text-rose-600',
  },
  {
    quote: 'The college encourages creative thinking through a multicultural environment — truly a World in One Place philosophy lived every day.',
    name: 'Shreya Malakar',
    dept: 'Electronics & Communication',
    initials: 'SM',
    color: 'border-indigo-200',
    accent: 'text-indigo-600',
  },
];

/* ─── Page ─────────────────────────────────────────────────── */

export default function AlumniPage() {
  const [activeTab, setActiveTab] = useState('events');

  const [activeDefence, setActiveDefence] = useState(0);
  const [defenceTransition, setDefenceTransition] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveDefence(i => i + 1);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  useEffect(() => {
    if (activeDefence >= DEFENCE_ALUMNI.length) {
      const snap = setTimeout(() => {
        setDefenceTransition(false);
        setActiveDefence(0);
        requestAnimationFrame(() => requestAnimationFrame(() => setDefenceTransition(true)));
      }, 510);
      return () => clearTimeout(snap);
    }
  }, [activeDefence]);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveDefence(idx);
    startTimer();
  };

  const [popupImg, setPopupImg] = useState<string | null>(null);

  const [activeEventYear, setActiveEventYear] = useState<EventYear>('2026');

  const [activeTesti, setActiveTesti] = useState(0);
  const testiTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTestiTimer = () => {
    testiTimerRef.current = setInterval(() => {
      setActiveTesti(i => (i + 1) % TESTIMONIALS.length);
    }, 5000);
  };

  useEffect(() => {
    startTestiTimer();
    return () => { if (testiTimerRef.current) clearInterval(testiTimerRef.current); };
  }, []);

  const goToTesti = (idx: number) => {
    if (testiTimerRef.current) clearInterval(testiTimerRef.current);
    setActiveTesti(idx);
    startTestiTimer();
  };


  return (
    <div className="min-h-screen bg-slate-50">

      <HeroSection
        image="/hero1.png"
        badge="10,000+ Strong Alumni Network"
        headingSmall="NHCE"
        headingMain="Alumni"
        headingGhost="Community"
        description="A global community of innovators, leaders and changemakers — united by the shared values of New Horizon College of Engineering."
        button={{
          label: 'Join Alumni Network',
          href: 'https://alumni.newhorizonindia.edu',
        }}
      />

      {/* ── 1. Introduction ── */}
      <section className="container-wide py-16">
        <div className="grid lg:grid-cols-[35%_65%] gap-10 items-center">
          {/* Image — 35% */}
          <AnimateIn variant="fade-up">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/3] shadow-xl">
              <img
                src="/anitha_mam.jpg"
                alt="Dr. Anitha S Rai"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                  <p className="text-white font-bold text-base leading-tight">Dr. Anitha S Rai</p>
                  <p className="text-white/70 text-xs mt-0.5">Director – Library & Alumni Relations</p>
                  <p className="text-white/50 text-xs mt-0.5">M.Com., M.LISc., M.Phil., Ph.D</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Text — 65% */}
          <AnimateIn variant="fade-up" delay={80}>
            <span className="inline-flex items-center gap-2 bg-navy-50 border border-navy-200 text-navy-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-5">
              <GraduationCap size={12} />
              Alumni Cell — NHCE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-955 mb-5 leading-snug">
              Building Bridges Between <span className="text-blue-600">Alumni & Institution</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-4">
              The NHCE Alumni Cell is dedicated to fostering lifelong connections between graduates and their alma mater. With a network of over 10,000 alumni spread across the globe, we serve as the bridge that connects the past, present and future of New Horizon College of Engineering.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              From annual reunions and industry talks to webinar series and entrepreneurship spotlights, the alumni community is an active, vibrant force that continues to contribute to institutional growth, student mentorship and national development. Our graduates have gone on to lead at Fortune 500 companies, serve in the Indian Armed Forces and build successful ventures — and they remain proudly connected to NHCE.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── 2. Join the Alumni Network ── */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <Users size={12} />
                Get Connected
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-955 mb-2">
                Join the Alumni Network
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                10,000+ graduates strong — register on the portal, get your certificate and stay updated via the notice board.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={50}>
            <div className="grid sm:grid-cols-3 gap-5">
              {NETWORK_CARDS.map(card => (
                <div key={card.title} className={`bg-white rounded-3xl border border-slate-200/80 ${card.border} p-6 hover:shadow-lg transition-all group flex flex-col`}>
                  <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-5`}>
                    <card.icon size={22} />
                  </div>
                  <h3 className="font-bold text-navy-950 text-base mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{card.desc}</p>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 ${card.accent} hover:opacity-90 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all w-full`}
                  >
                    {card.label}
                    <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 3. Alumni Resources (Tab View) ── */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <span className="inline-flex items-center gap-2 bg-navy-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
                  <Globe size={12} />
                  Alumni Resources
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-950">
                  Stay Engaged &amp; Informed
                </h2>
                <p className="text-slate-500 text-sm mt-2">Everything you need — events, achievements, talks and more.</p>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={50}>
            <div className="rounded-3xl overflow-hidden">

              {/* Tab Bar — pill style */}
              <div className=" px-4 sm:px-6 pt-4 pb-0">
                <div className="flex overflow-x-auto no-scrollbar pb-0 w-full">
                  {RESOURCE_TABS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setActiveTab(t.id)}
                      className={`flex items-center justify-center gap-2 flex-1 py-2.5 text-xs font-bold uppercase tracking-wide whitespace-nowrap rounded-t-xl border-b-2 transition-all duration-200 ${
                        activeTab === t.id
                          ? 'bg-navy-900 border-navy-900 text-white shadow-sm'
                          : 'border-transparent text-slate-500 hover:text-navy-700 hover:bg-white/70'
                      }`}
                    >
                      <t.icon size={13} />
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8 bg-sky-50" key={activeTab}>

                {/* ── Events ── */}
                {activeTab === 'events' && (
                  <div>
                    {/* Year sub-tabs */}
                    <div className="inline-flex items-center gap-1 bg-slate-100 p-1 rounded-xl mb-7">
                      {EVENT_YEARS.map(yr => (
                        <button
                          key={yr}
                          onClick={() => setActiveEventYear(yr)}
                          className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 ${
                            activeEventYear === yr
                              ? 'bg-navy-900 text-white shadow-sm'
                              : 'text-slate-500 hover:text-navy-700'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>

                    {/* Event cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
                      {EVENTS_BY_YEAR[activeEventYear].map((ev, i) => (
                        <div key={i} className="group bg-white border border-navy-900 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col">

                          <div className="p-5 flex flex-col gap-3 flex-1">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full w-fit ${ev.tagColor}`}>
                              {ev.tag}
                            </span>
                            <p className="font-semibold text-navy-950 text-sm leading-snug flex-1">{ev.title}</p>
                            <a
                              href={ev.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-navy-700 hover:text-navy-900 text-xs font-bold transition-colors mt-auto pt-2 border-t border-slate-100"
                            >
                              {ev.isPdf ? <><Download size={12} /> View PDF</> : <><ArrowUpRight size={12} /> View Report</>}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <a
                      href={`https://newhorizoncollegeofengineering.in/events-${activeEventYear}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-navy-900 hover:text-white text-navy-800 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
                    >
                      View all {activeEventYear} events <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {/* ── Achievements ── */}
                {activeTab === 'achievements' && (
                  <div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-2xl">
                      NHCE alumni continue to make their mark across industries, governments and global organisations. We celebrate every milestone — from promotions to patents, startups to social impact.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
                      {[
                        { label: 'Defence Officers',   desc: 'Alumni serving in the Indian Army, Navy and Air Force', color: 'bg-emerald-50 border-emerald-200', tag: 'bg-emerald-100 text-emerald-700', bar: 'from-emerald-500 to-emerald-400' },
                        { label: 'Corporate Leaders',  desc: 'Placed at Fortune 500 and top global tech companies',  color: 'bg-blue-50 border-blue-200',    tag: 'bg-blue-100 text-blue-700',   bar: 'from-blue-500 to-blue-400'    },
                        { label: 'Entrepreneurs',      desc: 'NHCE graduates who founded successful startups',        color: 'bg-amber-50 border-amber-200',  tag: 'bg-amber-100 text-amber-700', bar: 'from-amber-500 to-amber-400'  },
                        { label: 'Researchers',        desc: 'Published academics, patent holders and innovators',    color: 'bg-violet-50 border-violet-200',tag: 'bg-violet-100 text-violet-700',bar:'from-violet-500 to-violet-400'},
                        { label: 'Public Service',     desc: 'Alumni in prestigious government and civil services',   color: 'bg-sky-50 border-sky-200',      tag: 'bg-sky-100 text-sky-700',     bar: 'from-sky-500 to-sky-400'      },
                        { label: 'Sports Achievers',   desc: 'National and international level sports representatives',color: 'bg-rose-50 border-rose-200',   tag: 'bg-rose-100 text-rose-700',   bar: 'from-rose-500 to-rose-400'    },
                      ].map(cat => (
                        <div key={cat.label} className={`rounded-2xl border-2 ${cat.color} overflow-hidden flex flex-col`}>

                          <div className="p-5 flex flex-col gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full w-fit ${cat.tag}`}>{cat.label}</span>
                            <p className="text-slate-500 text-xs leading-relaxed">{cat.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a
                      href="https://newhorizoncollegeofengineering.in/alumni/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
                    >
                      Explore All Achievements <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {/* ── Calendar ── */}
                {activeTab === 'calendar' && (
                  <div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-2xl">
                      Download the official Alumni Calendar of Events — updated annually with reunion dates, webinars, department meets and institutional celebrations.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-5 mb-7">
                      {CALENDAR_PDFS.map(pdf => (
                        <div key={pdf.year} className={`rounded-2xl border-2 ${pdf.color} overflow-hidden flex flex-col`}>
                          <div className="p-6 flex flex-col gap-4 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${pdf.accent}`}>PDF Document</p>
                                <h4 className="font-bold text-navy-950 text-base">{pdf.label}</h4>
                              </div>
                              <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                <FileText size={20} className={pdf.accent} />
                              </div>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed flex-1">{pdf.desc}</p>
                            <a
                              href={pdf.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors mt-auto"
                            >
                              <Download size={13} /> Download PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a
                      href="https://newhorizoncollegeofengineering.in/alumni-calendar-of-events/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-navy-900 hover:text-white text-navy-800 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
                    >
                      View calendar page <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {/* ── Alumni Talks ── */}
                {activeTab === 'talks' && (
                  <div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-7 max-w-2xl">
                      Senior alumni return to campus every year to share real-world experiences with current students — bridging the gap between classroom learning and professional practice.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
                      {TALK_YEARS.map(yr => (
                        <div key={yr.label} className={`rounded-2xl border-2 ${yr.color} overflow-hidden`}>
                          <div className="p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                                <Mic size={17} className="text-navy-700" />
                              </div>
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mb-0.5">Academic Year</p>
                                <h4 className="font-bold text-navy-950 text-sm">{yr.label}</h4>
                              </div>
                            </div>
                            <a
                              href={yr.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                            >
                              <Download size={12} /> View PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                    <a
                      href="https://newhorizoncollegeofengineering.in/alumni-talk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-navy-900 hover:text-white text-navy-800 text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200"
                    >
                      View alumni talks page <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}

                {/* ── Association SOP ── */}
                {activeTab === 'sop' && (
                  <div className="max-w-lg">
                    <p className="text-slate-500 text-sm leading-relaxed mb-7">
                      The Standard Operating Procedure document governs the structure, roles and responsibilities of the NHCE Alumni Association — ensuring transparency and accountability across all activities.
                    </p>
                    <div className="bg-gradient-to-br from-navy-950 to-navy-800 rounded-2xl p-6 flex items-start gap-5 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                        <ScrollText size={22} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Official Document</p>
                        <h4 className="font-bold text-white text-base mb-1">Alumni Association SOP</h4>
                        <p className="text-white/60 text-xs leading-relaxed">Governance framework, member roles, event guidelines and code of conduct for NHCE Alumni Association representatives.</p>
                      </div>
                    </div>
                    <a
                      href="https://newhorizoncollegeofengineering.in/alumni/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors"
                    >
                      <Download size={14} /> Download SOP PDF
                    </a>
                  </div>
                )}

              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 4. Alumni at Leading Companies ── */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                <Building2 size={12} />
                Where Our Alumni Work
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy-955 mb-2">
                Alumni at Leading Companies
              </h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto">
                NHCE graduates are employed at Fortune 500 companies, global tech firms and fast-growing startups worldwide.
              </p>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={50}>
            <div className="space-y-4 overflow-hidden">
              {/* Row 1 — left to right */}
              <div className="flex" style={{ animation: 'galleryScroll 22s linear infinite reverse' }}>
                {[...COMPANY_ROW1, ...COMPANY_ROW1].map((src, i) => (
                  <div key={i} className="flex-none mx-3 w-36 h-24 lg:w-56 lg:h-36 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-3 shadow-sm">
                    <img src={src} alt="company" className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
              {/* Row 2 — right to left */}
              <div className="flex" style={{ animation: 'galleryScroll 22s linear infinite' }}>
                {[...COMPANY_ROW2, ...COMPANY_ROW2].map((src, i) => (
                  <div key={i} className="flex-none mx-3 w-36 h-24 lg:w-56 lg:h-36 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-3 shadow-sm">
                    <img src={src} alt="company" className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Proud Defenders of the Nation ── */}
      <section className="bg-slate-50 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                <Shield size={20} className="text-gold-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-navy-950">Proud Defenders of the Nation</h3>
                <p className="text-slate-500 text-xs">NHCE alumni serving across the Indian Armed Forces</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {['Army', 'Navy', 'Air Force'].map(s => (
                  <span key={s} className="hidden sm:inline-flex bg-navy-50 border border-navy-200 rounded-xl px-3 py-1 text-[10px] text-navy-700 font-bold uppercase tracking-wide">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Carousel — smooth slide, 2 images at a time */}
            <div className="rounded-xl overflow-hidden bg-slate-900 p-2">
              {/* Sliding strip */}
              <div className="relative overflow-hidden">
                <div
                  className={`flex ${defenceTransition ? 'transition-transform duration-500 ease-in-out' : ''}`}
                  style={{ transform: `translateX(-${activeDefence * 50}%)` }}
                >
                  {[...DEFENCE_ALUMNI, DEFENCE_ALUMNI[0], DEFENCE_ALUMNI[1]].map((a, idx) => (
                    <div key={idx} className="flex-none w-1/2 aspect-[16/9] border border-black overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-full h-full object-cover object-top m-2 cursor-pointer"
                        onClick={() => setPopupImg(a.image)}
                      />
                    </div>
                  ))}
                </div>

                {/* Prev / Next overlaid on images */}
                <button
                  onClick={() => goTo((activeDefence - 1 + DEFENCE_ALUMNI.length) % DEFENCE_ALUMNI.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button
                  onClick={() => goTo(activeDefence + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>

              {/* Dot navigation */}
              <div className="flex justify-center gap-1.5 py-4">
                {DEFENCE_ALUMNI.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${i === activeDefence % DEFENCE_ALUMNI.length ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── 5. Alumni Map + Testimonials ── */}
      <section className="bg-white border-y border-slate-200/80 py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — Global Presence Map */}
            <AnimateIn variant="fade-up">
              <div className="h-full flex flex-col">
                <div className="mb-5">
                  <span className="inline-flex items-center gap-2 bg-navy-50 border border-navy-200 text-navy-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                    <MapPin size={12} />
                    Global Reach
                  </span>
                  <h2 className="font-display text-lg lg:text-lg font-bold text-navy-950 leading-snug">
                    Presence of Our Alumni at <span className="text-gold-600">Global Geographical Locations</span>
                  </h2>
                </div>

                <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
                  <img
                src="/alumni_map.jpg"
                alt="Dr. Anitha S Rai"
                className="w-full h-full object-cover object-top"
              />
                </div>

                <a
                  href="https://alumni.newhorizonindia.edu/map"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full border-2 border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 text-sm tracking-wide"
                >
                  <MapPin size={15} />
                  CLICK HERE TO LOCATE
                </a>
              </div>
            </AnimateIn>

            {/* RIGHT — Testimonials */}
            <AnimateIn variant="fade-up" delay={80}>
              <div>
                <div className="mb-6">
                  <span className="inline-flex items-center gap-2 bg-gold-50 border border-gold-200 text-gold-700 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
                    <MessageSquare size={12} />
                    Alumni Voices
                  </span>
                  <h2 className="font-display text-2xl lg:text-xl font-bold text-navy-950">
                    What Our Alumni Say
                  </h2>
                </div>

                <div className="relative">
                  {/* Card */}
                  <div className={`bg-white rounded-3xl border-2 ${TESTIMONIALS[activeTesti].color} p-8 min-h-[220px] flex flex-col transition-all duration-500 shadow-sm`}>
                    <div className={`text-5xl font-black ${TESTIMONIALS[activeTesti].accent} leading-none mb-4 select-none`}>"</div>
                    <p className="text-slate-600 text-base leading-relaxed flex-1 mb-8">
                      {TESTIMONIALS[activeTesti].quote}
                    </p>
                    <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-navy-800 to-navy-950 text-white text-sm font-black flex items-center justify-center flex-shrink-0">
                        {TESTIMONIALS[activeTesti].initials}
                      </div>
                      <div>
                        <p className="font-bold text-navy-950 text-sm">{TESTIMONIALS[activeTesti].name}</p>
                        <p className={`text-xs ${TESTIMONIALS[activeTesti].accent}`}>{TESTIMONIALS[activeTesti].dept}</p>
                      </div>
                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={() => goToTesti((activeTesti - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                          className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={16} className="text-slate-500" />
                        </button>
                        <button
                          onClick={() => goToTesti((activeTesti + 1) % TESTIMONIALS.length)}
                          className="w-9 h-9 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center transition-colors"
                          aria-label="Next"
                        >
                          <ChevronRight size={16} className="text-slate-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-5">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToTesti(i)}
                        className={`rounded-full transition-all duration-300 ${i === activeTesti ? 'w-6 h-2 bg-navy-800' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>

      {/* ── 7. Are You an NHCE Alumnus? ── */}
      <section className="bg-gradient-to-br from-slate-900 via-navy-950 to-navy-900 text-white py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-14 h-14 rounded-3xl bg-gold-500/20 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                <GraduationCap size={28} className="text-gold-400" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                Are You an NHCE Alumnus?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Register on the alumni portal to connect with batchmates, access exclusive resources, and contribute to the growing NHCE legacy. Join 10,000+ graduates already on the network.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://alumni.newhorizonindia.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-7 py-3.5 rounded-full transition-colors text-sm shadow-md"
                >
                  Register on Alumni Portal
                  <ExternalLink size={14} />
                </a>
                <a
                  href="tel:9663488553"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-full transition-colors text-sm border border-white/20"
                >
                  <Phone size={14} />
                  +91 96634 88553
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {popupImg && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPopupImg(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={popupImg} alt="Defence alumni" className="w-full h-auto rounded-2xl shadow-2xl object-contain max-h-[85vh]" />
            <button
              onClick={() => setPopupImg(null)}
              className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
