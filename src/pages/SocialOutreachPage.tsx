import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Users, Leaf, Droplet, BookOpen, Sun,
  HandHeart, ChevronRight, ShieldCheck, CalendarDays, Banknote,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Data ──────────────────────────────────────────────────── */

const INITIATIVES = [
  {
    title: 'National Service Scheme (NSS)',
    desc: 'Adopting villages to improve living conditions, conducting health camps, and running skill development programs for tribal communities in Bandipur and Kabini.',
    icon: Users,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    hover: 'hover:border-blue-300',
  },
  {
    title: 'Mega Blood Donation Drives',
    desc: 'Annual blood donation camps organized in collaboration with reputed blood banks, hospitals, and NGOs, collecting thousands of units to save lives.',
    icon: Droplet,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
    hover: 'hover:border-red-300',
  },
  {
    title: 'Environmental Sustainability',
    desc: 'Extensive tree plantation drives, Swachh Bharat Abhiyan participation, and awareness campaigns focusing on waste management and eco-friendly practices.',
    icon: Leaf,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    hover: 'hover:border-emerald-300',
  },
  {
    title: 'Education for the Underprivileged',
    desc: 'Student volunteers dedicate their time to teaching basic computer skills, mathematics, and science to children in nearby government schools.',
    icon: BookOpen,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    hover: 'hover:border-amber-300',
  },
  {
    title: 'Women Empowerment',
    desc: 'Skill-building and vocational training workshops designed specifically to help rural and underprivileged women achieve financial independence.',
    icon: Sun,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    hover: 'hover:border-violet-300',
  },
  {
    title: 'Relief & Rehabilitation',
    desc: 'Rapid response fundraising and material collection drives to support victims of natural calamities and those in critical need during national crises.',
    icon: HandHeart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    hover: 'hover:border-rose-300',
  },
];

const STATS = [
  { num: '93', label: 'Villages Adopted', detail: 'By NHCE NSS Unit' },
  { num: '5,000+', label: 'Active Volunteers', detail: 'Students & Faculty' },
  { num: '10k+', label: 'Blood Units Donated', detail: 'Through Mega Camps' },
  { num: '25+', label: 'Annual Campaigns', detail: 'Across Karnataka' },
];

