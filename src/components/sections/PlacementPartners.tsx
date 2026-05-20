import { useState } from 'react';
import { Users, TrendingUp, Building2 } from 'lucide-react';
import { RECRUITERS } from '../../data/constants';

const DOMAIN_MAP: Record<string, string> = {
  'Google': 'google.com',
  'Microsoft': 'microsoft.com',
  'Amazon': 'amazon.com',
  'Infosys': 'infosys.com',
  'TCS': 'tcs.com',
  'Wipro': 'wipro.com',
  'Accenture': 'accenture.com',
  'Deloitte': 'deloitte.com',
  'IBM': 'ibm.com',
  'Cognizant': 'cognizant.com',
  'HCL Tech': 'hcltech.com',
  'Oracle': 'oracle.com',
  'Capgemini': 'capgemini.com',
  'L&T Infotech': 'ltimindtree.com',
  'Bosch': 'bosch.com',
  'Samsung': 'samsung.com',
  'Siemens': 'siemens.com',
  'Qualcomm': 'qualcomm.com',
  'Adobe': 'adobe.com',
  'Cisco': 'cisco.com',
};

function LogoCard({ name }: { name: string }) {
  const [imgError, setImgError] = useState(false);
  const domain = DOMAIN_MAP[name];

  return (
    <div className="flex-shrink-0 mx-3 flex items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm px-6 h-20 w-44 group hover:shadow-md hover:border-slate-200 transition-all duration-200 cursor-default">
      {!imgError && domain ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="max-h-9 max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-sm font-semibold text-slate-600 text-center leading-tight">{name}</span>
      )}
    </div>
  );
}

export default function PlacementPartners() {
  const row1 = RECRUITERS.slice(0, 10);
  const row2 = RECRUITERS.slice(10);

  return (
    <section id="placements" className="section-padding bg-white overflow-hidden">
      <div className="container-wide">
        {/* Header */}
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
          {[
            { icon: Building2, value: '120+', label: 'Recruiting Companies' },
            { icon: TrendingUp, value: '42 LPA', label: 'Highest Package' },
            { icon: Users, value: '98%', label: 'Placement Rate' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <Icon size={18} className="text-green-600 mx-auto mb-1.5" />
              <div className="font-bold text-navy-900 text-xl leading-tight">{value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee rows — full bleed with edge fade */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Row 1 — scroll left */}
        <div className="flex mb-4 animate-[marquee_35s_linear_infinite]">
          {[...row1, ...row1].map((r, i) => (
            <LogoCard key={i} name={r.name} />
          ))}
        </div>

        {/* Row 2 — scroll right */}
        <div className="flex animate-[marquee-reverse_35s_linear_infinite]">
          {[...row2, ...row2].map((r, i) => (
            <LogoCard key={i} name={r.name} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
