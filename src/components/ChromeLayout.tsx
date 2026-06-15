import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import masterCss from "../../css/master.css?inline";

/**
 * Layout voor de hoofdpagina's (home, diensten, projecten, about): het
 * gedeelde design-systeem (master.css) + nav, footer en cookie-balk.
 * master.css wordt per route geïnjecteerd zodat de juridische pagina's —
 * die in de originele site géén master.css laden — ongewijzigd blijven.
 */
export default function ChromeLayout() {
  return (
    <>
      <style type="text/css" dangerouslySetInnerHTML={{ __html: masterCss }} />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
