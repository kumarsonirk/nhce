import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Award, BookOpen, Users, Zap, Building2, MessageSquare, ChevronUp, Globe } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ─────────────────────────────────────────────────── */

const LEADERS = [
  {
    name: 'Dr. Manjunatha',
    qualifications: 'Ph.D',
    roles: ['Principal, NHCE'],
    role: 'Principal',
    image: '/principal.jpg',
    color: 'from-navy-800 to-navy-950',
    desc: [
      'At NHCE, we believe education is not merely the transfer of knowledge — it is the ignition of potential. Every programme, every faculty appointment, and every initiative is guided by one singular purpose: to equip students to lead in an ever-evolving world.',
      'Our autonomous status gives us the academic freedom to innovate in curriculum design, integrate cutting-edge research, and build meaningful industry partnerships that translate directly into student success.',
    ],
    quote: 'Education should inspire innovation, critical thinking and the courage to lead.',
  },
  {
    name: 'Dr. Anandhi R J',
    qualifications: 'Ph.D',
    roles: ['Dean – Academics, NHCE'],
    role: 'Dean – Academics',
    image: '/anandhi_dean.jpg',
    color: 'from-blue-700 to-blue-900',
    desc: [
      'Academic excellence at NHCE is a living commitment — embedded in every curriculum, every lab, and every interaction between faculty and students.',
      'Our academic framework is designed to challenge students intellectually while nurturing their creativity, critical thinking and ethical reasoning for the demands of modern industry.',
    ],
    quote: 'A great institution is built one curious student at a time.',
  },
  {
    name: 'Dr. Revathi',
    qualifications: 'Ph.D',
    roles: ['Dean – Research & Development'],
    role: 'Research & Innovation',
    image: '/revathi_dean.jpg',
    color: 'from-indigo-700 to-indigo-900',
    desc: [
      'Research and innovation are the engines of progress. At NHCE we have built an ecosystem where faculty and students collaborate on projects that matter — from patent filings to industry-sponsored research.',
      'With 463+ patents and 3880+ publications, our research output speaks to the depth of intellectual activity across every department.',
    ],
    quote: 'Innovation happens when curiosity meets opportunity.',
  },
  {
    name: 'Dr. Babita',
    qualifications: 'M.Tech',
    roles: ['Controller of Examinations'],
    role: 'Academic Administration',
    image: '/babita_dean.jpg',
    color: 'from-violet-700 to-violet-900',
    desc: [
      'Academic integrity and transparent evaluation are the cornerstones of student trust. Our examination system is designed to be fair, rigorous and reflective of real-world competence.',
      'We continuously refine our evaluation frameworks to align with VTU regulations while maintaining the highest standards of academic governance.',
    ],
    quote: 'Integrity in assessment builds integrity in character.',
  },
];

const PRESIDENT = {
  name: 'Mr. Dhermesh Manghnani',
  role: 'President',
  image: '/president.png',
  desc: [
    'At New Horizon, we believe in nurturing young minds to follow their passions, realise their potential, and dream big beyond horizons. Our vision is to cultivate graduates who emerge as leaders, innovators, and creators of opportunity — individuals who will shape the future with courage, imagination, and purpose.',
    'We are committed to fostering a culture of exploration and creation, where students are encouraged to venture beyond the classroom and immerse themselves in real-world experiences. From Engineering to Management and Applied Sciences, we provide a rich canvas for students to discover their strengths and develop skills that will last a lifetime.',
    'By promoting innovation, entrepreneurship, and experiential learning, we aim to ignite curiosity and a spirit of problem-solving. At New Horizon, we do more than educate — we inspire, empower, and transform students into confident thinkers and leaders of tomorrow.',
  ],
};

const CHAIRMAN = {
  name: 'Dr. Mohan Manghnani',
  role: 'Chairman',
  image: '/chairman_sir.jpg',
  desc: [
    'Dr. Mohan Manghnani, our revered Chairman, is far more than the esteemed founder of New Horizon Educational Institutions—he is, in every sense, the soul, spirit, and heartbeat of its enduring legacy. A towering luminary in the realm of Indian education, Dr. Mohan Manghnani is an extraordinary blend of visionary educationist, philanthropist, and a dynamic thought leader, whose transformative leadership has not only shaped our institutions but redefined the very landscape of modern learning in India.',
    'As the Chairman of New Horizon Educational Institution and Managing Trustee of both the New Horizon Educational and Cultural Trust and the New Horizon Education, and Agricultural Research Trust, Dr. Mohan Manghnani presides over one of the nation’s most forward-thinking and widely respected educational groups.',
  ],
};

