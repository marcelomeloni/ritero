// SpinningText: Texto circular que gira lentamente ao redor de um centro
"use client";

import { cn } from "@/lib/utils";

interface SpinningTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
  duration?: number;
  className?: string;
  color?: string;
}

export function SpinningText({
  text,
  radius = 52,
  fontSize = 9,
  duration = 12,
  className,
  color = "currentColor",
}: SpinningTextProps) {
  const characters = text.split("");
  const angleStep = 360 / characters.length;

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: radius * 2,
        height: radius * 2,
        animation: `spin ${duration}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      {characters.map((char, i) => {
        const angle = angleStep * i;
        const radian = (angle * Math.PI) / 180;
        const x = radius + radius * Math.sin(radian);
        const y = radius - radius * Math.cos(radian);
        return (
          <span
            key={i}
            className="absolute font-mono font-bold tracking-widest uppercase leading-none"
            style={{
              fontSize,
              color,
              left: x,
              top: y,
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transformOrigin: "center center",
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
