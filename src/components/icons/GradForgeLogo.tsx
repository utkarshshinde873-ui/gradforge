import React from "react";

export function GradForgeLogo({ 
  className = "w-6 h-6", 
  iconOnly = false,
  textClassName = "text-xl font-bold tracking-tight text-zinc-900"
}: { 
  className?: string; 
  iconOnly?: boolean;
  textClassName?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 group">
      {/* Sleek Metallic Forge & Cap Emblem */}
      <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-zinc-900 via-slate-800 to-zinc-950 p-2 shadow-md border border-zinc-700/80 group-hover:scale-105 group-hover:border-zinc-500 transition-all duration-300">
        <svg 
          className={className} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradForgeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="gradForgeSpark" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>

          {/* Anvil / Forge Base Layer */}
          <path 
            d="M6 22C6 20.8954 6.89543 20 8 20H24C25.1046 20 26 20.8954 26 22V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V22Z" 
            fill="url(#gradForgeMetal)" 
            opacity="0.9"
          />

          {/* Stylized Graduation Mortarboard Top */}
          <path 
            d="M16 4L3 10.5L16 17L29 10.5L16 4Z" 
            fill="url(#gradForgeMetal)" 
          />

          {/* Cap Skull Base & Tassel Details */}
          <path 
            d="M8.5 13.5V17.5C8.5 19.5 11.8579 21 16 21C20.1421 21 23.5 19.5 23.5 17.5V13.5L16 17.25L8.5 13.5Z" 
            fill="url(#gradForgeSpark)" 
            opacity="0.85"
          />

          {/* Forge Spark / Tassel Accent */}
          <path 
            d="M26.5 11.5V17L25 18.5" 
            stroke="url(#gradForgeMetal)" 
            strokeWidth="1.75" 
            strokeLinecap="round" 
          />
        </svg>
      </div>

      {!iconOnly && (
        <span className={textClassName}>
          Grad<span className="text-zinc-600 font-extrabold">Forge</span>
        </span>
      )}
    </div>
  );
}
