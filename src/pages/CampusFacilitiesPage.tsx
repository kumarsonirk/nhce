import { useEffect, useState } from 'react';
import {
  ChevronDown, Building2, Utensils, Home, Bus,
  Wifi, BookOpen, Dumbbell, Mic2, FlaskConical, Shield,
  Clock, MapPin, Users, Zap, Heart, ArrowRight, X,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const QUICK_NAV = [
  { id: 'infrastructure', label: 'Infrastructure', icon: Building2, sub: 'Labs, halls & sports' },
  { id: 'cafeterias',     label: 'Cafeterias',     icon: Utensils,  sub: '5+ dining options'   },
  { id: 'hostels',        label: 'Hostels',         icon: Home,      sub: '5 residential blocks' },
  { id: 'transport',      label: 'Transport',       icon: Bus,       sub: 'City-wide bus network' },
];

const INFRA_FEATURES = [
  { icon: Zap,          label: 'Smart Classrooms',   desc: 'Spacious, well-ventilated lecture halls with AV media technology and flexible seating arrangements.',        image: '/campus/classroom.jpg'    },
  { icon: FlaskConical, label: 'Computing Labs',     desc: 'IBM OpenPower systems, 3D printing setups and specialised computing infrastructure across departments.',     image: '/campus/computer_lab.jpg'  },
  { icon: Mic2,         label: 'Auditorium',         desc: 'A 700-seat auditorium with professional acoustics, stage lighting and two-way video conferencing.',          image: '/campus/auditorium.jpg'    },
  { icon: Users,        label: 'Seminar Halls',      desc: 'Dedicated halls for guest lectures, industry sessions and academic conferences with live recording.',        image: '/campus/classroom2.jpg'    },
  { icon: BookOpen,     label: 'Library & ILC',      desc: 'Over 40,000 volumes, e-journals, digital resources and a quiet reading environment open six days a week.',  image: '/campus/library.webp'      },
  { icon: Dumbbell,     label: 'Sports Complex',     desc: 'Synthetic athletics track, basketball courts, indoor courts and four separate fitness gyms on campus.',     image: '/campus/basketball.jpg'    },
  { icon: Wifi,         label: 'Wi-Fi Campus',       desc: 'Blanket connectivity across classrooms, labs, common areas and hostel blocks — no dead zones.',              image: '/campus/nvidia.webp'       },
  { icon: Zap,          label: 'Innovation Hub',     desc: 'NVIDIA-certified research lab, startup incubation spaces and an entrepreneurship cell for student founders.', image: '/campus/idea_labs.jpg'    },
];

const INFRA_STATS = [
  { num: '700+', label: 'Seat Auditorium' },
  { num: '4',    label: 'Fitness Gyms'    },
  { num: '24/7', label: 'Wi-Fi Coverage'  },
  { num: '1',    label: 'Medical Centre'  },
];

const CAFETERIAS = [
  { name: 'Students Mess',   type: 'Main Dining',        desc: 'Breakfast, lunch and dinner with rotating menus — the heartbeat of campus dining, open from early morning.' },
  { name: 'Tango Cafeteria', type: 'All-Day Café',       desc: 'One of the most visited spots on campus. Snacks, full meals and drinks through college hours.'              },
  { name: 'Nescafe',         type: 'Beverages',          desc: 'Hot coffee and light bites — a quick recharge between back-to-back lectures or late lab sessions.'           },
  { name: 'Munch Canteen',   type: 'Quick Bites',        desc: 'Student-priced meals and snacks served fast. Reliable, no-fuss eating for a busy campus day.'               },
  { name: 'Udupi Canteen',   type: 'South Indian',       desc: 'Freshly made idli, dosa and vada every morning — the go-to for students who want a proper hot breakfast.'   },
  { name: 'Hostel Canteens', type: 'Residential Dining', desc: 'Separate canteens within boys\'  and girls\' hostels, open from early morning till late evening.'           },
];

const CAFETERIA_HIGHLIGHTS = [
  'Fresh, daily preparation', 'Seating for 500+ students', 'Affordable student pricing', 'South Indian · Snacks · Beverages',
];

const BOYS_BLOCKS = ['Sir M. Visvesvaraya Block', 'Shahid Bhagat Singh Block', 'NHVM Hostel'];
const GIRLS_BLOCKS = ['Jhansi ki Rani Block', 'Rani Chenamma Block'];

const HOSTEL_AMENITIES = [
  { icon: Shield,   label: '24/7 Security'  },
  { icon: Zap,      label: 'Power Backup'   },
  { icon: BookOpen, label: 'Study Rooms'    },
  { icon: Dumbbell, label: 'Gymnasium'      },
  { icon: Heart,    label: 'Medical Care'   },
  { icon: Users,    label: 'Common Rooms'   },
];

const TRANSPORT_FEATURES = [
  { icon: Clock,   label: 'Punctual',       sub: 'Scheduled pickup and drop, every working day'  },
  { icon: Shield,  label: 'Safe',           sub: 'Licensed drivers, well-maintained fleet'        },
  { icon: MapPin,  label: 'City Coverage',  sub: 'All major zones across Bengaluru'              },
  { icon: Users,   label: 'Capped Seats',   sub: 'No overloading — limited seats per route'      },
];


const GALLERY_IMAGES = [
  '/campus/classroom2.jpg',
  '/campus/classroom4.jpg',
  '/campus/computer_lab.jpg',
  '/campus/library1.webp',
  '/campus/idea_labs1.jpg',
  '/campus/auditorium.jpg',
  '/campus/sport1.jpg',
  '/campus/sport2.jpg',
  '/campus/canteen1.jpg',
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function CampusFacilitiesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightbox]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} className="text-white" />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {/* ── Hero ── */}
      <HeroSection
        image="/campus-hero.jpg"
        badge="World-Class Infrastructure · NHCE"
        headingSmall="Campus Life"
        headingMain="Experience"
        headingGhost="NHCE Campus"
        description="IBM-powered labs, a 700-seat auditorium, five dining spots, separate hostels and a bus fleet that covers all of Bengaluru — built for students who mean business."
        button={{ label: 'Explore Campus', onClick: () => scrollTo('infrastructure') }}
        secondaryButton={{ label: 'Virtual Tour', href: 'https://newhorizoncollegeofengineering.in/infrastructure/' }}
      />

      {/* ── Quick Navigation ── */}
      <div className="bg-navy-950 py-5">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {QUICK_NAV.map(({ id, label, icon: Icon, sub }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/30 rounded-2xl px-4 py-4 text-left transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/20 transition-colors">
                  <Icon size={18} className="text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-base leading-tight">{label}</p>
                  <p className="text-white/40 text-sm mt-0.5 truncate">{sub}</p>
                </div>
                <ChevronDown size={13} className="text-white/20 flex-shrink-0 group-hover:text-gold-400 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Infrastructure ── */}
      <div id="infrastructure" className="bg-white">
        <div className="container-wide py-16">

          <AnimateIn variant="fade-up">
          <span className="badge bg-blue-100 text-blue-700 mb-5">Infrastructure</span>
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
            <div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-950 leading-tight mb-4">
                Built Around<br />
                <span className="text-blue-600">How You Learn</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Right on Bengaluru's IT corridor near Marathahalli — Intel, Accenture, Wipro and Cisco are neighbours. The campus itself reflects that proximity: NVIDIA-certified research labs, IBM-equipped computing rooms, and enough sports infrastructure to keep everyone moving.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {INFRA_STATS.map(s => (
                <div key={s.label} className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-5 text-center">
                  <p className="font-black text-3xl text-navy-950">{s.num}</p>
                  <p className="text-slate-500 text-sm font-medium mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          </AnimateIn>

          {/* Features grid — image + text combined */}
          <AnimateIn variant="fade-up" delay={100}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INFRA_FEATURES.map(f => (
              <div key={f.label} className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group cursor-default">
                <div className="h-40 overflow-hidden">
                  <img src={f.image} alt={f.label} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="px-4 py-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <f.icon size={13} className="text-blue-500 flex-shrink-0" />
                    <p className="font-bold text-base text-navy-900">{f.label}</p>
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Cafeterias ── */}
      <div id="cafeterias" className="bg-amber-50 border-t border-amber-100">
        <div className="container-wide py-16">

          <AnimateIn variant="fade-up">
          <span className="badge bg-amber-100 text-amber-700 mb-5">Dining & Cafeterias</span>
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
            <AnimateIn variant="fade-right">
            <div>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-950 leading-tight mb-4">
                Five Places<br />
                <span className="text-amber-600">to Eat on Campus</span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                From the main Students Mess to the Udupi Canteen's morning dosas — NHCE has enough dining options that you never eat the same meal twice in a week.
              </p>
            </div>
            </AnimateIn>
            <AnimateIn variant="fade-left" delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {CAFETERIA_HIGHLIGHTS.map(h => (
                <div key={h} className="bg-white border border-amber-100 rounded-2xl px-4 py-3.5 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                  <p className="text-xs font-semibold text-navy-900">{h}</p>
                </div>
              ))}
            </div>
            </AnimateIn>
          </div>
          </AnimateIn>

          {/* Canteen photos */}
          <AnimateIn variant="fade-up" delay={80}>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {['/campus/canteen.jpeg', '/campus/canteen1.jpg', '/campus/canteen2.jpg'].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden h-64">
                <img src={img} alt="" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
          <blockquote className="border-l-4 border-amber-400 pl-5 py-1 mb-10">
            <p className="text-slate-600 text-lg italic leading-relaxed">
              "The whole ambiance of the cafeterias is so soothing and delightful that it tempts you to come here again and again."
            </p>
            <cite className="text-sm text-slate-400 not-italic mt-2 block">— NHCE Campus Guide</cite>
          </blockquote>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={80}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAFETERIAS.map(c => (
              <div key={c.name} className="bg-white border border-amber-100 rounded-2xl p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                    <Utensils size={16} className="text-amber-500" />
                  </div>
                  <span className="text-sm font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full">{c.type}</span>
                </div>
                <h3 className="font-bold text-navy-900 mb-1.5">{c.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          </AnimateIn>
        </div>
      </div>

      {/* ── Hostels ── */}
      <div id="hostels" className="bg-white border-t border-slate-100">
        <div className="container-wide py-16">

          {/* Header — 2-col so description sits beside heading */}
          <AnimateIn variant="fade-up">
          <span className="badge bg-indigo-100 text-indigo-700 mb-5">Hostel Facilities</span>
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-10">
            <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-950 leading-tight">
              Five Blocks,<br />
              <span className="text-indigo-600">One Community</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed">
              Unlike many institutions, NHCE's dormitories are built as spaces to study, relax and socialise — not just sleep. Separate blocks for boys and girls, each with a senior faculty member who acts as warden, friend and guide.
            </p>
          </div>
          </AnimateIn>

          {/* Main layout: image left, boys + girls stacked right */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-4 mb-4">

            {/* Image card */}
            <div className="relative rounded-3xl overflow-hidden min-h-[420px]">
              <img src="/campus/hostel.jpeg" alt="NHCE Hostel" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-bold text-xl leading-tight">On-Campus Living</p>
                <p className="text-white/60 text-base mt-1">5 blocks · boys & girls · within campus</p>
              </div>
            </div>

            {/* Boys + Girls stacked */}
            <div className="flex flex-col gap-4">

              {/* Boys */}
              <div className="bg-navy-950 rounded-2xl p-6 flex-1">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Boys Hostel</p>
                    <p className="text-white font-bold text-lg leading-tight">3 Residential Blocks</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Home size={16} className="text-gold-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  {BOYS_BLOCKS.map(b => (
                    <div key={b} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                      <p className="text-white text-base font-medium">{b}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/25 text-sm mt-4">Furnished rooms · Attached bathrooms · 24-hr power backup</p>
              </div>

              {/* Girls */}
              <div className="bg-rose-700 rounded-2xl p-6 flex-1">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Girls Hostel</p>
                    <p className="text-white font-bold text-lg leading-tight">2 Residential Blocks</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <Home size={16} className="text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  {GIRLS_BLOCKS.map(b => (
                    <div key={b} className="bg-white/10 border border-white/10 rounded-xl px-4 py-2.5">
                      <p className="text-white text-base font-medium">{b}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/50 text-sm mt-4">Furnished rooms · Attached bathrooms · 24-hr power backup</p>
              </div>

            </div>
          </div>

          {/* Shared amenities — inline strip */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">All blocks include</p>
            <div className="w-px h-4 bg-slate-200 hidden sm:block" />
            {HOSTEL_AMENITIES.map(a => (
              <div key={a.label} className="flex items-center gap-2">
                <a.icon size={14} className="text-indigo-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-navy-900">{a.label}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Transport ── */}
      <div id="transport" className="bg-sky-50">
        <div className="container-wide py-16">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Content */}
            <div>
              <span className="badge bg-slate-100 text-slate-600 mb-5">Transport</span>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-navy-950 leading-tight mb-4">
                NHCE Runs<br />
                <span className="text-blue-600">Its Own Buses</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                The college runs its own fleet across Bengaluru — fixed routes, capped seats, scheduled timings. No depending on autos or cabs to make it to an 8 a.m. lecture.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {TRANSPORT_FEATURES.map(t => (
                  <div key={t.label} className="flex items-center gap-3 p-4 border border-slate-200 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <t.icon size={15} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-navy-900 text-base">{t.label}</p>
                      <p className="text-slate-400 text-sm mt-0.5 leading-snug">{t.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://newhorizoncollegeofengineering.in/transport/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center gap-2"
                >
                  Route Maps <ArrowRight size={14} />
                </a>
                <a
                  href="tel:+919880534935"
                  className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-base font-semibold px-5 py-2.5 rounded-full transition-all"
                >
                  +91-98805 34935
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-3xl overflow-hidden h-[400px]">
              <img
                src="/campus/transport.jpg"
                alt="NHCE Bus Fleet"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── Campus Gallery ── */}
      <div className="bg-white py-16">
        <div className="container-wide mb-10">
          <span className="badge bg-slate-100 text-slate-600 mb-4">Campus Gallery</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950">The Campus, in Pictures</h2>
        </div>

        {/* Infinite scroll slider — pauses on hover */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4"
            style={{ animation: 'galleryScroll 30s linear infinite' }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'; }}
          >
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 h-52 rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
