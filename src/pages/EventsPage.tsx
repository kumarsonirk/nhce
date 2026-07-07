import { useState, useEffect } from 'react';
import {
  Calendar, ExternalLink, Search, ChevronRight,
  AlertCircle, Inbox, Image as ImageIcon, GraduationCap,
  Radio, CalendarClock, Building2, ListChecks, Loader2,
} from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

const BASE_URL = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';
const PER_PAGE = 20;

/* ─── Status taxonomy IDs — used only for department lookup, NOT for status.
       The "Happening/Upcoming/Expired" terms are assigned once at creation
       and go stale, so true status is computed below from each event's own
       Start/Finish Time text instead. ── */
const STATUS_TERM_IDS = [151, 152, 153];

const TABS = [
  { key: 'happening', label: 'Happening Now' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'past',      label: 'Concluded' },
] as const;
type TabKey = typeof TABS[number]['key'];

/* ─── Department pill colour palette — cycled deterministically by category id ── */

const PALETTE = [
  { pill: 'bg-indigo-50 text-indigo-700 border-indigo-200',  bar: 'bg-indigo-600' },
  { pill: 'bg-blue-50 text-blue-700 border-blue-200',        bar: 'bg-blue-600' },
  { pill: 'bg-amber-50 text-amber-700 border-amber-200',     bar: 'bg-amber-500' },
  { pill: 'bg-violet-50 text-violet-700 border-violet-200',  bar: 'bg-violet-600' },
  { pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'bg-emerald-600' },
  { pill: 'bg-rose-50 text-rose-700 border-rose-200',        bar: 'bg-rose-600' },
  { pill: 'bg-sky-50 text-sky-700 border-sky-200',           bar: 'bg-sky-600' },
  { pill: 'bg-teal-50 text-teal-700 border-teal-200',        bar: 'bg-teal-600' },
];
const deptStyle = (id: number) => PALETTE[id % PALETTE.length];

type CatTerm = { id: number; name: string; slug: string; count: number };

function decodeEntities(str: string) {
  const el = document.createElement('textarea');
  el.innerHTML = str;
  return el.value;
}

/* ─── Parse the real event window out of the post body ──────────────────
   NHCE's event template always renders "Start Time <time> <date> Finish
   Time <time> <date>" as plain text ahead of the description, in a couple
   of date-format variants (ordinals, abbreviations, upper/lowercase am/pm).
   The event_cat "Happening/Upcoming/Expired" terms are set once and never
   revisited, so they go stale — this is the only reliable source of truth
   for whether an event is actually live right now. ── */

const MONTHS: Record<string, number> = {
  jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
  may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
  sep: 8, sept: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10, dec: 11, december: 11,
};

function monthIndex(name: string) {
  const key = name.toLowerCase().replace(/\./g, '');
  if (MONTHS[key] !== undefined) return MONTHS[key];
  const abbr = key.slice(0, 3);
  return MONTHS[abbr] !== undefined ? MONTHS[abbr] : -1;
}

function parseTimePiece(str: string) {
  const m = str.match(/(\d{1,2})\s*:\s*(\d{2})\s*(AM|PM)/i);
  if (!m) return { h: 0, m: 0 };
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const ap = m[3].toUpperCase();
  if (ap === 'PM' && h !== 12) h += 12;
  if (ap === 'AM' && h === 12) h = 0;
  return { h, m: min };
}

function parseDatePiece(str: string) {
  const clean = str.replace(/(\d+)(st|nd|rd|th)/gi, '$1').replace(/,/g, ' ').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return null;
  let day: string, monthName: string;
  if (/^\d+$/.test(parts[0])) { day = parts[0]; monthName = parts[1]; }
  else { monthName = parts[0]; day = parts[1]; }
  const mIdx = monthIndex(monthName);
  if (mIdx === -1 || !/^\d+$/.test(day)) return null;
  return { day: parseInt(day, 10), monthIdx: mIdx };
}

