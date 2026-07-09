import { useState } from "react";

/**
 * ─────────────────────────────────────────────────────────────
 *  TOKENS DE DESIGN — Itaú
 * ─────────────────────────────────────────────────────────────
 * Itaú é a marca brasileira que mais brinca com o contraste
 * laranja/azul. Em vez de dividir o cartão ao meio (o que fica
 * datado), uso o azul profundo como base e o laranja como uma
 * "luz" entrando por um canto — o mesmo princípio de contraste,
 * só que com mais elegância num objeto pequeno como um cartão.
 */
const ITAU_BLUE_LIGHT = "#0D3E9E";
const ITAU_BLUE = "#00227B";
const ITAU_BLUE_DARK = "#001548";
const ITAU_BLUE_DEEPEST = "#000A28";
const ITAU_ORANGE = "#FF7A00";

export default function ItauCardFlip() {
  const [flipped, setFlipped] = useState(false);
  const [number] = useState("5458 3617 2290 4471");
  const [name] = useState("RAFAEL M COSTA");
  const [expiry] = useState("06/29");
  const [cvv] = useState("624");

  return (
    <div
      style={{
        minHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        padding: "40px 16px",
        background: "radial-gradient(circle at 50% 0%, #eef1fb 0%, #e6e8ee 60%, #dfe1e6 100%)",
        fontFamily: "'Inter', system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ── CARTÃO ── */}
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{ perspective: 1400, width: 360, height: 224, cursor: "pointer" }}
        role="button"
        aria-label="Virar cartão"
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <CardFront number={number} name={name} expiry={expiry} />
          <CardBack cvv={cvv} />
        </div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        style={{
          padding: "10px 20px",
          borderRadius: 999,
          border: "none",
          background: ITAU_ORANGE,
          color: "#fff",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 6px 16px -6px rgba(255,122,0,0.5)",
        }}
      >
        {flipped ? "Ver frente" : "Ver o verso (CVV)"}
      </button>

      <p style={{ fontSize: 11, color: "#93989f", maxWidth: 320, textAlign: "center", margin: 0 }}>
        Clique no cartão ou no botão para virar. Isso é uma recriação
        estilizada — não usa nenhum ativo oficial do Itaú.
      </p>
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 *  FRENTE DO CARTÃO
 * ─────────────────────────────────────────────────────────────
 */
function CardFront({ number, name, expiry }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        background: `linear-gradient(135deg, ${ITAU_BLUE_LIGHT} 0%, ${ITAU_BLUE} 45%, ${ITAU_BLUE_DARK} 85%, ${ITAU_BLUE_DEEPEST} 100%)`,
        backfaceVisibility: "hidden",
        overflow: "hidden",
        boxShadow: "0 30px 60px -20px rgba(0,21,72,0.55), 0 4px 12px rgba(0,0,0,0.15)",
        color: "#fff",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* "luz" laranja entrando por um canto — o único accent forte */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${ITAU_ORANGE} 0%, transparent 70%)`,
          opacity: 0.55,
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at -10% 110%, rgba(0,0,0,0.32) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", padding: "24px 26px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        {/* topo: logo + contactless */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <ItauLogo />
          <ContactlessIcon />
        </div>

        {/* meio: chip + número */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <ChipIcon />
          <div
            style={{
              fontSize: 23,
              letterSpacing: 2.5,
              fontWeight: 500,
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            {number}
          </div>
        </div>

        {/* base: nome, validade, bandeira */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 9, letterSpacing: 1, opacity: 0.7 }}>TITULAR</span>
            <span style={{ fontSize: 14, letterSpacing: 1, fontWeight: 600 }}>{name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
            <span style={{ fontSize: 9, letterSpacing: 1, opacity: 0.7 }}>VALIDADE</span>
            <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{expiry}</span>
          </div>
          <MastercardMark />
        </div>
      </div>
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────
 *  VERSO DO CARTÃO
 * ─────────────────────────────────────────────────────────────
 */
function CardBack({ cvv }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 22,
        background: `linear-gradient(160deg, ${ITAU_BLUE_DEEPEST} 0%, ${ITAU_BLUE_DARK} 100%)`,
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        overflow: "hidden",
        boxShadow: "0 30px 60px -20px rgba(0,21,72,0.55), 0 4px 12px rgba(0,0,0,0.15)",
        color: "#fff",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
      }}
    >
      {/* tarja magnética */}
      <div style={{ height: 46, background: "#050810", marginTop: 26 }} />

      <div style={{ padding: "20px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* faixa de assinatura + CVV */}
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
              color: "#001548",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              padding: "8px 14px",
              borderRadius: 5,
              fontVariantNumeric: "tabular-nums",
              minWidth: 52,
              textAlign: "center",
            }}
          >
            {cvv}
          </div>
        </div>

        <p style={{ fontSize: 9, lineHeight: 1.5, opacity: 0.65, margin: 0, maxWidth: 260 }}>
          Este cartão é propriedade do banco emissor. Uso exclusivo do
          titular. Em caso de perda ou roubo, entre em contato imediatamente
          pela central de atendimento.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
          <ItauLogo small />
          <MastercardMark />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── ícones/marcas em SVG puro ───────────────────────── */

function ItauLogo({ small }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: small ? 18 : 24,
          height: small ? 18 : 24,
          borderRadius: "50%",
          background: ITAU_ORANGE,
        }}
      />
      <span
        style={{
          fontSize: small ? 14 : 18,
          fontWeight: 700,
          letterSpacing: 0.5,
          lineHeight: 1,
        }}
      >
        itaú
      </span>
    </div>
  );
}

function ChipIcon() {
  return (
    <svg width="42" height="32" viewBox="0 0 42 32" fill="none">
      <rect x="0.5" y="0.5" width="41" height="31" rx="6" fill="url(#chipGradientItau)" stroke="rgba(0,0,0,0.15)" />
      <line x1="14" y1="0" x2="14" y2="32" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="28" y1="0" x2="28" y2="32" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0" y1="11" x2="42" y2="11" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <line x1="0" y1="21" x2="42" y2="21" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <rect x="14" y="11" width="14" height="10" rx="2" fill="rgba(0,0,0,0.12)" />
      <defs>
        <linearGradient id="chipGradientItau" x1="0" y1="0" x2="42" y2="32" gradientUnits="userSpaceOnUse">
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
