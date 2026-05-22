import { useState } from 'react';
import { MapPin, Phone, Mail, ExternalLink, Youtube, Instagram, Twitter, Linkedin, Facebook, ChevronDown } from 'lucide-react';

const LINK_COLS = [
  {
    title: 'Quick Links',
    links: ['About NHCE', 'Admissions 2025', 'Fee Structure', 'Scholarships', 'Hostel', 'Library', 'IQAC', 'Anti-Ragging'],
  },
  {
    title: 'Departments',
    links: ['Computer Science', 'Electronics & Comm.', 'Mechanical Engg.', 'Civil Engineering', 'Information Science', 'Electrical Engg.', 'AI & ML', 'MBA / MCA'],
  },
  {
    title: 'Students',
    links: ['Student Portal', 'Exam Results', 'Time Table', 'Fee Payment', 'Placement Cell', 'Research Portal', 'E-Library', 'Events & Fests', 'Alumni Network', 'Grievance Cell'],
  },
];

function AccordionCol({ title, links }: { title: string; links: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 md:border-none">
      {/* Mobile toggle header */}
      <button
        className="w-full flex items-center justify-between py-3 md:pointer-events-none md:cursor-default"
        onClick={() => setOpen(o => !o)}
      >
        <h4 className="font-semibold text-sm uppercase tracking-wider text-gold-400 w-full text-center md:text-left">{title}</h4>
        <ChevronDown
          size={15}
          className={`text-white/40 transition-transform duration-200 md:hidden ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Links — always visible on md+, accordion on mobile */}
      <ul className={`space-y-2 overflow-hidden transition-all duration-300 md:!max-h-none md:!opacity-100 md:mb-0 ${open ? 'max-h-96 opacity-100 pb-3' : 'max-h-0 opacity-0'}`}>
        {links.map(link => (
          <li key={link}>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1.5 group">
              <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-gold-400 transition-colors flex-shrink-0" />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-navy-800 via-navy-900 to-navy-950 border-b border-white/10">
        <div className="container-wide py-8 md:py-14 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="font-display text-xl md:text-3xl font-bold mb-1">Ready to Shape Your Future?</h2>
            <p className="text-white/60 text-xs md:text-sm max-w-md">
              Join 15,000+ students building careers at India's premier engineering institution.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="btn-gold flex-1 md:flex-none text-sm py-2.5">Apply for 2025–26</button>
            <button className="btn-outline flex-1 md:flex-none text-sm py-2.5">Download Brochure</button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-wide py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 md:gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 pb-6 md:pb-0 border-b border-white/10 md:border-none text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <img
                src="https://newhorizoncollegeofengineering.in/wp-content/uploads/2025/07/nhce_25-scaled-1-2048x683.png"
                alt="New Horizon College of Engineering"
                className="h-14 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-sm hidden md:block">
              Empowering the next generation of engineers and innovators since 1996. NAAC A+ accredited,
              NBA approved, VTU affiliated institution in the heart of Bengaluru.
            </p>

            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-start gap-2.5 justify-center md:justify-start">
                <MapPin size={14} className="mt-0.5 text-gold-400 flex-shrink-0" />
                <span className="text-xs md:text-sm">Near Koramangala, Inner Ring Road, Bengaluru - 560043</span>
              </div>
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <Phone size={14} className="text-gold-400 flex-shrink-0" />
                <a href="tel:+918023216776" className="hover:text-white transition-colors text-xs md:text-sm">+91 80 2321 6776</a>
              </div>
              <div className="flex items-center gap-2.5 justify-center md:justify-start">
                <Mail size={14} className="text-gold-400 flex-shrink-0" />
                <a href="mailto:info@nhce.edu.in" className="hover:text-white transition-colors text-xs md:text-sm">info@nhce.edu.in</a>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-2.5 mt-5 justify-center md:justify-start">
              {[
                { icon: <Facebook size={14} />, href: '#', color: 'hover:bg-blue-600' },
                { icon: <Instagram size={14} />, href: '#', color: 'hover:bg-pink-600' },
                { icon: <Twitter size={14} />, href: '#', color: 'hover:bg-sky-500' },
                { icon: <Linkedin size={14} />, href: '#', color: 'hover:bg-blue-700' },
                { icon: <Youtube size={14} />, href: '#', color: 'hover:bg-red-600' },
              ].map((s, i) => (
                <a key={i} href={s.href} className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${s.color} transition-colors`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — accordion on mobile, normal on desktop */}
          {LINK_COLS.map(col => (
            <AccordionCol key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Accreditation + copyright */}
        <div className="mt-8 pt-6 border-t border-white/10">
          {/* <div className="flex flex-wrap items-center gap-2 mb-4">
            {['NAAC A+', 'NBA', 'AICTE', 'VTU', 'ISO 9001:2015', 'NIRF Ranked'].map(badge => (
              <span key={badge} className="px-2.5 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/60">
                {badge}
              </span>
            ))}
          </div> */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
            <p>© 2025 New Horizon College of Engineering. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                NHCE Website <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
