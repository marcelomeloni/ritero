// OrbitingCircles: Pequenos ícones/elementos orbitando ao redor de um centro
"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface OrbitConfig {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: { icon: ReactNode; startAngle?: number }[];
  iconSize?: number;
}

interface OrbitingCirclesProps {
  orbits: OrbitConfig[];
  centerContent?: ReactNode;
  size?: number;
  className?: string;
}

export function OrbitingCircles({
  orbits,
  centerContent,
  size = 240,
  className,
}: OrbitingCirclesProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Dashed orbital rings */}
      {orbits.map((orbit, oi) => (
        <div
          key={`ring-${oi}`}
          className="absolute rounded-full border border-dashed"
          style={{
            width: orbit.radius * 2,
            height: orbit.radius * 2,
            borderColor: "currentColor",
            opacity: 0.12,
          }}
        />
      ))}

      {/* Center content */}
      {centerContent && (
        <div className="relative z-10 flex items-center justify-center">
          {centerContent}
        </div>
      )}

      {/* Orbiting items */}
      {orbits.map((orbit, oi) =>
        orbit.items.map((item, ii) => {
          const totalItems = orbit.items.length;
          const baseAngle = item.startAngle ?? (360 / totalItems) * ii;
          const uniqueKey = `orbit-${oi}-item-${ii}`;
          const iconSize = orbit.iconSize ?? 28;
          const animName = `orbit-${oi}-${orbit.reverse ? "rev" : "fwd"}`;

          return (
            <div
              key={uniqueKey}
              className="absolute"
              style={{
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                animation: `${animName} ${orbit.duration}s linear infinite`,
                left: "50%",
                top: "50%",
                marginLeft: -orbit.radius,
                marginTop: -orbit.radius,
              }}
            >
              <style>{`
                @keyframes ${animName} {
                  from { transform: rotate(${orbit.reverse ? 360 : 0}deg); }
                  to   { transform: rotate(${orbit.reverse ? 0 : 360}deg); }
                }
              `}</style>
              <div
                className="absolute"
                style={{
                  width: iconSize,
                  height: iconSize,
                  left: "50%",
                  top: 0,
                  marginLeft: -iconSize / 2,
                  marginTop: -iconSize / 2,
                  transform: `rotate(${baseAngle}deg) translateY(-${orbit.radius}px) rotate(-${baseAngle}deg)`,
                  animation: `counter-${animName} ${orbit.duration}s linear infinite`,
                }}
              >
                <style>{`
                  @keyframes counter-${animName} {
                    from { transform: rotate(${orbit.reverse ? 360 : 0}deg) translateY(-${orbit.radius}px) rotate(-${baseAngle}deg); }
                    to   { transform: rotate(${orbit.reverse ? 0 : 360}deg) translateY(-${orbit.radius}px) rotate(-${baseAngle + (orbit.reverse ? -360 : 360)}deg); }
                  }
                `}</style>
                <div className="flex h-full w-full items-center justify-center">
                  {item.icon}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
