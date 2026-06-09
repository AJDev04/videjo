import { useEffect, useState } from "react";
import SmartLink from "./SmartLink";

const LINKS: { to: string; label: string; dataText: string }[] = [
  { to: "/#hero", label: "Home", dataText: "Home" },
  { to: "/#expertise", label: "Expertise", dataText: "Expertise" },
  { to: "/portfolio", label: "Portfolio", dataText: "Portfolio" },
  { to: "/about", label: "Over Ons", dataText: "About" },
];

/**
 * Top-nav + full-screen menu-overlay — port van de nav-markup en het
 * menu-toggle-script. Voegt body.nav-open toe en sluit het menu bij klik.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div className="top-nav">
        <SmartLink to="/#contact" className="contact-btn nav-btn" onNavigate={close}>
          Contact
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
          <span className="menu-text">Menu</span>
        </button>
      </div>

      <nav className="nav-overlay"></nav>

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
