import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BASE_URL = 'https://newhorizoncollegeofengineering.in/wp-json/wp/v2';

export default function DetailPage() {
  const { category, slug } = useParams<{ category: string, slug: string }>();
  const location = useLocation();
  const isNewsRoute = location.pathname.startsWith('/news/');
  const backHref = isNewsRoute ? '/news' : '/life-at-nhce';
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/posts?slug=${slug}&_fields=id,title,date,content,featured_media`);
        if (!res.ok) throw new Error('Failed to load the article.');
        const data = await res.json();
        if (!data || data.length === 0) throw new Error('Article not found.');
        const postData = data[0];

        // Remove unwanted sidebar/footer text injected by WordPress
        let rawHTML = postData.content?.rendered || '';
        const unwantedPhrases = [
          'How do you want to be a Horizonite?',
          'Our Categories',
          'Follow Us on Social Media'
        ];
        
        let minCutoff = -1;
        for (const phrase of unwantedPhrases) {
          const idx = rawHTML.indexOf(phrase);
          if (idx !== -1 && (minCutoff === -1 || idx < minCutoff)) {
            minCutoff = idx;
          }
        }
        
        if (minCutoff !== -1) {
          const tagStart = rawHTML.lastIndexOf('<', minCutoff);
          rawHTML = rawHTML.substring(0, tagStart !== -1 ? tagStart : minCutoff);
        }

        // Parse the post content to extract and remove inline images
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = rawHTML;
        const contentImages = Array.from(tempDiv.querySelectorAll('img')).map(img => img.src);
        
        // Remove redundant category labels and titles injected by WP
        const decodeHTML = (html: string) => {
          const txt = document.createElement('textarea');
          txt.innerHTML = html;
          return txt.value;
        };
        const decodedTitle = postData.title?.rendered ? decodeHTML(postData.title.rendered).trim() : '';
        const categoriesToUpper = ['BLOG', 'NEWS', 'ACHIEVEMENTS', 'ALUMNI ACHIEVEMENTS', 'ALUMNI TALK', 'EDC NEWS', 'EXTRA CURRICULAR STUDENTS CLUBS'];

        tempDiv.querySelectorAll('*').forEach(el => {
          const text = el.textContent?.trim() || '';
          if (text === decodedTitle || categoriesToUpper.includes(text.toUpperCase())) {
            if (!el.querySelector('p, div, article, section')) {
              el.remove();
            }
          }
        });

        tempDiv.querySelectorAll('img').forEach(img => img.remove());
        const cleanedContent = tempDiv.innerHTML;

        let imgUrl = null;
        if (postData.featured_media) {
          try {
            const ir = await fetch(`${BASE_URL}/media/${postData.featured_media}?_fields=source_url`);
            if (ir.ok) {
              const im = await ir.json();
              imgUrl = im.source_url;
            }
          } catch {}
        }

        // Combine featured image and content images, removing any duplicates/nulls
        const allImages = Array.from(new Set([imgUrl, ...contentImages].filter(Boolean)));

        setPost({ ...postData, sliderImages: allImages, cleanedContent });
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching the news.');
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 pb-20 container-wide flex flex-col items-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center max-w-md w-full">
          <AlertCircle size={40} className="text-red-500 mb-4" />
          <h2 className="font-bold text-navy-900 text-xl mb-2">Article Not Found</h2>
          <p className="text-base text-red-600 mb-6">{error || 'The requested news article could not be found.'}</p>
          <Link to={backHref} className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-base font-semibold hover:bg-slate-50 transition-colors">
            {isNewsRoute ? 'Back to News' : 'Back to Life at NHCE'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-36 pb-20">
      <div className="container-wide max-w-4xl">
        <AnimateIn variant="fade-up">
          <article className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {post?.sliderImages?.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                slidesPerView={1}
                spaceBetween={4}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: Math.min(2, post.sliderImages.length),
                    slidesPerGroup: Math.min(2, post.sliderImages.length),
                  }
                }}
                className="w-full h-[300px] sm:h-[450px] bg-slate-100 [--swiper-navigation-size:18px] [--swiper-navigation-color:black] [&_.swiper-button-next]:bg-white [&_.swiper-button-next]:w-8 [&_.swiper-button-next]:h-8 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:shadow-md [&_.swiper-button-prev]:bg-white [&_.swiper-button-prev]:w-8 [&_.swiper-button-prev]:h-8 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:shadow-md"
              >
                {post.sliderImages.map((src: string, i: number) => (
                  <SwiperSlide key={i}>
                    <div className="h-full w-full overflow-hidden bg-slate-200">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            
            <div className="p-6 sm:p-10 lg:p-14">
              <h1 className="font-display font-black text-xl sm:text-2xl lg:text-2xl text-navy-950 leading-tight mb-8" dangerouslySetInnerHTML={{ __html: post.title?.rendered || 'Untitled' }} />
              
              <div 
                className="text-slate-600 leading-relaxed text-lg sm:text-base [&_p]:pb-[10px] [&_p]:mb-4 [&_h2]:font-bold [&_h2]:text-navy-900 [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:font-bold [&_h3]:text-navy-900 [&_h3]:text-xl [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_ul>li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-6 [&_ol>li]:mb-2 [&_a]:text-blue-600 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: post.cleanedContent || '' }}
              />
            </div>
          </article>
        </AnimateIn>
      </div>
    </div>
  );
}