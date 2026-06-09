import { useEffect } from "react";

/**
 * Scroll-onthul-animaties via IntersectionObserver — port van het
 * "Scroll Animations" blok uit legacy/js/scripts.js. Voegt .visible toe aan
 * .fade-up elementen en behoudt de legacy fade-in / stagger-grids.
 *
 * Geef de huidige pathname mee zodat het na elke route-wissel opnieuw scant.
 */
export function useScrollReveal(key: unknown) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -60px 0px", threshold: 0.08 },
    );

    document
      .querySelectorAll(".fade-up, .fade-in")
      .forEach((el) => observer.observe(el));

    document
      .querySelectorAll(
        ".section-header, .portfolio-item, .service-card, .over-content, .over-visual, .contact-info, .contact-form-wrapper",
      )
      .forEach((el) => {
        el.classList.add("fade-in");
        observer.observe(el);
      });

    document
      .querySelectorAll(".portfolio-grid, .services-grid")
      .forEach((grid) => {
        grid.classList.add("stagger-children");
        observer.observe(grid);
      });

    return () => observer.disconnect();
  }, [key]);
}
