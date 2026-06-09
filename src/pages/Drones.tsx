import ServicePage from "../components/ServicePage";
import serviceCss from "../../css/service.css?inline";

export const Component = () => (
  <ServicePage
    theme="svc-drones"
    heroId="drone-hero"
    ctaId="contact-drones"
    label="Drone Video"
    titleLines={["Perspectives", "from above"]}
    subtitle="Cinematische dronebeelden die jouw verhaal naar nieuwe hoogtes tillen."
    showcaseDescription="Wij werken met moderne en performante drones om hoogwaardige luchtbeelden te realiseren. Dankzij onze flexibele en compacte apparatuur kunnen we op uiteenlopende locaties vliegen en inspelen op de noden van elk project. Dit stelt ons in staat om creatieve, professionele beelden te leveren die perfect passen binnen commerciële toepassingen."
    stats={[
      { number: "4K", label: "Cinematisch" },
      { number: "ActiveTrack", label: "Functie" },
      { number: "3-Axis", label: "Gimbal" },
    ]}
    servicesTitle="Waar wij voor vliegen"
    services={[
      {
        number: "01",
        title: "Vastgoed",
        desc: "Luchtopnames die gebouwen en terreinen vanuit hun meest indrukwekkende hoeken tonen — ideaal voor makelaars, projectontwikkelaars en architecten.",
      },
      {
        number: "02",
        title: "Events",
        desc: "Dynamische luchtperspectieven van festivals, sportwedstrijden en bedrijfsevents die de sfeer vastleggen zoals geen cameraman op de grond dat kan.",
      },
      {
        number: "03",
        title: "Commercials",
        desc: "Cinematische droneshots die jouw merkvideo’s onmiddellijk naar een hoger niveau tillen.",
      },
      {
        number: "04",
        title: "Toerisme",
        desc: "Aantrekkelijke dronebeelden die regio’s, hotels en bestemmingen visueel onweerstaanbaar maken.",
      },
      {
        number: "05",
        title: "Auto Shots",
        desc: "Unieke beelden waar uw voertuig in perspectief wordt gezet op een manier die u nog nooit eerder heeft gezien.",
      },
      {
        number: "06",
        title: "Natuur & Landschap",
        desc: "Adembenemende beelden van bossen, bergen, kustlijnen en open velden.",
      },
    ]}
    ctaHeading="Klaar om op te stijgen?"
    ctaParagraph="Benieuwd hoe drone cinematografie jouw video nog sterker maakt? Dankzij onze A1/A3 certificatie, opleiding in dronebouw en professionele DJI‑uitrusting vliegen wij veilig en legaal op de meeste locaties. (Niet alle locaties zijn legaal om te vliegen door geografische UAS-Zones, maar wij helpen je graag de mogelijkheden te verkennen!)"
    seo={{
      title: "VIDEJO",
      canonical: "https://videjo.be/drones",
      pageCss: serviceCss,
    }}
  />
);
