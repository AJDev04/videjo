import { useEffect, useState } from "react";
import SmartLink from "./SmartLink";
import VidejoLogo from "./VidejoLogo";
import { useLenis } from "../lib/lenis";
import { useLanguage, LANGS, LANG_LABELS } from "../lib/lang";
import { useT } from "../lib/i18n";

/**
 * Top-nav: logo linksboven, "Let's talk" + hamburger rechtsboven,
 * met full-screen menu-overlay. Voegt body.nav-open toe en sluit het menu bij klik.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();
  const { lang, setLang } = useLanguage();
  const t = useT();

  // dataText (hover-effect) blijft taal-onafhankelijk; label volgt de taal.
  const LINKS = [
    { to: "/#hero", label: t.nav.home, dataText: "Home" },
    { to: "/projecten", label: t.nav.projecten, dataText: "Projecten" },
    { to: "/expertise", label: t.nav.expertise, dataText: "Expertise" },
    { to: "/about", label: t.nav.about, dataText: "About" },
    { to: "/contact", label: t.nav.contact, dataText: "Contact" },
  ];

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Blur-balk achter de nav zodra er gescrolld is
  useEffect(() => {
    const apply = (y: number) => setScrolled(y > 10);
    apply(window.scrollY);
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => apply(scroll);
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    }
    const handler = () => apply(window.scrollY);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [lenis]);

  const close = () => setOpen(false);

  return (
    <>
      <div className={`nav-blur${scrolled ? " visible" : ""}`}></div>

      <SmartLink to="/" className="nav-logo" onNavigate={close} aria-label="VIDEJO home">
        <VidejoLogo />
      </SmartLink>

      <div className="top-nav">
        <SmartLink
          to="/contact"
          className="contact-btn nav-btn"
          onNavigate={close}
        >
          {t.nav.talk}
        </SmartLink>
        <button
          className={`menu-btn nav-btn${open ? " open" : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <div className="burger">
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <nav className="nav-overlay">
        <ul className="nav-links">
          {LINKS.map((link, i) => (
            <li key={link.to}>
              {i !== 0 && <div className="divider"></div>}
              <SmartLink
                className="link-text"
                to={link.to}
                data-text={link.dataText}
                onNavigate={close}
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
        <div className="lang-switcher">
          {LANGS.map((l) => (
            <button
              key={l}
              className={`lang-btn${l === lang ? " lang-btn--active" : ""}`}
              onClick={() => setLang(l)}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
