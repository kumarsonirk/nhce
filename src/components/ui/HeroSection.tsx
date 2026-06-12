import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface ButtonConfig {
  label: string;
  to?: string;
  href?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

interface HeroSectionProps {
  image: string;
  imageWidth?: string;
  gradientWidth?: string;
  contentMaxWidth?: string;
  badge: string;
  headingSmall: string;
  headingMain: string;
  headingGhost: string;
  description: string;
  button: ButtonConfig;
  secondaryButton?: ButtonConfig;
  bottomSlot?: React.ReactNode;
}

export default function HeroSection({
  image,
  imageWidth = 'w-[55%]',
  gradientWidth = 'w-2/3',
  contentMaxWidth = 'lg:max-w-[45%]',
  badge,
  headingSmall,
  headingMain,
  headingGhost,
  description,
  button,
  secondaryButton,
  bottomSlot,
}: HeroSectionProps) {
  const ease = 'cubic-bezier(0.16,1,0.3,1)';
  const primaryCls = 'btn-gold inline-flex items-center gap-2';
  const secondaryCls = 'inline-flex items-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold px-5 py-2.5 rounded-full transition-all';

  function renderBtn(cfg: ButtonConfig, cls: string) {
    if (cfg.to) {
      return (
        <Link to={cfg.to} className={cls}>
          {cfg.label} {cls === primaryCls && <ChevronRight size={14} />}
        </Link>
      );
    } else if (cfg.href) {
      return (
        <a href={cfg.href} onClick={cfg.onClick} className={cls} target={cfg.href.startsWith('http') ? '_blank' : undefined} rel={cfg.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {cfg.label} {cls === primaryCls && <ChevronRight size={14} />}
        </a>
      );
    } else {
      return (
        <button onClick={cfg.onClick} className={cls}>
          {cfg.label} {cls === primaryCls && <ChevronRight size={14} />}
        </button>
      );
    }
  }

  return (
    <div className="relative min-h-[70vh] lg:min-h-screen bg-white overflow-hidden border-b border-slate-100">

      {/* Image panel — zooms in */}
      <div
        className={`absolute right-0 top-0 bottom-0 ${imageWidth} hidden lg:block`}
        style={{ animation: `heroZoomInImage 2.2s ${ease} 0s both` }}
      >
        <img src={image} alt="" className="w-full h-full object-cover object-center" aria-hidden="true" />
        <div className={`absolute inset-y-0 left-0 ${gradientWidth} bg-gradient-to-r from-white to-transparent`} />
      </div>
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 lg:hidden" aria-hidden="true" />

      <div className="relative z-10 container-wide min-h-[70vh] lg:min-h-screen flex flex-col justify-center">
        <div className={`w-full ${contentMaxWidth} pt-32 pb-10 sm:pt-36 sm:pb-16`}>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-8"
            style={{ animation: `heroZoomIn 1.4s ${ease} 0.2s both` }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {badge}
          </div>

          {/* Heading */}
          <h1
            className="font-display font-black leading-none mb-6"
            style={{ animation: `heroZoomIn 1.5s ${ease} 0.4s both` }}
          >
            <span className="block text-slate-800 text-base sm:text-lg font-semibold tracking-wide mb-3">{headingSmall}</span>
            <span className="block text-5xl sm:text-6xl lg:text-[5rem] text-navy-900 tracking-tight">{headingMain}</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl text-navy-950/60 font-bold mt-1">{headingGhost}</span>
          </h1>

          {/* Divider */}
          <div
            className="flex items-center gap-1.5 mb-5"
            style={{ animation: `heroZoomIn 1.4s ${ease} 0.6s both` }}
          >
            <div className="h-px w-14 bg-gold-500" />
            <div className="h-px w-5 bg-gold-400/50" />
            <div className="h-px w-2 bg-gold-300/30" />
          </div>

          {/* Description */}
          <p
            className="text-slate-700 text-base sm:text-lg leading-relaxed mb-10 max-w-md"
            style={{ animation: `heroZoomIn 1.4s ${ease} 0.75s both` }}
          >
            {description}
          </p>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-3"
            style={{ animation: `heroZoomIn 1.4s ${ease} 0.95s both` }}
          >
            {renderBtn(button, primaryCls)}
            {secondaryButton && renderBtn(secondaryButton, secondaryCls)}
          </div>

        </div>
        {bottomSlot && (
          <div className="w-full pb-10 sm:pb-14">{bottomSlot}</div>
        )}
      </div>
    </div>
  );
}
