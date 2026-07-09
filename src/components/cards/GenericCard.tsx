import React from "react";
import { CardProps } from "./types";

export function GenericCard({ number, name, expiry, cvv, isFlipped }: CardProps) {
  const displayCardNumber = number || "•••• •••• •••• ••••";
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
        {/* FRENTE */}
        <div
          className="absolute inset-0 rounded-[16px] p-6 text-white overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-tr from-[#231302] to-[#4A2E15]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

          <div className="flex justify-between items-start mb-8">
            <div className="w-11 h-8 rounded-[4px] bg-gradient-to-br from-[#E2E2E2] to-[#B0B0B0] opacity-90 relative overflow-hidden shadow-sm border border-white/20">
               <div className="absolute top-2 left-0 w-full h-[1px] bg-black/20"></div>
               <div className="absolute bottom-2 left-0 w-full h-[1px] bg-black/20"></div>
               <div className="absolute top-0 left-1/2 w-[1px] h-full bg-black/20"></div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-5 z-10">
            <div className="font-mono text-[18px] sm:text-[20px] tracking-[0.12em] text-white/95 drop-shadow-sm">
              {displayCardNumber}
            </div>
            
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="font-work text-[9px] uppercase tracking-wider text-white/50 mb-1">Titular</span>
                <span className="font-mono text-[13px] uppercase tracking-widest text-white/95 truncate max-w-[180px]">
                  {displayCardName}
                </span>
              </div>
              
              <div className="flex flex-col items-end">
                <span className="font-work text-[9px] uppercase tracking-wider text-white/50 mb-1">Validade</span>
                <span className="font-mono text-[13px] tracking-widest text-white/95">
                  {displayExpiry}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div
          className="absolute inset-0 rounded-[16px] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] text-white bg-gradient-to-br from-[#1A0E01] to-[#231302]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="w-full h-12 bg-[#161016] mt-6" />
          
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-9 rounded bg-white/20" style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 7px)" }}></div>
              <div className="bg-white text-preto font-mono text-[13px] font-bold px-3 py-1.5 rounded min-w-[50px] text-center tracking-widest">
                {displayCvv}
              </div>
            </div>

            <p className="text-[8px] leading-[1.4] opacity-50 max-w-[240px] font-work">
              Este cartão é propriedade da instituição financeira emissora. Uso exclusivo do titular. Em caso de perda ou roubo, entre em contato imediatamente.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
