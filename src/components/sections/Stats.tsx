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
    <div ref={ref} className="font-display font-black text-navy-950 leading-none"
      style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)' }}>
      {count.toLocaleString()}
      <span className="text-amber-500">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-white border-y border-slate-200">
      {/* Navy top accent line */}
      <div className="h-1 bg-navy-900" />

      <div className="container-wide">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-y md:divide-y-0 divide-slate-200">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-6 py-10 gap-2">
              <span className="text-2xl mb-1">{stat.icon}</span>
              <CountUp value={stat.value} suffix={stat.suffix} delay={i * 100} />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest leading-tight mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
