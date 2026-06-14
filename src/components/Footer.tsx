import SmartLink from "./SmartLink";
import VidejoWordmark from "./VidejoWordmark";

const PAGES = [
  { to: "/#hero", label: "Home" },
  { to: "/#projecten", label: "Projecten" },
  { to: "/#expertise", label: "Expertise" },
  { to: "/about", label: "Over Ons" },
  { to: "mailto:videjo.be@gmail.com", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/company/videjobe/", label: "LinkedIn" },
  { href: "https://www.instagram.com/videjo.be/", label: "Instagram" },
  { href: "https://www.tiktok.com/@videjo.be", label: "TikTok" },
];

const LEGAL = [
  { to: "/voorwaarden", label: "Policy" },
  { to: "/cookies", label: "Cookies" },
  { to: "/privacy", label: "Privacy" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-top">
          <nav className="footer-cols">
            <div className="footer-col">
              <h3>Pages</h3>
              <ul>
                {PAGES.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h3>Links</h3>
              <ul>
                {SOCIALS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h3>Legaal</h3>
              <ul>
                {LEGAL.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <SmartLink to="mailto:videjo.be@gmail.com" className="footer-cta">
            <span className="cta-line1">Let&rsquo;s work</span>
            <span className="cta-line2">Together</span>
          </SmartLink>
        </div>
        <VidejoWordmark className="footer-wordmark" />
        <p className="footer-copy">
          BTW BE1037894456 | &copy; 2026 VIDEJO. Alle rechten voorbehouden
        </p>
      </div>
    </footer>
  );
}
