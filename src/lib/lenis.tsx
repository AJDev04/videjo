import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/**
 * Zet Lenis smooth scrolling op voor de hele app. Draait alleen client-side
 * (useEffect), dus veilig voor de statische pre-render. Scrollt naar boven bij
 * elke route-wissel.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const instance = new Lenis();
    setLenis(instance);

    let rafId = 0;
    const loop = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) {
      if (typeof window !== "undefined" && !hash) window.scrollTo(0, 0);
      return;
    }
    if (hash) {
      // wacht tot de nieuwe pagina gemonteerd is, scroll dan naar het anker
      const id = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }, 50);
      return () => clearTimeout(id);
    }
    lenis.scrollTo(0, { immediate: true });
  }, [pathname, hash, lenis]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
