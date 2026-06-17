import Seo from "../components/Seo";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import { useT } from "../lib/i18n";
import aboutCss from "../../css/about.css?inline";

// Naam/foto/layout van de oprichters zijn taal-onafhankelijk; de bio-tekst
// (lead/body) komt vertaald uit i18n (gekoppeld op index). Foto's (tijdelijk) op
// Cloudflare Images; bij een laadfout valt een navy placeholder in (onError).
const CF_IMAGES = "https://imagedelivery.net/VikWnsttIHX_i1Cykp4eeA";
const FOUNDER_META = [
  { name: "Joren", photo: `${CF_IMAGES}/fcb08dcc-95ab-4999-3c90-9010702abe00/public`, reverse: false },
  { name: "Alexandre", photo: `${CF_IMAGES}/9dff8007-7404-4780-325c-62aa65190a00/public`, reverse: true },
];

export const Component = () => {
  const t = useT();
  const FOUNDERS = FOUNDER_META.map((f, i) => ({ ...f, ...t.about.founders[i] }));
  return (
  <>
    <Seo
      title="Over Ons | VIDEJO — Joren & Alexandre"
      description="Leer VIDEJO kennen: Joren Frederickx en Alexandre Rutkowski, twee jonge Belgische creatievelingen gepassioneerd door videografie, drone en storytelling."
      canonical="https://videjo.be/about"
      og={{
        title: "Over Ons | VIDEJO — Joren & Alexandre",
        description:
          "Maak kennis met de mensen achter VIDEJO: twee gepassioneerde videomakers uit België.",
        type: "website",
        url: "https://videjo.be/about",
        image: "https://videjo.be/images/og-image.jpg",
        locale: "nl_BE",
      }}
      pageCss={aboutCss}
    />

    <BrandHero title={t.about.title} titleAbove />

    <TabSection title={t.about.team}>
      <div className="founders">
        {FOUNDERS.map((f) => (
          <article
            className={`founder${f.reverse ? " founder--reverse" : ""}`}
            key={f.name}
          >
            <h2 className="founder-name">{f.name}</h2>
            <div className="founder-grid">
              <div className="founder-photo">
                <img
                  src={f.photo}
                  alt={f.name}
                  onError={(e) => {
                    const el = e.currentTarget;
                    el.onerror = null;
                    el.src = `https://placehold.co/600x750/26225e/faf8ce?text=${f.name}`;
                  }}
                />
              </div>
              <div className="founder-text">
                <p className="founder-lead">{f.lead}</p>
                <p className="founder-body">{f.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </TabSection>
  </>
  );
};