function wordSet(s: string) {
  return new Set(s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
}

/* Some posts on the source site have their body copy-pasted from a
   different event (title updated, content left stale). Guard against
   that by requiring the content's own embedded heading to actually
   share vocabulary with the post title before trusting its dates. */
function headingMatchesTitle(heading: string, title: string) {
  const a = wordSet(heading);
  const b = wordSet(title);
  if (a.size === 0 || b.size === 0) return true;
  let overlap = 0;
  a.forEach(w => { if (b.has(w)) overlap++; });
  return overlap / Math.min(a.size, b.size) >= 0.3;
}

function extractEventRange(html: string, title: string) {
  if (!html) return null;
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const startIdx = text.search(/Start Time/i);
  const finishIdx = text.search(/Finish Time/i);
  if (startIdx === -1 || finishIdx === -1 || finishIdx < startIdx) return null;

  const heading = text.slice(0, startIdx).replace(/^EVENTS\s*/i, '').trim();
  if (!headingMatchesTitle(heading, title)) return null;

  const yearRe = /\b(20\d{2})\b/g;
  const years: { val: string; idx: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = yearRe.exec(text))) years.push({ val: m[1], idx: m.index });

  const startYearObj = years.find(y => y.idx > startIdx && y.idx < finishIdx);
  const finishYearObj = years.find(y => y.idx >= finishIdx);
  if (!startYearObj || !finishYearObj) return null;

  const startBlock = text.slice(startIdx, startYearObj.idx + 4);
  const finishBlock = text.slice(finishIdx, finishYearObj.idx + 4);
  const descStart = finishYearObj.idx + 4;

  const time1 = parseTimePiece(startBlock);
  const time2 = parseTimePiece(finishBlock);

  const datePart1 = startBlock.replace(/Start Time/i, '').replace(/\d{1,2}\s*:\s*\d{2}\s*(AM|PM)/i, '').replace(startYearObj.val, '').trim();
  const datePart2 = finishBlock.replace(/Finish Time/i, '').replace(/\d{1,2}\s*:\s*\d{2}\s*(AM|PM)/i, '').replace(finishYearObj.val, '').trim();

  const d1 = parseDatePiece(datePart1);
  const d2 = parseDatePiece(datePart2);
  if (!d1 || !d2) return null;

  const start = new Date(parseInt(startYearObj.val, 10), d1.monthIdx, d1.day, time1.h, time1.m);
  const end = new Date(parseInt(finishYearObj.val, 10), d2.monthIdx, d2.day, time2.h, time2.m);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

  const description = decodeEntities(text.slice(descStart).trim());
  return { start, end, description };
}

function classify(ev: any): { status: TabKey; start: Date; end: Date; description: string } {
  const range = extractEventRange(ev.content?.rendered || '', ev.title?.rendered || '');
  const now = new Date();
  if (range) {
    const status: TabKey = now < range.start ? 'upcoming' : now <= range.end ? 'happening' : 'past';
    return { status, ...range };
  }
  const postDate = new Date(ev.date);
  return { status: postDate < now ? 'past' : 'upcoming', start: postDate, end: postDate, description: '' };
}

function formatRange(start: Date, end: Date) {
  const sameDay = start.toDateString() === end.toDateString();
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  if (sameDay) return start.toLocaleDateString('en-IN', opts);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  const startStr = start.toLocaleDateString('en-IN', sameMonth ? { day: 'numeric' } : opts);
  const endStr = end.toLocaleDateString('en-IN', opts);
  return `${startStr} – ${endStr}`;
}

