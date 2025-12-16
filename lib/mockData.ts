import { User, Division, Department, Job, Candidate, Application, Interview, DashboardStats } from '@/types';

// Mock Divisions
export const mockDivisions: Division[] = [
  {
    id: 'div1',
    name: 'Agriculture (Agri Services / Tarzan)',
    coreBusinessFocus: 'Seeds, Fertilizers, Pesticides, Crop Protection, Trading, and Field Operations.',
  },
  {
    id: 'div2',
    name: 'Real Estate & Construction',
    coreBusinessFocus: 'Property Acquisition, Development, and Hospitality (e.g., Faletti\'s Hotel).',
  },
  {
    id: 'div3',
    name: 'Corporate Services',
    coreBusinessFocus: 'Functions that support the entire Group, often centralized at the Lahore Head Office.',
  },
  {
    id: 'div4',
    name: 'Technology & IT',
    coreBusinessFocus: 'Digital transformation, software solutions, and infrastructure for the group.',
  },
  {
    id: 'div5',
    name: 'Energy & Telecommunications',
    coreBusinessFocus: 'Energy consultancy, power projects, and telecom service provision.',
  },
];

// Mock Departments
export const mockDepartments: Department[] = [
  // Agriculture Division
  { id: 'dept1', name: 'Sales & Distribution', description: 'Territory management and sales operations for agricultural products', divisionId: 'div1', divisionName: 'Agriculture (Agri Services / Tarzan)' },
  { id: 'dept2', name: 'R&D / Agronomy', description: 'Research and development in agriculture and crop science', divisionId: 'div1', divisionName: 'Agriculture (Agri Services / Tarzan)' },
  { id: 'dept3', name: 'Production/Manufacturing', description: 'Manufacturing and production of agricultural products', divisionId: 'div1', divisionName: 'Agriculture (Agri Services / Tarzan)' },
  { id: 'dept4', name: 'Supply Chain & Logistics', description: 'Supply chain management and logistics operations', divisionId: 'div1', divisionName: 'Agriculture (Agri Services / Tarzan)' },
  { id: 'dept5', name: 'Field Operations', description: 'Field operations and on-ground agricultural services', divisionId: 'div1', divisionName: 'Agriculture (Agri Services / Tarzan)' },
  
  // Real Estate & Construction Division
  { id: 'dept6', name: 'Project Management (Civil/MEP)', description: 'Construction project management for civil and MEP works', divisionId: 'div2', divisionName: 'Real Estate & Construction' },
  { id: 'dept7', name: 'Architecture & Design', description: 'Architectural design and planning services', divisionId: 'div2', divisionName: 'Real Estate & Construction' },
  { id: 'dept8', name: 'Real Estate Sales & Marketing', description: 'Sales and marketing for real estate properties', divisionId: 'div2', divisionName: 'Real Estate & Construction' },
  { id: 'dept9', name: 'Property Management', description: 'Property management and maintenance services', divisionId: 'div2', divisionName: 'Real Estate & Construction' },
  { id: 'dept10', name: 'Acquisition & Planning', description: 'Property acquisition and strategic planning', divisionId: 'div2', divisionName: 'Real Estate & Construction' },
  
  // Corporate Services Division
  { id: 'dept11', name: 'Finance & Accounts', description: 'Financial management and accounting services', divisionId: 'div3', divisionName: 'Corporate Services' },
  { id: 'dept12', name: 'Human Resources (HR)', description: 'Human resources management and talent acquisition', divisionId: 'div3', divisionName: 'Corporate Services' },
  { id: 'dept13', name: 'Legal & Compliance', description: 'Legal affairs and regulatory compliance', divisionId: 'div3', divisionName: 'Corporate Services' },
  { id: 'dept14', name: 'Administration', description: 'Administrative and support services', divisionId: 'div3', divisionName: 'Corporate Services' },
  { id: 'dept15', name: 'Executive Secretariat', description: 'Executive support and secretarial services', divisionId: 'div3', divisionName: 'Corporate Services' },
  
  // Technology & IT Division
  { id: 'dept16', name: 'Software Development (Internal RMS/ERP)', description: 'Internal software development for RMS/ERP systems', divisionId: 'div4', divisionName: 'Technology & IT' },
  { id: 'dept17', name: 'IT Infrastructure & Networking', description: 'IT infrastructure management and networking', divisionId: 'div4', divisionName: 'Technology & IT' },
  { id: 'dept18', name: 'Data Analytics / Business Intelligence (BI)', description: 'Data analytics and business intelligence solutions', divisionId: 'div4', divisionName: 'Technology & IT' },
  { id: 'dept19', name: 'Cybersecurity', description: 'Cybersecurity and information security management', divisionId: 'div4', divisionName: 'Technology & IT' },
  
  // Energy & Telecommunications Division
  { id: 'dept20', name: 'Technical Engineering', description: 'Technical engineering for energy and telecom projects', divisionId: 'div5', divisionName: 'Energy & Telecommunications' },
  { id: 'dept21', name: 'Project Bidding & Management', description: 'Project bidding and management for energy/telecom', divisionId: 'div5', divisionName: 'Energy & Telecommunications' },
  { id: 'dept22', name: 'Regulatory Affairs', description: 'Regulatory compliance and affairs management', divisionId: 'div5', divisionName: 'Energy & Telecommunications' },
  { id: 'dept23', name: 'Telecom Operations', description: 'Telecommunications operations and services', divisionId: 'div5', divisionName: 'Energy & Telecommunications' },
  { id: 'dept24', name: 'Business Development', description: 'Business development for energy and telecom sectors', divisionId: 'div5', divisionName: 'Energy & Telecommunications' },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@rms.com',
    name: 'Mamoon Musa',
    role: 'super_admin',
  },
  {
    id: '2',
    email: 'hr.tech@rms.com',
    name: 'Sarah Tech HR',
    role: 'department_hr',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
  },
  {
    id: '3',
    email: 'hr.agri@rms.com',
    name: 'Ahmed Agri HR',
    role: 'department_hr',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
  },
  {
    id: '4',
    email: 'hr.realestate@rms.com',
    name: 'Fatima Real Estate HR',
    role: 'department_hr',
    departmentId: 'dept6',
    departmentName: 'Project Management (Civil/MEP)',
  },
  {
    id: '5',
    email: 'alice.chen@email.com',
    name: 'Alice Chen',
    role: 'candidate',
  },
  {
    id: '6',
    email: 'ahmed.hassan@email.com',
    name: 'Ahmed Hassan',
    role: 'candidate',
  },
  {
    id: '7',
    email: 'fatima.ali@email.com',
    name: 'Fatima Ali',
    role: 'candidate',
  },
  {
    id: '8',
    email: 'm.usman@email.com',
    name: 'Muhammad Usman',
    role: 'candidate',
  },
  {
    id: '9',
    email: 'sana.malik@email.com',
    name: 'Sana Malik',
    role: 'candidate',
  },
  {
    id: '10',
    email: 'hassan.raza@email.com',
    name: 'Dr. Hassan Raza',
    role: 'candidate',
  },
  {
    id: '11',
    email: 'zain.ahmed@email.com',
    name: 'Zain Ahmed',
    role: 'candidate',
  },
  {
    id: '12',
    email: 'ayesha.khan@email.com',
    name: 'Ayesha Khan',
    role: 'candidate',
  },
  {
    id: '13',
    email: 'omar.sheikh@email.com',
    name: 'Omar Sheikh',
    role: 'candidate',
  },
  {
    id: '14',
    email: 'hina.zaidi@email.com',
    name: 'Hina Zaidi',
    role: 'candidate',
  },
  {
    id: '15',
    email: 'bilal.qureshi@email.com',
    name: 'Bilal Qureshi',
    role: 'candidate',
  },
  {
    id: '16',
    email: 'sara.iqbal@email.com',
    name: 'Sara Iqbal',
    role: 'candidate',
  },
  {
    id: '17',
    email: 'kamran.ali@email.com',
    name: 'Kamran Ali',
    role: 'candidate',
  },
  {
    id: '18',
    email: 'nida.shah@email.com',
    name: 'Nida Shah',
    role: 'candidate',
  },
];

