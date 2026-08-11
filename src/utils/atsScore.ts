import { ResumeData } from "@/types/resume";
import { ATSCategoryBreakdown, ATSScoreLabel } from "@/types/ats";

/**
 * Calculates a deterministic ATS Readiness Score (0-100) based strictly on
 * the user's actual resume content and section structure.
 */
export function calculateATSReadiness(data: ResumeData): ATSCategoryBreakdown {
  const { personalInfo, summary, education, experience, skills, projects, certifications, achievements } = data;

  // 1. Contact Information (Max 10)
  let contactScore = 0;
  if (personalInfo.fullName.trim()) contactScore += 3;
  if (personalInfo.email.trim() && personalInfo.email.includes("@")) contactScore += 2;
  if (personalInfo.phone.trim()) contactScore += 2;
  if (personalInfo.location.trim()) contactScore += 2;
  if (personalInfo.linkedin.trim() || personalInfo.github.trim() || personalInfo.portfolio.trim()) contactScore += 1;
  contactScore = Math.min(10, contactScore);

  // 2. Resume Structure (Max 20)
  let structureScore = 0;
  let activeSections = 0;

  if (summary.trim().length > 10) {
    structureScore += 4;
    activeSections++;
  }
  if (skills.length > 0) {
    structureScore += 4;
    activeSections++;
  }
  if (education.length > 0) {
    structureScore += 4;
    activeSections++;
  }
  // Projects count as valid experience for freshers/students
  if (experience.length > 0 || projects.length > 0) {
    structureScore += 5;
    activeSections++;
  }
  if (certifications.length > 0 || achievements.length > 0) {
    activeSections++;
  }
  if (activeSections >= 4) {
    structureScore += 3;
  }
  structureScore = Math.min(20, structureScore);

  // 3. Experience & Projects Completeness (Max 20)
  let experienceScore = 0;
  const expList = experience.length > 0 ? experience : projects.map(p => ({
    id: p.id,
    company: p.title,
    position: p.technologies || "Project Lead",
    startDate: "2023",
    endDate: "2024",
    description: p.description,
  }));

  if (expList.length > 0) {
    const firstExp = expList[0];
    if (firstExp.company.trim()) experienceScore += 5;
    if (firstExp.position.trim()) experienceScore += 5;
    if (firstExp.startDate.trim()) experienceScore += 4;
    if (firstExp.description.trim().length > 15) experienceScore += 3;

    // Check for action verbs & quantifiable metrics in descriptions
    const allDesc = expList.map(e => e.description).join(" ").toLowerCase();
    const actionVerbs = ["built", "developed", "created", "led", "managed", "designed", "optimized", "analyzed", "engineered", "implemented", "reduced", "increased", "improved"];
    const hasActionVerb = actionVerbs.some(verb => allDesc.includes(verb));
    if (hasActionVerb) experienceScore += 1.5;

    // Check for quantifiable metrics (e.g. 35%, 10,000, 2x, $5k, 50+)
    const hasMetrics = /[\d]+%|[\d]+\+|[\d]+\s*k|\$\d+/i.test(allDesc);
    if (hasMetrics) experienceScore += 1.5;
  }
  experienceScore = Math.min(20, Math.round(experienceScore));

  // 4. Skills Completeness (Max 15)
  let skillsScore = 0;
  if (skills.length >= 8) {
    skillsScore = 13;
  } else if (skills.length >= 4) {
    skillsScore = 10;
  } else if (skills.length >= 1) {
    skillsScore = 5;
  }

  const categories = new Set(skills.map(s => (s.category || "General").toLowerCase()));
  if (categories.size >= 2) {
    skillsScore += 2;
  }
  skillsScore = Math.min(15, skillsScore);

  // 5. Education Completeness (Max 10)
  let educationScore = 0;
  if (education.length > 0) {
    const firstEdu = education[0];
    if (firstEdu.institution.trim()) educationScore += 4;
    if (firstEdu.degree.trim()) educationScore += 4;
    if (firstEdu.endDate.trim() || firstEdu.gpa.trim()) educationScore += 2;
  }
  educationScore = Math.min(10, educationScore);

  // 6. Formatting & Readability (Max 25)
  let formattingScore = 0;
  if (personalInfo.fullName.trim() && (skills.length > 0 || education.length > 0)) {
    formattingScore += 8; // Standard section layout
  }
  
  // Reasonable paragraph length (avoiding massive >1000 char blocks)
  const isParagraphLengthGood = summary.length < 800 && expList.every(e => e.description.length < 1000);
  if (isParagraphLengthGood) {
    formattingScore += 7;
  }

  // Clean date structure
  const dates = [...education.map(e => e.endDate), ...experience.map(e => e.endDate)];
  const hasCleanDates = dates.some(d => /\d{4}|present|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(d));
  if (hasCleanDates || dates.length === 0) {
    formattingScore += 5;
  }

  // No excessive decorative special characters
  const fullText = JSON.stringify(data);
  const weirdCharsMatch = fullText.match(/[★☆✪✦✧⚓✈🚀💥🔥]/g);
  if (!weirdCharsMatch || weirdCharsMatch.length <= 2) {
    formattingScore += 5;
  }
  formattingScore = Math.min(25, formattingScore);

  // Calculate Total Score
  const totalScore = Math.min(100, Math.max(0, contactScore + structureScore + experienceScore + skillsScore + educationScore + formattingScore));

  // Determine Score Label
  let label: ATSScoreLabel = "Needs Attention";
  if (totalScore >= 90) label = "Excellent";
  else if (totalScore >= 75) label = "Good";
  else if (totalScore >= 60) label = "Needs Improvement";

  // Dynamic Actionable Improvements Generation
  const improvements: string[] = [];
  if (!personalInfo.linkedin.trim()) {
    improvements.push("Add a LinkedIn profile to your contact info for recruiter verification.");
  }
  if (!summary.trim() || summary.trim().length < 20) {
    improvements.push("Add a concise 2–4 sentence Professional Summary highlighting your target role.");
  }
  if (skills.length < 5) {
    improvements.push("Add at least 5 to 8 relevant technical and professional skills.");
  }
  if (experience.length === 0 && projects.length === 0) {
    improvements.push("Add at least 1 work entry or academic project with bullet descriptions.");
  } else {
    const allText = JSON.stringify(data).toLowerCase();
    const hasNumbers = /[\d]+%|[\d]+\+|\$\d+/i.test(allText);
    if (!hasNumbers) {
      improvements.push("Add quantifiable metrics (e.g., 'Improved performance by 25%', 'Analyzed 500+ data rows') to demonstrate impact.");
    }
  }
  if (education.length === 0) {
    improvements.push("Add your degree and university education details.");
  }

  return {
    contactInfo: contactScore,
    resumeStructure: structureScore,
    experience: experienceScore,
    skills: skillsScore,
    education: educationScore,
    formatting: formattingScore,
    totalScore,
    label,
    improvements: improvements.length > 0 ? improvements : ["Your resume structure and content formatting look highly ATS-compliant!"],
  };
}
