import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "../lib/lenis";
import { useT } from "../lib/i18n";
import SmartLink from "./SmartLink";

type Project = {
  title?: string;
  image?: string;
  href?: string;
};

/** Placeholder-kaarten tot de echte projecten (beelden + links) zijn aangeleverd. */
const PROJECTS: Project[] = Array.from({ length: 6 }, () => ({}));

const GAP = 24;
/** Pinnen alleen op desktop; daaronder gewoon native horizontaal scrollen. */
const PIN_QUERY = "(min-width: 993px)";
/** Lerp-factor: lager = zachter/trager naloop van de kaarten op de scroll. */
const EASE = 0.12;
/** Nav-hoogte: het panel pint hier vlak ónder. Moet gelijk lopen met
 *  --nav-h in master.css. */
const NAV_H = 88;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

/**
 * Projecten-sectie met "pinned horizontal scroll": zodra het panel in beeld
 * komt, blijft het vastgepind (sticky) terwijl de pagina verder scrollt, en
 * die verticale scroll-voortgang verschuift de kaarten horizontaal. Is de
 * carousel uitgescrold, dan loopt de pagina gewoon verder.
 *
 * De horizontale beweging wordt in een rAF-lus naar zijn doel geïnterpoleerd
 * (lerp), zodat de kaarten zacht meebewegen i.p.v. strak op de scroll te
 * plakken. Scroll-gestuurd (geen wheel-hijack), dus werkt met Lenis.
 */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const t = useT();

  const overflowRef = useRef(0);
  const sectionTopRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const [pinned, setPinned] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const currentScroll = useCallback(
    () => lenis?.scroll ?? window.scrollY,
    [lenis],
  );

  // Doel-positie afleiden uit de scroll-voortgang door de hoge sectie
  const setTarget = useCallback((scroll: number) => {
    const section = sectionRef.current;
    const overflow = overflowRef.current;
    if (!section || overflow <= 0) {
      targetXRef.current = 0;
      return;
    }
    // De pin engaget NAV_H eerder (panel pint ónder de nav) en duurt dus
    // overflow + NAV_H; sectionTopRef is al met NAV_H verlaagd.
    const total = overflow + NAV_H;
    const p = clamp((scroll - sectionTopRef.current) / total, 0, 1);
    targetXRef.current = -(p * overflow);
  }, []);

  const measure = useCallback(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const canPin = window.matchMedia(PIN_QUERY).matches;
    const overflow = canPin
      ? Math.max(0, track.scrollWidth - viewport.clientWidth)
      : 0;
    overflowRef.current = overflow;

    if (overflow > 0) {
      section.style.height = `${window.innerHeight + overflow}px`;
      // -NAV_H: de pin start zodra het panel de nav-onderkant raakt
      sectionTopRef.current =
        section.getBoundingClientRect().top + currentScroll() - NAV_H;
      setPinned(true);
      setTarget(currentScroll());
      // direct op het doel zetten zodat er geen sprong is bij (her)meten
      currentXRef.current = targetXRef.current;
      track.style.transform = `translate3d(${currentXRef.current}px,0,0)`;
    } else {
      section.style.height = "";
      track.style.transform = "";
      setPinned(false);
    }
    lenis?.resize();
  }, [currentScroll, lenis, setTarget]);

  // Geometrie (her)berekenen bij mount, resize en wanneer Lenis beschikbaar komt
  useEffect(() => {
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Pijltjes-randstatus: linker dimt op het begin, rechter op het einde.
  // Gepind (desktop) uit de horizontale voortgang; mobiel uit de native scroll.
  const updateEdges = useCallback(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    if (overflowRef.current > 0) {
      const x = -targetXRef.current;
      setAtStart(x <= 1);
      setAtEnd(x >= overflowRef.current - 1);
    } else {
      const max = vp.scrollWidth - vp.clientWidth;
      setAtStart(vp.scrollLeft <= 1);
      setAtEnd(max <= 1 || vp.scrollLeft >= max - 1);
    }
  }, []);

  // Scroll volgen (Lenis indien aanwezig, anders native) → zet alleen het doel
  useEffect(() => {
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => {
        setTarget(scroll);
        updateEdges();
      };
      lenis.on("scroll", handler);
      setTarget(lenis.scroll);
      return () => lenis.off("scroll", handler);
    }
    const handler = () => {
      setTarget(window.scrollY);
      updateEdges();
    };
    window.addEventListener("scroll", handler, { passive: true });
    setTarget(window.scrollY);
    return () => window.removeEventListener("scroll", handler);
  }, [lenis, setTarget, updateEdges]);

  // rAF-lus: kaarten zacht naar het doel laten lopen
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const track = trackRef.current;
      if (track && overflowRef.current > 0) {
        const cur = currentXRef.current;
        const tgt = targetXRef.current;
        const next =
          Math.abs(tgt - cur) < 0.1 ? tgt : cur + (tgt - cur) * EASE;
        if (next !== cur) {
          currentXRef.current = next;
          track.style.transform = `translate3d(${next}px,0,0)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    updateEdges();
    vp.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      vp.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const card = track.querySelector<HTMLElement>(".project-card");
    const step = card ? card.offsetWidth + GAP : 320;
    if (overflowRef.current > 0) {
      // gepind: horizontale stap → verticale scroll (pin-duur = overflow + NAV_H)
      const vstep = (step * (overflowRef.current + NAV_H)) / overflowRef.current;
      const target = currentScroll() + dir * vstep;
      if (lenis) lenis.scrollTo(target);
      else window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  return (
    <section
      className={`projects${pinned ? " is-pinned" : ""}`}
      id="projecten"
      ref={sectionRef}
    >
      <div className="projects-sticky">
        <div className="projects-panel">
          <div className="projects-intro">
            <h2 className="projects-title">{t.projectsSection.title}</h2>
            <p className="projects-text">{t.projectsSection.text}</p>
            <SmartLink to="/projecten" className="btn btn-primary section-cta">
              {t.projectsSection.cta}
            </SmartLink>
          </div>
          <div className="carousel">
            <div className="carousel-controls">
              <button
                className="carousel-arrow"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label={t.projectsSection.prev}
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="carousel-arrow"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label={t.projectsSection.next}
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="carousel-viewport" ref={viewportRef}>
              <div className="carousel-track" ref={trackRef}>
                {PROJECTS.map((project, i) => (
                  <div className="project-card" key={i}>
                    {project.image && (
                      <img src={project.image} alt={project.title ?? ""} />
                    )}
                    {project.title && (
                      <span className="project-card-title">{project.title}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
