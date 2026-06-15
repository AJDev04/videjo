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
          { path: "film", lazy: () => import("./pages/Film") },
          { path: "drones", lazy: () => import("./pages/Drones") },
          { path: "motion", lazy: () => import("./pages/Motion") },
          { path: "expertise", lazy: () => import("./pages/Expertise") },
          { path: "projecten", lazy: () => import("./pages/Projecten") },
          { path: "projecten/auto-shots", lazy: () => import("./pages/projecten/AutoShots") },
          { path: "projecten/cinematic-shots", lazy: () => import("./pages/projecten/CinematicShots") },
          { path: "projecten/drone-shots", lazy: () => import("./pages/projecten/DroneShots") },
          { path: "projecten/fotografie", lazy: () => import("./pages/projecten/Fotografie") },
          { path: "projecten/motion-graphics", lazy: () => import("./pages/projecten/MotionGraphics") },
          { path: "about", lazy: () => import("./pages/About") },
          { path: "contact", lazy: () => import("./pages/Contact") },
        ],
      },
      // Standalone juridische pagina's (eigen styling, geen master.css/nav/footer)
      { path: "privacy", lazy: () => import("./pages/Privacy") },
      { path: "voorwaarden", lazy: () => import("./pages/Voorwaarden") },
      { path: "cookies", lazy: () => import("./pages/Cookies") },
    ],
  },
];
