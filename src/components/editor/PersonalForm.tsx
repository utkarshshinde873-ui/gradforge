import React from "react";
import { PersonalInfo } from "@/types/resume";
import { User, Mail, Phone, MapPin, Globe, Briefcase } from "lucide-react";
import { LinkedInIcon, GitHubIcon } from "@/components/icons/SocialIcons";

interface PersonalFormProps {
  data: PersonalInfo;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export function PersonalForm({ data, onChange }: PersonalFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-800" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={e => onChange("fullName", e.target.value)}
            placeholder="e.g. Alex Johnson"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-zinc-800" />
            <span>Professional Title / Target Role</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={e => onChange("title", e.target.value)}
            placeholder="e.g. Computer Science Graduate | Software Engineer"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-800" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange("email", e.target.value)}
            placeholder="alex.johnson@example.edu"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-zinc-800" />
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={e => onChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-800" />
            <span>Location (City, State / Country)</span>
          </label>
          <input
            type="text"
            value={data.location}
            onChange={e => onChange("location", e.target.value)}
            placeholder="Seattle, WA"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <LinkedInIcon className="w-3.5 h-3.5 text-zinc-800" />
            <span>LinkedIn Profile</span>
          </label>
          <input
            type="text"
            value={data.linkedin}
            onChange={e => onChange("linkedin", e.target.value)}
            placeholder="linkedin.com/in/alexjohnson"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <GitHubIcon className="w-3.5 h-3.5 text-zinc-800" />
            <span>GitHub Profile</span>
          </label>
          <input
            type="text"
            value={data.github}
            onChange={e => onChange("github", e.target.value)}
            placeholder="github.com/alexjohnson"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-zinc-800" />
            <span>Portfolio / Personal Website</span>
          </label>
          <input
            type="text"
            value={data.portfolio}
            onChange={e => onChange("portfolio", e.target.value)}
            placeholder="alexjohnson.dev"
            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-zinc-800 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
