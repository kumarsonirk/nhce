import AnimateIn from '../ui/AnimateIn';

export default function VideoSection() {
  return (
    <section className="bg-slate-50 py-12 lg:py-16">
      <div className="container-wide">
        <AnimateIn variant="scale">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.youtube.com/embed/uWSISyKjpQs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=uWSISyKjpQs&showinfo=0&fs=0"
            title="NHCE Campus Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none', pointerEvents: 'none' }}
          />
        </div>
        </AnimateIn>
      </div>
    </section>
  );
}
