import Seo from "../components/Seo";
import SmartLink from "../components/SmartLink";
import VidejoLogo from "../components/VidejoLogo";
import ProjectsSection from "../components/ProjectsSection";
import ExpertiseSection from "../components/ExpertiseSection";
import indexCss from "../../css/index.css?inline";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "VIDEJO",
  description: "Commerciële videoproductie in België",
  url: "https://videjo.be",
  email: "videjo.be@gmail.com",
  telephone: "+32494276276",
  address: { "@type": "PostalAddress", addressCountry: "BE" },
  founders: [
    { "@type": "Person", name: "Joren Frederickx" },
    { "@type": "Person", name: "Alexandre Rutkowski" },
  ],
};

export const Component = () => {
  return (
    <>
      <Seo
        title="VIDEJO | Commerciële Videoproductie in België"
        description="VIDEJO maakt commerciële video's die merken tot leven brengen. Van concept tot eindproduct — wij vertellen jouw verhaal. Gevestigd in België."
        keywords="videoproductie België, commerciële video, videograaf, drone video, motion graphics, branded content"
        author="VIDEJO"
        canonical="https://videjo.be/"
        og={{
          title: "VIDEJO | Commerciële Videoproductie in België",
          description:
            "Wij maken commerciële video's die merken tot leven brengen. Van concept tot eindproduct.",
          type: "website",
          url: "https://videjo.be/",
          image: "https://videjo.be/images/og-image.jpg",
          locale: "nl_BE",
        }}
        jsonLd={JSON_LD}
        pageCss={indexCss}
      />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <VidejoLogo className="hero-logo" />
          <h1 className="hero-title">
            <span className="title-line">Stories in motion,</span>
            <span className="title-line">captured from every angle.</span>
          </h1>
          <div className="hero-buttons">
            <SmartLink to="mailto:videjo.be@gmail.com" className="btn btn-primary">
              Let's talk
            </SmartLink>
            <SmartLink to="/portfolio" className="btn btn-outline">
              Projecten
            </SmartLink>
          </div>
        </div>
      </section>

      {/* Projecten Section */}
      <ProjectsSection />

      {/* Expertise Section */}
      <ExpertiseSection />

      {/* Klanten Section */}
      <section className="clients" id="klanten">
        <div className="clients-tab">
          <h2 className="clients-title">Klanten</h2>
        </div>
        <div className="clients-band">
          <img
            className="client-logo client-tmis"
            src="/images/clients/tmisverstand.svg"
            alt="Restaurant 't Misverstand"
          />
          <img
            className="client-logo client-appel"
            src="/images/clients/appelmans.svg"
            alt="Appelmans"
          />
          <img
            className="client-logo client-moss"
            src="/images/clients/mossmasters.svg"
            alt="Mossmasters"
          />
          <img
            className="client-logo client-prim"
            src="/images/clients/primero.svg"
            alt="Primero"
          />
        </div>
      </section>
    </>
  );
};
