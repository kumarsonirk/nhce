import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronLeft, ChevronRight, AlertCircle, Inbox, Image as ImageIcon } from 'lucide-react';
import HeroSection from '../components/ui/HeroSection';
import AnimateIn from '../components/ui/AnimateIn';

const BASE_URL = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';
const CATEGORY_ID = 13; // "members" — houses all celebrity/notable-guest posts
const PER_PAGE = 12;

export default function CelebrityDiariesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [posts, setPosts]           = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = async (currentPage: number, scrollToPosts = false) => {
    setLoading(true);
    setError(null);
    setPage(currentPage);

    if (scrollToPosts) {
      document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const params = new URLSearchParams({
        categories: CATEGORY_ID.toString(),
        per_page:   PER_PAGE.toString(),
        page:       currentPage.toString(),
        order:      'desc',
        orderby:    'date',
        _fields:    'id,title,date,excerpt,featured_media,slug',
      });

      const res = await fetch(`${BASE_URL}/posts?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status} — Failed to fetch posts.`);

      setTotalPages(parseInt(res.headers.get('X-WP-TotalPages') || '1'));
      setTotalPosts(parseInt(res.headers.get('X-WP-Total')      || '0'));

      const data = await res.json();

      if (!data.length) { setPosts([]); setLoading(false); return; }

      // Fetch featured images in parallel
      const withImages = await Promise.all(data.map(async (post: any) => {
        let imgUrl: string | null = null;
        if (post.featured_media) {
          try {
            const ir = await fetch(`${BASE_URL}/media/${post.featured_media}?_fields=source_url`);
            if (ir.ok) { const im = await ir.json(); imgUrl = im.source_url; }
          } catch {}
        }
        return { ...post, imgUrl };
      }));

      setPosts(withImages);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching profiles.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(1); }, []);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <HeroSection
        image="/campus-hero.jpg"
        badge="Celebrity Diaries · NHCE"
        headingSmall="New Horizon College of Engineering"
        headingMain="Celebrity Diaries"
        headingGhost="Notable Guests"
        description="Inspiring stories, achievements and memorable interactions with celebrities, dignitaries, and notable personalities who have graced NHCE."
        button={{ label: 'Explore Profiles', onClick: () => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' }) }}
      />

      <div id="posts" className="container-wide py-12 scroll-mt-20">

        {/* ── Status bar ── */}
        <AnimateIn variant="fade-up">
          <div className="flex items-center justify-between mb-8">
            <p className="text-base text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              {loading
                ? 'Loading profiles…'
                : posts.length > 0
                  ? `Showing ${posts.length} of ${totalPosts} profiles · Page ${page} of ${totalPages}`
                  : 'No profiles found.'}
            </p>
          </div>
        </AnimateIn>

        {/* ── Error ── */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8 flex items-start gap-3 text-red-700">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <div>
              <strong className="block font-bold mb-1">Could not load profiles</strong>
              <span className="text-base text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {/* Skeleton */}
          {loading && Array.from({ length: PER_PAGE }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
              <div className="h-56 bg-slate-200" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-3 w-1/3 bg-slate-200 rounded" />
                <div className="h-5 w-full bg-slate-200 rounded" />
                <div className="h-4 w-4/5 bg-slate-200 rounded" />
              </div>
            </div>
          ))}

          {/* Posts */}
          {!loading && posts.map((post) => (
            <AnimateIn key={post.id} variant="fade-up">
              <Link
                to={`/celebrity-diaries/${post.slug}`}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                {/* Cover image */}
                <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {post.imgUrl ? (
                    <img
                      src={post.imgUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <ImageIcon size={32} className="text-slate-300" />
                  )}
                  {/* <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-navy-700 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    Celebrity
                  </div> */}
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 mb-2">
                    <Calendar size={13} className="text-amber-500" />
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div> */}

                  <h2
                    className="font-bold text-navy-900 text-base leading-snug group-hover:text-blue-700 transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }}
                  />

                  {/* {post.excerpt?.rendered && (
                    <div
                      className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  )} */}

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:text-blue-800 transition-colors">
                      Read Profile
                      <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        {/* ── Empty state ── */}
        {!loading && !error && posts.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Inbox size={24} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-navy-900 mb-1">No profiles found</h3>
            <p className="text-base text-slate-500">Check back later for celebrity profiles.</p>
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => fetchPosts(page - 1, true)}
              disabled={page <= 1}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 px-4 py-2.5 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="text-base font-semibold text-slate-500">Page {page} of {totalPages}</span>
            <button
              onClick={() => fetchPosts(page + 1, true)}
              disabled={page >= totalPages}
              className="flex items-center gap-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600 px-4 py-2.5 rounded-xl text-base font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
