export const NAV_ITEMS = [
  {
    label: 'About',
    href: '#about',
    megamenu: [
      { label: 'Overview', desc: 'Our story & vision', href: '#about' },
      { label: 'Leadership', desc: 'Management & faculty', href: '#faculty' },
      { label: 'Accreditations', desc: 'NAAC, NBA, AICTE', href: '#about' },
      { label: 'Rankings', desc: 'National & global rankings', href: '#rankings' },
      { label: 'Infrastructure', desc: 'Campus & facilities', href: '#campus' },
      { label: 'IQAC', desc: 'Quality assurance', href: '#about' },
    ]
  },
  {
    label: 'Academics',
    href: '#departments',
    megamenu: [
      { label: 'B.E Programs', desc: '4-year undergraduate', href: '#departments' },
      { label: 'M.Tech Programs', desc: 'Postgraduate studies', href: '#departments' },
      { label: 'MBA', desc: 'Management studies', href: '#departments' },
      { label: 'MCA', desc: 'Computer applications', href: '#departments' },
      { label: 'Ph.D Programs', desc: 'Doctoral research', href: '#research' },
      { label: 'Curriculum', desc: 'Course structure', href: '#departments' },
    ]
  },
  {
    label: 'Admissions',
    href: '#admissions',
    megamenu: [
      { label: 'UG Admissions', desc: 'Apply for B.E programs', href: '#admissions' },
      { label: 'PG Admissions', desc: 'M.Tech, MBA, MCA', href: '#admissions' },
      { label: 'Fee Structure', desc: 'Tuition & other fees', href: '#admissions' },
      { label: 'Scholarships', desc: 'Merit & need-based aid', href: '#admissions' },
      { label: 'Eligibility', desc: 'Entry requirements', href: '#admissions' },
      { label: 'Apply Online', desc: 'Start your application', href: '#admissions' },
    ]
  },
  { label: 'Examinations', href: '/exam' },
  { label: 'Placements', href: '#placements' },
  { label: 'Research', href: '#research' },
  { label: 'Campus Life', href: '#campus' },
  { label: 'Contact', href: '#contact' },
];

export const STATS = [
  { value: 15000, suffix: '+', label: 'Students Enrolled', icon: '🎓' },
  { value: 98, suffix: '%', label: 'Placement Rate', icon: '💼' },
  { value: 450, suffix: '+', label: 'Expert Faculty', icon: '👨‍🏫' },
  { value: 28, suffix: '', label: 'Years of Excellence', icon: '🏆' },
  { value: 120, suffix: '+', label: 'Recruiting Companies', icon: '🏢' },
  { value: 42, suffix: 'L', label: 'Highest Package', icon: '💰' },
];

export const DEPARTMENTS = [
  {
    name: 'Computer Science & Engineering',
    code: 'CSE',
    color: 'from-blue-600 to-indigo-700',
    students: 1200,
    intake: 300,
    accredited: true,
    specializations: ['AI & ML', 'Data Science', 'Cybersecurity', 'Cloud Computing'],
    icon: '💻',
    image: '/campus/computer_lab.jpg',
  },
  {
    name: 'Electronics & Communication',
    code: 'ECE',
    color: 'from-purple-600 to-violet-700',
    students: 960,
    intake: 240,
    accredited: true,
    specializations: ['VLSI Design', 'Embedded Systems', '5G/IoT', 'Signal Processing'],
    icon: '📡',
    image: '/campus/idea_labs1.jpg',
  },
  {
    name: 'Master of Computer Applications',
    code: 'MCA',
    color: 'from-cyan-500 to-teal-700',
    students: 360,
    intake: 60,
    accredited: false,
    specializations: ['Full Stack Dev', 'Cloud Computing', 'Data Analytics', 'Cybersecurity'],
    icon: '🖥️',
    image: '/campus/nvidia.webp',
  },
  {
    name: 'Civil Engineering',
    code: 'CE',
    color: 'from-green-600 to-teal-700',
    students: 480,
    intake: 120,
    accredited: true,
    specializations: ['Structural', 'Geotechnical', 'Environmental', 'Construction Mgmt'],
    icon: '🏗️',
    image: '/campus/DSC_9769.jpg',
  },
  {
    name: 'Master of Technology',
    code: 'MTECH',
    color: 'from-indigo-600 to-violet-800',
    students: 180,
    intake: 60,
    accredited: false,
    specializations: ['Machine Learning', 'VLSI Design', 'Structural Engg', 'Power Systems'],
    icon: '🎓',
    image: '/campus/classroom2.jpg',
  },
  {
    name: 'Electrical Engineering',
    code: 'EEE',
    color: 'from-yellow-500 to-orange-600',
    students: 360,
    intake: 90,
    accredited: false,
    specializations: ['Power Systems', 'Control Systems', 'Renewable Energy', 'Smart Grids'],
    icon: '⚡',
    image: '/campus/DSC_9143.jpg',
  },
  {
    name: 'Artificial Intelligence & ML',
    code: 'AIML',
    color: 'from-pink-600 to-rose-700',
    students: 480,
    intake: 120,
    accredited: false,
    specializations: ['Deep Learning', 'NLP', 'Computer Vision', 'Generative AI'],
    icon: '🤖',
    image: '/campus/idea_labs.jpg',
  },
  {
    name: 'Master of Business Administration',
    code: 'MBA',
    color: 'from-slate-600 to-slate-800',
    students: 240,
    intake: 120,
    accredited: false,
    specializations: ['Finance', 'Marketing', 'HR', 'Operations & Analytics'],
    icon: '📊',
    image: '/campus/DSC_9921.jpg',
  },
];

