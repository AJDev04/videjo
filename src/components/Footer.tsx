import SmartLink from "./SmartLink";
import VidejoWordmark from "./VidejoWordmark";
import { useT } from "../lib/i18n";

const SOCIALS = [
  { href: "https://www.linkedin.com/company/videjobe/", label: "LinkedIn" },
  { href: "https://www.instagram.com/videjo.be/", label: "Instagram" },
  { href: "https://www.tiktok.com/@videjo.be", label: "TikTok" },
];

export default function Footer() {
  const t = useT();

  const PAGES = [
    { to: "/#hero", label: t.nav.home },
    { to: "/projecten", label: t.nav.projecten },
    { to: "/expertise", label: t.nav.expertise },
    { to: "/about", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ];

  const LEGAL = [
    { to: "/voorwaarden", label: t.footer.policy },
    { to: "/cookies", label: t.footer.cookies },
    { to: "/privacy", label: t.footer.privacy },
  ];

  return (
    <footer className="footer">
      <div className="footer-panel">
        <div className="footer-top">
          <nav className="footer-cols">
            <div className="footer-col">
              <h3>{t.footer.pages}</h3>
              <ul>
                {PAGES.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h3>{t.footer.links}</h3>
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
              <h3>{t.footer.legal}</h3>
              <ul>
                {LEGAL.map((link) => (
                  <li key={link.label}>
                    <SmartLink to={link.to}>{link.label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <SmartLink to="/contact" className="footer-cta">
            <span className="cta-line1">{t.footer.ctaLine1}</span>
            <span className="cta-line2">{t.footer.ctaLine2}</span>
          </SmartLink>
        </div>
        <VidejoWordmark className="footer-wordmark" />
        <p className="footer-copy">
          BTW BE1037894456 | &copy; 2026 VIDEJO. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
