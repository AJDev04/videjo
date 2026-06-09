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
          { path: "portfolio", lazy: () => import("./pages/Portfolio") },
          { path: "portfolio/auto-shots", lazy: () => import("./pages/portfolio/AutoShots") },
          { path: "portfolio/cinematic-shots", lazy: () => import("./pages/portfolio/CinematicShots") },
          { path: "portfolio/drone-shots", lazy: () => import("./pages/portfolio/DroneShots") },
          { path: "portfolio/fotografie", lazy: () => import("./pages/portfolio/Fotografie") },
          { path: "portfolio/motion-graphics", lazy: () => import("./pages/portfolio/MotionGraphics") },
          { path: "about", lazy: () => import("./pages/About") },
        ],
      },
      // Standalone juridische pagina's (eigen styling, geen master.css/nav/footer)
      { path: "privacy", lazy: () => import("./pages/Privacy") },
      { path: "voorwaarden", lazy: () => import("./pages/Voorwaarden") },
      { path: "cookies", lazy: () => import("./pages/Cookies") },
    ],
  },
];
