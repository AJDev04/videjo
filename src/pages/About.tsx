import Seo from "../components/Seo";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import aboutCss from "../../css/about.css?inline";

// Vertaalbare paginatitel (FR/EN later); "VIDEJO" (woordmerk) vertaalt niet mee.
// Leest samen met het woordmerk als "OVER VIDEJO" (titel boven het merk).
const PAGE_TITLE = "Over";

// Bio's van de oprichters. De foto's komen op /images/{joren,alexandre}.jpg;
// tot ze er zijn toont een navy placeholder met de naam.
const FOUNDERS = [
  {
    name: "Joren",
    photo: "/images/joren.jpg",
    lead: "Mijn passie voor beeld ontstond niet achter een scherm, maar door familie. Ik kreeg die fascinatie mee van mijn vader, die het meekreeg van mijn grootvader.",
    body: "Ik volg ondertussen al 4 jaar Multimedia (2 in het middelbaar en 2 in mijn bacheloropleiding). Ik ben zelf ook constant bezig met cinematografie, drones, motion graphics, .... Het is dan ook iets waar ik enorm veel interesse in heb.",
    reverse: false,
  },
  {
    name: "Alexandre",
    photo: "/images/alexandre.jpg",
    lead: "Mijn passie voor filmen is iets dat altijd al aanwezig was, maar deze is alleen maar sterker geworden. Ik ontdekte hoe krachtig beelden kunnen zijn en hoe deze worden geïnterpreteerd.",
    body: "Ik volg momenteel Sales en Marketing, hierbij leer ik hoe belangrijk het is om de klant centraal te stellen. Die klantgerichte mindset probeer ik ook door te trekken in al onze projecten: verhalen creëren die aansluiten bij de doelgroep en echt impact maken.",
    reverse: true,
  },
];

export const Component = () => (
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

    <BrandHero title={PAGE_TITLE} titleAbove />

    <TabSection title="Ons Team">
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
