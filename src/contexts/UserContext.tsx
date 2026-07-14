"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

import { fetchEnderecos, addEndereco as addEnderecoApi, removeEndereco as removeEnderecoApi, updateEndereco as updateEnderecoApi } from "@/services/enderecoService";
import { useAuth } from "@/contexts/AuthContext";

export interface Address {
  id: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
  is_default: boolean;
}

interface UserContextData {
  savedAddresses: Address[];
  addAddress: (address: Omit<Address, "id" | "is_default">, makeDefault?: boolean) => Promise<void>;
  updateAddress: (id: string, address: Omit<Address, "id" | "is_default">, makeDefault?: boolean) => Promise<void>;
  removeAddress: (id: string) => Promise<void>;
  loadingAddresses: boolean;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const load = async () => {
      if (authLoading) return;
      if (!user) {
        setSavedAddresses([]);
        setLoadingAddresses(false);
        return;
      }
      try {
        setLoadingAddresses(true);
        const data = await fetchEnderecos();
        setSavedAddresses(data);
      } catch (err) {
        console.error("Erro ao carregar endereços", err);
      } finally {
        setLoadingAddresses(false);
      }
    };
    load();
  }, [user, authLoading]);

  const addAddress = async (newAddress: Omit<Address, "id" | "is_default">, makeDefault = true) => {
    try {
      const added = await addEnderecoApi({
        ...newAddress,
        is_default: makeDefault,
      });
      // Recarrega para pegar o estado mais recente (incluindo is_default falsos nos outros)
      const data = await fetchEnderecos();
      setSavedAddresses(data);
    } catch (err) {
      console.error("Erro ao adicionar endereço", err);
    }
  };

  const removeAddress = async (id: string) => {
    try {
      await removeEnderecoApi(id);
      setSavedAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("Erro ao remover endereço", err);
    }
  };

  const updateAddress = async (id: string, updatedAddress: Omit<Address, "id" | "is_default">, makeDefault = true) => {
    try {
      await updateEnderecoApi(id, {
        ...updatedAddress,
        is_default: makeDefault,
      });
      // Recarrega para pegar o estado mais recente
      const data = await fetchEnderecos();
      setSavedAddresses(data);
    } catch (err) {
      console.error("Erro ao atualizar endereço", err);
    }
  };

  return (
    <UserContext.Provider value={{ savedAddresses, addAddress, removeAddress, updateAddress, loadingAddresses }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
