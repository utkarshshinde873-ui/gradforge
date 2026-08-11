import React from "react";
import { ProjectItem } from "@/types/resume";
import { Plus, Trash2, Code2 } from "lucide-react";
import { formatTitleCase, formatSentenceCase } from "@/utils/formatText";

interface ProjectsFormProps {
  items: ProjectItem[];
  onAdd: (item: ProjectItem) => void;
  onUpdate: (id: string, fields: Partial<ProjectItem>) => void;
  onRemove: (id: string) => void;
}

export function ProjectsForm({ items, onAdd, onUpdate, onRemove }: ProjectsFormProps) {
  const handleAddNew = () => {
    const newItem: ProjectItem = {
      id: "proj-" + Date.now(),
      title: "",
      technologies: "",
      description: "",
      link: "",
    };
    onAdd(newItem);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <Code2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No projects added yet.</p>
          <p className="text-[11px] text-slate-500 mt-1">Course capstones, personal projects, or hackathon entries are essential for fresh grads!</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project Entry</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-zinc-800" />
                  <span>Project #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Name *</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => onUpdate(item.id, { title: e.target.value })}
                    onBlur={() => onUpdate(item.id, { title: formatTitleCase(item.title) })}
                    placeholder="e.g. GradForge Resume Builder"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Link / Repo URL</label>
                  <input
                    type="text"
                    value={item.link}
                    onChange={e => onUpdate(item.id, { link: e.target.value })}
                    placeholder="github.com/username/project"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">Technologies Used</label>
                <input
                  type="text"
                  value={item.technologies}
                  onChange={e => onUpdate(item.id, { technologies: e.target.value })}
                  onBlur={() => onUpdate(item.id, { technologies: formatTitleCase(item.technologies) })}
                  placeholder="e.g. Next.js, TypeScript, Tailwind CSS, LocalStorage"
                  className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Description & Impact</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={e => onUpdate(item.id, { description: e.target.value })}
                  onBlur={() => onUpdate(item.id, { description: formatSentenceCase(item.description) })}
                  placeholder="Describe the problem solved, main features, or performance accomplishments..."
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
            <span>Add Another Project</span>
          </button>
        </div>
      )}
    </div>
  );
}
