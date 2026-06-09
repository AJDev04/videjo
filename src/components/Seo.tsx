import { Head } from "vite-react-ssg";

export interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  canonical?: string;
  robots?: string;
  og?: {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    image?: string;
    locale?: string;
  };
  jsonLd?: Record<string, unknown>;
  /**
   * Pagina-specifieke CSS als string (geïmporteerd met `?inline`). Wordt per
   * route in de <head> geïnjecteerd en bij navigatie weg weer verwijderd, zodat
   * pagina-stylesheets elkaar niet overschrijven (bv. .hero in index.css vs
   * portfolio.css). De CSS-bestanden zelf blijven ongewijzigd.
   */
  pageCss?: string;
}

export default function Seo({
  title,
  description,
  keywords,
  author,
  canonical,
  robots = "index, follow",
  og,
  jsonLd,
  pageCss,
}: SeoProps) {
  const head = (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}
      {og?.title && <meta property="og:title" content={og.title} />}
      {og?.description && (
        <meta property="og:description" content={og.description} />
      )}
      {og?.type && <meta property="og:type" content={og.type} />}
      {og?.url && <meta property="og:url" content={og.url} />}
      {og?.image && <meta property="og:image" content={og.image} />}
      {og?.locale && <meta property="og:locale" content={og.locale} />}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );

  // Let op: <style> binnen <Head> wordt door vite-react-ssg niet naar de
  // statische HTML gerenderd. Daarom injecteren we de pagina-CSS als gewoon
  // element in de component-tree: dat komt wél in de SSG-HTML én React
  // verwijdert het bij route-wissel, zodat pagina-stylesheets geïsoleerd blijven.
  if (!pageCss) return head;
  return (
    <>
      {head}
      <style type="text/css" dangerouslySetInnerHTML={{ __html: pageCss }} />
    </>
  );
}
