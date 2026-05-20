import { FlaskConical, BookOpen, Users, Lightbulb, ExternalLink } from 'lucide-react';
import { RESEARCH_AREAS } from '../../data/constants';

export default function Research() {
  return (
    <section id="research" className="section-padding bg-slate-50">
      <div className="container-wide">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
          <div>
            <span className="badge bg-purple-100 text-purple-700 mb-3">🔬 Research & Innovation</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Advancing{' '}
              <span className="text-gradient bg-gradient-to-r from-purple-700 to-indigo-600">
                Knowledge
              </span>{' '}
              Boundaries
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-lg">
              NHCE's research ecosystem spans 6 dedicated centers, 135+ funded projects, and
              collaborations with DRDO, ISRO, and leading tech companies. Our faculty and students
              have published 800+ papers in indexed journals.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: '135+', label: 'Active Projects', icon: '🧪', color: 'bg-purple-50 border-purple-200 text-purple-700' },
              { val: '₹12.1Cr', label: 'Research Funding', icon: '💰', color: 'bg-gold-50 border-gold-200 text-gold-700' },
              { val: '800+', label: 'Publications', icon: '📄', color: 'bg-blue-50 border-blue-200 text-blue-700' },
              { val: '42', label: 'Patents Filed', icon: '⚡', color: 'bg-green-50 border-green-200 text-green-700' },
            ].map(s => (
              <div key={s.label} className={`p-4 rounded-2xl border ${s.color} flex items-center gap-3`}>
                <div className="text-2xl">{s.icon}</div>
                <div>
                  <div className="font-display font-black text-xl">{s.val}</div>
                  <div className="text-xs font-medium opacity-80">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research areas grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {RESEARCH_AREAS.map((area) => (
            <div key={area.title} className="card p-5 group hover:-translate-y-1 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{area.icon}</span>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  {area.projects} Projects
                </span>
              </div>
              <h4 className="font-semibold text-navy-900 text-sm leading-tight mb-2 group-hover:text-purple-700 transition-colors">
                {area.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Funding: <span className="font-bold text-slate-700">{area.funding}</span></span>
                <ExternalLink size={12} className="text-slate-400 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Research centers */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-1">Research Centers</h3>
              <p className="text-white/60 text-sm">State-of-the-art facilities enabling breakthrough research</p>
            </div>
            <button className="btn-gold self-start md:self-auto">
              Explore Research <FlaskConical size={14} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'Centre for AI & Data Science', partner: 'IBM & NASSCOM', icon: '🤖' },
              { name: 'IoT & Embedded Systems Lab', partner: 'Texas Instruments', icon: '📶' },
              { name: 'Robotics & Automation Centre', partner: 'DRDO Collaboration', icon: '🦾' },
              { name: 'Sustainable Energy Lab', partner: 'MNRE Funded', icon: '♻️' },
              { name: 'Advanced Computing Research', partner: 'Intel Partnership', icon: '💻' },
              { name: 'Biomedical Engineering Lab', partner: 'DST Supported', icon: '🧬' },
            ].map(c => (
              <div key={c.name} className="glass rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="text-xl mb-2">{c.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{c.name}</div>
                <div className="text-xs text-white/50 flex items-center gap-1">
                  <Users size={10} /> {c.partner}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
