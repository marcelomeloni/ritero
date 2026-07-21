// NumberTicker: Conta rapidamente até chegar no número alvo
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  decimalPlaces?: number;
  duration?: number; // in ms
  className?: string;
  delay?: number; // in ms
}

export function NumberTicker({
  value,
  decimalPlaces = 0,
  duration = 1800,
  className,
  delay = 400,
}: NumberTickerProps) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startRef.current === null) startRef.current = timestamp;
        const elapsed = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo for premium feel
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(parseFloat((eased * value).toFixed(decimalPlaces)));
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplay(value);
        }
      };
      frameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [value, duration, delay, decimalPlaces]);

  return (
    <span className={cn("tabular-nums", className)}>
      {display.toFixed(decimalPlaces)}
    </span>
  );
}
