import SmartLink from "./SmartLink";
import VidejoMark from "./VidejoMark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <VidejoMark className="logo-svg" />
          </div>
          <p className="footer-tagline">
            Stories in motion, captured from every angle.
          </p>
          <div className="footer-links">
            <SmartLink to="/#hero">Home</SmartLink>
            <SmartLink to="/#expertise">Expertise</SmartLink>
            <SmartLink to="/portfolio">Portfolio</SmartLink>
            <SmartLink to="/about">Over Ons</SmartLink>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copy">
            BTW BE1037894456 | &copy; 2026 VIDEJO. Alle rechten voorbehouden |{" "}
            <SmartLink to="/cookies">Cookiebeleid</SmartLink> |{" "}
            <SmartLink to="/privacy">Privacybeleid</SmartLink> |{" "}
            <SmartLink to="/voorwaarden">Algemene Voorwaarden</SmartLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
