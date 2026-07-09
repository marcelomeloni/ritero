"use client";

import { useState } from "react";
import { MapPin, Plus, Trash, PencilSimple, X } from "@phosphor-icons/react/dist/ssr";
import { useUser, Address } from "@/contexts/UserContext";

export function AddressesTab() {
  const { savedAddresses, removeAddress, addAddress, updateAddress, loadingAddresses } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Form states
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const resetForm = () => {
    setEditingAddressId(null);
    setCep("");
    setRua("");
    setBairro("");
    setCidade("");
    setNumero("");
    setComplemento("");
    setIsDefault(false);
  };

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setEditingAddressId(address.id);
      setCep(address.cep);
      setRua(address.rua);
      setBairro(address.bairro);
      setCidade(`${address.cidade} - ${address.estado}`);
      setNumero(address.numero);
      setComplemento(address.complemento || "");
      setIsDefault(address.is_default);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 8) value = value.slice(0, 8);
    
    // Máscara 00000-000
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    
    setCep(value);

    const rawCep = value.replace("-", "");
    if (rawCep.length === 8) {
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
    }
  };

  const handleSave = () => {
    if (!cep || !rua || !numero) return;

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

    if (editingAddressId) {
      updateAddress(editingAddressId, newAddr, isDefault);
    } else {
      addAddress(newAddr, isDefault);
    }
    
    handleCloseModal();
  };

  return (
    <>
      <div className="rounded-[12px] bg-white p-6 shadow-sm border border-line/60 lg:p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preto/5 text-preto">
            <MapPin size={22} weight="light" />
          </div>
          <h2 className="font-fraunces text-[22px] font-semibold text-preto">Meus Endereços</h2>
        </div>

        {loadingAddresses ? (
          <div className="flex items-center justify-center py-12 w-full text-cafe/70 font-work">Carregando endereços...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {savedAddresses.map((address) => (
              <div key={address.id} className="relative flex flex-col rounded-[12px] border border-line/40 bg-[#FDFBF7] p-6 transition-all hover:border-preto/30 hover:shadow-sm">
                {address.is_default && (
                  <span className="absolute top-6 right-6 font-mono text-[9px] font-bold uppercase tracking-widest text-terracota bg-terracota/10 px-2.5 py-1 rounded-full">
                    Padrão
                  </span>
                )}
              
              <h3 className="font-fraunces text-[18px] font-semibold text-preto mb-4">{address.rua}, {address.numero}</h3>
              
              <div className="flex flex-col gap-1 font-work text-[14px] text-cafe/80 leading-relaxed mb-6">
                <span>{address.bairro} {address.complemento && `- ${address.complemento}`}</span>
                <span>{address.cidade} - {address.estado}</span>
                <span>CEP: {address.cep}</span>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-line/40">
                <button 
                  onClick={() => handleOpenModal(address)}
                  className="flex items-center gap-2 text-cafe/60 hover:text-preto font-mono text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  <PencilSimple size={14} /> Editar
                </button>
                <button 
                  onClick={() => removeAddress(address.id)}
                  className="flex items-center gap-2 text-cafe/60 hover:text-red-600 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  <Trash size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}

            {/* Adicionar Novo */}
            <button 
              onClick={handleOpenModal}
              className="flex flex-col items-center justify-center gap-4 rounded-[12px] border-2 border-dashed border-line/60 bg-transparent p-6 transition-all hover:border-terracota/50 hover:bg-terracota/5 group min-h-[200px]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-line/40 text-cafe/50 group-hover:bg-terracota group-hover:text-white transition-colors">
                <Plus size={24} weight="bold" />
              </div>
              <span className="font-mono text-[12px] font-bold uppercase tracking-widest text-cafe/70 group-hover:text-terracota transition-colors">
                Adicionar Endereço
              </span>
            </button>
          </div>
        )}
      </div>

      {/* MODAL ADICIONAR ENDEREÇO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
          <div className="bg-[#FDFBF7] rounded-[12px] w-full max-w-2xl p-6 md:p-8 shadow-xl animate-fade-in relative border border-line/60 max-h-[90vh] overflow-y-auto custom-scroll">
            
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-cafe/50 hover:text-preto transition-colors"
            >
              <X size={20} weight="bold" />
            </button>

            <h3 className="font-fraunces text-[24px] font-semibold text-preto mb-6">
              {editingAddressId ? "Editar Endereço" : "Novo Endereço"}
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
              
              <div className="sm:col-span-2 mb-2">
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
              
              <div className="sm:col-span-6 flex items-center gap-3 mt-4 mb-2 cursor-pointer" onClick={() => setIsDefault(!isDefault)}>
                <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors ${isDefault ? 'bg-preto border-preto' : 'bg-white border-line/80'}`}>
                  {isDefault && <div className="w-2.5 h-2.5 bg-white rounded-[1px]" />}
                </div>
                <span className="font-work text-[14px] text-preto cursor-pointer select-none">
                  Definir como meu endereço padrão
                </span>
              </div>

              <div className="sm:col-span-6 mt-4">
                <button
                  onClick={handleSave}
                  disabled={!cep || !rua || !numero}
                  className="w-full rounded-[6px] bg-preto px-8 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.05em] text-white transition-all hover:bg-terracota disabled:opacity-50 disabled:hover:bg-preto"
                >
                  Salvar Endereço
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
