import ServicePage from "../components/ServicePage";
import serviceCss from "../../css/service.css?inline";

export const Component = () => (
  <ServicePage
    theme="svc-film"
    heroId="film-hero"
    ctaId="contact-film"
    label="Videografie"
    titleLines={["Unique visions", "set in frame"]}
    subtitle="Dynamische beelden vastgelegd en verwerkt."
    showcaseDescription="We maken gebruik van hoogwaardig en doordacht gekozen camera gear om elk project visueel tot zijn recht te laten komen. Dankzij onze focus op kwaliteit en detail creëren we sterke, professionele beelden die perfect inspelen op de verwachtingen van onze klanten. Van opname tot afwerking streven we telkens naar het beste resultaat."
    stats={[
      { number: "4K", label: "Resolutie" },
      { number: "Voor Elke", label: "Situatie" },
      { number: "Ultieme", label: "Stabilisatie" },
    ]}
    servicesTitle="Waar wij voor filmen"
    services={[
      { number: "01", title: "Vastgoed", desc: "Shots vanbinnen en buiten." },
      {
        number: "02",
        title: "Events",
        desc: "De mooiste momenten van evenementen vastleggen.",
      },
      {
        number: "03",
        title: "Commercials",
        desc: "Professionele reclamevideo's voor uw merk.",
      },
      {
        number: "04",
        title: "Toerisme",
        desc: "Prachtige beelden van toeristische bestemmingen.",
      },
      {
        number: "05",
        title: "Auto Shots",
        desc: "Buiten en binnen shots van uw auto.",
      },
      {
        number: "06",
        title: "Sociale Media",
        desc: "Een reclameboost voor uw sociale media presence.",
      },
    ]}
    ctaHeading="Klaar om visies naar realiteit te brengen?"
    ctaParagraph="Laten we bespreken hoe videografie jouw project naar een hoger niveau kan tillen."
    seo={{
      title: "VIDEJO",
      canonical: "https://videjo.be/film",
      pageCss: serviceCss,
    }}
  />
);
