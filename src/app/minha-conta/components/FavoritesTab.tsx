"use client";

import { Heart, ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchFavoritos, removeFavorito, Favorito } from "@/services/favoritoService";
import { CAFES } from "@/data/cafes";

export function FavoritesTab() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavoritos();
  }, []);

  const loadFavoritos = async () => {
    try {
      setLoading(true);
      const data = await fetchFavoritos();
      setFavoritos(data);
    } catch (err) {
      console.error("Erro ao buscar favoritos", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id_cafe: string) => {
    try {
      await removeFavorito(id_cafe);
      setFavoritos((prev) => prev.filter((fav) => fav.cafe.id !== id_cafe));
    } catch (err) {
      console.error("Erro ao remover favorito", err);
    }
  };

  return (
    <div className="rounded-[12px] bg-white p-6 shadow-sm border border-line/60 lg:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-preto/5 text-terracota">
          <Heart size={22} weight="fill" />
        </div>
        <h2 className="font-fraunces text-[22px] font-semibold text-preto">Meus Favoritos</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 w-full text-cafe/70 font-work">Carregando favoritos...</div>
      ) : favoritos.length === 0 ? (
        <div className="text-center py-12 font-work text-cafe/70">
          Você ainda não favoritou nenhum café.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {favoritos.map((fav) => {
            const product = fav.cafe;
            const price = product.variante_cafe?.[0]?.preco || 0;
            // Busca os dados estáticos do café para ter o slug, ilustrações, e subtítulo corretos
            const staticCafe = CAFES.find(c => c.id === product.id);
            const slug = staticCafe?.slug || product.id;
            const title = product.nome; // Nome real do banco (ex: Fazenda Quilombo)
            const subtitle = staticCafe?.notas || "Café Especial"; // Notas sensoriais como subtítulo
            const image = staticCafe?.ilustracao || product.imagem_url || "/rapadura.png";
            
            return (
              <div key={product.id} className="group flex flex-col rounded-[12px] border border-line/40 bg-[#FDFBF7] p-4 transition-all hover:border-terracota/30 hover:shadow-md relative">
                
                <div 
                  className="relative flex h-[180px] w-full items-center justify-center rounded-[8px] mb-4"
                  style={{ backgroundColor: product.cor || "#f3f4f6" }}
                >
                  <button onClick={() => handleRemove(product.id)} className="absolute top-3 right-3 text-terracota hover:scale-110 transition-transform z-10 bg-white/10 rounded-full p-1 backdrop-blur-sm">
                    <Heart size={20} weight="fill" />
                  </button>
                  <Link href={`/cafes/${slug}`} className="absolute inset-0 z-0">
                    <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4 drop-shadow-md transition-transform duration-500 group-hover:scale-105" />
                  </Link>
                </div>

                <Link href={`/cafes/${slug}`} className="flex flex-col gap-1 mb-6 flex-1 cursor-pointer">
                  <h3 className="font-fraunces text-[18px] font-semibold text-preto leading-tight">
                    {title}
                  </h3>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-cafe/60 mt-1 leading-relaxed">
                    {subtitle}
                  </span>
                </Link>

                <div className="flex items-center justify-end mt-auto">
                  <Link 
                    href={`/cafes/${slug}`}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-white transition-colors ${product.ativo ? "bg-preto hover:bg-terracota" : "bg-line/80 pointer-events-none"}`}
                  >
                    <ShoppingBag size={16} />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                      {product.ativo ? "Comprar" : "Esgotado"}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
