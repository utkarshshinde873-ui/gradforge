import { ResumeData } from "@/types/resume";
import { JobMatchResult, ResponsibilityMatchItem, ATSScoreLabel } from "@/types/ats";
import { analyzeJobDescription, normalizeText } from "./textAnalysis";
import { calculateATSReadiness } from "./atsScore";

/**
 * Calculates a deterministic GradForge Job Match Score (0-100) comparing a user's resume
 * against a target Job Description text.
 */
export function calculateJobMatch(resumeData: ResumeData, jobText: string): JobMatchResult {
  const jobAnalysis = analyzeJobDescription(jobText);
  const atsReadiness = calculateATSReadiness(resumeData);

  const resumeFullText = normalizeText(JSON.stringify(resumeData));
  const userSkillNames = new Set(resumeData.skills.map(s => normalizeText(s.name)));

  // 1. Keyword / Skill Match (Max 40 points)
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const skill of jobAnalysis.extractedSkills) {
    const normSkill = normalizeText(skill);
    // Check if skill is listed in user skills OR mentioned in experience/projects/summary text
    const isMatched = userSkillNames.has(normSkill) || resumeFullText.includes(normSkill);
    if (isMatched) {
      matchingSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  }

  const totalRequiredSkills = jobAnalysis.extractedSkills.length || 1;
  const keywordScore = Math.min(40, Math.round((matchingSkills.length / totalRequiredSkills) * 40));

  // 2. Experience Relevance (Max 25 points)
  const expText = normalizeText([...resumeData.experience.map(e => `${e.position} ${e.company} ${e.description}`), ...resumeData.projects.map(p => `${p.title} ${p.technologies} ${p.description}`)].join(" "));
  let expOverlapCount = 0;
  for (const skill of matchingSkills) {
    if (expText.includes(normalizeText(skill))) {
      expOverlapCount++;
    }
  }
  let experienceRelevanceScore = 0;
  if (resumeData.experience.length > 0 || resumeData.projects.length > 0) {
    experienceRelevanceScore = Math.min(25, Math.round((expOverlapCount / totalRequiredSkills) * 20) + 5);
  }

  // 3. Job Title Match (Max 10 points)
  const targetTitle = normalizeText(jobAnalysis.jobTitle);
  const userTitles = normalizeText(`${resumeData.personalInfo.title} ${resumeData.experience.map(e => e.position).join(" ")} ${resumeData.summary}`);
  
  let jobTitleScore = 3;
  if (targetTitle && userTitles.includes(targetTitle)) {
    jobTitleScore = 10;
  } else {
    // Partial word match (e.g., "data" or "analyst" in title)
    const titleWords = targetTitle.split(" ").filter(w => w.length > 2);
    const hasPartial = titleWords.some(w => userTitles.includes(w));
    if (hasPartial) {
      jobTitleScore = 7;
    }
  }

  // 4. Education / Qualifications Match (Max 10 points)
  let educationScore = 4;
  if (resumeData.education.length > 0) {
    educationScore = 10;
  }

  // 5. Responsibilities Match (Max 10 points)
  const responsibilityMatches: ResponsibilityMatchItem[] = [];
  let strongCount = 0;
  let partialCount = 0;

  const defaultResponsibilities = jobAnalysis.responsibilities.length > 0 ? jobAnalysis.responsibilities : [
    "Data Analysis & Reporting",
    "Dashboard Creation & Maintenance",
    "Data Cleaning & Transformation",
    "Stakeholder Communication"
  ];

  for (const resp of defaultResponsibilities.slice(0, 5)) {
    const respWords = normalizeText(resp).split(" ").filter(w => w.length > 3);
    const matchCount = respWords.filter(w => resumeFullText.includes(w)).length;

    let matchType: "Strong" | "Partial" | "Weak" = "Weak";
    if (matchCount >= 2 || (respWords.length <= 2 && matchCount >= 1)) {
      matchType = "Strong";
      strongCount++;
    } else if (matchCount === 1) {
      matchType = "Partial";
      partialCount++;
    }

    responsibilityMatches.push({
      phrase: resp,
      matchType,
    });
  }

  const respScore = Math.min(10, Math.round((strongCount * 2.5) + (partialCount * 1.5)));

  // 6. Resume ATS Readiness Component (Max 5 points)
  const atsComponentScore = Math.min(5, Math.round((atsReadiness.totalScore / 100) * 5));

  // Calculate Total Score
  const totalScore = Math.min(100, Math.max(0, keywordScore + experienceRelevanceScore + jobTitleScore + educationScore + respScore + atsComponentScore));

  // Score Label
  let label: ATSScoreLabel = "Needs Attention";
  if (totalScore >= 90) label = "Excellent";
  else if (totalScore >= 75) label = "Good";
  else if (totalScore >= 60) label = "Needs Improvement";

  // Generate Smart Recommendations
  const recommendations: string[] = [];

  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 3).join(", ");
    recommendations.push(`Consider adding keywords like [${topMissing}] if you genuinely have this experience.`);
  }

  if (matchingSkills.length > 0) {
    recommendations.push(`Highlight your ${matchingSkills.slice(0, 2).join(" & ")} project experience in your summary.`);
  }

  if (strongCount < 2) {
    recommendations.push("Strengthen your experience bullet points to mirror core responsibilities mentioned in the job description.");
  }

  if (atsReadiness.totalScore < 75) {
    recommendations.push("Improve your overall ATS Readiness score by filling out missing summary or contact details.");
  }

  return {
    score: totalScore,
    label,
    detectedJobTitle: jobAnalysis.jobTitle,
    matchingSkills,
    missingSkills,
    responsibilityMatches,
    recommendations: recommendations.length > 0 ? recommendations : ["Your resume aligns strongly with this job description!"],
    categoryScores: {
      keywordMatch: keywordScore,
      experienceRelevance: experienceRelevanceScore,
      jobTitleRelevance: jobTitleScore,
      educationQualifications: educationScore,
      responsibilitiesMatch: respScore,
      atsReadiness: atsComponentScore,
    },
  };
}
