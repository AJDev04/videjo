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

// Gallerij-foto's (Cloudflare Images). De volgorde is bewust dooreengehaald
// zodat opeenvolgende foto's uit de aangeleverde lijst (bv. auto-shots) niet
// naast elkaar in de dome belanden.
const CF_IMAGES = "https://imagedelivery.net/VikWnsttIHX_i1Cykp4eeA";
const img = (id: string) => ({ src: `${CF_IMAGES}/${id}/public`, alt: "VIDEJO fotografie" });

const GALLERY_IMAGES = [
  img("e7c8e39e-411c-4406-3986-30488edc5900"),
  img("492f18a7-2a6f-49fc-1b34-57cea66a0400"),
  img("7d95e18a-cb43-4938-8159-284d601f2c00"),
  img("0c7738bc-f9a7-4309-5be2-f2dc56abcb00"),
  img("5cda2b1f-4bc5-427e-db61-72c66a578900"),
  img("29d3894e-e755-4d2f-6143-71ec165b0600"),
  img("e0e734d0-8954-4387-bf35-cd9ef4441200"),
  img("eb21fcb0-9e10-4428-b206-72172fbc6500"),
  img("7ae99c53-1080-47c2-a385-eed4acf8f500"),
  img("5cb327d0-11da-4550-3adb-2fa84ae84d00"),
  img("58427d05-a4a8-42bf-df91-e97f2df4d800"),
  img("d5db942e-81c6-4637-7e7d-e909e6907000"),
  img("2472d0ef-7a9a-4896-72b3-693815991a00"),
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
