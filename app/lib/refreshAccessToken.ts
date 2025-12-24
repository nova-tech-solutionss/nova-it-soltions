// lib/refreshAccessToken.ts
export async function refreshAccessToken(): Promise<string> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  return data.access;
}
