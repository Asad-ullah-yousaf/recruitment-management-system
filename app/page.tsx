'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Briefcase, Users, BarChart3, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'super_admin' || user?.role === 'department_hr') {
        router.push('/dashboard');
      } else if (user?.role === 'candidate') {
        router.push('/jobs');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Recruitment Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Streamline your hiring process with our comprehensive RMS solution
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Briefcase className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-center">Job Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Post and manage job openings across departments
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-center">Candidate Portal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Easy application process with eligibility validation
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-center">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Real-time insights and hiring metrics
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-center">Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Secure access control for different user roles
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/auth/register">Register as Candidate</Link>
            </Button>
          </div>

          <Card className="mt-12 max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Badge variant="default" className="mb-2">Super Admin</Badge>
                  <p className="text-sm font-medium">admin@rms.com</p>
                  <p className="text-xs text-muted-foreground">(any password)</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Department HR</Badge>
                  <p className="text-sm font-medium">hr.tech@rms.com</p>
                  <p className="text-xs text-muted-foreground">(any password)</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">Candidate</Badge>
                  <p className="text-sm font-medium">candidate1@email.com</p>
                  <p className="text-xs text-muted-foreground">(any password)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
