import { Job, Candidate } from '@/types';

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
}

export function checkEligibility(job: Job, candidate: Candidate): EligibilityResult {
  const reasons: string[] = [];

  // Check mandatory skills
  const missingSkills = job.mandatorySkills.filter(
    skill => !candidate.skills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
  );
  if (missingSkills.length > 0) {
    reasons.push(`Missing mandatory skills: ${missingSkills.join(', ')}`);
  }

  // Check minimum experience
  const totalExperience = candidate.experience.reduce((sum, exp) => sum + exp.years, 0);
  if (totalExperience < job.minimumExperience) {
    reasons.push(
      `Insufficient experience: Required ${job.minimumExperience} years, has ${totalExperience} years`
    );
  }

  // Check required qualifications (simplified - checking if candidate has any degree)
  if (job.requiredQualifications.length > 0 && candidate.education.length === 0) {
    reasons.push('Missing required qualifications');
  }

  return {
    eligible: reasons.length === 0,
    reasons,
  };
}

