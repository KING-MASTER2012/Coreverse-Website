"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

export type SectionId = "main" | "install" | "features" | "community" | "faq";

type TransitionFn = (to: SectionId) => void;

type ScrollContextValue = {
  activeSection: SectionId;
  navigate: (to: SectionId) => void;
  registerTransition: (fn: TransitionFn | null) => void;
  commitTransition: (to: SectionId) => void;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const useScrollContext = (): ScrollContextValue => {
  const ctx = useContext(ScrollContext);
  if (ctx === null) throw new Error("useScrollContext must be used inside ScrollProvider");
  return ctx;
};

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState<SectionId>("main");
  const transitionRef = useRef<TransitionFn | null>(null);

  const registerTransition = useCallback((fn: TransitionFn | null) => {
    transitionRef.current = fn;
  }, []);

  const navigate = useCallback((to: SectionId) => {
    transitionRef.current?.(to);
  }, []);

  const commitTransition = useCallback((to: SectionId) => {
    setActiveSection(to);
  }, []);

  return (
    <ScrollContext.Provider value={{ activeSection, navigate, registerTransition, commitTransition }}>
      {children}
    </ScrollContext.Provider>
  );
};
