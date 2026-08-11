"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useResumeData } from "@/hooks/useResumeData";
import { TemplateType, AccentColor, ACCENT_THEMES, SectionId } from "@/types/resume";
import { GradForgeLogo } from "@/components/icons/GradForgeLogo";
import { exportResumeToPdf } from "@/utils/pdfExport";

import { PersonalForm } from "@/components/editor/PersonalForm";
import { SummaryForm } from "@/components/editor/SummaryForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { ProjectsForm } from "@/components/editor/ProjectsForm";
import { CertificationsForm } from "@/components/editor/CertificationsForm";
import { AchievementsForm } from "@/components/editor/AchievementsForm";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { AIResumeAssistantCard } from "@/components/ai/AIResumeAssistantCard";
import { AIImportModal } from "@/components/ai/AIImportModal";
import { ATSScoreModal } from "@/components/modals/ATSScoreModal";
import { JobMatchModal } from "@/components/modals/JobMatchModal";
import { SkillItem } from "@/types/resume";

import { 
  GraduationCap, 
  Download, 
  Trash2, 
  Sparkles, 
  User, 
  FileText, 
  Briefcase, 
  Code2, 
  Award, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown,
  Edit3, 
  LayoutTemplate,
  Printer,
  CheckCircle,
  ArrowLeft,
  Undo2,
  Redo2
} from "lucide-react";

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateQuery = searchParams.get("template") as TemplateType | null;

  const {
    resumeData,
    setResumeData,
    template,
    setTemplate,
    accentColor,
    setAccentColor,
    sectionVisibility,
    toggleSectionVisibility,
    sectionOrder,
    moveSectionUp,
    moveSectionDown,
    isLoaded,
    updatePersonalInfo,
    updateSummary,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    loadSample,
    clearData,
    undo,
    redo,
    canUndo,
    canRedo,
    autoFormatAllText,
    reorderArrayItem,
  } = useResumeData();

  // Mobile tab state: 'edit' or 'preview'
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const [isExporting, setIsExporting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>("Saved locally");
  const [isAIImportModalOpen, setIsAIImportModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isJobMatchModalOpen, setIsJobMatchModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showFormatToast, setShowFormatToast] = useState(false);

  const handleAutoFormatText = () => {
    autoFormatAllText();
    setShowFormatToast(true);
    setTimeout(() => setShowFormatToast(false), 5000);
  };

  const handleAIImport = (newSummary: string, newSkills: SkillItem[]) => {
    setResumeData({
      ...resumeData,
      summary: newSummary || resumeData.summary,
      skills: newSkills.length > 0 ? newSkills : resumeData.skills
    });
    // Ensure Professional Summary and Skills sections are expanded so user can see imported content
    setOpenSections(prev => ({ ...prev, summary: true, skills: true }));
  };

  // Accordion section open/close state: Only Personal Info is open initially
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    certifications: false,
    achievements: false,
  });

  // Track if user has manually opened/closed summary section
  const [hasOpenedNext, setHasOpenedNext] = useState(false);

  // Set template from query string if passed from landing page
  useEffect(() => {
    if (templateQuery && ["modern", "professional", "minimal", "executive", "creative"].includes(templateQuery)) {
      setTemplate(templateQuery as TemplateType);
    }
  }, [templateQuery, setTemplate]);

  // Auto-open Professional Summary when Personal Information has been filled out
  useEffect(() => {
    if (!isLoaded || hasOpenedNext) return;
    const isPersonalFilled = Boolean(
      resumeData.personalInfo.fullName?.trim() && 
      (resumeData.personalInfo.email?.trim() || resumeData.personalInfo.phone?.trim())
    );
    if (isPersonalFilled) {
      setOpenSections(prev => ({ ...prev, summary: true }));
      setHasOpenedNext(true);
    }
  }, [resumeData.personalInfo, isLoaded, hasOpenedNext]);

  // Flash saved notification when data updates
  useEffect(() => {
    if (isLoaded) {
      setSaveStatus("Saving...");
      const timer = setTimeout(() => setSaveStatus("Saved locally"), 400);
      return () => clearTimeout(timer);
    }
  }, [resumeData, template, accentColor, sectionVisibility, sectionOrder, isLoaded]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    await exportResumeToPdf("resume-preview-content", resumeData.personalInfo.fullName);
    setIsExporting(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="animate-pulse">
          <GradForgeLogo textClassName="text-xl font-bold text-zinc-900" />
        </div>
      </div>
    );
  }

  // Section card definition map using div header elements to prevent nested button HTML errors
  const renderSectionCard = (secId: SectionId, index: number) => {
    switch (secId) {
      case "summary":
        return (
          <div key="summary" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.summary === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("summary")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Professional Summary</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Move Up / Down Touch Buttons */}
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("summary");
                    }}
                    disabled={index === 0}
                    title="Move Professional Summary UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("summary");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Professional Summary DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Include / Exclude Toggle Pill */}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("summary");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.summary !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.summary !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.summary !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.summary ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.summary && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <SummaryForm summary={resumeData.summary} onChange={updateSummary} />
              </div>
            )}
          </div>
        );

      case "education":
        return (
          <div key="education" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.education === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("education")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Education ({resumeData.education.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("education");
                    }}
                    disabled={index === 0}
                    title="Move Education UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("education");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Education DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("education");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.education !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.education !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.education !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.education ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.education && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <EducationForm
                  items={resumeData.education}
                  onAdd={item => addArrayItem("education", item)}
                  onUpdate={(id, fields) => updateArrayItem("education", id, fields)}
                  onRemove={id => removeArrayItem("education", id)}
                />
              </div>
            )}
          </div>
        );

      case "experience":
        return (
          <div key="experience" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.experience === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("experience")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Experience ({resumeData.experience.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("experience");
                    }}
                    disabled={index === 0}
                    title="Move Experience UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("experience");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Experience DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("experience");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.experience !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.experience !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.experience !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.experience ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.experience && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <ExperienceForm
                  items={resumeData.experience}
                  onAdd={item => addArrayItem("experience", item)}
                  onUpdate={(id, fields) => updateArrayItem("experience", id, fields)}
                  onRemove={id => removeArrayItem("experience", id)}
                  onReorder={(idx, dir) => reorderArrayItem("experience", idx, dir)}
                />
              </div>
            )}
          </div>
        );

      case "skills":
        return (
          <div key="skills" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.skills === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("skills")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Skills ({resumeData.skills.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("skills");
                    }}
                    disabled={index === 0}
                    title="Move Skills UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("skills");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Skills DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("skills");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.skills !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.skills !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.skills !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.skills ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.skills && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <SkillsForm
                  items={resumeData.skills}
                  onAdd={item => addArrayItem("skills", item)}
                  onUpdate={(id, fields) => updateArrayItem("skills", id, fields)}
                  onRemove={id => removeArrayItem("skills", id)}
                />
              </div>
            )}
          </div>
        );

      case "projects":
        return (
          <div key="projects" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.projects === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("projects")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Projects ({resumeData.projects.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("projects");
                    }}
                    disabled={index === 0}
                    title="Move Projects UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("projects");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Projects DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("projects");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.projects !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.projects !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.projects !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.projects ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.projects && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <ProjectsForm
                  items={resumeData.projects}
                  onAdd={item => addArrayItem("projects", item)}
                  onUpdate={(id, fields) => updateArrayItem("projects", id, fields)}
                  onRemove={id => removeArrayItem("projects", id)}
                  onReorder={(idx, dir) => reorderArrayItem("projects", idx, dir)}
                />
              </div>
            )}
          </div>
        );

      case "certifications":
        return (
          <div key="certifications" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.certifications === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("certifications")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Certifications ({resumeData.certifications.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("certifications");
                    }}
                    disabled={index === 0}
                    title="Move Certifications UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("certifications");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Certifications DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("certifications");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.certifications !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.certifications !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.certifications !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.certifications ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.certifications && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <CertificationsForm
                  items={resumeData.certifications}
                  onAdd={item => addArrayItem("certifications", item)}
                  onUpdate={(id, fields) => updateArrayItem("certifications", id, fields)}
                  onRemove={id => removeArrayItem("certifications", id)}
                />
              </div>
            )}
          </div>
        );

      case "achievements":
        return (
          <div key="achievements" className={`bg-white rounded-xl border shadow-2xs overflow-hidden transition-all ${sectionVisibility.achievements === false ? "border-slate-200 opacity-75" : "border-slate-200"}`}>
            <div
              onClick={() => toggleSection("achievements")}
              className="w-full px-4 sm:px-5 py-3.5 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Achievements ({resumeData.achievements.length})</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionUp("achievements");
                    }}
                    disabled={index === 0}
                    title="Move Achievements UP"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveSectionDown("achievements");
                    }}
                    disabled={index === sectionOrder.length - 1}
                    title="Move Achievements DOWN"
                    className="p-1.5 sm:p-1 text-slate-600 hover:text-zinc-950 disabled:opacity-30 disabled:hover:text-slate-600 rounded transition-colors"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility("achievements");
                  }}
                  className={`px-2 py-0.5 sm:px-2.5 rounded-full text-[10px] font-extrabold border transition-all flex items-center gap-1 cursor-pointer ${
                    sectionVisibility.achievements !== false
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                      : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                  }`}
                  title={sectionVisibility.achievements !== false ? "Click to Exclude from resume" : "Click to Include in resume"}
                >
                  {sectionVisibility.achievements !== false ? (
                    <>
                      <Eye className="w-3 h-3 text-emerald-600" />
                      <span>Included</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3 text-slate-400" />
                      <span>Excluded</span>
                    </>
                  )}
                </span>

                {openSections.achievements ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
            </div>
            {openSections.achievements && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <AchievementsForm
                  items={resumeData.achievements}
                  onAdd={item => addArrayItem("achievements", item)}
                  onUpdate={(id, fields) => updateArrayItem("achievements", id, fields)}
                  onRemove={id => removeArrayItem("achievements", id)}
                />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen lg:h-screen bg-slate-100 flex flex-col font-sans lg:overflow-hidden overflow-x-hidden w-full max-w-full">
      {/* Builder Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Link 
              href="/" 
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800 flex items-center gap-1 text-xs"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <Link href="/" className="shrink-0">
              <GradForgeLogo textClassName="text-base sm:text-lg font-bold text-white tracking-tight" />
            </Link>
          </div>

          {/* Desktop Template Switcher Pills */}
          <div className="hidden md:flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs gap-0.5">
            {(["modern", "professional", "minimal", "executive", "creative"] as TemplateType[]).map(tKey => (
              <button
                key={tKey}
                onClick={() => setTemplate(tKey)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all capitalize ${
                  template === tKey 
                    ? "bg-zinc-900 text-white shadow-xs border border-zinc-700 font-semibold" 
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {tKey}
              </button>
            ))}
          </div>

          {/* Actions: Undo/Redo, Demo, Clear, Export */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Undo / Redo Control Pill */}
            <div className="flex items-center bg-slate-800 p-0.5 sm:p-1 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={undo}
                disabled={!canUndo}
                title="Undo last change (⌘Z)"
                aria-label="Undo last change"
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-200 hover:text-white disabled:opacity-30 disabled:hover:text-slate-200 rounded transition-all cursor-pointer disabled:cursor-not-allowed min-h-[32px]"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Undo</span>
              </button>
              <div className="w-px h-3.5 bg-slate-700 my-auto mx-0.5" />
              <button
                type="button"
                onClick={redo}
                disabled={!canRedo}
                title="Redo last change (⌘⇧Z)"
                aria-label="Redo last change"
                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-200 hover:text-white disabled:opacity-30 disabled:hover:text-slate-200 rounded transition-all cursor-pointer disabled:cursor-not-allowed min-h-[32px]"
              >
                <Redo2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Redo</span>
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveStatus}</span>
            </div>

            <button
              onClick={loadSample}
              className="inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2 sm:px-2.5 py-1.5 rounded-lg border border-slate-700 transition-colors shrink-0 min-h-[36px]"
              title="Load Sample Graduate Data"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="inline">Demo</span>
            </button>

            <button
              onClick={clearData}
              className="hidden sm:inline-flex items-center gap-1 text-xs bg-slate-800 hover:bg-red-950/40 text-slate-300 hover:text-red-400 font-medium px-2 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Clear all fields"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 rounded-lg transition-all shadow-sm shrink-0 min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-200" />
              <span>{isExporting ? "Exporting..." : "PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sticky Control Bar (Demo/Clear/Undo/Redo + Templates + Edit/Preview tabs) */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 flex flex-col gap-2 text-xs w-full max-w-full overflow-x-hidden shadow-2xs">
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5">
          {/* Quick Mobile Action Buttons: Load Demo & Clear */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={loadSample}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px] min-h-[34px] hover:bg-emerald-100 transition-colors"
              title="Load Sample Graduate Data"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Load Demo</span>
            </button>
            <button
              onClick={clearData}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 font-semibold text-[11px] min-h-[34px] hover:bg-slate-200 transition-colors"
              title="Clear all fields"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Clear</span>
            </button>
          </div>

          {/* Mobile View Mode Tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0">
            <button
              onClick={() => setMobileTab("edit")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold text-xs transition-all min-h-[34px] ${
                mobileTab === "edit" ? "bg-white text-zinc-900 shadow-2xs" : "text-slate-600"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-semibold text-xs transition-all min-h-[34px] ${
                mobileTab === "preview" ? "bg-white text-zinc-900 shadow-2xs" : "text-slate-600"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Template Scroll Row */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          <LayoutTemplate className="w-3.5 h-3.5 text-slate-500 shrink-0 mr-1" />
          {(["modern", "professional", "minimal", "executive", "creative"] as TemplateType[]).map(tKey => (
            <button
              key={tKey}
              onClick={() => setTemplate(tKey)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all capitalize whitespace-nowrap min-h-[32px] ${
                template === tKey
                  ? "bg-zinc-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tKey}
            </button>
          ))}
        </div>
      </div>

      {/* Main Builder Grid Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:overflow-hidden">
        {/* Left Side: Form Editor Accordions */}
        <div className={`lg:col-span-6 xl:col-span-5 lg:h-full lg:overflow-y-auto lg:pr-2 space-y-3.5 pb-8 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
          {/* AI Resume Assistant & Formatting Card */}
          <AIResumeAssistantCard 
            onOpenImportModal={() => setIsAIImportModalOpen(true)} 
            onAutoFormatText={handleAutoFormatText} 
          />

          {/* 1. Personal Information (Always fixed at top of form editor) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all">
            <div
              onClick={() => toggleSection("personal")}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 flex items-center justify-between bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm transition-colors text-left cursor-pointer select-none min-h-[44px]"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-slate-100 p-2 rounded-lg text-zinc-900 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm">Personal Information</span>
              </div>
              {openSections.personal ? (
                <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
              )}
            </div>
            {openSections.personal && (
              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100">
                <PersonalForm data={resumeData.personalInfo} onChange={updatePersonalInfo} />
              </div>
            )}
          </div>

          {/* Reorderable Section Cards (Rendered in custom sectionOrder) */}
          {sectionOrder.map((secId, index) => renderSectionCard(secId, index))}
        </div>

        {/* Right Side: Live A4 Resume Preview */}
        <div className={`lg:col-span-6 xl:col-span-7 lg:h-full lg:overflow-y-auto lg:pl-2 pb-8 ${mobileTab === "edit" ? "hidden lg:block" : "block"}`}>
          <div className="flex flex-col items-center w-full">
            <div className="w-full flex flex-wrap items-center justify-between gap-2 bg-white px-3 sm:px-4 py-2.5 rounded-xl border border-slate-200 shadow-2xs mb-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span className="hidden sm:inline">Live A4 Preview</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 rounded font-mono uppercase font-semibold border border-zinc-200">
                    {template}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setIsATSModalOpen(true)}
                  className="text-xs bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition-all shadow-2xs cursor-pointer"
                  title="Analyze ATS Readiness score & structural compatibility"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-200" />
                  <span>ATS Score</span>
                </button>

                <button
                  onClick={() => setIsJobMatchModalOpen(true)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-2.5 py-1 rounded border border-slate-300 flex items-center gap-1 transition-all cursor-pointer"
                  title="Match your resume against a target job description"
                >
                  <Briefcase className="w-3.5 h-3.5 text-zinc-900" />
                  <span className="hidden sm:inline">Job Match</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded font-medium flex items-center gap-1 transition-colors"
                  title="Print Resume via Browser Print"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Print</span>
                </button>

                <button
                  onClick={handleDownloadPdf}
                  disabled={isExporting}
                  className="text-xs bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>

            {/* A4 Document Responsive Scaled Container */}
            <div className="w-full flex justify-center overflow-x-auto py-2 no-scrollbar">
              <div className="w-full flex justify-center origin-top transform scale-[0.52] min-[375px]:scale-[0.58] min-[414px]:scale-[0.64] sm:scale-[0.78] md:scale-[0.9] lg:scale-100 transition-transform duration-200">
                <ResumePreview 
                  data={resumeData} 
                  template={template} 
                  accentColor={accentColor} 
                  sectionVisibility={sectionVisibility} 
                  sectionOrder={sectionOrder} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Content Import Modal */}
      <AIImportModal
        isOpen={isAIImportModalOpen}
        onClose={() => setIsAIImportModalOpen(false)}
        onImport={handleAIImport}
        hasExistingData={Boolean(resumeData.summary || resumeData.skills.length > 0)}
        onSuccessToast={() => {
          setShowSuccessToast(true);
          setTimeout(() => setShowSuccessToast(false), 4000);
        }}
      />

      {/* ATS Readiness Score Modal */}
      <ATSScoreModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
        resumeData={resumeData}
        onOpenJobMatch={() => setIsJobMatchModalOpen(true)}
      />

      {/* Job Description Match Modal */}
      <JobMatchModal
        isOpen={isJobMatchModalOpen}
        onClose={() => setIsJobMatchModalOpen(false)}
        resumeData={resumeData}
      />

      {/* Global AI Import Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white border border-emerald-500/50 shadow-2xl px-4 sm:px-5 py-3.5 rounded-2xl flex items-center gap-3 animate-slide-up max-w-[90vw]">
          <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/40 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-extrabold text-xs sm:text-sm text-white">Import Successful!</div>
            <div className="text-[11px] sm:text-xs text-zinc-300">✓ AI content imported successfully!</div>
          </div>
        </div>
      )}

      {/* Format Text Toast Notification with optional ATS Check button */}
      {showFormatToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 text-white border border-slate-700 shadow-2xl px-4 sm:px-5 py-3.5 rounded-2xl flex items-center gap-3 animate-slide-up max-w-[90vw]">
          <div className="bg-emerald-500/20 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/40 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-extrabold text-xs sm:text-sm text-white">Resume Formatting Improved</div>
            <div className="text-[11px] sm:text-xs text-zinc-300">✓ Titles, skills, and dates formatted to Title Case.</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowFormatToast(false);
              setIsATSModalOpen(true);
            }}
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0 cursor-pointer"
          >
            Check ATS Score
          </button>
        </div>
      )}
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-700 animate-bounce" />
            <span className="font-semibold text-lg">Loading GradForge Builder...</span>
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
