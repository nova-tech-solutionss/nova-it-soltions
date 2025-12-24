"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { refreshAccessToken } from "@/app/lib/refreshAccessToken";
type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (t: string | null) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Restore session ONCE when dashboard loads
    refreshAccessToken()
      .then(setAccessToken)
      .catch(() => setAccessToken(null))
      .finally(() => setHydrated(true));
  }, []);

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
    setAccessToken(null);
  };

  if (!hydrated) return null; // prevent flicker

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside dashboard");
  return ctx;
};