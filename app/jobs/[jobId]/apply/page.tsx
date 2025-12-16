'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mockJobs, mockCandidates, mockApplications } from '@/lib/mockData';
import { checkEligibility } from '@/lib/eligibility';
import { Job, Candidate, Application } from '@/types';
import { AlertCircle, CheckCircle, Upload, X } from 'lucide-react';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [eligibility, setEligibility] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: [{ degree: '', institution: '', year: new Date().getFullYear() }],
    skills: [''],
    experience: [{ company: '', position: '', startDate: '', endDate: '', years: 0 }],
    cvFile: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const jobId = params.jobId as string;
    const foundJob = mockJobs.find(j => j.id === jobId);
    setJob(foundJob || null);

    // Check if already applied
    if (user) {
      const foundCandidate = mockCandidates.find(c => c.userId === user.id);
      if (foundCandidate) {
        setCandidate(foundCandidate);
        const hasApplied = mockApplications.some(
          app => app.jobId === jobId && app.candidateId === foundCandidate.id
        );
        if (hasApplied) {
          router.push('/applications');
          return;
        }

        // Pre-fill form with candidate data
        setFormData({
          name: foundCandidate.name,
          email: foundCandidate.email,
          phone: foundCandidate.phone,
          education: foundCandidate.education.length > 0 
            ? foundCandidate.education 
            : [{ degree: '', institution: '', year: new Date().getFullYear() }],
          skills: foundCandidate.skills.length > 0 
            ? foundCandidate.skills 
            : [''],
          experience: foundCandidate.experience.length > 0
            ? foundCandidate.experience.map(exp => ({
                company: exp.company,
                position: exp.position,
                startDate: exp.startDate,
                endDate: exp.endDate || '',
                years: exp.years,
              }))
            : [{ company: '', position: '', startDate: '', endDate: '', years: 0 }],
          cvFile: null,
        });
      }
    }
  }, [params, user, router]);

  useEffect(() => {
    if (job && formData.skills.length > 0 && formData.skills[0]) {
      const candidateData: Candidate = {
        id: candidate?.id || 'temp',
        userId: user?.id || '',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        education: formData.education.filter(e => e.degree && e.institution),
        skills: formData.skills.filter(s => s.trim() !== ''),
        experience: formData.experience
          .filter(e => e.company && e.position)
          .map(e => ({
            company: e.company,
            position: e.position,
            startDate: e.startDate,
            endDate: e.endDate || undefined,
            years: e.years,
          })),
      };

      const result = checkEligibility(job, candidateData);
      setEligibility(result);
    }
  }, [formData, job, candidate, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!eligibility || !eligibility.eligible) {
      return;
    }

    // In real app, this would be an API call
    setSubmitted(true);
    setTimeout(() => {
      router.push('/applications');
    }, 2000);
  };

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-muted-foreground">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
      <p className="text-gray-600 mb-8">{job.departmentName} Department</p>

      {eligibility && (
        <div className={`mb-6 p-4 rounded-lg border-2 ${
          eligibility.eligible 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start">
            {eligibility.eligible ? (
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
            )}
            <div className="flex-1">
              <h3 className={`font-semibold mb-2 ${
                eligibility.eligible ? 'text-green-800' : 'text-red-800'
              }`}>
                {eligibility.eligible ? 'You are eligible for this position!' : 'You are not eligible for this position'}
              </h3>
              {eligibility.reasons.length > 0 && (
                <ul className="list-disc list-inside space-y-1">
                  {eligibility.reasons.map((reason: string, idx: number) => (
                    <li key={idx} className={eligibility.eligible ? 'text-green-700' : 'text-red-700'}>
                      {reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education *
          </label>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="grid md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Degree"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[idx].degree = e.target.value;
                  setFormData({ ...formData, education: newEducation });
                }}
              />
              <input
                type="text"
                placeholder="Institution"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={edu.institution}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[idx].institution = e.target.value;
                  setFormData({ ...formData, education: newEducation });
                }}
              />
              <input
                type="number"
                placeholder="Year"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={edu.year}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[idx].year = parseInt(e.target.value) || new Date().getFullYear();
                  setFormData({ ...formData, education: newEducation });
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              education: [...formData.education, { degree: '', institution: '', year: new Date().getFullYear() }]
            })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Education
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills * (Must include: {job.mandatorySkills.join(', ')})
          </label>
          <div className="space-y-2">
            {formData.skills.map((skill, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Skill"
                  required
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={skill}
                  onChange={(e) => {
                    const newSkills = [...formData.skills];
                    newSkills[idx] = e.target.value;
                    setFormData({ ...formData, skills: newSkills });
                  }}
                />
                {formData.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newSkills = formData.skills.filter((_, i) => i !== idx);
                      setFormData({ ...formData, skills: newSkills });
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, skills: [...formData.skills, ''] })}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Skill
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience *
          </label>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="grid md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-md">
              <input
                type="text"
                placeholder="Company"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={exp.company}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[idx].company = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
              <input
                type="text"
                placeholder="Position"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={exp.position}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[idx].position = e.target.value;
                  setFormData({ ...formData, experience: newExp });
                }}
              />
              <input
                type="date"
                placeholder="Start Date"
                required
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={exp.startDate}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[idx].startDate = e.target.value;
                  const startDate = new Date(e.target.value);
                  const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
                  const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
                  newExp[idx].years = Math.max(0, Math.floor(years));
                  setFormData({ ...formData, experience: newExp });
                }}
              />
              <input
                type="date"
                placeholder="End Date (leave empty if current)"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={exp.endDate}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[idx].endDate = e.target.value;
                  if (e.target.value && exp.startDate) {
                    const startDate = new Date(exp.startDate);
                    const endDate = new Date(e.target.value);
                    const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
                    newExp[idx].years = Math.max(0, Math.floor(years));
                  }
                  setFormData({ ...formData, experience: newExp });
                }}
              />
              <div className="md:col-span-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Years: {exp.years.toFixed(1)} (Required: {job.minimumExperience})
                </span>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const newExp = formData.experience.filter((_, i) => i !== idx);
                      setFormData({ ...formData, experience: newExp });
                    }}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setFormData({
              ...formData,
              experience: [...formData.experience, { company: '', position: '', startDate: '', endDate: '', years: 0 }]
            })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add Experience
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload CV (PDF/DOC) *
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <Upload className="w-5 h-5 mr-2" />
              Choose File
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && file.size > 5 * 1024 * 1024) {
                    alert('File size must be less than 5MB');
                    return;
                  }
                  setFormData({ ...formData, cvFile: file || null });
                }}
              />
            </label>
            {formData.cvFile && (
              <span className="text-sm text-gray-600">{formData.cvFile.name}</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">Maximum file size: 5MB</p>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!eligibility?.eligible || submitted}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              eligibility?.eligible && !submitted
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {submitted ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}

