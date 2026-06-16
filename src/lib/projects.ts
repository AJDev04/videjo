/**
 * Project-datamodel (per klant). Projecten worden via de admin-API (Cloudflare
 * Worker) beheerd en client-side opgehaald met `useProjects`. Gedeeld door de
 * KLANTEN-grid op de Projecten-pagina en de individuele projectpagina's.
 *
 * Titel (`name`) en uitleg (`info`) zijn per taal (NL/FR/EN); `logo` is een
 * data-URL (geüpload via /admin) of een pad naar /public; `videos` zijn
 * YouTube-/Vimeo-/mp4-URL's.
 */
import type { Lang } from "./lang";

export interface LocalizedText {
  nl: string;
  fr: string;
  en: string;
}

export interface AdminProject {
  slug: string;
  order: number;
  logo: string;
  name: LocalizedText;
  videos: string[];
  info: LocalizedText;
}

const tri = (s: string): LocalizedText => ({ nl: s, fr: s, en: s });

/**
 * Fallback wanneer de API (nog) niet bereikbaar is of niet geconfigureerd:
 * de 4 bestaande projecten. Moet gelijklopen met DEFAULTS in worker/src/index.ts.
 */
export const DEFAULT_PROJECTS: AdminProject[] = [
  { slug: "primero", order: 1, logo: "/images/clients/primero.svg", name: tri("Primero"), videos: [], info: tri("") },
  { slug: "t-misverstand", order: 2, logo: "/images/clients/tmisverstand.svg", name: tri("'t Misverstand"), videos: [], info: tri("") },
  { slug: "mossmasters", order: 3, logo: "/images/clients/mossmasters.svg", name: tri("Mossmasters"), videos: [], info: tri("") },
  { slug: "appelmans", order: 4, logo: "/images/clients/appelmans.svg", name: tri("Appelmans"), videos: [], info: tri("") },
];

/** Tekst in de actieve taal, met NL als terugval. */
export const localized = (t: LocalizedText, lang: Lang): string => t[lang] || t.nl || "";

/** Kopie van de lijst, gesorteerd op `order`. */
export const sortProjects = (list: AdminProject[]): AdminProject[] =>
  [...list].sort((a, b) => a.order - b.order);
