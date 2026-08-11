import React from "react";
import { ATSCategoryBreakdown } from "@/types/ats";

interface ATSScoreBreakdownProps {
  breakdown: ATSCategoryBreakdown;
}

export function ATSScoreBreakdown({ breakdown }: ATSScoreBreakdownProps) {
  const items = [
    { label: "Contact Information", score: breakdown.contactInfo, max: 10 },
    { label: "Resume Structure", score: breakdown.resumeStructure, max: 20 },
    { label: "Experience & Projects", score: breakdown.experience, max: 20 },
    { label: "Skills Completeness", score: breakdown.skills, max: 15 },
    { label: "Education Details", score: breakdown.education, max: 10 },
    { label: "Formatting & Readability", score: breakdown.formatting, max: 25 },
  ];

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
        Score Breakdown
      </h4>
      {items.map(item => {
        const percentage = Math.round((item.score / item.max) * 100);
        let barColor = "bg-zinc-900";
        if (percentage < 60) barColor = "bg-rose-600";
        else if (percentage < 80) barColor = "bg-amber-600";

        return (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
              <span>{item.label}</span>
              <span className="font-mono text-slate-600">{item.score} / {item.max}</span>
            </div>
            <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor} rounded-full transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
