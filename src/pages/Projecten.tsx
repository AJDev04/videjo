import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import { ClientOnly } from "vite-react-ssg";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import DomeGallery from "../components/DomeGallery";
import { useT } from "../lib/i18n";
import projectenCss from "../../css/projecten.css?inline";

// De klantnamen zijn merknamen en blijven ongewijzigd; cls stuurt de per-logo
// sizing (verschillende ratio's). Titels/intro komen vertaald uit i18n.
const CLIENTS = [
  { cls: "is-prim", src: "/images/clients/primero.svg", alt: "Primero" },
  { cls: "is-tmis", src: "/images/clients/tmisverstand.svg", alt: "Restaurant 't Misverstand" },
  { cls: "is-moss", src: "/images/clients/mossmasters.svg", alt: "Mossmasters" },
  { cls: "is-appel", src: "/images/clients/appelmans.svg", alt: "Appelmans" },
];

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
        {CLIENTS.map((c) => (
          <div className={`proj-client-card ${c.cls}`} key={c.cls}>
            <img className="proj-client-logo" src={c.src} alt={c.alt} />
          </div>
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
