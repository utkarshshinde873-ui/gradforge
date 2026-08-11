"use client";

import React, { useState } from "react";
import { CHATGPT_AI_PROMPT } from "@/utils/aiResumeAssistant";
import { Sparkles, ClipboardPaste, Check, ExternalLink, Info, Wand2 } from "lucide-react";

interface AIResumeAssistantCardProps {
  onOpenImportModal: () => void;
  onAutoFormatText?: () => void;
}

export function AIResumeAssistantCard({ onOpenImportModal, onAutoFormatText }: AIResumeAssistantCardProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [popupBlocked, setPopupBlocked] = useState(false);

  const handleGenerateWithChatGPT = async () => {
    setPopupBlocked(false);
    setToastMessage(null);

    // 1. Copy Prompt to Clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(CHATGPT_AI_PROMPT);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = CHATGPT_AI_PROMPT;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (e) {
      console.error("Clipboard copy error:", e);
    }

    // 2. Open ChatGPT in a new tab
    const chatWindow = window.open("https://chatgpt.com/", "_blank");
    if (!chatWindow || chatWindow.closed || typeof chatWindow.closed === "undefined") {
      setPopupBlocked(true);
      setToastMessage("✓ Prompt copied! Open ChatGPT manually if the new tab was blocked.");
    } else {
      setToastMessage("✓ Prompt copied! ChatGPT opened in a new tab.");
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleAutoFormat = () => {
    if (onAutoFormatText) {
      onAutoFormatText();
      setToastMessage("✓ Formatting complete! All skills, titles, and text formatted to proper Title Case.");
      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-md relative overflow-hidden transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-500/15 text-emerald-400 p-2 rounded-lg border border-emerald-500/25 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm tracking-tight text-white">
                AI Resume Assistant & Formatting
              </h3>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-medium">
                ChatGPT Guided
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-normal">
              Create summary & skills with ChatGPT, or auto-format all titles to Title Case.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 my-3">
        <button
          type="button"
          onClick={handleGenerateWithChatGPT}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-2.5 py-2 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Copies AI prompt to clipboard and opens ChatGPT in a new tab"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ChatGPT AI</span>
        </button>

        <button
          type="button"
          onClick={onOpenImportModal}
          className="w-full bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-xs px-2.5 py-2 rounded-lg border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Paste your generated ChatGPT output to populate your resume"
        >
          <ClipboardPaste className="w-3.5 h-3.5 text-slate-300" />
          <span>Import AI</span>
        </button>

        {onAutoFormatText && (
          <button
            type="button"
            onClick={handleAutoFormat}
            className="w-full bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-semibold text-xs px-2.5 py-2 rounded-lg border border-zinc-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Auto-formats all skills, job titles, institutions, and summary text to proper Title Case"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Format Text</span>
          </button>
        )}
      </div>

      {/* Helper text */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-500" />
        <span>Click <strong>Format Text</strong> to auto-capitalize all skills, job titles, and locations instantly.</span>
      </div>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="mt-3 bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 flex items-center justify-between gap-2 animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          {popupBlocked && (
            <a
              href="https://chatgpt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition-colors shrink-0"
            >
              <span>Open ChatGPT</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
