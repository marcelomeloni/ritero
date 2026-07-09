import { api } from "./api";
import { Address } from "@/contexts/UserContext";

export async function fetchEnderecos(): Promise<Address[]> {
  return await api<Address[]>("/public/enderecos");
}

export async function addEndereco(data: Partial<Address>): Promise<Address> {
  return await api<Address>("/public/enderecos", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function removeEndereco(id: string): Promise<void> {
  return await api<void>(`/public/enderecos/${id}`, {
    method: "DELETE",
  });
}

export async function updateEndereco(id: string, data: Partial<Address>): Promise<Address> {
  return await api<Address>(`/public/enderecos/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
