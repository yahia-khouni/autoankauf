"use client";

import { ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number; // kept for API compatibility, unused
}

export function MagneticButton({ children }: MagneticButtonProps) {
  return (
    <div
      className="inline-block transition-transform duration-300 ease-out hover:scale-105 active:scale-[0.98]"
      style={{
        filter: "drop-shadow(0 0 0px rgba(251,191,36,0))",
        transition:
          "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), filter 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.filter =
          "drop-shadow(0 6px 24px rgba(251,191,36,0.55))";
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.filter =
          "drop-shadow(0 0 0px rgba(251,191,36,0))";
        (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
      }}
    >
      {children}
    </div>
  );
}
