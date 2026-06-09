import Seo from "../components/Seo";
import SmartLink from "../components/SmartLink";
import cookiesCss from "../../css/cookies.css?inline";

export const Component = () => (
  <>
    <Seo
      title="Cookiebeleid | VIDEJO"
      description="Het cookiebeleid van VIDEJO — welke cookies we gebruiken en waarom."
      canonical="https://videjo.be/cookies"
      pageCss={cookiesCss}
    />

    <SmartLink className="back-link" to="/">
      ← Terug naar VIDEJO
    </SmartLink>

    <div className="page-wrapper">
      <div className="page-header">
        <p className="label">Juridisch — Privacybeleid</p>
        <h1>Cookiebeleid</h1>
        <p className="last-updated">Laatst bijgewerkt: mei 2026</p>
      </div>

      <div className="intro-block">
        Deze website gebruikt alleen technisch noodzakelijke cookies. We plaatsen
        geen tracking- of advertentiecookies. U hoeft hier geen actie voor te
        ondernemen.
      </div>

      <div className="section">
        <h2>Wat zijn cookies?</h2>
        <p>
          Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen
          wanneer u een website bezoekt. Ze helpen de website correct te
          functioneren.
        </p>
      </div>

      <div className="section">
        <h2>Welke cookies gebruiken wij?</h2>
        <p>
          VIDEJO gebruikt uitsluitend functionele en technisch noodzakelijke
          cookies, geplaatst door de diensten die we inzetten om de website te
          laten werken.
        </p>

        <table className="cookie-table">
          <thead>
            <tr>
              <th>Dienst</th>
              <th>Doel</th>
              <th>Type</th>
              <th>Bewaartijd</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong style={{ color: "var(--cream)" }}>EmailJS</strong>
              </td>
              <td>Verwerking van berichten via het contactformulier</td>
              <td>
                <span className="badge nodig">Functioneel</span>
              </td>
              <td>Sessie</td>
            </tr>
            <tr>
              <td>
                <strong style={{ color: "var(--cream)" }}>Combell</strong>
              </td>
              <td>Webhosting en laadoptimalisatie</td>
              <td>
                <span className="badge nodig">Technisch</span>
              </td>
              <td>Sessie</td>
            </tr>
          </tbody>
        </table>

        <p>
          We gebruiken geen Google Analytics, Facebook Pixel, of andere tracking-
          of advertentiediensten.
        </p>
      </div>

      <div className="section">
        <h2>Cookies weigeren of verwijderen</h2>
        <p>
          Omdat we enkel technisch noodzakelijke cookies gebruiken, is uw
          toestemming hiervoor niet vereist. U kunt cookies altijd verwijderen
          via de instellingen van uw browser:
        </p>
        <p>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a>
          {" · "}
          <a href="https://support.mozilla.org/nl/kb/cookies-verwijderen-gegevens-wissen-websites-opgeslagen" target="_blank" rel="noopener">Firefox</a>
          {" · "}
          <a href="https://support.apple.com/nl-be/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a>
          {" · "}
          <a href="https://support.microsoft.com/nl-nl/windows/cookies-verwijderen-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge</a>
        </p>
      </div>

      <div className="section">
        <h2>Vragen?</h2>
        <div className="contact-block">
          <p style={{ marginBottom: "0.5rem", color: "var(--cream)" }}>VIDEJO</p>
          <p style={{ marginBottom: "0.25rem" }}>
            Joren Frederickx &amp; Alexandre Rutkowski
          </p>
          <p style={{ marginBottom: "0.25rem" }}>BTW: BE1037894456</p>
          <p>
            <a href="mailto:videjo.be@gmail.com">videjo.be@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-note">
        <span>
          © 2026 VIDEJO. Alle rechten voorbehouden |{" "}
          <SmartLink to="/cookies">Cookiebeleid</SmartLink>
        </span>
        <span>BTW BE1037894456 — België — GDPR-conform</span>
      </div>
    </div>
  </>
);
