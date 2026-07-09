"use client";

import { UserCircle, PencilSimple } from "@phosphor-icons/react/dist/ssr";
import { useAuth } from "@/contexts/AuthContext";

export function ProfileTab() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="rounded-[12px] bg-white p-6 shadow-sm border border-line/60 lg:p-8">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-line/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preto/5 text-preto">
            <UserCircle size={22} weight="light" />
          </div>
          <h2 className="font-fraunces text-[22px] font-semibold text-preto">Meu Perfil</h2>
        </div>
        <button className="flex items-center gap-2 text-terracota font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-terracota/10 px-4 py-2 rounded-full transition-colors">
          <PencilSimple size={16} />
          Editar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cafe/50">Nome Completo</label>
          <div className="font-work text-[15px] font-medium text-preto border-b border-line/40 pb-2">
            {user.nome}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cafe/50">E-mail</label>
          <div className="font-work text-[15px] font-medium text-preto border-b border-line/40 pb-2">
            {user.email}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cafe/50">CPF</label>
          <div className="font-work text-[15px] font-medium text-preto border-b border-line/40 pb-2">
            {user.cpf || "Não informado"}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cafe/50">Telefone</label>
          <div className="font-work text-[15px] font-medium text-preto border-b border-line/40 pb-2">
            {user.telefone || "Não informado"}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2 mt-4">
          <label className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-cafe/50">Senha</label>
          <div className="flex items-center justify-between font-work text-[15px] font-medium text-preto border-b border-line/40 pb-2">
            ••••••••
            <button className="text-cafe/50 hover:text-terracota font-mono text-[10px] uppercase font-bold tracking-widest transition-colors">
              Alterar Senha
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
