'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { getDashboardStats } from '@/lib/mockData';
import { DashboardStats } from '@/types';
import StatCard from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  CheckCircle, 
  TrendingUp,
  Building2,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  'hsl(var(--primary))', 
  'hsl(var(--success))', 
  'hsl(var(--primary))', 
  'hsl(var(--warning))', 
  'hsl(var(--destructive))'
];

// Custom tooltip component for better styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role === 'candidate') {
      router.push('/jobs');
      return;
    }

    const dashboardStats = getDashboardStats(user.role, user.departmentId);
    setStats(dashboardStats);
  }, [user, router]);

  if (!stats || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const isSuperAdmin = user.role === 'super_admin';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          {isSuperAdmin ? 'Global Dashboard' : `${user.departmentName} Dashboard`}
        </h1>
        <p className="text-muted-foreground mt-2">
          {isSuperAdmin 
            ? 'Overview of all recruitment activities across departments'
            : 'Department-specific recruitment statistics and insights'
          }
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={Briefcase}
          color="blue"
        />
        <StatCard
          title="Shortlisted"
          value={stats.totalShortlisted}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Interviews"
          value={stats.totalInterviews}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="Hires"
          value={stats.totalHires}
          icon={CheckCircle}
          color="indigo"
          trend={`${stats.conversionRate.toFixed(1)}% conversion rate`}
        />
      </div>

      {/* Division Stats - Only for Super Admin */}
      {isSuperAdmin && stats.divisionStats && stats.divisionStats.length > 0 && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center mb-2">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Division-wise Hiring Statistics
                  </CardTitle>
                  <CardDescription className="text-base">
                    Comparative analysis of recruitment metrics across all major RMS divisions. 
                    Track applications, shortlisted candidates, interviews conducted, and successful hires 
                    to identify high-performing divisions and areas needing attention.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart 
                  data={stats.divisionStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="divisionName" 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                  />
                  <Bar dataKey="applications" fill="hsl(var(--primary))" name="Applications" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shortlisted" fill="hsl(var(--success))" name="Shortlisted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="hsl(var(--primary))" name="Interviews" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hires" fill="hsl(var(--warning))" name="Hires" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Department Stats - Only for Super Admin */}
      {isSuperAdmin && stats.departmentStats.length > 0 && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center mb-2">
                    <Building2 className="w-5 h-5 mr-2 text-primary" />
                    Department-wise Hiring Statistics
                  </CardTitle>
                  <CardDescription className="text-base">
                    Detailed breakdown of recruitment activities by functional department. 
                    Monitor application volumes, shortlisting rates, interview schedules, and hiring outcomes 
                    to optimize resource allocation and identify departmental hiring patterns.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart 
                  data={stats.departmentStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="departmentName" 
                    angle={-45}
                    textAnchor="end"
                    height={140}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                    interval={0}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                  />
                  <Bar dataKey="applications" fill="hsl(var(--primary))" name="Applications" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="shortlisted" fill="hsl(var(--success))" name="Shortlisted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="hsl(var(--primary))" name="Interviews" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="hires" fill="hsl(var(--warning))" name="Hires" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Department Stats Table - For Department HR */}
      {!isSuperAdmin && stats.departmentStats.length > 0 && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="mb-2">Department Statistics</CardTitle>
              <CardDescription className="text-base">
                Comprehensive overview of your department's recruitment metrics. 
                Track the number of applications received, candidates shortlisted, 
                interviews scheduled, and successful hires to monitor your department's hiring performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Count
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        Applications
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {stats.departmentStats[0]?.applications || 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        Shortlisted
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {stats.departmentStats[0]?.shortlisted || 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        Interviews
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {stats.departmentStats[0]?.interviews || 0}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        Hires
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {stats.departmentStats[0]?.hires || 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Application Distribution by Department - Pie Chart (Super Admin only) */}
      {isSuperAdmin && stats.departmentStats.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="mb-2">Application Distribution by Department</CardTitle>
              <CardDescription className="text-base">
                Visual representation of application volume distribution across departments. 
                Helps identify which departments receive the most applications and understand 
                the overall recruitment demand pattern.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={stats.departmentStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent, value }) => {
                      const shortName = name.length > 15 ? name.substring(0, 15) + '...' : name;
                      return `${shortName}\n${(percent * 100).toFixed(1)}% (${value})`;
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="applications"
                    style={{ fontSize: '11px', fontWeight: 500 }}
                  >
                    {stats.departmentStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="hsl(var(--card))" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    formatter={(value: any) => [value, 'Applications']}
                  />
                  <Legend 
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '12px' }}
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Job Position Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="mb-2">Top Job Positions</CardTitle>
              <CardDescription className="text-base">
                Overview of the most active job openings ranked by application volume. 
                Monitor which positions attract the most candidates and track their current status 
                (open/closed) to manage recruitment pipeline effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.jobPositionMetrics.slice(0, 5).map((job) => (
                  <div key={job.jobId} className="flex justify-between items-center p-4 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-1">{job.jobTitle}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.applications} applications
                        </span>
                        <Badge variant={job.status === 'open' ? 'success' : 'secondary'} className="text-xs">
                          {job.status}
                        </Badge>
                        {job.timeToHire && (
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.timeToHire} days
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hiring Trends */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Hiring Trends Over Time
              </CardTitle>
              <CardDescription className="text-base">
                Temporal analysis of recruitment activities showing weekly and monthly trends. 
                Track the flow of applications, interviews conducted, and successful hires over time 
                to identify seasonal patterns, growth trends, and recruitment cycle performance.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart 
              data={stats.trends}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="period" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{ value: 'Time Period', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                label={{ value: 'Count', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
                formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
              />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="hsl(var(--primary))" 
                name="Applications"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="interviews" 
                stroke="hsl(var(--success))" 
                name="Interviews"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="hires" 
                stroke="hsl(var(--warning))" 
                name="Hires"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--warning))', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Candidate Stage Breakdown - For Department HR */}
      {!isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="mb-2">Candidates by Stage</CardTitle>
            <CardDescription className="text-base">
              Visual breakdown of candidates at each stage of the recruitment pipeline. 
              Monitor the distribution of candidates from new applications through to successful hires, 
              helping identify bottlenecks and optimize the hiring process flow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-muted rounded-md">
                <p className="text-2xl font-bold text-foreground">
                  {stats.departmentStats[0]?.applications || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-1">New</p>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-md">
                <p className="text-2xl font-bold text-primary">
                  {stats.departmentStats[0]?.shortlisted || 0}
                </p>
                <p className="text-sm text-primary/80 mt-1">Shortlisted</p>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-md">
                <p className="text-2xl font-bold text-purple-600">
                  {stats.departmentStats[0]?.interviews || 0}
                </p>
                <p className="text-sm text-purple-600/80 mt-1">Interviewed</p>
              </div>
              <div className="text-center p-4 bg-destructive/10 rounded-md">
                <p className="text-2xl font-bold text-destructive">0</p>
                <p className="text-sm text-destructive/80 mt-1">Rejected</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-md">
                <p className="text-2xl font-bold text-green-600">
                  {stats.departmentStats[0]?.hires || 0}
                </p>
                <p className="text-sm text-green-600/80 mt-1">Hired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

