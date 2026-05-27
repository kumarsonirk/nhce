const CARDS = [
  {
    logos: ['/acc/vtu.webp'],
    text: 'Autonomous College Permanently Affiliated to VTU',
  },
  {
    logos: ['/acc/aicte.png', '/acc/ugc.png'],
    text: 'Approved by AICTE & UGC',
  },
  {
    logos: ['/acc/nba.png'],
    text: 'Accredited by NBA',
  },
  {
    logos: ['/acc/naac.png'],
    text: "Accredited by NAAC with 'A' Grade",
  },
];

export default function Accreditations() {
  return (
    <section className="bg-amber-50 py-12 px-4">
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4">
        {CARDS.map((card) => (
          <div
            key={card.text}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4 p-6 text-center"
          >
            <div className="flex items-center justify-center gap-3">
              {card.logos.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-16 w-auto object-contain"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
