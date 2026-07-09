"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getMe, User } from "@/services/authService";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginState: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginState: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("ritero_client_token");
      if (token) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (err: any) {
          console.error("Erro ao validar token", err);
          if (err?.status === 401) {
            localStorage.removeItem("ritero_client_token");
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginState = (token: string, userData: User) => {
    localStorage.setItem("ritero_client_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("ritero_client_token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
