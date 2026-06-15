import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Cookie-balk — port van het inline cookie-script in de legacy-pagina's.
 * Onthoudt de keuze in localStorage ("videjo_cookie_ok") en schuift naar
 * beneden bij "Begrepen". Styling (#cookie-bar) staat in master.css.
 */
export default function CookieBar() {
  const [hidden, setHidden] = useState(false);
  const [closing, setClosing] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("videjo_cookie_ok")) {
      setHidden(true);
    }
  }, []);

  // De balk staat fixed onderaan; zonder compensatie bedekt hij de onderkant van
  // de pagina (bv. de BTW-regel in de footer). Reserveer onderaan de body exact
  // de hoogte van de balk zolang hij zichtbaar is, en geef die ruimte weer vrij
  // zodra hij wegschuift. Lenis pikt de nieuwe hoogte vanzelf op (ResizeObserver).
  useEffect(() => {
    if (hidden || closing) {
      document.body.style.paddingBottom = "";
      return;
    }
    const apply = () => {
      const h = barRef.current?.offsetHeight ?? 0;
      document.body.style.paddingBottom = h ? `${h}px` : "";
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("resize", apply);
      document.body.style.paddingBottom = "";
    };
  }, [hidden, closing]);

  if (hidden) return null;

  const accept = () => {
    setClosing(true);
    localStorage.setItem("videjo_cookie_ok", "1");
    setTimeout(() => setHidden(true), 400);
  };

  return (
    <div
      id="cookie-bar"
      ref={barRef}
      style={closing ? { transform: "translateY(100%)" } : undefined}
    >
      <span>
        Deze site gebruikt technisch noodzakelijke cookies.{" "}
        <Link
          to="/cookies"
          style={{
            color: "var(--color-accent-light)",
            textUnderlineOffset: "3px",
          }}
        >
          Meer info
        </Link>
      </span>
      <button onClick={accept}>Begrepen</button>
    </div>
  );
}
