export type ATSScoreLabel = "Excellent" | "Good" | "Needs Improvement" | "Needs Attention";

export interface ATSCategoryBreakdown {
  contactInfo: number;      // max 10
  resumeStructure: number;  // max 20
  experience: number;       // max 20
  skills: number;           // max 15
  education: number;        // max 10
  formatting: number;       // max 25
  totalScore: number;       // max 100
  label: ATSScoreLabel;
  improvements: string[];
}

export interface JobDescriptionAnalysis {
  jobTitle: string;
  extractedSkills: string[];
  extractedTools: string[];
  qualifications: string[];
  responsibilities: string[];
  allKeywords: string[];
}

export interface ResponsibilityMatchItem {
  phrase: string;
  matchType: "Strong" | "Partial" | "Weak";
}

export interface JobMatchCategoryScores {
  keywordMatch: number;            // max 40
  experienceRelevance: number;     // max 25
  jobTitleRelevance: number;        // max 10
  educationQualifications: number; // max 10
  responsibilitiesMatch: number;   // max 10
  atsReadiness: number;            // max 5
}

export interface JobMatchResult {
  score: number;                   // max 100
  label: ATSScoreLabel;
  detectedJobTitle: string;
  matchingSkills: string[];
  missingSkills: string[];
  responsibilityMatches: ResponsibilityMatchItem[];
  recommendations: string[];
  categoryScores: JobMatchCategoryScores;
}
