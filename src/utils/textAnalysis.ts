import { JobDescriptionAnalysis } from "@/types/ats";

// Common stop words to ignore
const STOP_WORDS = new Set([
  "the", "and", "or", "to", "of", "in", "for", "with", "a", "an", "is", "are",
  "this", "that", "on", "at", "by", "from", "be", "as", "was", "were", "will",
  "should", "our", "your", "we", "you", "must", "have", "has", "had", "been",
  "such", "into", "than", "more", "can", "could", "would", "about", "which",
  "when", "where", "who", "whom", "how", "what", "their", "them", "these", "those",
  "work", "ability", "experience", "skills", "knowledge", "required", "preferred"
]);

// Comprehensive Tech & Business Skills Lexicon
const SKILLS_LEXICON = [
  // Programming & Dev
  "python", "javascript", "typescript", "react", "next.js", "node.js", "java", "c++",
  "c#", "php", "ruby", "go", "golang", "rust", "html", "css", "tailwind", "bootstrap",
  "rest api", "graphql", "git", "github", "docker", "kubernetes", "aws", "gcp", "azure",
  "ci/cd", "linux", "unix", "agile", "scrum", "jira",

  // Data & Analytics
  "sql", "mysql", "postgresql", "mongodb", "power bi", "tableau", "excel", "data analysis",
  "data visualization", "etl", "machine learning", "deep learning", "ai", "pandas",
  "numpy", "scikit-learn", "tensorflow", "pytorch", "r", "spark", "hadoop", "bigquery",

  // Soft & Business Skills
  "communication", "problem solving", "teamwork", "leadership", "critical thinking",
  "time management", "project management", "stakeholder management", "analytical skills"
];

/**
 * Normalizes text by removing punctuation, converting to lowercase, and trimming.
 */
export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s#+\.\-\/]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Extracts structured insights from a raw Job Description text.
 */
export function analyzeJobDescription(rawText: string): JobDescriptionAnalysis {
  const normalized = normalizeText(rawText);
  const words = normalized.split(" ").filter(w => w.length > 1 && !STOP_WORDS.has(w));

  // 1. Detect Job Title from JD
  const titlePatterns = [
    /data analyst/i, /software engineer/i, /frontend developer/i, /backend developer/i,
    /full stack developer/i, /product manager/i, /data scientist/i, /business analyst/i,
    /devops engineer/i, /web developer/i, /system administrator/i, /ux designer/i
  ];
  let jobTitle = "Target Role";
  for (const pattern of titlePatterns) {
    const match = rawText.match(pattern);
    if (match) {
      jobTitle = match[0];
      break;
    }
  }

  // 2. Extract Matching Skills from Lexicon
  const extractedSkills: string[] = [];
  for (const skill of SKILLS_LEXICON) {
    const skillRegex = new RegExp(`\\b${skill.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")}\\b`, "i");
    if (skillRegex.test(rawText)) {
      // Proper Title Case representation
      const formattedSkill = skill
        .split(" ")
        .map(w => w.toUpperCase() === "SQL" || w.toUpperCase() === "AWS" || w.toUpperCase() === "API" || w.toUpperCase() === "ETL" || w.toUpperCase() === "BI" || w.toUpperCase() === "AI" ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      extractedSkills.push(formattedSkill);
    }
  }

  // Deduplicate skills
  const uniqueSkills = Array.from(new Set(extractedSkills));

  // 3. Extract Key Responsibilities Phrases
  const lines = rawText.split(/\n+|\./);
  const responsibilities: string[] = [];
  const actionWords = ["analyze", "build", "create", "develop", "manage", "collaborate", "clean", "design", "maintain", "optimize", "lead"];

  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.length > 12 && cleanLine.length < 90) {
      const lower = cleanLine.toLowerCase();
      if (actionWords.some(act => lower.includes(act))) {
        responsibilities.push(cleanLine.charAt(0).toUpperCase() + cleanLine.slice(1));
      }
    }
  }

  return {
    jobTitle,
    extractedSkills: uniqueSkills.slice(0, 12),
    extractedTools: uniqueSkills.filter(s => ["Git", "Docker", "AWS", "Power BI", "Tableau", "Excel", "Jira", "SQL"].includes(s)),
    qualifications: ["Bachelor's Degree", "Relevant Experience"],
    responsibilities: responsibilities.slice(0, 5),
    allKeywords: Array.from(new Set(words)),
  };
}
