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
    <div className="bg-white text-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs relative overflow-hidden transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-zinc-100 text-zinc-900 p-2 rounded-lg border border-zinc-200 shrink-0">
            <Sparkles className="w-4 h-4 text-zinc-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm tracking-tight text-slate-900">
                AI Resume Assistant & Formatting
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                ChatGPT Guided
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
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
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs px-2.5 py-2 rounded-lg shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Copies AI prompt to clipboard and opens ChatGPT in a new tab"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>ChatGPT AI</span>
        </button>

        <button
          type="button"
          onClick={onOpenImportModal}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-2.5 py-2 rounded-lg border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Paste your generated ChatGPT output to populate your resume"
        >
          <ClipboardPaste className="w-3.5 h-3.5 text-slate-700" />
          <span>Import AI</span>
        </button>

        {onAutoFormatText && (
          <button
            type="button"
            onClick={handleAutoFormat}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-2.5 py-2 rounded-lg border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Auto-formats all skills, job titles, institutions, and summary text to proper Title Case"
          >
            <Wand2 className="w-3.5 h-3.5 text-zinc-900" />
            <span>Format Text</span>
          </button>
        )}
      </div>

      {/* Helper text */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-normal">
        <Info className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span>Click <strong>Format Text</strong> to auto-capitalize all skills, job titles, and locations instantly.</span>
      </div>

      {/* Toast Banner */}
      {toastMessage && (
        <div className="mt-3 bg-slate-100 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 flex items-center justify-between gap-2 animate-fade-in shadow-2xs">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-zinc-900 shrink-0" />
            <span className="font-semibold text-slate-800">{toastMessage}</span>
          </div>
          {popupBlocked && (
            <a
              href="https://chatgpt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] bg-zinc-900 hover:bg-zinc-800 text-white font-semibold px-2.5 py-1 rounded flex items-center gap-1 transition-colors shrink-0"
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
