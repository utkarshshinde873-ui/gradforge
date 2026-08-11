"use client";

import React, { useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { calculateATSReadiness } from "@/utils/atsScore";
import { ATSScoreBreakdown } from "./ATSScoreBreakdown";
import { X, Sparkles, Briefcase, AlertCircle, ShieldCheck } from "lucide-react";

interface ATSScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
  onOpenJobMatch: () => void;
}

export function ATSScoreModal({ isOpen, onClose, resumeData, onOpenJobMatch }: ATSScoreModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const breakdown = calculateATSReadiness(resumeData);

  // SVG Circular Ring Math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (breakdown.totalScore / 100) * circumference;

  let badgeBg = "bg-amber-100 text-amber-800 border-amber-300";
  let ringColor = "text-amber-600";
  if (breakdown.totalScore >= 90) {
    badgeBg = "bg-zinc-900 text-white border-zinc-900";
    ringColor = "text-zinc-900";
  } else if (breakdown.totalScore >= 75) {
    badgeBg = "bg-zinc-800 text-white border-zinc-800";
    ringColor = "text-zinc-800";
  } else if (breakdown.totalScore < 60) {
    badgeBg = "bg-rose-100 text-rose-800 border-rose-300";
    ringColor = "text-rose-600";
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 text-slate-900 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-zinc-100 text-zinc-900 p-2 rounded-xl border border-zinc-300 shrink-0">
              <ShieldCheck className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-2">
                <span>ATS Readiness</span>
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Structure & parseability analysis for applicant tracking systems
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Circular Progress Ring & Score Header */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-5 mb-5 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-2xs">
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
              <span className="font-black text-2xl text-slate-900">{breakdown.totalScore}</span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5">/100</span>
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${badgeBg}`}>
                {breakdown.label.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1 font-normal">
              Your resume has a <strong className="text-slate-900">{breakdown.label.toLowerCase()}</strong> ATS-friendly structure. 
              Recruiter parsing systems can reliably extract your contact info, skills, and experience.
            </p>
          </div>
        </div>

        {/* Category Score Breakdown */}
        <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 mb-5">
          <ATSScoreBreakdown breakdown={breakdown} />
        </div>

        {/* Actionable Improvements List */}
        <div className="mb-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
            <span>Recommended Improvements</span>
          </h4>
          <div className="space-y-1.5">
            {breakdown.improvements.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transition Button to Job Match */}
        <div className="pt-3 border-t border-slate-200 space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenJobMatch();
            }}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Briefcase className="w-4 h-4" />
            <span>Match With Job Description</span>
          </button>

          {/* Disclaimer Footer */}
          <p className="text-[10px] text-slate-500 text-center leading-normal px-2">
            * GradForge scores are estimates based on resume structure, content, keywords and job-description matching. Actual ATS systems vary by employer and configuration.
          </p>
        </div>
      </div>
    </div>
  );
}
