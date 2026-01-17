// app/hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAuthCookies, redirectToLogin } from "../lib/auth";

type AuthUser = {
  id?: string;
  email?: string;
  name?: string;
} | null;

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Ajusta esta ruta si tu API es diferente
        const res = await fetch("/api/me", { method: "GET" });

        if (!res.ok) {
          setUser(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setUser(data?.user ?? data ?? null);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    clearAuthCookies();
    redirectToLogin(router);
  };

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    logout,
  };
}
