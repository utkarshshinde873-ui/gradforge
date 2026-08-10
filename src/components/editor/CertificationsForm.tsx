import React from "react";
import { CertificationItem } from "@/types/resume";
import { Plus, Trash2, ShieldCheck } from "lucide-react";

interface CertificationsFormProps {
  items: CertificationItem[];
  onAdd: (item: CertificationItem) => void;
  onUpdate: (id: string, fields: Partial<CertificationItem>) => void;
  onRemove: (id: string) => void;
}

export function CertificationsForm({ items, onAdd, onUpdate, onRemove }: CertificationsFormProps) {
  const handleAddNew = () => {
    const newItem: CertificationItem = {
      id: "cert-" + Date.now(),
      title: "",
      issuer: "",
      date: "",
      link: "",
    };
    onAdd(newItem);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAddNew}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-lg border border-zinc-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 relative">
              <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-zinc-800" />
                  <span>Certification #{index + 1}</span>
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="text-slate-400 hover:text-red-600 transition-colors p-1 rounded"
                  title="Remove Certification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Certification Name *</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={e => onUpdate(item.id, { title: e.target.value })}
                    placeholder="e.g. AWS Certified Developer"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    value={item.issuer}
                    onChange={e => onUpdate(item.id, { issuer: e.target.value })}
                    placeholder="e.g. Amazon Web Services, Coursera"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date Issued</label>
                  <input
                    type="text"
                    value={item.date}
                    onChange={e => onUpdate(item.id, { date: e.target.value })}
                    placeholder="Nov 2023"
                    className="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-zinc-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Credential URL / Verification Link</label>
                  <input
                    type="text"
                    value={item.link}
                    onChange={e => onUpdate(item.id, { link: e.target.value })}
                    placeholder="credential.link/id"
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
            <span>Add Another Certification</span>
          </button>
        </div>
      )}
    </div>
  );
}
