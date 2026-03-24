"use client";

import { useRef, useEffect, useState } from "react";

interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export function NumberTicker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1500,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();

          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - t, 3);
            const current = eased * value;
            setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);
            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(`${prefix}${value.toFixed(decimals)}${suffix}`);
            }
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
