import { api } from "./api";

export interface Favorito {
  data_adicionado: string;
  cafe: {
    id: string;
    nome: string;
    cor: string;
    imagem_url: string;
    ativo: boolean;
    variante_cafe: { preco: number }[];
  };
}

export async function fetchFavoritos(): Promise<Favorito[]> {
  return await api<Favorito[]>("/public/favoritos");
}

export async function addFavorito(id_cafe: string): Promise<void> {
  return await api<void>("/public/favoritos", {
    method: "POST",
    body: JSON.stringify({ id_cafe }),
  });
}

export async function removeFavorito(id_cafe: string): Promise<void> {
  return await api<void>(`/public/favoritos/${id_cafe}`, {
    method: "DELETE",
  });
}
