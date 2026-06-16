/**
 * VIDEJO project-API (Cloudflare Worker).
 *
 * Eén losse backend voor de statische site: bewaart de projecten (KLANTEN) in
 * KV onder één key ("projects") als JSON-array. Lezen is publiek (de site heeft
 * het nodig); schrijven (toevoegen/bewerken/verwijderen) vereist een token die
 * je krijgt via POST /login met het admin-wachtwoord.
 *
 * Endpoints:
 *   POST   /login            { password }            -> { token }
 *   GET    /me                                       -> { authed: boolean }
 *   GET    /projects                                 -> AdminProject[]
 *   POST   /projects         (auth) AdminProject     -> AdminProject
 *   PUT    /projects/:slug    (auth) AdminProject     -> AdminProject
 *   DELETE /projects/:slug    (auth)                  -> 204
 */

export interface Env {
  PROJECTS: KVNamespace;
  /** Komma-gescheiden lijst van toegelaten origins (CORS). */
  ALLOWED_ORIGIN: string;
  /** Wachtwoord voor /admin (wrangler secret). */
  ADMIN_PASSWORD: string;
  /** Geheim om sessie-tokens te ondertekenen (wrangler secret). */
  SESSION_SECRET: string;
}

interface LocalizedText {
  nl: string;
  fr: string;
  en: string;
}

interface AdminProject {
  slug: string;
  order: number;
  logo: string;
  name: LocalizedText;
  videos: string[];
  info: LocalizedText;
}

const KV_KEY = "projects";
const TOKEN_TTL = 7 * 24 * 3600; // 7 dagen

/** De 4 bestaande projecten — getoond zolang KV nog leeg is. */
const DEFAULTS: AdminProject[] = [
  { slug: "primero", order: 1, logo: "/images/clients/primero.svg", name: tri("Primero"), videos: [], info: tri("") },
  { slug: "t-misverstand", order: 2, logo: "/images/clients/tmisverstand.svg", name: tri("Restaurant 't Misverstand"), videos: [], info: tri("") },
  { slug: "mossmasters", order: 3, logo: "/images/clients/mossmasters.svg", name: tri("Mossmasters"), videos: [], info: tri("") },
  { slug: "appelmans", order: 4, logo: "/images/clients/appelmans.svg", name: tri("Appelmans"), videos: [], info: tri("") },
];

function tri(s: string): LocalizedText {
  return { nl: s, fr: s, en: s };
}

/* ----------------------------------------------------------------- helpers */

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allow = allowed.includes(origin) ? origin : allowed[0] || "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(data: unknown, init: ResponseInit, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { "Content-Type": "application/json", ...cors, ...(init.headers || {}) },
  });
}

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return base64url(new Uint8Array(sig));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function makeToken(env: Env): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL;
  const sig = await hmac(env.SESSION_SECRET, String(exp));
  return `${exp}.${sig}`;
}

async function validToken(env: Env, token: string | null): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 0) return false;
  const expStr = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const expected = await hmac(env.SESSION_SECRET, expStr);
  return timingSafeEqual(sig, expected);
}

function bearer(req: Request): string | null {
  const h = req.headers.get("Authorization") || "";
  return h.startsWith("Bearer ") ? h.slice(7) : null;
}

async function readProjects(env: Env): Promise<AdminProject[]> {
  const raw = await env.PROJECTS.get(KV_KEY);
  if (!raw) return DEFAULTS;
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

async function writeProjects(env: Env, list: AdminProject[]): Promise<void> {
  await env.PROJECTS.put(KV_KEY, JSON.stringify(list));
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Normaliseer + valideer binnenkomende projectdata; gooit bij ongeldige input. */
function sanitize(body: unknown): AdminProject {
  const b = (body || {}) as Record<string, unknown>;
  const triOf = (v: unknown): LocalizedText => {
    const o = (v || {}) as Record<string, unknown>;
    return {
      nl: typeof o.nl === "string" ? o.nl : "",
      fr: typeof o.fr === "string" ? o.fr : "",
      en: typeof o.en === "string" ? o.en : "",
    };
  };
  const name = triOf(b.name);
  const slug = slugify(typeof b.slug === "string" && b.slug ? b.slug : name.nl);
  if (!slug) throw new Error("Slug of titel (NL) is verplicht");
  if (typeof b.logo !== "string" || !b.logo) throw new Error("Logo is verplicht");
  const videos = Array.isArray(b.videos)
    ? b.videos.filter((v): v is string => typeof v === "string" && v.trim() !== "").map((v) => v.trim())
    : [];
  const order = Number.isFinite(Number(b.order)) ? Number(b.order) : 0;
  return { slug, order, logo: b.logo, name, videos, info: triOf(b.info) };
}

/* ------------------------------------------------------------------- fetch */

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });

    const url = new URL(req.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    try {
      // ---- auth ----
      if (path === "/login" && req.method === "POST") {
        const { password } = (await req.json().catch(() => ({}))) as { password?: string };
        if (!password || !timingSafeEqual(password, env.ADMIN_PASSWORD)) {
          return json({ error: "Onjuist wachtwoord" }, { status: 401 }, cors);
        }
        return json({ token: await makeToken(env) }, { status: 200 }, cors);
      }

      if (path === "/me" && req.method === "GET") {
        return json({ authed: await validToken(env, bearer(req)) }, { status: 200 }, cors);
      }

      // ---- projects ----
      if (path === "/projects" && req.method === "GET") {
        const list = await readProjects(env);
        return json(list, { status: 200 }, cors);
      }

      if (path === "/projects" && req.method === "POST") {
        if (!(await validToken(env, bearer(req)))) return json({ error: "Niet ingelogd" }, { status: 401 }, cors);
        const project = sanitize(await req.json().catch(() => ({})));
        const list = await readProjects(env);
        if (list.some((p) => p.slug === project.slug)) {
          return json({ error: "Er bestaat al een project met deze slug" }, { status: 409 }, cors);
        }
        list.push(project);
        await writeProjects(env, list);
        return json(project, { status: 201 }, cors);
      }

      const detail = path.match(/^\/projects\/([^/]+)$/);
      if (detail) {
        const slug = decodeURIComponent(detail[1]);

        if (req.method === "PUT") {
          if (!(await validToken(env, bearer(req)))) return json({ error: "Niet ingelogd" }, { status: 401 }, cors);
          const project = sanitize(await req.json().catch(() => ({})));
          const list = await readProjects(env);
          const i = list.findIndex((p) => p.slug === slug);
          // slug mag wijzigen; controleer botsing met een ander project
          if (project.slug !== slug && list.some((p) => p.slug === project.slug)) {
            return json({ error: "Er bestaat al een project met deze slug" }, { status: 409 }, cors);
          }
          if (i === -1) list.push(project);
          else list[i] = project;
          await writeProjects(env, list);
          return json(project, { status: 200 }, cors);
        }

        if (req.method === "DELETE") {
          if (!(await validToken(env, bearer(req)))) return json({ error: "Niet ingelogd" }, { status: 401 }, cors);
          const list = await readProjects(env);
          await writeProjects(env, list.filter((p) => p.slug !== slug));
          return new Response(null, { status: 204, headers: cors });
        }
      }

      return json({ error: "Niet gevonden" }, { status: 404 }, cors);
    } catch (err) {
      return json({ error: err instanceof Error ? err.message : "Serverfout" }, { status: 400 }, cors);
    }
  },
};
