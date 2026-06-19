import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, ChevronRight, GraduationCap, Phone, Mail,
  MapPin, FileText, Users, BookOpen, Award, ArrowUpRight
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import HeroSection from '../components/ui/HeroSection';

/* ─── Data ─────────────────────────────────────────────────── */


const PROCESS_STEPS = [
  { n: '01', icon: FileText,      title: 'Check Eligibility',     desc: '10+2 with PCM, minimum 45% aggregate. Valid KCET / COMEDK / JEE score.' },
  { n: '02', icon: BookOpen,      title: 'Fill Application',      desc: 'Complete the online application form with academic details and documents.' },
  { n: '03', icon: Users,         title: 'Attend Counseling',     desc: 'Participate in KCET/COMEDK allotment counseling or opt for Management Quota direct admission.' },
  { n: '04', icon: CheckCircle,   title: 'Document Verification', desc: 'Submit originals: 10th & 12th marksheets, ID proof, transfer certificate, photos.' },
  { n: '05', icon: GraduationCap, title: 'Join NHCE!',            desc: 'Pay fees, complete formalities, and begin your engineering journey at NHCE.' },
];

const FEES = [
  { prog: 'B.E. / B.Tech (all branches)', fee: '₹95,000 – ₹1,10,000', per: 'per year' },
  { prog: 'M.Tech',                        fee: '₹65,000 – ₹75,000',   per: 'per year' },
  { prog: 'MBA',                           fee: '₹1,20,000',           per: 'per year' },
  { prog: 'MCA',                           fee: '₹60,000',             per: 'per year' },
];

const DATES = [
  { label: 'KCET Application Opens',    date: 'Jan 2025', done: true  },
  { label: 'KCET Examination',          date: 'Apr 2025', done: true  },
  { label: 'KCET Counseling (Round 1)', date: 'Jun 2025', done: false },
  { label: 'Management Quota Closes',   date: 'Jul 2025', done: false },
  { label: 'Classes Commence',          date: 'Aug 2025', done: false },
];

const HELPLINES = [
  { region: 'Karnataka & Tamil Nadu', phone: '+91-98805 34935' },
  { region: 'Kerala',                 phone: '+91-99451 33772' },
  { region: 'North India',            phone: '+91-97400 76446' },
  { region: 'Andhra & Telangana',     phone: '+91-97400 76447' },
  { region: 'East India',             phone: '+91-97400 76936' },
  { region: 'General Enquiry',        phone: '+91-80-6629 7777' },
];

const HIGHLIGHTS = [
  { icon: Award,        value: 'NAAC A',  label: 'Accreditation'        },
  { icon: Users,        value: '3000+',    label: 'Annual Placements'     },
  { icon: BookOpen,     value: '20+',      label: 'Programs Offered'      },
  { icon: GraduationCap,value: '25+',      label: 'Years of Excellence'   },
];

/* ─── Programs Section ─────────────────────────────────────── */

const PROGRAM_CATEGORIES = [
  {
    title: 'Undergraduate Programmes (UG)',
    desc: 'B.E. programmes — 4 years · Min 50% in 10+2 PCM',
    image: '/ug.jpg',
    href: '/programs#ug',
    courses: [
      'B.E. Computer Science & Engineering',
      'B.E. AI & Machine Learning',
      'B.E. Electronics & Communication Engg.',
      'B.E. Electrical & Electronics Engineering',
      'B.E. Mechanical Engineering',
      'B.E. Civil Engineering',
      'B.E. Applied Sciences & Engineering',
    ],
  },
  {
    title: 'Postgraduate Programmes (PG)',
    desc: 'M.Tech, MBA, MCA — 2 years · via GATE / PGCET / KMAT',
    image: '/pg.jpg',
    href: '/programs#pg',
    courses: [
      'M.Tech – Computer Science & Engineering',
      'Master of Business Administration (MBA)',
      'Master of Computer Applications (MCA)',
    ],
  },
  {
    title: 'Doctoral Programmes (Ph.D.)',
    desc: 'Full-time & part-time research · VTU / UGC guidelines',
    image: '/phd.jpg',
    href: '/programs#phd',
    courses: [
      'Computer Science & Engineering',
      'Electrical & Electronics Engineering',
      'Mechanical Engineering',
      'Computer Applications',
      'Management Studies',
      'Chemistry',
      'Mathematics',
    ],
  },
];

