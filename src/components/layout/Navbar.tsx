import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone, ChevronRight, ChevronDown } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */

type NavChild = { label: string; href?: string; desc: string; children?: NavChild[] };

/* ─── Link helpers ──────────────────────────────────────────
   External hrefs (http/https) render as <a target="_blank">;
   everything else renders as a react-router <Link>.        */

function isExternalHref(href?: string) {
  return !!href && /^https?:\/\//.test(href);
}

function isPlaceholderHref(href?: string) {
  return !href || href === '#';
}

function NavAnchor({ href, onClick, className, style, children }: {
  href: string; onClick?: () => void; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} onClick={onClick} className={className} style={style}>
      {children}
    </Link>
  );
}

/* ─── Nav structure ─────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    children: [
      { label: 'About the College', href: '/about#about',    desc: 'History, vision and mission'           },
      { label: 'Leadership',        href: '/leadership',     desc: 'Principal, deans & governance'         },
      { label: 'Key Executives',    href: '/key-executives', desc: '29 executives across all departments'  },
      { label: 'Achievements',      href: '/achievements',   desc: 'Rankings, awards & student milestones' },
      { label: 'Social Outreach',   href: '/social-outreach', desc: 'NSS, blood drives & community'            },
      {
        label: 'Governance', href: '/governance', desc: 'Councils, committees & disclosure',
        children: [
          { label: 'Mandatory Disclosure', href: '/mandatory-disclosure', desc: 'AICTE documents & financials' },
          { label: 'Statutory Committees', href: '/statutory-committee',  desc: '30 institutional committees'  },
        ],
      },
    ],
  },
  {
    label: 'Admissions', href: '/admissions',
    children: [
      { label: 'Admissions Overview',           href: '/admissions',            desc: 'Apply, eligibility & process'               },
      { label: 'Academic Enrichment Programs',  href: '/academic-enrichment',   desc: 'Minor degrees, scholarships & study abroad' },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Under Graduate (UG)', href: '/programs#ug',  desc: '7 B.E. programmes · 4 years'       },
      { label: 'Post Graduate (PG)',  href: '/programs#pg',  desc: 'M.Tech · MBA · MCA · 2 years'      },
      { label: 'PhD / Research',      href: '/programs#phd', desc: 'Doctoral research · 8 disciplines' },
    ],
  },
  {
    label: 'Campus',
    children: [
      { label: 'Campus Facilities',       href: '/campus',                  desc: 'Infrastructure, labs & hostel'         },
      { label: 'Student Services',        href: '/student-services',        desc: 'Library, counseling & more'            },
      { label: 'Sports',                  href: '/sports',                  desc: 'Courts, grounds & achievements'        },
      { label: 'Student Clubs',           href: '/student-clubs',           desc: '35+ co-curricular & extra-curricular clubs' },
      { label: 'Industry Collaborations', href: '/industry-collaborations', desc: 'Sponsored labs, MoUs & partnerships'   },
      { label: 'AICTE IDEA Lab',          href: '/aicte-idea-lab',          desc: 'Innovation, design & entrepreneurship' },
    ],
  },
  {
    label: 'Experience NHCE',
    children: [
      { label: 'Life at NHCE',       href: '/life-at-nhce',      desc: 'Campus life, updates & stories'      },
      { label: 'News',               href: '/news',              desc: 'Latest announcements & updates'      },
      { label: 'Events',             href: '/events',            desc: 'Fests, workshops & conferences'      },
      { label: 'Cultural Activities',href: '/cultural-activities', desc: 'Fests, celebrations & campus events' },
      { label: 'Celebrity Diaries',  href: '/celebrity-diaries', desc: 'Notable guests & celebrity visits'   },
    ],
  },
  
  {
    label: 'Resources',
    children: [
      { label: 'Library',       href: 'https://library-new.newhorizoncollegeofengineering.in/', desc: 'Digital catalogue & e-resources' },
      { label: 'Alumni',        href: '/alumni',                    desc: 'Network, stories & giving back'    },
      {
        label: 'Professional Counselling', href: '/professional-counselling', desc: 'Free, confidential student support',
        children: [
          { label: 'Counselling Services', href: '/counselling-services', desc: '6 services · free & confidential' },
          { label: 'Counselling Events',   href: '/counselling-events',  desc: 'Workshops & awareness programs' },
        ],
      },
      {
        label: 'Online Payment', desc: 'Pay fees securely via your bank',
        children: [
          { label: 'HDFC Bank',   href: 'https://forms.eduqfix.com/newhorieng/add', desc: 'Pay fees via HDFC Bank portal'   },
          { label: 'Indian Bank', href: 'https://forms.easebuzz.in/register/NewNV9Xm/New_Horizon_College_of_Engineering', desc: 'Pay fees via Indian Bank portal' },
        ],
      },
      { label: 'Newsletters',   href: '/newsletters', desc: 'Campus bulletins & department newsletters' },
    ],
  },
  { label: 'IQAC',              href: '/iqac'             },
  { label: 'Examinations',     href: '/exam'             },
  { label: 'Placements',       href: '/#placements'      },
  { label: 'Contact',          href: '/contact'          },
];

/* ─── Full-page menu ─────────────────────────────────────── */

