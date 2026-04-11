"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedWordProps {
  words: string[];
  intervalMs?: number;
}

export function AnimatedWord({ words, intervalMs = 4000 }: AnimatedWordProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycle = () => {
      setPhase("out");
      timerRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setPhase("in");
      }, 600);
    };
    const interval = setInterval(cycle, intervalMs);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words.length, intervalMs]);

  return (
    <span className="relative inline-block pb-2">
      <span
        className="inline-block text-transparent bg-clip-text"
        style={{
          backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #d4af37 50%, #fbbf24 100%)",
          opacity: phase === "in" ? 1 : 0,
          transform: phase === "in" ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {words[index]}
      </span>
      <span
        className="absolute left-0 bottom-0 h-[4px] rounded-full"
        style={{
          background: "linear-gradient(90deg, #fbbf24, #d4af37)",
          width: phase === "in" ? "100%" : "0%",
          transition: phase === "in" ? `width ${intervalMs - 600}ms linear` : "none",
        }}
      />
    </span>
  );
}
