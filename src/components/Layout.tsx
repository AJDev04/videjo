import { Outlet, useLocation } from "react-router-dom";
import { LenisProvider } from "../lib/lenis";
import { LangProvider } from "../lib/lang";
import { useScrollReveal } from "../lib/useScrollReveal";
import { NotificationProvider } from "./Notifications";
import CookieBar from "./CookieBar";

/**
 * Root-layout voor ALLE routes: Lenis smooth scrolling, toast-context en
 * scroll-onthul. Bevat bewust géén nav/footer/master.css, zodat de
 * standalone juridische pagina's (eigen styling) ongemoeid blijven.
 * (CustomCursor.tsx staat er nog maar wordt bewust niet gemount.)
 */
function RootInner() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <>
      <Outlet />
      <CookieBar />
    </>
  );
}

export default function Layout() {
  return (
    <LangProvider>
      <LenisProvider>
        <NotificationProvider>
          <RootInner />
        </NotificationProvider>
      </LenisProvider>
    </LangProvider>
  );
}
