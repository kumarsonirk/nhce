import { useRef, useEffect, useState, CSSProperties, ReactNode } from 'react';

type Variant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'fade';

const HIDDEN: Record<Variant, string> = {
  'fade-up':    'translateY(36px)',
  'fade-down':  'translateY(-36px)',
  'fade-left':  'translateX(36px)',
  'fade-right': 'translateX(-36px)',
  'scale':      'scale(0.93)',
  'fade':       'scale(1)',
};

interface AnimateInProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;        // ms
  duration?: number;     // ms
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  threshold?: number;
}

export default function AnimateIn({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  className = '',
  as: Tag = 'div',
  threshold = 0.12,
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : HIDDEN[variant],
    transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: 'opacity, transform',
  };

  // Cast to avoid JSX generic element TS error
  const Component = Tag as 'div';

  // fade-left/fade-right translate the element horizontally before it's visible; while
  // off-screen (below the fold, not yet intersected) that translateX can still register in
  // document.documentElement.scrollWidth and make the whole page horizontally scrollable on
  // mobile. Clipping it with an immediate (zero-distance) overflow-hidden wrapper prevents that
  // — a distant ancestor's overflow-hidden does not reliably contain a transformed descendant.
  const needsClip = variant === 'fade-left' || variant === 'fade-right';

  if (needsClip) {
    return (
      <Component className={className} style={{ overflow: 'hidden' }}>
        <div ref={ref as React.Ref<HTMLDivElement>} style={style}>
          {children}
        </div>
      </Component>
    );
  }

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={className} style={style}>
      {children}
    </Component>
  );
}
