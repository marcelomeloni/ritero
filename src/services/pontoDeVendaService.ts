import { api } from "./api";

export interface PontoDeVenda {
  id: string;
  nome: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  lat: number;
  long: number;
}

export async function fetchPontosDeVenda(): Promise<PontoDeVenda[]> {
  return await api<PontoDeVenda[]>("/public/pontos-de-venda");
}
