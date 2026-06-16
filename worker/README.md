# VIDEJO project-API (Cloudflare Worker)

Losse backend voor de projecten/KLANTEN. Bewaart alles in KV onder één key
(`projects`) als JSON-array. Lezen is publiek; toevoegen/bewerken/verwijderen
vereist het admin-wachtwoord (via `/admin` op de site).

## Eenmalig opzetten + deployen

```bash
cd worker
npm install

# 1. Inloggen op je Cloudflare-account
npx wrangler login

# 2. KV-namespace aanmaken en het id in wrangler.jsonc plakken
npx wrangler kv namespace create PROJECTS
#   -> kopieer het "id" naar kv_namespaces[0].id in wrangler.jsonc

# 3. Secrets zetten (eenmalig)
npx wrangler secret put ADMIN_PASSWORD   # kies je admin-wachtwoord
npx wrangler secret put SESSION_SECRET   # plak een willekeurige lange string

# 4. ALLOWED_ORIGIN in wrangler.jsonc op je live site-URL zetten
#    (bv. "https://videjo.be,http://localhost:5173")

# 5. Deployen
npx wrangler deploy
#   -> kopieer de Worker-URL (bv. https://videjo-api.<account>.workers.dev)
```

Zet die Worker-URL als `VITE_API_URL` in de frontend (zie `.env.example` in de
projectroot) en build/deploy de site opnieuw.

## Lokaal testen

```bash
cp .dev.vars.example .dev.vars   # vul ADMIN_PASSWORD + SESSION_SECRET in
npx wrangler dev                 # draait op http://localhost:8787
```

In de frontend: `VITE_API_URL=http://localhost:8787` en `npm run dev`.

## Endpoints

| Methode | Pad               | Auth | Doel                          |
| ------- | ----------------- | ---- | ----------------------------- |
| POST    | `/login`          | –    | `{password}` → `{token}`      |
| GET     | `/me`             | –    | `{authed: boolean}`           |
| GET     | `/projects`       | –    | lijst van projecten           |
| POST    | `/projects`       | ✓    | project toevoegen             |
| PUT     | `/projects/:slug` | ✓    | project bewerken              |
| DELETE  | `/projects/:slug` | ✓    | project verwijderen           |

Auth = `Authorization: Bearer <token>` (token uit `/login`, 7 dagen geldig).

## Projectmodel

```ts
interface AdminProject {
  slug: string;                                   // url-id, bv. "appelmans"
  order: number;                                  // volgorde in de grid
  logo: string;                                   // data-URL (geüpload) of pad
  name: { nl: string; fr: string; en: string };  // titel per taal
  videos: string[];                               // YouTube/Vimeo/mp4-URL's
  info: { nl: string; fr: string; en: string };   // projectinfo per taal
}
```

Zolang KV nog leeg is, geeft de API de 4 bestaande projecten terug
(`primero`, `t-misverstand`, `mossmasters`, `appelmans`). Bij de eerste
schrijf-actie worden die mee opgeslagen.
