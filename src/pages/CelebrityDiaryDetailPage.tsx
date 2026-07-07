import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, AlertCircle } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';

const BASE_URL = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';

export default function CelebrityDiaryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost]     = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_fields=id,title,date,content,featured_media`);
        if (!res.ok) throw new Error('Failed to load the profile.');
        const data = await res.json();
        if (!data?.length) throw new Error('Profile not found.');
        const postData = data[0];

        /* ── Clean content HTML ── */
        let rawHTML = postData.content?.rendered || '';

        // Strip WP sidebar / footer injections
        const cutPhrases = ['How do you want to be a Horizonite?', 'Our Categories', 'Follow Us on Social Media'];
        let cutIdx = -1;
        for (const phrase of cutPhrases) {
          const i = rawHTML.indexOf(phrase);
          if (i !== -1 && (cutIdx === -1 || i < cutIdx)) cutIdx = i;
        }
        if (cutIdx !== -1) {
          const tagStart = rawHTML.lastIndexOf('<', cutIdx);
          rawHTML = rawHTML.substring(0, tagStart !== -1 ? tagStart : cutIdx);
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHTML;

        // Remove all images (shown separately as featured image)
        tempDiv.querySelectorAll('img').forEach(img => img.remove());

        // Decode post title to match and remove duplicates from content
        const decodeHTML = (html: string) => {
          const el = document.createElement('textarea');
          el.innerHTML = html;
          return el.value;
        };
        const decodedTitle = decodeHTML(postData.title?.rendered || '').trim();

        // Remove duplicate title, "CELEBRITY DIARIES" label, and "MEMBERS" injections
        tempDiv.querySelectorAll('*').forEach(el => {
          const text = el.textContent?.trim() || '';
          if (
            text === decodedTitle ||
            text.toUpperCase() === 'CELEBRITY DIARIES' ||
            text.toUpperCase() === 'MEMBERS'
          ) {
            if (!el.querySelector('p, div, article, section')) el.remove();
          }
        });

        const cleanedContent = tempDiv.innerHTML;

        /* ── Fetch featured image ── */
        let imgUrl: string | null = null;
        if (postData.featured_media) {
          try {
            const ir = await fetch(`${BASE_URL}/media/${postData.featured_media}?_fields=source_url`);
            if (ir.ok) { const im = await ir.json(); imgUrl = im.source_url; }
          } catch {}
        }

        setPost({ ...postData, imgUrl, cleanedContent });
      } catch (err: any) {
        setError(err.message || 'An error occurred.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  /* ── Error ── */
  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 pb-20 container-wide flex flex-col items-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-500 mb-4" />
          <h2 className="font-bold text-navy-900 text-xl mb-2">Profile Not Found</h2>
          <p className="text-base text-red-600 mb-6">{error}</p>
          <Link to="/celebrity-diaries"
            className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-base font-semibold hover:bg-slate-50 transition-colors">
            Back to Celebrity Diaries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="container-wide max-w-5xl">

        {/* Back link */}
        <Link
          to="/celebrity-diaries"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-navy-800 text-sm font-semibold mb-6 transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          Back to Celebrity Diaries
        </Link>

        <AnimateIn variant="fade-up">
          <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">

              {/* ── Left: Portrait image ── */}
              {post.imgUrl && (
                <div className="md:w-[38%] flex-shrink-0 bg-slate-100 max-h-[560px] md:max-h-none overflow-hidden">
                  <img
                    src={post.imgUrl}
                    alt={post.title?.rendered || ''}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              {/* ── Right: Structured content ── */}
              <div className="flex-1 p-8 md:p-10 lg:p-14 flex flex-col justify-center">

                {/* Date badge */}
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 mb-5">
                  <Calendar size={13} className="text-amber-500" />
                  {new Date(post.date).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'long', year: 'numeric',
                  })}
                </div>

                {/* Name / Title */}
                <h1
                  className="font-display font-black text-2xl sm:text-3xl text-navy-950 leading-tight mb-6"
                  dangerouslySetInnerHTML={{ __html: post.title?.rendered || '' }}
                />

                {/* Cleaned post body */}
                <div
                  className="
                    text-slate-600 leading-relaxed
                    [&_p]:mb-3 [&_p]:text-base [&_p]:leading-relaxed
                    [&_strong]:font-bold [&_strong]:text-navy-900
                    [&_h1]:hidden [&_h2]:hidden
                    [&_h3]:text-navy-800 [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-5 [&_h3]:mb-2
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul>li]:mb-1.5
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4
                    [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800
                    [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500
                  "
                  dangerouslySetInnerHTML={{ __html: post.cleanedContent }}
                />

              </div>
            </div>
          </article>
        </AnimateIn>

      </div>
    </div>
  );
}
