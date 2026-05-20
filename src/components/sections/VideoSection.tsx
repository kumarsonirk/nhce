export default function VideoSection() {
  return (
    <section className="bg-navy-950">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/uWSISyKjpQs?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=uWSISyKjpQs"
          title="NHCE Campus Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </section>
  );
}
