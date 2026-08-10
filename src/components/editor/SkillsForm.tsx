import React, { useState } from "react";
import { SkillItem } from "@/types/resume";
import { Plus, Trash2, Tag } from "lucide-react";

interface SkillsFormProps {
  items: SkillItem[];
  onAdd: (item: SkillItem) => void;
  onUpdate: (id: string, fields: Partial<SkillItem>) => void;
  onRemove: (id: string) => void;
}

const DEFAULT_CATEGORIES = [
  "Languages",
  "Frameworks & Libraries",
  "Tools & Platforms",
  "Databases",
  "Soft Skills",
  "General",
];

export function SkillsForm({ items, onAdd, onUpdate, onRemove }: SkillsFormProps) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newCategory, setNewCategory] = useState("Languages");

  const handleAddSkill = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newSkillName.trim()) return;

    onAdd({
      id: "sk-" + Date.now(),
      name: newSkillName.trim(),
      category: newCategory.trim() || "General",
    });

    setNewSkillName("");
  };

  return (
    <div className="space-y-4">
      {/* Add Skill Quick Inputs */}
      <form onSubmit={handleAddSkill} className="p-3.5 bg-zinc-100/80 border border-zinc-300 rounded-lg space-y-3">
        <span className="text-xs font-bold text-zinc-900 block">Add New Skill</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Skill Name</label>
            <input
              type="text"
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
              placeholder="e.g. React.js, Python, Git"
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 mb-1">Category</label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
            >
              {DEFAULT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={!newSkillName.trim()}
              className="w-full py-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </div>
      </form>

      {/* Existing Skills Tag List */}
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-xs text-slate-500">
          No skills added yet. Use the input above to add technical and professional skills.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Added Skills ({items.length})</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map(skill => (
              <div key={skill.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Tag className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
                  <span className="text-xs font-bold text-slate-900 truncate">{skill.name}</span>
                  <span className="text-[10px] bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded font-medium border border-zinc-200 shrink-0">
                    {skill.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(skill.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1"
                  title="Remove Skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
