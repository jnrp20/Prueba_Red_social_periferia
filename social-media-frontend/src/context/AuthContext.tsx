"use client";
import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { useRouter } from "next/navigation";

// Tipado del contexto
interface AuthContextType {
  user: { token: string; alias: string } | null;
  login: (token: string, alias: string) => void;
  logout: () => void;
  loading: boolean;
}

// Creamos el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<{ token: string; alias: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const alias = localStorage.getItem("alias");
    if (token && alias) setUser({ token, alias });
    setLoading(false);
  }, []);

  const login = (token: string, alias: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("alias", alias);
    setUser({ token, alias });
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("alias");
    setUser(null);
    router.push("/");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook personalizado dentro del mismo archivo
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
