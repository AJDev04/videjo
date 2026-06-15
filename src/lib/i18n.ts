import { useLanguage, type Lang } from "./lang";

/**
 * Centrale vertaal-laag. NL is de bron (1-op-1 de bestaande site-tekst); FR en
 * EN moeten exact dezelfde vorm hebben (TypeScript dwingt dat af via `Strings`),
 * zodat een vergeten sleutel meteen een compile-fout geeft.
 *
 * Merknamen vertalen NIET mee: "VIDEJO", de tegel-labels (Film/Drones/Motion/
 * Photo) en de Engelse stijl-CTA's ("Let's talk", "Let's work Together") en de
 * Engelse hero-taglines blijven in elke taal gelijk — dat is een bewuste keuze
 * in de huisstijl. Vertaal je die later toch, dan kan dat gewoon hier.
 */

interface Founder {
  lead: string;
  body: string;
}
interface FilterContent {
  desc: string;
  what: string;
  tags: string[];
}
interface Stat {
  number: string;
  label: string;
}
interface ServiceItem {
  number: string;
  title: string;
  desc: string;
}
interface ServiceContent {
  label: string;
  titleLines: [string, string];
  subtitle: string;
  showcaseDescription: string;
  stats: Stat[];
  servicesTitle: string;
  services: ServiceItem[];
  ctaHeading: string;
  ctaParagraph: string;
}