export const RECRUITERS = [
  { name: 'Infosys',      logo: '/industry/infosys.jpg' },
  { name: 'IBM',          logo: '/industry/ibm.jpg' },
  { name: 'Cognizant',    logo: '/industry/cognizant.jpg' },
  { name: 'Capgemini',    logo: '/industry/capgemini.jpg' },
  { name: 'Deloitte',     logo: '/industry/deloitte.jpg' },
  { name: 'Oracle',       logo: '/industry/oracle.jpg' },
  { name: 'HSBC',         logo: '/industry/hsbc.jpg' },
  { name: 'Mindtree',     logo: '/industry/mindtree.jpg' },
  { name: 'Mphasis',      logo: '/industry/mphasis.jpg' },
  { name: 'Wipro',        logo: '/industry/wipro.jpg' },
  { name: 'L&T',          logo: '/industry/l&t.jpg' },
  { name: 'Eurofins',     logo: '/industry/eurofins.jpg' },
  { name: 'Bata',         logo: '/industry/bata.jpg' },
  { name: 'Aricent',      logo: '/industry/aricent.jpg' },
  { name: 'Cerner',       logo: '/industry/cerner.jpg' },
  { name: 'Sony',         logo: '/industry/sony.jpg' },
];

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    batch: '2021',
    dept: 'CSE',
    company: 'Google',
    role: 'Software Engineer',
    package: '₹28 LPA',
    quote: 'NHCE gave me a rock-solid foundation in CS fundamentals. The lab infrastructure and mentorship from faculty truly set me apart in interviews. The placement cell was incredibly supportive.',
    avatar: 'PS',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Rahul Menon',
    batch: '2020',
    dept: 'ECE',
    company: 'Qualcomm',
    role: 'VLSI Design Engineer',
    package: '₹22 LPA',
    quote: 'The ECE department at NHCE is top-notch. Our professors bring real industry experience to the classroom. I got placed at my dream company thanks to the technical training here.',
    avatar: 'RM',
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    name: 'Anjali Nair',
    batch: '2022',
    dept: 'AIML',
    company: 'Amazon',
    role: 'ML Engineer',
    package: '₹32 LPA',
    quote: 'Being in the AIML batch was a game-changer. The curriculum is aligned with industry trends, and the research opportunities are exceptional. NHCE truly prepares you for the future.',
    avatar: 'AN',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    name: 'Karthik Reddy',
    batch: '2019',
    dept: 'ME',
    company: 'Bosch',
    role: 'Design Engineer',
    package: '₹12 LPA',
    quote: 'The mechanical labs and project opportunities at NHCE were phenomenal. The industry collaborations meant we worked on real-world problems even as students.',
    avatar: 'KR',
    gradient: 'from-orange-500 to-red-600'
  },
];

export const EVENTS = [
  {
    title: 'Technova 2025 — Annual Tech Fest',
    date: 'March 15-17, 2025',
    type: 'Technical',
    desc: 'Three days of hackathons, project exhibitions, and technical quizzes with prizes worth ₹5 Lakhs.',
    attendees: 2000,
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-700 bg-blue-100'
  },
  {
    title: 'Horizon Cultural Festival',
    date: 'April 5-7, 2025',
    type: 'Cultural',
    desc: 'The biggest inter-collegiate cultural fest in Bangalore with performances, competitions, and celebrity appearances.',
    attendees: 5000,
    color: 'bg-purple-50 border-purple-200',
    accent: 'text-purple-700 bg-purple-100'
  },
  {
    title: 'Industry Connect Week',
    date: 'February 20-24, 2025',
    type: 'Career',
    desc: 'A week-long industry immersion program with guest lectures, workshops, and internship drives from 50+ companies.',
    attendees: 800,
    color: 'bg-green-50 border-green-200',
    accent: 'text-green-700 bg-green-100'
  },
  {
    title: 'Research Symposium 2025',
    date: 'January 28, 2025',
    type: 'Research',
    desc: 'Annual showcase of student and faculty research with paper presentations, poster sessions, and keynotes.',
    attendees: 600,
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-700 bg-amber-100'
  },
];

