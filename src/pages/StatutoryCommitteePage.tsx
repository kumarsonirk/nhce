import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, Users, Download, ExternalLink } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';

/* ─── Master Committee List ─────────────────────────────────── */

const COMMITTEES = [
  {
    name: 'Accreditation Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Dr. Babita Jain',      dept: 'Dean IQAC'          },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Dr. Revathi',          dept: 'Dean R&D'           },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
    ],
  },
  {
    name: 'Admission Committee (2025–26)',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Convener',          name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Admission In-charge',  dept: 'Administration'     },
    ],
  },
  {
    name: 'Alumni Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Faculty Nominee',      dept: 'Alumni Cell'        },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
    ],
  },
  {
    name: 'Anti-Ragging Committee (2025–26)',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Member Secretary',  name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Nodal Officer',     name: 'Faculty Nominee',      dept: 'Student Affairs'    },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Police Liaison',       dept: 'Police Station'     },
      { role: 'Parent Representative', name: 'Parent Nominee',   dept: 'PTMA'               },
      { role: 'Student Representative', name: 'Student Nominee', dept: 'Student Body'       },
    ],
    minutes: true,
  },
  {
    name: 'College Internal Complaints Committee (CICC)',
    incharge: 'Dr. Anandhi R J',
    designation: 'Dean Academics',
    members: [
      { role: 'Presiding Officer', name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Dr. Babita Jain',      dept: 'Dean IQAC'          },
      { role: 'External Member',   name: 'External Nominee',     dept: 'NGO / Legal'        },
      { role: 'Employee Member',   name: 'Faculty Nominee',      dept: 'Teaching Staff'     },
      { role: 'Non-Teaching Member', name: 'Staff Nominee',      dept: 'Non-Teaching Staff' },
    ],
    minutes: true,
  },
  {
    name: 'Staff Grievance Redressal Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Senior Faculty'     },
      { role: 'Member',            name: 'Staff Nominee',        dept: 'Non-Teaching Staff' },
    ],
  },
  {
    name: 'Co-Curricular Club Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Faculty Nominee',      dept: 'Student Activities' },
      { role: 'Faculty Advisor',   name: 'Faculty Nominee',      dept: 'Various Depts'      },
      { role: 'Student Head',      name: 'Student Nominee',      dept: 'Student Council'    },
    ],
  },
  {
    name: 'Counseling Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Counselor',         name: 'Professional Counselor', dept: 'Student Welfare'  },
      { role: 'Faculty Mentor',    name: 'Faculty Nominee',      dept: 'Various Depts'      },
    ],
  },
  {
    name: 'Cultural Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Faculty Nominee',      dept: 'Cultural Cell'      },
      { role: 'Faculty Advisor',   name: 'Faculty Nominee',      dept: 'Arts & Culture'     },
      { role: 'Student Head',      name: 'Student Nominee',      dept: 'Student Council'    },
    ],
  },
  {
    name: 'Disciplinary Committee (2024–25)',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Senior Faculty'     },
    ],
  },
  {
    name: 'Environmental & Energy Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Dr. Revathi',          dept: 'Dean R&D'           },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Civil Engg / EEE'   },
    ],
  },
  {
    name: 'Equal Opportunity Cell',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Faculty Nominee',      dept: 'Equal Opp Cell'     },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'SC/ST Cell'         },
      { role: 'Student Nominee',   name: 'Student Representative', dept: 'Student Body'     },
    ],
  },
  {
    name: 'Examination Committee',
    incharge: 'Dr. Babita Jain',
    designation: 'Dean IQAC / Controller of Examinations',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Controller',        name: 'Dr. Babita Jain',      dept: 'Dean IQAC'          },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Dy. Controller',    name: 'Faculty Nominee',      dept: 'Examination Cell'   },
      { role: 'HoD Representative',name: 'HoD Nominees',         dept: 'All Depts'          },
    ],
    minutes: true,
  },
  {
    name: 'Finance Committee (2025–26)',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Finance Officer',   name: 'Finance Officer',      dept: 'Finance Dept'       },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Management Rep',    name: 'Management Nominee',   dept: 'Management'         },
    ],
    minutes: true,
  },
  {
    name: 'Hostel (Boys) Development & Welfare Committee',
    incharge: 'H.N. Suryaprakash',
    designation: 'Registrar',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Warden',            name: 'Hostel Warden (Boys)', dept: 'Hostel Admin'       },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Boys Hostel'        },
    ],
  },
  {
    name: 'Hostel (Girls) Development & Welfare Committee',
    incharge: 'H.N. Suryaprakash',
    designation: 'Registrar',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Warden',            name: 'Hostel Warden (Girls)',dept: 'Hostel Admin'       },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Girls Hostel'       },
    ],
  },
  {
    name: 'Internal Quality Assurance Cell (IQAC)',
    incharge: 'Dr. Babita Jain',
    designation: 'Dean IQAC / IQAC Coordinator',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Dr. Babita Jain',      dept: 'Dean IQAC'          },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Dr. Revathi',          dept: 'Dean R&D'           },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Industry Expert',   name: 'Industry Nominee',     dept: 'Corporate'          },
      { role: 'Alumni Rep',        name: 'Alumni Nominee',       dept: 'Alumni Association' },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Student Council'    },
      { role: 'Faculty Nominee',   name: 'HoD (CSE)',            dept: 'CSE Dept'           },
      { role: 'Faculty Nominee',   name: 'HoD (ECE)',            dept: 'ECE Dept'           },
    ],
    minutes: true,
  },
  {
    name: 'Library & Information Centre Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Librarian',         name: 'Chief Librarian',      dept: 'Central Library'    },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Faculty Nominee',   name: 'Faculty Nominee',      dept: 'Various Depts'      },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Student Council'    },
    ],
  },
  {
    name: 'NCC Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Principal',         name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'NCC Officer',       name: 'NCC ANO',              dept: 'NCC Unit'           },
      { role: 'Faculty Advisor',   name: 'Faculty Nominee',      dept: 'NCC Cell'           },
    ],
  },
  {
    name: 'NSS Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Principal',         name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'NSS Programme Officer', name: 'NSS PO',           dept: 'NSS Unit'           },
      { role: 'Faculty Advisor',   name: 'Faculty Nominee',      dept: 'NSS Cell'           },
    ],
  },
  {
    name: 'In-Plant Training / Placement Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'TPO',               name: 'Training & Placement Officer', dept: 'TPO Office' },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Member',            name: 'Dept TPO (CSE)',       dept: 'CSE Dept'           },
      { role: 'Member',            name: 'Dept TPO (ECE)',       dept: 'ECE Dept'           },
      { role: 'Member',            name: 'Dept TPO (ME)',        dept: 'ME Dept'            },
      { role: 'Member',            name: 'Dept TPO (MBA)',       dept: 'MBA Dept'           },
      { role: 'Industry Advisor',  name: 'Industry Nominee',     dept: 'Corporate Partner'  },
    ],
    minutes: true,
  },
  {
    name: 'Physical Education & Sports Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Director of PE',    name: 'Physical Director',    dept: 'Sports Dept'        },
      { role: 'Faculty Nominee',   name: 'Faculty Nominee',      dept: 'Sports Cell'        },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Sports Council'     },
    ],
  },
  {
    name: 'Purchase & Infrastructure Committee',
    incharge: 'H.N. Suryaprakash',
    designation: 'Registrar',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Convener',          name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Finance Officer',   name: 'Finance Officer',      dept: 'Finance Dept'       },
      { role: 'Technical Expert',  name: 'Technical Nominee',    dept: 'Civil / Electrical' },
    ],
  },
  {
    name: 'Research and Development Committee',
    incharge: 'Dr. Revathi',
    designation: 'Dean – R&D',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Convener',          name: 'Dr. Revathi',          dept: 'Dean R&D'           },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Research Cell'      },
      { role: 'HoD Representative',name: 'HoD Nominees',         dept: 'All Depts'          },
    ],
    minutes: true,
  },
  {
    name: 'SC/ST Welfare Committee (2024–25)',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'SC/ST Cell Incharge',  dept: 'SC/ST Cell'         },
      { role: 'Member',            name: 'Faculty Nominee (SC)', dept: 'SC Faculty'         },
      { role: 'Member',            name: 'Faculty Nominee (ST)', dept: 'ST Faculty'         },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Student Body'       },
    ],
  },
  {
    name: 'Staff Welfare Committee',
    incharge: 'H.N. Suryaprakash',
    designation: 'Registrar',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Convener',          name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Teaching Staff'     },
      { role: 'Member',            name: 'Staff Nominee',        dept: 'Non-Teaching Staff' },
    ],
  },
  {
    name: 'Student Mentoring Committee',
    incharge: 'Dr. Anandhi R J',
    designation: 'Dean Academics',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Convener',          name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Faculty Mentors',   name: 'Faculty Nominees',     dept: 'All Depts'          },
    ],
  },
  {
    name: 'Student Grievance Redressal Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Member',            name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'H.N. Suryaprakash',   dept: 'Registrar'          },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Student Council'    },
    ],
    minutes: true,
  },
  {
    name: 'Universal Human Values Committee',
    incharge: 'Dr. Manjunatha',
    designation: 'Principal',
    members: [
      { role: 'Chairman',          name: 'Dr. Manjunatha',       dept: 'Principal'          },
      { role: 'Coordinator',       name: 'Faculty Nominee',      dept: 'UHV Cell'           },
      { role: 'Member',            name: 'Faculty Nominee',      dept: 'Various Depts'      },
    ],
  },
  {
    name: 'Women Empowerment Committee (AY 2024–25)',
    incharge: 'Dr. Anandhi R J',
    designation: 'Dean Academics',
    members: [
      { role: 'Chairperson',       name: 'Dr. Anandhi R J',      dept: 'Dean Academics'     },
      { role: 'Member',            name: 'Dr. Babita Jain',      dept: 'Dean IQAC'          },
      { role: 'Member',            name: "Women's Cell Incharge", dept: "Women's Cell"      },
      { role: 'External Expert',   name: 'External Nominee',     dept: 'Women Welfare Org'  },
      { role: 'Student Rep',       name: 'Student Nominee',      dept: 'Girl Students'      },
    ],
    minutes: true,
  },
];

