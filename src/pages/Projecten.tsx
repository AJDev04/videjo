import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import SmartLink from "../components/SmartLink";
import portfolioCss from "../../css/portfolio.css?inline";

interface Panel {
  num: string;
  name: string;
  cat: string;
  img: string;
  href: string;
}

const PANELS: Panel[] = [
  { num: "01", name: "Cinematic Shots", cat: "Dynamisch", img: "/images/film.jpg", href: "/portfolio/cinematic-shots" },
  { num: "02", name: "Drone Shots", cat: "Aesthetic", img: "/images/drone.jpg", href: "/portfolio/drone-shots" },
  { num: "03", name: "Motion Graphics", cat: "Animatie", img: "/images/mg.png", href: "/portfolio/motion-graphics" },
  { num: "04", name: "Auto Shots", cat: "Actie", img: "/images/auto.jpg", href: "/portfolio/auto-shots" },
  { num: "05", name: "Fotografie", cat: "Kwaliteit", img: "/images/fotografie.JPG", href: "/portfolio/fotografie" },
];

function Accordion() {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();

  return (
    <>
      <div className="vj-accordion" id="accordion">
        {PANELS.map((p, i) => (
          <div
            key={p.num}
            className={`vj-panel${i === active ? " active" : ""}`}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setActive(i)}
            onClick={() => navigate(p.href)}
          >
            <img
              src={p.img}
              alt={p.name}
              onError={(e) => {
                const el = e.currentTarget;
                el.onerror = null;
                el.src = `https://placehold.co/600x800/26225e/faf8ce?text=${encodeURIComponent(p.name)}`;
              }}
            />
            <div className="vj-panel-overlay"></div>
            <div className="vj-panel-label">
              <div className="vj-panel-num">{p.num}</div>
              <div className="vj-panel-name">{p.name}</div>
              <div className="vj-panel-cat">{p.cat}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="vj-dots" id="dots">
        {PANELS.map((p, i) => (
          <div
            key={p.num}
            className={`vj-dot${i === active ? " active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setActive(i);
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export const Component = () => (
  <>
    <Seo
      title="Portfolio | VIDEJO — Onze Videoprojecten"
      description="Bekijk het portfolio van VIDEJO: commerciële video's, cinematografie, drone opnames en motion graphics voor Belgische merken."
      canonical="https://videjo.be/portfolio"
      og={{
        title: "Portfolio | VIDEJO — Onze Videoprojecten",
        description:
          "Bekijk onze commerciële video's, drone opnames en motion graphics.",
        type: "website",
        url: "https://videjo.be/portfolio",
        image: "https://videjo.be/images/og-image.jpg",
        locale: "nl_BE",
      }}
      pageCss={portfolioCss}
    />

    <div className="vj-wrap">
      <div className="vj-left">
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-top-fade"></div>
          <div className="hero-bottom-fade"></div>

          <div className="shape s1"></div>
          <div className="shape s2"></div>
          <div className="shape s3"></div>
          <div className="shape s4"></div>
          <div className="shape s5"></div>

          <div className="hero-content">
            <div className="hero-badge">
              <p className="port-label">Portfolio</p>
            </div>

            <h1 className="hero-title">
              <span className="title-top">Our Work</span>
            </h1>

            <p className="hero-subtitle">
              Onze portfolio van creatieve projecten, van cinematografie tot
              motion graphics.
            </p>
          </div>

          <SmartLink to="#accordion" className="scroll-hint">
            <span>Scroll om te verkennen</span>
            <div className="scroll-line"></div>
          </SmartLink>
        </section>
      </div>

      <Accordion />
    </div>
  </>
);
