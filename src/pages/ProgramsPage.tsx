import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, X, Check, ArrowUpRight, Cpu, Brain, Zap, Settings, 
  Terminal, Atom, GraduationCap, BookOpen, Briefcase, HelpCircle, 
  Layers, Sparkles
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Program Data with Rich Metadata ─────────────────────── */

interface Program {
  name: string;
  code: string;
  seats: number;
  desc: string;
  color: string;
  light: string;
  text: string;
  border: string;
  glow: string;
  href: string;
  stream: string;
  studyAreas: string[];
  careers: string[];
  icon: any;
}

const UG_PROGRAMS: Program[] = [
  {
    name: 'Computer Science & Engineering',
    code: 'CSE', seats: 240,
    desc: 'Fundamentals of computing, algorithms, systems, cloud and software engineering with industry-grade project exposure.',
    color: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-600', border: 'hover:border-blue-300', glow: 'shadow-blue-500/10',
    href: 'https://department-of-computer-science-engineering.newhorizoncollegeofengineering.in/',
    stream: 'computing',
    studyAreas: ['Data Structures & Algorithms', 'Operating Systems & Networks', 'Cloud & DevOps Solutions', 'Full Stack Development', 'Database Management Systems'],
    careers: ['Software Engineer', 'Systems Architect', 'Cloud Solutions Engineer', 'Full-stack Developer'],
    icon: Cpu
  },
  {
    name: 'Artificial Intelligence & Machine Learning',
    code: 'AIML', seats: 120,
    desc: 'Deep learning, NLP, computer vision, data science and intelligent systems for the AI-first world.',
    color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600', border: 'hover:border-violet-300', glow: 'shadow-violet-500/10',
    href: 'https://artificial-intelligence-machine-learning.newhorizoncollegeofengineering.in/',
    stream: 'computing',
    studyAreas: ['Deep Learning Models', 'Natural Language Processing', 'Computer Vision', 'Data Science & Analytics', 'Reinforcement Learning'],
    careers: ['AI Engineer', 'Machine Learning Analyst', 'Data Scientist', 'Cognitive Systems Architect'],
    icon: Brain
  },
  {
    name: 'Electronics & Communication Engineering',
    code: 'ECE', seats: 120,
    desc: 'Analog & digital circuits, VLSI, embedded systems, IoT and advanced communication technology.',
    color: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'hover:border-cyan-300', glow: 'shadow-cyan-500/10',
    href: 'https://department-of-electronics-and-communication-engineering.newhorizoncollegeofengineering.in/',
    stream: 'electronics',
    studyAreas: ['VLSI Design & Testing', 'Embedded Systems & IoT', 'Signal & Image Processing', 'Analog & Digital Communication', 'Microprocessors & Microcontrollers'],
    careers: ['VLSI Design Engineer', 'Embedded Software Specialist', 'Hardware Test Engineer', 'Telecom Consultant'],
    icon: Layers
  },
  {
    name: 'Electrical & Electronics Engineering',
    code: 'EEE', seats: 60,
    desc: 'Power systems, control systems, electric machines, drives, smart grids and renewable energy technologies.',
    color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'hover:border-amber-300', glow: 'shadow-amber-500/10',
    href: 'https://department-of-electrical-and-electronics-engineering.newhorizoncollegeofengineering.in/',
    stream: 'electronics',
    studyAreas: ['Power Transmission & Smart Grids', 'Renewable Energy Systems', 'Control & Electric Machine Design', 'Power Electronics', 'Industrial Automation'],
    careers: ['Power Grid Engineer', 'Renewable Energy Specialist', 'Control Systems Engineer', 'Electrical Design Analyst'],
    icon: Zap
  },
  {
    name: 'Mechanical Engineering',
    code: 'ME', seats: 120,
    desc: 'Thermodynamics, fluid mechanics, machine design, smart manufacturing, CAD/CAM and robotics.',
    color: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-600', border: 'hover:border-slate-300', glow: 'shadow-slate-500/10',
    href: 'https://mechanical-engineering.newhorizoncollegeofengineering.in/',
    stream: 'core',
    studyAreas: ['CAD / CAM Design Systems', 'Robotics & Automation Controls', 'Thermodynamics & Heat Transfer', 'Fluid Dynamics & Machines', 'Additive Manufacturing'],
    careers: ['Design Engineer', 'Robotics Specialist', 'Production Planner', 'Quality Assurance Auditor'],
    icon: Settings
  },
  {
    name: 'Computer Engineering',
    code: 'CE', seats: 60,
    desc: 'Blending hardware and software — computer architecture, high performance networks, systems and project-based learning.',
    color: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-600', border: 'hover:border-rose-300', glow: 'shadow-rose-500/10',
    href: 'https://computer-engineering.newhorizoncollegeofengineering.in/',
    stream: 'computing',
    studyAreas: ['Computer Architecture', 'Distributed Systems', 'Hardware-Software Codesign', 'Computer & Network Security', 'Embedded Systems Firmware'],
    careers: ['Firmware Developer', 'Network Security Engineer', 'Hardware Architect', 'Systems Programmer'],
    icon: Terminal
  },
  {
    name: 'Applied Sciences & Engineering',
    code: 'ASE', seats: 60,
    desc: 'Engineering mathematics, physics, chemistry, materials science and nanotechnology fundamentals.',
    color: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-600', border: 'hover:border-indigo-300', glow: 'shadow-indigo-500/10',
    href: 'https://bsh.newhorizoncollegeofengineering.in/',
    stream: 'core',
    studyAreas: ['Advanced Engineering Math', 'Applied Physics & Photonics', 'Applied Chemistry & Materials Science', 'Nanotechnology & Thin Films', 'Environmental Studies'],
    careers: ['Research Associate', 'Materials Analyst', 'Nanotech Specialist', 'Technical Consultant'],
    icon: Atom
  },
];

