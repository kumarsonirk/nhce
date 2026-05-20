import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../../data/constants';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const prev = () => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive(a => (a + 1) % TESTIMONIALS.length);
  const t = TESTIMONIALS[active];

  return (
    <section className="section-padding bg-gradient-to-br from-navy-950 to-navy-800 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide relative z-10">
        <div className="text-center mb-12">
          <span className="badge bg-white/10 text-white mb-3">Alumni Voices</span>
          <h2 className="heading-md text-white mb-3">
            Success Stories That{' '}
            <span className="text-gradient bg-gradient-to-r from-gold-400 to-amber-300">Inspire</span>
          </h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            Hear from NHCE alumni who are shaping industries and leading teams at the world's top companies.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="glass rounded-3xl p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-display font-black text-2xl shadow-xl`}>
                  {t.avatar}
                </div>
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-white/50 text-xs">{t.dept} Batch {t.batch}</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <Quote className="text-gold-400/40 mb-4" size={40} />
                <p className="text-white/80 leading-relaxed text-base md:text-lg italic mb-6">
                  "{t.quote}"
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-white">
                    🏢 {t.company}
                  </div>
                  <div className="glass rounded-full px-4 py-1.5 text-xs font-semibold text-white">
                    💼 {t.role}
                  </div>
                  <div className="bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-gold-300">
                    💰 {t.package}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/15 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Thumbnail previews */}
            <div className="flex gap-3">
              {TESTIMONIALS.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 ${i === active ? 'scale-110' : 'opacity-50 hover:opacity-75'}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonial.avatar}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:bg-white/15 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/50 text-sm mb-4">Join 50,000+ NHCE alumni making a difference worldwide</p>
          <button className="btn-gold">Explore Alumni Network</button>
        </div>
      </div>
    </section>
  );
}
