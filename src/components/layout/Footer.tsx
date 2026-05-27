import { MapPin, Phone, Mail } from 'lucide-react';

const LINKS = [
  { label: 'About NHCE',  href: '#about' },
  { label: 'Admissions',  href: '#admissions' },
  { label: 'Departments', href: '#departments' },
  { label: 'Placements',  href: '#placements' },
  { label: 'Research',    href: '#research' },
  { label: 'Contact Us',  href: '#contact' },
];

const SOCIALS = [
  {
    label: 'Facebook', href: '#', color: 'hover:bg-blue-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'Instagram', href: '#', color: 'hover:bg-pink-600',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'YouTube', href: '#', color: 'hover:bg-red-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  },
  {
    label: 'X / Twitter', href: '#', color: 'hover:bg-slate-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-wide py-12 flex flex-col items-center text-center gap-8">

        {/* Contact details */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-white/60">  
          <div className="flex items-center gap-1.5">
            <Phone size={13} className="text-gold-400 flex-shrink-0" />
            <a href="tel:+919880534935" className="hover:text-white transition-colors">+91-98805 34935</a>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail size={13} className="text-gold-400 flex-shrink-0" />
            <a href="mailto:admissionsnhce@newhorizonindia.edu" className="hover:text-white transition-colors">admissionsnhce@newhorizonindia.edu</a>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-gold-400 flex-shrink-0" />
            <span>Bellandur Main Road, Near Marathahalli, Bengaluru – 560103</span>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {LINKS.map(l => (
            <a key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-3">Follow Us</p>
          <div className="flex items-center justify-center gap-2">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center ${s.color} transition-colors`}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-white/40">
          <p>© 2025 New Horizon College of Engineering. All rights reserved.</p>
          <span className="hidden sm:block">·</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
