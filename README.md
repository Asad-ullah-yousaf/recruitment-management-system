# Recruitment Management System (RMS)

A comprehensive frontend prototype for a Recruitment Management System designed for mid-to-large companies. This system includes role-based access control, automated candidate eligibility validation, interview management, and real-time hiring analytics dashboards.

## Features

### 1. Candidate Portal (Public Facing)
- **Candidate Registration**: Easy registration and profile creation
- **Job Browsing**: Browse jobs by department with filtering
- **Application System**: 
  - Apply for jobs with personal details, education, skills, and experience
  - CV upload (PDF/DOC) with file validation
  - **Hard Eligibility Enforcement**: 
    - Validates eligibility before submission
    - Disables submission if requirements are not met
    - Displays clear rejection reasons
    - Ineligible candidates cannot submit applications

### 2. User Roles & Access Control
- **Super Admin (HR Manager)**: 
  - Access to all departments
  - Global dashboards & analytics
- **Department HR/Admin**: 
  - Restricted to assigned department only
  - Department-level dashboards
- **Candidate**: 
  - Only personal application data & statuses

### 3. Admin & HR Dashboards

#### Super Admin Dashboard
- **Overall Hiring Metrics**:
  - Total applications received
  - Total candidates shortlisted
  - Total interviews conducted
  - Total hires completed
  - Hiring conversion rate (applications → hires)
- **Department-wise Hiring Stats**:
  - Applications per department
  - Shortlisted candidates per department
  - Interviews per department
  - Hires per department
- **Job Position Metrics**:
  - Applications per job
  - Open vs closed positions
- **Trend & Time-Based Analytics**:
  - Weekly/monthly hiring trends
  - Interview success rate
  - Visualizations (Bar charts, Line charts, Pie charts)

#### Department HR Dashboard
- Department-specific statistics only
- Total applications in their department
- Candidates at each stage (New, Shortlisted, Interviewed, Rejected, Hired)
- Active job openings
- Interview schedules & pending interviews
- **No access to global or other department data**

### 4. Department Pages & Candidate Routing
- Each department has a dedicated page
- Candidates are automatically routed to the correct department based on job applied
- Admins can:
  - View candidate lists with filters
  - Review CVs
  - Shortlist / reject candidates
  - Initiate interview scheduling

### 5. Interview Management System
- **Schedule Interviews**:
  - Date, time, mode (online / onsite)
  - Interviewer assignment
- **Interview Statuses**:
  - Scheduled
  - Completed
  - Passed
  - Failed
  - On Hold
- **Interview Feedback & Notes**: Comprehensive feedback system
- **Candidate Notifications**: (UI ready for integration)
- Interview outcome feeds directly into dashboard stats

### 6. System Rules & Business Logic
- Candidates cannot apply twice for the same job
- Candidates can apply to multiple jobs (if eligible)
- Admin access is department-limited except Super Admin
- CV validation: File type & size enforced
- Audit logs: (UI ready for tracking hiring decisions & status changes)

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd recruitment-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Demo Credentials

### Super Admin
- **Email**: `admin@rms.com`
- **Password**: (any password works in prototype)

### Department HR (Technology)
- **Email**: `hr.tech@rms.com`
- **Password**: (any password works in prototype)

### Candidate
- **Email**: `candidate1@email.com`
- **Password**: (any password works in prototype)

## Project Structure

```
recruitment-management-system/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── jobs/              # Job browsing and application
│   ├── applications/     # Candidate applications view
│   ├── departments/       # Department management
│   └── interviews/        # Interview management
├── components/            # Reusable React components
├── context/               # React Context providers
├── lib/                   # Utility functions and mock data
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Key Features Implementation

### Eligibility Validation
The system enforces hard eligibility rules:
- Checks mandatory skills against candidate skills
- Validates minimum experience requirements
- Verifies required qualifications
- Prevents submission if any requirement is not met
- Shows clear rejection reasons

### Role-Based Access Control
- Navigation and page access are controlled by user role
- Department HR can only see their department's data
- Super Admin has global access
- Candidates only see their own applications

### Analytics & Visualizations
- Real-time dashboard statistics
- Interactive charts (Bar, Line, Pie)
- Department-wise comparisons
- Hiring trends over time
- Conversion rate calculations

## System Architecture

### Frontend-Only Prototype
This is a **frontend-only prototype** with mock data. All data is stored in memory/localStorage for demonstration purposes. In a production environment, this would connect to:
- RESTful API or GraphQL backend
- Database (PostgreSQL, MongoDB, etc.)
- Authentication service
- File storage for CVs

### Data Flow
1. User authentication → Role-based routing
2. Dashboard → Aggregated statistics from mock data
3. Applications → Eligibility validation → Status updates
4. Interviews → Scheduling → Status tracking → Feedback

## Future Enhancements

The system is designed to support:
- AI-based CV scoring
- Automated candidate ranking
- Hiring bottleneck detection
- Predictive time-to-hire metrics
- Email notifications
- Real-time updates via WebSockets
- Advanced search and filtering
- Export functionality for reports

## Notes

- This is a **prototype** - no backend is implemented
- All data is stored in memory/localStorage
- Authentication is simplified (any password works)
- File uploads are simulated (no actual file storage)
- All statistics are calculated from mock data

## License

This project is a prototype for demonstration purposes.
