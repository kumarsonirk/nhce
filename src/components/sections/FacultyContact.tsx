import { Mail, Award, BookOpen, ExternalLink } from 'lucide-react';

const FACULTY = [
  { name: 'Dr. K. N. Subramanya', role: 'Principal & Prof. Civil', dept: 'Administration', expertise: 'Structural Engineering', papers: 45, gradient: 'from-navy-700 to-blue-800', initials: 'KS' },
  { name: 'Dr. Anitha H.S.', role: 'HOD, Computer Science', dept: 'CSE', expertise: 'Machine Learning', papers: 38, gradient: 'from-purple-700 to-indigo-800', initials: 'AH' },
  { name: 'Dr. Rashmi B.R.', role: 'Professor, Electronics', dept: 'ECE', expertise: 'VLSI Design', papers: 52, gradient: 'from-blue-700 to-cyan-800', initials: 'RB' },
  { name: 'Dr. Vinod M.K.', role: 'HOD, Mechanical', dept: 'ME', expertise: 'Thermal Engineering', papers: 29, gradient: 'from-orange-600 to-red-700', initials: 'VM' },
  { name: 'Dr. Sunitha N.', role: 'Professor, AI & ML', dept: 'AIML', expertise: 'Deep Learning', papers: 63, gradient: 'from-pink-700 to-rose-800', initials: 'SN' },
  { name: 'Dr. Pradeep Kumar', role: 'Professor, Civil', dept: 'CE', expertise: 'Environmental Engg.', papers: 34, gradient: 'from-green-700 to-teal-800', initials: 'PK' },
];

export function Faculty() {
  return (
    <section id="faculty" className="section-padding bg-slate-50">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge bg-indigo-100 text-indigo-700 mb-3">👨‍🏫 Our Faculty</span>
          <h2 className="heading-md text-navy-950 mb-3">
            Learn from the{' '}
            <span className="text-gradient bg-gradient-to-r from-indigo-700 to-navy-700">
              Best Minds
            </span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            450+ faculty members with industry experience, research accolades, and a passion for teaching.
            With 60+ PhDs and counting, NHCE brings world-class expertise to every classroom.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {FACULTY.map((f) => (
            <div key={f.name} className="card p-5 group hover:-translate-y-1 overflow-hidden relative">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white font-display font-black text-lg shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  {f.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-navy-900 text-sm leading-tight">{f.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{f.role}</p>
                  <span className="badge bg-navy-100 text-navy-700 text-xs mt-1">{f.dept}</span>
                </div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <BookOpen size={11} className="text-gold-500 flex-shrink-0" />
                  <span className="truncate">Expertise: {f.expertise}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Award size={11} className="text-gold-500 flex-shrink-0" />
                  <span>{f.papers}+ research publications</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 text-xs font-semibold text-navy-700 border border-navy-200 hover:border-navy-500 py-1.5 rounded-full transition-colors flex items-center justify-center gap-1">
                  <Mail size={10} /> Contact
                </button>
                <button className="flex-1 text-xs font-semibold text-slate-600 border border-slate-200 hover:border-slate-400 py-1.5 rounded-full transition-colors flex items-center justify-center gap-1">
                  Profile <ExternalLink size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty stats */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '450+', label: 'Total Faculty' },
              { val: '60+', label: 'PhD Holders' },
              { val: '3,200+', label: 'Papers Published' },
              { val: '42', label: 'Patents Filed' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display font-black text-2xl text-gold-400 mb-1">{s.val}</div>
                <div className="text-white/60 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="badge bg-green-100 text-green-700 mb-3">📍 Contact Us</span>
          <h2 className="heading-md text-navy-950 mb-3">
            We'd Love to{' '}
            <span className="text-gradient bg-gradient-to-r from-green-700 to-teal-600">Hear from You</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: '📍', title: 'Campus Address', content: 'Near Koramangala, Inner Ring Road, Marathahalli – Sarjapur Outer Ring Road, Bengaluru – 560043, Karnataka' },
              { icon: '📞', title: 'Phone Numbers', content: '+91 80 2321 6776\n+91 80 2321 6777\nAdmissions: +91 80 4512 1234' },
              { icon: '📧', title: 'Email', content: 'info@nhce.edu.in\nadmissions@nhce.edu.in\nplacements@nhce.edu.in' },
              { icon: '🕐', title: 'Office Hours', content: 'Monday – Saturday\n9:00 AM – 5:30 PM\nSunday: Closed' },
            ].map(c => (
              <div key={c.title} className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-navy-50 transition-colors">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div>
                  <div className="font-semibold text-navy-900 text-sm mb-1">{c.title}</div>
                  <div className="text-xs text-slate-600 whitespace-pre-line">{c.content}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 card p-7">
            <h3 className="font-display font-bold text-navy-900 text-lg mb-5">Send us a Message</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Your Name', placeholder: 'Rahul Sharma', type: 'text' },
                { label: 'Email Address', placeholder: 'you@example.com', type: 'email' },
                { label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                { label: 'Department of Interest', placeholder: 'e.g. CSE, ECE, ME...', type: 'text' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-100 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
              <textarea
                placeholder="Tell us how we can help you..."
                rows={4}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-navy-400 focus:ring-1 focus:ring-navy-100 transition-all resize-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Query Type</label>
              <select className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-navy-400 transition-all text-slate-700">
                <option>Admissions Inquiry</option>
                <option>Fee & Scholarships</option>
                <option>Placement Information</option>
                <option>Research Collaboration</option>
                <option>General Inquiry</option>
              </select>
            </div>
            <button className="btn-primary w-full justify-center">
              Send Message
            </button>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-8 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <div className="font-semibold text-slate-600 text-sm">Interactive Map</div>
            <div className="text-xs text-slate-400">Bengaluru, Karnataka</div>
            <button className="mt-3 btn-primary text-xs px-4 py-2">
              View on Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
