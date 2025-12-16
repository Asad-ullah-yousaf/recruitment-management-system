export type UserRole = 'super_admin' | 'department_hr' | 'candidate';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  departmentId?: string; // For department_hr role
  departmentName?: string;
}

export interface Division {
  id: string;
  name: string;
  coreBusinessFocus: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  divisionId: string;
  divisionName: string;
}

export interface Job {
  id: string;
  title: string;
  departmentId: string;
  departmentName: string;
  divisionId: string;
  divisionName: string;
  description: string;
  requiredQualifications: string[];
  mandatorySkills: string[];
  minimumExperience: number; // in years
  status: 'open' | 'closed';
  createdAt: string;
}

export interface Candidate {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  education: Education[];
  skills: string[];
  experience: Experience[];
  cvUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  years: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  departmentId: string;
  departmentName: string;
  divisionId: string;
  divisionName: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  status: 'new' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  appliedAt: string;
  eligibilityStatus: 'eligible' | 'ineligible';
  rejectionReasons?: string[];
  cvUrl?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  departmentId: string;
  departmentName: string;
  divisionId: string;
  divisionName: string;
  scheduledDate: string;
  scheduledTime: string;
  mode: 'online' | 'onsite';
  interviewerId: string;
  interviewerName: string;
  status: 'scheduled' | 'completed' | 'passed' | 'failed' | 'on_hold';
  feedback?: string;
  notes?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalApplications: number;
  totalShortlisted: number;
  totalInterviews: number;
  totalHires: number;
  conversionRate: number;
  departmentStats: DepartmentStat[];
  divisionStats?: DivisionStat[];
  jobPositionMetrics: JobMetric[];
  trends: TrendData[];
}

export interface DepartmentStat {
  departmentId: string;
  departmentName: string;
  divisionId?: string;
  divisionName?: string;
  applications: number;
  shortlisted: number;
  interviews: number;
  hires: number;
}

export interface DivisionStat {
  divisionId: string;
  divisionName: string;
  applications: number;
  shortlisted: number;
  interviews: number;
  hires: number;
}

export interface JobMetric {
  jobId: string;
  jobTitle: string;
  applications: number;
  status: 'open' | 'closed';
  timeToHire?: number; // in days
}

export interface TrendData {
  period: string; // week or month
  applications: number;
  interviews: number;
  hires: number;
}

