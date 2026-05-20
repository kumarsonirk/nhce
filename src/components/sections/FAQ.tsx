import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../../data/constants';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <span className="badge bg-slate-100 text-slate-700 mb-3">❓ FAQs</span>
            <h2 className="heading-md text-navy-950 mb-4">
              Frequently Asked{' '}
              <span className="text-gradient bg-gradient-to-r from-navy-700 to-indigo-600">
                Questions
              </span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Can't find your answer? Our admissions team is here to help.
            </p>
            <div className="space-y-3">
              <button className="btn-primary w-full justify-center">Contact Admissions</button>
              <button className="w-full border border-slate-200 rounded-full py-3 text-sm font-medium text-slate-600 hover:border-navy-400 hover:text-navy-700 transition-colors">
                Live Chat with Counselor
              </button>
            </div>

            {/* Popular links */}
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Quick Links</div>
              <div className="space-y-2">
                {['Fee Structure', 'Hostel Info', 'Syllabus 2024', 'Scholarship Forms', 'Alumni Portal'].map(l => (
                  <a key={l} href="#" className="flex items-center gap-2 text-sm text-slate-600 hover:text-navy-700 transition-colors">
                    <span className="w-1 h-1 bg-navy-300 rounded-full" /> {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`card overflow-hidden transition-all duration-300 ${open === i ? 'border-navy-200' : 'border-transparent'}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <span className={`text-sm font-semibold leading-snug transition-colors duration-200 ${open === i ? 'text-navy-700' : 'text-slate-800'}`}>
                    {faq.q}
                  </span>
                  <span className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${open === i ? 'bg-navy-900 text-white rotate-180' : 'bg-slate-100 text-slate-600'}`}>
                    {open === i ? <Minus size={13} /> : <Plus size={13} />}
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
