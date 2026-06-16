/**
 * Haalt de projecten client-side op uit de API. Start met DEFAULT_PROJECTS zodat
 * de KLANTEN-grid meteen iets toont (en SSR/hydratie overeenkomen); vervangt die
 * door de live data zodra de fetch klaar is. Gebruikt door de Projecten-grid en
 * de individuele projectpagina's.
 */
import { useEffect, useState } from "react";
import { getProjects } from "./api";
import { DEFAULT_PROJECTS, sortProjects, type AdminProject } from "./projects";

export function useProjects() {
  const [projects, setProjects] = useState<AdminProject[]>(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getProjects()
      .then((list) => {
        if (!alive) return;
        setProjects(sortProjects(list));
        setError(null);
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : "Kon projecten niet laden");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { projects, loading, error };
}
