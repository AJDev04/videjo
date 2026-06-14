import { useEffect, useState } from "react";
import SmartLink from "./SmartLink";
import VidejoLogo from "./VidejoLogo";
import { useLenis } from "../lib/lenis";

const LINKS: { to: string; label: string; dataText: string }[] = [
  { to: "/#hero", label: "Home", dataText: "Home" },
  { to: "/#expertise", label: "Expertise", dataText: "Expertise" },
  { to: "/portfolio", label: "Portfolio", dataText: "Portfolio" },
  { to: "/about", label: "Over Ons", dataText: "About" },
];

/**
 * Top-nav: logo linksboven, "Let's talk" + hamburger rechtsboven,
 * met full-screen menu-overlay. Voegt body.nav-open toe en sluit het menu bij klik.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

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
          to="mailto:videjo.be@gmail.com"
          className="contact-btn nav-btn"
          onNavigate={close}
        >
          Let's talk
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
          {LINKS.map((link) => (
            <li key={link.to}>
              {link.to !== "/#hero" && <div className="divider"></div>}
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
      </nav>
    </>
  );
}
