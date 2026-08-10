import { SkillItem } from "@/types/resume";

export const CHATGPT_AI_PROMPT = `You are an AI Resume Assistant helping a job seeker create professional resume content.

Your job is to create ONLY two parts of their resume:

1. Professional Summary
2. Skills

IMPORTANT:

* First ask the user exactly TWO questions.
* Do not ask any additional questions.
* Do not generate the final resume content until the user has answered both questions.

QUESTION 1:
What job role are you applying for?
For example: Data Analyst, Software Developer, UI/UX Designer, Marketing Executive, Business Analyst, etc.

QUESTION 2:
Tell me briefly about your education, experience/projects, and the skills you currently have. Don’t worry about writing professionally — just tell me naturally.

After the user answers both questions:

Create a concise, professional, ATS-friendly Professional Summary specifically tailored to the user’s target job role and background.

Then identify the most relevant skills from their background.

Do not invent skills, qualifications, experience, companies, achievements, certifications, or technologies that the user did not mention.

You may organize the skills into:

* Technical Skills
* Soft Skills

Keep the Professional Summary concise and suitable for a modern one-page resume.

At the end, output ONLY the following format:

=== RESUME_AI_OUTPUT ===

PROFESSIONAL_SUMMARY:
[professional summary]

TECHNICAL_SKILLS:
[skill 1] | [skill 2] | [skill 3]

SOFT_SKILLS:
[skill 1] | [skill 2] | [skill 3]

=== END_RESUME_AI_OUTPUT ===

Do not add explanations, introductions, markdown code blocks, emojis, or anything outside this format in the final output.`;

export interface ParsedAIResponse {
  summary: string;
  technicalSkills: string[];
  softSkills: string[];
}

/**
 * Robust parser for machine-readable ChatGPT AI response output.
 */
export function parseAIResumeResponse(rawText: string): ParsedAIResponse | null {
  if (!rawText || !rawText.trim()) return null;

  let text = rawText.trim();

  // Strip markdown code blocks if wrapped in ``` ... ```
  text = text.replace(/```[a-z]*\n?/gi, "").replace(/```/g, "").trim();

  // Check if markers or key headers exist
  const summaryMatch = text.match(/PROFESSIONAL_SUMMARY:\s*([\s\S]*?)(?=TECHNICAL_SKILLS:|SOFT_SKILLS:|===|$)/i);
  const techMatch = text.match(/TECHNICAL_SKILLS:\s*([\s\S]*?)(?=SOFT_SKILLS:|PROFESSIONAL_SUMMARY:|===|$)/i);
  const softMatch = text.match(/SOFT_SKILLS:\s*([\s\S]*?)(?=TECHNICAL_SKILLS:|PROFESSIONAL_SUMMARY:|===|$)/i);

  if (!summaryMatch && !techMatch && !softMatch) {
    return null;
  }

  const summary = summaryMatch ? summaryMatch[1].trim() : "";
  const techRaw = techMatch ? techMatch[1].trim() : "";
  const softRaw = softMatch ? softMatch[1].trim() : "";

  const parseSkillList = (raw: string): string[] => {
    if (!raw) return [];
    let items: string[] = [];
    if (raw.includes("|")) {
      items = raw.split("|");
    } else if (raw.includes("\n")) {
      items = raw.split("\n");
    } else if (raw.includes(",")) {
      items = raw.split(",");
    } else {
      items = [raw];
    }
    return items
      .map(item => item.replace(/^[•*\-\d.]+\s*/, "").trim())
      .filter(item => item.length > 0 && !item.toUpperCase().includes("RESUME_AI_OUTPUT"));
  };

  const technicalSkills = parseSkillList(techRaw);
  const softSkills = parseSkillList(softRaw);

  if (!summary && technicalSkills.length === 0 && softSkills.length === 0) {
    return null;
  }

  return {
    summary,
    technicalSkills,
    softSkills,
  };
}

/**
 * Converts parsed AI response skills into SkillItem objects for GradForge
 */
export function convertAISkillsToSkillItems(technicalSkills: string[], softSkills: string[]): SkillItem[] {
  const result: SkillItem[] = [];

  technicalSkills.forEach(name => {
    result.push({
      id: "skill-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      name,
      category: "Technical Skills"
    });
  });

  softSkills.forEach(name => {
    result.push({
      id: "skill-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      name,
      category: "Soft Skills"
    });
  });

  return result;
}
