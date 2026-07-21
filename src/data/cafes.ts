export interface Cafe {
  id: string;
  slug: string;
  produtor: string;
  notas: string;
  variedade: string;
  processo: string;
  regiao: string;
  torra: string;
  pontuacao: string; // SCA score — 1:1 with the café, now fixed
  cor: string;
  corTexto: string;
  imagem?: string;
  ilustracao?: string;
  ogImage?: string;
  precos: { "250g": number; "1kg": number }; // Preços fixos por peso
}

export type PesoOpcao = "250g" | "1kg";

export const CAFES: Cafe[] = [
  {
    id: "8578bc84-565a-4f7b-ab47-d71e2f7f774f",
    slug: "caramelo-e-rapadura",
    produtor: "Fazenda Quilombo",
    notas: "Caramelo, rapadura, mel e floral",
    variedade: "Arara",
    processo: "Natural",
    regiao: "Canastra",
    torra: "Média",
    pontuacao: "86.9",
    precos: { "250g": 62.00, "1kg": 189.00 },
    cor: "#FFDB45", // Amarelo
    corTexto: "#231302", // Cafe
    imagem: "/inicio.png",
    ilustracao: "/rapadura.png",
    ogImage: "/ograpadura.png",
  },
  {
    id: "d8514dbe-2037-4ab4-bf49-b47667337b0d",
    slug: "acucar-mascavo",
    produtor: "Fazenda Recreio",
    notas: "Açúcar mascavo e melaço de cana",
    variedade: "Arara",
    processo: "Natural",
    regiao: "Vale da Grama",
    torra: "Média",
    pontuacao: "85",
    precos: { "250g": 53.00, "1kg": 161.00 },
    cor: "#231302", // Marrom
    corTexto: "#FFFBCC", // Creme
    imagem: "/meio.png",
    ilustracao: "/mascavo.png",
    ogImage: "/ogmascavo.png",
  },
  {
    id: "7a55e7df-d0c2-40cd-918e-db85e3d71cd2",
    slug: "chocolate-e-avela",
    produtor: "Sítio Santa Rosa",
    notas: "Amêndoas de cacau, chocolate e avelã",
    variedade: "Catuaí Amarelo",
    processo: "Natural",
    regiao: "Vale da Grama",
    torra: "Média",
    pontuacao: "83",
    precos: { "250g": 47.60, "1kg": 139.40 },
    cor: "#000000", // Preto
    corTexto: "#FFFBCC", // Creme
    imagem: "/fim.png",
    ilustracao: "/amendoas.png",
    ogImage: "/ogchocolate.png",
  },
];
