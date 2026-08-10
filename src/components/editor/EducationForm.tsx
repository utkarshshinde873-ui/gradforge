import React from "react";
import { EducationItem } from "@/types/resume";
import { Plus, Trash2, GraduationCap } from "lucide-react";

interface EducationFormProps {
  items: EducationItem[];
  onAdd: (item: EducationItem) => void;
  onUpdate: (id: string, fields: Partial<EducationItem>) => void;
  onRemove: (id: string) => void;
}

export function EducationForm({ items, onAdd, onUpdate, onRemove }: EducationFormProps) {
  const handleAddNew = () => {
    const newItem: EducationItem = {
      id: "edu-" + Date.now(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    onAdd(newItem);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education Entry</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative group">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-zinc-800" />
                  <span>Education Entry #{index + 1}</span>
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Institution / University *</label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={e => onUpdate(item.id, { institution: e.target.value })}
                    placeholder="e.g. University of California"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Degree *</label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={e => onUpdate(item.id, { degree: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Field of Study</label>
                  <input
                    type="text"
                    value={item.fieldOfStudy}
                    onChange={e => onUpdate(item.id, { fieldOfStudy: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Start & End Date</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={e => onUpdate(item.id, { startDate: e.target.value })}
                      placeholder="Sep 2020"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                    />
                    <input
                      type="text"
                      value={item.endDate}
                      onChange={e => onUpdate(item.id, { endDate: e.target.value })}
                      placeholder="May 2024"
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Grade / GPA</label>
                  <input
                    type="text"
                    value={item.gpa}
                    onChange={e => onUpdate(item.id, { gpa: e.target.value })}
                    placeholder="e.g. 3.8 / 4.0"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddNew}
            className="w-full py-2.5 bg-white border border-slate-300 hover:border-zinc-800 hover:text-zinc-900 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Education Entry</span>
          </button>
        </div>
      )}
    </div>
  );
}
