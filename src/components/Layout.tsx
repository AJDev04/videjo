import { Outlet, useLocation } from "react-router-dom";
import { LenisProvider } from "../lib/lenis";
import { useScrollReveal } from "../lib/useScrollReveal";
import { NotificationProvider } from "./Notifications";
import CustomCursor from "./CustomCursor";
import CookieBar from "./CookieBar";

/**
 * Root-layout voor ALLE routes: Lenis smooth scrolling, toast-context,
 * custom cursor en scroll-onthul. Bevat bewust géén nav/footer/master.css,
 * zodat de standalone juridische pagina's (eigen styling) ongemoeid blijven.
 */
function RootInner() {
  const { pathname } = useLocation();
  useScrollReveal(pathname);

  return (
    <>
      <Outlet />
      <CustomCursor />
      <CookieBar />
    </>
  );
}

export default function Layout() {
  return (
    <LenisProvider>
      <NotificationProvider>
        <RootInner />
      </NotificationProvider>
    </LenisProvider>
  );
}
