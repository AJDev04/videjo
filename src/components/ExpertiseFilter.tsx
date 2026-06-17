import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useT } from "../lib/i18n";
import expertiseFilterCss from "./ExpertiseFilter.css?inline";

// De id stuurt de accentkleur via [data-active] in ExpertiseFilter.css; het
// label (Film/Drones/Motion/Photo) is een merk-term en vertaalt niet mee.
// desc/what/tags komen vertaald uit i18n (gekoppeld op id).
const FILTER_META = [
  { id: "film", label: "Film" },
  { id: "drones", label: "Drones" },
  { id: "motion", label: "Motion" },
  { id: "photo", label: "Photo" },
] as const;

/**
 * Expertise-filter: een navy tab-bar (FILM/DRONES/MOTION/PHOTO) boven een kaart.
 * De actieve tab bepaalt de accentkleur en de inhoud (tekst + tags) van de kaart.
 */
export default function ExpertiseFilter() {
  const [active, setActive] = useState("film");
  const t = useT();
  const FILTERS = FILTER_META.map((f) => ({ ...f, ...t.expertise.filters[f.id] }));
  const current = FILTERS.find((f) => f.id === active) ?? FILTERS[0];

  // Start-filter uit de URL (?filter=…), bv. vanaf de homepage-tegels. Pas ná
  // mount toegepast (niet in de initializer) zodat de eerste client-render
  // overeenkomt met de statisch voor-gerenderde HTML (geen hydration-mismatch).
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const f = searchParams.get("filter");
    if (f && FILTER_META.some((m) => m.id === f)) setActive(f);
  }, [searchParams]);

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
          <p className="exp-card-lead">{current.lead}</p>
          <p className="exp-card-desc">{current.desc}</p>
        </div>
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
