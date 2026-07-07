import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Clock, Tag, Image as ImageIcon } from 'lucide-react';
import { EVENTS } from '../../data/constants';
import MobileSlider from '../ui/MobileSlider';
import AnimateIn from '../ui/AnimateIn';

const WP_BASE = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';

export function Events() {
  return (
    <section id="events" className="section-padding bg-slate-50">
      <div className="container-wide">
        <AnimateIn variant="fade-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="badge bg-blue-100 text-blue-700 mb-3">📅 Events & Fests</span>
            <h2 className="heading-md text-navy-950">
              What's{' '}
              <span className="text-gradient bg-gradient-to-r from-blue-700 to-indigo-600">Happening</span>
            </h2>
          </div>
          <button className="text-sm font-semibold text-navy-700 hover:text-navy-900 flex items-center gap-1 self-start md:self-auto">
            View Academic Calendar <ArrowRight size={14} />
          </button>
        </div>
        </AnimateIn>

        <AnimateIn variant="fade-up" delay={100}>
        <MobileSlider desktopClass="grid-cols-2 lg:grid-cols-4 gap-4">
          {EVENTS.map((event) => (
            <div key={event.title} className={`card overflow-hidden group cursor-pointer border ${event.color}`}>
              <div className="p-5">
                <span className={`badge text-xs mb-3 ${event.accent}`}>
                  <Tag size={9} /> {event.type}
                </span>
                <h4 className="font-semibold text-navy-900 text-sm leading-tight mb-2 group-hover:text-navy-700 transition-colors">
                  {event.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{event.desc}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} /> {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {event.attendees.toLocaleString()}+
                  </span>
                </div>
              </div>
            </div>
          ))}
        </MobileSlider>
        </AnimateIn>
      </div>
    </section>
  );
}

export function News() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch(
          `${WP_BASE}/posts?categories=11&per_page=3&order=desc&orderby=date&_fields=id,title,date,excerpt,featured_media,slug`
        );
        if (!res.ok) return;
        const data = await res.json();

        const withImages = await Promise.all(
          data.map(async (post: any) => {
            let imgUrl: string | null = null;
            if (post.featured_media) {
              try {
                const ir = await fetch(`${WP_BASE}/media/${post.featured_media}?_fields=source_url`);
                if (ir.ok) { const im = await ir.json(); imgUrl = im.source_url; }
              } catch {}
            }
            return { ...post, imgUrl };
          })
        );

        setPosts(withImages);
      } catch {}
      finally { setLoading(false); }
    };

    fetchLatestNews();
  }, []);

  const skeletons = Array.from({ length: 3 });

  return (
    <section id="news" className="section-padding bg-slate-50">
      <div className="container-wide">

        {/* Header */}
        <AnimateIn variant="fade-up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="badge bg-navy-100 text-navy-700 mb-3">📰 Latest News</span>
              <h2 className="heading-md text-navy-950">
                News &{' '}
                <span className="text-amber-500">Announcements</span>
              </h2>
            </div>
            <Link
              to="/news"
              className="text-sm font-semibold text-navy-700 hover:text-navy-900 flex items-center gap-1 self-start sm:self-auto transition-colors"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateIn>

        {/* Cards */}
        <AnimateIn variant="fade-up" delay={100}>
          <MobileSlider desktopClass="grid-cols-3 gap-5">

            {/* Loading skeletons */}
            {loading && skeletons.map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse flex flex-col">
                <div className="h-44 bg-slate-200" />
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-16 bg-slate-200 rounded mt-auto" />
                </div>
              </div>
            ))}

            {/* Live posts */}
            {!loading && posts.map((post) => (
              <Link
                key={post.id}
                to={`/news/${post.slug}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden group cursor-pointer hover:shadow-xl hover:border-navy-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {post.imgUrl ? (
                    <img
                      src={post.imgUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <ImageIcon size={28} className="text-slate-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                    <Clock size={9} />
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <h4
                    className="font-semibold text-navy-900 text-sm leading-snug mb-2 group-hover:text-navy-700 transition-colors flex-1 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                  />
                  {/* {post.excerpt?.rendered && (
                    <div
                      className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 [&_p]:m-0"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                  )} */}
                  <span className="text-xs font-semibold text-navy-600 flex items-center gap-1 group-hover:gap-2 transition-all duration-200 mt-auto">
                    Read More <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}

          </MobileSlider>
        </AnimateIn>

      </div>
    </section>
  );
}
