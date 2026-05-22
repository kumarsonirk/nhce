import { useState } from 'react';
import { Users, TrendingUp, Building2 } from 'lucide-react';
import { RECRUITERS } from '../../data/constants';

function LogoCard({ name, logo }: { name: string; logo: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex-shrink-0 mx-3 flex items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 h-24 w-52 overflow-hidden relative group hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-default">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-5 py-4">
          <div className="w-full h-4 rounded-md bg-slate-200 animate-pulse" />
          <div className="w-3/4 h-3 rounded-md bg-slate-100 animate-pulse" />
        </div>
      )}
      <img
        src={logo}
        alt={name}
        onLoad={() => setLoaded(true)}
        className={`max-h-24 max-w-[160px] w-full object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default function PlacementPartners() {
  const half = Math.ceil(RECRUITERS.length / 2);
  const row1 = RECRUITERS.slice(0, half);
  const row2 = RECRUITERS.slice(half);

  return (
    <section id="placements" className="section-padding bg-white overflow-hidden">
      <div className="container-wide">
        <div className="text-center mb-10">
          <span className="badge bg-green-100 text-green-700 mb-3">Our Recruiters</span>
          <h2 className="heading-md text-navy-950">
            Trusted by{' '}
            <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-500">
              Industry Leaders
            </span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">
            120+ leading companies recruit from NHCE every year across technology, management, and engineering domains.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { icon: Building2, value: '120+', label: 'Recruiting Companies' },
            { icon: TrendingUp, value: '42 LPA', label: 'Highest Package' },
            { icon: Users,      value: '98%',   label: 'Placement Rate' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Icon size={18} className="text-green-600 mx-auto mb-1.5" />
              <div className="font-bold text-navy-900 text-xl leading-tight">{value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] space-y-4">
        <div className="flex marquee-row-1" style={{ animation: 'marquee 24s linear infinite', willChange: 'transform' }}>
          {[...row1, ...row1].map((r, i) => <LogoCard key={i} name={r.name} logo={r.logo} />)}
        </div>
        <div className="flex marquee-row-2" style={{ animation: 'marquee-reverse 24s linear infinite', willChange: 'transform' }}>
          {[...row2, ...row2].map((r, i) => <LogoCard key={i} name={r.name} logo={r.logo} />)}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (max-width: 640px) {
          .marquee-row-1 { animation-duration: 12s !important; }
          .marquee-row-2 { animation-duration: 12s !important; }
        }
      `}</style>
    </section>
  );
}
