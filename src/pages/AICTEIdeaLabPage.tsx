import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb, Rocket, Target, Compass, Cpu, Printer, Boxes, Wrench, Scissors,
  CircuitBoard, Users, GraduationCap, Award, Presentation, Image as ImageIcon,
  ExternalLink, Mail, Phone, Crown, ArrowRight, Handshake, Sparkles,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const QUICK_NAV = [
  { id: 'overview',   label: 'Lab Overview' },
  { id: 'about',      label: 'About' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'activities', label: 'Activities' },
  { id: 'gallery',    label: 'Gallery' },
  { id: 'council',    label: 'Meet the Council' },
  { id: 'benefits',   label: 'Student Benefits' },
];

const WP_UPLOADS = 'https://newhorizoncollegeofengineering.in/wp-content/uploads';

const OVERVIEW_VIDEOS = [
  { title: 'Idea Lab Achievements', src: `${WP_UPLOADS}/2026/06/IDEA-Lab-Achievements.mp4` },
  { title: 'Step Inside the Lab',   src: `${WP_UPLOADS}/2025/12/IdeaLabTour.mp4` },
];

const MISSION_POINTS = [
  'Encourage STEM application among students',
  'Empower students and faculty to actualize innovative ideas',
  'Enable innovators to convert concepts into products that address real-world challenges',
];

const VISION_POINTS = [
  'Foster a culture of innovation and creativity',
  'Create environments for idea development and implementation',
  'Establish an interdisciplinary project hub for hands-on learning',
  'Equip individuals with an entrepreneurial mindset and skillset',
];

const FACILITIES = [
  { Icon: Printer,      name: '3D Printer',           desc: 'Rapid prototyping and additive manufacturing for functional models.',       image: `${WP_UPLOADS}/2025/12/3dprinter3.jpeg` },
  { Icon: Boxes,        name: 'CNC Wood Router',       desc: 'Precision cutting and routing for wood-based prototypes and enclosures.',    image: `${WP_UPLOADS}/2025/12/cnc.jpeg` },
  { Icon: Wrench,       name: 'Lathe Machine',         desc: 'Precision machining for turned metal and composite components.',            image: `${WP_UPLOADS}/2025/12/lathe.jpeg` },
  { Icon: Scissors,     name: 'Vinyl Cutter',          desc: 'Clean material cutting for signage, stencils and design applications.',      image: `${WP_UPLOADS}/2025/12/vinly1.jpeg` },
  { Icon: Cpu,          name: 'Laser Cutting Machine', desc: 'High-precision fabrication for intricate parts and enclosures.',             image: `${WP_UPLOADS}/2025/12/laser.jpeg` },
  { Icon: CircuitBoard, name: 'PCB Machine',           desc: 'In-house circuit board manufacturing for electronics prototypes.',           image: `${WP_UPLOADS}/2025/12/pcb.jpeg` },
];

const ACTIVITIES = [
  { Icon: Presentation,  title: 'Faculty Development Program', desc: 'Upskilling faculty mentors on innovation tools and pedagogy.' },
  { Icon: Lightbulb,     title: 'Ideation Workshops',          desc: 'Structured sessions that shape raw ideas into actionable projects.' },
  { Icon: GraduationCap, title: 'Open Day for School Students', desc: 'Introducing pre-university students to hands-on innovation.' },
  { Icon: Award,         title: 'Skill Development Program',   desc: 'Training lab instructors on equipment and safety protocols.' },
  { Icon: Users,         title: 'Student Skill Development',   desc: 'Hands-on technical training workshops for students.' },
  { Icon: Rocket,        title: 'Summer Camp',                 desc: 'An intensive multi-week programme immersing students in the lab.' },
];

