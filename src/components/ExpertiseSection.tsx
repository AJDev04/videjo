import { useState } from "react";
import SmartLink from "./SmartLink";
import VidejoLogo from "./VidejoLogo";
import RollText from "./RollText";
import { useT } from "../lib/i18n";

const TILES = [
  { to: "/film", cls: "tile-film", label: "Film" },
  { to: "/drones", cls: "tile-drones", label: "Drones" },
  { to: "/motion", cls: "tile-motion", label: "Motion" },
  { to: "/projecten/fotografie", cls: "tile-photo", label: "Photo" },
];

/**
 * Expertise-sectie: 4 tegels die standaard donker zijn en pas bij hover hun
 * kleur krijgen. De subtitel onder "EXPERTISE" toont "Videjo" en wisselt naar
 * de naam van de tegel waar je overheen gaat (Film / Drones / Motion / Photo).
 */
export default function ExpertiseSection() {
  const [active, setActive] = useState<string | null>(null);
  const t = useT();

  return (
    <section className="expertise" id="expertise">
      <div className="expertise-panel">
        <div className="expertise-tiles">
          {TILES.map((tile) => (
            <SmartLink
              key={tile.to}
              to={tile.to}
              className={`expertise-tile ${tile.cls}`}
              onMouseEnter={() => setActive(tile.label)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="tile-inner">
                <VidejoLogo />
                <span className="tile-label">{tile.label}</span>
              </div>
            </SmartLink>
          ))}
        </div>
        <div className="expertise-intro">
          <h2 className="expertise-title">{t.expertiseSection.title}</h2>
          <p className="expertise-sub">
            <RollText text={active ?? "Videjo"} />
          </p>
          <p className="expertise-text">{t.expertiseSection.text}</p>
          <SmartLink to="/expertise" className="btn btn-primary section-cta">
            {t.expertiseSection.cta}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
