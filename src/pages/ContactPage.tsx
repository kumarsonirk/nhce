import { useState, useEffect } from 'react';
import {
  Phone, Mail, MapPin, Clock,
  Building2, GraduationCap, Briefcase, Users, BookOpen,
  MessageSquare, Send, ExternalLink, Loader2,
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import HeroSection from '../components/ui/HeroSection';
import { submitLeadToLeadSquared } from '../utils/leadsquared';

/* ─── Data ─────────────────────────────────────────────── */


const DEPARTMENTS = [
  { Icon: BookOpen,       label: 'Academics',       email: 'principal@newhorizonindia.edu',     iconBg: 'bg-blue-600'    },
  { Icon: GraduationCap,  label: 'Admissions',      email: 'ed_admissions@newhorizonindia.edu', iconBg: 'bg-indigo-600'  },
  { Icon: Briefcase,      label: 'Placement',       email: 'sr.ed_hrd@newhorizonindia.edu',     iconBg: 'bg-violet-600'  },
  { Icon: Users,          label: 'HR Department',   email: 'director_hr@newhorizonindia.edu',   iconBg: 'bg-emerald-600' },
  { Icon: Building2,      label: 'Registrar',       email: 'registrar@newhorizonindia.edu',     iconBg: 'bg-slate-700'   },
  { Icon: MessageSquare,  label: 'General Enquiry', email: 'nhceoffice@newhorizonindia.edu',    iconBg: 'bg-amber-500'   },
];

const HOSTELS = [
  { name: 'Sir M. Visvesvaraya Block', warden: 'Ramesh Babu',  phone: '7899936907', gender: 'Boys'  },
  { name: 'Swami Vivekananda Block',   warden: 'Anil Kumar',   phone: '9113830721', gender: 'Boys'  },
  { name: 'Shahid Bhagat Singh Block', warden: 'Ramesh Babu',  phone: '7899936907', gender: 'Boys'  },
  { name: 'NHVM Hostel',               warden: 'Prabakar Rao', phone: '8197447147', gender: 'Boys'  },
  { name: 'Jhansi ki Rani Block',      warden: 'Shanthi',      phone: '9686692369', gender: 'Girls' },
  { name: 'Rani Chenamma Block',       warden: 'N Sumangali',  phone: '9731422177', gender: 'Girls' },
];

/* ─── Sub-components ────────────────────────────────────── */

/* ─── Page ──────────────────────────────────────────────── */

export default function ContactPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hostelTab, setHostelTab] = useState<'Boys' | 'Girls'>('Boys');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitLeadToLeadSquared(form);
      setSent(true);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <HeroSection
        image="/contact_hero.jpg"
        badge="Contact Us · NHCE"
        headingSmall="Get in Touch"
        headingMain="We're Here to"
        headingGhost="Help You"
        description="Reach out to our admissions team, academics, placement cell or any department — we're just a call or click away."
        button={{ label: 'Call Admissions', href: 'tel:+919880534935' }}
        secondaryButton={{ label: 'Send Enquiry', href: 'mailto:admissionsnhce@newhorizonindia.edu' }}
      />

