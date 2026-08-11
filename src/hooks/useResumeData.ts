"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { 
  ResumeData, 
  TemplateType,
  AccentColor,
  SectionVisibility,
  defaultSectionVisibility,
  SectionId,
  defaultSectionOrder,
  initialEmptyResume, 
  sampleResume
} from "@/types/resume";
import { formatTitleCase, formatSentenceCase } from "@/utils/formatText";

const STORAGE_KEY = "gradforge_resume_data_v1";
const TEMPLATE_KEY = "gradforge_resume_template_v1";
const ACCENT_KEY = "gradforge_resume_accent_v1";
const VISIBILITY_KEY = "gradforge_section_visibility_v1";
const ORDER_KEY = "gradforge_section_order_v1";

const MAX_HISTORY = 50;

export interface ResumeSnapshot {
  resumeData: ResumeData;
  template: TemplateType;
  accentColor: AccentColor;
  sectionVisibility: SectionVisibility;
  sectionOrder: SectionId[];
}

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialEmptyResume);
  const [template, setTemplate] = useState<TemplateType>("modern");
  const [accentColor, setAccentColor] = useState<AccentColor>("charcoal");
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(defaultSectionVisibility);
  const [sectionOrder, setSectionOrder] = useState<SectionId[]>(defaultSectionOrder);
  const [isLoaded, setIsLoaded] = useState(false);

  // Undo / Redo History Stack State
  const historyRef = useRef<ResumeSnapshot[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isUndoingRedoingRef = useRef<boolean>(false);

  // Helper to update canUndo/canRedo state flags for UI buttons
  const updateUndoRedoFlags = useCallback(() => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  }, []);

  // Push snapshot to history stack
  const pushSnapshot = useCallback((snapshot: ResumeSnapshot, isDebounced = false) => {
    if (isUndoingRedoingRef.current) return;

    const executePush = () => {
      const history = historyRef.current;
      const index = historyIndexRef.current;

      // Check if snapshot is identical to current history point to prevent duplicate states
      if (index >= 0) {
        const current = history[index];
        if (JSON.stringify(current) === JSON.stringify(snapshot)) {
          return;
        }
      }

      // Slice history to drop any future Redo states if user performs a new edit after Undo
      const newHistory = history.slice(0, index + 1);
      newHistory.push(snapshot);

      // Limit history stack size to MAX_HISTORY (50 states)
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      historyRef.current = newHistory;
      historyIndexRef.current = newHistory.length - 1;
      updateUndoRedoFlags();
    };

    if (isDebounced) {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => {
        executePush();
      }, 500);
    } else {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      executePush();
    }
  }, [updateUndoRedoFlags]);

  // Load saved state from localStorage on mount & initialize initial history snapshot
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedTemplate = localStorage.getItem(TEMPLATE_KEY) as TemplateType;
      const savedAccent = localStorage.getItem(ACCENT_KEY) as AccentColor;
      const savedVisibility = localStorage.getItem(VISIBILITY_KEY);
      const savedOrder = localStorage.getItem(ORDER_KEY);
      
      let initialData = initialEmptyResume;
      let initialTpl = "modern" as TemplateType;
      let initialAcc = "charcoal" as AccentColor;
      let initialVis = defaultSectionVisibility;
      let initialOrd = defaultSectionOrder;

      if (savedData) {
        const parsed = JSON.parse(savedData);
        initialData = {
          ...initialEmptyResume,
          ...parsed,
          personalInfo: { ...initialEmptyResume.personalInfo, ...(parsed.personalInfo || {}) }
        };
      }
      if (savedTemplate && ["modern", "professional", "minimal", "executive", "creative"].includes(savedTemplate)) {
        initialTpl = savedTemplate;
      }
      if (savedAccent && ["charcoal", "blue", "red", "emerald", "purple"].includes(savedAccent)) {
        initialAcc = savedAccent;
      }
      if (savedVisibility) {
        initialVis = JSON.parse(savedVisibility);
      }
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder) as SectionId[];
        if (Array.isArray(parsedOrder) && parsedOrder.length > 0) {
          initialOrd = parsedOrder;
        }
      }

      setResumeData(initialData);
      setTemplate(initialTpl);
      setAccentColor(initialAcc);
      setSectionVisibility(initialVis);
      setSectionOrder(initialOrd);

      // Seed history with initial state
      const initialSnapshot: ResumeSnapshot = {
        resumeData: initialData,
        template: initialTpl,
        accentColor: initialAcc,
        sectionVisibility: initialVis,
        sectionOrder: initialOrd,
      };
      historyRef.current = [initialSnapshot];
      historyIndexRef.current = 0;
      setCanUndo(false);
      setCanRedo(false);
    } catch (e) {
      console.error("Failed to load resume data from local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync state changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
      localStorage.setItem(TEMPLATE_KEY, template);
      localStorage.setItem(ACCENT_KEY, accentColor);
      localStorage.setItem(VISIBILITY_KEY, JSON.stringify(sectionVisibility));
      localStorage.setItem(ORDER_KEY, JSON.stringify(sectionOrder));
    } catch (e) {
      console.error("Failed to save state to local storage", e);
    }
  }, [resumeData, template, accentColor, sectionVisibility, sectionOrder, isLoaded]);

  // Undo Function
  const undo = useCallback(() => {
    if (historyIndexRef.current <= 0) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    isUndoingRedoingRef.current = true;
    const newIndex = historyIndexRef.current - 1;
    const targetSnapshot = historyRef.current[newIndex];

    if (targetSnapshot) {
      setResumeData(targetSnapshot.resumeData);
      setTemplate(targetSnapshot.template);
      setAccentColor(targetSnapshot.accentColor);
      setSectionVisibility(targetSnapshot.sectionVisibility);
      setSectionOrder(targetSnapshot.sectionOrder);

      historyIndexRef.current = newIndex;
      updateUndoRedoFlags();
    }

    setTimeout(() => {
      isUndoingRedoingRef.current = false;
    }, 50);
  }, [updateUndoRedoFlags]);

  // Redo Function
  const redo = useCallback(() => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    isUndoingRedoingRef.current = true;
    const newIndex = historyIndexRef.current + 1;
    const targetSnapshot = historyRef.current[newIndex];

    if (targetSnapshot) {
      setResumeData(targetSnapshot.resumeData);
      setTemplate(targetSnapshot.template);
      setAccentColor(targetSnapshot.accentColor);
      setSectionVisibility(targetSnapshot.sectionVisibility);
      setSectionOrder(targetSnapshot.sectionOrder);

      historyIndexRef.current = newIndex;
      updateUndoRedoFlags();
    }

    setTimeout(() => {
      isUndoingRedoingRef.current = false;
    }, 50);
  }, [updateUndoRedoFlags]);

  // Global Keyboard Shortcuts Listener (⌘Z / Ctrl+Z for Undo, ⌘⇧Z / Ctrl+Shift+Z / Ctrl+Y for Redo)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not trigger global undo/redo if user is focusing an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (!isMac && isCmdOrCtrl && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  // Wrapped State Modifiers that push snapshots to history:

  // 1. Template Change (Immediate History Push)
  const changeTemplate = useCallback((newTemplate: TemplateType) => {
    setTemplate(newTemplate);
    pushSnapshot({
      resumeData,
      template: newTemplate,
      accentColor,
      sectionVisibility,
      sectionOrder,
    }, false);
  }, [resumeData, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 2. Accent Color Change (Immediate History Push)
  const changeAccentColor = useCallback((newAccent: AccentColor) => {
    setAccentColor(newAccent);
    pushSnapshot({
      resumeData,
      template,
      accentColor: newAccent,
      sectionVisibility,
      sectionOrder,
    }, false);
  }, [resumeData, template, sectionVisibility, sectionOrder, pushSnapshot]);

  // 3. Toggle Section Inclusion (Immediate History Push)
  const toggleSectionVisibility = useCallback((key: keyof SectionVisibility) => {
    setSectionVisibility(prev => {
      const next = { ...prev, [key]: !prev[key] };
      pushSnapshot({
        resumeData,
        template,
        accentColor,
        sectionVisibility: next,
        sectionOrder,
      }, false);
      return next;
    });
  }, [resumeData, template, accentColor, sectionOrder, pushSnapshot]);

  // 4. Move Section Up (Immediate History Push)
  const moveSectionUp = useCallback((sectionId: SectionId) => {
    setSectionOrder(prev => {
      const index = prev.indexOf(sectionId);
      if (index <= 0) return prev;
      const newOrder = [...prev];
      const temp = newOrder[index - 1];
      newOrder[index - 1] = newOrder[index];
      newOrder[index] = temp;
      
      pushSnapshot({
        resumeData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder: newOrder,
      }, false);

      return newOrder;
    });
  }, [resumeData, template, accentColor, sectionVisibility, pushSnapshot]);

  // 5. Move Section Down (Immediate History Push)
  const moveSectionDown = useCallback((sectionId: SectionId) => {
    setSectionOrder(prev => {
      const index = prev.indexOf(sectionId);
      if (index < 0 || index >= prev.length - 1) return prev;
      const newOrder = [...prev];
      const temp = newOrder[index + 1];
      newOrder[index + 1] = newOrder[index];
      newOrder[index] = temp;

      pushSnapshot({
        resumeData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder: newOrder,
      }, false);

      return newOrder;
    });
  }, [resumeData, template, accentColor, sectionVisibility, pushSnapshot]);

  // 6. Personal Info Update (Debounced History Push for typing)
  const updatePersonalInfo = useCallback((field: keyof ResumeData["personalInfo"], value: string) => {
    setResumeData(prev => {
      const nextData = {
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value
        }
      };
      pushSnapshot({
        resumeData: nextData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, true);
      return nextData;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 7. Summary Update (Debounced History Push for typing)
  const updateSummary = useCallback((summary: string) => {
    setResumeData(prev => {
      const nextData = { ...prev, summary };
      pushSnapshot({
        resumeData: nextData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, true);
      return nextData;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 8. Add Array Item (Immediate History Push)
  const addArrayItem = useCallback(<K extends keyof Pick<ResumeData, "education" | "experience" | "skills" | "projects" | "certifications" | "achievements">>(
    key: K,
    newItem: ResumeData[K][number]
  ) => {
    setResumeData(prev => {
      const nextData = {
        ...prev,
        [key]: [...(prev[key] as unknown as Array<typeof newItem>), newItem]
      };
      pushSnapshot({
        resumeData: nextData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, false);
      return nextData;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 9. Update Array Item (Debounced History Push for typing inside array fields)
  const updateArrayItem = useCallback(<K extends keyof Pick<ResumeData, "education" | "experience" | "skills" | "projects" | "certifications" | "achievements">>(
    key: K,
    id: string,
    updatedFields: Partial<ResumeData[K][number]>
  ) => {
    setResumeData(prev => {
      const nextData = {
        ...prev,
        [key]: (prev[key] as unknown as Array<{ id: string }>).map(item =>
          item.id === id ? { ...item, ...updatedFields } : item
        )
      };
      pushSnapshot({
        resumeData: nextData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, true);
      return nextData;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 10. Remove Array Item (Immediate History Push)
  const removeArrayItem = useCallback(<K extends keyof Pick<ResumeData, "education" | "experience" | "skills" | "projects" | "certifications" | "achievements">>(
    key: K,
    id: string
  ) => {
    setResumeData(prev => {
      const nextData = {
        ...prev,
        [key]: (prev[key] as unknown as Array<{ id: string }>).filter(item => item.id !== id)
      };
      pushSnapshot({
        resumeData: nextData,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, false);
      return nextData;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 11. Load Sample (Immediate History Push)
  const loadSample = useCallback(() => {
    const nextData = sampleResume;
    const nextVis = defaultSectionVisibility;
    const nextOrd = defaultSectionOrder;
    setResumeData(nextData);
    setSectionVisibility(nextVis);
    setSectionOrder(nextOrd);
    pushSnapshot({
      resumeData: nextData,
      template,
      accentColor,
      sectionVisibility: nextVis,
      sectionOrder: nextOrd,
    }, false);
  }, [template, accentColor, pushSnapshot]);

  // 12. Clear Data (Immediate History Push)
  const clearData = useCallback(() => {
    const nextData = initialEmptyResume;
    setResumeData(nextData);
    pushSnapshot({
      resumeData: nextData,
      template,
      accentColor,
      sectionVisibility,
      sectionOrder,
    }, false);
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 13. AI Direct Set Data (Immediate History Push)
  const updateFullResume = useCallback((nextData: ResumeData) => {
    setResumeData(nextData);
    pushSnapshot({
      resumeData: nextData,
      template,
      accentColor,
      sectionVisibility,
      sectionOrder,
    }, false);
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  // 14. Auto-Format All Resume Text (Title Case & Sentence Case)
  const autoFormatAllText = useCallback(() => {
    setResumeData(prev => {
      const formatted: ResumeData = {
        personalInfo: {
          fullName: formatTitleCase(prev.personalInfo.fullName),
          title: formatTitleCase(prev.personalInfo.title),
          email: prev.personalInfo.email.toLowerCase().trim(),
          phone: prev.personalInfo.phone.trim(),
          location: formatTitleCase(prev.personalInfo.location),
          linkedin: prev.personalInfo.linkedin.trim(),
          github: prev.personalInfo.github.trim(),
          portfolio: prev.personalInfo.portfolio.trim(),
        },
        summary: formatSentenceCase(prev.summary),
        education: prev.education.map(e => ({
          ...e,
          institution: formatTitleCase(e.institution),
          degree: formatTitleCase(e.degree),
          fieldOfStudy: formatTitleCase(e.fieldOfStudy),
        })),
        experience: prev.experience.map(exp => ({
          ...exp,
          position: formatTitleCase(exp.position),
          company: formatTitleCase(exp.company),
          description: formatSentenceCase(exp.description),
        })),
        skills: prev.skills.map(s => ({
          ...s,
          name: formatTitleCase(s.name),
          category: formatTitleCase(s.category || "General"),
        })),
        projects: prev.projects.map(p => ({
          ...p,
          title: formatTitleCase(p.title),
          technologies: formatTitleCase(p.technologies || ""),
          description: formatSentenceCase(p.description),
        })),
        certifications: prev.certifications.map(c => ({
          ...c,
          title: formatTitleCase(c.title),
          issuer: formatTitleCase(c.issuer),
        })),
        achievements: prev.achievements.map(a => ({
          ...a,
          title: formatTitleCase(a.title),
          description: formatSentenceCase(a.description),
        })),
      };

      pushSnapshot({
        resumeData: formatted,
        template,
        accentColor,
        sectionVisibility,
        sectionOrder,
      }, false);

      return formatted;
    });
  }, [template, accentColor, sectionVisibility, sectionOrder, pushSnapshot]);

  return {
    resumeData,
    setResumeData: updateFullResume,
    template,
    setTemplate: changeTemplate,
    accentColor,
    setAccentColor: changeAccentColor,
    sectionVisibility,
    setSectionVisibility,
    toggleSectionVisibility,
    sectionOrder,
    setSectionOrder,
    moveSectionUp,
    moveSectionDown,
    isLoaded,
    updatePersonalInfo,
    updateSummary,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    loadSample,
    clearData,
    undo,
    redo,
    canUndo,
    canRedo,
    autoFormatAllText,
  };
}
