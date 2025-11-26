"use client";
import { createContext, useContext, useState } from "react";
import site from "@/config/site";


const AuthContext = createContext({
  isAdmin: false,
  logout: () => {}
});


interface AuthProviderProps {
  children: React.ReactNode;
  initialIsAdmin: boolean;
}

export function AuthProvider({ children, initialIsAdmin }: AuthProviderProps)
{
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  const logout = () => {
    setIsAdmin(false);
    document.cookie = `${site.adminCookie.name}=; path=${site.adminCookie.path}; max-age=0`;
  };

  return (
    <AuthContext.Provider value={{ isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}