{/* ── 3 Info Pillars ── */}
      <div className="border-b border-slate-100">
        <div className="container-wide">
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { Icon: Phone,   label: 'Call Us',      sub: 'Mon–Sat, 9 AM – 5 PM',  detail: '+91 98805 34935',                     href: 'tel:+919880534935' },
              { Icon: MapPin,  label: 'Our Campus',   sub: 'Near Marathahalli, Bengaluru', detail: 'Bellandur Main Road, 560 103',  href: 'https://maps.google.com/?q=New+Horizon+College+of+Engineering+Bangalore' },
              { Icon: Mail,    label: 'Email Us',     sub: 'We reply within 24 hours',    detail: 'admissionsnhce@newhorizonindia.edu', href: 'mailto:admissionsnhce@newhorizonindia.edu' },
            ].map(item => (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 sm:flex-col sm:items-center sm:gap-0 sm:text-center px-5 sm:px-8 py-5 sm:py-10 hover:bg-slate-50 transition-colors">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-navy-950 group-hover:bg-navy-800 rounded-2xl flex items-center justify-center flex-shrink-0 sm:mb-4 transition-colors shadow-sm">
                  <item.Icon size={18} className="text-white" />
                </div>
                <div className="flex-1 sm:flex-none min-w-0">
                  <p className="font-black text-navy-900 text-base sm:text-lg sm:mb-1">{item.label}</p>
                  <p className="text-slate-400 text-sm sm:mb-2">{item.sub}</p>
                  <p className="text-slate-600 text-sm sm:text-base font-medium break-all">{item.detail}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map + Form (split) ── */}
      <div className="container-wide py-10 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">

          {/* Left: Map + address strip */}
          <AnimateIn variant="fade-right">
            <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-sm h-full flex flex-col">
              <div className="flex-1 min-h-[320px]">
                <iframe
                  title="NHCE Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4985741627!2d77.68097!3d12.93458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1354e5b5a535%3A0xa86e13eb4b8e6c97!2sNew%20Horizon%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="hidden sm:block bg-white divide-y divide-slate-100">
                <div className="px-5 py-4 flex items-start gap-3">
                  <div className="w-8 h-8 bg-navy-950 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin size={13} className="text-white" /></div>
                  <div>
                    <p className="font-bold text-navy-900 text-base mb-0.5">Address</p>
                    <p className="text-slate-500 text-sm leading-relaxed">New Horizon Knowledge Park, Bellandur Main Road, Near Marathahalli, Bengaluru – 560 103</p>
                  </div>
                </div>
                <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-navy-950 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"><Clock size={13} className="text-white" /></div>
                    <div>
                      <p className="font-bold text-navy-900 text-base mb-0.5">Timings</p>
                      <p className="text-slate-500 text-sm">Mon–Fri: 8:30 AM – 5:30 PM</p>
                      <p className="text-slate-500 text-sm">Sat: 9:00 AM – 1:00 PM</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <a href="https://maps.google.com/?q=New+Horizon+College+of+Engineering+Bangalore" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors w-fit">
                      <ExternalLink size={12} /> Open in Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right: Form */}
          <AnimateIn variant="fade-left">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-sm px-5 sm:px-7 py-6 sm:py-8 h-full flex flex-col">
              <p className="text-sm font-black uppercase tracking-widest text-gold-500 mb-1">Send an Enquiry</p>
              <h2 className="font-display font-black text-2xl text-navy-950 mb-1">Get in Touch</h2>
              <p className="text-slate-400 text-base mb-7">Our team will get back to you within 24 hours.</p>

              {sent ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Send size={22} className="text-emerald-600" />
                  </div>
                  <h3 className="font-black text-navy-900 text-xl mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-base mb-5">Thank you for reaching out. We'll be in touch shortly.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', course: '', message: '' }); }}
                    className="text-base text-blue-600 font-semibold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-navy-900 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        disabled={submitting}
                        placeholder="Rahul Kumar"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all disabled:bg-slate-50 disabled:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-navy-900 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                      <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        disabled={submitting}
                        placeholder="+91 98XXX XXXXX"
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all disabled:bg-slate-50 disabled:text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      disabled={submitting}
                      placeholder="you@example.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all disabled:bg-slate-50 disabled:text-slate-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1.5">Course Interested In <span className="text-red-500">*</span></label>
                    <select required value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))}
                      disabled={submitting}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white disabled:bg-slate-50 disabled:text-slate-400">
                      <option value="">Select a program</option>
                      <option value="COMPUTER SCIENCE AND ENGINEERING">COMPUTER SCIENCE AND ENGINEERING</option>
                      <option value="MECHANICAL ENGINEERING">MECHANICAL ENGINEERING</option>
                      <option value="ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING">ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</option>
                      <option value="ELECTRICAL AND ELECTRONICS ENGINEERING">ELECTRICAL AND ELECTRONICS ENGINEERING</option>
                      <option value="ELECTRONICS & COMMUNICATION ENGINEERING">ELECTRONICS & COMMUNICATION ENGINEERING</option>
                      <option value="M.TECH COMPUTER SCIENCE & ENGINEERING">M.TECH COMPUTER SCIENCE & ENGINEERING</option>
                      <option value="MASTER OF BUSINESS ADMINISTRATION">MASTER OF BUSINESS ADMINISTRATION</option>
                      <option value="MASTER OF COMPUTER APPLICATIONS">MASTER OF COMPUTER APPLICATIONS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy-900 mb-1.5">Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      disabled={submitting}
                      rows={4} placeholder="How can we help you?"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-navy-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none disabled:bg-slate-50 disabled:text-slate-400" />
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="consent" required disabled={submitting} className="w-4 h-4 mt-1 accent-navy-950 flex-shrink-0" />
                    <label htmlFor="consent" className="text-slate-500 text-sm cursor-pointer select-none leading-relaxed">
                      I authorise New Horizon College of Engineering and its representatives to Call, SMS, Email or WhatsApp me about its programmes and offers. This consent overrides any registration for DNC / NDNC.*
                    </label>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                      {submitError}
                    </div>
                  )}

                  <button type="submit" disabled={submitting}
                    className="w-full bg-navy-950 hover:bg-navy-800 disabled:bg-slate-300 text-white font-bold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                    {submitting ? (
                      <>
                        Submitting... <Loader2 size={16} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimateIn>

        </div>
      </div>

      {/* ── Department Emails ── */}
      <div className="container-wide py-10 sm:py-16">
        <AnimateIn variant="fade-up">
          <div className="text-center mb-7 sm:mb-10">
            <p className="text-sm font-black uppercase tracking-widest text-gold-500 mb-2">Departments</p>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-navy-950">Important Contacts</h2>
          </div>
        </AnimateIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEPARTMENTS.map((d, i) => (
            <AnimateIn key={d.label} variant="fade-up" delay={i * 50} className="min-w-0">
              <a href={`mailto:${d.email}`}
                className="group flex items-center gap-4 bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5">
                <div className={`w-11 h-11 ${d.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <d.Icon size={18} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-navy-900 text-base">{d.label}</p>
                  <p className="text-slate-500 text-sm mt-0.5 truncate">{d.email}</p>
                </div>
                <Mail size={14} className="text-slate-300 group-hover:text-navy-600 transition-colors flex-shrink-0" />
              </a>
            </AnimateIn>
          ))}
        </div>
      </div>

      {/* ── Hostel Contacts ── */}
      <div className="bg-slate-50 py-10 sm:py-16">
        <div className="container-wide">
          <AnimateIn variant="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
              <div>
                <p className="text-sm font-black uppercase tracking-widest text-amber-500 mb-1">On-Campus Living</p>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-navy-950">Hostel Contacts</h2>
              </div>
              {/* Tab toggle */}
              <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm self-start sm:self-auto">
                {(['Boys', 'Girls'] as const).map(g => (
                  <button key={g} onClick={() => setHostelTab(g)}
                    className={`px-5 py-2 rounded-lg text-base font-bold transition-all duration-200 flex items-center gap-2 ${
                      hostelTab === g ? 'bg-navy-950 text-white shadow-sm' : 'text-slate-500 hover:text-navy-900'
                    }`}>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      g === 'Boys'
                        ? hostelTab === g ? 'bg-sky-400' : 'bg-sky-300'
                        : hostelTab === g ? 'bg-pink-300' : 'bg-pink-300'
                    }`} />
                    {g}
                    <span className={`text-sm font-normal ${hostelTab === g ? 'opacity-60' : 'opacity-50'}`}>
                      ({HOSTELS.filter(h => h.gender === g).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Directory list */}
          <AnimateIn variant="fade-up" delay={80}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Column headers — desktop only */}
              <div className="hidden sm:grid sm:grid-cols-[40px_1fr_220px_180px] items-center gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/80">
                <span className="text-xs font-black uppercase tracking-widest text-slate-300">#</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Block Name</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Warden</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Contact</span>
              </div>

              {/* Rows */}
              {HOSTELS.filter(h => h.gender === hostelTab).map((h, i) => {
                const initials = h.warden.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                const avatarCls = hostelTab === 'Boys' ? 'bg-blue-50 text-blue-600' : 'bg-pink-50 text-pink-600';
                return (
                  <div key={h.name}
                    className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors duration-150 group">

                    {/* Mobile layout: name on top, warden + call on bottom row */}
                    <div className="sm:hidden">
                      <p className="font-bold text-navy-950 text-base mb-2.5 leading-snug">{h.name}</p>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black flex-shrink-0 ${avatarCls}`}>
                            {initials}
                          </span>
                          <span className="text-base text-slate-600 truncate">{h.warden}</span>
                        </div>
                        <a href={`tel:${h.phone}`}
                          className="inline-flex items-center gap-1.5 bg-navy-950 text-white text-sm font-bold px-3 py-2 rounded-lg flex-shrink-0 whitespace-nowrap">
                          <Phone size={10} /> Call
                        </a>
                      </div>
                    </div>

                    {/* Desktop layout: 4-column grid */}
                    <div className="hidden sm:grid sm:grid-cols-[40px_1fr_220px_180px] items-center gap-4">
                      <span className="text-sm font-black text-slate-200 tabular-nums text-center">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="font-bold text-navy-950 text-base leading-snug">{h.name}</p>
                      <div className="flex items-center gap-2.5">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black flex-shrink-0 ${avatarCls}`}>
                          {initials}
                        </span>
                        <span className="text-base text-slate-600">{h.warden}</span>
                      </div>
                      <a href={`tel:${h.phone}`}
                        className="inline-flex items-center gap-2 bg-slate-100 hover:bg-navy-950 text-navy-900 hover:text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap group-hover:shadow-sm">
                        <Phone size={11} /> {h.phone}
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </AnimateIn>
        </div>
      </div>


{/* ── Floating Widget ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <a href="tel:+919880534935"
          className="flex items-center gap-2 bg-navy-950 hover:bg-navy-800 text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-xl transition-all hover:-translate-y-0.5">
          <Phone size={13} /> <span className="hidden sm:inline">Call Us</span>
        </a>
        <a href="https://wa.me/919880534935" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-xl transition-all hover:-translate-y-0.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a href="mailto:admissionsnhce@newhorizonindia.edu"
          className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-navy-950 text-sm font-bold px-4 py-2.5 rounded-full shadow-xl transition-all hover:-translate-y-0.5">
          <Mail size={13} /> <span className="hidden sm:inline">Email Us</span>
        </a>
      </div>

    </div>
  );
}
