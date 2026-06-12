import { Calendar, Users, ArrowRight, Clock, Tag } from 'lucide-react';
import { EVENTS, NEWS } from '../../data/constants';
import MobileSlider from '../ui/MobileSlider';
import AnimateIn from '../ui/AnimateIn';

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

const categoryColors: Record<string, string> = {
  Rankings: 'bg-gold-100 text-gold-700',
  Research: 'bg-purple-100 text-purple-700',
  Placements: 'bg-green-100 text-green-700',
  Accreditation: 'bg-blue-100 text-blue-700',
};

const newsImages: Record<string, string> = {
  Rankings:      '/DSC01342.JPG',
  Research:      '/campus/idea_labs1.jpg',
  Placements:    '/img-4018.jpg',
  Accreditation: '/campus-hero.jpg',
};

export function News() {
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
          <button className="text-sm font-semibold text-navy-700 hover:text-navy-900 flex items-center gap-1 self-start sm:self-auto transition-colors">
            View All <ArrowRight size={14} />
          </button>
        </div>
        </AnimateIn>

        {/* 3 cards with images */}
        <AnimateIn variant="fade-up" delay={100}>
        <MobileSlider desktopClass="grid-cols-3 gap-5">
          {NEWS.slice(0, 3).map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden group cursor-pointer hover:shadow-xl hover:border-navy-200 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={newsImages[item.category]}
                  alt={item.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className={`absolute top-3 left-3 badge text-xs ${categoryColors[item.category] || 'bg-slate-100 text-slate-600'}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                  <Clock size={9} /> {item.date}
                </span>
                <h4 className="font-semibold text-navy-900 text-sm leading-snug mb-2 group-hover:text-navy-700 transition-colors flex-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">{item.desc}</p>
                <span className="text-xs font-semibold text-navy-600 flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                  Read More <ArrowRight size={11} />
                </span>
              </div>
            </div>
          ))}
        </MobileSlider>
        </AnimateIn>

      </div>
    </section>
  );
}
