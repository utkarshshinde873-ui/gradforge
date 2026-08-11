import React from "react";
import { ExperienceItem } from "@/types/resume";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { formatTitleCase, formatSentenceCase } from "@/utils/formatText";

interface ExperienceFormProps {
  items: ExperienceItem[];
  onAdd: (item: ExperienceItem) => void;
  onUpdate: (id: string, fields: Partial<ExperienceItem>) => void;
  onRemove: (id: string) => void;
}

export function ExperienceForm({ items, onAdd, onUpdate, onRemove }: ExperienceFormProps) {
  const handleAddNew = () => {
    const newItem: ExperienceItem = {
      id: "exp-" + Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    onAdd(newItem);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No experience or internship entries added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Internship / Work Entry</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-zinc-800" />
                  <span>Experience Entry #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={e => onUpdate(item.id, { company: e.target.value })}
                    onBlur={() => onUpdate(item.id, { company: formatTitleCase(item.company) })}
                    placeholder="e.g. Acme Tech Inc."
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Position / Role *</label>
                  <input
                    type="text"
                    value={item.position}
                    onChange={e => onUpdate(item.id, { position: e.target.value })}
                    onBlur={() => onUpdate(item.id, { position: formatTitleCase(item.position) })}
                    placeholder="e.g. Software Engineering Intern"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={item.startDate}
                    onChange={e => onUpdate(item.id, { startDate: e.target.value })}
                    onBlur={() => onUpdate(item.id, { startDate: formatTitleCase(item.startDate) })}
                    placeholder="Jun 2023"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                  <input
                    type="text"
                    value={item.endDate}
                    onChange={e => onUpdate(item.id, { endDate: e.target.value })}
                    onBlur={() => onUpdate(item.id, { endDate: formatTitleCase(item.endDate) })}
                    placeholder="Aug 2023 (or Present)"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Description & Key Accomplishments
                </label>
                <textarea
                  rows={3}
                  value={item.description}
                  onChange={e => onUpdate(item.id, { description: e.target.value })}
                  onBlur={() => onUpdate(item.id, { description: formatSentenceCase(item.description) })}
                  placeholder="• Developed features using React and TypeScript...&#10;• Collaborated with senior engineers to refactor code..."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none resize-y"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddNew}
            className="w-full py-2.5 bg-white border border-slate-300 hover:border-zinc-800 hover:text-zinc-900 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Experience Entry</span>
          </button>
        </div>
      )}
    </div>
  );
}
