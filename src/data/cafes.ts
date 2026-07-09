export interface Cafe {
  id: string;
  slug: string;
  produtor: string;
  notas: string;
  pontuacao?: string;
  variedade: string;
  processo: string;
  regiao: string;
  torra: string;
  peso: string;
  preco: number;
  cor: string;
  corTexto: string;
  imagem?: string;
  ilustracao?: string;
}

export const CAFES: Cafe[] = [
  {
    id: "8578bc84-565a-4f7b-ab47-d71e2f7f774f",
    slug: "fazenda-quilombo",
    produtor: "Fazenda Quilombo",
    notas: "Caramelo, rapadura, mel e floral",
    pontuacao: "86,9",
    variedade: "Arara",
    processo: "Natural",
    regiao: "Canastra",
    torra: "Média",
    peso: "250g",
    preco: 69.90,
    cor: "#FFDB45", // Amarelo
    corTexto: "#231302", // Cafe
    imagem: "/inicio.png",
    ilustracao: "/rapadura.png",
  },
  {
    id: "d8514dbe-2037-4ab4-bf49-b47667337b0d",
    slug: "fazenda-recreio",
    produtor: "Fazenda Recreio",
    notas: "Açúcar mascavo e melaço de cana",
    pontuacao: "85",
    variedade: "Arara",
    processo: "Natural",
    regiao: "Vale da Grama",
    torra: "Média",
    peso: "250g",
    preco: 59.90,
    cor: "#231302", // Marrom
    corTexto: "#FFFBCC", // Creme
    imagem: "/meio.png",
    ilustracao: "/mascavo.png",
  },
  {
    id: "7a55e7df-d0c2-40cd-918e-db85e3d71cd2",
    slug: "sitio-santa-rosa",
    produtor: "Sítio Santa Rosa",
    notas: "Amêndoas de cacau, chocolate e avelã",
    pontuacao: "83",
    variedade: "Catuaí Amarelo",
    processo: "Natural",
    regiao: "Vale da Grama",
    torra: "Média",
    peso: "250g",
    preco: 54.90,
    cor: "#000000", // Preto
    corTexto: "#FFFBCC", // Creme
    imagem: "/fim.png",
    ilustracao: "/amendoas.png",
  },
];
