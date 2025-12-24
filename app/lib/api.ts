// lib/api.ts
"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Factory that returns an authenticated fetch helper
 * Scoped to the dashboard (client-side only)
 */
export function createFetchWithAuth(accessToken: string | null) {
  return async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
  ) {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    // Merge headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => headers.set(key, value));
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) =>
          headers.set(key, value)
        );
      } else {
        Object.entries(options.headers).forEach(([key, value]) => {
          if (value !== undefined) headers.set(key, value);
        });
      }
    }

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
      credentials: "include", // REQUIRED for refresh cookie
    });

    if (response.status === 401) {
      throw new Error("Unauthorized");
    }

    return response;
  };
}
