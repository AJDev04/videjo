import { useEffect, useRef, useState } from "react";
import expertiseFilterCss from "./ExpertiseFilter.css?inline";

type Filter = {
  id: string;
  label: string;
  desc: string;
  what: string;
  tags: string[];
};

/**
 * Vertaalbare filterdata (FR/EN later). FILM is aangeleverd door Joren; drones/
 * motion/photo zijn voorlopige NL-placeholderteksten — vrij aan te passen.
 * De id stuurt de accentkleur via [data-active] in ExpertiseFilter.css.
 */
const FILTERS: Filter[] = [
  {
    id: "film",
    label: "Film",
    desc: "Laten we bespreken hoe videografie jouw project naar een hoger niveau kan tillen.",
    what: "Wat we filmen",
    tags: ["Sociale Media", "Events", "Bedrijven", "Vastgoed"],
  },
  {
    id: "drones",
    label: "Drones",
    desc: "Laten we bespreken hoe luchtbeelden jouw verhaal een uniek perspectief geven.",
    what: "Wat we capteren",
    tags: ["Vastgoed", "Events", "Natuur", "Bedrijven"],
  },
  {
    id: "motion",
    label: "Motion",
    desc: "Laten we bespreken hoe motion graphics jouw boodschap echt tot leven brengen.",
    what: "Wat we maken",
    tags: ["Logo-animaties", "Explainers", "Intro's", "Socials"],
  },
  {
    id: "photo",
    label: "Photo",
    desc: "Laten we bespreken hoe fotografie jouw merk scherp en stijlvol in beeld brengt.",
    what: "Wat we fotograferen",
    tags: ["Producten", "Portretten", "Events", "Bedrijven"],
  },
];

/**
 * Expertise-filter: een navy tab-bar (FILM/DRONES/MOTION/PHOTO) boven een kaart.
 * De actieve tab bepaalt de accentkleur en de inhoud (tekst + tags) van de kaart.
 */
export default function ExpertiseFilter() {
  const [active, setActive] = useState("film");
  const current = FILTERS.find((f) => f.id === active) ?? FILTERS[0];

  // Cream "pill" achter de actieve tab: meet de actieve tab en schuif de pill
  // ernaartoe (swipe). De transitie zetten we pas ná de eerste meting aan, zodat
  // hij bij het laden niet vanuit de hoek komt inschuiven.
  const barRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const measure = () => {
      const el = bar.querySelector<HTMLElement>(".exp-filter-tab.active");
      if (el) {
        setPill({
          left: el.offsetLeft,
          top: el.offsetTop,
          width: el.offsetWidth,
          height: el.offsetHeight,
        });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(bar);
    return () => ro.disconnect();
  }, [active]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="exp-filter" data-active={active}>
      <style dangerouslySetInnerHTML={{ __html: expertiseFilterCss }} />

      <div className="exp-filter-bar" role="tablist" aria-label="Expertise" ref={barRef}>
        <span
          className={`exp-filter-pill${animate ? " is-animated" : ""}`}
          aria-hidden="true"
          style={{
            transform: `translateX(${pill.left}px)`,
            top: `${pill.top}px`,
            width: `${pill.width}px`,
            height: `${pill.height}px`,
          }}
        />
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={f.id === active}
            className={`exp-filter-tab${f.id === active ? " active" : ""}`}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="exp-card">
        <div className="exp-card-cell exp-card-intro">
          <h3 className="exp-card-title">{current.label}</h3>
          <p className="exp-card-desc">{current.desc}</p>
        </div>
        <div className="exp-card-cell exp-card-media" aria-hidden="true" />
        <div className="exp-card-cell exp-card-media" aria-hidden="true" />
        <div className="exp-card-cell exp-card-what">
          <h4 className="exp-card-subtitle">{current.what}</h4>
          <ul className="exp-card-tags">
            {current.tags.map((t) => (
              <li className="exp-card-tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
