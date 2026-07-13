"use client";

import { useEffect, useRef } from "react";
import { useScrollContext, type SectionId } from "@/context/scroll-context";

/*
  page.tsx renders:
    <main id="main">            ← slot 0: we treat entire <main> as the pool
      <section>...</section>    ← hero (no id) → assigned id="main" at runtime
      <section id="install">   ← InstallPanel
      <section id="community">
      <section id="faq">
    </main>

  Strategy:
  - Render children inside a hidden div
  - After mount, find the <main> element
  - Give the first child section id="main" if missing
  - Extract each section by id into sectionNodes map
  - Run 2-slot animation using DOM node moves
*/

const SECTION_IDS: SectionId[] = ["main", "install", "features", "community", "faq"];

const isSectionId = (value: string): value is SectionId =>
  (SECTION_IDS as string[]).includes(value);

const TRANSITION_MS = 650;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

export const PanelContainer = ({ children }: { children: React.ReactNode }) => {
  const poolRef = useRef<HTMLDivElement>(null);
  const activeSlotRef = useRef<HTMLDivElement>(null);
  const pendingSlotRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const sectionNodes = useRef<Map<SectionId, HTMLElement>>(new Map());
  const { registerTransition, commitTransition, navigate } = useScrollContext();

  useEffect(() => {
    const pool = poolRef.current;
    const activeSlot = activeSlotRef.current;
    const pendingSlot = pendingSlotRef.current;
    if (!pool || !activeSlot || !pendingSlot) return;

    // Find the <main> element rendered by page.tsx
    const mainEl = pool.querySelector("main");
    if (!(mainEl instanceof HTMLElement)) return;

    // Collect direct child sections of <main>
    const childSections = Array.from(mainEl.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );

    // Assign ids to sections that match SECTION_IDS order
    // Hero section has no id — give it "main"
    childSections.forEach((el) => {
      if (!el.id && sectionNodes.current.size === 0) {
        el.id = "main";
      }
    });

    // Map each section id → node
    SECTION_IDS.forEach((id) => {
      const el = mainEl.querySelector(`#${id}`);
      if (el instanceof HTMLElement) {
        // Remove sr-only so hidden sections are still renderable
        el.classList.remove("sr-only");
        sectionNodes.current.set(id, el);
      }
    });

    // Move initial "main" section into active slot
    const initialNode = sectionNodes.current.get("main");
    if (initialNode) {
      activeSlot.appendChild(initialNode);
    }

    const transition = (to: SectionId) => {
      if (isAnimatingRef.current) return;

      const currentNode = activeSlot.firstElementChild as HTMLElement | null;
      const currentId = currentNode?.id as SectionId | undefined;
      if (!currentId || currentId === to) return;

      const nextNode = sectionNodes.current.get(to);
      if (!nextNode) return;

      isAnimatingRef.current = true;

      // Position pending slot below viewport, disable transition for reset
      pendingSlot.style.transition = "none";
      pendingSlot.style.transform = "translateY(100%)";
      pendingSlot.appendChild(nextNode);

      // Force reflow before enabling transition
      void pendingSlot.offsetHeight;

      // Slide active up, pending up from below — simultaneously
      activeSlot.style.transition = `transform ${TRANSITION_MS}ms ${EASING}`;
      pendingSlot.style.transition = `transform ${TRANSITION_MS}ms ${EASING}`;
      activeSlot.style.transform = "translateY(-100%)";
      pendingSlot.style.transform = "translateY(0%)";

      setTimeout(() => {
        // Return outgoing node to pool
        if (currentNode) pool.appendChild(currentNode);

        // Reset active slot transform instantly
        activeSlot.style.transition = "none";
        activeSlot.style.transform = "";

        // Move arrived node from pending → active slot
        const arrivedNode = pendingSlot.firstElementChild as HTMLElement | null;
        if (arrivedNode) activeSlot.appendChild(arrivedNode);

        // Reset pending slot below viewport
        pendingSlot.style.transition = "none";
        pendingSlot.style.transform = "translateY(100%)";

        isAnimatingRef.current = false;
        commitTransition(to);
      }, TRANSITION_MS);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;
      const id = href.slice(1);
      if (!isSectionId(id)) return;
      event.preventDefault();
      navigate(id);
    };

    registerTransition(transition);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      registerTransition(null);
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [registerTransition, commitTransition, navigate]);

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Pool: hidden render target for page.tsx children */}
      <div ref={poolRef} className="hidden">
        {children}
      </div>

      {/* Active slot: visible panel */}
      <div ref={activeSlotRef} className="absolute inset-0 overflow-y-auto" />

      {/* Pending slot: incoming panel, positioned below */}
      <div
        ref={pendingSlotRef}
        className="absolute inset-0 overflow-y-auto translate-y-full"
      />
    </div>
  );
};
