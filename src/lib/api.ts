/**
 * Client voor de VIDEJO project-API (Cloudflare Worker). De basis-URL komt uit
 * `VITE_API_URL` (zie .env.example). Lezen is publiek; schrijf-acties sturen het
 * login-token mee als `Authorization: Bearer …` (bewaard in sessionStorage).
 */
import type { AdminProject } from "./projects";

const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
const TOKEN_KEY = "videjo_admin_token";

export function getToken(): string | null {
  if (typeof sessionStorage === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

function setToken(token: string | null): void {
  if (typeof sessionStorage === "undefined") return;
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return getToken() !== null;
}

async function req<T>(path: string, opts: RequestInit = {}): Promise<T> {
  if (!API) throw new Error("VITE_API_URL is niet ingesteld");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((opts.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { ...opts, headers });
  if (res.status === 401) setToken(null);
  if (!res.ok) {
    let message = `Fout ${res.status}`;
    try {
      const body = (await res.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      /* niet-JSON respons */
    }
    throw new Error(message);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const getProjects = (): Promise<AdminProject[]> => req<AdminProject[]>("/projects");

export async function login(password: string): Promise<void> {
  const data = await req<{ token: string }>("/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  setToken(data.token);
}

export function logout(): void {
  setToken(null);
}

export const createProject = (project: AdminProject): Promise<AdminProject> =>
  req<AdminProject>("/projects", { method: "POST", body: JSON.stringify(project) });

export const updateProject = (slug: string, project: AdminProject): Promise<AdminProject> =>
  req<AdminProject>(`/projects/${encodeURIComponent(slug)}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });

export const deleteProject = (slug: string): Promise<void> =>
  req<void>(`/projects/${encodeURIComponent(slug)}`, { method: "DELETE" });
