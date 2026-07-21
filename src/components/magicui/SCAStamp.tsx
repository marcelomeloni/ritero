"use client";

import { SpinningText } from "@/components/magicui/SpinningText";
import { NumberTicker } from "@/components/magicui/NumberTicker";
import { cn } from "@/lib/utils";

interface SCAStampProps {
  pontuacao: string;
  cor: string;
  corTexto: string;
  className?: string;
}

// Emoji decorativos de sabor — ficarão estáticos ao redor do carimbo
const flavorIcons = [
  { char: "☕", label: "café" },
  { char: "🌸", label: "floral" },
  { char: "🍯", label: "mel" },
  { char: "⭐", label: "qualidade" },
];

export function SCAStamp({ pontuacao, cor, corTexto, className }: SCAStampProps) {
  const numericValue = parseFloat(pontuacao.replace(",", "."));
  const decimalPlaces = pontuacao.includes(".") ? 1 : 0;

  // Texto circular
  const spinText = "• CAFÉ DE ESPECIALIDADE • QUALIDADE MÁXIMA ";

  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      {/* Outer spinning text ring */}
      <div className="absolute">
        <SpinningText
          text={spinText}
          radius={80}
          fontSize={7.5}
          duration={22}
          color={corTexto}
        />
      </div>

      {/* Inner dashed ring */}
      <div
        className="absolute rounded-full border border-dashed"
        style={{
          width: 112,
          height: 112,
          borderColor: corTexto,
          opacity: 0.2,
        }}
      />

      {/* Stamp center */}
      <div
        className="relative z-10 flex flex-col items-center justify-center rounded-full"
        style={{
          width: 104,
          height: 104,
          backgroundColor: `${corTexto}10`,
          border: `2px solid ${corTexto}`,
          backdropFilter: "blur(8px)",
        }}
      >
        {/* SCA label */}
        <span
          className="font-mono text-[9px] font-bold tracking-[0.18em] uppercase"
          style={{ color: corTexto, opacity: 0.65 }}
        >
          SCA
        </span>

        {/* The big score number */}
        <span
          className="font-fraunces leading-none"
          style={{
            fontSize: decimalPlaces > 0 ? 28 : 34,
            fontWeight: 900,
            color: corTexto,
          }}
        >
          <NumberTicker
            value={numericValue}
            decimalPlaces={decimalPlaces}
            duration={1600}
            delay={300}
          />
        </span>

        {/* PONTOS label */}
        <span
          className="mt-0.5 font-mono text-[7px] font-bold tracking-[0.15em] uppercase"
          style={{ color: corTexto, opacity: 0.6 }}
        >
          pontos
        </span>
      </div>

      {/* Flavor emoji icons orbiting at fixed angles */}
      {flavorIcons.map((icon, i) => {
        const angle = (360 / flavorIcons.length) * i - 45;
        const rad = (angle * Math.PI) / 180;
        const r = 80; // orbit radius matches SpinningText
        const x = r * Math.sin(rad);
        const y = -r * Math.cos(rad);
        return (
          <div
            key={icon.label}
            className="absolute flex items-center justify-center"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animation: `orbit-counter 22s linear infinite`,
            }}
            title={icon.label}
          >
            <span className="text-[14px] drop-shadow-sm" style={{ opacity: 0.7 }}>
              {icon.char}
            </span>
          </div>
        );
      })}

      {/* counter-rotation so emojis stay upright while ring spins */}
      <style>{`
        @keyframes orbit-counter {
          from { transform: translate(0px, 0px); }
          to   { transform: translate(0px, 0px); }
        }
      `}</style>
    </div>
  );
}
