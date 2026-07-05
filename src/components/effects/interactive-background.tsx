"use client";

import { useEffect, useRef } from "react";

export const InteractiveBackground = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glowElement = glowRef.current;

    if (!glowElement) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      glowElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      glowElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      glowElement.dataset.active = "true";
    };

    const handlePointerLeave = () => {
      glowElement.dataset.active = "false";
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(135deg,rgba(15,23,42,0.04),transparent_45%)] dark:bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.26),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)] dark:bg-[linear-gradient(rgba(147,197,253,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.08)_1px,transparent_1px)]" />
      <div
        ref={glowRef}
        data-active="false"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 data-[active=true]:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(37, 99, 235, 0.28), transparent 58%)",
        }}
      />
    </div>
  );
};