function FullPageMenu({ open, onClose, scrolled }: { open: boolean; onClose: () => void; scrolled: boolean }) {
  const [active, setActive]           = useState<string | null>(null);
  const [childActive, setChildActive] = useState<string | null>(null);

  // Reset panels when menu closes or main active item changes
  useEffect(() => { if (!open) { setActive(null); setChildActive(null); } }, [open]);
  useEffect(() => { setChildActive(null); }, [active]);

  const activeItem         = active ? NAV_ITEMS.find(i => i.label === active) : null;
  const subItems           = activeItem && 'children' in activeItem ? (activeItem.children as NavChild[]) : null;
  const childActiveItem    = childActive ? subItems?.find(c => c.label === childActive) : null;
  const grandSubItems      = childActiveItem?.children ?? null;
  const childActiveIndex   = subItems ? subItems.findIndex(c => c.label === childActive) : 0;
  // Align panel 3 with the hovered item in panel 2: header ~42px + each item ~58px (text+desc+gap)
  const panel3TopOffset    = 42 + Math.max(0, childActiveIndex) * 58;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'top-20 sm:top-16' : 'top-20 sm:top-28'} ${
        open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="/admission_cover.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-950/[0.97]" />
      </div>

      {/* Inner scrollable area — keeps overflow within the fixed container */}
      <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
      <div className="container-wide py-8 sm:py-14 min-h-full flex flex-col">

        {/* ── MOBILE: single-column accordion ── */}
        <nav className="flex flex-col md:hidden flex-1">
          {NAV_ITEMS.map((item, i) => {
            const hasChildren = 'children' in item;
            const isActive    = active === item.label;
            return (
              <div key={item.label} className="border-b border-white/[0.07] last:border-0"
                style={open ? { animation: `slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 40}ms both` } : {}}>
                {hasChildren ? (
                  <>
                    <div className={`w-full flex items-center justify-between py-4 text-base font-bold transition-colors ${isActive ? 'text-blue-400' : 'text-white/80'}`}>
                      {'href' in item && item.href ? (
                        <Link to={item.href} onClick={onClose} className="flex-1 hover:text-white transition-colors">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="flex-1">{item.label}</span>
                      )}
                      <button onClick={() => setActive(isActive ? null : item.label)} className="pl-3">
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-blue-400' : 'text-white/30'}`} />
                      </button>
                    </div>
                    <div className={`overflow-hidden transition-[max-height,padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'max-h-[520px] pb-3' : 'max-h-0'}`}>
                      {(item.children as NavChild[]).map(child => (
                        <div key={child.label}>
                          {child.children ? (
                            <>
                              <div className="flex items-center justify-between py-2.5 pl-4 text-base text-white/60 group">
                                {child.href ? (
                                  <NavAnchor href={child.href} onClick={onClose} className="flex-1 hover:text-white transition-colors">
                                    <p className="font-semibold">{child.label}</p>
                                    <p className="text-sm text-white/30 mt-0.5">{child.desc}</p>
                                  </NavAnchor>
                                ) : (
                                  <div className="flex-1">
                                    <p className="font-semibold">{child.label}</p>
                                    <p className="text-sm text-white/30 mt-0.5">{child.desc}</p>
                                  </div>
                                )}
                                <button onClick={() => setChildActive(childActive === child.label ? null : child.label)} className="pl-3 pr-1">
                                  <ChevronDown size={13} className={`transition-transform duration-300 ${childActive === child.label ? 'rotate-180 text-blue-400' : 'text-white/30'}`} />
                                </button>
                              </div>
                              <div className={`overflow-hidden transition-all duration-300 ${childActive === child.label ? 'max-h-32' : 'max-h-0'}`}>
                                {child.children.map(sub => (
                                  isPlaceholderHref(sub.href) ? (
                                    <div key={sub.label} className="flex items-center gap-2 py-2 pl-8 text-sm text-white/25 cursor-not-allowed">
                                      <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                      {sub.label}
                                      <span className="ml-auto text-[10px] uppercase tracking-wide text-white/20">Soon</span>
                                    </div>
                                  ) : (
                                    <NavAnchor key={sub.label} href={sub.href!} onClick={onClose}
                                      className="flex items-center gap-2 py-2 pl-8 text-sm text-white/45 hover:text-white transition-colors group">
                                      <span className="w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                                      {sub.label}
                                    </NavAnchor>
                                  )
                                ))}
                              </div>
                            </>
                          ) : (
                            <NavAnchor href={child.href!} onClick={onClose}
                              className="flex items-center justify-between py-2.5 pl-4 text-white/60 hover:text-white transition-colors group">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm leading-snug">{child.label}</p>
                                <p className="text-xs text-white/30 mt-0.5">{child.desc}</p>
                              </div>
                              <ArrowRight size={13} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
                            </NavAnchor>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link to={item.href!} onClick={onClose}
                    className="flex items-center justify-between w-full py-4 text-base font-bold text-white/80 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── DESKTOP: three-panel layout ── */}
        <div className="hidden md:flex flex-1 gap-8 lg:gap-16 min-w-0 overflow-hidden">

          {/* PANEL 1 — main items */}
          <nav className="flex flex-col w-56 flex-shrink-0">
            {NAV_ITEMS.map((item, i) => {
              const hasChildren = 'children' in item;
              const isActive    = active === item.label;
              const baseCls     = `flex items-center justify-between gap-3 py-2.5 border-b border-white/[0.07] last:border-0 text-base font-semibold transition-colors duration-150 cursor-pointer`;
              return hasChildren ? (
                <div key={item.label}
                  onMouseEnter={() => { setActive(item.label); setChildActive(null); }}
                  className={`${baseCls} ${isActive ? 'text-blue-400' : 'text-white/70'}`}
                  style={open ? { animation: `slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms both` } : {}}>
                  {'href' in item && item.href ? (
                    <Link to={item.href} onClick={onClose} className="flex-1 hover:text-white transition-colors">{item.label}</Link>
                  ) : (
                    <span className="flex-1">{item.label}</span>
                  )}
                  <ChevronRight size={14} className={`flex-shrink-0 transition-transform duration-200 ${isActive ? 'translate-x-1 text-blue-400' : 'text-white/20'}`} />
                </div>
              ) : (
                <Link key={item.label} to={item.href!} onClick={onClose} onMouseEnter={() => { setActive(null); setChildActive(null); }}
                  className={`${baseCls} text-white/70 hover:text-white`}
                  style={open ? { animation: `slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms both` } : {}}>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* PANEL 2 — children of active main item */}
          {subItems && (
            <div key={active} className="flex flex-col w-64 flex-shrink-0 justify-start pt-1" style={{ animation: 'fadeIn 0.2s ease both' }}>
              <p className="text-white/25 text-xs font-bold tracking-[4px] uppercase mb-6">{active}</p>
              <div className="flex flex-col gap-5">
                {subItems.map((child, i) => (
                  <div key={child.label}
                    onMouseEnter={() => child.children ? setChildActive(child.label) : setChildActive(null)}
                    style={{ animation: `slideUpFade 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}>
                    <div className={`group flex items-start justify-between gap-3 cursor-pointer`}>
                      {child.href ? (
                        <NavAnchor href={child.href} onClick={onClose} className="flex-1 min-w-0">
                          <p className={`font-bold text-base leading-snug transition-colors duration-150 ${childActive === child.label ? 'text-blue-400' : 'text-white group-hover:text-blue-400'}`}>{child.label}</p>
                          <p className="text-white/35 text-xs mt-1">{child.desc}</p>
                        </NavAnchor>
                      ) : (
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-base leading-snug transition-colors duration-150 ${childActive === child.label ? 'text-blue-400' : 'text-white'}`}>{child.label}</p>
                          <p className="text-white/35 text-xs mt-1">{child.desc}</p>
                        </div>
                      )}
                      {child.children ? (
                        <ChevronRight size={14} className={`mt-2 flex-shrink-0 transition-all duration-200 ${childActive === child.label ? 'translate-x-1 text-blue-400' : 'text-white/20'}`} />
                      ) : (
                        <ArrowRight size={15} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-150 flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PANEL 3 — grandchildren of active child (e.g. Governance sub-pages) */}
          {grandSubItems && (
            <div key={childActive} className="flex-1 flex flex-col justify-start" style={{ paddingTop: `${panel3TopOffset}px`, animation: 'fadeIn 0.2s ease both' }}>
              <p className="text-white/25 text-xs font-bold tracking-[4px] uppercase mb-6">{childActive}</p>
              <div className="flex flex-col gap-5">
                {grandSubItems.map((sub, i) => (
                  isPlaceholderHref(sub.href) ? (
                    <div key={sub.label} className="flex items-start gap-4 opacity-40 cursor-not-allowed"
                      style={{ animation: `slideUpFade 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}>
                      <div>
                        <p className="text-white font-bold text-base leading-tight">{sub.label}</p>
                        <p className="text-white/35 text-sm mt-1">{sub.desc} · Coming soon</p>
                      </div>
                    </div>
                  ) : (
                    <NavAnchor key={sub.label} href={sub.href!} onClick={onClose}
                      className="group flex items-start gap-4"
                      style={{ animation: `slideUpFade 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}>
                      <div>
                        <p className="text-white font-bold text-base leading-tight group-hover:text-blue-400 transition-colors duration-150">{sub.label}</p>
                        <p className="text-white/35 text-sm mt-1">{sub.desc}</p>
                      </div>
                      <ArrowRight size={15} className="text-white/20 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-150 flex-shrink-0 mt-1.5" />
                    </NavAnchor>
                  )
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom CTA */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-white/[0.07] mt-6"
          style={open ? { animation: `slideUpFade 0.5s cubic-bezier(0.16,1,0.3,1) ${NAV_ITEMS.length * 45 + 80}ms both` } : {}}>
          <a href="https://newhorizoncollegeofengineering.in/admissions/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-base font-bold px-6 py-3 rounded-full transition-colors">
            Apply Now 2026–27 <ArrowRight size={14} />
          </a>
          <a href="tel:+919880534935"
            className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/5 text-white text-sm font-medium px-6 py-3 rounded-full transition-colors">
            <Phone size={14} /> +91 98805 34935
          </a>
        </div>

      </div>
      </div>
    </div>
  );
}

/* ─── Animated hamburger icon ────────────────────────────── */

function HamburgerIcon({ open, solid: _solid }: { open: boolean; solid: boolean }) {
  const bar = `block h-0.5 rounded-full transition-all duration-300 origin-center bg-slate-800`;
  return (
    <div className="flex flex-col justify-center gap-[5px] w-6 h-6">
      <span className={`${bar} w-6 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
      <span className={`${bar} ml-auto ${open ? 'opacity-0 w-0' : 'w-4'}`} />
      <span className={`${bar} w-6 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────── */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const CENTER_NAV_ITEMS = [
    { label: 'Home',       href: '/' },
    { label: 'Programs',   href: '/programs' },
    { label: 'Admissions', href: '/admissions' },
    { label: 'Campus',     href: '/campus' },
    { label: 'Life at NHCE', href: '/life-at-nhce' },
    { label: 'Contact',    href: '/contact' },
  ];

  const isTabActive = (item: { label: string; href: string }) => {
    if (item.href === '/') {
      return location.pathname === '/' && location.hash === '';
    }
    if (item.href === '/campus') {
      return ['/campus', '/student-services', '/sports'].includes(location.pathname);
    }
    if (item.href === '/admissions') {
      return ['/admissions', '/academic-enrichment'].includes(location.pathname);
    }
    return location.pathname === item.href;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#') && location.pathname === '/') {
      const hash = href.substring(href.indexOf('#'));
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', hash);
      }
    }
  };

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const showSolid = scrolled || menuOpen;

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        showSolid ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}>
        <div className={`container-wide flex items-center justify-between transition-all duration-300 h-20 ${
          scrolled ? 'sm:h-16' : 'sm:h-28'
        }`}>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <img src="/main_logo.png" alt="NHCE" className={`w-auto object-contain transition-all duration-300 h-14 ${
              scrolled ? 'sm:h-11' : 'sm:h-20'
            } ${showSolid ? '' : 'drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]'}`} />
          </Link>

          {/* Center: Floating navigation dock (Veloura style) */}
          <div className={`hidden ${menuOpen ? 'lg:hidden' : 'lg:flex'} items-center p-1.5 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-transparent border border-transparent shadow-none'
              : 'bg-slate-50/80 backdrop-blur-md border border-slate-200/50 shadow-sm'
          }`}>
            {CENTER_NAV_ITEMS.map((item) => {
              const active = isTabActive(item);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                    active
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100/50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Apply Now + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://newhorizoncollegeofengineering.in/admissions/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800
                text-white text-base font-bold px-5 py-2 rounded-full transition-colors"
            >
              Apply Now <ArrowRight size={13} />
            </a>

            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                menuOpen
                  ? 'bg-slate-100 border-slate-200/80'
                  : 'bg-white border-slate-200 shadow-sm hover:bg-slate-50'
              }`}
            >
              <HamburgerIcon open={menuOpen} solid={showSolid} />
            </button>
          </div>

        </div>
      </header>

      <FullPageMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrolled={scrolled} />
    </>
  );
}
