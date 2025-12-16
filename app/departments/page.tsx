'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { mockDepartments, mockDivisions } from '@/lib/mockData';
import { Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function DepartmentsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (user.role !== 'super_admin') {
      // Redirect to their department page
      if (user.departmentId) {
        router.push(`/departments/${user.departmentId}`);
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, router]);

  if (user?.role !== 'super_admin') {
    return null;
  }

  // Group departments by division
  const departmentsByDivision = mockDivisions.map(division => ({
    division,
    departments: mockDepartments.filter(dept => dept.divisionId === division.id),
  }));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Departments' },
          ]}
        />
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Departments by Division</h1>
        <p className="text-muted-foreground">Browse departments organized by RMS divisions</p>
      </div>

      <div className="space-y-8">
        {departmentsByDivision.map(({ division, departments }) => (
          <div key={division.id}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  {division.name}
                </CardTitle>
                <CardDescription>{division.coreBusinessFocus}</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {departments.map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departments/${dept.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <Badge variant="secondary">{departments.length} dept</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{dept.description}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-muted-foreground">
                        <Briefcase className="w-4 h-4 mr-1" />
                        View candidates
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
