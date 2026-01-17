// app/lib/auth.ts

export type TenantInfo = {
  id?: string;
  slug?: string;
  name?: string;
  subdomain?: string;
};

// ✅ Helper: construir dominio tenant (si usas subdominios)
export function getTenantBaseUrl(tenantSlug?: string) {
  if (!tenantSlug) return "https://novadev.solutions";

  // ejemplo: tenant.novadev.solutions
  return `https://${tenantSlug}.novadev.solutions`;
}
// ✅ Register (si tu lógica ya la tiene, mantenla; si no, esto es placeholder seguro)
export type RegisterPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  role?: string;
};

export async function register(payload: RegisterPayload) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Register failed");
  }

  return res.json();
}


// ✅ Register (si tu lógica ya la tiene, mantenla; si no, esto es placeholder seguro)
export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return res.json();
}

// ✅ Guardar cookies auth (placeholder; ajusta si ya tenías cookies concretas)
export function setAuthCookies(token: string) {
  // ejemplo simple (si usas cookies httpOnly reales se setean desde API)
  document.cookie = `auth_token=${token}; path=/; SameSite=Lax`;
}

// ✅ Limpiar cookies auth
export function clearAuthCookies() {
  document.cookie = "auth_token=; Max-Age=0; path=/; SameSite=Lax";
}


export function redirectToLogin(router: { push: (path: string) => void }) {
  router.push("/login");
}


export function redirectToTenant(
  router: { push: (path: string) => void },
  tenantSlug?: string
) {
  // si todavía no tienes tenants reales, manda al dashboard
  if (!tenantSlug) {
    router.push("/dashboard");
    return;
  }

  // si manejas tenants por ruta:
  router.push(`/tenants/${tenantSlug}`);
}
