"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import authConfig from "@/config/auth";



type AuthContextType = {
  isAdmin: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);



export function AuthProvider({ children }: { children: React.ReactNode })
{
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const router = useRouter();

  const logout = () => {
    setIsAdmin(false);
    document.cookie = `${authConfig.cookie.name}=; path=${authConfig.cookie.path}; max-age=0`;

    if (window.location.pathname.startsWith('/admin'))
      router.push('/');
  };

  useEffect(() =>
    setIsAdmin(document.cookie.includes(`${authConfig.cookie.name}=`)), []);


  return (
    <AuthContext.Provider value={{ isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}



export function useAuth(): AuthContextType 
{
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext used outside an AuthProvider");

  return context;
}