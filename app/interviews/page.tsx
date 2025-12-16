'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { mockInterviews, mockApplications } from '@/lib/mockData';
import { Interview } from '@/types';
import { Calendar, Clock, Video, MapPin, CheckCircle, XCircle, Hourglass, Edit, Plus, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import Link from 'next/link';

export default function InterviewsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    let filteredInterviews = mockInterviews;

    // Filter by department for department HR
    if (user.role === 'department_hr' && user.departmentId) {
      filteredInterviews = mockInterviews.filter(int => int.departmentId === user.departmentId);
    }

    setInterviews(filteredInterviews);
  }, [user, router]);

  const filteredInterviews = filter === 'all'
    ? interviews
    : interviews.filter(int => int.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-destructive" />;
      case 'on_hold':
        return <Hourglass className="w-5 h-5 text-warning" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-primary" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-success/10 text-success';
      case 'failed':
        return 'bg-destructive/10 text-destructive';
      case 'on_hold':
        return 'bg-warning/10 text-warning';
      case 'completed':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interview Management</h1>
          <p className="text-muted-foreground mt-2">Schedule and manage candidate interviews</p>
        </div>
        {(user?.role === 'super_admin' || user?.role === 'department_hr') && (
          <Button asChild>
            <Link href="/interviews/schedule">
              <Plus className="w-4 h-4 mr-2" />
              Schedule New Interview
            </Link>
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({interviews.length})
        </Button>
        <Button
          variant={filter === 'scheduled' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('scheduled')}
        >
          Scheduled ({interviews.filter(i => i.status === 'scheduled').length})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed ({interviews.filter(i => i.status === 'completed').length})
        </Button>
        <Button
          variant={filter === 'passed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('passed')}
        >
          Passed ({interviews.filter(i => i.status === 'passed').length})
        </Button>
        <Button
          variant={filter === 'failed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('failed')}
        >
          Failed ({interviews.filter(i => i.status === 'failed').length})
        </Button>
      </div>

      {/* Interviews List */}
      <div className="grid gap-6">
        {filteredInterviews.map((interview) => (
          <Card key={interview.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-1">{interview.candidateName}</CardTitle>
                  <p className="text-muted-foreground">{interview.jobTitle}</p>
                  <Badge variant="outline" className="mt-1">{interview.departmentName}</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(interview.status)}
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-2 text-primary" />
                  <span>{format(new Date(interview.scheduledDate), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>{interview.scheduledTime}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  {interview.mode === 'online' ? (
                    <Video className="w-5 h-5 mr-2 text-primary" />
                  ) : (
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                  )}
                  <span className="capitalize">{interview.mode}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <span className="text-sm">{interview.interviewerName}</span>
                </div>
              </div>

              {interview.feedback && (
                <div className="mb-4 p-3 bg-muted rounded-md">
                  <p className="text-sm font-semibold text-foreground mb-1">Feedback:</p>
                  <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                </div>
              )}

              {interview.notes && (
                <div className="mb-4 p-3 bg-primary/10 rounded-md">
                  <p className="text-sm font-semibold text-primary mb-1">Notes:</p>
                  <p className="text-sm text-primary/80">{interview.notes}</p>
                </div>
              )}

              {(user?.role === 'super_admin' || user?.role === 'department_hr') && (
                <div className="flex justify-end">
                  <Button asChild>
                    <Link href={`/interviews/${interview.id}/edit`}>
                      <Edit className="w-4 h-4 mr-2" />
                      Update Status
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInterviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No interviews found.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

