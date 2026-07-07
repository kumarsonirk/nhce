import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, Inbox, ExternalLink, Image as ImageIcon } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

const BASE_URL = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';
const TARGET_CATEGORIES = [11, 34, 22, 156, 21, 180, 141, 155, 13, 18, 14, 1];

export default function LifeAtNHCEPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(TARGET_CATEGORIES[0].toString());

  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/categories?per_page=100&_fields=id,name,slug,count`);
        if (res.ok) {
          const data = await res.json();
          const filtered = data.filter((c: any) => TARGET_CATEGORIES.includes(c.id));
          filtered.sort((a: any, b: any) => TARGET_CATEGORIES.indexOf(a.id) - TARGET_CATEGORIES.indexOf(b.id));
          setCategories(filtered);
        }
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };
    fetchCategories();
  }, []);

  // Pagination & Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState('?');
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState('9');
  const [order, setOrder] = useState('desc');

  const fetchPosts = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    setPage(currentPage);

    try {
      const params = new URLSearchParams({
        categories: activeCategoryId,
        per_page: perPage,
        page: currentPage.toString(),
        order: order,
        orderby: 'date',
        _fields: 'id,title,date,excerpt,link,featured_media,_links,slug'
      });
      if (search.trim()) params.set('search', search.trim());

      const res = await fetch(`${BASE_URL}/posts?${params}`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} — Failed to fetch posts.`);
      }

      setTotalPages(parseInt(res.headers.get('X-WP-TotalPages') || '1'));
      setTotalPosts(res.headers.get('X-WP-Total') || '0');

      const data = await res.json();

      if (!data.length) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Fetch images concurrently
      const withImages = await Promise.all(data.map(async (post: any) => {
        let imgUrl = null;
        if (post.featured_media) {
          try {
            const ir = await fetch(`${BASE_URL}/media/${post.featured_media}?_fields=source_url`);
            if (ir.ok) {
              const im = await ir.json();
              imgUrl = im.source_url;
            }
          } catch {}
        }
        return { ...post, imgUrl };
      }));

      setPosts(withImages);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching news.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when activeCategory, perPage or order changes
  useEffect(() => {
    fetchPosts(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategoryId, perPage, order]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    fetchPosts(1);
  };

  const handleTabClick = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setTimeout(() => {
      const element = document.getElementById('news-content');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSection
        image="/campus-hero.jpg"
        badge="Life at NHCE"
        headingSmall="All updates in one place"
        headingMain="Life"
        headingGhost="at NHCE"
        description="Explore the latest happenings, research breakthroughs, events, and announcements from New Horizon College of Engineering."
        button={{ label: 'Read Latest', onClick: () => document.getElementById('news-content')?.scrollIntoView({ behavior: 'smooth' }) }}
      />

      {/* ── Categories Tabs (Always Sticky below the navbar) ── */}
      {categories.length > 0 && (
        <div className="sticky top-[80px] sm:top-[64px] z-30 bg-white border-b border-slate-200 shadow-sm py-3">
          <div className="container-wide">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(cat.id.toString())}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-base font-semibold transition-colors border ${
                    activeCategoryId === cat.id.toString()
                      ? 'bg-navy-900 text-white border-navy-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-navy-900'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Search & Filter Form (Scrolls away) ── */}
      <div id="news-content" className="bg-white border-b border-slate-100 py-4 scroll-mt-[140px] sm:scroll-mt-[124px]">
        <div className="container-wide">
          <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search news and events..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <div className="flex items-center flex-wrap gap-3 flex-shrink-0 w-full sm:w-auto">
              <select
                value={perPage}
                onChange={(e) => setPerPage(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all flex-1 sm:flex-none cursor-pointer"
              >
                <option value="6">6 per page</option>
                <option value="9">9 per page</option>
                <option value="12">12 per page</option>
              </select>
              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all flex-1 sm:flex-none cursor-pointer"
              >
                <option value="desc">Newest first</option>
                <option value="asc">Oldest first</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-none disabled:opacity-70"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                <span className="hidden sm:inline">Load Posts</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container-wide py-10">
        {/* ── Status Bar ── */}
        <AnimateIn variant="fade-up">
          <div className="flex items-center justify-between mb-8">
            <p className="text-base text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {loading
                ? 'Fetching posts'
                : posts.length > 0
                ? `Showing ${posts.length} of ${totalPosts} posts · Page ${page} of ${totalPages}`
                : 'No posts found.'}
            </p>
          </div>
        </AnimateIn>

        {/* ── Error State ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3 text-red-700">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block font-bold mb-1">Could not load posts</strong>
              <span className="text-base text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: parseInt(perPage) }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
                <div className="h-48 bg-slate-200" />
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div className="h-3 w-1/3 bg-slate-200 rounded" />
                  <div className="h-5 w-full bg-slate-200 rounded" />
                  <div className="h-5 w-5/6 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded mt-2" />
                  <div className="mt-auto pt-4"><div className="h-8 w-28 bg-slate-200 rounded-lg" /></div>
                </div>
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => {
              const activeCategory = categories.find(c => c.id.toString() === activeCategoryId);
              const categorySlug = activeCategory?.slug || 'news';
              return (
              <AnimateIn key={post.id} variant="fade-up">
                <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                  <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {post.imgUrl ? (
                      <img src={post.imgUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <ImageIcon size={32} className="text-slate-300" />
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {activeCategory?.name || 'Update'}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 mb-3">
                      <Calendar size={13} className="text-amber-500" />
                      {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h2 className="font-bold text-navy-900 text-lg leading-snug mb-3 group-hover:text-blue-700 transition-colors line-clamp-3" dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }} />
                    <div className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-3 flex-1" dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || 'Read the full article for more details.' }} />
                    <div className="mt-auto border-t border-slate-100 pt-4">
                      <Link to={`/life-at-nhce/${categorySlug}/${post.slug}`} className="inline-flex items-center gap-1.5 text-base font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link">
                        Read Article <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              </AnimateIn>
              );
            })
          ) : null}
        </div>

        {/* ── Empty State ── */}
        {!loading && !error && posts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4"><Inbox size={24} className="text-slate-400" /></div>
            <h3 className="text-lg font-bold text-navy-900 mb-1">No posts found</h3>
            <p className="text-base text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={() => fetchPosts(page - 1)} disabled={page <= 1} className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 px-4 py-2.5 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none"><ChevronLeft size={16} /> Prev</button>
            <span className="text-base font-semibold text-slate-500">Page {page} of {totalPages}</span>
            <button onClick={() => fetchPosts(page + 1)} disabled={page >= totalPages} className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 px-4 py-2.5 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none">Next <ChevronRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}