const GALLERY_ALBUMS = [
  { title: 'IDEA Lab Inauguration Glimpse',            count: 12, image: '/campus/idea_labs.jpg' },
  { title: 'Summer Camp @ IDEA Lab',                   count: 28, image: '/campus/idea_labs1.jpg' },
  { title: 'Open Day for Degree Students',             count: 4,  image: '/campus/idea_labs.jpg' },
  { title: 'Skill Development — Lab Instructors',      count: 4,  image: '/campus/idea_labs1.jpg' },
  { title: 'Student Skill Development Program',        count: 11, image: '/campus/idea_labs.jpg' },
];

const LEADERSHIP = [
  { name: 'Dr. Manjunatha',     role: 'Chief Mentor · Principal' },
  { name: 'Dr. Revathi V',      role: 'Coordinator' },
  { name: 'Dr. A. Sujin Jose',  role: 'Co-Coordinator' },
];

const TECH_GURUS = [
  { name: 'Prof. S. Vinod Kumar', role: 'Sr. Assistant Professor, EEE', email: 'vinodks@newhorizonindia.edu',            phone: '+919751015185', phoneDisplay: '+91 97510 15185', initials: 'VK', gradient: 'from-blue-600 to-cyan-700' },
  { name: 'Ms. Shwetha K',        role: 'Lab Instructor, IDEA Lab',     email: 'shweta.k_rd_nhce@newhorizonindia.edu',  phone: '+917975317238', phoneDisplay: '+91 79753 17238', initials: 'SK', gradient: 'from-rose-600 to-pink-700' },
  { name: 'Mr. Amrit Das',        role: 'Lab Instructor, IDEA Lab',     email: 'amrit.d_rd_nhce@newhorizonindia.edu',   phone: '+917008693732', phoneDisplay: '+91 70086 93732', initials: 'AD', gradient: 'from-emerald-600 to-teal-700' },
  { name: 'Mr. Thanuj Kumar',     role: 'Lab Instructor, IDEA Lab',     email: 'thanuj.kn_rd_nhce@newhorizonindia.edu', phone: '+918971884495', phoneDisplay: '+91 89718 84495', initials: 'TK', gradient: 'from-amber-600 to-orange-700' },
];

const STUDENT_AMBASSADORS = [
  { dept: 'CSE (Data Science)', names: ['Shivani M', 'Chirag R Chandragiri', 'Pratham Reddy S', 'Monish V', 'Chandru K', 'Ananya MA', 'Samarth H G Hegde', 'Swathi Pai', 'Yoshitha T', 'Mahantesh S', 'Dananjay VM', 'Kaluvayi Sai Rakshitha', 'Fredrick George F', 'Mallikarjuna Patil'] },
  { dept: 'AIML', names: ['Yazhini T S', 'M Suganth', 'Kaviya Shri P', 'R K Nithish', 'S Vinay Kumar Reddy', 'R Sai Charan', 'R Tarun Gorani', 'Rishikesh Sunil Kanchi', 'Sai Hansini K', 'Mokshada Nilesh Sonar'] },
  { dept: 'Computer Science & Engineering', names: ['Keerthi Vasan V K', 'K V Abhijna', 'K Tabitha', 'Tashi Rai'] },
  { dept: 'Information Science & Engineering', names: ['Ishita Ashit Sampat', 'G S Vetri'] },
  { dept: 'Electrical & Electronics Engineering', names: ['H S Vinayaka', 'Hemanth Kumar M'] },
  { dept: 'Mechanical Engineering', names: ['B Sriram'] },
];

const TOTAL_AMBASSADORS = STUDENT_AMBASSADORS.reduce((sum, g) => sum + g.names.length, 0);

