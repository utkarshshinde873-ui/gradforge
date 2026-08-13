"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GradForgeLogo } from "@/components/icons/GradForgeLogo";
import { 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  GraduationCap, 
  LayoutTemplate, 
  Briefcase,
  ArrowRight,
  Code2,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function Home() {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleToggleTemplates = () => {
    setShowTemplates(prev => !prev);
    if (!showTemplates) {
      setTimeout(() => {
        const el = document.getElementById("templates");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/">
            <GradForgeLogo />
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-zinc-900 transition-colors py-1">Features</a>
            <button 
              type="button"
              onClick={handleToggleTemplates} 
              className="hover:text-zinc-900 transition-colors py-1 flex items-center gap-1 cursor-pointer"
            >
              <span>Templates</span>
              {showTemplates ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <a href="#tips" className="hover:text-zinc-900 transition-colors py-1">Student Tips</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/builder" 
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all duration-300 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Build My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-50 border-b border-slate-200 overflow-hidden">
        {/* Metallic Subtle Background Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-zinc-200/40 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="animate-fade-in-up text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Craft an ATS-Friendly Resume That <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-slate-700 to-zinc-800">Gets You Hired</span>
          </h1>

          <p className="animate-fade-in-up-delay-2 mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stand out to recruiters with clean, metallic-styled professional resumes tailored for entry-level roles. Fill in your education, projects, and skills with real-time preview and export crisp PDFs instantly—100% free and stored privately in your browser.
          </p>

          <div className="animate-fade-in-up-delay-2 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-base px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-zinc-900/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              <FileText className="w-5 h-5" />
              <span>Start Building Now</span>
            </Link>
            <button
              type="button"
              onClick={handleToggleTemplates}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold text-base px-6 py-3.5 rounded-xl border transition-all duration-300 shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                showTemplates
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
              }`}
            >
              <LayoutTemplate className="w-5 h-5" />
              <span>{showTemplates ? "Hide Templates" : "Explore 4 Templates"}</span>
              {showTemplates ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
            </button>
          </div>

          <div className="animate-fade-in-up-delay-2 mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No Sign-Up Required</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Private Local Storage</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>ATS-Optimized Formatting</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant A4 PDF Export</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Everything You Need to Showcase Your Potential
            </h2>
            <p className="mt-3 text-slate-600">
              Built with essential features tailored to highlight academic achievements, internships, and course projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-slate-50/80 p-7 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-zinc-400 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-zinc-900 transition-colors">Live Side-by-Side Editor</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Watch your resume render in real-time as you type. Instant visual feedback ensures flawless layout, alignment, and formatting.
              </p>
            </div>

            <div className="group bg-slate-50/80 p-7 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-zinc-400 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-zinc-900 transition-colors">Project & Skill Focus</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Fresh grads often lack extensive work history. Highlight academic capstones, technologies, certifications, and achievements cleanly.
              </p>
            </div>

            <div className="group bg-slate-50/80 p-7 rounded-2xl border border-slate-200 transition-all duration-300 hover:border-zinc-400 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-zinc-900 transition-colors">Private & Local Storage</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Your personal details never leave your web browser. Resume data automatically saves locally so you can return anytime to edit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Resume Tips */}
      <section id="tips" className="py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Fresh Graduate Resume Tips
            </h2>
            <p className="mt-2 text-slate-600">
              How to present your academic background effectively when you don&apos;t have years of experience yet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Lead With Education</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Place your degree, GPA, and graduation year near the top. Include relevant coursework that demonstrates key competencies.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Highlight Course Capstones</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Treat academic capstones, hackathons, and open-source contributions as real work experience with bullet points and outcomes.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Categorize Technical Skills</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Group your skills into Languages, Frameworks, Tools, and Databases so recruiters can scan your technical stack instantly.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Keep It to One Page</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  For fresh graduates, a concise 1-page ATS layout is preferred by top engineering and corporate hiring managers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditionally Rendered Templates Tab Section (AT THE VERY BOTTOM OF THE PAGE) */}
      {showTemplates && (
        <section id="templates" className="py-16 md:py-24 bg-slate-100/80 border-t border-b border-slate-200 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                4 ATS-Friendly Resume Templates
              </h2>
              <p className="mt-3 text-slate-600">
                Switch between templates with a single click without re-entering any data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Modern Template Card */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="bg-zinc-900 text-white p-3.5 border-b border-zinc-800 flex items-center justify-between">
                  <span className="font-bold text-xs">1. Modern</span>
                  <span className="text-[10px] bg-zinc-700 text-white px-2 py-0.5 rounded-full font-medium">Popular</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[1/1.2] bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 font-sans text-[9px] text-slate-500 overflow-hidden space-y-1.5 group-hover:border-zinc-400 transition-colors">
                      <div className="h-3.5 bg-zinc-900 text-white font-bold p-1 rounded-xs text-[8px] flex items-center">JOHN DOE</div>
                      <div className="h-1.5 bg-slate-200 rounded w-2/3"></div>
                      <div className="border-b border-slate-300 pt-1 font-bold text-zinc-900 text-[7px]">SKILLS</div>
                      <div className="flex gap-1">
                        <div className="h-2 bg-zinc-200 rounded w-8"></div>
                        <div className="h-2 bg-zinc-200 rounded w-10"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Clean Metallic</h4>
                    <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                      Sleek slate accents and skill pills. Ideal for tech, product, and design roles.
                    </p>
                  </div>
                  <Link
                    href="/builder?template=modern"
                    className="w-full text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-xs"
                  >
                    Use Modern
                  </Link>
                </div>
              </div>

              {/* Professional Template Card */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="bg-zinc-900 text-white p-3.5 border-b border-zinc-800 flex items-center justify-between">
                  <span className="font-bold text-xs">2. Professional</span>
                  <span className="text-[10px] bg-zinc-700 text-white px-2 py-0.5 rounded-full font-medium">Classic</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[1/1.2] bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 font-serif text-[9px] text-slate-500 overflow-hidden space-y-1.5 text-center group-hover:border-zinc-400 transition-colors">
                      <div className="font-bold text-slate-900 text-[10px]">JANE SMITH</div>
                      <div className="text-[7px] text-slate-500">CS Graduate</div>
                      <div className="border-t border-b border-slate-300 py-0.5 text-left font-bold text-slate-800 text-[7px]">SKILLS</div>
                      <div className="h-1.5 bg-slate-300 rounded w-full"></div>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Corporate Serif</h4>
                    <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                      Timeless centered header. Perfect for finance, consulting, and enterprise roles.
                    </p>
                  </div>
                  <Link
                    href="/builder?template=professional"
                    className="w-full text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-xs"
                  >
                    Use Professional
                  </Link>
                </div>
              </div>

              {/* Minimal Template Card */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="bg-zinc-900 text-white p-3.5 border-b border-zinc-800 flex items-center justify-between">
                  <span className="font-bold text-xs">3. Minimal</span>
                  <span className="text-[10px] bg-zinc-700 text-white px-2 py-0.5 rounded-full font-medium">Sleek</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[1/1.2] bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 font-sans text-[9px] text-slate-500 overflow-hidden space-y-1.5 group-hover:border-zinc-400 transition-colors">
                      <div className="font-bold text-slate-900 text-[10px] uppercase">ALEX RIVERA</div>
                      <div className="pt-1 font-bold text-slate-900 text-[7px]">SKILLS</div>
                      <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Ultra Minimal</h4>
                    <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                      High readability typography and wide margins for creative startups.
                    </p>
                  </div>
                  <Link
                    href="/builder?template=minimal"
                    className="w-full text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-xs"
                  >
                    Use Minimal
                  </Link>
                </div>
              </div>

              {/* Executive Template Card */}
              <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="bg-zinc-900 text-white p-3.5 border-b border-zinc-800 flex items-center justify-between">
                  <span className="font-bold text-xs">4. Executive</span>
                  <span className="text-[10px] bg-zinc-700 text-white px-2 py-0.5 rounded-full font-medium">Formal</span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[1/1.2] bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 font-serif text-[9px] text-slate-500 overflow-hidden space-y-1.5 group-hover:border-zinc-400 transition-colors">
                      <div className="font-extrabold text-slate-900 text-[10px] uppercase border-b-2 border-slate-900 pb-1">MORGAN LEE</div>
                      <div className="font-bold text-slate-900 text-[7px] border-b border-slate-900">EXECUTIVE SUMMARY</div>
                      <div className="h-1.5 bg-slate-300 rounded w-full"></div>
                    </div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-1">Formal Executive</h4>
                    <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
                      Heavy double border header and structured two-column skills grid.
                    </p>
                  </div>
                  <Link
                    href="/builder?template=executive"
                    className="w-full text-center bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold py-2 rounded-lg transition-all shadow-xs"
                  >
                    Use Executive
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-zinc-950 text-slate-400 py-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <GradForgeLogo />
            <span className="text-xs text-slate-500">
              © {new Date().getFullYear()} GradForge. Built for fresh graduates.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-400">
            <Link href="/builder" className="hover:text-white transition-colors">Resume Builder</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <button type="button" onClick={handleToggleTemplates} className="hover:text-white transition-colors cursor-pointer">Templates</button>
            <a href="#tips" className="hover:text-white transition-colors">Tips</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
