"use client";

import React, { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { JobMatchResult } from "@/types/ats";
import { calculateJobMatch } from "@/utils/jobMatch";
import { JobMatchResults } from "./JobMatchResults";
import { X, Briefcase, FileText, Sparkles } from "lucide-react";

interface JobMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

const SAMPLE_JOB_DESCRIPTION = `Job Title: Data Analyst
Company: Acme Analytics Inc.

Responsibilities:
- Analyze large datasets to extract actionable business insights and trends.
- Build, optimize, and maintain interactive Power BI and Tableau dashboards.
- Clean raw data and build automated ETL data pipelines using SQL and Python.
- Present findings and communicate recommendations to cross-functional stakeholders.

Requirements:
- Bachelor's degree in Computer Science, Data Science, Information Systems, or related field.
- Strong proficiency in SQL, Python, Excel, and Power BI.
- Experience with Data Visualization, Data Cleaning, and ETL processes.
- Excellent problem-solving and communication skills.`;

export function JobMatchModal({ isOpen, onClose, resumeData }: JobMatchModalProps) {
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState<JobMatchResult | null>(null);

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

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!jobText.trim()) return;

    const res = calculateJobMatch(resumeData, jobText);
    setResult(res);
  };

  const handleLoadSample = () => {
    setJobText(SAMPLE_JOB_DESCRIPTION);
  };

  const handleResetJD = () => {
    setResult(null);
    setJobText("");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 text-slate-900 rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl relative my-auto animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="bg-zinc-100 text-zinc-900 p-2 rounded-xl border border-zinc-300 shrink-0">
              <Briefcase className="w-5 h-5 text-zinc-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-2">
                <span>Match Resume To Job</span>
              </h3>
              <p className="text-xs text-slate-500 font-normal">
                Compare your resume against target job description requirements
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

        {/* Conditional View: Input vs Results */}
        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-zinc-800" />
                <span>Paste Target Job Description</span>
              </label>
              <button
                type="button"
                onClick={handleLoadSample}
                className="text-zinc-900 hover:text-zinc-700 font-bold flex items-center gap-1 hover:underline transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-zinc-800" />
                <span>Load Sample Data Analyst JD</span>
              </button>
            </div>

            <textarea
              rows={9}
              value={jobText}
              onChange={e => setJobText(e.target.value)}
              placeholder="Paste job posting text here (responsibilities, technical requirements, qualifications)..."
              className="w-full px-3.5 py-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 text-slate-900 outline-none leading-relaxed resize-y font-sans"
            />

            <button
              type="submit"
              disabled={!jobText.trim()}
              className="w-full bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Job Match</span>
            </button>

            {/* Disclaimer Footer */}
            <p className="text-[10px] text-slate-500 text-center leading-normal pt-1">
              * GradForge Job Match Score is an estimate based on keyword overlap, responsibilities, and experience relevance. Actual ATS systems vary by employer.
            </p>
          </form>
        ) : (
          <JobMatchResults result={result} onClose={onClose} onResetJD={handleResetJD} />
        )}
      </div>
    </div>
  );
}
