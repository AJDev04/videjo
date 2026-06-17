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
  lead: string;
  desc: string;
  what: string;
  tags: string[];
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
  project: {
    about: "Het project",
    placeholder: "Uitleg van het project.",
    prev: "Vorige",
    next: "Volgende",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        lead: "Van merkfilms tot socialcontent: we vertalen jouw verhaal naar beeld dat blijft hangen. Van het eerste concept tot de finale cut bouwen we alles in eigen beheer op.",
        desc: "Laten we bespreken hoe videografie jouw project naar een hoger niveau kan tillen.",
        what: "Wat we filmen",
        tags: ["Sociale Media", "Events", "Bedrijven", "Vastgoed"],
      },
      drones: {
        lead: "Met luchtbeelden geven we je project een perspectief dat vanop de grond onmogelijk is. Vergunde piloten, cinematische bewegingen en scherpe beelden in elk seizoen.",
        desc: "Laten we bespreken hoe luchtbeelden jouw verhaal een uniek perspectief geven.",
        what: "Wat we capteren",
        tags: ["Vastgoed", "Events", "Natuur", "Bedrijven"],
      },
      motion: {
        lead: "Met motion graphics breng je logo's, cijfers en ideeën in beweging. Van strakke explainers tot pakkende intro's die je boodschap echt laten leven.",
        desc: "Laten we bespreken hoe motion graphics jouw boodschap echt tot leven brengen.",
        what: "Wat we maken",
        tags: ["Logo-animaties", "Explainers", "Intro's", "Socials"],
      },
      photo: {
        lead: "Scherpe, stijlvolle beelden die je merk in de verf zetten. Van producten en portretten tot sfeerbeelden die de juiste indruk nalaten.",
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
    sending: "Versturen…",
    note: "Bedankt! Je bericht is verstuurd — we nemen snel contact op.",
    error: "Er ging iets mis. Probeer het opnieuw of mail ons rechtstreeks.",
  },
  cookie: {
    text: "Deze site gebruikt technisch noodzakelijke cookies.",
    more: "Meer info",
    ok: "Begrepen",
  },
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
  project: {
    about: "Le projet",
    placeholder: "Description du projet.",
    prev: "Précédent",
    next: "Suivant",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        lead: "Du film de marque au contenu social : nous traduisons votre histoire en images mémorables. Du concept initial au montage final, tout est réalisé en interne.",
        desc: "Voyons ensemble comment la vidéographie peut faire passer votre projet au niveau supérieur.",
        what: "Ce que nous filmons",
        tags: ["Réseaux sociaux", "Événements", "Entreprises", "Immobilier"],
      },
      drones: {
        lead: "Les images aériennes offrent à votre projet une perspective impossible depuis le sol. Pilotes agréés, mouvements cinématographiques et netteté en toute saison.",
        desc: "Voyons ensemble comment les images aériennes donnent à votre histoire une perspective unique.",
        what: "Ce que nous capturons",
        tags: ["Immobilier", "Événements", "Nature", "Entreprises"],
      },
      motion: {
        lead: "Avec le motion graphics, vos logos, chiffres et idées prennent vie. Des explainers épurés aux intros percutantes qui font vraiment vivre votre message.",
        desc: "Voyons ensemble comment le motion graphics donne vraiment vie à votre message.",
        what: "Ce que nous créons",
        tags: ["Animations de logo", "Explainers", "Intros", "Réseaux"],
      },
      photo: {
        lead: "Des images nettes et élégantes qui mettent votre marque en valeur. Des produits et portraits aux ambiances qui laissent la bonne impression.",
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
    sending: "Envoi…",
    note: "Merci ! Votre message a été envoyé — nous vous recontactons rapidement.",
    error: "Une erreur s'est produite. Réessayez ou envoyez-nous un e-mail directement.",
  },
  cookie: {
    text: "Ce site utilise des cookies techniquement nécessaires.",
    more: "Plus d'infos",
    ok: "Compris",
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
  project: {
    about: "The project",
    placeholder: "Project description.",
    prev: "Previous",
    next: "Next",
  },
  expertise: {
    title: "Expertise",
    filters: {
      film: {
        lead: "From brand films to social content, we turn your story into images that stick. From the first concept to the final cut, everything is built in-house.",
        desc: "Let's talk about how videography can take your project to the next level.",
        what: "What we film",
        tags: ["Social Media", "Events", "Business", "Real Estate"],
      },
      drones: {
        lead: "Aerial footage gives your project a perspective that's impossible from the ground. Licensed pilots, cinematic moves and crisp images in every season.",
        desc: "Let's talk about how aerial footage gives your story a unique perspective.",
        what: "What we capture",
        tags: ["Real Estate", "Events", "Nature", "Business"],
      },
      motion: {
        lead: "With motion graphics, your logos, numbers and ideas start moving. From clean explainers to striking intros that truly bring your message to life.",
        desc: "Let's talk about how motion graphics truly bring your message to life.",
        what: "What we create",
        tags: ["Logo animations", "Explainers", "Intros", "Socials"],
      },
      photo: {
        lead: "Sharp, stylish images that put your brand in the spotlight. From products and portraits to atmosphere that leaves the right impression.",
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
    sending: "Sending…",
    note: "Thank you! Your message has been sent — we'll get back to you soon.",
    error: "Something went wrong. Please try again or email us directly.",
  },
  cookie: {
    text: "This site uses technically necessary cookies.",
    more: "More info",
    ok: "Got it",
  },
};

export const STRINGS: Record<Lang, Strings> = { nl, fr, en };

/** Hook: geeft de vertaal-strings voor de actieve taal. */
export function useT(): Strings {
  return STRINGS[useLanguage().lang];
}