interface PGProgram {
  name: string;
  code: string;
  seats: number;
  desc: string;
  color: string;
  light: string;
  text: string;
  border: string;
  glow: string;
  eligibility: string;
  href: string;
  stream: string;
  studyAreas: string[];
  careers: string[];
  icon: any;
}

const PG_PROGRAMS: PGProgram[] = [
  {
    name: 'M.Tech – Computer Science & Engineering',
    code: 'M.Tech', seats: 18,
    desc: 'Advanced algorithms, machine learning, cloud computing, distributed systems and thesis-based research.',
    color: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-700', border: 'hover:border-blue-300', glow: 'shadow-blue-500/10',
    eligibility: 'B.E./B.Tech + GATE',
    href: '#',
    stream: 'tech',
    studyAreas: ['Advanced Algorithms & Complexity', 'Distributed Systems & Cloud', 'Machine Learning Models', 'Cryptography & Cyber Security', 'Research Thesis & Seminar'],
    careers: ['Senior Software Architect', 'Security Analyst', 'R&D Researcher', 'Cloud Architect'],
    icon: GraduationCap
  },
  {
    name: 'Master of Computer Applications',
    code: 'MCA', seats: 30,
    desc: 'IT fundamentals, advanced Java, web technologies, cloud computing, mobile development and software testing.',
    color: 'bg-violet-600', light: 'bg-violet-50', text: 'text-violet-700', border: 'hover:border-violet-300', glow: 'shadow-violet-500/10',
    eligibility: 'Any Degree with Math + KMAT / PGCET',
    href: 'https://mca.newhorizoncollegeofengineering.in/',
    stream: 'computing',
    studyAreas: ['Advanced Java & Enterprise Tech', 'Mobile App Development', 'Software Quality Assurance', 'Database & Web Application Design', 'Cloud Computing Platforms'],
    careers: ['Mobile Developer', 'Systems Analyst', 'Software Tester', 'Web Developer'],
    icon: BookOpen
  },
  {
    name: 'Master of Business Administration',
    code: 'MBA', seats: 60,
    desc: 'Marketing, finance, HR, business analytics, entrepreneurship and enterprise management.',
    color: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-700', border: 'hover:border-amber-300', glow: 'shadow-amber-500/10',
    eligibility: 'Any Degree + PGCET / MAT / KMAT',
    href: 'https://mba.newhorizoncollegeofengineering.in/',
    stream: 'management',
    studyAreas: ['Marketing Strategy & Research', 'Financial Management', 'Human Resource Development', 'Business Analytics & Data Tools', 'Entrepreneurship & Growth'],
    careers: ['Business Development Manager', 'Financial Analyst', 'HR Specialist', 'Product Manager'],
    icon: Briefcase
  },
];

