import { api } from "./api";

export interface User {
  id: string;
  email: string;
  nome: string;
  tipo: "cliente";
  cpf?: string;
  telefone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(email: string, senha: string): Promise<AuthResponse> {
  return await api<AuthResponse>("/public/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
}

export async function register(data: any): Promise<AuthResponse> {
  return await api<AuthResponse>("/public/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMe(): Promise<User> {
  const res = await api<{ user: User }>("/public/auth/me");
  return res.user;
}
