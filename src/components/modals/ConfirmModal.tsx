"use client";

import { X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 animate-fade-in">
      <div 
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-[400px] rounded-[12px] bg-[#FDFBF7] p-8 shadow-2xl relative border border-line/60 outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-cafe/50 hover:text-preto transition-colors"
          aria-label="Fechar"
        >
          <X size={20} weight="bold" />
        </button>

        <h3 id="confirm-modal-title" className="font-fraunces text-[22px] font-bold text-preto mb-3">
          {title}
        </h3>
        
        <p className="font-work text-[14px] text-cafe/70 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-[8px] border border-line/60 bg-white px-4 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-cafe/60 transition-all hover:border-preto/30 hover:text-preto disabled:opacity-50"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-[8px] bg-terracota px-4 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-all hover:bg-[#B34500] active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
          >
            {isLoading ? "Aguarde..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
