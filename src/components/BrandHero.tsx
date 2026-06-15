import { useEffect, useRef } from "react";
import VidejoWordmark from "./VidejoWordmark";
import brandHeroCss from "./BrandHero.css?inline";

/**
 * Gedeelde landing-hero: het VIDEJO-woordmerk met daaronder de paginatitel,
 * exact even breed als het woordmerk. Die breedte-match is niet betrouwbaar in
 * pure CSS (hangt van het font af), dus meten we de titel op een vaste basis en
 * schalen de font-size zodat zijn breedte de woordmerk-breedte raakt — geen
 * vervorming, enkel uniform schalen. Gebruikt door Projecten, Expertise, ...
 * (verschilt enkel in de `title`-prop).
 */
export default function BrandHero({
  title,
  titleAbove = false,
}: {
  title: string;
  titleAbove?: boolean;
}) {
  const markRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mark = markRef.current;
    const titleEl = titleRef.current;
    if (!mark || !titleEl) return;

    const fit = () => {
      // Meet op een vaste basis (100px) zodat herhaald fitten niet wegdriftt.
      titleEl.style.fontSize = "100px";
      const natural = titleEl.getBoundingClientRect().width;
      const target = mark.getBoundingClientRect().width;
      if (natural > 0) titleEl.style.fontSize = `${(100 * target) / natural}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mark);
    // Hermeten zodra proxima-nova-wide geladen is — anders meet de fit de
    // (smallere) fallback-breedte, wordt de font-size te groot gezet en loopt de
    // titel op mobiel buiten beeld. `fonts.ready` mist het soms doordat Typekit
    // het font pas ná die promise registreert, dus laden we het ook expliciet.
    const fonts = document.fonts;
    if (fonts) {
      fonts.ready.then(fit).catch(() => {});
      fonts.load('900 1em "proxima-nova-wide"').then(fit).catch(() => {});
    }
    return () => ro.disconnect();
  }, []);

  // "VIDEJO" = merknaam (woordmerk); blijft in elke taal hetzelfde.
  const mark = (
    <div className="brand-hero-mark" ref={markRef}>
      <VidejoWordmark className="brand-hero-mark-svg" />
    </div>
  );
  // Paginatitel — vertaalbaar; breedte volgt het woordmerk via JS.
  const heading = (
    <h1 className="brand-hero-title" ref={titleRef}>
      {title}
    </h1>
  );

  return (
    <section className="brand-hero">
      <style dangerouslySetInnerHTML={{ __html: brandHeroCss }} />
      {/* titleAbove = titel boven het woordmerk (bv. "Over" boven "VIDEJO");
          standaard staat de titel eronder (Projecten, Expertise). */}
      <div className="brand-hero-inner">
        {titleAbove ? (
          <>
            {heading}
            {mark}
          </>
        ) : (
          <>
            {mark}
            {heading}
          </>
        )}
      </div>
    </section>
  );
}
