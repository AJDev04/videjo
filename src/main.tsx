import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";

// Globale stylesheets (op elke pagina). reset.css werd in de oude site overal
// geladen; lenis.css regelt het smooth-scroll-gedrag.
import "../css/reset.css";
import "lenis/dist/lenis.css";

export const createRoot = ViteReactSSG({ routes });
