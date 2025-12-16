'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockApplications, mockUsers } from '@/lib/mockData';
import { Application } from '@/types';
import { Calendar, Clock, Video, MapPin, X } from 'lucide-react';

function ScheduleInterviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const applicationId = searchParams.get('applicationId');
  const [application, setApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    scheduledDate: '',
    scheduledTime: '',
    mode: 'online' as 'online' | 'onsite',
    interviewerId: user?.id || '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user || (user.role !== 'super_admin' && user.role !== 'department_hr')) {
      router.push('/dashboard');
      return;
    }

    if (applicationId) {
      const foundApp = mockApplications.find(app => app.id === applicationId);
      setApplication(foundApp || null);
    }
  }, [applicationId, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!application) return;

    // In real app, this would be an API call
    setSubmitted(true);
    setTimeout(() => {
      router.push('/interviews');
    }, 1500);
  };

  const availableInterviewers = mockUsers.filter(
    u => u.role === 'super_admin' || (u.role === 'department_hr' && u.departmentId === application?.departmentId)
  );

  if (!application) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground">Application not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Schedule Interview</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Name</p>
            <p className="font-medium text-gray-900">{application.candidateName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">{application.candidateEmail}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Job Position</p>
            <p className="font-medium text-gray-900">{application.jobTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Department</p>
            <p className="font-medium text-gray-900">{application.departmentName}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Interview Date *
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Interview Time *
              </label>
              <input
                type="time"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.scheduledTime}
                onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Mode *
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="online"
                  checked={formData.mode === 'online'}
                  onChange={(e) => setFormData({ ...formData, mode: 'online' })}
                  className="mr-2"
                />
                <Video className="w-4 h-4 mr-1" />
                Online
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="mode"
                  value="onsite"
                  checked={formData.mode === 'onsite'}
                  onChange={(e) => setFormData({ ...formData, mode: 'onsite' })}
                  className="mr-2"
                />
                <MapPin className="w-4 h-4 mr-1" />
                Onsite
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interviewer *
            </label>
            <select
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.interviewerId}
              onChange={(e) => setFormData({ ...formData, interviewerId: e.target.value })}
            >
              <option value="">Select Interviewer</option>
              {availableInterviewers.map((interviewer) => (
                <option key={interviewer.id} value={interviewer.id}>
                  {interviewer.name} ({interviewer.role === 'super_admin' ? 'Super Admin' : 'Dept HR'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional information for the candidate..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitted}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              submitted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {submitted ? 'Scheduling...' : 'Schedule Interview'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ScheduleInterviewPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto">Loading...</div>}>
      <ScheduleInterviewContent />
    </Suspense>
  );
}

