'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockApplications, mockJobs } from '@/lib/mockData';
import { Application } from '@/types';
import { Briefcase, Clock, CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (user?.role === 'candidate') {
      // In real app, filter by current user's candidate ID
      setApplications(mockApplications);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hired':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'shortlisted':
      case 'interviewed':
        return <Hourglass className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-destructive/10 text-destructive';
      case 'shortlisted':
      case 'interviewed':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Applications</h1>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">You haven't applied to any jobs yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2">{app.jobTitle}</CardTitle>
                    <Badge variant="outline">{app.departmentName}</Badge>
                  </div>
                  <Badge className={`flex items-center space-x-2 ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span className="capitalize">{app.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  Applied on {format(new Date(app.appliedAt), 'MMM dd, yyyy')}
                </div>

                {app.eligibilityStatus === 'ineligible' && app.rejectionReasons && (
                  <Alert variant="destructive">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      <p className="font-semibold mb-1">Application Rejected:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {app.rejectionReasons.map((reason, idx) => (
                          <li key={idx}>{reason}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

