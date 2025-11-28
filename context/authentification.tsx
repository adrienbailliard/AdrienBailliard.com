"use client";
import { createContext, useContext, useState, useEffect } from "react";
import site from "@/config/site";


const AuthContext = createContext({
  isAdmin: false,
  logout: () => {}
});


export function AuthProvider({ children }: { children: React.ReactNode })
{
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const logout = () => {
    setIsAdmin(false);
    document.cookie = `${site.adminCookie.name}=; path=${site.adminCookie.path}; max-age=0`;
  };

  useEffect(() => {
    setIsAdmin(
      document.cookie.startsWith(`${site.adminCookie.name}=`)
    );
  }, []);


  if (isAdmin === null)
    return null;

  return (
    <AuthContext.Provider value={{ isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}