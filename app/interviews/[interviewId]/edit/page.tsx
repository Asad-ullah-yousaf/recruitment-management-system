'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockInterviews, mockApplications } from '@/lib/mockData';
import { Interview } from '@/types';
import { CheckCircle, XCircle, Hourglass, Save } from 'lucide-react';
import { format } from 'date-fns';

export default function EditInterviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const interviewId = params.interviewId as string;
  const [interview, setInterview] = useState<Interview | null>(null);
  const [formData, setFormData] = useState({
    status: 'scheduled' as Interview['status'],
    feedback: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!user || (user.role !== 'super_admin' && user.role !== 'department_hr')) {
      router.push('/dashboard');
      return;
    }

    const foundInterview = mockInterviews.find(int => int.id === interviewId);
    if (foundInterview) {
      setInterview(foundInterview);
      setFormData({
        status: foundInterview.status,
        feedback: foundInterview.feedback || '',
        notes: foundInterview.notes || '',
      });
    }
  }, [interviewId, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In real app, this would be an API call
    setSubmitted(true);
    setTimeout(() => {
      router.push('/interviews');
    }, 1500);
  };

  if (!interview) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground">Interview not found.</p>
      </div>
    );
  }

  const application = mockApplications.find(app => app.id === interview.applicationId);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Update Interview Status</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Candidate</p>
            <p className="font-medium text-gray-900">{interview.candidateName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Job Position</p>
            <p className="font-medium text-gray-900">{interview.jobTitle}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Scheduled Date</p>
            <p className="font-medium text-gray-900">
              {format(new Date(interview.scheduledDate), 'MMMM dd, yyyy')} at {interview.scheduledTime}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Mode</p>
            <p className="font-medium text-gray-900 capitalize">{interview.mode}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Status *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {(['scheduled', 'completed', 'passed', 'failed', 'on_hold'] as const).map((status) => (
                <label
                  key={status}
                  className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition ${
                    formData.status === status
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Interview['status'] })}
                    className="hidden"
                  />
                  {status === 'passed' && <CheckCircle className="w-6 h-6 text-green-600 mb-1" />}
                  {status === 'failed' && <XCircle className="w-6 h-6 text-red-600 mb-1" />}
                  {status === 'on_hold' && <Hourglass className="w-6 h-6 text-yellow-600 mb-1" />}
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {status.replace('_', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interview Feedback
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide feedback on the candidate's performance..."
              value={formData.feedback}
              onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes or observations..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {formData.status === 'passed' && application && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> If this candidate passes, you can update their application status to "Hired" from the department page.
              </p>
            </div>
          )}
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
            className={`px-6 py-2 rounded-lg font-medium transition flex items-center ${
              submitted
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Save className="w-4 h-4 mr-2" />
            {submitted ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

