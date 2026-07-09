import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Tem dúvidas sobre nossos cafés ou quer revender Ritero na sua cafeteria? Entre em contato conosco.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
