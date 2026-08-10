import React from "react";
import { ResumeData, TemplateType, AccentColor, SectionVisibility, SectionId } from "@/types/resume";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
  accentColor?: AccentColor;
  sectionVisibility?: SectionVisibility;
  sectionOrder?: SectionId[];
}

export const ResumePreview = React.memo(function ResumePreview({ 
  data, 
  template, 
  accentColor = "charcoal", 
  sectionVisibility, 
  sectionOrder 
}: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "professional":
        return <ProfessionalTemplate data={data} accentColor={accentColor} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />;
      case "executive":
        return <ExecutiveTemplate data={data} accentColor={accentColor} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />;
      case "creative":
        return <CreativeTemplate data={data} accentColor={accentColor} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />;
      case "modern":
      default:
        return <ModernTemplate data={data} accentColor={accentColor} sectionVisibility={sectionVisibility} sectionOrder={sectionOrder} />;
    }
  };

  return (
    <div className="w-full flex justify-center py-4 px-2 sm:px-4">
      {/* A4 Sheet Container */}
      <div 
        key={`${template}-${accentColor}`}
        id="resume-preview-content"
        className="print-area a4-page bg-white shadow-xl hover:shadow-2xl rounded-sm border border-slate-200 overflow-hidden transition-all duration-300 animate-scale-in"
      >
        {renderTemplate()}
      </div>
    </div>
  );
});