function ProgramsSection() {
  return (
    <div>
      <div className="space-y-4">
        {PROGRAM_CATEGORIES.map(cat => (
          <div key={cat.title} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col sm:flex-row">
            {/* Image */}
            <div className="sm:w-56 sm:flex-shrink-0 h-48 sm:h-auto overflow-hidden">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            </div>
            {/* Text */}
            <div className="p-5 flex flex-col justify-center flex-1">
              <div className="flex items-start justify-between gap-3 mb-1">
                <h3 className="font-bold text-navy-900 text-base sm:text-xl leading-snug">{cat.title}</h3>
                <Link
                  to={cat.href}
                  className="flex-shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-all"
                >
                  Explore <ArrowUpRight size={12} />
                </Link>
              </div>
              <p className="text-base sm:text-base text-slate-500 mb-3">{cat.desc}</p>
              {/* <div className="flex flex-wrap gap-2">
                {cat.courses.map(c => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {c}
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function AdmissionsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="/admission_hero.jpg"
        badge="🎓 Admissions Open 2025–26"
        headingSmall="Begin Your Journey at"
        headingMain="NHCE"
        headingGhost=""
        description="NAAC A accredited, AICTE & UGC approved, permanently affiliated to VTU. Join 15,000+ students building world-class careers at NHCE Bengaluru."
        button={{ label: 'Apply Now 2025–26', href: 'https://newhorizoncollegeofengineering.in/admissions/' }}
        secondaryButton={{ label: 'Talk to Counselor', href: 'tel:+919880534935' }}
        bottomSlot={
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-navy-900/90 border border-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 text-white shadow-lg text-left">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-gold-400" />
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-xl leading-none">{value}</div>
                  <div className="text-white/60 text-xs sm:text-sm mt-1 leading-tight">{label}</div>
                </div>
              </div>
            ))}
          </div>
        }
      />

      {/* ── Intro paragraphs ── */}
      <div className="bg-white border-b border-slate-100">
        <AnimateIn variant="fade-up">
        <div className="container-wide py-10 space-y-4 text-slate-600 text-base leading-relaxed">
          <p>
            <strong className="text-navy-900">New Horizon College of Engineering</strong> is an autonomous college permanently affiliated to Visvesvaraya Technological University (VTU), approved by the All India Council for Technical Education (AICTE) &amp; University Grants Commission (UGC), and ranked as a Platinum Institution by AICTE and CII for the best industry-linked technical education. NHCE is consistently recognised as one of the top engineering colleges in Bangalore for its achievements across every branch and well-balanced course management.
          </p>
          <p>
            Every year students from across the country choose NHCE to build world-class careers. New Horizon College of Engineering welcomes students through two admission formats — giving you a fair and transparent path to join one of Bangalore's finest institutions.
          </p>
        </div>
        </AnimateIn>
      </div>

      {/* ── Body ── */}
      <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30">
        <div className="container-wide py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* ── Left column ── */}
            <div className="lg:col-span-2 space-y-12">

              {/* Programs */}
              <AnimateIn variant="fade-up">
              <div>
                <h2 className="font-display font-bold text-navy-900 text-2xl sm:text-3xl mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-blue-500 rounded-full" /> Programs Offered
                </h2>
                <ProgramsSection />
              </div>
              </AnimateIn>

              {/* Admission Process */}
              <AnimateIn variant="fade-up" delay={80}>
              <div>
                <h2 className="font-display font-bold text-navy-900 text-2xl sm:text-3xl mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-navy-500 rounded-full" /> Admission Process
                </h2>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  <div className="bg-blue-600 text-white rounded-2xl p-5">
                    <div className="font-bold text-base sm:text-base mb-1">Route 1 — KCET / COMEDK</div>
                    <p className="text-white/75 text-sm sm:text-base leading-relaxed">Through Karnataka Examination Authority. Open to Karnataka domicile students & all-India candidates across 220+ colleges.</p>
                  </div>
                  <div className="bg-navy-800 text-white rounded-2xl p-5">
                    <div className="font-bold text-base sm:text-base mb-1">Route 2 — Management Quota</div>
                    <p className="text-white/75 text-sm sm:text-base leading-relaxed">Direct admission through the college. Minimum 45% aggregate required. Sports quota scholarships available.</p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-blue-200 to-navy-200 hidden sm:block" />
                  <div className="space-y-4">
                    {PROCESS_STEPS.map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={i} className="flex gap-4 group">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-blue-200 group-hover:border-navy-600 flex items-center justify-center text-navy-700 font-black text-sm transition-colors shadow-sm z-10">
                            {step.n}
                          </div>
                          <div className="bg-white rounded-2xl p-4 flex-1 shadow-sm hover:shadow-md border border-slate-100 group-hover:border-navy-100 transition-all">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon size={14} className="text-blue-600" />
                              <h4 className="font-semibold text-navy-900 text-base sm:text-base">{step.title}</h4>
                            </div>
                            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              </AnimateIn>

            </div>

            {/* ── Sidebar — desktop only, sticky within this section ── */}
            <AnimateIn variant="fade-left" delay={200} className="self-start sticky top-28">
            <div className="hidden lg:flex lg:flex-col gap-4">

              {/* Apply CTA */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-700 text-white rounded-3xl p-6">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="font-display font-bold text-base mb-1">Apply Online</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">Applications for 2025–26 are open. Limited seats — apply early to secure yours.</p>
                <a
                  href="https://newhorizoncollegeofengineering.in/admissions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-base justify-center flex items-center gap-2"
                >
                  Start Application <ChevronRight size={15} />
                </a>
                <button className="mt-2 w-full border border-white/20 text-white/70 hover:text-white text-base font-medium py-2.5 rounded-full transition-colors">
                  Download Brochure
                </button>
              </div>


              {/* Contact */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h4 className="font-bold text-navy-900 text-base mb-3">Admissions Office</h4>
                <div className="space-y-2.5 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-blue-600 flex-shrink-0" />
                    <a href="tel:+919880534935" className="hover:text-navy-800 transition-colors">+91-98805 34935</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-blue-600 flex-shrink-0" />
                    <a href="mailto:admissionsnhce@newhorizonindia.edu" className="hover:text-navy-800 transition-colors break-all">admissionsnhce@newhorizonindia.edu</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>Bellandur Main Road, Near Marathahalli, Bengaluru – 560103</span>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mt-3">Mon – Sat · 9:00 AM – 5:00 PM</p>
              </div>

              {/* Accreditations mini */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                <h4 className="font-bold text-navy-900 text-xs mb-3 uppercase tracking-wider">Accreditations</h4>
                <div className="grid grid-cols-4 gap-2">
                  {['/acc/vtu.webp', '/acc/aicte.png', '/acc/nba.png', '/acc/naac.png'].map(src => (
                    <img key={src} src={src} alt="" className="h-10 w-full object-contain" />
                  ))}
                </div>
              </div>
            </div>
            </AnimateIn>
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimateIn variant="scale" delay={80}>
        <div className="container-wide pb-12">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900 rounded-3xl p-8 text-center text-white">
            <h3 className="font-display font-bold text-2xl mb-2">Ready to Join NHCE?</h3>
            <p className="text-white/60 text-base mb-6 max-w-lg mx-auto">
              15,000+ students have built their careers here. Be the next success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://newhorizoncollegeofengineering.in/admissions/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                Apply for 2025–26 <ChevronRight size={15} />
              </a>
              <a
                href="tel:+919880534935"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white/80 hover:text-white hover:border-white/50 text-base font-semibold px-6 py-2.5 rounded-full transition-all"
              >
                <Phone size={14} /> Schedule a Campus Visit
              </a>
            </div>
          </div>
        </div>
        </AnimateIn>
      </div>
    </div>
  );
}