/* ─── Accordion item ─────────────────────────────────────────── */

function CommitteeAccordion({ c, index }: { c: typeof COMMITTEES[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border border-slate-100 rounded-2xl overflow-hidden transition-all ${open ? 'shadow-sm' : ''}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left transition-colors ${open ? 'bg-navy-900' : 'bg-white hover:bg-slate-50'}`}
      >
        <span className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center flex-shrink-0 ${
          open ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
        }`}>
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm leading-snug ${open ? 'text-white' : 'text-navy-900'}`}>{c.name}</p>
          <p className={`text-xs mt-0.5 ${open ? 'text-white/60' : 'text-slate-400'}`}>
            In-charge: {c.incharge} · {c.designation}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {c.minutes && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${open ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
              Minutes
            </span>
          )}
          <ChevronDown size={16} className={`transition-transform duration-200 ${open ? 'rotate-180 text-white' : 'text-slate-400'}`} />
        </div>
      </button>

      {open && (
        <div className="bg-white px-5 pb-5 pt-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Sl.', 'Role in Committee', 'Name', 'Department'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-bold text-navy-900 text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.members.map((m, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-4 py-2.5 text-slate-400 text-xs font-medium">{i + 1}</td>
                    <td className="px-4 py-2.5 text-slate-700 font-semibold whitespace-nowrap">{m.role}</td>
                    <td className="px-4 py-2.5 text-navy-900 font-bold">{m.name}</td>
                    <td className="px-4 py-2.5 text-slate-500">{m.dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {c.minutes && (
            <div className="mt-4 flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <Download size={14} className="text-slate-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-navy-900">Meeting Minutes Available</p>
                <p className="text-xs text-slate-400">Records from 2020–2026</p>
              </div>
              <a
                href="https://newhorizoncollegeofengineering.in/statutory-committee/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap"
              >
                View PDFs <ExternalLink size={10} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */

export default function StatutoryCommitteePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [search, setSearch] = useState('');

  const filtered = COMMITTEES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.incharge.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 animate-[fadeIn_0.4s_ease-out]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden min-h-screen flex items-center border-b border-slate-200 bg-white">
        <img src="/campus.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" aria-hidden="true" />
        <div className="relative z-10 container-wide py-12 sm:py-16 w-full">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link to="/governance" className="hover:text-navy-900 transition-colors">Governance</Link>
            <ChevronRight size={14} />
            <span className="text-navy-900 font-semibold">Statutory Committees</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimateIn variant="fade-right">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-3 py-1.5 rounded-full mb-5">
                ⚖️ Statutory Committees · NHCE
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-bold text-navy-950 leading-tight mb-4">
                30 Institutional<br />
                <span className="text-amber-600">Statutory Committees</span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed mb-6 max-w-md">
                Constituted as mandated by UGC, AICTE, VTU and the Government of Karnataka to ensure student welfare, institutional integrity and regulatory compliance.
              </p>
              <div className="flex flex-wrap gap-4 text-center">
                {[
                  { num: '30', label: 'Committees'     },
                  { num: '250+', label: 'Members'      },
                  { num: '80+', label: 'PDF Records'   },
                  { num: '6+',  label: 'Years of Data' },
                ].map(s => (
                  <div key={s.label} className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
                    <p className="font-black text-amber-700 text-xl leading-none">{s.num}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            </AnimateIn>
            <AnimateIn variant="fade-left" delay={120}>
            <div className="hidden lg:block">
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-4">Key Committees</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Anti-Ragging', 'ICC / CICC', 'IQAC', 'Examination', 'Placement', 'Research & Dev', 'Women\'s Cell', 'SC/ST Welfare', 'Student Grievance', 'Finance Committee'].map(t => (
                    <div key={t} className="bg-white rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 border border-amber-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── Master Table + Accordions ── */}
      <div className="container-wide py-10">

        {/* Search */}
        <AnimateIn variant="fade-up">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display font-bold text-navy-950 text-lg sm:text-xl">All Committees</h2>
            <p className="text-slate-400 text-sm mt-0.5">Click any row to view member details</p>
          </div>
          <input
            type="text"
            placeholder="Search committee or in-charge..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-navy-900/20 bg-white"
          />
        </div>
        </AnimateIn>

        {/* Master overview table */}
        <AnimateIn variant="fade-up" delay={80}>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-900">
                  <th className="text-left px-4 py-3 font-bold text-white text-xs uppercase tracking-wide whitespace-nowrap">Sl.</th>
                  <th className="text-left px-4 py-3 font-bold text-white text-xs uppercase tracking-wide">Committee Name</th>
                  <th className="text-left px-4 py-3 font-bold text-white text-xs uppercase tracking-wide whitespace-nowrap">In-Charge</th>
                  <th className="text-left px-4 py-3 font-bold text-white text-xs uppercase tracking-wide">Designation</th>
                  <th className="text-center px-4 py-3 font-bold text-white text-xs uppercase tracking-wide whitespace-nowrap">Minutes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i} className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-4 py-3 text-slate-400 text-xs font-medium">{COMMITTEES.indexOf(c) + 1}</td>
                    <td className="px-4 py-3 text-navy-900 font-semibold">{c.name}</td>
                    <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{c.incharge}</td>
                    <td className="px-4 py-3 text-slate-500">{c.designation}</td>
                    <td className="px-4 py-3 text-center">
                      {c.minutes
                        ? <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">✓ Available</span>
                        : <span className="text-slate-300 text-xs">—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        </AnimateIn>

        {/* Accordion details */}
        <AnimateIn variant="fade-up" delay={100}>
        <div className="mb-6">
          <h3 className="font-display font-bold text-navy-950 text-lg mb-4 flex items-center gap-2">
            <Users size={18} className="text-amber-500" /> Committee Details
          </h3>
          <div className="space-y-2">
            {filtered.map((c, i) => (
              <CommitteeAccordion key={c.name} c={c} index={COMMITTEES.indexOf(c)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center">
              <p className="text-slate-400 text-sm">No committees found matching "{search}"</p>
              <button onClick={() => setSearch('')} className="mt-3 text-xs font-semibold text-blue-600 hover:underline">Clear search</button>
            </div>
          )}
        </div>

        </AnimateIn>

        {/* Footer note */}
        <AnimateIn variant="fade-up" delay={80}>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-amber-900 text-sm">Meeting Minutes &amp; Official Records</p>
            <p className="text-amber-700 text-xs mt-0.5">Downloadable PDFs for all committees are available on the official NHCE website.</p>
          </div>
          <a
            href="https://newhorizoncollegeofengineering.in/statutory-committee/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap flex-shrink-0"
          >
            Official Records <ExternalLink size={13} />
          </a>
        </div>
        </AnimateIn>

      </div>
    </div>
  );
}
