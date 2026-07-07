import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

/* ─── Link groups ───────────────────────────────────────────
   Internal hrefs (starting with "/") use react-router <Link>;
   everything else opens externally in a new tab.            */

type FooterLink = { label: string; href: string };

/* Desktop-only link groups (3-column layout) */
const QUICK_LINKS: FooterLink[] = [
  { label: 'e-Results',                    href: 'https://eresults.newhorizonindia.edu/' },
  { label: 'Research',                     href: 'https://researchnhce.newhorizoncollegeofengineering.in/' },
  { label: 'Online Payment – HDFC',        href: 'https://forms.eduqfix.com/newhorieng/add' },
  { label: 'Online Payment – Indian Bank', href: 'https://forms.easebuzz.in/register/NewNV9Xm/New_Horizon_College_of_Engineering' },
  { label: 'Web Mail',                     href: 'https://outlook.office.com/mail/' },
  { label: 'Sitemap',                      href: 'https://newhorizoncollegeofengineering.in/site-map/' },
  { label: 'ToastMasters',                 href: 'https://nhce.toastmastersclubs.org/' },
  { label: 'Alumni Portal',                href: 'https://alumni.newhorizonindia.edu/' },
  { label: 'Parent Portal',                href: 'https://parents.newhorizonindia.edu:8083/parents/index.php' },
  { label: 'NHTS – Help Desk',             href: 'https://helpdesk.newhorizonindia.edu/' },
];

const USEFUL_LINKS: FooterLink[] = [
  { label: 'Gift Portal',    href: 'https://newhorizonindia.edu/gift-portal/' },
  { label: 'HRMS Login',     href: 'http://202.62.95.70:8081/HRMSLive/' },
  { label: 'Inventory',      href: 'http://202.62.95.70:8082/account/login?ReturnUrl=%2fInventory' },
  { label: 'Venue Booking',  href: 'https://venue-booking.newhorizoncollegeofengineering.in/' },
  { label: 'Privacy Policy', href: 'https://newhorizoncollegeofengineering.in/privacy-policy/' },
];

/* Mobile-only link chips — deliberately separate from the desktop lists above
   so the two layouts can be edited independently. */
const MOBILE_LINKS: FooterLink[] = [
  { label: 'e-Results',                    href: 'https://eresults.newhorizonindia.edu/' },
  { label: 'Web Mail',                     href: 'https://outlook.office.com/mail/' },
    { label: 'Research',                     href: 'https://researchnhce.newhorizoncollegeofengineering.in/' },
  { label: 'Online Payment – HDFC',        href: 'https://forms.eduqfix.com/newhorieng/add' },
  { label: 'Online Payment – Indian Bank', href: 'https://forms.easebuzz.in/register/NewNV9Xm/New_Horizon_College_of_Engineering' },
  { label: 'Alumni Portal',                href: 'https://alumni.newhorizonindia.edu/' },
  { label: 'Parent Portal',                href: 'https://parents.newhorizonindia.edu:8083/parents/index.php' },
    { label: 'NHTS – Help Desk',             href: 'https://helpdesk.newhorizonindia.edu/' },
  { label: 'Sitemap',                      href: 'https://newhorizoncollegeofengineering.in/site-map/' },
  { label: 'Privacy Policy',               href: 'https://newhorizoncollegeofengineering.in/privacy-policy/' },
];

const SOCIALS = [
  {
    label: 'Facebook', href: 'https://www.facebook.com/nhceofficial/', color: 'hover:bg-blue-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'Instagram', href: 'https://www.instagram.com/nhce_official/', color: 'hover:bg-pink-600',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: 'YouTube', href: 'https://www.youtube.com/c/NHEIBangalore', color: 'hover:bg-red-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>,
  },
  {
    label: 'X / Twitter', href: 'https://twitter.com/NHCEOfficial', color: 'hover:bg-slate-600',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/school/new-horizon-college-of-engineering/mycompany/', color: 'hover:bg-blue-700',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
];

function isExternalHref(href: string) {
  return !href.startsWith('/') && !href.startsWith('#');
}

function FooterLinkItem({ href, label }: FooterLink) {
  const external = isExternalHref(href);
  const cls = 'group flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors';
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span>{label}</span>
        <ExternalLink size={11} className="text-white/70 group-hover:text-gold-400 transition-colors flex-shrink-0" />
      </a>
    );
  }
  return (
    <Link to={href} className={cls}>
      {label}
    </Link>
  );
}

function FooterColumn({ title, links, twoCol }: { title: string; links: FooterLink[]; twoCol?: boolean }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-5">{title}</h3>
      <ul className={twoCol ? 'grid grid-cols-2 gap-x-6 gap-y-3' : 'flex flex-col gap-3'}>
        {links.map(l => (
          <li key={l.label}>
            <FooterLinkItem {...l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterChip({ href, label }: FooterLink) {
  const external = isExternalHref(href);
  const cls = 'group inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors';
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
        <ExternalLink size={10} className="text-white/40 group-hover:text-gold-400 transition-colors flex-shrink-0" />
      </a>
    );
  }
  return (
    <Link to={href} className={cls}>
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-wide">

        {/* ── Desktop layout — three-column grid (Contact · Quick Links · Useful Links) ── */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-x-8 py-14">

          <div className="lg:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gold-400 mb-5">Contact</h3>
            <div className="flex flex-col gap-4 text-sm text-white/70">
              <a href="tel:+919880534935" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone size={14} className="text-gold-400 flex-shrink-0" /> +91-98805 34935
              </a>
              <a href="mailto:admissionsnhce@newhorizonindia.edu" className="flex items-start gap-2.5 hover:text-white transition-colors min-w-0">
                <Mail size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="min-w-0">admissionsnhce@<wbr />newhorizonindia.edu</span>
              </a>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Bellandur Main Road, Near Marathahalli, Bengaluru – 560103</span>
              </div>
            </div>
            <div className="flex items-center mt-5 gap-2">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center ${s.color} transition-colors`}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <FooterColumn title="Quick Links" links={QUICK_LINKS} twoCol />
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Useful Links" links={USEFUL_LINKS} />
          </div>

        </div>

        {/* ── Mobile layout — compact, centered, chip links ── */}
        <div className="lg:hidden py-10 flex flex-col items-center text-center gap-5">

          <div className="flex flex-col items-center gap-2.5 text-sm text-white/70">
            <a href="tel:+919880534935" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={13} className="text-gold-400 flex-shrink-0" /> +91-98805 34935
            </a>
            <a href="mailto:admissionsnhce@newhorizonindia.edu" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={13} className="text-gold-400 flex-shrink-0" /> admissionsnhce@newhorizonindia.edu
            </a>
            <div className="flex items-start gap-2 max-w-[280px] text-left">
              <MapPin size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
              <span className="min-w-0">Bellandur Main Road, Near Marathahalli, Bengaluru – 560103</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${s.color} transition-colors`}
              >
                {s.svg}
              </a>
            ))}
          </div>

          <div className="w-10 h-px bg-white/15" />

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-sm">
            {MOBILE_LINKS.map(l => (
              <FooterChip key={l.label} {...l} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-white/90 text-center">
          <p>© New Horizon Educational Institution</p>
        </div>
      </div>
    </footer>
  );
}
