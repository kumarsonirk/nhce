import { useEffect, useState } from 'react';
import {
  Building2, GraduationCap, Cpu, Users,
  Landmark, FileText, BarChart2, Briefcase, UserCheck, UserPlus, BookOpen,
  FlaskConical, Award, ClipboardList, Atom, Calculator, Brain, Database,
  Code2, Terminal, BarChart3, Zap, Radio, Settings, Monitor, TrendingUp,
  Building, Package, Power, ShieldCheck, Server, Truck,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Types ─────────────────────────────────────────────── */

interface Executive {
  name: string;
  designation: string;
  dept: string;
  icon: React.ElementType;
}

interface Group {
  id: string;
  num: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  chipBg: string;
  chipText: string;
  dotCls: string;
  members: Executive[];
}

/* ─── Data ─────────────────────────────────────────────── */

const GROUPS: Group[] = [
  {
    id: 'administration',
    num: '01',
    label: 'Administration & Management',
    subtitle: 'Senior leadership steering strategy, operations and institutional growth',
    icon: Building2,
    gradient: 'from-navy-800 to-navy-950',
    chipBg: 'bg-navy-50',
    chipText: 'text-navy-700',
    dotCls: 'bg-navy-700',
    members: [
      { name: 'Dr. Manjunatha',          icon: Landmark,    designation: 'Principal',                        dept: 'Administration'               },
      { name: 'Mr. Surya Prakash H N',   icon: FileText,    designation: 'Registrar',                        dept: 'Administration'               },
      { name: 'Ms. Malathi Madhusudan',  icon: BarChart2,   designation: 'Sr. Executive Director',           dept: 'Accounts & Finance'           },
      { name: 'Mr. Pradeep Kote',        icon: Briefcase,   designation: 'Sr. Director',                     dept: 'Career Development Centre'    },
      { name: 'Ms. Manjula V',           icon: UserCheck,   designation: 'Executive Director',               dept: 'Human Resources'              },
      { name: 'Ms. Aruna Machani',       icon: UserPlus,    designation: 'Executive Director',               dept: 'Admissions'                   },
      { name: 'Dr. Anitha Suresh Rai',   icon: BookOpen,    designation: 'Director – Library & Alumni',      dept: 'Library & Information Center' },
    ],
  },
  {
    id: 'academic',
    num: '02',
    label: 'Academic Leadership',
    subtitle: 'Deans and senior academic officers driving educational excellence',
    icon: GraduationCap,
    gradient: 'from-blue-700 to-indigo-900',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    dotCls: 'bg-blue-600',
    members: [
      { name: 'Dr. Anandhi R J',         icon: GraduationCap,  designation: 'Dean',                         dept: 'Academics'                        },
      { name: 'Dr. Revathi V',            icon: FlaskConical,   designation: 'Dean',                         dept: 'Research & Development'           },
      { name: 'Dr. Babita Jain',          icon: Award,          designation: 'Dean – IQAC',                  dept: 'Internal Quality Assurance Cell'  },
      { name: 'Dr. Vijilius Helena Raj',  icon: ClipboardList,  designation: 'Controller of Examinations',   dept: 'Examinations'                     },
    ],
  },
  {
    id: 'departments',
    num: '03',
    label: 'Heads of Departments',
    subtitle: 'Faculty leaders overseeing academic programmes across engineering and management',
    icon: Cpu,
    gradient: 'from-violet-700 to-purple-900',
    chipBg: 'bg-violet-50',
    chipText: 'text-violet-700',
    dotCls: 'bg-violet-600',
    members: [
      { name: 'Dr. Anusuya Devi V S',      icon: Atom,         designation: 'Head of Department', dept: 'Applied Sciences'                        },
      { name: 'Dr. Srinivasa G.',           icon: Calculator,   designation: 'Head of Department', dept: 'Applied Sciences (Mathematics)'          },
      { name: 'Dr. Uma Reddy N V',          icon: Brain,        designation: 'Head of Department', dept: 'AI & Machine Learning'                   },
      { name: 'Dr. B Rajalakshmi',          icon: Code2,        designation: 'Head of Department', dept: 'Computer Science & Engineering'          },
      { name: 'Dr. Asha Joseph',            icon: Terminal,     designation: 'Head of Department', dept: 'Computer Science & Engineering'          },
      { name: 'Dr. Basawaraju Swathi',      icon: BarChart3,    designation: 'Head of Department', dept: 'CSE – Data Science'                      },
      { name: 'Dr. Rakesh Chandrashekhar',  icon: Settings,     designation: 'Head of Department', dept: 'Mechanical Engineering'                  },
      { name: 'Dr. Asha V',                 icon: Monitor,      designation: 'Head of Department', dept: 'Master of Computer Applications'         },
      { name: 'Dr. Sujitha S',              icon: Zap,          designation: 'Head of Department', dept: 'Electrical & Electronics Engineering'    },
      { name: 'Dr. Aravinda Koithyar',      icon: Radio,        designation: 'Head of Department', dept: 'Electronics & Communication Engineering' },
      { name: 'Dr. Rose Kavitha',           icon: TrendingUp,   designation: 'Head of Department', dept: 'Master of Business Administration'       },
      { name: 'Dr. Vandana C P',            icon: Database,     designation: 'Head of Department', dept: 'Information Science & Engineering'       },
    ],
  },
  {
    id: 'operations',
    num: '04',
    label: 'Operations & Support',
    subtitle: 'Professionals ensuring seamless campus infrastructure and services',
    icon: Users,
    gradient: 'from-emerald-700 to-teal-900',
    chipBg: 'bg-emerald-50',
    chipText: 'text-emerald-700',
    dotCls: 'bg-emerald-600',
    members: [
      { name: 'Mr. Lakshminarayan D V Rao', icon: Building,     designation: 'Director of Program Management', dept: 'Construction'       },
      { name: 'Mr. Umesh Ramchandani',       icon: Package,      designation: 'Director',                       dept: 'Procurements'       },
      { name: 'Mr. Karthikeyan',             icon: Power,        designation: 'Chief Electrical Manager',        dept: 'Electrical'         },
      { name: 'Mr. Praveen Kumar K',         icon: ShieldCheck,  designation: 'Chief Security Officer',          dept: 'Security'           },
      { name: 'Mr. Krishna Prakash T K',     icon: Server,       designation: 'Head – Systems',                  dept: 'Systems & Networks' },
      { name: 'Mr. Velu',                    icon: Truck,        designation: 'Manager',                         dept: 'Transport'          },
    ],
  },
];

const STATS = [
  { value: '29', label: 'Key Executives'   },
  { value: '12', label: 'Department Heads' },
  { value: '4',  label: 'Academic Deans'   },
  { value: '4',  label: 'Senior Directors' },
];

/* ─── Executive Card ─────────────────────────────────────── */

function ExecutiveCard({
  exec, chipBg, chipText,
}: { exec: Executive; chipBg: string; chipText: string }) {
  const Icon = exec.icon;
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_1px_4px_rgba(0,0,0,0.03),0_6px_18px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.07),0_20px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 group">

      <div className="px-5 py-5 flex flex-col items-center text-center">
        <p className="font-display font-bold text-navy-950 text-[20px] lg:text-[16px] leading-tight mb-0.5 group-hover:text-navy-700 transition-colors duration-200">
          {exec.name}
        </p>
        <p className="text-slate-600 text-[18px] lg:text-[15px] font-medium py-2 leading-snug">
          {exec.designation}
        </p>
        <span className={`inline-flex items-center gap-1.5 text-[18px] lg:text-[14px] font-bold px-2.5 py-1.5 rounded-full ${chipBg} ${chipText}`}>
          {/* <Icon size={11} strokeWidth={2} /> */}
          {exec.dept}
        </span>
      </div>

    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */

export default function KeyExecutivesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openGroup, setOpenGroup] = useState<string>(GROUPS[0].id);

  return (
    <div className="min-h-screen bg-white animate-[fadeIn_0.4s_ease-out]">

      {/* ── Hero ── */}
      <HeroSection
        image="/admission_cover.jpg"
        imageWidth="w-[50%]"
        gradientWidth="w-3/4"
        contentMaxWidth="lg:max-w-[50%]"
        badge="Leadership · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="Key Executives"
        headingGhost="Leadership Team"
        description="Meet the experienced leaders, administrators and department heads who shape the vision and day-to-day excellence of NHCE."
        button={{ label: 'Our Leadership', to: '/leadership' }}
        secondaryButton={{ label: 'Contact Us', to: '/contact' }}
      />

      {/* ── Stats ── */}
      <div className="bg-white border-y border-slate-100">
        <div className="container-wide">
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            {STATS.map((s, i) => (
              <AnimateIn key={s.label} variant="fade-up" delay={i * 60}>
                <div className="py-6 px-2 sm:py-10 sm:px-10 text-center">
                  <p className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-navy-900 leading-none">{s.value}</p>
                  <div className="w-6 sm:w-8 h-0.5 bg-gold-400 mx-auto mt-2 sm:mt-3 mb-2 sm:mb-2.5 rounded-full" />
                  <p className="text-slate-400 text-[9px] sm:text-[11px] font-bold uppercase tracking-[1px] sm:tracking-[2px] leading-tight">{s.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Groups ── */}

      {/* Mobile: tab switcher */}
      <div className="md:hidden sticky top-[72px] z-20 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide">
          {GROUPS.map((group) => {
            const Icon = group.icon;
            const isActive = openGroup === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setOpenGroup(group.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-3.5 text-[14px] font-bold transition-colors duration-200 border-b-2 whitespace-nowrap
                  ${isActive ? `${group.chipText} border-current` : 'text-slate-400 border-transparent'}`}
              >
                <Icon size={13} strokeWidth={2} />
                {group.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile: active group cards */}
      <div className="md:hidden">
        {GROUPS.filter(g => g.id === openGroup).map((group) => (
          <div key={group.id} className="container-wide py-8">
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{group.subtitle}</p>
            <div className="grid grid-cols-1 gap-3">
              {group.members.map((exec, i) => (
                <AnimateIn key={exec.name} variant="fade-up" delay={i * 30}>
                  <ExecutiveCard exec={exec} chipBg={group.chipBg} chipText={group.chipText} />
                </AnimateIn>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: all groups */}
      {GROUPS.map((group, gi) => {
        const Icon = group.icon;
        const bg = gi % 2 === 0 ? 'bg-white' : 'bg-slate-50/60';

        const gridCols =
          group.members.length <= 4  ? 'sm:grid-cols-2 lg:grid-cols-4' :
          group.members.length <= 6  ? 'sm:grid-cols-2 lg:grid-cols-3' :
                                       'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

        return (
          <div key={group.id} className={`hidden md:block ${bg} border-b border-slate-100 last:border-0`}>
            <div className="container-wide py-12 lg:py-16">

              {/* Section header */}
              <AnimateIn variant="fade-up">
                <div className="mb-10 sm:mb-12">
                  <div className="flex items-center gap-1 mb-5">
                    <Icon size={18} className={`${group.chipText}`} strokeWidth={2} />
                    <span className="text-slate-200 text-xs">·</span>
                    <span className="text-[12px] font-bold uppercase tracking-[1px] text-slate-400">
                      {group.members.length} {group.members.length === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-navy-950 leading-tight mb-1.5">
                      {group.label}
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
                      {group.subtitle}
                    </p>
                  </div>
                  <div className={`h-px w-full mt-7 bg-gradient-to-r ${group.gradient} opacity-15 rounded-full`} />
                </div>
              </AnimateIn>

              {/* Cards */}
              <div className={`grid grid-cols-1 ${gridCols} gap-3.5`}>
                {group.members.map((exec, i) => (
                  <AnimateIn key={exec.name} variant="fade-up" delay={i * 35}>
                    <ExecutiveCard exec={exec} chipBg={group.chipBg} chipText={group.chipText} />
                  </AnimateIn>
                ))}
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}