const nl = {
  nav: {
    home: "Home",
    projecten: "Projecten",
    expertise: "Expertise",
    about: "Over Ons",
    contact: "Contact",
    talk: "Let's talk",
  },
  footer: {
    pages: "Pages",
    links: "Links",
    legal: "Legaal",
    policy: "Policy",
    cookies: "Cookies",
    privacy: "Privacy",
    ctaLine1: "Let’s work",
    ctaLine2: "Together",
    rights: "Alle rechten voorbehouden",
  },
  home: {
    heroLine1: "Stories in motion,",
    heroLine2: "captured from every angle.",
    talk: "Let's talk",
    projecten: "Projecten",
    clients: "Klanten",
  },
  projectsSection: {
    title: "Projecten",
    text: "Van merkfilms tot drone- en socialcontent: dit is een greep uit de projecten waar we ons met volle goesting in hebben vastgebeten. Elk met zijn eigen verhaal, sfeer en aanpak — van het allereerste idee tot de laatste cut. Scroll erdoorheen en ontdek wat we voor jou kunnen betekenen.",
    cta: "Bekijk alle projecten",
    prev: "Vorige projecten",
    next: "Volgende projecten",
  },
  expertiseSection: {
    title: "Expertise",
    text: "Film, drones, motion en fotografie verenigen we onder één dak. Daardoor bouwen we elke productie van het eerste concept tot de finale beelden volledig in eigen beheer op — telkens afgestemd op jouw merk, je verhaal en je publiek. Beweeg over de tegels en ontdek waar we sterk in zijn.",
    cta: "Ontdek onze expertise",
  },
  projecten: {
    title: "Projecten",
    clients: "Klanten",
    galleryTitle: "Gallerij",
    galleryText: "Dit is een fotogallerij van beelden die niet voor een klant waren.",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        desc: "Laten we bespreken hoe videografie jouw project naar een hoger niveau kan tillen.",
        what: "Wat we filmen",
        tags: ["Sociale Media", "Events", "Bedrijven", "Vastgoed"],
      },
      drones: {
        desc: "Laten we bespreken hoe luchtbeelden jouw verhaal een uniek perspectief geven.",
        what: "Wat we capteren",
        tags: ["Vastgoed", "Events", "Natuur", "Bedrijven"],
      },
      motion: {
        desc: "Laten we bespreken hoe motion graphics jouw boodschap echt tot leven brengen.",
        what: "Wat we maken",
        tags: ["Logo-animaties", "Explainers", "Intro's", "Socials"],
      },
      photo: {
        desc: "Laten we bespreken hoe fotografie jouw merk scherp en stijlvol in beeld brengt.",
        what: "Wat we fotograferen",
        tags: ["Producten", "Portretten", "Events", "Bedrijven"],
      },
    } as Record<string, FilterContent>,
  },
  about: {
    title: "Over",
    team: "Ons Team",
    founders: [
      {
        lead: "Mijn passie voor beeld ontstond niet achter een scherm, maar door familie. Ik kreeg die fascinatie mee van mijn vader, die het meekreeg van mijn grootvader.",
        body: "Ik volg ondertussen al 4 jaar Multimedia (2 in het middelbaar en 2 in mijn bacheloropleiding). Ik ben zelf ook constant bezig met cinematografie, drones, motion graphics, .... Het is dan ook iets waar ik enorm veel interesse in heb.",
      },
      {
        lead: "Mijn passie voor filmen is iets dat altijd al aanwezig was, maar deze is alleen maar sterker geworden. Ik ontdekte hoe krachtig beelden kunnen zijn en hoe deze worden geïnterpreteerd.",
        body: "Ik volg momenteel Sales en Marketing, hierbij leer ik hoe belangrijk het is om de klant centraal te stellen. Die klantgerichte mindset probeer ik ook door te trekken in al onze projecten: verhalen creëren die aansluiten bij de doelgroep en echt impact maken.",
      },
    ] as Founder[],
  },
  contact: {
    title: "Contact",
    tagline: "Laten we jouw visie een realiteit maken.",
    naam: "Naam",
    naamPh: "Je naam",
    bedrijf: "Bedrijf",
    bedrijfPh: "Optioneel",
    email: "E-mail",
    emailPh: "jij@voorbeeld.be",
    project: "Project",
    projectPh: "Vertel kort waar we je mee kunnen helpen…",
    submit: "Verstuur bericht",
    note: "Bedankt! Je e-mailprogramma opent met je bericht klaar om te versturen.",
    subject: (naam: string) => `Nieuwe aanvraag — ${naam || "website"}`,
    bodyNaam: "Naam",
    bodyBedrijf: "Bedrijf",
    bodyEmail: "E-mail",
    bodyProject: "Project:",
  },
  cookie: {
    text: "Deze site gebruikt technisch noodzakelijke cookies.",
    more: "Meer info",
    ok: "Begrepen",
  },
  service: {
    material: "Ons Materiaal",
    applications: "Toepassingen",
    scrollHint: "Scroll om te verkennen",
    contactCta: "Neem contact op",
  },
  services: {
    film: {
      label: "Videografie",
      titleLines: ["Unique visions", "set in frame"],
      subtitle: "Dynamische beelden vastgelegd en verwerkt.",
      showcaseDescription:
        "We maken gebruik van hoogwaardig en doordacht gekozen camera gear om elk project visueel tot zijn recht te laten komen. Dankzij onze focus op kwaliteit en detail creëren we sterke, professionele beelden die perfect inspelen op de verwachtingen van onze klanten. Van opname tot afwerking streven we telkens naar het beste resultaat.",
      stats: [
        { number: "4K", label: "Resolutie" },
        { number: "Voor Elke", label: "Situatie" },
        { number: "Ultieme", label: "Stabilisatie" },
      ],
      servicesTitle: "Waar wij voor filmen",
      services: [
        { number: "01", title: "Vastgoed", desc: "Shots vanbinnen en buiten." },
        { number: "02", title: "Events", desc: "De mooiste momenten van evenementen vastleggen." },
        { number: "03", title: "Commercials", desc: "Professionele reclamevideo's voor uw merk." },
        { number: "04", title: "Toerisme", desc: "Prachtige beelden van toeristische bestemmingen." },
        { number: "05", title: "Auto Shots", desc: "Buiten en binnen shots van uw auto." },
        { number: "06", title: "Sociale Media", desc: "Een reclameboost voor uw sociale media presence." },
      ],
      ctaHeading: "Klaar om visies naar realiteit te brengen?",
      ctaParagraph: "Laten we bespreken hoe videografie jouw project naar een hoger niveau kan tillen.",
    },
    drones: {
      label: "Drone Video",
      titleLines: ["Perspectives", "from above"],
      subtitle: "Cinematische dronebeelden die jouw verhaal naar nieuwe hoogtes tillen.",
      showcaseDescription:
        "Wij werken met moderne en performante drones om hoogwaardige luchtbeelden te realiseren. Dankzij onze flexibele en compacte apparatuur kunnen we op uiteenlopende locaties vliegen en inspelen op de noden van elk project. Dit stelt ons in staat om creatieve, professionele beelden te leveren die perfect passen binnen commerciële toepassingen.",
      stats: [
        { number: "4K", label: "Cinematisch" },
        { number: "ActiveTrack", label: "Functie" },
        { number: "3-Axis", label: "Gimbal" },
      ],
      servicesTitle: "Waar wij voor vliegen",
      services: [
        { number: "01", title: "Vastgoed", desc: "Luchtopnames die gebouwen en terreinen vanuit hun meest indrukwekkende hoeken tonen — ideaal voor makelaars, projectontwikkelaars en architecten." },
        { number: "02", title: "Events", desc: "Dynamische luchtperspectieven van festivals, sportwedstrijden en bedrijfsevents die de sfeer vastleggen zoals geen cameraman op de grond dat kan." },
        { number: "03", title: "Commercials", desc: "Cinematische droneshots die jouw merkvideo’s onmiddellijk naar een hoger niveau tillen." },
        { number: "04", title: "Toerisme", desc: "Aantrekkelijke dronebeelden die regio’s, hotels en bestemmingen visueel onweerstaanbaar maken." },
        { number: "05", title: "Auto Shots", desc: "Unieke beelden waar uw voertuig in perspectief wordt gezet op een manier die u nog nooit eerder heeft gezien." },
        { number: "06", title: "Natuur & Landschap", desc: "Adembenemende beelden van bossen, bergen, kustlijnen en open velden." },
      ],
      ctaHeading: "Klaar om op te stijgen?",
      ctaParagraph: "Benieuwd hoe drone cinematografie jouw video nog sterker maakt? Dankzij onze A1/A3 certificatie, opleiding in dronebouw en professionele DJI‑uitrusting vliegen wij veilig en legaal op de meeste locaties. (Niet alle locaties zijn legaal om te vliegen door geografische UAS-Zones, maar wij helpen je graag de mogelijkheden te verkennen!)",
    },
    motion: {
      label: "Motion Graphics",
      titleLines: ["Graphic Designs", "Brought To Life"],
      subtitle: "Grafische elementen die worden geanimeerd om verhalen te vertellen.",
      showcaseDescription:
        "Wij werken met professionele software en krachtige hardware om motion graphics van hoge kwaliteit te creëren. Onze setup is geoptimaliseerd voor snelheid, stabiliteit en flexibiliteit, waardoor we efficiënt complexe projecten kunnen uitwerken en verfijnen. Zowel in onze vaste werkomgeving als onderweg beschikken we over performante systemen en voldoende opslag, zodat we altijd en overal vlot kunnen werken en consistente resultaten kunnen leveren.",
      stats: [
        { number: "Krachtigste PC", label: "Op De Markt" },
        { number: "Beste Software", label: "Beschikbaar" },
        { number: "30+ Terrabyte", label: "Aan Totale Opslag" },
      ],
      servicesTitle: "Waar we voor editen",
      services: [
        { number: "01", title: "Logo Animaties", desc: "Een prachtig logo tot leven brengen door middel van animatie." },
        { number: "02", title: "Infographics", desc: "Informatieve video op een creatieve manier gebracht." },
        { number: "03", title: "Commerciële Video's", desc: "Korte, impactvolle Motion Graphics verwerken in uw video's." },
      ],
      ctaHeading: "Klaar om designs tot leven te brengen?",
      ctaParagraph: "Laten we bespreken hoe Motion Graphics jouw project naar een hoger niveau kan tillen.",
    },
  } as Record<"film" | "drones" | "motion", ServiceContent>,
};

