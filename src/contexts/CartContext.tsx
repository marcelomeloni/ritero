"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string; // Ex: 'fazenda-quilombo-250g-Em grão'
  slug: string;
  nome: string; // Produtor
  notas: string;
  preco: number;
  quantidade: number;
  imagem: string;
  cor: string;
  corTexto: string;
  moagem: string;
  peso_gramas: number;
}

export interface CouponData {
  codigo: string;
  tipo: "PERCENTUAL" | "FIXO";
  valor: number;
}

interface CartContextData {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantidade: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  coupon: CouponData | null;
  applyCoupon: (coupon: CouponData) => void;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [coupon, setCoupon] = useState<CouponData | null>(null);

  // Load from local storage
  useEffect(() => {
    const storedCart = localStorage.getItem("@ritero:cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (err) {
        console.error("Failed to parse cart", err);
      }
    }
    setIsInitialized(true);
  }, []);

  // Clear coupon if cart becomes empty
  useEffect(() => {
    if (isInitialized && items.length === 0) {
      setCoupon(null);
    }
  }, [items.length, isInitialized]);

  // Sync with local storage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("@ritero:cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItemIndex = currentItems.findIndex((item) => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantidade += newItem.quantidade;
        return updatedItems;
      }
      
      return [...currentItems, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantidade: number) => {
    if (quantidade <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (newCoupon: CouponData) => {
    setCoupon(newCoupon);
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
