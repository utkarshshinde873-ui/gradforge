import React, { useMemo } from "react";
import { ResumeData, AccentColor, ACCENT_THEMES, SectionVisibility, SectionId, defaultSectionOrder } from "@/types/resume";

export const MinimalTemplate = React.memo(function MinimalTemplate({ 
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

  const contacts = useMemo(() => [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
  ].filter(Boolean), [personalInfo]);

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
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-2 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Summary
      </h2>
      <p className="text-zinc-950 text-xs leading-relaxed font-medium">{summary}</p>
    </section>
  ) : null;

  const renderSkills = () => showSkills ? (
    <section key="skills" className="mb-6">
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Skills
      </h2>
      <div className="space-y-2">
        {Object.entries(skillsByCategory).map(([category, items]) => (
          <div key={category} className="text-xs">
            <span className="font-extrabold text-zinc-950 uppercase text-[11px] mr-2">{category}:</span>
            <span className="text-zinc-900 font-semibold">{items.map(i => i.name).join(" • ")}</span>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderEducation = () => showEducation ? (
    <section key="education" className="mb-6">
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Education
      </h2>
      <div className="space-y-3">
        {education.map(edu => (
          <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-4 gap-1">
            <div className="text-xs text-zinc-900 font-bold">
              {edu.startDate} – {edu.endDate}
            </div>
            <div className="sm:col-span-3">
              <div className="font-extrabold text-zinc-950">{edu.institution}</div>
              <div className="text-xs text-zinc-900 font-medium mt-0.5">
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                {edu.gpa && <span className="font-bold ml-2" style={{ color: theme.primary }}>(GPA: {edu.gpa})</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderExperience = () => showExperience ? (
    <section key="experience" className="mb-6">
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Experience & Internships
      </h2>
      <div className="space-y-4">
        {experience.map(exp => (
          <div key={exp.id} className="grid grid-cols-1 sm:grid-cols-4 gap-1">
            <div className="text-xs text-zinc-900 font-bold">
              {exp.startDate} – {exp.endDate}
            </div>
            <div className="sm:col-span-3">
              <div className="font-extrabold text-zinc-950">{exp.position}</div>
              <div className="text-xs font-bold mb-1" style={{ color: theme.primary }}>{exp.company}</div>
              {exp.description && (
                <p className="text-xs text-zinc-950 whitespace-pre-line leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderProjects = () => showProjects ? (
    <section key="projects" className="mb-6">
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Projects
      </h2>
      <div className="space-y-3">
        {projects.map(proj => (
          <div key={proj.id}>
            <div className="w-full flex justify-between items-baseline gap-4">
              <span className="font-extrabold text-zinc-950 pr-2">{proj.title}</span>
              {proj.link && <span className="text-xs font-bold shrink-0 text-right ml-auto" style={{ color: theme.primary }}>{proj.link}</span>}
            </div>
            {proj.technologies && (
              <div className="text-xs font-bold mt-0.5" style={{ color: theme.primary }}>
                Technologies: {proj.technologies}
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
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Certifications
      </h2>
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
      <h2 className="text-[11px] font-extrabold uppercase tracking-[0.2em] mb-3 border-b pb-0.5" style={{ color: theme.primary, borderColor: theme.primary }}>
        Achievements
      </h2>
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
      {/* Sleek Minimal Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight" style={{ color: theme.primary }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.title && (
          <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: theme.primary }}>
            {personalInfo.title}
          </p>
        )}

        {contacts.length > 0 && (
          <div className="text-[11px] text-zinc-800 font-medium mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-1.5 shrink-0">
                <span className="text-slate-400 font-bold select-none mr-0.5">•</span>
                <span>{contact}</span>
              </div>
            ))}
          </div>
        )}
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