export type Strings = typeof nl;

const fr: Strings = {
  nav: {
    home: "Accueil",
    projecten: "Projets",
    expertise: "Expertise",
    about: "À propos",
    contact: "Contact",
    talk: "Let's talk",
  },
  footer: {
    pages: "Pages",
    links: "Réseaux",
    legal: "Légal",
    policy: "Conditions",
    cookies: "Cookies",
    privacy: "Confidentialité",
    ctaLine1: "Let’s work",
    ctaLine2: "Together",
    rights: "Tous droits réservés",
  },
  home: {
    heroLine1: "Stories in motion,",
    heroLine2: "captured from every angle.",
    talk: "Let's talk",
    projecten: "Projets",
    clients: "Clients",
  },
  projectsSection: {
    title: "Projets",
    text: "Des films de marque au contenu drone et social : voici un aperçu des projets dans lesquels nous nous sommes investis avec passion. Chacun avec sa propre histoire, son ambiance et son approche — de la toute première idée au montage final. Faites défiler et découvrez ce que nous pouvons faire pour vous.",
    cta: "Voir tous les projets",
    prev: "Projets précédents",
    next: "Projets suivants",
  },
  expertiseSection: {
    title: "Expertise",
    text: "Film, drones, motion et photographie : nous réunissons tout sous un même toit. Nous construisons ainsi chaque production entièrement en interne, du premier concept aux images finales — toujours adaptée à votre marque, votre histoire et votre public. Survolez les tuiles et découvrez nos points forts.",
    cta: "Découvrez notre expertise",
  },
  projecten: {
    title: "Projets",
    clients: "Clients",
    galleryTitle: "Galerie",
    galleryText: "Voici une galerie de photos qui n'ont pas été réalisées pour un client.",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        desc: "Voyons ensemble comment la vidéographie peut faire passer votre projet au niveau supérieur.",
        what: "Ce que nous filmons",
        tags: ["Réseaux sociaux", "Événements", "Entreprises", "Immobilier"],
      },
      drones: {
        desc: "Voyons ensemble comment les images aériennes donnent à votre histoire une perspective unique.",
        what: "Ce que nous capturons",
        tags: ["Immobilier", "Événements", "Nature", "Entreprises"],
      },
      motion: {
        desc: "Voyons ensemble comment le motion graphics donne vraiment vie à votre message.",
        what: "Ce que nous créons",
        tags: ["Animations de logo", "Explainers", "Intros", "Réseaux"],
      },
      photo: {
        desc: "Voyons ensemble comment la photographie met votre marque en valeur avec netteté et style.",
        what: "Ce que nous photographions",
        tags: ["Produits", "Portraits", "Événements", "Entreprises"],
      },
    },
  },
  about: {
    title: "À propos de",
    team: "Notre Équipe",
    founders: [
      {
        lead: "Ma passion pour l'image n'est pas née derrière un écran, mais grâce à la famille. J'ai hérité de cette fascination de mon père, qui la tenait lui-même de mon grand-père.",
        body: "Cela fait maintenant 4 ans que je suis une formation en Multimédia (2 ans dans le secondaire et 2 ans dans mon bachelier). Je suis moi-même sans cesse occupé par la cinématographie, les drones, le motion graphics… C'est donc un domaine qui me passionne énormément.",
      },
      {
        lead: "Ma passion pour le tournage a toujours été présente, mais elle n'a fait que se renforcer. J'ai découvert à quel point les images peuvent être puissantes et la façon dont elles sont interprétées.",
        body: "Je suis actuellement une formation en Vente et Marketing, où j'apprends à quel point il est important de placer le client au centre. J'essaie de transposer cet état d'esprit orienté client dans tous nos projets : créer des histoires qui parlent au public cible et qui ont un réel impact.",
      },
    ],
  },
  contact: {
    title: "Contact",
    tagline: "Faisons de votre vision une réalité.",
    naam: "Nom",
    naamPh: "Votre nom",
    bedrijf: "Entreprise",
    bedrijfPh: "Facultatif",
    email: "E-mail",
    emailPh: "vous@exemple.be",
    project: "Projet",
    projectPh: "Dites-nous brièvement comment nous pouvons vous aider…",
    submit: "Envoyer le message",
    note: "Merci ! Votre logiciel de messagerie s'ouvre avec votre message prêt à être envoyé.",
    subject: (naam: string) => `Nouvelle demande — ${naam || "site web"}`,
    bodyNaam: "Nom",
    bodyBedrijf: "Entreprise",
    bodyEmail: "E-mail",
    bodyProject: "Projet :",
  },
  cookie: {
    text: "Ce site utilise des cookies techniquement nécessaires.",
    more: "Plus d'infos",
    ok: "Compris",
  },
  service: {
    material: "Notre Matériel",
    applications: "Applications",
    scrollHint: "Faites défiler pour explorer",
    contactCta: "Prenez contact",
  },
  services: {
    film: {
      label: "Vidéographie",
      titleLines: ["Unique visions", "set in frame"],
      subtitle: "Des images dynamiques captées et travaillées.",
      showcaseDescription:
        "Nous utilisons du matériel caméra haut de gamme et soigneusement choisi pour mettre en valeur chaque projet sur le plan visuel. Grâce à notre attention à la qualité et au détail, nous créons des images fortes et professionnelles qui répondent parfaitement aux attentes de nos clients. De la prise de vue à la finition, nous visons toujours le meilleur résultat.",
      stats: [
        { number: "4K", label: "Résolution" },
        { number: "Pour Chaque", label: "Situation" },
        { number: "Stabilisation", label: "Ultime" },
      ],
      servicesTitle: "Ce que nous filmons",
      services: [
        { number: "01", title: "Immobilier", desc: "Des plans intérieurs et extérieurs." },
        { number: "02", title: "Événements", desc: "Capturer les plus beaux moments des événements." },
        { number: "03", title: "Publicités", desc: "Des vidéos publicitaires professionnelles pour votre marque." },
        { number: "04", title: "Tourisme", desc: "De superbes images de destinations touristiques." },
        { number: "05", title: "Auto Shots", desc: "Des plans extérieurs et intérieurs de votre voiture." },
        { number: "06", title: "Réseaux Sociaux", desc: "Un coup de boost publicitaire pour votre présence sur les réseaux." },
      ],
      ctaHeading: "Prêt à transformer vos visions en réalité ?",
      ctaParagraph: "Voyons ensemble comment la vidéographie peut faire passer votre projet au niveau supérieur.",
    },
    drones: {
      label: "Vidéo par Drone",
      titleLines: ["Perspectives", "from above"],
      subtitle: "Des images de drone cinématiques qui élèvent votre histoire vers de nouveaux sommets.",
      showcaseDescription:
        "Nous travaillons avec des drones modernes et performants pour réaliser des images aériennes de haute qualité. Grâce à notre matériel flexible et compact, nous pouvons voler sur des lieux très variés et répondre aux besoins de chaque projet. Cela nous permet de livrer des images créatives et professionnelles qui s'intègrent parfaitement dans des applications commerciales.",
      stats: [
        { number: "4K", label: "Cinématique" },
        { number: "ActiveTrack", label: "Fonction" },
        { number: "3-Axis", label: "Gimbal" },
      ],
      servicesTitle: "Ce pour quoi nous volons",
      services: [
        { number: "01", title: "Immobilier", desc: "Des prises de vue aériennes qui montrent bâtiments et terrains sous leurs angles les plus impressionnants — idéal pour les agents, promoteurs et architectes." },
        { number: "02", title: "Événements", desc: "Des perspectives aériennes dynamiques de festivals, compétitions sportives et événements d'entreprise qui captent l'ambiance comme aucun caméraman au sol ne le peut." },
        { number: "03", title: "Publicités", desc: "Des plans de drone cinématiques qui élèvent immédiatement vos vidéos de marque." },
        { number: "04", title: "Tourisme", desc: "Des images de drone attrayantes qui rendent régions, hôtels et destinations visuellement irrésistibles." },
        { number: "05", title: "Auto Shots", desc: "Des images uniques où votre véhicule est mis en perspective d'une manière que vous n'avez jamais vue auparavant." },
        { number: "06", title: "Nature & Paysage", desc: "Des images à couper le souffle de forêts, montagnes, littoraux et champs ouverts." },
      ],
      ctaHeading: "Prêt à décoller ?",
      ctaParagraph: "Curieux de savoir comment la cinématographie par drone renforce encore votre vidéo ? Grâce à notre certification A1/A3, notre formation en construction de drones et notre équipement DJI professionnel, nous volons en toute sécurité et en toute légalité sur la plupart des sites. (Tous les lieux ne sont pas autorisés au vol en raison des zones géographiques UAS, mais nous vous aidons volontiers à en explorer les possibilités !)",
    },
    motion: {
      label: "Motion Graphics",
      titleLines: ["Graphic Designs", "Brought To Life"],
      subtitle: "Des éléments graphiques animés pour raconter des histoires.",
      showcaseDescription:
        "Nous travaillons avec des logiciels professionnels et du matériel puissant pour créer des motion graphics de haute qualité. Notre configuration est optimisée pour la vitesse, la stabilité et la flexibilité, ce qui nous permet d'élaborer et d'affiner efficacement des projets complexes. Aussi bien dans notre environnement de travail fixe qu'en déplacement, nous disposons de systèmes performants et d'un stockage suffisant, afin de travailler partout sans accroc et de livrer des résultats constants.",
      stats: [
        { number: "PC Le Plus Puissant", label: "Du Marché" },
        { number: "Meilleur Logiciel", label: "Disponible" },
        { number: "30+ Téraoctets", label: "De Stockage Total" },
      ],
      servicesTitle: "Ce que nous montons",
      services: [
        { number: "01", title: "Animations de Logo", desc: "Donner vie à un superbe logo grâce à l'animation." },
        { number: "02", title: "Infographies", desc: "De la vidéo informative présentée de manière créative." },
        { number: "03", title: "Vidéos Commerciales", desc: "Intégrer des motion graphics courts et percutants dans vos vidéos." },
      ],
      ctaHeading: "Prêt à donner vie à vos designs ?",
      ctaParagraph: "Voyons ensemble comment le Motion Graphics peut faire passer votre projet au niveau supérieur.",
    },
  },
};

