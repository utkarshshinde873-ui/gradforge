import React from "react";
import { Sparkles } from "lucide-react";
import { formatSentenceCase } from "@/utils/formatText";

interface SummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
}

export function SummaryForm({ summary, onChange }: SummaryFormProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-slate-700">
          Professional Summary / Objective
        </label>
        <span className="text-[11px] text-slate-500 font-normal">
          Keep it 2–4 sentences focusing on your career goal & strengths.
        </span>
      </div>

      <textarea
        rows={4}
        value={summary}
        onChange={e => onChange(e.target.value)}
        onBlur={() => onChange(formatSentenceCase(summary))}
        placeholder="e.g. Enthusiastic Computer Science graduate passionate about full-stack software development. Proficient in React, TypeScript, and modern web frameworks with hands-on project experience..."
        className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all resize-y leading-relaxed"
      />

      <div className="bg-zinc-100 p-3 rounded-lg border border-zinc-200 flex items-start gap-2 text-xs text-zinc-900">
        <Sparkles className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Student Tip:</strong> Mention your key technical skills, degree status, and how you can add value to an entry-level team.
        </div>
      </div>
    </div>
  );
}
