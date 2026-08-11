import React from "react";
import { JobMatchResult } from "@/types/ats";
import { CheckCircle2, AlertTriangle, Sparkles, Check, X, Minus } from "lucide-react";

interface JobMatchResultsProps {
  result: JobMatchResult;
  onClose: () => void;
  onResetJD: () => void;
}

export function JobMatchResults({ result, onClose, onResetJD }: JobMatchResultsProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  let badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
  let ringColor = "text-amber-600";
  if (result.score >= 80) {
    badgeBg = "bg-zinc-900 text-white border-zinc-900";
    ringColor = "text-zinc-900";
  } else if (result.score >= 65) {
    badgeBg = "bg-zinc-800 text-white border-zinc-800";
    ringColor = "text-zinc-800";
  } else if (result.score < 50) {
    badgeBg = "bg-rose-100 text-rose-800 border-rose-300";
    ringColor = "text-rose-600";
  }

  return (
    <div className="space-y-5">
      {/* Circular Progress Score Header */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-2xs">
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-slate-200 stroke-current"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              className={`${ringColor} stroke-current transition-all duration-1000 ease-out`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
            <span className="font-black text-2xl text-slate-900">{result.score}</span>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5">/100</span>
          </div>
        </div>

        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${badgeBg}`}>
              {result.label.toUpperCase()}
            </span>
            <span className="text-[11px] bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full border border-slate-300 font-bold">
              Role: {result.detectedJobTitle}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pt-1 font-normal">
            Your resume matches many of the key skills and experience requirements for this target position.
          </p>
        </div>
      </div>

      {/* Matching vs Missing Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matching Skills */}
        <div className="bg-slate-50/80 border border-slate-200 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-zinc-900" />
            <span>Matching Skills ({result.matchingSkills.length})</span>
          </h4>
          {result.matchingSkills.length === 0 ? (
            <p className="text-xs text-slate-500 italic">No direct matching skills detected.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.matchingSkills.map(skill => (
                <span key={skill} className="bg-zinc-100 text-zinc-900 border border-zinc-300 text-xs px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Skills */}
        <div className="bg-slate-50/80 border border-slate-200 p-4 rounded-xl space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Missing Keywords ({result.missingSkills.length})</span>
          </h4>
          {result.missingSkills.length === 0 ? (
            <p className="text-xs text-zinc-900 font-bold italic">All key required skills present in your resume!</p>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.missingSkills.map(skill => (
                <span key={skill} className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                  <Minus className="w-3 h-3 text-amber-600" />
                  <span>{skill}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Responsibility Match Ratings Table */}
      <div className="bg-slate-50/80 border border-slate-200 p-4 rounded-xl space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Responsibility Match Rating
        </h4>
        <div className="space-y-2">
          {result.responsibilityMatches.map((item, idx) => {
            let statusBadge = "bg-zinc-900 text-white border-zinc-900";
            let icon = <Check className="w-3.5 h-3.5 text-white" />;
            
            if (item.matchType === "Partial") {
              statusBadge = "bg-amber-100 text-amber-800 border-amber-300";
              icon = <Minus className="w-3.5 h-3.5 text-amber-700" />;
            } else if (item.matchType === "Weak") {
              statusBadge = "bg-rose-100 text-rose-800 border-rose-200";
              icon = <X className="w-3.5 h-3.5 text-rose-700" />;
            }

            return (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-800 font-medium truncate">{item.phrase}</span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 flex items-center gap-1 ${statusBadge}`}>
                  {icon}
                  <span>{item.matchType}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
          <span>Tailored Recommendations</span>
        </h4>
        <div className="space-y-1.5">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
              <span className="font-bold text-zinc-900">{idx + 1}.</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <button
          type="button"
          onClick={onResetJD}
          className="w-full sm:w-auto text-xs text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2.5 rounded-xl font-semibold transition-colors cursor-pointer"
        >
          Paste Another Job Description
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Improve Resume Now
        </button>
      </div>
    </div>
  );
}
