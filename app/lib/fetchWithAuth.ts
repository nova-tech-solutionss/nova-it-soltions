// lib/fetchWithAuth.ts
import { refreshAccessToken } from "./refreshAccessToken";

export async function fetchWithAuth(
  url: string,
  accessToken: string | null,
  setAccessToken: (t: string) => void,
  options: RequestInit = {}
) {
  let res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    setAccessToken(newToken);

    res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        Authorization: `Bearer ${newToken}`,
      },
    });
  }

  return res;
}
