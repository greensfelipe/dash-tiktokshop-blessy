"use client";

import { useEffect } from "react";

export function useKeyboardNav(
  sections: string[],
  active: string,
  onNavigate: (id: string) => void
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      const idx = sections.indexOf(active);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        onNavigate(sections[Math.min(idx + 1, sections.length - 1)]);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        onNavigate(sections[Math.max(idx - 1, 0)]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [sections, active, onNavigate]);
}