const CONTRIBUTIONS = [
  {
    year: '2026',
    total: '₹3.04 Crores',
    items: [
      { amount: '₹1,29,00,000', org: 'Bharatiya Janseva Sansthan', date: '04 Feb 2026', desc: 'Spreading awareness about the Rich Cultural roots, heritage and traditions mainly in Tribal Areas of Bharat.' },
      { amount: '₹1,00,00,000', org: 'Bharat Kalyan Pratishthan', date: '04 Feb 2026', desc: 'Providing education to the deprived sections of community in cities and tribal areas.' },
      { amount: '₹50,00,000', org: 'Vidya Bharati Uchcha Shiksha Sanstha', date: '03 Feb 2026', desc: 'Educational and Social Outreach activities for poor Children in the Society.' },
      { amount: '₹25,00,000', org: 'Asaktha Poshaka Sabha', date: '05 Feb 2026', desc: 'Providing free shelter, food, clothing and medical care to poor senior citizens.' },
    ]
  },
  {
    year: '2024–2025',
    total: '₹128.07 Crores',
    items: [
      { amount: '₹125,00,00,000', org: 'New Horizon Educational & Research Trust', date: '14 Nov 2025', desc: 'Donated by New Horizon Educational and Cultural Trust towards extensive Educational Activities.' },
      { amount: '₹3,00,00,000', org: 'Jana Seva Trust', date: '19 Aug 2024', desc: 'To support social and educational activities for poor and needy children.' },
      { amount: '₹2,50,00,000', org: 'Vishva Samvad Kendra', date: '2024–25', desc: 'Supporting initiatives in the field of Education in Journalism and Mass Communication.' },
      { amount: '₹7,00,000', org: 'Honor Point Foundation', date: '10 Jul 2024', desc: 'Towards the celebration of Kargil Vijay Diwas.' },
    ]
  },
  {
    year: '2022–2023',
    total: '₹31.04 Crores',
    items: [
      { amount: '₹12,00,00,000', org: 'Janaseva Trust (Param)', date: '2022', desc: 'Multiple contributions (₹5Cr, ₹5Cr from NH Gurukul, ₹2Cr) for the Param Project involving a cultural & science center, innovation lab, and convention center.' },
      { amount: '₹5,00,00,000', org: 'Vidya Bharati Uccha Shikshan Sansthan', date: '03 Jun 2022', desc: 'To develop an education system aligned with Bharatiya culture and life philosophy.' },
      { amount: '₹5,00,00,000', org: 'Jana Seva Trust', date: '2022', desc: 'To extend support in education, food, and shelter for street and underprivileged children.' },
      { amount: '₹5,00,00,000', org: 'Chanakya University', date: '2022–23', desc: 'Contributions (₹3Cr + ₹2Cr) towards construction, infrastructure development, and social development activities.' },
      { amount: '₹20,00,000', org: 'Vishwa Hindu Parishad Dakshina Karnataka', date: '30 Sep 2023', desc: 'Towards assistance in educational activities in South Karnataka.' },
      { amount: '₹20,00,000', org: 'Trust India Foundation', date: '2022–23', desc: 'Establishment of a Yoga and Spiritual Centre for youth and the elderly.' },
      { amount: '₹18,00,000', org: 'Sri Guru Harikrishan High School', date: '2022–23', desc: 'Donated by NHIS to cover school fees of 12 low-income students.' },
      { amount: '₹15,00,000', org: 'Vishwa Hindu Parishad, Deogiri Prant', date: '2022–23', desc: 'Development of hostels for tribal and Matang community children.' },
      { amount: '₹11,00,000', org: 'Shri Bageshwar Jan Seva Samithi', date: '2022–23', desc: 'Community development, food, shelter, and assistance in the marriage of underprivileged girls.' },
      { amount: '₹7,50,000', org: 'Dada AMR Charitable Trust', date: '19 Oct 2022', desc: 'Towards social activities.' },
      { amount: '₹5,00,000', org: 'Bharatiya Shikshan Mandal', date: '2022', desc: 'Support for the National Conference on NEP 2020 at VTU, Belagavi.' },
      { amount: '₹3,50,000', org: 'Honourpoint Foundation', date: '27 Oct 2022', desc: 'Towards the celebration of Kargil Vijayotsava Day and honoring martyred Indian soldiers.' },
    ]
  }
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function SocialOutreachPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out]">
      
      {/* ── Hero ── */}
      <HeroSection
        image="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/11/nss-activity-03.webp"
        badge="Social Responsibility · NHCE"
        headingSmall="Giving Back to Society"
        headingMain="Empowering"
        headingGhost="Communities"
        description="At New Horizon, education goes beyond the classroom. We are deeply committed to nurturing empathy, driving sustainable change, and uplifting the underprivileged."
        button={{ label: 'Explore Initiatives', href: '#initiatives' }}
        secondaryButton={{ label: 'Join as Volunteer', href: '#contact' }}
      />

      {/* ── Intro & Philosophy ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-wide py-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
            <AnimateIn variant="fade-right">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full mb-5">
                  <Heart size={14} /> Our Philosophy
                </span>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950 leading-tight mb-6">
                  Education With a <br className="hidden sm:block" />
                  <span className="text-emerald-600">Conscience</span>
                </h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    New Horizon Educational Institution believes that true education involves building character, instilling strong moral values, and developing a profound sense of social responsibility. Our outreach programs are structured to create meaningful and lasting impact in the communities around us.
                  </p>
                  <p>
                    Through the collaborative efforts of our management, dedicated faculty members, and enthusiastic student volunteers, we continuously strive to address critical societal challenges ranging from healthcare and education to environmental conservation.
                  </p>
                </div>
              </div>
            </AnimateIn>
            <AnimateIn variant="fade-left" delay={120}>
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                <ShieldCheck size={40} className="text-emerald-500 mb-6 relative z-10" />
                <h3 className="font-bold text-navy-900 text-xl mb-3 relative z-10">Institutional Commitment</h3>
                <p className="text-slate-500 text-base leading-relaxed relative z-10">
                  "We envision an educational ecosystem where academic brilliance meets compassionate action. Our social outreach initiatives are not extracurriculars; they are integral to the holistic development of every New Horizon student."
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── Impact Stats ── */}
      <div className="bg-navy-950 py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-10">
              <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">Measurable Change</p>
              <h2 className="font-display font-bold text-white text-2xl sm:text-3xl">Our Impact in Numbers</h2>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {STATS.map((stat, i) => (
              <AnimateIn key={stat.label} variant="fade-up" delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                  <p className="font-black text-4xl sm:text-5xl text-emerald-400 mb-2">{stat.num}</p>
                  <p className="font-bold text-white text-base sm:text-lg mb-1">{stat.label}</p>
                  <p className="text-white/50 text-sm">{stat.detail}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Key Initiatives ── */}
      <div id="initiatives" className="bg-slate-50 pt-20 pb-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-12">
              <span className="badge bg-blue-100 text-blue-700 mb-3 inline-flex">Core Programs</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950 mt-2">Key Initiatives</h2>
              <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto">
                From large-scale blood donation camps to adopting tribal villages, our initiatives span across multiple domains to maximize community benefit.
              </p>
            </div>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {INITIATIVES.map((item, i) => (
              <AnimateIn key={item.title} variant="fade-up" delay={i * 50}>
                <div className={`bg-white rounded-2xl p-6 border ${item.border} ${item.hover} shadow-sm transition-all duration-300 group h-full flex flex-col`}>
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon size={20} className={item.color} />
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-3 leading-snug">{item.title}</h3>
                  <p className="text-slate-500 text-base leading-relaxed flex-1">{item.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Philanthropic Contributions ── */}
      <div className="bg-white py-16 sm:py-20 border-t border-slate-100">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-16">
              <span className="badge bg-amber-100 text-amber-700 mb-3 inline-flex">Philanthropy</span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-navy-950">Major Contributions</h2>
              <p className="text-slate-500 text-lg mt-3 max-w-2xl mx-auto">
                Our commitment to nation-building extends through significant financial support for education, cultural heritage, and community welfare.
              </p>
            </div>
          </AnimateIn>

          <div className="space-y-12">
            {CONTRIBUTIONS.map((group, idx) => (
              <AnimateIn key={group.year} variant="fade-up" delay={idx * 100}>
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className="w-12 h-12 bg-navy-900 text-white rounded-xl flex items-center justify-center font-black text-lg">
                        <CalendarDays size={20} />
                      </span>
                      <div>
                        <h3 className="font-display font-black text-2xl text-navy-950">{group.year}</h3>
                        <p className="text-base font-semibold text-slate-500">Cumulative Outlay: {group.total}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {group.items.map((item, i) => (
                      <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md">
                            <Banknote size={12} /> {item.amount}
                          </span>
                          {item.date && (
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-sm">
                              {item.date}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-navy-900 text-base sm:text-lg leading-snug mb-2">{item.org}</h4>
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div id="contact" className="container-wide pb-16">
        <AnimateIn variant="scale">
          <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-blue-900 rounded-3xl p-8 sm:p-12 text-center text-white">
            <Heart size={32} className="text-emerald-400 mx-auto mb-4" />
            <h3 className="font-display font-bold text-2xl sm:text-3xl mb-3">Be the Change You Wish to See</h3>
            <p className="text-white/70 text-base sm:text-lg mb-8 max-w-lg mx-auto">
              Whether you are an aspiring student, an alumni, or an organization looking to partner, your contribution can help us reach more lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-gold inline-flex items-center justify-center gap-2">
                Partner With Us <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>

    </div>
  );
}