"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function ContactStep() {
  const { user } = useAuth();
  
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setCpf(user.cpf || "");
      setPhone(user.telefone || "");
      
      if (user.nome) {
        const parts = user.nome.split(" ");
        setNome(parts[0]);
        setSobrenome(parts.slice(1).join(" "));
      }
    }
  }, [user]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica máscara 000.000.000-00
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }
    setCpf(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 11) value = value.slice(0, 11);

    // Aplica máscara (00) 00000-0000
    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,5})/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/(\d{1,2})/, "($1");
    }
    setPhone(value);
  };

  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota font-mono text-[13px] font-bold text-white">
          1
        </span>
        <h2 className="font-fraunces text-[24px] font-semibold text-preto">
          Seus Dados
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
          />
        </div>
        
        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
          />
        </div>
        
        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Sobrenome
          </label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            CPF
          </label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={handleCpfChange}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
          />
        </div>
        
        <div>
          <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
            Celular (WhatsApp)
          </label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
            className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
          />
        </div>
      </div>
    </section>
  );
}
