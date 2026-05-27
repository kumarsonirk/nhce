import { Bell } from 'lucide-react';

const NOTIFICATIONS = [
  '🎓 Admissions Open 2025–26 — Apply Now for B.E / B.Tech / MBA / MCA programs',
  '🏆 NHCE ranked #1 in Bengaluru by Times Engineering Rankings 2025',
  '📢 Last date for scholarship applications: 30 June 2025',
  '🚀 48-Hour Hackathon registrations are now open — Register before 15 June 2025',
  '🎉 NAAC A+ Accreditation awarded to NHCE — A milestone of excellence',
  '📋 VTU Semester Exam Results declared — Check Student Portal',
  '🌐 International Internship opportunities available — Visit Placement Cell',
  '📅 Upcoming: Annual Tech Fest "Horizon 2025" — 20–22 August 2025',
];

export default function NotificationBar() {
  return (
    <div className="bg-navy-900 text-white overflow-hidden border-b border-navy-800">
      <div className="flex items-stretch">

        {/* Label chip */}
        <div className="flex items-center gap-2 bg-gold-500 text-navy-950 font-bold text-xs uppercase tracking-wider px-4 flex-shrink-0 z-10">
          <Bell size={13} className="flex-shrink-0" />
          <span className="hidden sm:inline">Notice</span>
        </div>

        {/* Scrolling track */}
        <div
          className="flex-1 overflow-hidden py-2.5"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          }}
        >
          <div className="notif-marquee flex gap-12 whitespace-nowrap w-max">
            {[...NOTIFICATIONS, ...NOTIFICATIONS].map((n, i) => (
              <span key={i} className="text-sm text-white/85 flex-shrink-0">
                {n}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .notif-marquee {
          animation: notifScroll 40s linear infinite;
        }
        .notif-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes notifScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
