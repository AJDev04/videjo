import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "../lib/lenis";

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

  const overflowRef = useRef(0);
  const sectionTopRef = useRef(0);
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const [pinned, setPinned] = useState(false);

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
    const total = section.offsetHeight - window.innerHeight;
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
      sectionTopRef.current =
        section.getBoundingClientRect().top + currentScroll();
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

  // Scroll volgen (Lenis indien aanwezig, anders native) → zet alleen het doel
  useEffect(() => {
    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => setTarget(scroll);
      lenis.on("scroll", handler);
      setTarget(lenis.scroll);
      return () => lenis.off("scroll", handler);
    }
    const handler = () => setTarget(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    setTarget(window.scrollY);
    return () => window.removeEventListener("scroll", handler);
  }, [lenis, setTarget]);

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

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;
    const card = track.querySelector<HTMLElement>(".project-card");
    const step = card ? card.offsetWidth + GAP : 320;
    if (overflowRef.current > 0) {
      // gepind: één kaart komt overeen met evenveel verticale scroll
      const target = currentScroll() + dir * step;
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
            <h2 className="projects-title">Projecten</h2>
            <p className="projects-text">
              Bekijk hier al onze projecten die we met veel enthousiasme hebben
              aangenomen en waar we 100% voor hebben gegeven.
            </p>
          </div>
          <div className="carousel">
            <div className="carousel-controls">
              <button
                className="carousel-arrow"
                onClick={() => nudge(-1)}
                aria-label="Vorige projecten"
              >
                <svg viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="carousel-arrow"
                onClick={() => nudge(1)}
                aria-label="Volgende projecten"
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
