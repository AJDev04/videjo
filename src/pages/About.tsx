import type { ReactNode } from "react";
import Seo from "../components/Seo";
import VidejoMark from "../components/VidejoMark";
import aboutCss from "../../css/about.css?inline";

interface PersonProps {
  bgImage: string;
  bgAlt: string;
  name: string;
  role: string;
  tag: string;
  firstName: string;
  lead: ReactNode;
  texts: ReactNode[];
  skills: string[];
}

function Person({
  bgImage,
  bgAlt,
  name,
  role,
  tag,
  firstName,
  lead,
  texts,
  skills,
}: PersonProps) {
  return (
    <section className="about-me">
      <div className="about-me__bg-text" aria-hidden="true">
        <img src={bgImage} alt={bgAlt} />
      </div>
      <div className="container">
        <div className="me-grid">
          <div className="me-visual fade-up">
            <div className="me-photo-frame">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.15,
                }}
              >
                <VidejoMark style={{ width: "60%", height: "60%" }} />
              </div>
              <div className="me-photo-frame__label">
                <p className="me-name">{name}</p>
                <p className="me-role">{role}</p>
              </div>
            </div>
          </div>

          <div className="me-content fade-up">
            <span className="me-tag">{tag}</span>
            <h2 className="me-title">
              Hallo, ik ben<br />
              <span>{firstName}.</span>
            </h2>
            <p className="me-lead">{lead}</p>
            {texts.map((t, i) => (
              <p className="me-text" key={i}>
                {t}
              </p>
            ))}
            <div className="me-skills">
              {skills.map((s) => (
                <span className="skill-tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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

    <section className="about-hero">
      <div className="about-hero__bg"></div>
      <div className="container">
        <p className="hero-eyebrow fade-up">
          Over <b>VIDEJO</b>
        </p>
        <div className="about-hero__title fade-up">
          <h1>
            Stories in<br />
            <em>motion.</em>
          </h1>
          <h3>
            <br />
            Captured from every angle.
          </h3>
        </div>
        <div className="hero-scroll-indicator fade-up">
          <div className="hero-scroll-line"></div>
          Scroll om meer te ontdekken
        </div>
      </div>
    </section>

    <Person
      bgImage="/images/name.png"
      bgAlt="JOREN Name"
      name="Joren Frederickx"
      role="Co-Founder & Co-Owner"
      tag="De mens achter de lens"
      firstName="Joren"
      lead="Mijn passie voor beeld ontstond niet achter een scherm, maar door familie. Ik kreeg die facinatie mee van mijn vader, die het meekreeg van mijn grootvader."
      texts={[
        "Ik volg ondertussen al 4 jaar Multimedia (2 in het middelbaar en 2 in mijn bacheloropleiding). Ik ben zelf ook constant bezig met cinematografie, drones, motion graphics, .... Het is dan ook iets waar ik enorm veel interesse in heb.",
        "Ik geloof dat elk merk een uniek verhaal heeft. Mijn taak is om dat verhaal zo vertellen dat het blijft hangen lang nadat het scherm op zwart gaat.",
      ]}
      skills={["Videografie", "Drone", "Editing", "Motion Graphics"]}
    />

    <Person
      bgImage="/images/name2.png"
      bgAlt="ALEX Name"
      name="Alexandre Rutkowski"
      role="Co-Founder & Co-Owner"
      tag="De mens achter de lens"
      firstName="Alexandre"
      lead="Mijn passie voor filmen is iets dat altijd al aanwezig was, maar deze is alleen maar sterker geworden. Ik ontdekte hoe krachtig beelden kunnen zijn en hoe deze worden geïnterpreteerd."
      texts={[
        "Ik volg momenteel Sales en Marketing, hierbij leer ik hoe belangrijk het is om de klant centraal te stellen. Die klantgerichte mindset probeer ik ook door te trekken in al onze projecten: niet zomaar beelden maken, maar verhalen creëren die aansluiten bij de doelgroep en echt impact maken.",
        "Voor mij draait alles om het verbinden van creativiteit met strategie. Of het nu gaat om branding, storytelling of visuele content, ik wil ervoor zorgen dat elk project niet alleen mooi is, maar ook doelgericht en effectief.",
      ]}
      skills={["Videografie", "Marketing", "Sales"]}
    />

    <section className="about-logo">
      <div className="container">
        <div className="logo-section-header fade-up">
          <p className="logo-section-eyebrow">Merkidentiteit</p>
          <h2 className="logo-section-title">
            De anatomie van<br />
            <span>het logo</span>
          </h2>
        </div>

        <div className="logo-cards">
          {/* Card 1: Play button */}
          <div className="logo-card fade-up">
            <div className="logo-card__preview">
              <div className="logo-card__svg-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 238.15 211.65"
                >
                  <defs>
                    <style>{`.als-1{fill:#be1e2d;}.als-2{fill:#fbf7ca;}.als-3{fill:#262261;}`}</style>
                  </defs>
                  <rect className="als-3" width="238.15" height="211.65" rx="31.35" ry="31.35" />
                  <g>
                    <path className="als-2" d="M104.95,164.44c-10.85-2.74-13.98-13.58-13.23-23.45.06-.82.81-1.59,1.67-1.59l12.65-.04c.99,0,1.88-.76,1.89-1.79v-28.63c.01-.96.66-1.82,1.74-1.83l21.78-.02c.95,0,1.73.82,1.73,1.71l-.02,38.4c0,2.82-.59,5.35-1.61,7.86-3.14,7.72-10.53,10.31-18.39,10.29-2.79,0-5.41-.21-8.21-.92Z" />
                    <path className="als-2" d="M123.72,103.93l-18.8.04c-1.34,0-2.04-.85-2.04-2.08v-53.56c.01-1.15.92-1.92,2.02-1.92h19c.97,0,1.82.75,1.82,1.71v53.96c0,1.04-.78,1.86-2,1.86Z" />
                    <path className="als-2" d="M97.12,46.38c1.24,0,2.27,1.09,2,2.35l-10.44,49.75c-.53,2.51-1.56,5.32-4.63,5.32h-26.07c-1.4.01-2.34-.74-2.66-2.25l-11.2-52.7c-.29-1.37.69-2.48,1.96-2.48h16.75c.94,0,1.85.8,2.05,1.7l6.27,27.2c.07.3.29.64.49.68s.63-.3.68-.53l5.94-26.49c.23-1.02.71-2.52,2.01-2.52l16.83-.04Z" />
                    <path className="als-2" d="M192.7,85.62c-2.98,10.43-11.45,15.69-21.66,17.46-3.12.54-6.11.91-9.33.91h-28.8c-.97,0-2.17-.64-2.17-1.68v-54.33c0-.86.8-1.51,1.52-1.57,2.45-.22,4.72-.11,7.2-.1l21.61.06c8.34.02,17.63,2.01,24.05,7.55,4.05,3.5,6.77,8.11,7.98,13.37,1.4,6.06,1.3,12.36-.4,18.32ZM167.58,72.59c-.33-3.69-4.54-5.01-7.54-4.98l-4.61.04-.02,13.23h5.01c1.52,0,3.06-.41,4.43-1.02,2.93-1.3,2.99-4.42,2.74-7.26Z" />
                    <path className="als-2" d="M82.91,142.8h-15.26c-.56,0-1.03.48-1.03.96l-.02,2.97c0,.32.45.84.86.84h19.92c1.02.01,2,.75,2,1.85l.03,13.25c0,1-.73,2-1.86,2h-41.25c-1.1,0-1.79-.85-1.79-1.86v-53.87c0-1.11.79-1.66,1.81-1.85l43.02.02c1.23,0,1.75.97,1.75,1.94l-.02,13.53c0,.9-.58,1.83-1.65,1.83l-21.54.03c-.65,0-1.27.42-1.28,1.05l-.02,3.11c0,.43.57.9,1.05.9l15.12.02c.87,0,1.57.8,1.57,1.6v10.26c0,.77-.59,1.42-1.43,1.42Z" />
                    <g>
                      <path className="als-2" d="M193.15,126.44c-1.54-7.82-6.67-14.15-14.04-17.22-4.72-1.97-9.7-2.6-14.84-2.58-4.41.03-8.62.49-12.72,2.01-10.48,3.89-14.78,13.31-15.19,23.94-.26,6.66.16,12.21,2.59,18.44,2.72,6.95,8.45,11.14,15.51,13.06,7.12,1.93,17.32,1.71,24.29-.91,5.08-1.91,9.23-5.38,11.72-10.18,1.72-3.33,2.75-6.77,3.19-10.49.66-5.44.54-10.73-.51-16.07ZM174.38,137.83c-8.15,7.79-12.63,8.23-14.85,7.47-.76-.26-1.34-.85-1.63-1.57.04.14-.04-.1-.01-.04-1.32-4.65-1.52-11.72-.1-16.22t.01-.02c.24-.89.87-1.52,1.73-1.82,2.22-.77,6.7-.33,14.85,7.47,1.35,1.29,1.35,3.44,0,4.73Z" />
                      <path className="als-1" d="M174.38,137.83c-8.15,7.79-12.63,8.23-14.85,7.47-.76-.26-1.34-.85-1.63-1.57h0s-.01-.04-.01-.04c-1.32-4.65-1.52-11.72-.1-16.22t.01-.02c.24-.89.87-1.52,1.73-1.82,2.22-.77,6.7-.33,14.85,7.47,1.35,1.29,1.35,3.44,0,4.73Z" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div className="logo-card__body">
              <p className="logo-card__label">Element 01</p>
              <h3 className="logo-card__title">De Play Button</h3>
              <p className="logo-card__desc">
                De afspeelknop staat symbool voor de film- en
                televisie-industrie waarin <b>VIDEJO</b> actief is.
              </p>
            </div>
          </div>

          {/* Card 2: JO highlighted */}
          <div className="logo-card fade-up">
            <div className="logo-card__preview">
              <div className="logo-card__svg-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 238.15 211.65"
                >
                  <defs>
                    <style>{`.bls-1{fill:#be1e2d;}.bls-2{fill:#fbf7ca;}.bls-3{fill:#262261;}`}</style>
                  </defs>
                  <rect className="bls-3" width="238.15" height="211.65" rx="31.35" ry="31.35" />
                  <g>
                    <path className="bls-1" d="M133.19,108.8l-.02,38.41c-.01,2.82-.6,5.34-1.62,7.86-3.14,7.72-10.53,10.31-18.39,10.28-2.79,0-5.4-.21-8.21-.92-10.85-2.73-13.98-13.58-13.23-23.45.07-.81.82-1.58,1.67-1.59l12.66-.04c.99,0,1.88-.75,1.88-1.79l.02-28.63c0-.96.65-1.83,1.72-1.83h21.78c.95-.01,1.74.8,1.74,1.7Z" />
                    <path className="bls-2" d="M123.72,103.93l-18.8.04c-1.34,0-2.04-.85-2.04-2.08v-53.56c.01-1.15.92-1.92,2.02-1.92h19c.97,0,1.82.75,1.82,1.71v53.96c0,1.04-.78,1.86-2,1.86Z" />
                    <path className="bls-2" d="M97.12,46.38c1.24,0,2.27,1.09,2,2.35l-10.44,49.75c-.53,2.51-1.56,5.32-4.63,5.32h-26.07c-1.4.01-2.34-.74-2.66-2.25l-11.2-52.7c-.29-1.37.69-2.48,1.96-2.48h16.75c.94,0,1.85.8,2.05,1.7l6.27,27.2c.07.3.29.64.49.68s.63-.3.68-.53l5.94-26.49c.23-1.02.71-2.52,2.01-2.52l16.83-.04Z" />
                    <path className="bls-2" d="M192.7,85.62c-2.98,10.43-11.45,15.69-21.66,17.46-3.12.54-6.11.91-9.33.91h-28.8c-.97,0-2.17-.64-2.17-1.68v-54.33c0-.86.8-1.51,1.52-1.57,2.45-.22,4.72-.11,7.2-.1l21.61.06c8.34.02,17.63,2.01,24.05,7.55,4.05,3.5,6.77,8.11,7.98,13.37,1.4,6.06,1.3,12.36-.4,18.32ZM167.58,72.59c-.33-3.69-4.54-5.01-7.54-4.98l-4.61.04-.02,13.23h5.01c1.52,0,3.06-.41,4.43-1.02,2.93-1.3,2.99-4.42,2.74-7.26Z" />
                    <path className="bls-2" d="M82.91,142.8h-15.26c-.56,0-1.03.48-1.03.96l-.02,2.97c0,.32.45.84.86.84h19.92c1.02.01,2,.75,2,1.85l.03,13.25c0,1-.73,2-1.86,2h-41.25c-1.1,0-1.79-.85-1.79-1.86v-53.87c0-1.11.79-1.66,1.81-1.85l43.02.02c1.23,0,1.75.97,1.75,1.94l-.02,13.53c0,.9-.58,1.83-1.65,1.83l-21.54.03c-.65,0-1.27.42-1.28,1.05l-.02,3.11c0,.43.57.9,1.05.9l15.12.02c.87,0,1.57.8,1.57,1.6v10.26c0,.77-.59,1.42-1.43,1.42Z" />
                    <path className="bls-1" d="M193.15,126.44c-1.54-7.82-6.67-14.15-14.04-17.22-4.71-1.97-9.7-2.6-14.84-2.58-4.41.03-8.62.49-12.72,2.01-10.48,3.89-14.78,13.31-15.19,23.94-.26,6.66.16,12.21,2.6,18.44,2.71,6.95,8.44,11.14,15.5,13.06,7.12,1.93,17.32,1.71,24.29-.91,5.09-1.91,9.23-5.38,11.72-10.18,1.72-3.33,2.75-6.77,3.2-10.49.65-5.44.54-10.73-.52-16.07ZM174.39,137.83c-8.16,7.79-12.64,8.23-14.85,7.47-.77-.26-1.34-.85-1.63-1.57.03.16-.07-.16-.01-.01,0,0,.01,0,.01.01-1.34-4.65-1.54-11.75-.11-16.26v-.02c.24-.89.87-1.52,1.73-1.82,2.22-.77,6.7-.33,14.86,7.47,1.35,1.29,1.35,3.44,0,4.73Z" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="logo-card__body">
              <p className="logo-card__label">Element 02</p>
              <h3 className="logo-card__title">
                "<b>JO</b>"
              </h3>
              <p className="logo-card__desc">
                De letters "<b>JO</b>" zijn afgeleid van de naam van de
                Co-Founder, Joren.
              </p>
            </div>
          </div>

          {/* Card 3: VIDEO wordplay */}
          <div className="logo-card fade-up">
            <div className="logo-card__preview">
              <div className="logo-card__svg-wrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 238.15 211.65"
                >
                  <defs>
                    <style>{`.cls-1{fill:#be1e2d;}.cls-2{fill:#262261;}`}</style>
                  </defs>
                  <rect className="cls-2" width="238.15" height="211.65" rx="31.35" ry="31.35" />
                  <g>
                    <path className="cls-1" d="M133.19,108.8l-.02,38.41c0,2.82-.6,5.34-1.62,7.86-3.14,7.72-10.52,10.31-18.39,10.28-2.79,0-5.4-.21-8.21-.92-10.84-2.73-13.98-13.58-13.22-23.45.06-.81.81-1.58,1.67-1.59l12.65-.04c.99,0,1.89-.75,1.89-1.79v-28.63c.01-.96.66-1.83,1.74-1.83h21.78c.94-.01,1.73.8,1.73,1.7Z" />
                    <path className="cls-1" d="M125.72,48.12v53.95c0,1.04-.78,1.86-1.99,1.86l-18.81.04c-1.33,0-2.04-.86-2.04-2.08v-53.56c.01-1.15.92-1.93,2.02-1.93h19c.97,0,1.82.76,1.82,1.72Z" />
                    <path className="cls-1" d="M99.13,48.73l-10.44,49.75c-.52,2.51-1.56,5.32-4.63,5.32h-26.07c-1.4.01-2.34-.74-2.66-2.25l-11.2-52.69c-.29-1.38.7-2.49,1.97-2.49h16.75c.94.01,1.84.8,2.05,1.71l6.27,27.2c.07.3.29.64.49.68.2.04.63-.3.69-.53l5.93-26.49c.23-1.01.71-2.52,2.02-2.52l16.83-.04c1.23,0,2.26,1.09,2,2.35Z" />
                    <path className="cls-1" d="M193.11,67.3c-1.22-5.26-3.94-9.88-7.98-13.37-6.43-5.55-15.71-7.53-24.06-7.56l-21.61-.05c-2.48-.01-4.75-.12-7.2.1-.72.06-1.53.71-1.53,1.57v54.33c.01,1.04,1.22,1.67,2.18,1.67h28.8c3.22,0,6.21-.36,9.33-.9,10.22-1.78,18.69-7.04,21.66-17.47,1.7-5.96,1.8-12.25.41-18.32ZM164.85,79.85c-1.37.61-2.91,1.02-4.43,1.02h-5.01l.02-13.23,4.61-.03c3.01-.03,7.21,1.29,7.54,4.98.26,2.84.2,5.96-2.73,7.26Z" />
                    <path className="cls-1" d="M91.11,109.05l-.02,13.53c0,.9-.58,1.83-1.65,1.83l-21.54.03c-.65.01-1.28.42-1.28,1.06l-.02,3.11c0,.43.58.9,1.06.9l15.12.02c.86,0,1.57.79,1.57,1.59v10.27c-.01.76-.6,1.41-1.44,1.41h-15.25c-.56,0-1.03.48-1.04.96l-.02,2.97c0,.32.45.84.86.84h19.93c1.02.01,1.99.75,2,1.85l.03,13.25c0,1-.73,2-1.86,2h-41.24c-1.1,0-1.79-.85-1.79-1.86v-53.88c0-1.11.79-1.66,1.81-1.84l43.02.02c1.23,0,1.75.97,1.75,1.94Z" />
                    <path className="cls-1" d="M193.16,126.44c-1.55-7.82-6.68-14.15-14.05-17.22-4.71-1.97-9.69-2.6-14.84-2.58-4.41.03-8.61.49-12.71,2.01-10.49,3.89-14.78,13.31-15.2,23.94-.25,6.66.17,12.21,2.6,18.44,2.72,6.95,8.44,11.14,15.5,13.06,7.12,1.93,17.32,1.71,24.3-.91,5.08-1.91,9.23-5.38,11.71-10.18,1.72-3.33,2.75-6.77,3.2-10.49.65-5.44.54-10.73-.51-16.07ZM174.39,137.83c-8.15,7.79-12.64,8.23-14.85,7.47-.76-.26-1.34-.85-1.63-1.57.03.14-.05-.1-.01-.04-1.33-4.65-1.52-11.72-.1-16.22v-.02c.24-.89.87-1.52,1.74-1.82,2.21-.77,6.69-.33,14.85,7.47,1.35,1.29,1.35,3.44,0,4.73Z" />
                  </g>
                </svg>
              </div>
            </div>
            <div className="logo-card__body">
              <p className="logo-card__label">Element 03</p>
              <h3 className="logo-card__title">
                "<b>VIDEO</b>" — de spelfout
              </h3>
              <p className="logo-card__desc">
                Het woord "video" is met opzet verkeerd gespeld om de letters
                "<b>JO</b>" erin te verwerken.
              </p>
            </div>
          </div>
        </div>

        {/* Full logo showcase */}
        <div className="logo-showcase fade-up">
          <div className="logo-showcase__main">
            <VidejoMark className="logo-svg" />
          </div>
          <div className="logo-showcase__text">
            <h3 className="showcase-title">
              Alles samen: <b>VIDEJO</b>
            </h3>
            <p className="showcase-desc">
              Drie lagen in één merk. <b>VIDEO</b> - het vakgebied. <b>JO</b> -
              de co-maker.<b>Play Button</b> - de passie. Het logo is geen
              decoratie, het is een statement: Wij weten wie we zijn en wat we
              doen.
            </p>
          </div>
        </div>
      </div>
    </section>
  </>
);
