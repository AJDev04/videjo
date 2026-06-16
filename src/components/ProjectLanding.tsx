import Seo from "./Seo";
import SmartLink from "./SmartLink";
import projectLandingCss from "./ProjectLanding.css?inline";

/**
 * Landing-hero van een individuele projectpagina: full-screen paars vlak met het
 * klantlogo gecentreerd en linksboven een ronde terug-knop (standaard terug naar
 * de Projecten-overzichtspagina). De CSS wordt — net als bij BrandHero — via
 * `?inline` met een <style> meegegeven zodat ze in de per-pagina-CSS-aanpak past.
 * Verdere projectssecties komen later ónder deze hero (sectie-per-sectie).
 */
export default function ProjectLanding({
  logo,
  name,
  canonical,
  back = "/projecten",
}: {
  logo: string;
  name: string;
  canonical: string;
  back?: string;
}) {
  return (
    <>
      <Seo title={`${name} | VIDEJO`} canonical={canonical} />
      <section className="proj-landing">
        <style dangerouslySetInnerHTML={{ __html: projectLandingCss }} />

        <SmartLink to={back} className="proj-back" aria-label="Terug naar projecten">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </SmartLink>

        <img className="proj-landing-logo" src={logo} alt={name} />
      </section>
    </>
  );
}
