import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Presentation, BookOpen, MapPinned, FlaskConical, ShieldCheck,
  Building2, Globe2, Handshake, Award, GraduationCap, Sparkles,
  Users, Lightbulb, Printer, Scissors, Cpu, CircuitBoard, Wrench, Boxes,
  FileCheck2, Mic2, Rocket, CalendarCheck, CheckCircle2, ArrowRight,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const QUICK_NAV = [
  { id: 'about-iiic',      label: 'About IIIC' },
  { id: 'partnerships',    label: 'Industry Partnerships' },
  { id: 'sponsored-labs',  label: 'Sponsored Labs' },
  { id: 'coe',             label: 'Centers of Excellence' },
  { id: 'training',        label: 'Corporate Training' },
  { id: 'mous',            label: 'MoUs & Collaborations' },
  { id: 'visits',          label: 'Visits & Lectures' },
  { id: 'benefits',        label: 'Student Benefits' },
];

const OBJECTIVES = [
  { Icon: Target,       title: 'Job to Career (J2C)',       desc: 'Shifting student perspective from chasing jobs to building SMART, long-term career goals.' },
  { Icon: Presentation, title: 'Seminars & Guest Lectures',  desc: 'Regular sessions with industry engineers, alumni and corporate leaders on campus.' },
  { Icon: BookOpen,     title: 'Curriculum Integration',     desc: 'Industry experts contribute directly to curriculum design and review.' },
  { Icon: MapPinned,    title: 'Industrial Visits',          desc: 'Structured plant and facility visits for faculty and students.' },
  { Icon: FlaskConical, title: 'Research & Consultancy',     desc: 'Sponsored research, joint publications and consulting opportunities.' },
  { Icon: ShieldCheck,  title: 'Professionalism & Ethics',   desc: 'Building workplace-ready conduct and ethical grounding in every student.' },
];

const NATIONAL_PARTNERS = [
  'Microsoft', 'Cognizant', 'Infosys', 'TCS', 'Wipro', 'Eurofins', 'Gallagher',
  'HexAware', 'JMR', "Lowe's", 'Rakuten', 'Salarpuria Sattva', 'STUP',
  'Autoliv', 'Altair', 'DXC Technology', 'Volvo',
];

const INTERNATIONAL_PARTNERS = ['ConnectKX', 'République', 'MISAT', 'Zenken'];

const SPONSORED_LABS = [
  { name: 'Brillio Data Analytics Lab',       sponsor: 'Brillio' },
  { name: 'Capgemini Industry 4.0 Lab',       sponsor: 'Capgemini' },
  { name: 'VMware IT Academy Lab',            sponsor: 'VMware' },
  { name: 'SAP Center of Excellence',         sponsor: 'SAP' },
  { name: 'CISCO Networking Academy',         sponsor: 'Cisco' },
  { name: 'Schneider Electric Lab',           sponsor: 'Schneider Electric' },
  { name: 'IBM OpenPower Lab',                sponsor: 'IBM' },
  { name: 'Robotic Process Automation Lab',   sponsor: 'Automation Anywhere' },
  { name: 'Capgemini PLM Lab',                sponsor: 'Capgemini' },
  { name: 'Juniper Networks Lab',             sponsor: 'Juniper Networks' },
  { name: 'Capgemini VLSI Lab',               sponsor: 'Capgemini' },
  { name: 'AFGS Accounts & Finance CoE',      sponsor: 'AFGS' },
  { name: '5G Communication Lab',             sponsor: 'Industry Consortium' },
  { name: 'HP Vertica Lab',                   sponsor: 'HP' },
  { name: 'FANUC Robotics Lab',               sponsor: 'FANUC' },
];

const UPCOMING_LABS = ['Palo Alto', 'Microchip', 'Blue Prism University', 'Celonis', 'Red Hat Academy'];

const IDEA_LAB_FACILITIES = [
  { Icon: Printer,      label: '3D Printer' },
  { Icon: Boxes,        label: 'CNC Wood Router' },
  { Icon: Wrench,       label: 'Lathe Machine' },
  { Icon: Scissors,     label: 'Vinyl Cutter' },
  { Icon: Cpu,          label: 'Laser Cutting Machine' },
  { Icon: CircuitBoard, label: 'PCB Machine' },
];

const TRAINING_PROGRAMS = [
  { Icon: Users,        title: 'Visiting Industry Faculty',        desc: 'Working professionals co-teach specialized modules alongside core faculty.' },
  { Icon: Handshake,    title: 'Joint Industry Projects',          desc: 'Live problem statements from partner companies solved by student teams.' },
  { Icon: BookOpen,     title: 'Curriculum Co-Development',        desc: 'Industry input shapes course content to stay aligned with real-world skills.' },
  { Icon: Award,        title: 'Short-Term Certification Courses', desc: 'Continuing education programs run in collaboration with technology partners.' },
  { Icon: FlaskConical, title: 'Research & Consulting',            desc: 'Sponsored research engagements and consulting assignments with industry.' },
  { Icon: FileCheck2,   title: 'Publications & Joint Patents',     desc: 'Collaborative research output co-authored and co-filed with industry partners.' },
];

