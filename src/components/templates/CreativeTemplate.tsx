import React, { useMemo } from "react";
import { ResumeData, AccentColor, ACCENT_THEMES, SectionVisibility, SectionId, defaultSectionOrder } from "@/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

export const CreativeTemplate = React.memo(function CreativeTemplate({ 
  data, 
  accentColor = "charcoal",
  sectionVisibility,
  sectionOrder = defaultSectionOrder
}: { 
  data: ResumeData; 
  accentColor?: AccentColor;
  sectionVisibility?: SectionVisibility;
  sectionOrder?: SectionId[];
}) {
  const { personalInfo, summary, education, experience, skills, projects, certifications, achievements } = data;
  const theme = ACCENT_THEMES[accentColor] || ACCENT_THEMES.charcoal;

  const showSummary = sectionVisibility?.summary !== false && Boolean(summary);
  const showSkills = sectionVisibility?.skills !== false && skills.length > 0;
  const showEducation = sectionVisibility?.education !== false && education.length > 0;
  const showExperience = sectionVisibility?.experience !== false && experience.length > 0;
  const showProjects = sectionVisibility?.projects !== false && projects.length > 0;
  const showCertifications = sectionVisibility?.certifications !== false && certifications.length > 0;
  const showAchievements = sectionVisibility?.achievements !== false && achievements.length > 0;

  const skillsByCategory = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const cat = skill.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
  }, [skills]);

  const renderSummary = () => showSummary ? (
    <section key="summary" className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          About Me / Objective
        </h2>
      </div>
      <p className="text-zinc-900 text-xs leading-relaxed font-medium bg-zinc-50 p-4 rounded-lg border border-zinc-200">{summary}</p>
    </section>
  ) : null;

  const renderSkills = () => showSkills ? (
    <section key="skills" className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Technical & Professional Skills
        </h2>
      </div>
      <div className="space-y-2">
        {Object.entries(skillsByCategory).map(([category, items]) => (
          <div key={category} className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold min-w-[130px] shrink-0" style={{ color: theme.primary }}>{category}:</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {items.map(item => (
                <span key={item.id} className="text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ backgroundColor: theme.primary }}>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderEducation = () => showEducation ? (
    <section key="education" className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Education
        </h2>
      </div>
      <div className="space-y-3">
        {education.map(edu => (
          <div key={edu.id} className="border-l-2 pl-3 py-0.5" style={{ borderColor: theme.primary }}>
            <div className="w-full flex justify-between items-baseline font-extrabold text-zinc-950 gap-4">
              <span className="pr-2">{edu.institution}</span>
              <span className="text-xs font-bold text-zinc-900 shrink-0 text-right ml-auto">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="w-full flex justify-between items-baseline text-xs mt-0.5 gap-4">
              <span className="text-zinc-900 font-medium italic pr-2">
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
              </span>
              {edu.gpa && <span className="font-extrabold shrink-0 text-right ml-auto" style={{ color: theme.primary }}>GPA: {edu.gpa}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderExperience = () => showExperience ? (
    <section key="experience" className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Work Experience & Internships
        </h2>
      </div>
      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id} className="border-l-2 pl-3 py-0.5" style={{ borderColor: theme.primary }}>
            <div className="w-full flex justify-between items-baseline gap-4">
              <span className="font-extrabold text-zinc-950 text-sm pr-2">{exp.position}</span>
              <span className="text-xs font-bold text-zinc-900 shrink-0 text-right ml-auto">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className="text-xs font-bold mb-1" style={{ color: theme.primary }}>{exp.company}</div>
            {exp.description && (
              <p className="text-xs text-zinc-950 whitespace-pre-line leading-relaxed">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderProjects = () => showProjects ? (
    <section key="projects" className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Featured Projects
        </h2>
      </div>
      <div className="space-y-3">
        {projects.map(proj => (
          <div key={proj.id} className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200">
            <div className="w-full flex justify-between items-baseline gap-4">
              <span className="font-extrabold text-zinc-950 pr-2">{proj.title}</span>
              {proj.link && <span className="text-xs font-semibold shrink-0 text-right ml-auto" style={{ color: theme.primary }}>{proj.link}</span>}
            </div>
            {proj.technologies && (
              <div className="text-[11px] font-bold mt-0.5" style={{ color: theme.primary }}>
                Tech: {proj.technologies}
              </div>
            )}
            {proj.description && (
              <p className="text-xs text-zinc-950 mt-1 leading-relaxed">{proj.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderCertifications = () => showCertifications ? (
    <section key="certifications" className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Certifications
        </h2>
      </div>
      <div className="space-y-2 text-xs">
        {certifications.map(cert => (
          <div key={cert.id} className="w-full flex justify-between items-baseline gap-4">
            <div className="pr-2">
              <span className="font-extrabold text-zinc-950">{cert.title}</span>
              {cert.issuer && <span className="text-zinc-900 font-medium"> — {cert.issuer}</span>}
            </div>
            {cert.date && <span className="text-zinc-900 font-bold shrink-0 text-right ml-auto">{cert.date}</span>}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderAchievements = () => showAchievements ? (
    <section key="achievements" className="mb-2">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: theme.primary }} />
        <h2 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: theme.primary }}>
          Key Achievements
        </h2>
      </div>
      <div className="space-y-2 text-xs">
        {achievements.map(ach => (
          <div key={ach.id}>
            <div className="w-full flex justify-between items-baseline font-extrabold text-zinc-950 gap-4">
              <span className="pr-2">{ach.title}</span>
              {ach.date && <span className="text-xs text-zinc-900 font-bold shrink-0 text-right ml-auto">{ach.date}</span>}
            </div>
            {ach.description && <p className="text-zinc-950 mt-0.5">{ach.description}</p>}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    summary: renderSummary,
    skills: renderSkills,
    education: renderEducation,
    experience: renderExperience,
    projects: renderProjects,
    certifications: renderCertifications,
    achievements: renderAchievements,
  };

  return (
    <div className="w-full bg-white text-zinc-950 font-sans p-8 sm:p-10 text-[13px] leading-relaxed">
      {/* Creative Dark Accent Top Header */}
      <header className="text-white p-6 rounded-xl mb-6 shadow-sm" style={{ backgroundColor: theme.primary }}>
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.title && (
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-200 mt-1">
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mt-3 pt-3 border-t border-white/20 text-[11.5px] font-medium text-white/95">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1.5">
              <LinkedInIcon className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1.5">
              <GitHubIcon className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="px-0.5">{personalInfo.portfolio}</span>
            </div>
          )}
        </div>
      </header>

      {/* Render sections in custom user order */}
      {sectionOrder.map(secId => (
        <React.Fragment key={secId}>
          {sectionRenderers[secId]?.()}
        </React.Fragment>
      ))}
    </div>
  );
});
