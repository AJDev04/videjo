import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { ClientOnly } from "vite-react-ssg";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import SmartLink from "../components/SmartLink";
import DomeGallery from "../components/DomeGallery";
import { CardContainer, CardBody, CardItem } from "../components/ThreeDCard";
import { useT } from "../lib/i18n";
import { useLanguage } from "../lib/lang";
import { localized } from "../lib/projects";
import { useProjects } from "../lib/useProjects";
import projectenCss from "../../css/projecten.css?inline";

// Gallerij-afbeeldingen zijn voorlopig placeholders uit de bestaande assets;
// Joren levert later de echte "niet-voor-een-klant"-foto's aan.
const GALLERY_IMAGES = [
  { src: "/images/film.jpg", alt: "Film" },
  { src: "/images/drone.jpg", alt: "Drone" },
  { src: "/images/auto.jpg", alt: "Auto" },
  { src: "/images/fotografie.JPG", alt: "Fotografie" },
  { src: "/images/mg.png", alt: "Motion graphics" },
  { src: "/images/og-image.jpg", alt: "VIDEJO" },
];

/**
 * Wrapper rond de DomeGallery: op gsm grotere/dichtere tegels (minder segments)
 * binnen een full-bleed container; op desktop het ruimere ontwerp.
 */
function GalleryDome() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <DomeGallery
      images={GALLERY_IMAGES}
      fit={1}
      minRadius={300}
      maxVerticalRotationDeg={10}
      segments={mobile ? 16 : 20}
      dragDampening={0.4}
      overlayBlurColor="#26225e"
      grayscale={false}
      openedImageWidth=""
      openedImageHeight=""
      autoRotateSpeed={5}
    />
  );
}

export const Component = () => {
  const t = useT();
  const { lang } = useLanguage();
  const { projects } = useProjects();
  return (
  <>
    <Seo
      title="Projecten | VIDEJO — Onze Videoprojecten"
      description="Bekijk de projecten van VIDEJO: commerciële video's, cinematografie, drone opnames en motion graphics voor Belgische merken."
      canonical="https://videjo.be/projecten"
      og={{
        title: "Projecten | VIDEJO — Onze Videoprojecten",
        description:
          "Bekijk onze commerciële video's, drone opnames en motion graphics.",
        type: "website",
        url: "https://videjo.be/projecten",
        image: "https://videjo.be/images/og-image.jpg",
        locale: "nl_BE",
      }}
      pageCss={projectenCss}
    />

    <BrandHero title={t.projecten.title} />

    <TabSection title={t.projecten.clients}>
      <div className="proj-clients-grid">
        {projects.map((p) => (
          <SmartLink
            className="proj-client-link"
            to={`/projecten/${p.slug}`}
            key={p.slug}
            aria-label={localized(p.name, lang)}
          >
            <CardContainer
              containerClassName="proj-client-persp"
              className="proj-client-tilt"
            >
              <CardBody className="proj-client-card">
                <CardItem translateZ={80} className="proj-client-logo-wrap">
                  <img className="proj-client-logo" src={p.logo} alt="" />
                </CardItem>
              </CardBody>
            </CardContainer>
          </SmartLink>
        ))}
      </div>
    </TabSection>

    <section className="proj-gallery">
      <div className="proj-gallery-head">
        <h2 className="proj-gallery-title">{t.projecten.galleryTitle}</h2>
        <p className="proj-gallery-text">{t.projecten.galleryText}</p>
      </div>
      <div className="proj-gallery-dome">
        <ClientOnly>{() => <GalleryDome />}</ClientOnly>
      </div>
    </section>
  </>
  );
};
