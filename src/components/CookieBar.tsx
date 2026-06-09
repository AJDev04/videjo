import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Cookie-balk — port van het inline cookie-script in de legacy-pagina's.
 * Onthoudt de keuze in localStorage ("videjo_cookie_ok") en schuift naar
 * beneden bij "Begrepen". Styling (#cookie-bar) staat in master.css.
 */
export default function CookieBar() {
  const [hidden, setHidden] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("videjo_cookie_ok")) {
      setHidden(true);
    }
  }, []);

  if (hidden) return null;

  const accept = () => {
    setClosing(true);
    localStorage.setItem("videjo_cookie_ok", "1");
    setTimeout(() => setHidden(true), 400);
  };

  return (
    <div
      id="cookie-bar"
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