const VALUES = [
  { icon: Award,     title: 'Academic Excellence', desc: 'Quality education aligned with global standards and industry expectations.'        },
  { icon: Zap,       title: 'Innovation',          desc: 'Research, patents and an entrepreneurship culture that drives discovery.'           },
  { icon: Users,     title: 'Student Success',     desc: 'Holistic development, mentorship and career readiness at every step.'              },
  { icon: Building2, title: 'Industry Connect',    desc: 'Strong MOU partnerships, internships and experiential learning opportunities.'     },
  { icon: BookOpen,  title: 'Academic Freedom',    desc: 'Autonomous status allowing curriculum innovation and interdisciplinary programmes.' },
];

const IMPACT = [
  { value: '3880+', label: 'Publications'      },
  { value: '124+',  label: 'Patents Filed'      },
  { value: '273+',  label: 'Active Researchers' },
  { value: '100+',  label: 'Industry Partners'  },
];

/* ─── Interactive Leader Spotlight ─────────────────────────── */

function LeaderSpotlight() {
  const [selected, setSelected] = useState(0);
  const leader = LEADERS[selected];
  const cardRef = useRef<HTMLDivElement>(null);

  function handleSelect(idx: number) {
    setSelected(idx);
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="team" className=" py-16">
      <div className="container-wide">

        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-navy-900 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} className="text-gold-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Leadership</p>
            <h2 className="font-display font-bold text-navy-950 text-xl sm:text-2xl">Messages from Our Leaders</h2>
          </div>
        </div>

        {/* Message box card — rounded top, flat bottom so it sits on the strip */}
        <div ref={cardRef} className="rounded-3xl overflow-hidden" style={{ scrollMarginTop: '96px' }}>
          <div className="grid lg:grid-cols-[35%_65%]" style={{ minHeight: '400px' }}>

            {/* Left: photo */}
            <div
              key={`img-${selected}`}
              className="relative min-h-[400px] lg:min-h-0 overflow-hidden"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-full object-cover object-top absolute inset-0 animate-[zoomFade_0.55s_ease-out_both]"
              />
            </div>

            {/* Right: message content */}
            <div
              key={`content-${selected}`}
              className="bg-navy-950 p-8 sm:p-12 lg:p-12 flex flex-col justify-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 mb-5 w-fit animate-[slideUpFade_0.45s_ease-out_both]">
                <MessageSquare size={12} className="text-gold-400" />
                <span className="text-white/60 text-sm font-medium tracking-wide">Message</span>
              </div>

              <h2
                className="text-white font-bold text-2xl sm:text-4xl leading-tight mb-1 animate-[slideUpFade_0.45s_ease-out_both]"
                style={{ animationDelay: '0.06s' }}
              >
                {leader.name}
              </h2>

              <div className="animate-[slideUpFade_0.45s_ease-out_both]" style={{ animationDelay: '0.12s' }}>
                {/* <p className="text-gold-400 text-sm font-semibold mb-0.5">{leader.qualifications}</p> */}
                {leader.roles.map(r => (
                  <p key={r} className="text-gold-400 text-base font-semibold">{r}</p>
                ))}
              </div>

              <div
                className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-white/75 text-base sm:text-lg leading-relaxed animate-[slideUpFade_0.45s_ease-out_both]"
                style={{ animationDelay: '0.2s' }}
              >
                {leader.desc.map((d, i) => <p key={i}>{d}</p>)}
              </div>

              {leader.quote && (
                <div
                  className="mt-5 pl-4 border-l-2 border-gold-500 animate-[slideUpFade_0.45s_ease-out_both]"
                  style={{ animationDelay: '0.28s' }}
                >
                  <p className="text-white/55 italic text-base leading-relaxed">"{leader.quote}"</p>
                  <p className="text-gold-500 text-sm mt-1.5">— {leader.name}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Thumbnail strip — all 4, active gets ChevronUp pointing into the card above */}
        <div className="flex justify-center gap-2 sm:gap-6 py-5 px-4">
          {LEADERS.map((l, idx) => {
            const isActive = selected === idx;
            return (
              <button
                key={l.name}
                onClick={() => handleSelect(idx)}
                className={`relative flex flex-col items-center gap-2 px-2 sm:px-3 py-3 rounded-2xl transition-all duration-200 cursor-pointer group ${
                  isActive ? 'bg-white/60' : 'hover:bg-sky-200/60'
                }`}
              >
                {/* Chevron arrow pointing UP into the message box */}
                <div className={`absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <ChevronUp size={20} className="text-navy-900" strokeWidth={2.5} />
                </div>

                <div className={`w-14 h-18 sm:w-44 sm:h-56 rounded-xl overflow-hidden shadow-sm transition-all duration-200 ${isActive ? 'ring-2 ring-gold-400 scale-105' : 'ring-1 ring-transparent group-hover:ring-sky-300'}`}
                >
                  <img src={l.image} alt={l.name} className="w-full h-full object-cover object-top" />
                </div>

                <div className="text-center w-14 sm:w-44">
                  <p className={`text-sm font-bold leading-snug transition-colors ${isActive ? 'text-navy-900' : 'text-slate-500 group-hover:text-navy-700'}`}>
                    {l.name}
                  </p>
                  <p className={`text-sm mt-0.5 leading-snug transition-colors ${isActive ? 'text-gold-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {l.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */

export default function LeadershipPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out]">

      <HeroSection
        image="/hero13.jpg"
        badge="Leadership & Governance · NHCE"
        headingSmall="Guiding NHCE"
        headingMain="With Vision"
        headingGhost="& Excellence"
        description="Meet the dedicated leaders driving academic excellence, research innovation and holistic student development at New Horizon College of Engineering."
        button={{
          label: 'Meet Our Leaders',
          href: '#team',
          onClick: e => { e?.preventDefault(); document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
        }}
      />

         {/* ── Chairman's Message ── */}
      <div className="bg-white">
        <div className="container-wide py-16">
          <div className="grid lg:grid-cols-[40%_60%] gap-12 items-start">

            {/* Left: photo + name card */}
            <AnimateIn variant="fade-right">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <img
                  src={CHAIRMAN.image}
                  alt={CHAIRMAN.name}
                  className="w-full h-full object-cover object-top"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
               <div className="mt-5">
                <h3 className="font-bold text-navy-950 text-xl">{CHAIRMAN.name}</h3>
                <p className="text-gold-600 font-semibold text-base mt-1">{CHAIRMAN.role}</p>
              </div>
            </div>
            </AnimateIn>

            {/* Right: message content */}
            <AnimateIn variant="fade-left" delay={120}>
            <div className="lg:pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-navy-900 rounded-full" />
                <p className="font-bold text-navy-900 text-lg uppercase tracking-wide">Chairman's Message</p>
              </div>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                {CHAIRMAN.desc.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="mt-8">
                <a
                  href="https://newhorizonindia.edu/dr-mohan-manghnani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-navy-900 text-navy-900 font-semibold rounded-full hover:bg-navy-900 hover:text-white transition-all duration-300 text-sm group"
                >
                  Know More
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
             
            </div>
            </AnimateIn>

          </div>
        </div>
      </div>

      {/* ── President's Message ── */}
      <div className="bg-white">
        <div className="container-wide py-16">
          <div className="grid lg:grid-cols-[60%_40%] gap-12 items-start">

            {/* President photo + name card (First in DOM so it displays first on mobile, lg:order-2 to display on right on desktop) */}
            <AnimateIn variant="fade-right" className="lg:order-2">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                <img
                  src={PRESIDENT.image}
                  alt={PRESIDENT.name}
                  className="w-full h-full object-cover object-top"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div className="mt-5">
                <h3 className="font-bold text-navy-950 text-xl">{PRESIDENT.name}</h3>
                <p className="text-gold-600 font-semibold text-base mt-1">{PRESIDENT.role}</p>
              </div>
            </div>
            </AnimateIn>

            {/* President message text (Second in DOM so it displays second on mobile, lg:order-1 to display on left on desktop) */}
            <AnimateIn variant="fade-left" delay={120} className="lg:order-1">
            <div className="lg:pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-navy-900 rounded-full" />
                <p className="font-bold text-navy-900 text-lg uppercase tracking-wide">President's Message</p>
              </div>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                {PRESIDENT.desc.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              
            </div>
            </AnimateIn>

          </div>
        </div>
      </div>

      {/* ── Interactive Leader Spotlight ── */}
      <LeaderSpotlight />

      {/* ── Leadership Philosophy ── */}
      <div className="bg-white">
        <div className="container-wide py-16">
          <AnimateIn variant="fade-up">
          <div className="text-center mb-12">
            <span className="badge bg-blue-50 text-blue-700 mb-3 inline-flex">Our Vision</span>
            <h2 className="heading-md text-navy-950 mt-2">Leadership Philosophy</h2>
            <p className="text-slate-500 text-lg mt-3 max-w-lg mx-auto">
              The principles that guide every decision at New Horizon College of Engineering.
            </p>
          </div>
          </AnimateIn>
          <AnimateIn variant="fade-up" delay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {VALUES.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-2xl bg-navy-900 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-gold-400" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-base mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-white py-16 relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-400/25 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-gold-400/25 rounded-full blur-3xl -z-10" />

        <div className="container-wide">
          <AnimateIn variant="scale">
          <div className="bg-navy-950 rounded-3xl p-10 sm:p-16 text-center">
            <h2 className="heading-md text-white mb-4">Connect With NHCE Leadership</h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto mb-8">
              Reach out to our leadership team for academic, administrative and institutional enquiries.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/admissions" className="btn-gold">Apply Now 2026–27 <ChevronRight size={14} /></Link>
              <a href="tel:+918028453197" className="btn-outline">Call +91-80-2845 3197</a>
            </div>
          </div>
          </AnimateIn>
        </div>
      </div>

    </div>
  );
}
