import PortfolioItemPage from "../../components/PortfolioItemPage";
import itemsCss from "../../../css/projecten/items.css?inline";

const LOGO_ITEM = {
  videoSrc: "/images/LOGO_ANIMATION.mp4",
  poster: "/images/logo.png",
  title: "Logo Animatie",
  desc: "VIDEOJO",
};

export const Component = () => (
  <PortfolioItemPage
    theme="pf-motion"
    title="Motion Graphics"
    items={[LOGO_ITEM]}
    canonical="https://videjo.be/projecten/motion-graphics"
    pageCss={itemsCss}
  />
);
