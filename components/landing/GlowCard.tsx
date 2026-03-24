"use client";

import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [gradient, setGradient] = useState("transparent");

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradient(
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(5,150,105,0.12), transparent 70%)`
    );
  }

  function handleMouseLeave() {
    setGradient("transparent");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ background: gradient }}
      />
      {children}
    </div>
  );
}
