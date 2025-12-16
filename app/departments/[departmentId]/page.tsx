'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockApplications, mockDepartments, mockJobs } from '@/lib/mockData';
import { Application } from '@/types';
import { 
  Users, 
  Filter, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock,
  Calendar,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ArrowLeft } from 'lucide-react';

export default function DepartmentPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const departmentId = params.departmentId as string;
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Check access
    if (user.role === 'department_hr' && user.departmentId !== departmentId) {
      router.push('/dashboard');
      return;
    }

    // Filter applications by department
    const deptApplications = mockApplications.filter(app => app.departmentId === departmentId);
    setApplications(deptApplications);
  }, [departmentId, user, router]);

  const department = mockDepartments.find(d => d.id === departmentId);
  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  const handleStatusChange = (appId: string, newStatus: Application['status']) => {
    // In real app, this would be an API call
    setApplications(prev => prev.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    setSelectedApplication(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hired':
        return 'bg-success/10 text-success';
      case 'rejected':
        return 'bg-destructive/10 text-destructive';
      case 'shortlisted':
        return 'bg-primary/10 text-primary';
      case 'interviewed':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (!department) {
    return (
      <div className="max-w-7xl mx-auto">
        <p className="text-muted-foreground">Department not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Departments', href: '/departments' },
            { label: department.name },
          ]}
        />
      </div>

      {/* Header with Back Button */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/departments')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Departments
          </Button>
        </div>
        <div className="mb-2">
          <Badge variant="outline">{department.divisionName}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">{department.name}</h1>
        <p className="text-muted-foreground">{department.description}</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({applications.length})
        </Button>
        <Button
          variant={filter === 'new' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('new')}
        >
          New ({applications.filter(a => a.status === 'new').length})
        </Button>
        <Button
          variant={filter === 'shortlisted' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('shortlisted')}
        >
          Shortlisted ({applications.filter(a => a.status === 'shortlisted').length})
        </Button>
        <Button
          variant={filter === 'interviewed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('interviewed')}
        >
          Interviewed ({applications.filter(a => a.status === 'interviewed').length})
        </Button>
        <Button
          variant={filter === 'hired' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('hired')}
        >
          Hired ({applications.filter(a => a.status === 'hired').length})
        </Button>
        <Button
          variant={filter === 'rejected' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('rejected')}
        >
          Rejected ({applications.filter(a => a.status === 'rejected').length})
        </Button>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.candidateName}</div>
                      <div className="text-sm text-gray-500">{app.candidateEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.jobTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(app.appliedAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApplication(app)}
                        className="text-primary hover:text-primary/80"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {app.status === 'new' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(app.id, 'shortlisted')}
                            className="text-green-600 hover:text-green-900"
                            title="Shortlist"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(app.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                      {app.status === 'shortlisted' && (
                        <Link
                          href={`/interviews/schedule?applicationId=${app.id}`}
                          className="text-purple-600 hover:text-purple-900"
                          title="Schedule Interview"
                        >
                          <Calendar className="w-5 h-5" />
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No applications found.</p>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Candidate Information</h3>
                  <p className="text-gray-600">Name: {selectedApplication.candidateName}</p>
                  <p className="text-gray-600">Email: {selectedApplication.candidateEmail}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Job Position</h3>
                  <p className="text-gray-600">{selectedApplication.jobTitle}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Application Status</h3>
                  <span className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusColor(selectedApplication.status)}`}>
                    {selectedApplication.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">Applied Date</h3>
                  <p className="text-gray-600">{format(new Date(selectedApplication.appliedAt), 'MMMM dd, yyyy')}</p>
                </div>

                {selectedApplication.eligibilityStatus === 'ineligible' && selectedApplication.rejectionReasons && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <h3 className="font-semibold text-red-800 mb-2">Eligibility Issues</h3>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {selectedApplication.rejectionReasons.map((reason, idx) => (
                        <li key={idx}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedApplication.status === 'shortlisted' && (
                    <Link
                      href={`/interviews/schedule?applicationId=${selectedApplication.id}`}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                    >
                      Schedule Interview
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

