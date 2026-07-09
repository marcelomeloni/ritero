"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { login, register as registerUser } from "@/services/authService";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formSchema = z.object({
  nome: z.string().optional(),
  cpf: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().min(1, "O e-mail é obrigatório.").email("Por favor, insira um e-mail válido."),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type FormValues = z.infer<typeof formSchema>;

function LoginContent() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginState } = useAuth();
  
  const redirectUrl = searchParams.get("redirect") || "/minha-conta";

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (isRegister) {
      if (!data.nome || data.nome.length < 2) {
        setError("nome", { type: "manual", message: "O nome é obrigatório para cadastro." });
        return;
      }
      if (!data.cpf || data.cpf.length < 11) {
        setError("cpf", { type: "manual", message: "O CPF é obrigatório para cadastro." });
        return;
      }
      if (!data.telefone || data.telefone.length < 10) {
        setError("telefone", { type: "manual", message: "O telefone é obrigatório para cadastro." });
        return;
      }
    }
    
    try {
      if (isRegister) {
        await registerUser({ 
          nome: data.nome, 
          email: data.email, 
          senha: data.senha,
          cpf: data.cpf,
          telefone: data.telefone
        });
        // Após registrar, manda pro login
        setIsRegister(false);
        clearErrors();
        alert("Conta criada com sucesso! Por favor, faça login.");
      } else {
        const response = await login(data.email, data.senha);
        loginState(response.token, response.user);
        router.push(redirectUrl);
      }
    } catch (err: any) {
      setError("email", { type: "manual", message: err.message || "Erro de autenticação" });
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    clearErrors();
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // Simulação de chamada de API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsGoogleLoading(false);
    console.log("Login com Google clicado");
    // Após implementar Google real, usar: router.push(redirectUrl);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      
      {/* ─── LADO ESQUERDO: FORMULÁRIO ─── */}
      <div className="flex w-full flex-col justify-center px-8 py-6 sm:px-16 lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
        <div className="mx-auto w-full max-w-[420px]">
          
          <div className="mb-8 text-left">
            <h1 className="font-fraunces text-[32px] font-bold tracking-tight text-preto md:text-[36px]">
              {isRegister ? "Crie sua conta" : "Bem-vindo(a)"}
            </h1>
            {!isRegister && (
              <p className="mt-2 font-work text-[15px] text-cafe/70">
                Entre para continuar suas compras e salvar seus cafés favoritos.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Input Nome (Só aparece no Cadastro) */}
            {isRegister && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                <label htmlFor="nome" className="mb-2 block font-mono text-[11px] font-bold tracking-[0.05em] uppercase text-cafe/80">
                  Nome completo
                </label>
                <input 
                  {...register("nome")}
                  type="text" 
                  id="nome"
                  placeholder="Seu nome"
                  className={cn(
                    "w-full rounded-[6px] border bg-white px-4 py-3 font-work text-[15px] text-preto outline-none transition-all placeholder:text-cafe/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                    errors.nome ? "border-terracota focus-visible:ring-terracota/80" : "border-line/60 focus:border-terracota/60"
                  )}
                />
                {errors.nome && (
                  <p className="mt-2 font-work text-[13px] text-terracota">
                    {errors.nome.message}
                  </p>
                )}
              </div>
            )}
            
            {/* Input CPF e Telefone (Só aparece no Cadastro) */}
            {isRegister && (
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 delay-75">
                <div>
                  <label htmlFor="cpf" className="mb-2 block font-mono text-[11px] font-bold tracking-[0.05em] uppercase text-cafe/80">
                    CPF
                  </label>
                  <input 
                    {...register("cpf")}
                    type="text" 
                    id="cpf"
                    placeholder="000.000.000-00"
                    className={cn(
                      "w-full rounded-[6px] border bg-white px-4 py-3 font-work text-[15px] text-preto outline-none transition-all placeholder:text-cafe/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                      errors.cpf ? "border-terracota focus-visible:ring-terracota/80" : "border-line/60 focus:border-terracota/60"
                    )}
                  />
                  {errors.cpf && (
                    <p className="mt-2 font-work text-[13px] text-terracota">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefone" className="mb-2 block font-mono text-[11px] font-bold tracking-[0.05em] uppercase text-cafe/80">
                    Telefone
                  </label>
                  <input 
                    {...register("telefone")}
                    type="tel" 
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    className={cn(
                      "w-full rounded-[6px] border bg-white px-4 py-3 font-work text-[15px] text-preto outline-none transition-all placeholder:text-cafe/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                      errors.telefone ? "border-terracota focus-visible:ring-terracota/80" : "border-line/60 focus:border-terracota/60"
                    )}
                  />
                  {errors.telefone && (
                    <p className="mt-2 font-work text-[13px] text-terracota">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Input E-mail */}
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-[11px] font-bold tracking-[0.05em] uppercase text-cafe/80">
                E-mail
              </label>
              <input 
                {...register("email")}
                type="email" 
                id="email"
                placeholder="seu@email.com"
                className={cn(
                  "w-full rounded-[6px] border bg-white px-4 py-3 font-work text-[15px] text-preto outline-none transition-all placeholder:text-cafe/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                  errors.email ? "border-terracota focus-visible:ring-terracota/80" : "border-line/60 focus:border-terracota/60"
                )}
              />
              {errors.email && (
                <p className="mt-2 font-work text-[13px] text-terracota">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Input Senha */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="senha" className="font-mono text-[11px] font-bold tracking-[0.05em] uppercase text-cafe/80">
                  Senha
                </label>
                {!isRegister && (
                  <Link href="/recuperar-senha" className="font-mono text-[10px] text-terracota transition-colors hover:text-cafe">
                    Esqueceu a senha?
                  </Link>
                )}
              </div>
              
              <div className="relative">
                <input 
                  {...register("senha")}
                  type={showPassword ? "text" : "password"} 
                  id="senha"
                  placeholder="••••••••"
                  className={cn(
                    "w-full rounded-[6px] border bg-white px-4 py-3 pr-10 font-work text-[15px] text-preto outline-none transition-all placeholder:text-cafe/30 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracota",
                    errors.senha ? "border-terracota focus-visible:ring-terracota/80" : "border-line/60 focus:border-terracota/60"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cafe/40 transition-colors hover:text-cafe"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.senha && (
                <p className="mt-2 font-work text-[13px] text-terracota">
                  {errors.senha.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-[6px] bg-preto py-4 font-mono text-[13px] font-bold tracking-[0.1em] uppercase text-creme transition-all hover:bg-cafe active:scale-95 disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin text-creme" />
                  <span>{isRegister ? "Criando conta..." : "Entrando..."}</span>
                </>
              ) : (
                isRegister ? "Criar conta" : "Entrar"
              )}
            </button>
          </form>

          {/* Divisória */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-line/60"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.05em] text-cafe/40">Ou</span>
            <div className="h-[1px] flex-1 bg-line/60"></div>
          </div>

          {/* Botão do Google */}
          <button 
            onClick={handleGoogleLogin}
            type="button"
            disabled={isGoogleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-[6px] border border-line/80 bg-white py-4 font-work text-[15px] font-medium text-preto transition-colors hover:bg-amarelo-claro/30 disabled:pointer-events-none disabled:opacity-70"
          >
            {isGoogleLoading ? (
              <Loader2 size={18} className="animate-spin text-cafe/50" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Continuar com o Google
          </button>

          <p className="mt-10 text-center font-work text-[14px] text-cafe/70">
            {isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}{" "}
            <button 
              type="button"
              onClick={toggleMode} 
              className="font-medium text-terracota transition-colors hover:text-cafe"
            >
              {isRegister ? "Fazer login" : "Criar conta"}
            </button>
          </p>
          
        </div>
      </div>

      {/* ─── LADO DIREITO: BRANDING MINIMALISTA ─── */}
      <div className="hidden flex-1 flex-col items-center justify-center bg-creme lg:flex relative border-l border-line/40">
        {/* Padrão sutil no fundo */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#231302 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-10">
          <Link href="/" className="transition-transform hover:scale-[1.02] active:scale-95 duration-300">
            <Image 
              src="/logosimples.png" 
              alt="Ritero" 
              width={500} 
              height={160} 
              className="h-auto w-[300px] xl:w-[400px] opacity-90" 
              priority
            />
          </Link>
          <p className="mt-8 max-w-[360px] font-work text-[16px] leading-[1.7] text-cafe/60 font-medium">
            Do grão à xícara, sem pressa. Acompanhe a jornada dos seus cafés especiais direto do produtor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="flex min-h-screen w-full items-center justify-center bg-white"><div className="animate-spin text-cafe/50 border-4 border-current border-t-transparent rounded-full w-8 h-8"></div></div>}>
      <LoginContent />
    </Suspense>
  );
}