const BENEFITS = [
  { Icon: Wrench,     title: 'Hands-On Fabrication',        desc: 'Direct access to industry-grade prototyping equipment.' },
  { Icon: Lightbulb,  title: 'Idea to Prototype',            desc: 'Turn a concept into a working model in weeks, not years.' },
  { Icon: Rocket,     title: 'Hackathon Exposure',           desc: 'Regular innovation challenges hosted through the lab.' },
  { Icon: Users,      title: 'Interdisciplinary Teams',      desc: 'Collaborate across Mechanical, EEE, CSE, AIML and ISE.' },
  { Icon: Award,      title: 'AICTE Recognition',            desc: 'Be part of a nationally recognized innovation initiative.' },
  { Icon: Handshake,  title: 'Entrepreneurial Mentorship',   desc: 'Guidance from faculty and mentors on turning ideas into ventures.' },
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function AICTEIdeaLabPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">

      <HeroSection
        image="/campus/idea_labs1.jpg"
        badge="AICTE IDEA Lab · NHCE"
        headingSmall="Where Ideas"
        headingMain="Become"
        headingGhost="Prototypes"
        description="Institutional Innovation, Design & Entrepreneurship Accelerator — a national AICTE initiative enabling hands-on learning, interdisciplinary research and technology-driven problem solving."
        button={{ label: 'Explore the Lab', href: '#about' }}
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

      {/* ── Lab Overview: Videos ── */}
      <section id="overview" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-navy-100 text-navy-700 mb-4">Lab Overview</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Explore Our Workspace,{' '}
              <span className="text-gradient bg-gradient-to-r from-navy-700 to-blue-600">Infrastructure & Environment</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 gap-6">
              {OVERVIEW_VIDEOS.map(v => (
                <div key={v.title}>
                  <div className="rounded-2xl overflow-hidden bg-navy-950 shadow-sm aspect-video">
                    <video
                      src={v.src}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mt-4">{v.title}</h3>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── About: Mission & Vision ── */}
      <section id="about" className="scroll-mt-32 py-16 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-gold-100 text-gold-700 mb-4">About the Lab</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Institutional Innovation,{' '}
              <span className="text-gradient bg-gradient-to-r from-gold-600 to-amber-600">Design & Entrepreneurship</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mb-10">
              The AICTE IDEA Lab is a national initiative enabling hands-on learning, interdisciplinary research and
              technology-driven problem solving — giving students and faculty the tools to turn concepts into
              real, working products.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimateIn variant="fade-right">
              <div className="bg-navy-950 text-white rounded-2xl p-7 h-full">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Target size={19} className="text-gold-400" />
                </div>
                <h3 className="font-bold text-lg mb-4">Mission</h3>
                <ul className="space-y-3">
                  {MISSION_POINTS.map(point => (
                    <li key={point} className="flex items-start gap-2.5 text-white/70 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
            <AnimateIn variant="fade-left">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7 h-full">
                <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center mb-4">
                  <Compass size={19} className="text-gold-400" />
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-4">Vision</h3>
                <ul className="space-y-3">
                  {VISION_POINTS.map(point => (
                    <li key={point} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy-400 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section id="facilities" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-blue-100 text-blue-700 mb-4">Core Facilities</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Industry-Grade{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-700 to-navy-700">Equipment</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FACILITIES.map(({ Icon, name, desc, image }) => (
                <div key={name} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all">
                  <div className="h-48 bg-slate-100">
                    <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <Icon size={16} className="text-navy-700 flex-shrink-0" />
                      <h3 className="font-bold text-navy-900 text-base">{name}</h3>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Activities & Programs ── */}
      <section id="activities" className="scroll-mt-32 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-emerald-100 text-emerald-700 mb-4">Activities & Programs</span>
            <h2 className="heading-md text-navy-950 mb-10">
              Learning Beyond{' '}
              <span className="text-gradient bg-gradient-to-r from-emerald-700 to-green-600">the Curriculum</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ACTIVITIES.map(({ Icon, title, desc }) => (
                <div key={title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
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

      {/* ── Gallery ── */}
      <section id="gallery" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge bg-rose-100 text-rose-700 mb-4">Gallery</span>
                <h2 className="heading-md text-navy-950">
                  Moments from{' '}
                  <span className="text-gradient bg-gradient-to-r from-rose-700 to-pink-600">the Lab</span>
                </h2>
              </div>
              <a
                href="https://newhorizoncollegeofengineering.in/aicte-idea-lab-gallery/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900 flex-shrink-0"
              >
                View Full Gallery <ExternalLink size={13} />
              </a>
            </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {GALLERY_ALBUMS.map(album => (
                <div key={album.title} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all h-56">
                  <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1 mb-2">
                      <ImageIcon size={11} className="text-white" />
                      <span className="text-white text-xs font-semibold">{album.count} photos</span>
                    </div>
                    <h3 className="text-white font-bold text-base leading-snug">{album.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Meet the Council ── */}
      <section id="council" className="scroll-mt-32 py-16 bg-slate-50 border-y border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="badge bg-violet-100 text-violet-700 mb-4">Meet the Council</span>
                <h2 className="heading-md text-navy-950">
                  The People Behind{' '}
                  <span className="text-gradient bg-gradient-to-r from-violet-700 to-indigo-600">the Lab</span>
                </h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">4</p>
                  <p className="text-slate-500 text-sm">Tech Gurus</p>
                </div>
                <div>
                  <p className="font-display font-black text-3xl text-navy-950">{TOTAL_AMBASSADORS}</p>
                  <p className="text-slate-500 text-sm">Student Ambassadors</p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Leadership */}
          <AnimateIn variant="fade-up" delay={60}>
            <div className="grid sm:grid-cols-3 gap-5 mb-10">
              {LEADERSHIP.map((p, i) => (
                <div key={p.name} className="bg-navy-950 rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                    {i === 0 ? <Crown size={22} className="text-gold-400" /> : <Users size={22} className="text-gold-400" />}
                  </div>
                  <h3 className="font-bold text-white text-base">{p.name}</h3>
                  <p className="text-gold-400 text-sm mt-1">{p.role}</p>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* Tech Gurus */}
          <AnimateIn variant="fade-up" delay={120}>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Tech Gurus</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {TECH_GURUS.map(p => (
                <div key={p.name} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-white font-display font-black text-sm shadow-sm mb-3`}>
                    {p.initials}
                  </div>
                  <h4 className="font-bold text-navy-900 text-sm leading-snug">{p.name}</h4>
                  <p className="text-slate-400 text-xs mt-0.5 mb-3">{p.role}</p>
                  <div className="flex items-center gap-2">
                    <a href={`mailto:${p.email}`} aria-label={`Email ${p.name}`}
                      className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-navy-700 hover:border-navy-300 transition-colors">
                      <Mail size={13} />
                    </a>
                    <a href={`tel:${p.phone}`} aria-label={`Call ${p.name}`}
                      className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-navy-700 hover:border-navy-300 transition-colors">
                      <Phone size={13} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* Student Ambassadors */}
          <AnimateIn variant="fade-up" delay={150}>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Student Ambassadors</p>
              <span className="text-xs font-bold text-violet-700 bg-violet-100 rounded-full px-2.5 py-0.5">{TOTAL_AMBASSADORS} across {STUDENT_AMBASSADORS.length} departments</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-5">
              {STUDENT_AMBASSADORS.map(group => (
                <div key={group.dept} className="bg-white border border-slate-100 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-navy-800 text-sm font-bold">{group.dept}</p>
                    <span className="text-xs font-semibold text-slate-400">{group.names.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.names.map(name => (
                      <span key={name} className="bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-medium text-slate-600">
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Student Benefits ── */}
      <section id="benefits" className="scroll-mt-32 py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <span className="badge bg-amber-100 text-amber-700 mb-4">Student Benefits</span>
            <h2 className="heading-md text-navy-950 mb-10">
              What You{' '}
              <span className="text-gradient bg-gradient-to-r from-amber-600 to-orange-600">Gain</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map(({ Icon, title, desc }) => (
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
              <Sparkles className="mx-auto text-gold-400 mb-4" size={28} />
              <h2 className="heading-md text-white mb-4">Have an Idea? Bring It to Life.</h2>
              <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
                Reach out to the IDEA Lab Council or explore admissions to start building at NHCE.
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
