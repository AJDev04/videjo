import ServicePage from "../components/ServicePage";
import serviceCss from "../../css/service.css?inline";

export const Component = () => (
  <ServicePage
    theme="svc-motion"
    heroId="motion-hero"
    ctaId="contact-motion"
    label="Motion Graphics"
    titleLines={["Graphic Designs", "Brought To Life"]}
    subtitle="Grafische elementen die worden geanimeerd om verhalen te vertellen."
    showcaseDescription="Wij werken met professionele software en krachtige hardware om motion graphics van hoge kwaliteit te creëren. Onze setup is geoptimaliseerd voor snelheid, stabiliteit en flexibiliteit, waardoor we efficiënt complexe projecten kunnen uitwerken en verfijnen. Zowel in onze vaste werkomgeving als onderweg beschikken we over performante systemen en voldoende opslag, zodat we altijd en overal vlot kunnen werken en consistente resultaten kunnen leveren."
    stats={[
      { number: "Krachtigste PC", label: "Op De Markt" },
      { number: "Beste Software", label: "Beschikbaar" },
      { number: "30+ Terrabyte", label: "Aan Totale Opslag" },
    ]}
    servicesTitle="Waar we voor editen"
    services={[
      {
        number: "01",
        title: "Logo Animaties",
        desc: "Een prachtig logo tot leven brengen door middel van animatie.",
      },
      {
        number: "02",
        title: "Infographics",
        desc: "Informatieve video op een creatieve manier gebracht.",
      },
      {
        number: "03",
        title: "Commerciële Video's",
        desc: "Korte, impactvolle Motion Graphics verwerken in uw video's.",
      },
    ]}
    ctaHeading="Klaar om designs tot leven te brengen?"
    ctaParagraph="Laten we bespreken hoe Motion Graphics jouw project naar een hoger niveau kan tillen."
    seo={{
      title: "VIDEJO",
      canonical: "https://videjo.be/motion",
      pageCss: serviceCss,
    }}
  />
);
