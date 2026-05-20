import { useEffect, useState, useRef } from 'react';
import { STATS } from '../../data/constants';

function CountUp({ value, suffix, delay }: { value: number; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / 2000, 1);
        setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [visible, value, delay]);

  return (
    <div ref={ref} className="font-display font-black text-navy-950 leading-none text-3xl">
      {count.toLocaleString()}<span className="text-amber-500">{suffix}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-wide">

        {/* Main 2-column layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 xl:gap-16 items-center mb-10">

          {/* Left: text content */}
          <div>
            <h2 className="heading-lg text-navy-950 mb-5">
              25 Years of{' '}
              <span className="text-gradient bg-gradient-to-r from-navy-700 to-gold-500">
                Engineering Excellence
              </span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              New Horizon College of Engineering (NHCE) is a premier technical institution affiliated to
              Visvesvaraya Technological University (VTU), approved by AICTE, and accredited with the
              prestigious NAAC A+ grade — the highest achievable rating.
            </p>
            <p className="text-slate-600 leading-relaxed mb-7">
              Located in the heart of Bengaluru's tech hub, NHCE has consistently produced
              industry-ready engineers who lead at top companies globally. With state-of-the-art
              infrastructure, research centers, and an industry-aligned curriculum, we prepare students
              not just for jobs — but for careers that matter.
            </p>

            <div className="flex gap-3">
              <button className="btn-primary">Download Brochure</button>
              <button className="border border-slate-200 bg-white text-slate-700 hover:border-navy-400 hover:text-navy-700 text-sm font-medium px-6 py-3.5 rounded-full transition-all duration-300">
                Virtual Tour →
              </button>
            </div>
          </div>

          {/* Right: campus image with mission/vision overlay */}
          <div className="relative h-[460px] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="/campus.jpg"
              alt="NHCE Campus"
              className="w-full h-full object-cover"
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent" />

            {/* Mission & Vision overlaid at bottom */}
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2.5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                <div className="text-xl mb-2">🎯</div>
                <h4 className="font-display font-bold text-sm mb-1.5">Our Mission</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  To provide quality technical education and foster innovation, research, and ethical leadership.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white">
                <div className="text-xl mb-2">🔭</div>
                <h4 className="font-display font-bold text-sm mb-1.5">Our Vision</h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  To be a world-class institution recognized globally for academic excellence and industry partnership.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-slate-200 border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4 py-6 hover:bg-slate-50 transition-colors duration-200">
              <span className="text-2xl mb-2">{stat.icon}</span>
              <CountUp value={stat.value} suffix={stat.suffix} delay={i * 100} />
              <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mt-1.5 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
