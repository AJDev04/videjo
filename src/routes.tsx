import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import ChromeLayout from "./components/ChromeLayout";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    entry: "src/components/Layout.tsx",
    children: [
      // Hoofdpagina's met gedeelde chrome (master.css + nav + footer)
      {
        element: <ChromeLayout />,
        entry: "src/components/ChromeLayout.tsx",
        children: [
          { index: true, lazy: () => import("./pages/Home") },
          { path: "expertise", lazy: () => import("./pages/Expertise") },
          { path: "projecten", lazy: () => import("./pages/Projecten") },
          // Oude categorie-detailpagina's (niet meer gelinkt; vervangen door de klant-pagina's hierboven)
          { path: "projecten/auto-shots", lazy: () => import("./pages/projecten/AutoShots") },
          { path: "projecten/cinematic-shots", lazy: () => import("./pages/projecten/CinematicShots") },
          { path: "projecten/drone-shots", lazy: () => import("./pages/projecten/DroneShots") },
          { path: "projecten/fotografie", lazy: () => import("./pages/projecten/Fotografie") },
          { path: "projecten/motion-graphics", lazy: () => import("./pages/projecten/MotionGraphics") },
          { path: "about", lazy: () => import("./pages/About") },
          { path: "contact", lazy: () => import("./pages/Contact") },
          // Individuele projectpagina (per klant) — dynamisch, data uit de API.
          // Statische paden hierboven hebben voorrang (react-router-ranking).
          { path: "projecten/:slug", lazy: () => import("./pages/ProjectDetail") },
        ],
      },
      // Standalone juridische pagina's (eigen styling, geen master.css/nav/footer)
      { path: "privacy", lazy: () => import("./pages/Privacy") },
      { path: "voorwaarden", lazy: () => import("./pages/Voorwaarden") },
      { path: "cookies", lazy: () => import("./pages/Cookies") },
      // Verborgen beheerpagina (niet in nav/sitemap, noindex).
      { path: "admin", lazy: () => import("./pages/Admin") },
    ],
  },
];
