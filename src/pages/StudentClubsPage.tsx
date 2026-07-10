import { useEffect, useState } from 'react';
import {
  Cpu, Rocket, Leaf, Bot, Lightbulb, Sparkles, Hammer, Smartphone, Briefcase,
  HeartPulse, ShieldCheck, FlaskConical, BarChart3, TrendingUp, Code2,
  HandHeart, Music2, Palette, BookOpen, Mic2, HeartHandshake, Landmark,
  Dumbbell, Camera, Shirt, Users, Recycle, Drama, GraduationCap, Trophy,
  Calendar, ExternalLink, ArrowRight, FileText, UserCog, CalendarCheck2,
  ClipboardCheck, Vote,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const QUICK_NAV = [
  { id: 'overview',   label: 'Overview' },
  { id: 'co-curricular', label: 'Co-Curricular' },
  { id: 'extra-curricular', label: 'Extra-Curricular' },
  { id: 'sports',     label: 'Sports' },
  { id: 'activities', label: 'Recent Activities' },
  { id: 'resources',  label: 'Resources' },
];

const GOVERNANCE = [
  { Icon: UserCog,        title: '11-Member Committee', desc: 'President, Vice President, Secretary, Treasurer and 7 Board Members run every club.' },
  { Icon: Vote,           title: 'Annual Elections',    desc: 'Committees are elected each year, with a maximum of two consecutive terms.' },
  { Icon: CalendarCheck2, title: 'Regular Cadence',      desc: 'Weekly committee meets, at least 4 full club meetings and 2 college-level events per semester.' },
  { Icon: ClipboardCheck, title: 'Accountable Reporting', desc: 'Fortnightly updates to faculty coordinators, with approved budgets and annual reports.' },
];

type Club = { name: string; desc: string; Icon: any; href: string };

const COCURRICULAR_CLUBS: Club[] = [
  { name: 'EMSYS Club', desc: 'Embedded systems and IoT — where hardware meets intelligent design.', Icon: Cpu, href: 'https://newhorizonindia.edu/co-curricular/emsys/' },
  { name: 'Aerobots Club', desc: 'Aerospace and robotics enthusiasts building drones and flight systems.', Icon: Rocket, href: 'https://newhorizonindia.edu/co-curricular/aerobots/' },
  { name: 'Green Energy Club', desc: 'Sustainable energy projects, from solar builds to campus clean-up drives.', Icon: Leaf, href: 'https://newhorizonindia.edu/co-curricular/green-energy/' },
  { name: 'Robohorizon Club', desc: 'Robotics and automation — designing, building and competing with machines.', Icon: Bot, href: 'https://newhorizonindia.edu/co-curricular/robohorizon/' },
  { name: 'Innovation Club', desc: 'Turning raw ideas into working prototypes through hackathons and design sprints.', Icon: Lightbulb, href: 'https://newhorizonindia.edu/co-curricular/innovation/' },
  { name: 'Evolve.AI', desc: 'Artificial intelligence and machine learning, explored through projects and contests.', Icon: Sparkles, href: 'https://newhorizonindia.edu/co-curricular/evolve-ai/' },
  { name: 'Tech Forge Club', desc: 'Hands-on software and hardware builds for the technically curious.', Icon: Hammer, href: 'https://newhorizonindia.edu/co-curricular/tech-forge/' },
  { name: 'Mobile App Development Club', desc: 'Designing and shipping mobile apps from concept to prototype.', Icon: Smartphone, href: 'https://newhorizonindia.edu/co-curricular/mobile-app-development/' },
  { name: 'Business & IT Club', desc: 'Where business strategy meets technology — case studies and consulting sprints.', Icon: Briefcase, href: 'https://newhorizonindia.edu/co-curricular/business-and-information-technology/' },
  { name: 'HealthXcel Club', desc: 'Healthcare technology and wellness-focused innovation.', Icon: HeartPulse, href: 'https://newhorizonindia.edu/co-curricular/healthxcel/' },
  { name: 'Cybersecurity & Ethical Hacking Club', desc: 'Ethical hacking, CTFs and information security skill-building.', Icon: ShieldCheck, href: 'https://newhorizonindia.edu/co-curricular/cybersecurity-and-ethical-hacking/' },
  { name: 'STEM Club', desc: 'Cross-disciplinary science, technology, engineering and math exploration.', Icon: FlaskConical, href: 'https://newhorizonindia.edu/co-curricular/stem/' },
  { name: 'Data Analytics Club', desc: 'Data-driven problem solving — from dashboards to predictive models.', Icon: BarChart3, href: 'https://newhorizonindia.edu/co-curricular/data-analytics/' },
  { name: 'ED & Start-up Club', desc: 'Entrepreneurship, pitching and early-stage startup thinking.', Icon: TrendingUp, href: 'https://newhorizonindia.edu/co-curricular/ed-start-up/' },
  { name: 'FOSS Club', desc: 'Open-source software, contribution drives and dev-tool workshops.', Icon: Code2, href: 'https://newhorizonindia.edu/co-curricular/foss/' },
];

const EXTRACURRICULAR_CLUBS: Club[] = [
  { name: 'Rotaract NHCE', desc: 'Community service and leadership, aligned with Rotary International.', Icon: HandHeart, href: 'https://rotaractnhce.wordpress.com/' },
  { name: 'Extantus', desc: "NHCE's dance club — choreography, performance and competitions.", Icon: Sparkles, href: 'http://newhorizonindia.edu/extra-curricular/dance/' },
  { name: 'Expressivo', desc: 'Music club for vocalists, instrumentalists and bands.', Icon: Music2, href: 'http://newhorizonindia.edu/extra-curricular/music/' },
  { name: 'Vibgyor', desc: 'Visual arts club — painting, design and creative expression.', Icon: Palette, href: 'http://newhorizonindia.edu/extra-curricular/art/' },
  { name: 'LIT', desc: 'Literary club for writers, poets and debaters.', Icon: BookOpen, href: 'http://newhorizonindia.edu/extra-curricular/literary/' },
  { name: 'TEDx', desc: 'Independently organized TEDx talks bringing ideas worth spreading to campus.', Icon: Mic2, href: 'https://newhorizonindia.edu/extra-curricular/tedxnhce/' },
  { name: 'NSS', desc: 'National Service Scheme — community service and social outreach.', Icon: HeartHandshake, href: 'http://newhorizonindia.edu/extra-curricular/nss/' },
  { name: 'Politikos', desc: 'Socio-political discussion, debate and current-affairs analysis.', Icon: Landmark, href: 'http://newhorizonindia.edu/extra-curricular/socio-political/' },
  { name: 'Fitness Beat', desc: 'Fitness challenges and wellness programming for campus health.', Icon: Dumbbell, href: 'http://newhorizonindia.edu/extra-curricular/fitness/' },
  { name: 'NHCE Media', desc: 'Student journalism, photography and campus media coverage.', Icon: Camera, href: 'https://newhorizonindia.edu/extra-curricular/media/' },
  { name: 'Fashionista', desc: 'Fashion, styling and design for campus events and shows.', Icon: Shirt, href: 'http://newhorizonindia.edu/extra-curricular/fashion/' },
  { name: 'LEO', desc: 'The campus chapter of Lions Clubs International — service and leadership.', Icon: Users, href: 'http://newhorizonindia.edu/extra-curricular/leo/' },
  { name: 'Green Warriors', desc: 'Environmental conservation and sustainability advocacy.', Icon: Recycle, href: 'http://newhorizonindia.edu/extra-curricular/green/' },
  { name: 'Drama Club', desc: 'Theatre, street plays and stage performance.', Icon: Drama, href: 'http://newhorizonindia.edu/extra-curricular/drama/' },
  { name: 'Alumni Club', desc: 'Connecting current students with NHCE graduates for mentorship.', Icon: GraduationCap, href: 'https://newhorizonindia.edu/extra-curricular/alumni-club/' },
];

const SPORTS_CLUBS: Club[] = [
  { name: 'Volleyball Club', desc: 'Competitive and recreational volleyball.', Icon: Trophy, href: 'http://newhorizonindia.edu/extra-curricular/sports/home/volleyball/' },
  { name: 'Basketball Club', desc: 'Court time, drills and inter-college tournaments.', Icon: Trophy, href: 'http://newhorizonindia.edu/extra-curricular/sports/home/basketball/' },
  { name: 'Badminton Club', desc: 'Singles, doubles and campus championships.', Icon: Trophy, href: 'http://newhorizonindia.edu/extra-curricular/sports/home/badminton/' },
  { name: 'Kabaddi Club', desc: 'Traditional Kabaddi training and competitions.', Icon: Trophy, href: 'https://newhorizonindia.edu/extra-curricular/sports/home/kabaddi/' },
  { name: 'Football Club', desc: 'Campus league football and tournament play.', Icon: Trophy, href: 'http://newhorizonindia.edu/extra-curricular/sports/home/football/' },
];

const YEARS = ['2025-26', '2024-25', '2023-24'] as const;
type Year = typeof YEARS[number];

const COCURRICULAR_EVENTS: Record<Year, { name: string; club: string; date: string }[]> = {
  '2025-26': [
    { name: 'Appsylum', club: 'Mobile App Development', date: '2025' },
    { name: 'Bounty Hunt', club: 'Data Analytics', date: '2025' },
    { name: 'Brain to Breadboard', club: 'EMSYS', date: '2025' },
    { name: 'Cache Me If You Can', club: 'Cybersecurity', date: '2025' },
    { name: 'Drone Workshop', club: 'Robohorizon', date: '2025' },
    { name: 'Encrypted Lockdown', club: 'Cybersecurity', date: '2025' },
    { name: 'Spark-O-Vision', club: 'Green Energy', date: '2025' },
    { name: 'Jakkur Lake Cleaning', club: 'Green Energy', date: '2025' },
    { name: 'Into the Upside Down', club: 'Innovation', date: '2025' },
    { name: 'Velocity Rush', club: 'Robohorizon (ISTE)', date: '2025' },
    { name: 'Data Dive', club: 'Tech Forge (ISTE)', date: '2025' },
    { name: 'Posterverse', club: 'Innovation', date: '2025' },
    { name: 'Redstrain Protocol', club: 'HealthXcel', date: '2025' },
    { name: 'SUS_EVOLVE.AI', club: 'Evolve.AI', date: '2025' },
    { name: 'Synapse', club: 'STEM', date: '2025' },
    { name: 'Talend Open Studio & UI Design', club: 'FOSS', date: '2025' },
    { name: 'The Cohesion Crucible', club: 'Tech Forge', date: '2025' },
    { name: 'Wolves of Bitstreet', club: 'Business & IT', date: '2025' },
    { name: 'Investiture Ceremony', club: 'Co-Curricular Clubs', date: 'Nov 2025' },
  ],
  '2024-25': [
    { name: 'Biz Bounty', club: 'Business & IT', date: 'Dec 2024' },
    { name: 'CODATHON', club: 'Mobile App Development', date: '2025' },
    { name: 'CodeVoyagers', club: 'Innovation', date: 'Nov 2024' },
    { name: 'Data Palazoo', club: 'Data Analytics', date: 'Nov 2024' },
    { name: 'Chakravyuh', club: 'Evolve.AI', date: 'Nov 2024' },
    { name: 'E-Wasted', club: 'STEM', date: 'Jul 2024' },
    { name: "Know-Wit-All", club: 'Tech Forge', date: '2024' },
    { name: "Let's GoLang", club: 'Innovation', date: 'Dec 2024' },
    { name: 'NEXUS', club: 'STEM', date: 'Jan 2025' },
    { name: 'Pixel Pursuit', club: 'Mobile App Development', date: 'Nov 2024' },
    { name: 'TRAFFIC 360', club: 'STEM', date: 'Dec 2024' },
    { name: 'Aerobots Club Meet', club: 'Aerobots', date: '2024' },
    { name: 'RoboHorizon Club Meet', club: 'Robohorizon', date: 'Dec 2024' },
    { name: 'Investiture Ceremony', club: 'Co-Curricular Clubs', date: 'Nov 2024' },
  ],
  '2023-24': [],
};

const CULTURAL_EVENTS: Record<Year, { name: string; club: string; date: string }[]> = {
  '2025-26': [
    { name: 'Silver Jubilee Year Inauguration', club: 'NHCE', date: 'Jul 2025' },
    { name: 'Founders Day', club: 'NHCE', date: 'Jul 2025' },
    { name: 'Initium 2026', club: 'NHCE', date: '2026' },
    { name: 'TEDxNHCE 2026', club: 'TEDx', date: '2026' },
    { name: 'Inter Department Dance Competition — Season 3', club: 'NHCE Departments', date: '2026' },
    { name: 'Ethnic Day 2026', club: 'NHCE', date: '2026' },
    { name: 'MOVIECON 2026', club: 'NHCE', date: '2026' },
    { name: 'SARGAM 2025', club: 'NHCE', date: '2025' },
    { name: 'New Horizon Unity Run 2026', club: 'NHCE', date: '2026' },
    { name: 'International Women\'s Day', club: 'NHCE', date: 'Mar 2026' },
    { name: 'Republic Day 2026', club: 'NHCE', date: 'Jan 2026' },
    { name: 'Cleanliness Drive at Jakkur Lake', club: 'NSS', date: 'Oct 2025' },
  ],
  '2024-25': [
    { name: 'Sargam 2024', club: 'NHCE', date: '2024' },
    { name: 'Initium Fest 2025', club: 'NHCE', date: '2025' },
    { name: 'TEDxNHCE — Kintsugi', club: 'TEDx', date: 'Apr 2025' },
    { name: 'NHMUN 2025', club: 'Model United Nations', date: 'Apr 2025' },
    { name: 'Inter Department Dance Competition', club: 'NHCE Departments', date: '2025' },
    { name: 'Ethnic Day 2025', club: 'NHCE', date: '2025' },
    { name: 'MovieCon', club: 'NHCE', date: '2024-25' },
    { name: 'Rotaract Installation Ceremony', club: 'Rotaract', date: 'Apr 2025' },
    { name: '76th Republic Day Celebration', club: 'NHCE', date: 'Jan 2025' },
    { name: 'Blood Donation Drive', club: 'NHCE', date: 'Apr 2025' },
  ],
  '2023-24': [
    { name: 'Founder\'s Day 2024', club: 'NHCE', date: '2024' },
    { name: 'INITIUM — Inter-Collegiate Literary Fest', club: 'LIT', date: '2023-24' },
    { name: 'Sargam 2023', club: 'NHCE', date: '2023' },
    { name: 'TEDxNHCE', club: 'TEDx', date: '2024' },
    { name: 'Inter Department Dance Competition', club: 'NHCE Departments', date: '2023-24' },
    { name: 'Deepostav 2023', club: 'NHCE', date: '2023' },
    { name: 'Ethnic Day 2024', club: 'NHCE', date: '2024' },
    { name: 'International Yoga Day', club: 'NHCE', date: '2023-24' },
    { name: 'Blood Donation Camp', club: 'NHCE', date: '2024' },
    { name: 'Moviecon', club: 'NHCE', date: '2023-24' },
  ],
};

const RESOURCES = [
  { Icon: FileText,       title: 'Register for a Club', desc: 'Download the club registration poster and sign up.', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/Poster-2.pdf' },
  { Icon: Users,          title: 'Club Members Directory', desc: 'Full list of registered members across all clubs (2025).', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/03/CLUB-MEMBERS-DETAILS-2025_new.pdf' },
  { Icon: Calendar,       title: 'Calendar of Events 2026', desc: 'The full co-curricular events calendar for the year.', href: 'https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/03/calender-of-events-2026.pdf' },
];

/* ─── Small components ──────────────────────────────────────── */

function ClubCard({ club }: { club: Club }) {
  const { name, desc, Icon, href } = club;
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all"
    >
      <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center mb-4">
        <Icon size={19} className="text-gold-400" />
      </div>
      <h3 className="font-bold text-navy-900 text-base mb-1.5 flex items-center gap-1.5">
        {name}
        <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </a>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function StudentClubsPage() {
  const [activeYear, setActiveYear] = useState<Year>('2025-26');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const cocurricular = COCURRICULAR_EVENTS[activeYear];
  const cultural = CULTURAL_EVENTS[activeYear];

  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        image="/campus.jpg"
        badge="35+ Clubs · 3 Categories"
        headingSmall="Find Your"
        headingMain="Tribe"
        headingGhost="Beyond the Classroom"
        description="From robotics and cybersecurity to dance, drama and debate — a look at NHCE's co-curricular, extra-curricular and sports clubs, and what they've been up to."
        button={{ label: 'Explore Clubs', href: '#co-curricular' }}
      />

      {/* ── Quick nav ── */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-20 sm:top-16 z-30 shadow-sm">
        <div className="container-wide py-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 -mx-4 sm:px-0 sm:mx-0">
            {QUICK_NAV.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Overview / How Clubs Work ── */}
      <section id="overview" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge bg-blue-100 text-blue-700 mb-4">Overview</span>
                <h2 className="heading-md text-navy-950">
                  How Our Clubs{' '}
                  <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">Come Together</span>
                </h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">35+</p>
                  <p className="text-slate-500 text-sm">Active Clubs</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">3</p>
                  <p className="text-slate-500 text-sm">Categories</p>
                </div>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {GOVERNANCE.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={19} className="text-gold-400" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Co-Curricular Clubs ── */}
      <section id="co-curricular" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-violet-100 text-violet-700 mb-4">Co-Curricular</span>
            <h2 className="heading-md text-navy-950 mb-3">
              15 Clubs.{' '}
              <span className="text-gradient bg-gradient-to-r from-violet-700 to-indigo-600">Endless Builds.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mb-10">
              Technical clubs where students design, build and compete — from embedded systems to ethical hacking.
            </p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {COCURRICULAR_CLUBS.map(club => <ClubCard key={club.name} club={club} />)}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Extra-Curricular Clubs ── */}
      <section id="extra-curricular" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-rose-100 text-rose-700 mb-4">Extra-Curricular</span>
            <h2 className="heading-md text-navy-950 mb-3">
              Culture, Service &{' '}
              <span className="text-gradient bg-gradient-to-r from-rose-700 to-pink-600">Creativity</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mb-10">
              Where students express themselves, give back to the community and lead beyond the syllabus.
            </p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {EXTRACURRICULAR_CLUBS.map(club => <ClubCard key={club.name} club={club} />)}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Sports Clubs ── */}
      <section id="sports" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-emerald-100 text-emerald-700 mb-4">Sports</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Play Hard,{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-700 to-green-600">Compete Harder</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SPORTS_CLUBS.map(club => <ClubCard key={club.name} club={club} />)}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Recent Activities ── */}
      <section id="activities" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-amber-100 text-amber-700 mb-4">Recent Activities</span>
            <h2 className="heading-md text-navy-950 mb-6">
              What's Been{' '}
              <span className="text-gradient bg-gradient-to-r from-amber-600 to-orange-600">Happening</span>
            </h2>
            <div className="flex items-center gap-2 mb-10">
              {YEARS.map(y => (
                <button
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                    activeYear === y
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </AnimateIn>

          {cocurricular.length > 0 && (
            <AnimateIn variant="fade-up" delay={60}>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Co-Curricular Highlights</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {cocurricular.map(ev => (
                  <div key={ev.name} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <h4 className="font-bold text-navy-900 text-sm leading-snug mb-2">{ev.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-violet-700 bg-violet-100 rounded-full px-2.5 py-0.5">{ev.club}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} /> {ev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}

          {cultural.length > 0 && (
            <AnimateIn variant="fade-up" delay={100}>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Campus & Cultural Highlights</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cultural.map(ev => (
                  <div key={ev.name} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <h4 className="font-bold text-navy-900 text-sm leading-snug mb-2">{ev.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-rose-700 bg-rose-100 rounded-full px-2.5 py-0.5">{ev.club}</span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} /> {ev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ── Resources ── */}
      <section id="resources" className="scroll-mt-32 py-16 bg-navy-950">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-white/10 text-gold-400 mb-4">Resources</span>
            <h2 className="heading-md text-white mb-10">
              Everything You Need to{' '}
              <span className="text-gradient bg-gradient-to-r from-gold-400 to-amber-300">Get Involved</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-3 gap-5">
              {RESOURCES.map(({ Icon, title, desc, href }) => (
                <a
                  key={title} href={href} target="_blank" rel="noopener noreferrer"
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-11 h-11 bg-gold-400/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={19} className="text-gold-400" />
                  </div>
                  <h3 className="font-bold text-white text-base mb-1.5 flex items-center gap-1.5">
                    {title}
                    <ExternalLink size={12} className="text-white/30 group-hover:text-gold-400 transition-colors" />
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </a>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="bg-white py-16">
        <div className="container-wide">
          <AnimateIn variant="scale">
            <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-3xl p-10 sm:p-16 text-center">
              <h2 className="heading-md text-white mb-4">Ready to Join a Club?</h2>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-8">
                Pick up to two clubs across categories and start building, creating or competing today.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2023/12/Poster-2.pdf" target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Register Now <ArrowRight size={14} />
                </a>
                <a href="#co-curricular" className="btn-outline">Browse All Clubs</a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

    </div>
  );
}
