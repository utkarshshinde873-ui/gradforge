import React from "react";
import { AchievementItem } from "@/types/resume";
import { Plus, Trash2, Award } from "lucide-react";

interface AchievementsFormProps {
  items: AchievementItem[];
  onAdd: (item: AchievementItem) => void;
  onUpdate: (id: string, fields: Partial<AchievementItem>) => void;
  onRemove: (id: string) => void;
}

export function AchievementsForm({ items, onAdd, onUpdate, onRemove }: AchievementsFormProps) {
  const handleAddNew = () => {
    const newItem: AchievementItem = {
      id: "ach-" + Date.now(),
      title: "",
      description: "",
      date: "",
    };
    onAdd(newItem);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Award className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No achievements or awards added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement Entry</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-zinc-800" />
                  <span>Achievement #{index + 1}</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Achievement Title *</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => onUpdate(item.id, { title: e.target.value })}
                    placeholder="e.g. 1st Place University Hackathon 2023"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={e => onUpdate(item.id, { date: e.target.value })}
                    placeholder="Oct 2023"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description / Details</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={e => onUpdate(item.id, { description: e.target.value })}
                  placeholder="Awarded top honor among 45 teams for building an open-source tool."
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
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
            <span>Add Another Achievement</span>
          </button>
        </div>
      )}
    </div>
  );
}
