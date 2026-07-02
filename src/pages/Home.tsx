import { useState } from "react";
import { Head } from "vite-react-ssg";
import Seo from "../components/Seo";
import SmartLink from "../components/SmartLink";
import VidejoLogo from "../components/VidejoLogo";
import ProjectsSection from "../components/ProjectsSection";
import ExpertiseSection from "../components/ExpertiseSection";
import { useT } from "../lib/i18n";
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

const CF_STREAM_BASE = "https://customer-el0steweaibtzxvs.cloudflarestream.com/f8659fb1515bf433a909b062d8b6fff4";
const HERO_MP4 = `${CF_STREAM_BASE}/downloads/default.mp4`;
const HERO_THUMBNAIL = `${CF_STREAM_BASE}/thumbnails/thumbnail.jpg?time=0s&height=1080`;

const CLIENTS = [
  {
    cls: "client-tmis",
    src: "/images/clients/tmisverstand.svg",
    alt: "Restaurant 't Misverstand",
  },
  { cls: "client-appel", src: "/images/clients/appelmans.svg", alt: "Appelmans" },
  { cls: "client-moss", src: "/images/clients/mossmasters.svg", alt: "Mossmasters" },
  { cls: "client-prim", src: "/images/clients/primero.svg", alt: "Primero" },
];

export const Component = () => {
  const t = useT();
  const [videoReady, setVideoReady] = useState(false);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://customer-el0steweaibtzxvs.cloudflarestream.com" />
        <link rel="dns-prefetch" href="https://customer-el0steweaibtzxvs.cloudflarestream.com" />
      </Head>
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
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${HERO_THUMBNAIL})` }}
        >
          <video
            className="hero-video"
            src={HERO_MP4}
            poster={HERO_THUMBNAIL}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.8s ease" }}
            onPlaying={() => setVideoReady(true)}
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <VidejoLogo className="hero-logo" />
          <h1 className="hero-title">
            <span className="title-line">{t.home.heroLine1}</span>
            <span className="title-line">{t.home.heroLine2}</span>
          </h1>
          <div className="hero-buttons">
            <SmartLink to="/contact" className="btn btn-primary">
              {t.home.talk}
            </SmartLink>
            <SmartLink to="/projecten" className="btn btn-outline">
              {t.home.projecten}
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
          <h2 className="clients-title">{t.home.clients}</h2>
        </div>

        {/* Desktop: statische rij (doorlopende marquee komt hier later, als er
            genoeg klanten zijn) */}
        <div className="clients-band">
          {CLIENTS.map((c) => (
            <img
              key={c.cls}
              className={`client-logo ${c.cls}`}
              src={c.src}
              alt={c.alt}
            />
          ))}
        </div>

        {/* Mobiel: doorlopende 1-rij marquee (lijst meermaals herhaald voor een
            naadloze loop) */}
        <div className="clients-marquee" aria-hidden="true">
          <div className="clients-marquee-track">
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
              <img
                key={i}
                className={`client-logo ${c.cls}`}
                src={c.src}
                alt=""
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
