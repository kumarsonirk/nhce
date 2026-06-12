interface PageHeaderProps {
  title: string;
  highlight?: string; // optional gold-coloured word(s) appended after title
  image?: string;     // defaults to /campus.jpg
}

export default function PageHeader({ title, highlight, image = '/campus.jpg' }: PageHeaderProps) {
  return (
    <div className="relative text-white overflow-hidden"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Gradient — bottom-up on mobile, left-right on desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-900/0 sm:bg-gradient-to-r sm:from-navy-950 sm:via-navy-950/85 sm:to-navy-900/30" />
      <div className="relative z-10 container-wide py-5 flex flex-col justify-end min-h-[300px]">
        <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight max-w-2xl">
          {title}{highlight && <> <span className="text-gold-400">{highlight}</span></>}
        </h1>
      </div>
    </div>
  );
}
