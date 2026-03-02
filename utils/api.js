export const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiPost(path, body) {
  const res = await fetch(`${VITE_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return data;
}