const MOU_PARTNERS = [
  'Cognizant', 'DXC Technology', 'Eurofins IT Solutions', 'Gallagher', 'Infosys',
  "Lowe's", 'Rakuten', 'Salarpuria Sattva', 'STUP', 'TCS', 'Volvo', 'Wipro',
];

const VISIT_ACTIVITIES = [
  { Icon: MapPinned,     title: 'Industrial Visits',          desc: 'On-site visits to partner facilities for hands-on industry exposure.' },
  { Icon: Mic2,          title: 'Guest Lectures & Expert Talks', desc: 'Sessions led by industry engineers, alumni and corporate leaders.' },
  { Icon: Presentation,  title: 'Workshops & Webinars',       desc: 'Skill-focused sessions on emerging tools and technologies.' },
  { Icon: Rocket,        title: 'Hackathons',                 desc: 'Innovation challenges run through the AICTE IDEA Lab and partners.' },
  { Icon: CalendarCheck, title: 'Conferences & Corporate Meets', desc: 'Networking and knowledge-sharing events with industry leadership.' },
];

const NOTABLE_EVENTS = ['AccelATHON', 'ATA — Agile Testing Alliance', 'Global IT Commune', 'International Delegate Visits'];

const STUDENT_BENEFITS = [
  { Icon: FlaskConical,  title: 'Hands-On Lab Access',       desc: 'Work on industry-grade equipment across 15+ sponsored labs.' },
  { Icon: Users,         title: 'Industry Mentorship',       desc: 'Direct guidance from working professionals and alumni.' },
  { Icon: Handshake,     title: 'Internship Pipeline',       desc: 'Pathways into internships with 20+ partner companies.' },
  { Icon: BookOpen,      title: 'Industry-Aligned Curriculum', desc: 'Coursework shaped by real industry input and standards.' },
  { Icon: Lightbulb,     title: 'Innovation & Entrepreneurship', desc: 'Turn ideas into prototypes through the AICTE IDEA Lab.' },
  { Icon: Award,         title: 'Global Certifications',     desc: 'Credentials from Cisco, SAP, VMware, IBM and more.' },
  { Icon: Rocket,        title: 'Hackathons & Conferences',  desc: 'Regular exposure to competitive, real-world problem solving.' },
  { Icon: Sparkles,      title: 'Placement Edge',            desc: 'A direct advantage when partner companies come to recruit.' },
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function IndustryCollaborationsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        image="/campus/idea_labs1.jpg"
        badge="Industry Institute Interaction Cell · AICTE IDEA Lab"
        headingSmall="Industry"
        headingMain="Collaborations"
        headingGhost="That Shape Careers"
        description="From sponsored labs and Centers of Excellence to hackathons and formal MoUs — a look at how NHCE connects the classroom to the industry floor."
        button={{ label: 'Explore Partnerships', href: '#partnerships' }}
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

      {/* ── About IIIC ── */}
      <section id="about-iiic" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-blue-100 text-blue-700 mb-4">About IIIC</span>
            <h2 className="heading-md text-navy-950 mb-4">
              The Industry Institute{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">Interaction Cell</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-10">
              The IIIC exists to shift student perspective from <strong className="text-navy-900">"Job to Career" (J2C)</strong> by
              helping students identify SMART career goals. It builds bridges between faculty and industry through mutually
              beneficial projects and collaborations — positioning every NHCE graduate as an industry-ready innovator.
            </p>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {OBJECTIVES.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-sm transition-all">
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

      {/* ── Industry Partnerships ── */}
      <section id="partnerships" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge bg-navy-100 text-navy-700 mb-4">Industry Partnerships</span>
                <h2 className="heading-md text-navy-950">
                  A Network Built on{' '}
                  <span className="text-gradient bg-gradient-to-r from-navy-700 to-blue-600">Trust</span>
                </h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">20+</p>
                  <p className="text-slate-500 text-sm">National Partners</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">4</p>
                  <p className="text-slate-500 text-sm">International Ties</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">National</p>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {NATIONAL_PARTNERS.map(name => (
                <span key={name} className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm">
                  <Building2 size={13} className="text-slate-400" /> {name}
                </span>
              ))}
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">International</p>
            <div className="flex flex-wrap gap-2.5">
              {INTERNATIONAL_PARTNERS.map(name => (
                <span key={name} className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-navy-800 shadow-sm">
                  <Globe2 size={13} className="text-slate-400" /> {name}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Industry Sponsored Labs ── */}
      <section id="sponsored-labs" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-violet-100 text-violet-700 mb-4">Industry Sponsored Labs</span>
            <h2 className="heading-md text-navy-950 mb-3">
              15 Labs. <span className="text-gradient bg-gradient-to-r from-violet-700 to-indigo-600">One Mission.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mb-10">
              Purpose-built labs co-funded and co-designed with global technology leaders, giving students access to
              tools used in real industry environments.
            </p>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {SPONSORED_LABS.map(lab => (
                <div key={lab.name} className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
                  <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={16} className="text-violet-600" />
                  </div>
                  <div>
                    <p className="font-bold text-navy-900 text-sm leading-snug">{lab.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">Sponsored by {lab.sponsor}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={120}>
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Coming Soon</p>
              <div className="flex flex-wrap gap-2">
                {UPCOMING_LABS.map(name => (
                  <span key={name} className="text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-full px-4 py-1.5">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Centers of Excellence ── */}
      <section id="coe" className="scroll-mt-32 py-16 bg-navy-950">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-white/10 text-gold-400 mb-4">Centers of Excellence</span>
            <h2 className="heading-md text-white mb-10">
              Where Ideas Become{' '}
              <span className="text-gradient bg-gradient-to-r from-gold-400 to-amber-300">Prototypes</span>
            </h2>
          </AnimateIn>

          {/* IDEA Lab spotlight */}
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden mb-6">
              <div className="h-64 lg:h-auto">
                <img src="/campus/idea_labs.jpg" alt="AICTE IDEA Lab" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 sm:p-10">
                <span className="badge bg-gold-100 text-gold-700 mb-4">Flagship Center</span>
                <h3 className="font-display font-bold text-navy-950 text-2xl mb-3">AICTE IDEA Lab</h3>
                <p className="text-slate-500 text-base leading-relaxed mb-5">
                  A national AICTE initiative — Institutional Innovation, Design & Entrepreneurship Accelerator —
                  enabling hands-on learning, interdisciplinary research and technology-driven problem solving.
                  Run by a Lab Council of faculty and student coordinators.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {IDEA_LAB_FACILITIES.map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5">
                      <Icon size={15} className="text-navy-700 flex-shrink-0" />
                      <span className="text-slate-700 text-xs font-semibold leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
                <Link to="/aicte-idea-lab" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-900 mt-5">
                  Explore the Full Lab <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={120}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 bg-gold-400/10 rounded-xl flex items-center justify-center mb-4">
                  <Cpu size={19} className="text-gold-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1.5">SAP Center of Excellence</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Enterprise software training ground built in partnership with SAP, preparing students for
                  ERP-driven careers.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 bg-gold-400/10 rounded-xl flex items-center justify-center mb-4">
                  <Award size={19} className="text-gold-400" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1.5">AFGS Accounts & Finance CoE</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Specialized finance and accounting practice lab preparing management students for
                  industry-standard financial operations.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Corporate Training Programs ── */}
      <section id="training" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-emerald-100 text-emerald-700 mb-4">Corporate Training Programs</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Learning That Runs{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-700 to-green-600">Both Ways</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRAINING_PROGRAMS.map(({ Icon, title, desc }) => (
                <div key={title} className="border border-slate-100 rounded-2xl p-6 hover:shadow-md hover:border-emerald-200 transition-all">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={19} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── MoUs & Collaborations ── */}
      <section id="mous" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-amber-100 text-amber-700 mb-4">MoUs & Collaborations</span>
            <h2 className="heading-md text-navy-950 mb-3">
              Formal Agreements,{' '}
              <span className="text-gradient bg-gradient-to-r from-amber-600 to-orange-600">Real Commitments</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mb-10">
              Beyond informal collaboration, NHCE holds signed Memorandums of Understanding with the following
              organizations — formalizing training, research and placement pathways.
            </p>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOU_PARTNERS.map(name => (
                <div key={name} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3.5 shadow-sm">
                  <CheckCircle2 size={17} className="text-amber-500 flex-shrink-0" />
                  <span className="font-semibold text-navy-800 text-sm">{name}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Industrial Visits & Guest Lectures ── */}
      <section id="visits" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-rose-100 text-rose-700 mb-4">Industrial Visits & Guest Lectures</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Beyond the{' '}
              <span className="text-gradient bg-gradient-to-r from-rose-700 to-pink-600">Classroom</span>
            </h2>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {VISIT_ACTIVITIES.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <div className="w-11 h-11 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={19} className="text-rose-600" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-1.5">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={120}>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Notable Events</p>
            <div className="flex flex-wrap gap-2.5">
              {NOTABLE_EVENTS.map(name => (
                <span key={name} className="inline-flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-full px-4 py-2 text-sm font-semibold text-rose-700">
                  <Sparkles size={13} /> {name}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Student Benefits ── */}
      <section id="benefits" className="scroll-mt-32 py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-blue-100 text-blue-700 mb-4">Student Benefits</span>
            <h2 className="heading-md text-navy-950 mb-10">
              What This Means for{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">You</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STUDENT_BENEFITS.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
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

      {/* ── CTA ── */}
      <div className="bg-white py-16">
        <div className="container-wide">
          <AnimateIn variant="scale">
            <div className="bg-navy-950 rounded-3xl p-10 sm:p-16 text-center">
              <h2 className="heading-md text-white mb-4">Ready to Build an Industry-Ready Career?</h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
                Explore admissions or reach out to the Industry Institute Interaction Cell for partnership enquiries.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/admissions" className="btn-gold">Explore Admissions <ArrowRight size={14} /></Link>
                <Link to="/contact" className="btn-outline">Contact Us</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

    </div>
  );
}