// Mock Jobs based on example positions
export const mockJobs: Job[] = [
  // Agriculture - Sales & Distribution
  {
    id: 'job1',
    title: 'Territory Manager',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    description: 'Manage sales territory for agricultural products including seeds, fertilizers, and pesticides. Develop and maintain relationships with distributors and farmers.',
    requiredQualifications: ['Bachelor\'s in Agriculture, Business, or related field', 'MBA preferred'],
    mandatorySkills: ['Sales Management', 'Territory Planning', 'Customer Relationship Management', 'Agricultural Products Knowledge'],
    minimumExperience: 5,
    status: 'open',
    createdAt: '2024-01-15',
  },
  {
    id: 'job2',
    title: 'Area Sales Officer',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    description: 'Execute sales strategies in assigned areas, meet sales targets, and provide support to distributors.',
    requiredQualifications: ['Bachelor\'s in Agriculture or Business'],
    mandatorySkills: ['Sales', 'Communication', 'Agricultural Products'],
    minimumExperience: 2,
    status: 'open',
    createdAt: '2024-02-01',
  },
  {
    id: 'job3',
    title: 'Agri Field Consultant',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    description: 'Provide technical consultation to farmers on crop protection, fertilizers, and best practices.',
    requiredQualifications: ['Bachelor\'s in Agriculture or Agronomy'],
    mandatorySkills: ['Agronomy', 'Crop Protection', 'Field Consultation', 'Technical Communication'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-01-20',
  },
  
  // Agriculture - R&D / Agronomy
  {
    id: 'job4',
    title: 'Research Agronomist',
    departmentId: 'dept2',
    departmentName: 'R&D / Agronomy',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    description: 'Conduct research on crop varieties, soil management, and agricultural best practices.',
    requiredQualifications: ['Master\'s in Agronomy or Agriculture', 'PhD preferred'],
    mandatorySkills: ['Research Methodology', 'Data Analysis', 'Agronomy', 'Laboratory Techniques'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-01-25',
  },
  {
    id: 'job5',
    title: 'Seed Breeder',
    departmentId: 'dept2',
    departmentName: 'R&D / Agronomy',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    description: 'Develop and improve seed varieties through breeding programs and genetic research.',
    requiredQualifications: ['Master\'s in Plant Breeding or Genetics'],
    mandatorySkills: ['Plant Breeding', 'Genetics', 'Research', 'Laboratory Work'],
    minimumExperience: 4,
    status: 'open',
    createdAt: '2024-02-05',
  },
  
  // Real Estate - Project Management
  {
    id: 'job6',
    title: 'Construction Manager',
    departmentId: 'dept6',
    departmentName: 'Project Management (Civil/MEP)',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    description: 'Oversee construction projects from planning to completion, manage teams and ensure quality standards.',
    requiredQualifications: ['Bachelor\'s in Civil Engineering', 'PMP certification preferred'],
    mandatorySkills: ['Project Management', 'Construction Management', 'Team Leadership', 'Quality Control'],
    minimumExperience: 8,
    status: 'open',
    createdAt: '2024-01-18',
  },
  {
    id: 'job7',
    title: 'Civil Engineer',
    departmentId: 'dept6',
    departmentName: 'Project Management (Civil/MEP)',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    description: 'Design and supervise civil engineering works for construction projects.',
    requiredQualifications: ['Bachelor\'s in Civil Engineering', 'PEC registration required'],
    mandatorySkills: ['Civil Engineering', 'AutoCAD', 'Project Design', 'Site Supervision'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-02-10',
  },
  
  // Real Estate - Sales & Marketing
  {
    id: 'job8',
    title: 'Real Estate Sales Executive',
    departmentId: 'dept8',
    departmentName: 'Real Estate Sales & Marketing',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    description: 'Sell real estate properties, manage client relationships, and achieve sales targets.',
    requiredQualifications: ['Bachelor\'s in Business, Marketing, or related field'],
    mandatorySkills: ['Sales', 'Real Estate Knowledge', 'Customer Service', 'Negotiation'],
    minimumExperience: 2,
    status: 'open',
    createdAt: '2024-01-22',
  },
  
  // Corporate Services - Finance & Accounts
  {
    id: 'job9',
    title: 'Senior Accounts Officer',
    departmentId: 'dept11',
    departmentName: 'Finance & Accounts',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    description: 'Manage accounting functions, financial reporting, and ensure compliance with accounting standards.',
    requiredQualifications: ['Bachelor\'s in Accounting or Finance', 'CA/ACCA preferred'],
    mandatorySkills: ['Accounting', 'Financial Reporting', 'ERP Systems', 'MS Excel'],
    minimumExperience: 4,
    status: 'open',
    createdAt: '2024-01-28',
  },
  {
    id: 'job10',
    title: 'Manager Financial Reporting',
    departmentId: 'dept11',
    departmentName: 'Finance & Accounts',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    description: 'Prepare and manage financial reports, budgets, and financial analysis for management.',
    requiredQualifications: ['Bachelor\'s in Accounting or Finance', 'CA/ACCA/MBA Finance'],
    mandatorySkills: ['Financial Reporting', 'Budgeting', 'Financial Analysis', 'IFRS'],
    minimumExperience: 6,
    status: 'open',
    createdAt: '2024-02-08',
  },
  
  // Corporate Services - HR
  {
    id: 'job11',
    title: 'Recruitment Specialist',
    departmentId: 'dept12',
    departmentName: 'Human Resources (HR)',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    description: 'Manage recruitment processes, source candidates, and coordinate hiring activities.',
    requiredQualifications: ['Bachelor\'s in HR, Business, or related field'],
    mandatorySkills: ['Recruitment', 'Talent Acquisition', 'Interviewing', 'HR Systems'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-01-30',
  },
  
  // Technology & IT - Software Development
  {
    id: 'job12',
    title: 'Software Engineer (Front-end)',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    description: 'Develop and maintain front-end applications for internal RMS/ERP systems.',
    requiredQualifications: ['Bachelor\'s in Computer Science or Software Engineering'],
    mandatorySkills: ['React', 'TypeScript', 'JavaScript', 'Front-end Development'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-02-01',
  },
  {
    id: 'job13',
    title: 'System Analyst',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    description: 'Analyze business requirements and design system solutions for RMS/ERP systems.',
    requiredQualifications: ['Bachelor\'s in Computer Science or Information Systems'],
    mandatorySkills: ['System Analysis', 'Requirements Gathering', 'UML', 'Database Design'],
    minimumExperience: 4,
    status: 'open',
    createdAt: '2024-02-12',
  },
  
  // Technology & IT - IT Infrastructure
  {
    id: 'job14',
    title: 'IT Manager',
    departmentId: 'dept17',
    departmentName: 'IT Infrastructure & Networking',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    description: 'Manage IT infrastructure, networking, and IT operations across the organization.',
    requiredQualifications: ['Bachelor\'s in Computer Science or IT', 'ITIL certification preferred'],
    mandatorySkills: ['IT Management', 'Network Administration', 'Infrastructure Management', 'IT Security'],
    minimumExperience: 7,
    status: 'open',
    createdAt: '2024-01-16',
  },
  
  // Energy & Telecom - Technical Engineering
  {
    id: 'job15',
    title: 'Electrical Engineer',
    departmentId: 'dept20',
    departmentName: 'Technical Engineering',
    divisionId: 'div5',
    divisionName: 'Energy & Telecommunications',
    description: 'Design and manage electrical systems for energy and power projects.',
    requiredQualifications: ['Bachelor\'s in Electrical Engineering', 'PEC registration required'],
    mandatorySkills: ['Electrical Engineering', 'Power Systems', 'Project Design', 'AutoCAD'],
    minimumExperience: 4,
    status: 'open',
    createdAt: '2024-02-03',
  },
  {
    id: 'job16',
    title: 'RF Engineer (Telecom)',
    departmentId: 'dept20',
    departmentName: 'Technical Engineering',
    divisionId: 'div5',
    divisionName: 'Energy & Telecommunications',
    description: 'Design and optimize radio frequency networks for telecommunications systems.',
    requiredQualifications: ['Bachelor\'s in Electrical/Telecommunications Engineering'],
    mandatorySkills: ['RF Engineering', 'Telecommunications', 'Network Optimization', 'RF Tools'],
    minimumExperience: 3,
    status: 'open',
    createdAt: '2024-02-15',
  },
];

// Mock Candidates - Diverse candidates across different departments
export const mockCandidates: Candidate[] = [
  // Technology & IT Candidates
  {
    id: 'cand1',
    userId: '5',
    name: 'Alice Chen',
    email: 'alice.chen@email.com',
    phone: '+92-300-1234567',
    education: [
      { degree: 'Bachelor\'s in Computer Science', institution: 'LUMS', year: 2020 },
      { degree: 'Master\'s in Software Engineering', institution: 'NUST', year: 2022 },
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
    experience: [
      { company: 'Systems Limited', position: 'Software Engineer', startDate: '2022-06-01', endDate: '2024-01-31', years: 2 },
    ],
  },
  {
    id: 'cand2',
    userId: '6',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@email.com',
    phone: '+92-321-2345678',
    education: [
      { degree: 'Bachelor\'s in Computer Science', institution: 'FAST-NU', year: 2021 },
    ],
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Next.js', 'Tailwind CSS'],
    experience: [
      { company: 'TechVista Solutions', position: 'Frontend Developer', startDate: '2021-07-01', years: 2 },
    ],
  },
  {
    id: 'cand3',
    userId: '7',
    name: 'Fatima Ali',
    email: 'fatima.ali@email.com',
    phone: '+92-333-3456789',
    education: [
      { degree: 'Bachelor\'s in Information Systems', institution: 'IBA Karachi', year: 2019 },
      { degree: 'MBA in IT Management', institution: 'IBA Karachi', year: 2021 },
    ],
    skills: ['System Analysis', 'Requirements Gathering', 'UML', 'Database Design', 'SQL', 'Project Management'],
    experience: [
      { company: 'Telenor Pakistan', position: 'Business Analyst', startDate: '2021-08-01', years: 3 },
    ],
  },
  
  // Agriculture Candidates
  {
    id: 'cand4',
    userId: '8',
    name: 'Muhammad Usman',
    email: 'm.usman@email.com',
    phone: '+92-300-4567890',
    education: [
      { degree: 'Bachelor\'s in Agriculture', institution: 'University of Agriculture Faisalabad', year: 2018 },
      { degree: 'Master\'s in Agribusiness', institution: 'University of Agriculture Faisalabad', year: 2020 },
    ],
    skills: ['Sales Management', 'Territory Planning', 'Customer Relationship Management', 'Agricultural Products Knowledge', 'Market Analysis'],
    experience: [
      { company: 'Fauji Fertilizer Company', position: 'Sales Executive', startDate: '2020-03-01', years: 4 },
    ],
  },
  {
    id: 'cand5',
    userId: '9',
    name: 'Sana Malik',
    email: 'sana.malik@email.com',
    phone: '+92-321-5678901',
    education: [
      { degree: 'Bachelor\'s in Agriculture', institution: 'Punjab University', year: 2020 },
    ],
    skills: ['Sales', 'Communication', 'Agricultural Products', 'Field Work', 'Customer Service'],
    experience: [
      { company: 'Engro Fertilizers', position: 'Field Sales Officer', startDate: '2021-01-01', years: 3 },
    ],
  },
  {
    id: 'cand6',
    userId: '10',
    name: 'Dr. Hassan Raza',
    email: 'hassan.raza@email.com',
    phone: '+92-333-6789012',
    education: [
      { degree: 'Bachelor\'s in Agriculture', institution: 'University of Agriculture Faisalabad', year: 2015 },
      { degree: 'Master\'s in Agronomy', institution: 'University of Agriculture Faisalabad', year: 2017 },
      { degree: 'PhD in Plant Breeding', institution: 'University of Agriculture Faisalabad', year: 2021 },
    ],
    skills: ['Research Methodology', 'Data Analysis', 'Agronomy', 'Laboratory Techniques', 'Plant Breeding', 'Genetics'],
    experience: [
      { company: 'PARC (Pakistan Agricultural Research Council)', position: 'Research Scientist', startDate: '2021-06-01', years: 3 },
    ],
  },
  
  // Real Estate & Construction Candidates
  {
    id: 'cand7',
    userId: '11',
    name: 'Zain Ahmed',
    email: 'zain.ahmed@email.com',
    phone: '+92-300-7890123',
    education: [
      { degree: 'Bachelor\'s in Civil Engineering', institution: 'NUST', year: 2016 },
      { degree: 'Master\'s in Construction Management', institution: 'NUST', year: 2018 },
    ],
    skills: ['Project Management', 'Construction Management', 'Team Leadership', 'Quality Control', 'AutoCAD', 'MS Project'],
    experience: [
      { company: 'Descon Engineering', position: 'Project Manager', startDate: '2018-07-01', years: 6 },
    ],
  },
  {
    id: 'cand8',
    userId: '12',
    name: 'Ayesha Khan',
    email: 'ayesha.khan@email.com',
    phone: '+92-321-8901234',
    education: [
      { degree: 'Bachelor\'s in Civil Engineering', institution: 'UET Lahore', year: 2020 },
    ],
    skills: ['Civil Engineering', 'AutoCAD', 'Project Design', 'Site Supervision', 'Structural Analysis'],
    experience: [
      { company: 'Lahore Development Authority', position: 'Civil Engineer', startDate: '2020-09-01', years: 3 },
    ],
  },
  {
    id: 'cand9',
    userId: '13',
    name: 'Omar Sheikh',
    email: 'omar.sheikh@email.com',
    phone: '+92-333-9012345',
    education: [
      { degree: 'Bachelor\'s in Business Administration', institution: 'LUMS', year: 2021 },
    ],
    skills: ['Sales', 'Real Estate Knowledge', 'Customer Service', 'Negotiation', 'Property Valuation'],
    experience: [
      { company: 'Zameen.com', position: 'Real Estate Sales Executive', startDate: '2021-06-01', years: 3 },
    ],
  },
  
  // Corporate Services Candidates
  {
    id: 'cand10',
    userId: '14',
    name: 'Hina Zaidi',
    email: 'hina.zaidi@email.com',
    phone: '+92-300-0123456',
    education: [
      { degree: 'Bachelor\'s in Accounting', institution: 'IBA Karachi', year: 2018 },
      { degree: 'ACCA', institution: 'ACCA Global', year: 2020 },
    ],
    skills: ['Accounting', 'Financial Reporting', 'ERP Systems', 'MS Excel', 'IFRS', 'Taxation'],
    experience: [
      { company: 'Deloitte Pakistan', position: 'Senior Accountant', startDate: '2020-03-01', years: 4 },
    ],
  },
  {
    id: 'cand11',
    userId: '15',
    name: 'Bilal Qureshi',
    email: 'bilal.qureshi@email.com',
    phone: '+92-321-1234567',
    education: [
      { degree: 'Bachelor\'s in Finance', institution: 'LUMS', year: 2017 },
      { degree: 'MBA Finance', institution: 'LUMS', year: 2019 },
    ],
    skills: ['Financial Reporting', 'Budgeting', 'Financial Analysis', 'IFRS', 'Excel', 'Power BI'],
    experience: [
      { company: 'Unilever Pakistan', position: 'Financial Analyst', startDate: '2019-08-01', years: 5 },
    ],
  },
  {
    id: 'cand12',
    userId: '16',
    name: 'Sara Iqbal',
    email: 'sara.iqbal@email.com',
    phone: '+92-333-2345678',
    education: [
      { degree: 'Bachelor\'s in Human Resource Management', institution: 'IBA Karachi', year: 2020 },
    ],
    skills: ['Recruitment', 'Talent Acquisition', 'Interviewing', 'HR Systems', 'Employee Relations'],
    experience: [
      { company: 'Nestle Pakistan', position: 'HR Coordinator', startDate: '2020-07-01', years: 4 },
    ],
  },
  
  // Energy & Telecommunications Candidates
  {
    id: 'cand13',
    userId: '17',
    name: 'Kamran Ali',
    email: 'kamran.ali@email.com',
    phone: '+92-300-3456789',
    education: [
      { degree: 'Bachelor\'s in Electrical Engineering', institution: 'UET Lahore', year: 2019 },
    ],
    skills: ['Electrical Engineering', 'Power Systems', 'Project Design', 'AutoCAD', 'ETAP', 'Protection Systems'],
    experience: [
      { company: 'Siemens Pakistan', position: 'Electrical Engineer', startDate: '2019-09-01', years: 5 },
    ],
  },
  {
    id: 'cand14',
    userId: '18',
    name: 'Nida Shah',
    email: 'nida.shah@email.com',
    phone: '+92-321-4567890',
    education: [
      { degree: 'Bachelor\'s in Telecommunications Engineering', institution: 'NUST', year: 2020 },
    ],
    skills: ['RF Engineering', 'Telecommunications', 'Network Optimization', 'RF Tools', '5G', 'LTE'],
    experience: [
      { company: 'Jazz Pakistan', position: 'RF Engineer', startDate: '2020-08-01', years: 4 },
    ],
  },
];

// Mock Applications - Diverse applications across departments
export const mockApplications: Application[] = [
  // Technology & IT Applications
  {
    id: 'app1',
    jobId: 'job12',
    jobTitle: 'Software Engineer (Front-end)',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    candidateId: 'cand1',
    candidateName: 'Alice Chen',
    candidateEmail: 'alice.chen@email.com',
    status: 'shortlisted',
    appliedAt: '2024-02-05',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app2',
    jobId: 'job12',
    jobTitle: 'Software Engineer (Front-end)',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    candidateId: 'cand2',
    candidateName: 'Ahmed Hassan',
    candidateEmail: 'ahmed.hassan@email.com',
    status: 'new',
    appliedAt: '2024-02-10',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app3',
    jobId: 'job13',
    jobTitle: 'System Analyst',
    departmentId: 'dept16',
    departmentName: 'Software Development (Internal RMS/ERP)',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    candidateId: 'cand3',
    candidateName: 'Fatima Ali',
    candidateEmail: 'fatima.ali@email.com',
    status: 'shortlisted',
    appliedAt: '2024-02-12',
    eligibilityStatus: 'eligible',
  },
  
  // Agriculture Applications
  {
    id: 'app4',
    jobId: 'job1',
    jobTitle: 'Territory Manager',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    candidateId: 'cand4',
    candidateName: 'Muhammad Usman',
    candidateEmail: 'm.usman@email.com',
    status: 'shortlisted',
    appliedAt: '2024-01-18',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app5',
    jobId: 'job2',
    jobTitle: 'Area Sales Officer',
    departmentId: 'dept1',
    departmentName: 'Sales & Distribution',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    candidateId: 'cand5',
    candidateName: 'Sana Malik',
    candidateEmail: 'sana.malik@email.com',
    status: 'new',
    appliedAt: '2024-02-08',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app6',
    jobId: 'job4',
    jobTitle: 'Research Agronomist',
    departmentId: 'dept2',
    departmentName: 'R&D / Agronomy',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    candidateId: 'cand6',
    candidateName: 'Dr. Hassan Raza',
    candidateEmail: 'hassan.raza@email.com',
    status: 'shortlisted',
    appliedAt: '2024-01-28',
    eligibilityStatus: 'eligible',
  },
  
  // Real Estate Applications
  {
    id: 'app7',
    jobId: 'job6',
    jobTitle: 'Construction Manager',
    departmentId: 'dept6',
    departmentName: 'Project Management (Civil/MEP)',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    candidateId: 'cand7',
    candidateName: 'Zain Ahmed',
    candidateEmail: 'zain.ahmed@email.com',
    status: 'interviewed',
    appliedAt: '2024-01-20',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app8',
    jobId: 'job7',
    jobTitle: 'Civil Engineer',
    departmentId: 'dept6',
    departmentName: 'Project Management (Civil/MEP)',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    candidateId: 'cand8',
    candidateName: 'Ayesha Khan',
    candidateEmail: 'ayesha.khan@email.com',
    status: 'new',
    appliedAt: '2024-02-12',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app9',
    jobId: 'job8',
    jobTitle: 'Real Estate Sales Executive',
    departmentId: 'dept8',
    departmentName: 'Real Estate Sales & Marketing',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    candidateId: 'cand9',
    candidateName: 'Omar Sheikh',
    candidateEmail: 'omar.sheikh@email.com',
    status: 'shortlisted',
    appliedAt: '2024-01-25',
    eligibilityStatus: 'eligible',
  },
  
  // Corporate Services Applications
  {
    id: 'app10',
    jobId: 'job9',
    jobTitle: 'Senior Accounts Officer',
    departmentId: 'dept11',
    departmentName: 'Finance & Accounts',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    candidateId: 'cand10',
    candidateName: 'Hina Zaidi',
    candidateEmail: 'hina.zaidi@email.com',
    status: 'shortlisted',
    appliedAt: '2024-01-30',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app11',
    jobId: 'job10',
    jobTitle: 'Manager Financial Reporting',
    departmentId: 'dept11',
    departmentName: 'Finance & Accounts',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    candidateId: 'cand11',
    candidateName: 'Bilal Qureshi',
    candidateEmail: 'bilal.qureshi@email.com',
    status: 'interviewed',
    appliedAt: '2024-02-10',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app12',
    jobId: 'job11',
    jobTitle: 'Recruitment Specialist',
    departmentId: 'dept12',
    departmentName: 'Human Resources (HR)',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    candidateId: 'cand12',
    candidateName: 'Sara Iqbal',
    candidateEmail: 'sara.iqbal@email.com',
    status: 'new',
    appliedAt: '2024-02-14',
    eligibilityStatus: 'eligible',
  },
  
  // Energy & Telecom Applications
  {
    id: 'app13',
    jobId: 'job15',
    jobTitle: 'Electrical Engineer',
    departmentId: 'dept20',
    departmentName: 'Technical Engineering',
    divisionId: 'div5',
    divisionName: 'Energy & Telecommunications',
    candidateId: 'cand13',
    candidateName: 'Kamran Ali',
    candidateEmail: 'kamran.ali@email.com',
    status: 'new',
    appliedAt: '2024-02-05',
    eligibilityStatus: 'eligible',
  },
  {
    id: 'app14',
    jobId: 'job16',
    jobTitle: 'RF Engineer (Telecom)',
    departmentId: 'dept20',
    departmentName: 'Technical Engineering',
    divisionId: 'div5',
    divisionName: 'Energy & Telecommunications',
    candidateId: 'cand14',
    candidateName: 'Nida Shah',
    candidateEmail: 'nida.shah@email.com',
    status: 'shortlisted',
    appliedAt: '2024-02-16',
    eligibilityStatus: 'eligible',
  },
];

// Mock Interviews
export const mockInterviews: Interview[] = [
  // Technology & IT Interviews
  {
      id: 'int1',
      applicationId: 'app1',
      candidateId: 'cand1',
      candidateName: 'Alice Chen',
      jobId: 'job12',
      jobTitle: 'Software Engineer (Front-end)',
      departmentId: 'dept16',
      divisionId: 'div4',
      divisionName: 'Technology & IT',
      scheduledDate: '2024-02-20',
      scheduledTime: '10:00',
      mode: 'online',
      interviewerId: '2',
      interviewerName: 'Sarah Tech HR',
      status: 'scheduled',
      createdAt: '2024-02-08',
      departmentName: 'Software Development (Internal RMS/ERP)',
  },
  {
    id: 'int2',
    applicationId: 'app1',
    candidateId: 'cand1',
    candidateName: 'Alice Chen',
    jobId: 'job12',
    jobTitle: 'Software Engineer (Front-end)',
    departmentId: 'dept16',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    scheduledDate: '2024-02-15',
    scheduledTime: '14:00',
    mode: 'onsite',
    interviewerId: '2',
    interviewerName: 'Sarah Tech HR',
    status: 'passed',
    feedback: 'Excellent technical skills and communication. Strong React and TypeScript knowledge. Demonstrated good problem-solving abilities.',
    notes: 'Strong candidate, recommend for next round. Has relevant experience with modern frontend technologies.',
    createdAt: '2024-02-01',
    departmentName: 'Software Development (Internal RMS/ERP)',
  },
  {
    id: 'int3',
    applicationId: 'app3',
    candidateId: 'cand3',
    candidateName: 'Fatima Ali',
    jobId: 'job13',
    jobTitle: 'System Analyst',
    departmentId: 'dept16',
    divisionId: 'div4',
    divisionName: 'Technology & IT',
    scheduledDate: '2024-02-18',
    scheduledTime: '11:00',
    mode: 'online',
    interviewerId: '2',
    interviewerName: 'Sarah Tech HR',
    status: 'scheduled',
    createdAt: '2024-02-13',
    departmentName: 'Software Development (Internal RMS/ERP)',
  },
  
  // Agriculture Interviews
  {
    id: 'int4',
    applicationId: 'app4',
    candidateId: 'cand4',
    candidateName: 'Muhammad Usman',
    jobId: 'job1',
    jobTitle: 'Territory Manager',
    departmentId: 'dept1',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    scheduledDate: '2024-02-22',
    scheduledTime: '15:00',
    mode: 'onsite',
    interviewerId: '3',
    interviewerName: 'Ahmed Agri HR',
    status: 'scheduled',
    createdAt: '2024-01-20',
    departmentName: 'Sales & Distribution',
  },
  {
    id: 'int5',
    applicationId: 'app6',
    candidateId: 'cand6',
    candidateName: 'Dr. Hassan Raza',
    jobId: 'job4',
    jobTitle: 'Research Agronomist',
    departmentId: 'dept2',
    divisionId: 'div1',
    divisionName: 'Agriculture (Agri Services / Tarzan)',
    scheduledDate: '2024-02-19',
    scheduledTime: '10:30',
    mode: 'online',
    interviewerId: '3',
    interviewerName: 'Ahmed Agri HR',
    status: 'scheduled',
    createdAt: '2024-01-30',
    departmentName: 'R&D / Agronomy',
  },
  
  // Real Estate Interviews
  {
    id: 'int6',
    applicationId: 'app7',
    candidateId: 'cand7',
    candidateName: 'Zain Ahmed',
    jobId: 'job6',
    jobTitle: 'Construction Manager',
    departmentId: 'dept6',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    scheduledDate: '2024-02-17',
    scheduledTime: '09:00',
    mode: 'onsite',
    interviewerId: '4',
    interviewerName: 'Fatima Real Estate HR',
    status: 'completed',
    feedback: 'Strong project management background. Good leadership skills and technical knowledge.',
    notes: 'Completed first round. Technical assessment pending.',
    createdAt: '2024-01-22',
    departmentName: 'Project Management (Civil/MEP)',
  },
  {
    id: 'int7',
    applicationId: 'app9',
    candidateId: 'cand9',
    candidateName: 'Omar Sheikh',
    jobId: 'job8',
    jobTitle: 'Real Estate Sales Executive',
    departmentId: 'dept8',
    divisionId: 'div2',
    divisionName: 'Real Estate & Construction',
    scheduledDate: '2024-02-21',
    scheduledTime: '14:30',
    mode: 'online',
    interviewerId: '4',
    interviewerName: 'Fatima Real Estate HR',
    status: 'scheduled',
    createdAt: '2024-01-27',
    departmentName: 'Real Estate Sales & Marketing',
  },
  
  // Corporate Services Interviews
  {
    id: 'int8',
    applicationId: 'app11',
    candidateId: 'cand11',
    candidateName: 'Bilal Qureshi',
    jobId: 'job10',
    jobTitle: 'Manager Financial Reporting',
    departmentId: 'dept11',
    divisionId: 'div3',
    divisionName: 'Corporate Services',
    scheduledDate: '2024-02-16',
    scheduledTime: '11:00',
    mode: 'onsite',
    interviewerId: '1',
    interviewerName: 'John Admin',
    status: 'completed',
    feedback: 'Excellent financial analysis skills. Strong background in IFRS and financial reporting.',
    notes: 'Very qualified candidate. Proceed to final round.',
    createdAt: '2024-02-11',
    departmentName: 'Finance & Accounts',
  },
  
  // Energy & Telecom Interviews
  {
    id: 'int9',
    applicationId: 'app14',
    candidateId: 'cand14',
    candidateName: 'Nida Shah',
    jobId: 'job16',
    jobTitle: 'RF Engineer (Telecom)',
    departmentId: 'dept20',
    divisionId: 'div5',
    divisionName: 'Energy & Telecommunications',
    scheduledDate: '2024-02-23',
    scheduledTime: '13:00',
    mode: 'online',
    interviewerId: '1',
    interviewerName: 'John Admin',
    status: 'scheduled',
    createdAt: '2024-02-17',
    departmentName: 'Technical Engineering',
  },
];

// Helper function to get dashboard stats
export function getDashboardStats(userRole: string, departmentId?: string): DashboardStats {
  let filteredApplications = mockApplications;
  let filteredInterviews = mockInterviews;

  if (userRole === 'department_hr' && departmentId) {
    filteredApplications = mockApplications.filter(app => app.departmentId === departmentId);
    filteredInterviews = mockInterviews.filter(int => int.departmentId === departmentId);
  }

  const totalApplications = filteredApplications.length;
  const totalShortlisted = filteredApplications.filter(app => app.status === 'shortlisted').length;
  const totalInterviews = filteredInterviews.length;
  const totalHires = filteredApplications.filter(app => app.status === 'hired').length;
  const conversionRate = totalApplications > 0 ? (totalHires / totalApplications) * 100 : 0;

  // Division stats (for Super Admin)
  const divisionStats = userRole === 'super_admin' ? mockDivisions.map(div => {
    const divApps = filteredApplications.filter(app => app.divisionId === div.id);
    return {
      divisionId: div.id,
      divisionName: div.name,
      applications: divApps.length,
      shortlisted: divApps.filter(app => app.status === 'shortlisted').length,
      interviews: filteredInterviews.filter(int => {
        const app = mockApplications.find(a => a.id === int.applicationId);
        return app?.divisionId === div.id;
      }).length,
      hires: divApps.filter(app => app.status === 'hired').length,
    };
  }) : undefined;

  // Department stats
  const departmentStats = mockDepartments.map(dept => {
    const deptApps = filteredApplications.filter(app => app.departmentId === dept.id);
    return {
      departmentId: dept.id,
      departmentName: dept.name,
      divisionId: dept.divisionId,
      divisionName: dept.divisionName,
      applications: deptApps.length,
      shortlisted: deptApps.filter(app => app.status === 'shortlisted').length,
      interviews: filteredInterviews.filter(int => int.departmentId === dept.id).length,
      hires: deptApps.filter(app => app.status === 'hired').length,
    };
  }).filter(stat => userRole === 'super_admin' || stat.departmentId === departmentId);

  // Job metrics
  const jobPositionMetrics = mockJobs.map(job => {
    const jobApps = filteredApplications.filter(app => app.jobId === job.id);
    return {
      jobId: job.id,
      jobTitle: job.title,
      applications: jobApps.length,
      status: job.status,
    };
  });

  // Trends (simplified - in real app would be time-based)
  const trends = [
    { period: 'Week 1', applications: 15, interviews: 5, hires: 2 },
    { period: 'Week 2', applications: 22, interviews: 8, hires: 3 },
    { period: 'Week 3', applications: 18, interviews: 6, hires: 1 },
    { period: 'Week 4', applications: 25, interviews: 10, hires: 4 },
  ];

  return {
    totalApplications,
    totalShortlisted,
    totalInterviews,
    totalHires,
    conversionRate,
    departmentStats,
    divisionStats,
    jobPositionMetrics,
    trends,
  };
}
