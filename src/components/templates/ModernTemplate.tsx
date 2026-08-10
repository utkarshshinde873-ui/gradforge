import React, { useMemo } from "react";
import { ResumeData, AccentColor, ACCENT_THEMES, SectionVisibility, SectionId, defaultSectionOrder } from "@/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

export const ModernTemplate = React.memo(function ModernTemplate({ 
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

  // Group skills by category (memoized)
  const skillsByCategory = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const cat = skill.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);
  }, [skills]);

  const renderSummary = () => showSummary ? (
    <section key="summary" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Professional Summary
      </h2>
      <p className="text-black text-xs leading-relaxed font-medium">{summary}</p>
    </section>
  ) : null;

  const renderSkills = () => showSkills ? (
    <section key="skills" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Skills & Competencies
      </h2>
      <div className="space-y-2">
        {Object.entries(skillsByCategory).map(([category, items]) => (
          <div key={category} className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-black min-w-[130px] shrink-0">{category}:</span>
            <div className="flex flex-wrap gap-1.5 flex-1">
              {items.map(item => (
                <span 
                  key={item.id} 
                  className="text-[11px] font-bold px-2 py-0.5 rounded border"
                  style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, borderColor: `${theme.primary}40` }}
                >
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
    <section key="education" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Education
      </h2>
      <div className="space-y-3">
        {education.map(edu => (
          <div key={edu.id}>
            <div className="w-full flex justify-between items-baseline gap-4">
              <span className="font-bold text-black pr-2">{edu.institution}</span>
              <span className="text-xs text-black font-bold shrink-0 text-right ml-auto">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="w-full flex justify-between items-baseline text-xs mt-0.5 gap-4">
              <span className="text-black italic font-semibold pr-2">
                {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
              </span>
              {edu.gpa && <span className="font-bold shrink-0 text-right ml-auto" style={{ color: theme.primary }}>GPA: {edu.gpa}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderExperience = () => showExperience ? (
    <section key="experience" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Experience & Internships
      </h2>
      <div className="space-y-3.5">
        {experience.map(exp => (
          <div key={exp.id}>
            <div className="w-full flex justify-between items-baseline gap-4">
              <span className="font-bold text-black pr-2">{exp.position}</span>
              <span className="text-xs text-black font-bold shrink-0 text-right ml-auto">{exp.startDate} – {exp.endDate}</span>
            </div>
            <div className="text-xs font-bold mb-1" style={{ color: theme.primary }}>{exp.company}</div>
            {exp.description && (
              <p className="text-xs text-black font-medium whitespace-pre-line leading-relaxed">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderProjects = () => showProjects ? (
    <section key="projects" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Key Projects
      </h2>
      <div className="space-y-3">
        {projects.map(proj => (
          <div key={proj.id}>
            <div className="w-full flex justify-between items-baseline gap-4">
              <div className="flex items-center gap-1.5 pr-2">
                <span className="font-bold text-black">{proj.title}</span>
                {proj.link && (
                  <span className="text-[11px] font-semibold" style={{ color: theme.primary }}>
                    ({proj.link})
                  </span>
                )}
              </div>
            </div>
            {proj.technologies && (
              <p className="text-[11px] font-bold mt-0.5" style={{ color: theme.primary }}>
                Technologies: {proj.technologies}
              </p>
            )}
            {proj.description && (
              <p className="text-xs text-black font-medium mt-1 leading-relaxed">{proj.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderCertifications = () => showCertifications ? (
    <section key="certifications" className="mb-5">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Certifications
      </h2>
      <div className="space-y-1.5">
        {certifications.map(cert => (
          <div key={cert.id} className="w-full flex justify-between items-baseline text-xs gap-4">
            <div className="pr-2">
              <span className="font-bold text-black">{cert.title}</span>
              {cert.issuer && <span className="text-black font-semibold"> — {cert.issuer}</span>}
            </div>
            {cert.date && <span className="text-black font-bold shrink-0 text-right ml-auto">{cert.date}</span>}
          </div>
        ))}
      </div>
    </section>
  ) : null;

  const renderAchievements = () => showAchievements ? (
    <section key="achievements" className="mb-2">
      <h2 className="text-xs font-bold uppercase tracking-wider mb-2 border-b pb-1" style={{ color: theme.primary, borderColor: theme.primary }}>
        Achievements & Awards
      </h2>
      <div className="space-y-2">
        {achievements.map(ach => (
          <div key={ach.id} className="text-xs">
            <div className="w-full flex justify-between items-baseline font-bold text-black gap-4">
              <span className="pr-2">{ach.title}</span>
              {ach.date && <span className="text-xs text-black font-bold shrink-0 text-right ml-auto">{ach.date}</span>}
            </div>
            {ach.description && <p className="text-black font-medium mt-0.5">{ach.description}</p>}
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
    <div className="w-full bg-white text-black font-sans p-8 sm:p-10 text-[13px] leading-relaxed">
      {/* Header */}
      <header className="border-b-2 pb-5 mb-6" style={{ borderColor: theme.primary }}>
        <h1 className="text-2xl font-extrabold tracking-tight uppercase" style={{ color: theme.primary }}>
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.title && (
          <p className="text-sm font-bold mt-0.5 tracking-wide text-black">
            {personalInfo.title}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mt-2.5 text-[11.5px] text-zinc-900 font-medium">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
              <span className="px-0.5">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
              <span className="px-0.5">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
              <span className="px-0.5">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <LinkedInIcon className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
              <span className="px-0.5">{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <GitHubIcon className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
              <span className="px-0.5">{personalInfo.github}</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 shrink-0" style={{ color: theme.primary }} />
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
