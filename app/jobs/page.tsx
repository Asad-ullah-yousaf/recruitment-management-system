'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockJobs, mockApplications, mockCandidates, mockDivisions } from '@/lib/mockData';
import { Job, Application } from '@/types';
import Link from 'next/link';
import { Briefcase, Clock, CheckCircle, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedDivision, setSelectedDivision] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [applications, setApplications] = useState<Application[]>([]);
  const [candidate, setCandidate] = useState<any>(null);

  useEffect(() => {
    setJobs(mockJobs.filter(job => job.status === 'open'));
    setApplications(mockApplications);
    
    // Find current candidate
    if (user?.role === 'candidate') {
      const foundCandidate = mockCandidates.find(c => c.userId === user.id);
      setCandidate(foundCandidate);
    }
  }, [user]);

  const divisions = ['all', ...Array.from(new Set(mockJobs.map(j => j.divisionName)))];
  const departments = ['all', ...Array.from(new Set(mockJobs.map(j => j.departmentName)))];
  
  let filteredJobs = jobs;
  if (selectedDivision !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.divisionName === selectedDivision);
  }
  if (selectedDepartment !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.departmentName === selectedDepartment);
  }

  const hasApplied = (jobId: string) => {
    if (!user) return false;
    return applications.some(app => app.jobId === jobId && app.candidateId === candidate?.id);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4">Browse Job Openings</h1>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Filter by Division:</p>
          <div className="flex flex-wrap gap-2">
            {divisions.map((div) => (
              <Button
                key={div}
                variant={selectedDivision === div ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedDivision(div);
                  setSelectedDepartment('all');
                }}
              >
                {div === 'all' ? 'All Divisions' : div.split('(')[0].trim()}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Filter by Department:</p>
          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept === 'all' ? 'All Departments' : dept}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredJobs.map((job) => {
          const applied = hasApplied(job.id);
          return (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {job.divisionName}
                      </Badge>
                      <Badge variant="secondary">{job.departmentName}</Badge>
                      <span className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.minimumExperience} years exp.
                      </span>
                    </div>
                  </div>
                  {applied && (
                    <Badge variant="success" className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Applied
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{job.description}</p>

                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-2">Required Qualifications:</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    {job.requiredQualifications.map((qual, idx) => (
                      <li key={idx}>{qual}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-foreground mb-2">Mandatory Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.mandatorySkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  {applied ? (
                    <Button variant="secondary" disabled>
                      Already Applied
                    </Button>
                  ) : (
                    <Button asChild>
                      <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No job openings found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
