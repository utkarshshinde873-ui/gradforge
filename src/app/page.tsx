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
  Award
} from "lucide-react";

export default function Home() {
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
            <a href="#templates" className="hover:text-zinc-900 transition-colors py-1">Templates</a>
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
            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-base px-6 py-3.5 rounded-xl border border-slate-300 transition-all duration-300 shadow-2xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <LayoutTemplate className="w-5 h-5 text-slate-500" />
              <span>Explore 5 Templates</span>
            </a>
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
      <section id="tips" className="py-16 md:py-24 bg-white">
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
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-zinc-900 transition-colors">Place Education & Skills High</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  As a recent graduate, your degree, institution, and core tech skills are your strongest assets. Put them right at the top so recruiters notice them instantly.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-zinc-900 transition-colors">Highlight Capstone & Course Projects</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Treat academic or personal projects like real work experience. Detail the technologies used, problems solved, and links to GitHub or live demos.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-zinc-900 transition-colors">Quantify Achievements</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use numbers wherever possible: hackathon placements, leadership roles in campus clubs, scholarship awards, or Dean&apos;s List recognitions.
                </p>
              </div>
            </div>

            <div className="group flex gap-4 p-6 bg-slate-50/80 rounded-2xl border border-slate-200 hover:border-zinc-400 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="bg-zinc-900 text-white p-3 rounded-xl shrink-0 h-fit group-hover:scale-110 group-hover:bg-zinc-800 transition-all duration-300 shadow-2xs">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-zinc-900 transition-colors">Categorize Technical Skills</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Organize your skills logically into categories like Languages, Frameworks, Developer Tools, and Databases so recruiters can scan quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-zinc-900 via-slate-900 to-zinc-900 text-white relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-zinc-700/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Ready to Build Your Winning Resume?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Build your professional resume in minutes with live preview and instant PDF export. 100% free and private.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-zinc-900 hover:bg-slate-100 font-bold text-base px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
          >
            <span>Create My Resume Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-slate-400 py-8 border-t border-zinc-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <GradForgeLogo textClassName="text-base font-bold text-white" />
          <div>
            Built for fresh graduates and students. 100% Client-Side Privacy.
          </div>
          <div>
            &copy; {new Date().getFullYear()} GradForge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
