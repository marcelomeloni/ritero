import React from "react";
import Image from "next/image";
import { CardProps } from "./types";

const SAN_RED_LIGHT = "#E4002B";
const SAN_RED = "#B3001F";
const SAN_RED_DARK = "#6E0015";
const SAN_RED_DEEPEST = "#38000B";
const SAN_FLAME = "#EC0000";

export function SantanderCard({ number, name, expiry, cvv, isFlipped }: CardProps) {
  const displayCardNumber = number || "5155 4402 8871 3396";
  const displayCardName = name || "NOME DO TITULAR";
  const displayExpiry = expiry || "MM/AA";
  const displayCvv = cvv || "•••";

  return (
    <div style={{ perspective: 1400 }} className="w-full max-w-[340px] mx-auto aspect-[1.586] mb-2 cursor-pointer">
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <CardFront number={displayCardNumber} name={displayCardName} expiry={displayExpiry} />
        <CardBack cvv={displayCvv} />
      </div>
    </div>
  );
}

function CardFront({ number, name, expiry }: { number: string; name: string; expiry: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        background: `linear-gradient(135deg, ${SAN_RED_LIGHT} 0%, ${SAN_RED} 45%, ${SAN_RED_DARK} 85%, ${SAN_RED_DEEPEST} 100%)`,
        backfaceVisibility: "hidden",
        overflow: "hidden",
        boxShadow: "0 30px 60px -20px rgba(110,0,21,0.55), 0 4px 12px rgba(0,0,0,0.15)",
        color: "#fff",
      }}
      className="font-work"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 85% -10%, rgba(255,255,255,0.16) 0%, transparent 45%), radial-gradient(circle at -10% 110%, rgba(0,0,0,0.3) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", padding: "24px 26px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <SantanderLogo />
          <ContactlessIcon />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ChipIcon />
          <div
            style={{
              fontSize: "clamp(16px, 5.5vw, 22px)",
              letterSpacing: 2.5,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
              fontFamily: "monospace"
            }}
          >
            {number}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 9, letterSpacing: 1, opacity: 0.7 }}>TITULAR</span>
            <span style={{ fontSize: 13, letterSpacing: 1, fontWeight: 600, textTransform: "uppercase" }} className="truncate max-w-[140px]">{name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <span style={{ fontSize: 9, letterSpacing: 1, opacity: 0.7 }}>VALIDADE</span>
            <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: "tabular-nums", fontFamily: "monospace" }}>{expiry}</span>
          </div>
          <MastercardMark />
        </div>
      </div>
    </div>
  );
}

function CardBack({ cvv }: { cvv: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        background: `linear-gradient(160deg, ${SAN_RED_DEEPEST} 0%, ${SAN_RED_DARK} 100%)`,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        overflow: "hidden",
        boxShadow: "0 30px 60px -20px rgba(110,0,21,0.55), 0 4px 12px rgba(0,0,0,0.15)",
        color: "#fff",
      }}
      className="font-work"
    >
      <div style={{ height: 46, background: "#160505", marginTop: 26 }} />

      <div style={{ padding: "16px 26px", display: "flex", flexDirection: "column", gap: 14, height: "calc(100% - 72px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              flex: 1,
              height: 36,
              borderRadius: 4,
              background:
                "repeating-linear-gradient(45deg, rgba(255,255,255,0.85) 0px, rgba(255,255,255,0.85) 3px, rgba(255,255,255,0.55) 3px, rgba(255,255,255,0.55) 7px)",
            }}
          />
          <div
            style={{
              background: "#fff",
              color: "#6E0015",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "8px 14px",
              borderRadius: 5,
              fontVariantNumeric: "tabular-nums",
              minWidth: 52,
              textAlign: "center",
              fontFamily: "monospace"
            }}
          >
            {cvv}
          </div>
        </div>

        <p style={{ fontSize: 9, lineHeight: 1.4, opacity: 0.65, margin: 0, maxWidth: 260 }}>
          Este cartão é propriedade do banco emissor. Uso exclusivo do
          titular. Em caso de perda ou roubo, entre em contato imediatamente
          pela central de atendimento.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <SantanderLogo small />
          <MastercardMark />
        </div>
      </div>
    </div>
  );
}

function SantanderLogo({ small }: { small?: boolean }) {
  return (
    <div style={{ position: "relative", width: small ? 70 : 100, height: small ? 20 : 28 }}>
      <Image
        src="/santander.webp"
        alt="Santander Logo"
        fill
        className="object-contain object-left"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}

function ChipIcon() {
  return (
    <svg width="42" height="32" viewBox="0 0 42 32" fill="none">
      <rect x="0.5" y="0.5" width="41" height="31" rx="6" fill="url(#chipGradientSan)" stroke="rgba(0,0,0,0.15)" />
      <line x1="14" y1="0" x2="14" y2="32" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="28" y1="0" x2="28" y2="32" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0" y1="11" x2="42" y2="11" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0" y1="21" x2="42" y2="21" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <rect x="14" y="11" width="14" height="10" rx="2" fill="rgba(0,0,0,0.12)" />
      <defs>
        <linearGradient id="chipGradientSan" x1="0" y1="0" x2="42" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F3D98B" />
          <stop offset="1" stopColor="#C9A24B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ContactlessIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transform: "rotate(90deg)", opacity: 0.9 }}>
      <path d="M8 4C10.5 6.5 12 9 12 12C12 15 10.5 17.5 8 20" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
      <path d="M5 7C7 9 8 10.5 8 12C8 13.5 7 15 5 17" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
      <path d="M11 1C14.5 4.5 16.5 8 16.5 12C16.5 16 14.5 19.5 11 23" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
      <circle cx="13" cy="11" r="11" fill="#EB001B" opacity="0.9" />
      <circle cx="21" cy="11" r="11" fill="#F79E1B" opacity="0.9" />
      <path d="M17 3.5A11 11 0 0 1 17 18.5A11 11 0 0 1 17 3.5Z" fill="#FF5F00" opacity="0.85" />
    </svg>
  );
}