const PHD_PROGRAMS = [
  { name: 'Computer Science & Engineering',       area: 'AI · Cloud · Cyber Security · Data Mining', icon: Cpu },
  { name: 'Electrical & Electronics Engineering', area: 'Power Electronics · Smart Grid · VLSI', icon: Zap },
  { name: 'Mechanical Engineering',               area: 'Robotics · Thermal Engg · CAD/CAM · Composites', icon: Settings },
  { name: 'Electronics & Communication Engg.',    area: 'Signal Processing · IoT · Embedded Systems', icon: Layers },
  { name: 'Information Science & Engineering',    area: 'Data Science · Network Security · Software Engg.', icon: Layers },
  { name: 'Computer Applications',                area: 'AI · Data Mining · Network Security', icon: BookOpen },
  { name: 'Mathematics',                          area: 'Applied Maths · Graph Theory · Cryptography', icon: Atom },
  { name: 'Management Studies',                   area: 'Strategy · Marketing Analytics · HR · Finance', icon: Briefcase },
];

/* ─── Detail Modal Component ──────────────────────────────── */

interface DetailModalProps {
  program: any;
  onClose: () => void;
}

function DetailModal({ program, onClose }: DetailModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors z-10"
          aria-label="Close details"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-2xl ${program.light} ${program.text} flex-shrink-0`}>
              <program.icon size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${program.light} ${program.text}`}>
                  {program.code}
                </span>

              </div>
              <h3 className="text-xl font-bold text-navy-955 leading-tight">{program.name}</h3>
            </div>
          </div>

          <p className="text-slate-600 text-base leading-relaxed mb-6 border-b border-slate-100 pb-5">
            {program.desc}
          </p>

          {/* Grid of details */}
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-black text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className={`w-1.5 h-4 rounded-full ${program.color}`} />
                Core Focus Areas
              </h4>
              <ul className="space-y-2">
                {program.studyAreas?.map((area: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={14} className="text-emerald-500 mt-1 flex-shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black text-navy-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <span className={`w-1.5 h-4 rounded-full ${program.color}`} />
                Career Opportunities
              </h4>
              <ul className="space-y-2">
                {program.careers?.map((career: string, i: number) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0" />
                    <span>{career}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <a
              href={program.href !== '#' ? program.href : 'https://newhorizoncollegeofengineering.in/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-navy-900 hover:bg-navy-950 text-white font-bold py-3 px-5 rounded-2xl transition-colors flex items-center justify-center gap-1 text-sm shadow-md"
            >
              Visit Department Portal
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://newhorizoncollegeofengineering.in/admissions/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold py-3 px-5 rounded-2xl transition-colors text-sm shadow-md"
            >
              Enquire Admissions
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Interactive Admission Eligibility Guide ──────────────── */

function EligibilityAdvisor() {
  const [background, setBackground] = useState<string>('ug');

  return (
    <div className="bg-gradient-to-br from-slate-900 via-navy-950 to-navy-900 text-white py-16 overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl -z-10" />

      <div className="container-wide">
      <div className="w-full mx-auto">
        <span className="inline-flex items-center gap-2 bg-navy-800/80 border border-navy-700 text-gold-400 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4">
          <Sparkles size={12} />
          Interactive Admission Advisor
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-bold mb-4">Find Out What You Qualify For</h3>
        <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
          Select your current educational background below, and we will list which academic programmes you are eligible to apply for, along with specific requirements.
        </p>

        {/* Radios / Selectors */}
        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { id: 'ug', label: '10+2 / 2nd PUC', sub: 'Physics & Mathematics' },
            { id: 'pg-tech', label: 'B.E. / B.Tech Graduate', sub: 'Any Stream' },
            { id: 'pg-general', label: 'BCA / B.Sc / Any Degree', sub: 'Graduate Programs' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setBackground(opt.id)}
              className={`p-4 text-left rounded-2xl border transition-all duration-300 ${
                background === opt.id
                  ? 'bg-navy-800 border-gold-500 shadow-lg text-white'
                  : 'bg-navy-950/40 border-navy-800 hover:border-navy-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <p className="font-bold text-sm sm:text-base leading-snug">{opt.label}</p>
              <p className="text-xs text-slate-500 mt-1">{opt.sub}</p>
            </button>
          ))}
        </div>

        {/* Results Block */}
        <div className="bg-navy-900/60 backdrop-blur-sm border border-navy-800/80 rounded-2xl p-6 sm:p-8 animate-[fadeIn_0.35s_ease-out]">
          {background === 'ug' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-navy-800">
                <div>
                  <h4 className="text-lg font-bold text-gold-400">B.E. Programs (Undergraduate)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Duration: 4 Years (8 Semesters)</p>
                </div>
                <span className="text-xs font-bold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">PUC / 12th Std</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Passed 2nd PUC / 12th standard or equivalent examination with English as one of the languages. Minimum score of <strong className="text-white">45% aggregate in Physics &amp; Mathematics</strong> along with Chemistry / Bio-Technology / Computer Science / Electronics / Biology.
              </p>
              <div className="bg-navy-950/50 p-4 rounded-xl border border-navy-800 text-xs text-slate-400 space-y-1">
                <p>💡 <strong className="text-slate-300">SC/ST Karnataka Candidates:</strong> Minimum aggregate marks is relaxed to 40%.</p>
                <p>💡 <strong className="text-slate-300">Entrance Exams:</strong> Seat selection occurs through KCET / COMEDK / Management quotas.</p>
              </div>
            </div>
          )}

          {background === 'pg-tech' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-navy-800">
                <div>
                  <h4 className="text-lg font-bold text-gold-400">M.Tech, MBA &amp; MCA</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Duration: 2 Years (4 Semesters)</p>
                </div>
                <span className="text-xs font-bold bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20">Engineering Grad</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                You are eligible for our PG programmes. For <strong className="text-white">M.Tech (Computer Science &amp; Engineering)</strong>, you must hold an engineering degree in CSE / IT / ECE with a valid GATE or PGCET score. You can also transition to business management (MBA) or software apps (MCA).
              </p>
              <div className="bg-navy-950/50 p-4 rounded-xl border border-navy-800 text-xs text-slate-400 space-y-1">
                <p>💡 <strong className="text-slate-300">Entrance Exams:</strong> GATE / PGCET (for M.Tech); PGCET / KMAT / MAT (for MBA &amp; MCA).</p>
              </div>
            </div>
          )}

          {background === 'pg-general' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-navy-800">
                <div>
                  <h4 className="text-lg font-bold text-gold-400">MCA &amp; MBA (Postgraduate)</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Duration: 2 Years (4 Semesters)</p>
                </div>
                <span className="text-xs font-bold bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">General Graduate</span>
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                You qualify for the Master of Computer Applications (MCA) or Master of Business Administration (MBA). MCA requires a Bachelor's degree with Mathematics, Statistics, Computer Science, Computer Applications, or Business Mathematics as a subject at 10+2 level or Graduation level.
              </p>
              <div className="bg-navy-950/50 p-4 rounded-xl border border-navy-800 text-xs text-slate-400 space-y-1">
                <p>💡 <strong className="text-slate-300">Minimum Marks:</strong> 50% aggregate in Bachelor's degree (45% for SC/ST Karnataka students).</p>
                <p>💡 <strong className="text-slate-300">Entrance Exams:</strong> PGCET / KMAT / MAT.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

/* ─── Document Checklist ──────────────────────── */

const DOCS_LIST = [
  { id: '10th', label: '10th / SSLC Marks Card', desc: 'Original + 2 sets of clear Photocopies' },
  { id: '12th', label: '12th / PUC Marks Card', desc: 'Original + 2 sets of clear Photocopies' },
  { id: 'tc', label: 'Transfer Certificate (TC)', desc: 'Original + 2 sets of clear Photocopies' },
  { id: 'caste', label: 'Caste / Income Certificate', desc: 'Required for SC/ST/OBC (Karnataka students only)' },
  { id: 'photos', label: 'Recent Color Photographs', desc: '4 Passport-size + 4 Stamp-size copies' },
  { id: 'migration', label: 'Migration Certificate', desc: 'Required for students from non-Karnataka boards' },
];

function RequiredDocuments() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="mb-8 pb-6 border-b border-slate-100">
        <h3 className="font-bold text-navy-955 text-xl flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-600 rounded-full" />
          Required Documents for Admission
        </h3>
        <p className="text-sm text-slate-500 mt-1">Once the seat is confirmed, candidates must submit original documents along with photocopies during final registration.</p>
      </div>

      {/* Grid of Documents */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DOCS_LIST.map((doc, idx) => (
          <div 
            key={doc.id}
            className="flex gap-4 p-5 rounded-2xl border border-slate-150 bg-slate-50/30 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-gold-400 font-black text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 className="font-bold text-navy-950 text-base leading-snug flex items-center gap-1.5">
                {doc.label}
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{doc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stepper Application Flow ────────────────────────────── */

function ApplicationProcess() {
  return (
    <div>
      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 mt-10">
        <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
          className="bg-navy-900 hover:bg-navy-955 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm w-full sm:w-auto">
          Admission Enquiry Form
          <ArrowUpRight size={14} />
        </a>
        <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm w-full sm:w-auto">
          Online E-Application
        </a>
        <a href="https://newhorizoncollegeofengineering.in/wp-content/uploads/2026/05/BE-NHCE-Guideline-for-2022-23.pdf" target="_blank" rel="noopener noreferrer"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-1 shadow-sm w-full sm:w-auto">
          Download PDF Guide
        </a>
      </div>
    </div>
  );
}

/* ─── Page Implementation ─────────────────────────────────── */

export default function ProgramsPage() {
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState<'ug' | 'pg' | 'phd'>('ug');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  // Tabs sync
  useEffect(() => {
    if (hash) {
      const tabId = hash.replace('#', '');
      if (tabId === 'ug' || tabId === 'pg' || tabId === 'phd') {
        setActiveTab(tabId);
        setTimeout(() => {
          const el = document.getElementById('programs-tabs');
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 100);
      }
    }
  }, [hash]);

  // Clean filters when switching main program levels
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  // Matches counts for tabs (always computed globally)
  const ugMatches = useMemo(() => {
    if (!searchQuery.trim()) return UG_PROGRAMS.length;
    const query = searchQuery.toLowerCase().trim();
    return UG_PROGRAMS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.code.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    ).length;
  }, [searchQuery]);

  const pgMatches = useMemo(() => {
    if (!searchQuery.trim()) return PG_PROGRAMS.length;
    const query = searchQuery.toLowerCase().trim();
    return PG_PROGRAMS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.code.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    ).length;
  }, [searchQuery]);

  const phdMatches = useMemo(() => {
    if (!searchQuery.trim()) return PHD_PROGRAMS.length;
    const query = searchQuery.toLowerCase().trim();
    return PHD_PROGRAMS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.area.toLowerCase().includes(query)
    ).length;
  }, [searchQuery]);

  // Filtered lists
  const filteredUgPrograms = useMemo(() => {
    return UG_PROGRAMS.filter(p => {
      const query = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(query) || 
             p.code.toLowerCase().includes(query) || 
             p.desc.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const filteredPgPrograms = useMemo(() => {
    return PG_PROGRAMS.filter(p => {
      const query = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(query) || 
             p.code.toLowerCase().includes(query) || 
             p.desc.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  const filteredPhdPrograms = useMemo(() => {
    return PHD_PROGRAMS.filter(p => {
      const query = searchQuery.toLowerCase().trim();
      return p.name.toLowerCase().includes(query) || 
             p.area.toLowerCase().includes(query);
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 relative">
      
      {/* Dynamic ambient backgrounds */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] -right-16 w-64 h-64 sm:right-[-10%] sm:w-[500px] sm:h-[500px] bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-[50%] -left-16 w-64 h-64 sm:left-[-10%] sm:w-[500px] sm:h-[500px] bg-violet-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] -right-8 w-56 h-56 sm:right-[-5%] sm:w-[400px] sm:h-[400px] bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      <HeroSection
        image="/hero6.png"
        badge="NAAC A Accredited · VTU Affiliated"
        headingSmall="Discover Your"
        headingMain="Perfect"
        headingGhost="Programme at NHCE"
        description="From B.E. to Ph.D — 20+ industry-aligned programmes, VTU affiliated, designed to launch world-class careers."
        button={{
          label: 'Explore Programmes',
          href: '#programs-tabs',
          onClick: e => {
            e?.preventDefault();
            document.querySelector('#programs-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          },
        }}
      />

      {/* ── Floating Sticky Navigation Bar ── */}
      <div id="programs-tabs" className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-20 sm:top-16 z-30 shadow-sm scroll-mt-24 sm:scroll-mt-20">
        <div className="container-wide py-4">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 -mx-4 sm:px-0 sm:mx-0 sm:justify-center sm:overflow-visible">
            {[
              { id: 'ug', label: 'Undergraduate', count: ugMatches },
              { id: 'pg', label: 'Postgraduate', count: pgMatches },
              { id: 'phd', label: 'Ph.D', count: phdMatches },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as 'ug' | 'pg' | 'phd');
                    window.history.pushState(null, '', `#${tab.id}`);
                  }}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-[13px] sm:text-sm font-black tracking-wide uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-navy-955'
                  }`}
                >
                  <span>{tab.label}</span>
                 
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Universal Search Bar Panel (Centered below tabs) ── */}
      <div className="container-wide pt-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="relative group">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-violet-500/5 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search all programmes (e.g. CSE, MCA, PhD, VLSI)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-slate-400 font-semibold transition-all duration-300"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Active Tab Grid Content OR Universal Search Results ── */}
      <div className="min-h-[450px]">
        {searchQuery.trim() !== '' ? (
          /* ── Universal Search Results View ── */
          <div className="container-wide py-8 animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-8">
              <h2 className="text-xl font-bold text-navy-950">
                Search Results for <span className="text-blue-600">"{searchQuery}"</span>
              </h2>
              <span className="text-sm text-slate-500 font-bold bg-slate-100 px-3.5 py-1 rounded-full">
                Total Matches: {ugMatches + pgMatches + phdMatches}
              </span>
            </div>

            {ugMatches + pgMatches + phdMatches === 0 ? (
              /* Zero Results State */
              <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center max-w-md mx-auto shadow-sm my-12">
                <HelpCircle className="mx-auto text-slate-300 mb-4" size={44} />
                <p className="text-slate-600 font-bold text-sm">No programmes found matching "{searchQuery}".</p>
                <p className="text-xs text-slate-400 mt-2">Try checking for spelling or searching for broader terms like "Computer", "Electrical", "MBA", or "Ph.D".</p>
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 bg-navy-900 text-white rounded-full text-xs font-bold hover:bg-navy-950 transition-colors shadow-sm"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              /* Matching Results grouped by category */
              <div className="space-y-12">
                {/* UG Matches */}
                {ugMatches > 0 && (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-blue-500 rounded-full" />
                      Undergraduate B.E. Programmes ({ugMatches})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {filteredUgPrograms.map((p, idx) => (
                        <div
                          key={p.code}
                          onClick={() => setSelectedProgram(p)}
                          className={`group bg-white rounded-3xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative ${p.border}`}
                        >
                          {/* Background watermark icon */}
                          <p.icon size={100} className={`absolute right-0 bottom-0 ${p.text} opacity-[0.10] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none`} />

                          <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-xs font-black uppercase tracking-wide px-3 py-1 rounded-lg ${p.light} ${p.text}`}>
                                {p.code}
                              </span>
                              <span className="text-slate-255 group-hover:text-slate-300 font-black text-lg transition-colors">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-bold text-navy-955 text-sm sm:text-base leading-snug mb-3 select-none">
                              {p.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
                              {p.desc}
                            </p>
                            <div className="mt-auto pt-3 border-t border-slate-105 flex items-center justify-start">
                              <span className={`${p.text} flex items-center gap-0.5 text-xs font-bold group-hover:underline`}>
                                Quick View
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PG Matches */}
                {pgMatches > 0 && (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-violet-500 rounded-full" />
                      Postgraduate Programmes ({pgMatches})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {filteredPgPrograms.map((p, idx) => (
                        <div
                          key={p.code}
                          onClick={() => setSelectedProgram(p)}
                          className={`group bg-white rounded-3xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative ${p.border}`}
                        >
                          {/* Background watermark icon */}
                          <p.icon size={110} className={`absolute right-0 bottom-0 ${p.text} opacity-[0.10] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none`} />

                          <div className="p-6 flex flex-col flex-1 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-xs font-black uppercase tracking-wide px-3 py-1 rounded-lg ${p.light} ${p.text}`}>
                                {p.code}
                              </span>
                              <span className="text-slate-200 group-hover:text-slate-300 font-black text-lg transition-colors">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-bold text-navy-950 text-sm sm:text-base leading-snug mb-3 select-none">
                              {p.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                              {p.desc}
                            </p>

                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-start">
                              <span className={`${p.text} flex items-center gap-0.5 text-xs font-bold group-hover:underline`}>
                                Quick View
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PhD Matches */}
                {phdMatches > 0 && (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-500 rounded-full" />
                      Doctoral / Ph.D Research Programmes ({phdMatches})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredPhdPrograms.map((p, idx) => (
                        <div
                          key={p.name}
                          className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group animate-[fadeIn_0.3s_ease-out]"
                        >
                          {/* Background watermark icon */}
                          <p.icon size={110} className="absolute right-0 bottom-0 text-emerald-600 opacity-[0.09] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none" />

                          <div className="relative z-10 flex flex-col justify-between h-full w-full">
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-emerald-100">
                                  Ph.D Research
                                </span>
                                <span className="text-slate-200 font-black text-xs">{String(idx + 1).padStart(2, '0')}</span>
                              </div>
                              <h3 className="font-bold text-navy-955 text-sm sm:text-base leading-snug mb-3">{p.name}</h3>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Research Areas</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-mono">{p.area}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ── Regular Tab Content (Search Inactive) ── */
          <>
            {activeTab === 'ug' && (
              <div key="ug" className="animate-[fadeIn_0.35s_ease-out]">
                <div id="ug" className="container-wide pt-6 pb-16">
                  {/* Introduction Header */}
                  <AnimateIn variant="fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 mb-6">
                      <div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">01 — Undergraduate Degree</span>
                        <h2 className="font-display font-black text-navy-955 text-xl sm:text-2xl flex items-center gap-2">
                          Bachelor of Engineering (B.E.)
                        </h2>
                      </div>
                      <div className="mt-2 sm:mt-0 text-slate-500 text-xs sm:text-right">
                        <p className="font-semibold text-slate-700">Duration: 4 Years</p>
                        <p>Core Engineering · AI &amp; Computing · Basic Sciences</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-5xl">
                      Our B.E. programs are designed to combine high-fidelity theoretical concepts with real-world applications. Supported by advanced laboratory infrastructure, industry-supported curriculum reviews, and dedicated placement training, NHCE graduates are highly sought after by top multinational firms.
                    </p>
                  </AnimateIn>

                  {/* Grid cards */}
                  <AnimateIn variant="fade-up" delay={50}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {UG_PROGRAMS.map((p, idx) => (
                        <div
                          key={p.code}
                          onClick={() => setSelectedProgram(p)}
                          className={`group bg-white rounded-3xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative ${p.border}`}
                        >
                          {/* Background watermark icon */}
                          <p.icon size={110} className={`absolute right-0 bottom-0 ${p.text} opacity-[0.10] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none`} />

                          <div className="p-5 sm:p-6 flex flex-col flex-1 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-xs font-black uppercase tracking-wide px-3 py-1 rounded-lg ${p.light} ${p.text}`}>
                                {p.code}
                              </span>
                              <span className="text-slate-200 group-hover:text-slate-300 font-black text-lg transition-colors">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-bold text-navy-950 text-sm sm:text-base leading-snug mb-3 select-none">
                              {p.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
                              {p.desc}
                            </p>
                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-start">
                              <span className={`${p.text} flex items-center gap-0.5 text-xs font-bold group-hover:underline`}>
                                Quick View
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimateIn>
                </div>
              </div>
            )}

            {activeTab === 'pg' && (
              <div key="pg" className="animate-[fadeIn_0.35s_ease-out]">
                <div id="pg" className="container-wide pt-6 pb-16">
                  {/* Introduction Header */}
                  <AnimateIn variant="fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 mb-6">
                      <div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">02 — Postgraduate Degree</span>
                        <h2 className="font-display font-black text-navy-955 text-xl sm:text-2xl flex items-center gap-2">
                          Masters Programmes (M.Tech, MCA, MBA)
                        </h2>
                      </div>
                      <div className="mt-2 sm:mt-0 text-slate-500 text-xs sm:text-right">
                        <p className="font-semibold text-slate-700">Duration: 2 Years</p>
                        <p>Postgrad Specializations · Management · Computing Applications</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-5xl">
                      NHCE offers state-of-the-art postgraduate programs tailored to build specialization, research capabilities, and operational leadership. With professional faculty mentorship, advanced lab setups, and dedicated placement partners, our PG candidates develop global career opportunities.
                    </p>
                  </AnimateIn>

                  {/* Grid cards */}
                  <AnimateIn variant="fade-up" delay={50}>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {PG_PROGRAMS.map((p, idx) => (
                        <div
                          key={p.code}
                          onClick={() => setSelectedProgram(p)}
                          className={`group bg-white rounded-3xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer relative ${p.border}`}
                        >
                          {/* Background watermark icon */}
                          <p.icon size={110} className={`absolute right-0 bottom-0 ${p.text} opacity-[0.10] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none`} />

                          <div className="p-6 flex flex-col flex-1 relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`text-xs font-black uppercase tracking-wide px-3 py-1 rounded-lg ${p.light} ${p.text}`}>
                                {p.code}
                              </span>
                              <span className="text-slate-200 group-hover:text-slate-300 font-black text-lg transition-colors">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                            </div>
                            <h3 className="font-bold text-navy-950 text-sm sm:text-base leading-snug mb-3 select-none">
                              {p.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                              {p.desc}
                            </p>

                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-start">
                              <span className={`${p.text} flex items-center gap-0.5 text-xs font-bold group-hover:underline`}>
                                Quick View
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimateIn>
                </div>
              </div>
            )}

            {activeTab === 'phd' && (
              <div key="phd" className="animate-[fadeIn_0.35s_ease-out]">
                <div id="phd" className="container-wide pt-6 pb-16">
                  {/* Introduction Header */}
                  <AnimateIn variant="fade-up">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 pb-4 mb-6">
                      <div>
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-0.5">03 — Research Degree</span>
                        <h2 className="font-display font-black text-navy-950 text-xl sm:text-2xl flex items-center gap-2">
                          Doctor of Philosophy (Ph.D) &amp; Research Centers
                        </h2>
                      </div>
                      <div className="mt-2 sm:mt-0 text-slate-500 text-xs sm:text-right">
                        <p className="font-semibold text-slate-700">Full-Time / Part-Time</p>
                        <p>VTU Recognized · Multi-disciplinary Domains</p>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-5xl">
                      New Horizon College of Engineering houses VTU-recognized Research Centers dedicated to fostering technical and scientific inquiry. Our doctoral scholars collaborate on sponsored projects, file patents, and publish in leading Scopus/SCIE journals.
                    </p>
                  </AnimateIn>

                  {/* Grid cards */}
                  <AnimateIn variant="fade-up" delay={50}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {PHD_PROGRAMS.map((p, idx) => (
                        <div
                          key={p.name}
                          className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
                        >
                          {/* Background watermark icon */}
                          <p.icon size={110} className="absolute right-0 bottom-0 text-emerald-600 opacity-[0.10] group-hover:scale-110 group-hover:rotate-[12deg] transition-all duration-500 pointer-events-none" />

                          <div className="relative z-10 flex flex-col justify-between h-full w-full">
                            <div>
                              <div className="flex items-start justify-between mb-4">
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-emerald-100">
                                  Ph.D Research
                                </span>
                                <span className="text-slate-200 font-black text-xs">{String(idx + 1).padStart(2, '0')}</span>
                              </div>
                              <h3 className="font-bold text-navy-955 text-sm sm:text-base leading-snug">{p.name}</h3>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-100">
                              <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Research Areas</p>
                              <p className="text-xs text-slate-600 leading-relaxed font-mono">{p.area}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimateIn>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Eligibility Interactive Guide Section ── */}
      <AnimateIn variant="fade-up">
        <EligibilityAdvisor />
      </AnimateIn>

      {/* ── Document Checklist & Stepper Journey Section (UG & PG only) ── */}
      {activeTab !== 'phd' && (
        <div className="container-wide py-16 space-y-16">
          <AnimateIn variant="fade-up">
            <RequiredDocuments />
          </AnimateIn>

          <AnimateIn variant="fade-up">
            <ApplicationProcess />
          </AnimateIn>
        </div>
      )}

      {/* ── PhD specific footer links ── */}
      {activeTab === 'phd' && (
        <div className="container-wide py-16 text-center">
          <AnimateIn variant="fade-up">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 max-w-2xl mx-auto shadow-sm">
              <h3 className="font-bold text-navy-950 text-xl mb-3">Looking to Apply for a Ph.D?</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                PhD admissions at New Horizon College of Engineering are conducted in strict compliance with the Visvesvaraya Technological University (VTU) guidelines. Scholars may apply for full-time or part-time routes.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://newhorizoncollegeofengineering.in/admissions/" target="_blank" rel="noopener noreferrer"
                  className="bg-navy-900 hover:bg-navy-955 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1 shadow-sm">
                  Research Office Enquiry
                  <ArrowUpRight size={14} />
                </a>
                <a href="https://vtu.ac.in/" target="_blank" rel="noopener noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1 border border-slate-200">
                  Visit VTU Website
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      )}

      {/* ── Detail Modal Render ── */}
      {selectedProgram && (
        <DetailModal 
          program={selectedProgram} 
          onClose={() => setSelectedProgram(null)} 
        />
      )}

    </div>
  );
}
