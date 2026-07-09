import { api } from "./api";

export interface PedidoItem {
  id: string;
  id_pedido: string;
  id_variante_cafe: string;
  quantidade: number;
  preco_unitario: number;
  variante_cafe: {
    id: string;
    peso_gramas: number;
    cafe: {
      id: string;
      nome: string;
      cor: string;
      imagem_url: string;
    };
  };
}

export interface Endereco {
  id: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  complemento: string;
}

export interface Pedido {
  id: string;
  id_cliente: string;
  id_endereco_entrega: string;
  id_cupom: string | null;
  valor_pedidos: number;
  valor_total: number;
  valor_frete: number;
  valor_desconto: number;
  status: string;
  codigo_rastreio: string | null;
  url_rastreio: string | null;
  data_criacao: string;
  endereco: Endereco;
  item_pedido: PedidoItem[];
}

export async function fetchMeusPedidos(): Promise<Pedido[]> {
  return await api<Pedido[]>("/public/pedidos");
}