export default function EventsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── Taxonomy (departments — stable, not time-sensitive) ── */
  const [categories, setCategories] = useState<CatTerm[]>([]);
  const [totalEvents, setTotalEvents] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/event_cat?per_page=100&_fields=id,name,slug,count`);
        if (res.ok) setCategories(await res.json());
      } catch (e) {
        console.error('Failed to fetch event categories', e);
      }
    })();
    (async () => {
      try {
        const res = await fetch(`${BASE_URL}/event?per_page=1&_fields=id`);
        if (res.ok) setTotalEvents(parseInt(res.headers.get('X-WP-Total') || '0'));
      } catch (e) {
        console.error('Failed to fetch total event count', e);
      }
    })();
  }, []);

  const catById = (id: number) => categories.find(c => c.id === id);
  const deptCategories = categories.filter(c => !STATUS_TERM_IDS.includes(c.id) && c.count > 0);

  /* ── Pool: fetch recent events (with body content), classify client-side ── */
  const [pool, setPool] = useState<any[]>([]);
  const [wpPage, setWpPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('happening');

  async function withImage(ev: any) {
    let imgUrl: string | null = null;
    if (ev.featured_media) {
      try {
        const ir = await fetch(`${BASE_URL}/media/${ev.featured_media}?_fields=source_url`);
        if (ir.ok) imgUrl = (await ir.json()).source_url;
      } catch {}
    }
    return { ...ev, imgUrl };
  }

  const loadPage = async (nextPage: number, reset: boolean) => {
    reset ? setLoading(true) : setLoadingMore(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        per_page: PER_PAGE.toString(),
        page: nextPage.toString(),
        order: 'desc',
        orderby: 'date',
        _fields: 'id,slug,title,link,date,event_cat,featured_media,content',
      });
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`${BASE_URL}/event?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} — Failed to fetch events.`);

      const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1');
      const data = await res.json();
      const withImages = await Promise.all(data.map(withImage));
      const classified = withImages.map((ev: any) => ({ ...ev, _c: classify(ev) }));

      setPool(prev => (reset ? classified : [...prev, ...classified]));
      setWpPage(nextPage);
      setHasMore(nextPage < totalPages);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching events.');
      if (reset) setPool([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => { loadPage(1, true); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [search]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    loadPage(1, true);
  };

  const happening = pool.filter(e => e._c.status === 'happening').sort((a, b) => b._c.start - a._c.start);
  const upcoming  = pool.filter(e => e._c.status === 'upcoming').sort((a, b) => a._c.start - b._c.start);
  const past      = pool.filter(e => e._c.status === 'past').sort((a, b) => b._c.end - a._c.end);
  const buckets: Record<TabKey, any[]> = { happening, upcoming, past };
  const shown = buckets[activeTab];

  const spotlight = happening[0];


  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="/campus.jpg"
        badge="Campus Events · Silver Jubilee Year 2025–26"
        headingSmall="Where Ideas"
        headingMain="Come Alive"
        headingGhost="Across Campus"
        description="Distinguished lectures, faculty development programmes, conferences and hands-on workshops — a live look at how NHCE's departments learn, build and celebrate together."
        button={{ label: 'Browse Events', onClick: () => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }) }}
        secondaryButton={{ label: 'Read Latest News', to: '/news' }}
      />



      {/* ══════════════════════════════════════════════════════
          SPOTLIGHT — HAPPENING NOW
      ══════════════════════════════════════════════════════ */}
      {!loading && spotlight && (
        <section className="py-14 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
          <div className="container-wide">
            <AnimateIn variant="fade-up">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-6 sm:p-10 lg:p-14">
                {/* Decorative blobs */}
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-rose-500/10 rounded-full pointer-events-none" />

                <div className="relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-14 items-center">
                  <div className="lg:col-span-3">
                    <span className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-400/30 text-rose-300 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-400" />
                      </span>
                      Happening Now
                    </span>
                    <h2
                      className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug mb-4"
                      dangerouslySetInnerHTML={{ __html: spotlight.title?.rendered || 'Untitled Event' }}
                    />
                    {spotlight._c.description && (
                      <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xl line-clamp-3">
                        {spotlight._c.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                      <span className="inline-flex items-center gap-1.5 text-white/70 text-xs font-semibold">
                        <Calendar size={13} className="text-rose-300" />
                        {formatRange(spotlight._c.start, spotlight._c.end)}
                      </span>
                    </div>
                    <a
                      href={spotlight.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-navy-950 font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors"
                    >
                      View Event Details
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  <div className="lg:col-span-2 flex justify-center">
                    <div className="w-full h-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                      {spotlight.imgUrl ? (
                        <img src={spotlight.imgUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <GraduationCap size={40} className="text-rose-300" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          EVENTS — SEARCH, STATUS TABS & GRID
      ══════════════════════════════════════════════════════ */}
      <section id="events" className="py-14 lg:py-20 bg-slate-50 scroll-mt-20">
        <div className="container-wide">

          <AnimateIn variant="fade-up">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-navy-50 border border-navy-100 text-navy-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-navy-700" />
                Live Events Calendar
              </span>
              <h2 className="font-display font-bold text-navy-950 text-xl lg:text-3xl mb-3">
                Browse Events
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
                Distinguished lectures, workshops, conferences and campus initiatives — pulled live from NHCE's own events calendar.
              </p>
            </div>
          </AnimateIn>

          {/* Search */}
          <AnimateIn variant="fade-up" delay={60}>
            <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto mb-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events, departments…"
                className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500/20 focus:border-navy-400 transition-all"
              />
            </form>
          </AnimateIn>

          {/* Status tabs */}
          <AnimateIn variant="fade-up" delay={100}>
            <div className="flex gap-2 flex-wrap justify-center mb-10">
              {TABS.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-200 ${
                    activeTab === t.key
                      ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-navy-300 hover:text-navy-700'
                  }`}
                >
                  {t.label}
                  {!loading && (
                    <span className={`ml-1.5 ${activeTab === t.key ? 'text-white/50' : 'text-slate-400'}`}>
                      · {buckets[t.key].length}{t.key === 'past' && hasMore ? '+' : ''}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Status bar */}
          <AnimateIn variant="fade-up" delay={140}>
            <p className="text-center text-xs text-slate-400 font-medium mb-12 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {loading
                ? 'Fetching events…'
                : shown.length > 0
                  ? `Showing ${shown.length} ${TABS.find(t => t.key === activeTab)!.label.toLowerCase()} event${shown.length !== 1 ? 's' : ''}`
                  : 'No events found.'}
            </p>
          </AnimateIn>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3 text-red-700 max-w-2xl mx-auto">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <strong className="block font-bold mb-1">Could not load events</strong>
                <span className="text-sm text-red-600">{error}</span>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loading ? (
              Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden animate-pulse">
                  <div className="h-40 w-full bg-slate-200" />
                  <div className="p-5 flex flex-col gap-3">
                    <div className="h-4 w-1/3 bg-slate-200 rounded-full" />
                    <div className="h-5 w-full bg-slate-200 rounded" />
                    <div className="h-5 w-4/5 bg-slate-200 rounded" />
                    <div className="h-8 w-full bg-slate-200 rounded-xl mt-4" />
                  </div>
                </div>
              ))
            ) : shown.length > 0 ? (
              shown.map((ev, i) => <EventCard key={ev.id} ev={ev} i={i} catById={catById} />)
            ) : !error ? (
              <div className="col-span-full text-center py-16">
                <Inbox size={36} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">
                  {activeTab === 'upcoming'
                    ? 'No events are scheduled for the future right now — check back soon.'
                    : 'No events match this filter.'}
                </p>
              </div>
            ) : null}
          </div>

          {/* Load more — only meaningful for Concluded; Happening/Upcoming are
              already fully captured by the recent pool */}
          {!loading && hasMore && activeTab === 'past' && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => loadPage(wpPage + 1, false)}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-navy-300 hover:text-navy-700 text-slate-600 px-6 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-60"
              >
                {loadingMore ? <Loader2 size={15} className="animate-spin" /> : null}
                {loadingMore ? 'Loading…' : 'Load More Events'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DISCOVER MORE
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-display text-xl lg:text-3xl font-bold text-navy-950 mb-3">
                More Happenings at NHCE
              </h2>
              <p className="text-slate-500 text-sm max-w-lg mx-auto">
                Events at NHCE go beyond academics — explore what else is happening on campus.
              </p>
            </div>
          </AnimateIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { label: 'Counselling Events',  desc: 'Workshops & awareness programs for student wellness', to: '/counselling-events',   color: 'bg-rose-50 border-rose-100 text-rose-600' },
              { label: 'Cultural Activities', desc: 'Fests, celebrations and campus performances',          to: '/cultural-activities', color: 'bg-violet-50 border-violet-100 text-violet-600' },
              { label: 'Celebrity Diaries',   desc: 'Notable guests and celebrity visits to NHCE',           to: '/celebrity-diaries',  color: 'bg-amber-50 border-amber-100 text-amber-600' },
            ].map((d, i) => (
              <AnimateIn key={d.label} variant="fade-up" delay={i * 80}>
                <a
                  href={d.to}
                  className={`group flex items-center justify-between gap-3 p-5 rounded-2xl border h-full hover:-translate-y-1 hover:shadow-card transition-all duration-300 ${d.color}`}
                >
                  <div>
                    <p className="font-bold text-navy-950 text-sm mb-1">{d.label}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{d.desc}</p>
                  </div>
                  <ChevronRight size={16} className="flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </a>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Event Card ─────────────────────────────────────────────── */

function EventCard({ ev, i, catById }: { ev: any; i: number; catById: (id: number) => CatTerm | undefined }) {
  const deptId = (ev.event_cat as number[] | undefined)?.find(id => !STATUS_TERM_IDS.includes(id));
  const dept = deptId !== undefined ? catById(deptId) : undefined;
  const style = deptId !== undefined ? deptStyle(deptId) : { pill: 'bg-slate-50 text-slate-600 border-slate-200', bar: 'bg-slate-400' };
  const isHappening = ev._c.status === 'happening';

  const { start, end, description } = ev._c;
  const day = start.toLocaleDateString('en-IN', { day: 'numeric' });
  const month = start.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  const year = start.getFullYear();

  return (
    <AnimateIn variant="fade-up" delay={i * 40}>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">

        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">
          {ev.imgUrl ? (
            <img src={ev.imgUrl} alt="" loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={28} className="text-slate-300" />
          )}
          {isHappening && (
            <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider text-rose-600 px-2 py-1 rounded-full shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-600" />
              </span>
              Live
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col flex-1">

          {/* Department pill */}
          <div className="mb-4">
            <span className={`inline-block max-w-full truncate text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${style.pill}`}>
              {dept?.name ? decodeEntities(dept.name) : 'NHCE'}
            </span>
          </div>

          {/* Date + Title */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 rounded-xl overflow-hidden border border-slate-100 text-center">
              <div className={`${style.bar} py-0.5`}>
                <span className="text-[9px] font-black text-white uppercase tracking-wider">{month}</span>
              </div>
              <div className="bg-white pt-1 pb-1">
                <div className="text-navy-950 font-black text-lg leading-none">{day}</div>
                <div className="text-slate-400 text-[9px] font-semibold">{year}</div>
              </div>
            </div>

            <h3
              className="font-display font-bold text-navy-950 text-sm leading-snug flex-1 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: ev.title?.rendered || 'Untitled Event' }}
            />
          </div>

          {/* {description && (
            <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-3">{description}</p>
          )} */}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
            <p className="text-slate-400 text-[10px] font-semibold">{formatRange(start, end)}</p>
            <a
              href={ev.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl border border-navy-200 bg-navy-50 hover:bg-navy-700 hover:border-navy-700 hover:text-white text-navy-700 text-xs font-bold transition-all duration-200"
            >
              <ExternalLink size={13} className="flex-shrink-0" />
              View Event
            </a>
          </div>
        </div>
      </div>
    </AnimateIn>
  );
}
