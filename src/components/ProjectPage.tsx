import ProjectLanding from "./ProjectLanding";
import ProjectBody from "./ProjectBody";
import SmartLink from "./SmartLink";
import { useProjects } from "../lib/useProjects";
import { useLanguage } from "../lib/lang";
import { localized } from "../lib/projects";

/**
 * Volledige individuele projectpagina: landing-hero (klantlogo + terug-knop) +
 * de projectinhoud (video-showcase + "HET PROJECT"). Het project wordt op basis
 * van de slug uit de API-data (`useProjects`) gehaald; titel en uitleg volgen de
 * actieve taal.
 */
export default function ProjectPage({ slug }: { slug: string }) {
  const { projects, loading } = useProjects();
  const { lang } = useLanguage();
  const project = projects.find((p) => p.slug === slug);

  // Nog aan het laden (en niet in de fallback-lijst): lege navy hero.
  if (!project) {
    return (
      <section
        style={{
          minHeight: "100svh",
          display: "grid",
          placeItems: "center",
          background: "var(--color-primary, #2e3192)",
          color: "var(--color-cream, #faf8ce)",
          textAlign: "center",
          padding: "2rem",
          gap: "1rem",
        }}
      >
        {loading ? (
          <p style={{ fontWeight: 700 }}>Laden…</p>
        ) : (
          <>
            <p style={{ fontWeight: 700 }}>Dit project bestaat niet (meer).</p>
            <SmartLink
              to="/projecten"
              style={{ color: "var(--color-accent-light, #ffd23f)", fontWeight: 700 }}
            >
              ← Terug naar projecten
            </SmartLink>
          </>
        )}
      </section>
    );
  }

  const name = localized(project.name, lang);

  return (
    <>
      <ProjectLanding
        logo={project.logo}
        name={name}
        canonical={`https://videjo.be/projecten/${project.slug}`}
      />
      <ProjectBody project={project} />
    </>
  );
}
