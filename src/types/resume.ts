export type TemplateType = "modern" | "professional" | "minimal" | "executive" | "creative";

export type SectionId = "summary" | "education" | "experience" | "skills" | "projects" | "certifications" | "achievements";

export const defaultSectionOrder: SectionId[] = [
  "summary",
  "skills",
  "education",
  "experience",
  "projects",
  "certifications",
  "achievements"
];

export interface SectionVisibility {
  summary: boolean;
  education: boolean;
  experience: boolean;
  skills: boolean;
  projects: boolean;
  certifications: boolean;
  achievements: boolean;
}

export const defaultSectionVisibility: SectionVisibility = {
  summary: true,
  education: true,
  experience: true,
  skills: true,
  projects: true,
  certifications: true,
  achievements: true,
};

export type AccentColor = "charcoal" | "blue" | "red" | "emerald" | "purple";

export interface AccentTheme {
  id: AccentColor;
  name: string;
  primary: string; // Hex color for inline styles & SVG/canvas
  textClass: string;
  bgClass: string;
  borderClass: string;
}

export const ACCENT_THEMES: Record<AccentColor, AccentTheme> = {
  charcoal: {
    id: "charcoal",
    name: "Metallic Charcoal",
    primary: "#09090b",
    textClass: "text-zinc-950",
    bgClass: "bg-zinc-950",
    borderClass: "border-zinc-950",
  },
  blue: {
    id: "blue",
    name: "Royal Blue",
    primary: "#1d4ed8",
    textClass: "text-blue-700",
    bgClass: "bg-blue-700",
    borderClass: "border-blue-700",
  },
  red: {
    id: "red",
    name: "Ruby Crimson",
    primary: "#b91c1c",
    textClass: "text-red-700",
    bgClass: "bg-red-700",
    borderClass: "border-red-700",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Green",
    primary: "#047857",
    textClass: "text-emerald-700",
    bgClass: "bg-emerald-700",
    borderClass: "border-emerald-700",
  },
  purple: {
    id: "purple",
    name: "Amethyst Purple",
    primary: "#6d28d9",
    textClass: "text-purple-700",
    bgClass: "bg-purple-700",
    borderClass: "border-purple-700",
  },
};

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
}

export const initialEmptyResume: ResumeData = {
  personalInfo: {
    fullName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
};

// Sensible sample data for quick preview testing
export const sampleResume: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    title: "Software Engineering Graduate",
    email: "alex.johnson@example.edu",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/alexjohnson-dev",
    github: "github.com/alexjohnson-dev",
    portfolio: "alexjohnson.dev",
  },
  summary: "Motivated Computer Science graduate with a strong foundation in full-stack web development, data structures, and cloud computing. Proven record of delivering high-quality university capstone projects and internship contributions. Eager to leverage modern tech skills in an entry-level software engineer role.",
  education: [
    {
      id: "edu-1",
      institution: "University of Washington",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "Sep 2020",
      endDate: "May 2024",
      gpa: "3.85 / 4.00",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "CloudTech Solutions",
      position: "Software Engineering Intern",
      startDate: "Jun 2023",
      endDate: "Aug 2023",
      description: "• Built microservice APIs using Node.js and TypeScript, handling 10,000+ daily server requests.\n• Optimized PostgreSQL query performance, reducing database latency by 25%.\n• Participated in daily Agile standups, code reviews, and unit test coverage automation.",
    },
  ],
  skills: [
    { id: "sk-1", name: "TypeScript / JavaScript", category: "Languages" },
    { id: "sk-2", name: "Python", category: "Languages" },
    { id: "sk-3", name: "React / Next.js", category: "Frameworks & Libraries" },
    { id: "sk-4", name: "Node.js / Express", category: "Frameworks & Libraries" },
    { id: "sk-5", name: "Tailwind CSS", category: "Frameworks & Libraries" },
    { id: "sk-6", name: "Git & GitHub", category: "Tools & Platforms" },
    { id: "sk-7", name: "Docker", category: "Tools & Platforms" },
    { id: "sk-8", name: "PostgreSQL", category: "Databases" },
  ],
  projects: [
    {
      id: "proj-1",
      title: "GradForge - Student Resume Builder",
      technologies: "Next.js, TypeScript, Tailwind CSS, LocalStorage",
      description: "Designed and implemented a responsive, client-side web application allowing students to build ATS-friendly resumes with live preview and instant PDF export.",
      link: "https://github.com/alexjohnson-dev/gradforge",
    },
    {
      id: "proj-2",
      title: "TaskPulse - Collaborative Campus Task Tracker",
      technologies: "React, Firebase, Tailwind CSS",
      description: "Created a real-time task manager for university group projects featuring kanban boards, live chat, and automated deadline notifications.",
      link: "https://taskpulse-demo.web.app",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      title: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      date: "Nov 2023",
      link: "https://aws.amazon.com/verification",
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "1st Place - University Hackathon 2023",
      description: "Awarded top honor out of 45 student teams for building an AI-powered study schedule optimizer.",
      date: "Oct 2023",
    },
    {
      id: "ach-2",
      title: "Dean's Honor List",
      description: "Recognized for maintaining a GPA above 3.8 for 6 consecutive academic semesters.",
      date: "2021 - 2024",
    },
  ],
};