export const NEWS = [
  {
    title: 'NHCE Ranked #1 Engineering College in Karnataka by NIRF 2024',
    date: 'Dec 15, 2024',
    category: 'Rankings',
    image: 'rankings',
    desc: 'National Institutional Ranking Framework places NHCE among the top 50 engineering institutions in India.'
  },
  {
    title: 'New AI Research Center Inaugurated with ₹10 Cr Investment',
    date: 'Dec 1, 2024',
    category: 'Research',
    image: 'research',
    desc: 'The state-of-the-art AI & Data Science Research Center will benefit 2000+ students and 50+ research scholars.'
  },
  {
    title: 'Record 98% Placement Rate for Batch 2024 — Highest Ever',
    date: 'Nov 20, 2024',
    category: 'Placements',
    image: 'placement',
    desc: 'With 42 LPA as highest package and 6.8 LPA average, batch 2024 sets a new benchmark.'
  },
  {
    title: 'NBA Accreditation Renewed for All 8 UG Programs',
    date: 'Nov 5, 2024',
    category: 'Accreditation',
    image: 'accreditation',
    desc: 'National Board of Accreditation has renewed accreditation for all undergraduate engineering programs for 3 more years.'
  },
];

export const RESEARCH_AREAS = [
  { title: 'Artificial Intelligence & Deep Learning', projects: 42, funding: '₹3.2 Cr', icon: '🧠' },
  { title: 'IoT & Embedded Systems', projects: 28, funding: '₹1.8 Cr', icon: '📶' },
  { title: 'Sustainable Energy', projects: 19, funding: '₹2.1 Cr', icon: '⚡' },
  { title: 'Advanced Materials', projects: 15, funding: '₹1.4 Cr', icon: '🔬' },
  { title: 'Robotics & Automation', projects: 23, funding: '₹2.7 Cr', icon: '🤖' },
  { title: 'Quantum Computing', projects: 8, funding: '₹0.9 Cr', icon: '⚛️' },
];

export const ACCREDITATIONS = [
  { name: 'NAAC', grade: 'A+', desc: 'National Assessment', color: 'from-emerald-400 to-green-500' },
  { name: 'NBA', grade: '8/8', desc: 'Programs Accredited', color: 'from-blue-400 to-indigo-500' },
  { name: 'AICTE', grade: 'Approved', desc: 'All India Council', color: 'from-gold-400 to-amber-500' },
  { name: 'VTU', grade: 'Affiliated', desc: 'Visvesvaraya Tech Univ', color: 'from-purple-400 to-violet-500' },
  { name: 'ISO', grade: '9001:2015', desc: 'Quality Management', color: 'from-slate-400 to-slate-600' },
];

export const FAQS = [
  {
    q: 'What are the admission requirements for B.E. programs?',
    a: 'Candidates must have completed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 45% aggregate marks. Admission is through KCET/COMEDK/JEE Main scores.'
  },
  {
    q: 'What is the fee structure for engineering programs?',
    a: 'Tuition fees range from ₹95,000 to ₹1,10,000 per year depending on the program. Scholarships and installment payment options are available for eligible students.'
  },
  {
    q: 'Does NHCE provide hostel facilities?',
    a: 'Yes, we have separate hostels for boys and girls with modern amenities, 24/7 security, mess facility, Wi-Fi, and recreational areas. Accommodation is available for ~1500 students.'
  },
  {
    q: 'What is the average placement package?',
    a: 'The average CTC for the 2024 batch was ₹6.8 LPA with the highest package at ₹42 LPA from a leading tech company. Over 98% of eligible students were placed.'
  },
  {
    q: 'Are there research opportunities for undergraduate students?',
    a: 'Yes! We have active research centers in AI/ML, IoT, Robotics, and more. UG students can participate in funded research projects, publish papers, and file patents under faculty guidance.'
  },
  {
    q: 'What extracurricular activities are available?',
    a: 'NHCE has 40+ student clubs including coding, robotics, entrepreneurship, arts, sports, and cultural clubs. Annual fests, hackathons, and inter-collegiate competitions keep campus life vibrant.'
  },
];

export const CAMPUS_HIGHLIGHTS = [
  { title: '55-acre Campus', desc: 'Lush green, eco-friendly', icon: '🌳' },
  { title: '60,000 sq.ft Library', desc: '100K+ volumes, digital access', icon: '📚' },
  { title: 'Sports Complex', desc: 'Indoor & outdoor facilities', icon: '🏃' },
  { title: 'Innovation Lab', desc: 'Maker space & incubator', icon: '💡' },
  { title: 'Medical Center', desc: '24/7 health services', icon: '🏥' },
  { title: 'Cafeteria', desc: 'Multi-cuisine food court', icon: '🍽️' },
];
