export const BACKEND_API = "http://localhost:4000";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${BACKEND_API}${url}`, {
    credentials: "include", // for cookies
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "API Error");
  }
  return res.json();
};
