"use client";

import { useState, useEffect } from "react";
import { useUser, Address } from "@/contexts/UserContext";
import { useCart } from "@/contexts/CartContext";
import { CheckCircle, MapPin, Plus, Spinner } from "@phosphor-icons/react/dist/ssr";

interface ShippingStepProps {
  setShippingCost: (cost: number | null) => void;
  setAddressId: (id: string | null) => void;
}

export function ShippingStep({ setShippingCost, setAddressId }: ShippingStepProps) {
  const { savedAddresses, addAddress, loadingAddresses } = useUser();
  const { items } = useCart();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isCalculatingFrete, setIsCalculatingFrete] = useState(false);

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  // Auto-seleciona o primeiro endereço se houver, no mount
  useEffect(() => {
    if (loadingAddresses) return;
    
    if (savedAddresses.length > 0 && !selectedAddressId && !isAddingNew) {
      const defaultAddr = savedAddresses.find(a => a.is_default) || savedAddresses[0];
      handleSelectSavedAddress(defaultAddr);
    } else if (savedAddresses.length === 0) {
      setIsAddingNew(true);
    }
  }, [savedAddresses, loadingAddresses, selectedAddressId, isAddingNew]);

  const calculateFrete = async (destinoCep: string) => {
    setIsCalculatingFrete(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
      const res = await fetch(`${API_URL}/public/frete/calcular`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cepDestino: destinoCep,
          items: items.map(i => ({ id: i.id, quantidade: i.quantidade, preco: i.preco, peso_gramas: i.peso_gramas }))
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const validOptions = data.filter((o: any) => !o.error);
          if (validOptions.length > 0) {
            const lowestPrice = Math.min(...validOptions.map((o: any) => parseFloat(o.custom_price || o.price)));
            setShippingCost(lowestPrice);
          } else {
            setShippingCost(15.90);
          }
        } else {
           setShippingCost(15.90);
        }
      }
    } catch (e) {
      console.error(e);
      setShippingCost(15.90);
    } finally {
      setIsCalculatingFrete(false);
    }
  };

  const handleSelectSavedAddress = (addr: Address) => {
    setSelectedAddressId(addr.id);
    setAddressId(addr.id);
    setIsAddingNew(false);
    calculateFrete(addr.cep);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 8) value = value.slice(0, 8);
    
    // Máscara 00000-000
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    
    setCep(value);

    // Se tem 8 dígitos (sem contar o traço), busca o endereço
    const rawCep = value.replace("-", "");
    if (rawCep.length === 8) {
      calculateFrete(rawCep);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setRua(data.logradouro || "");
          setBairro(data.bairro || "");
          setCidade(`${data.localidade} - ${data.uf}`);
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    } else {
      setShippingCost(null);
    }
  };

  const handleSaveNewAddress = () => {
    if (!cep || !rua || !numero) return; // Validação básica

    const parts = cidade.split(" - ");
    const cityName = parts[0] || cidade;
    const stateName = parts[1] || "";

    const newAddr = {
      rua,
      numero,
      complemento: complemento.trim(),
      bairro,
      cidade: cityName,
      estado: stateName,
      cep
    };

    addAddress(newAddr, true); // Adiciona e seta como default
    setIsAddingNew(false);
  };

  return (
    <section className="mt-4 border-t border-line/60 pt-10 lg:mt-6 lg:pt-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-terracota font-mono text-[13px] font-bold text-white">
            2
          </span>
          <h2 className="font-fraunces text-[24px] font-semibold text-preto">
            Endereço de Entrega
          </h2>
        </div>
        {isCalculatingFrete && (
          <div className="flex items-center gap-2 text-cafe/50 font-mono text-[11px] uppercase tracking-widest font-bold animate-fade-in">
            <Spinner size={16} className="animate-spin" />
            Calculando Frete...
          </div>
        )}
      </div>

      {!isAddingNew && savedAddresses.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedAddresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;
              return (
                <div 
                  key={addr.id}
                  onClick={() => handleSelectSavedAddress(addr)}
                  className={`
                    relative flex items-start gap-4 p-5 rounded-[8px] border cursor-pointer transition-all
                    ${isSelected ? "border-preto bg-[#FDFBF7]" : "border-line/40 bg-white hover:border-preto/30"}
                  `}
                >
                  <div className="pt-1 text-terracota">
                    {isSelected ? <CheckCircle size={20} weight="fill" /> : <MapPin size={20} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-fraunces font-semibold text-preto text-[16px]">{addr.rua}, {addr.numero}</span>
                    <span className="font-work text-cafe/80 text-[13px] mt-1">{addr.bairro} {addr.complemento && `- ${addr.complemento}`}</span>
                    <span className="font-work text-cafe/80 text-[13px]">{addr.cidade} - {addr.estado}</span>
                    <span className="font-mono text-cafe/50 text-[11px] font-bold mt-2">CEP {addr.cep}</span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button 
            onClick={() => {
              setIsAddingNew(true);
              setSelectedAddressId(null);
            }}
            className="flex items-center justify-center gap-2 rounded-[8px] border-2 border-dashed border-line/60 py-4 font-mono text-[12px] font-bold uppercase tracking-widest text-cafe/70 transition-all hover:border-terracota/50 hover:bg-terracota/5 hover:text-terracota mt-2"
          >
            <Plus size={16} weight="bold" />
            Entregar em outro endereço
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 animate-fade-in">
          <div className="sm:col-span-6 flex justify-between items-center mb-2">
            <span className="font-fraunces text-[18px] text-preto">Adicionar Novo Endereço</span>
            {savedAddresses.length > 0 && (
              <button 
                onClick={() => setIsAddingNew(false)}
                className="text-terracota font-mono text-[10px] uppercase font-bold tracking-widest hover:underline"
              >
                Cancelar
              </button>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              CEP
            </label>
            <input
              type="text"
              placeholder="00000-000"
              value={cep}
              onChange={handleCepChange}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              Rua / Avenida
            </label>
            <input
              type="text"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              Número
            </label>
            <input
              type="text"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              Complemento <span className="text-cafe/40 font-normal">(opcional)</span>
            </label>
            <input
              type="text"
              placeholder="Apto, Bloco, Casa..."
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              Bairro
            </label>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="mb-1.5 block font-work text-[13px] font-medium text-cafe/80">
              Cidade
            </label>
            <input
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              className="w-full rounded-[6px] border border-line/80 bg-white px-4 py-3 font-work text-[15px] outline-none transition-all focus:border-terracota focus:ring-2 focus:ring-terracota/10"
            />
          </div>
          
          <div className="sm:col-span-6 mt-2">
            <button
              onClick={handleSaveNewAddress}
              disabled={!cep || !rua || !numero}
              className="w-full sm:w-auto rounded-[6px] bg-preto px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-white transition-all hover:bg-terracota disabled:opacity-50 disabled:hover:bg-preto"
            >
              Confirmar & Salvar Endereço
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