const en: Strings = {
  nav: {
    home: "Home",
    projecten: "Projects",
    expertise: "Expertise",
    about: "About",
    contact: "Contact",
    talk: "Let's talk",
  },
  footer: {
    pages: "Pages",
    links: "Socials",
    legal: "Legal",
    policy: "Terms",
    cookies: "Cookies",
    privacy: "Privacy",
    ctaLine1: "Let’s work",
    ctaLine2: "Together",
    rights: "All rights reserved",
  },
  home: {
    heroLine1: "Stories in motion,",
    heroLine2: "captured from every angle.",
    talk: "Let's talk",
    projecten: "Projects",
    clients: "Clients",
  },
  projectsSection: {
    title: "Projects",
    text: "From brand films to drone and social content: here's a selection of the projects we've thrown ourselves into wholeheartedly. Each with its own story, mood and approach — from the very first idea to the final cut. Scroll through and discover what we can do for you.",
    cta: "View all projects",
    prev: "Previous projects",
    next: "Next projects",
  },
  expertiseSection: {
    title: "Expertise",
    text: "Film, drones, motion and photography — we bring it all together under one roof. That lets us build every production entirely in-house, from the first concept to the final images — always tailored to your brand, your story and your audience. Hover over the tiles and discover where we excel.",
    cta: "Discover our expertise",
  },
  projecten: {
    title: "Projects",
    clients: "Clients",
    galleryTitle: "Gallery",
    galleryText: "This is a photo gallery of images that weren't made for a client.",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        desc: "Let's talk about how videography can take your project to the next level.",
        what: "What we film",
        tags: ["Social Media", "Events", "Business", "Real Estate"],
      },
      drones: {
        desc: "Let's talk about how aerial footage gives your story a unique perspective.",
        what: "What we capture",
        tags: ["Real Estate", "Events", "Nature", "Business"],
      },
      motion: {
        desc: "Let's talk about how motion graphics truly bring your message to life.",
        what: "What we create",
        tags: ["Logo animations", "Explainers", "Intros", "Socials"],
      },
      photo: {
        desc: "Let's talk about how photography puts your brand in the picture, sharp and stylish.",
        what: "What we photograph",
        tags: ["Products", "Portraits", "Events", "Business"],
      },
    },
  },
  about: {
    title: "About",
    team: "Our Team",
    founders: [
      {
        lead: "My passion for imagery wasn't born behind a screen, but through family. I inherited that fascination from my father, who in turn got it from my grandfather.",
        body: "I've been studying Multimedia for 4 years now (2 in secondary school and 2 in my bachelor's degree). I'm also constantly working on cinematography, drones, motion graphics, and more. It's something I'm hugely interested in.",
      },
      {
        lead: "My passion for filming was always there, but it has only grown stronger. I discovered how powerful images can be and how they are interpreted.",
        body: "I'm currently studying Sales and Marketing, where I'm learning how important it is to put the client first. I try to carry that client-focused mindset into all of our projects: creating stories that resonate with the target audience and make a real impact.",
      },
    ],
  },
  contact: {
    title: "Contact",
    tagline: "Let's make your vision a reality.",
    naam: "Name",
    naamPh: "Your name",
    bedrijf: "Company",
    bedrijfPh: "Optional",
    email: "Email",
    emailPh: "you@example.be",
    project: "Project",
    projectPh: "Tell us briefly what we can help you with…",
    submit: "Send message",
    note: "Thank you! Your email program will open with your message ready to send.",
    subject: (naam: string) => `New request — ${naam || "website"}`,
    bodyNaam: "Name",
    bodyBedrijf: "Company",
    bodyEmail: "Email",
    bodyProject: "Project:",
  },
  cookie: {
    text: "This site uses technically necessary cookies.",
    more: "More info",
    ok: "Got it",
  },
  service: {
    material: "Our Gear",
    applications: "Applications",
    scrollHint: "Scroll to explore",
    contactCta: "Get in touch",
  },
  services: {
    film: {
      label: "Videography",
      titleLines: ["Unique visions", "set in frame"],
      subtitle: "Dynamic visuals captured and crafted.",
      showcaseDescription:
        "We use high-end, carefully chosen camera gear to let every project shine visually. Thanks to our focus on quality and detail, we create strong, professional images that perfectly meet our clients' expectations. From shooting to finishing, we always aim for the best result.",
      stats: [
        { number: "4K", label: "Resolution" },
        { number: "For Every", label: "Situation" },
        { number: "Ultimate", label: "Stabilization" },
      ],
      servicesTitle: "What we film for",
      services: [
        { number: "01", title: "Real Estate", desc: "Interior and exterior shots." },
        { number: "02", title: "Events", desc: "Capturing the finest moments of events." },
        { number: "03", title: "Commercials", desc: "Professional advertising videos for your brand." },
        { number: "04", title: "Tourism", desc: "Beautiful footage of tourist destinations." },
        { number: "05", title: "Auto Shots", desc: "Exterior and interior shots of your car." },
        { number: "06", title: "Social Media", desc: "An advertising boost for your social media presence." },
      ],
      ctaHeading: "Ready to turn visions into reality?",
      ctaParagraph: "Let's talk about how videography can take your project to the next level.",
    },
    drones: {
      label: "Drone Video",
      titleLines: ["Perspectives", "from above"],
      subtitle: "Cinematic drone footage that lifts your story to new heights.",
      showcaseDescription:
        "We work with modern, high-performance drones to capture high-quality aerial footage. Thanks to our flexible and compact equipment, we can fly at a wide range of locations and respond to the needs of each project. This allows us to deliver creative, professional images that fit perfectly within commercial applications.",
      stats: [
        { number: "4K", label: "Cinematic" },
        { number: "ActiveTrack", label: "Feature" },
        { number: "3-Axis", label: "Gimbal" },
      ],
      servicesTitle: "What we fly for",
      services: [
        { number: "01", title: "Real Estate", desc: "Aerial footage that shows buildings and grounds from their most impressive angles — ideal for agents, developers and architects." },
        { number: "02", title: "Events", desc: "Dynamic aerial perspectives of festivals, sports matches and corporate events that capture the atmosphere like no ground-based camera operator can." },
        { number: "03", title: "Commercials", desc: "Cinematic drone shots that instantly elevate your brand videos." },
        { number: "04", title: "Tourism", desc: "Appealing drone footage that makes regions, hotels and destinations visually irresistible." },
        { number: "05", title: "Auto Shots", desc: "Unique footage that puts your vehicle in perspective in a way you've never seen before." },
        { number: "06", title: "Nature & Landscape", desc: "Breathtaking footage of forests, mountains, coastlines and open fields." },
      ],
      ctaHeading: "Ready for takeoff?",
      ctaParagraph: "Curious how drone cinematography makes your video even stronger? Thanks to our A1/A3 certification, training in drone building and professional DJI equipment, we fly safely and legally at most locations. (Not all locations are legal to fly due to geographic UAS zones, but we're happy to help you explore the possibilities!)",
    },
    motion: {
      label: "Motion Graphics",
      titleLines: ["Graphic Designs", "Brought To Life"],
      subtitle: "Graphic elements animated to tell stories.",
      showcaseDescription:
        "We work with professional software and powerful hardware to create high-quality motion graphics. Our setup is optimized for speed, stability and flexibility, allowing us to efficiently develop and refine complex projects. Both in our fixed workspace and on the go, we have high-performance systems and ample storage, so we can always work smoothly anywhere and deliver consistent results.",
      stats: [
        { number: "Most Powerful PC", label: "On The Market" },
        { number: "Best Software", label: "Available" },
        { number: "30+ Terabytes", label: "Of Total Storage" },
      ],
      servicesTitle: "What we edit for",
      services: [
        { number: "01", title: "Logo Animations", desc: "Bringing a beautiful logo to life through animation." },
        { number: "02", title: "Infographics", desc: "Informative video brought in a creative way." },
        { number: "03", title: "Commercial Videos", desc: "Adding short, impactful motion graphics to your videos." },
      ],
      ctaHeading: "Ready to bring designs to life?",
      ctaParagraph: "Let's talk about how Motion Graphics can take your project to the next level.",
    },
  },
};

export const STRINGS: Record<Lang, Strings> = { nl, fr, en };

/** Hook: geeft de vertaal-strings voor de actieve taal. */
export function useT(): Strings {
  return STRINGS[useLanguage().lang];
}
