import { useState } from 'react';
import { Users, TrendingUp, Building2 } from 'lucide-react';
import { RECRUITERS } from '../../data/constants';

// Shuffle once at module load for random-looking layout
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SHUFFLED = shuffle(RECRUITERS);
// Row sizes that sum to SHUFFLED.length — varied counts give natural look
const ROW_SIZES = [4, 5, 4, 3];

function buildRows() {
  const rows: (typeof RECRUITERS)[] = [];
  let idx = 0;
  for (const size of ROW_SIZES) {
    const row: typeof RECRUITERS = [];
    for (let j = 0; j < size; j++) {
      row.push(SHUFFLED[idx % SHUFFLED.length]);
      idx++;
    }
    rows.push(row);
  }
  return rows;
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="flex items-center justify-center overflow-hidden"
      style={{ width: 120, height: 45, flexShrink: 0 }}>
      {!loaded && <div className="w-20 h-5 rounded bg-slate-200 animate-pulse" />}
      <img
        src={logo}
        alt={name}
        onLoad={() => setLoaded(true)}
        style={{ maxWidth: 140, maxHeight: 60, width: '100%', objectFit: 'contain' }}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export default function PlacementPartners() {
  const rows = buildRows();
  const loopRows = [...rows, ...rows];

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

      {/* Vertical scroll — top & bottom faded */}
      <div
        className="relative overflow-hidden mx-auto max-w-4xl px-4"
        style={{
          height: 340,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      >
        <div className="scroll-up" style={{ willChange: 'transform' }}>
          {loopRows.map((row, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-2 mb-2">
              {row.map((r, i) => (
                <LogoCard key={r.name + rowIdx + i} name={r.name} logo={r.logo} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .scroll-up { animation: scrollUp 18s linear infinite; }
        @keyframes scrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @media (max-width: 640px) {
          .scroll-up { animation-duration: 13s; }
        }
      `}</style>
    </section>
  );
}
