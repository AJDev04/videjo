import Seo from "../components/Seo";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import ExpertiseFilter from "../components/ExpertiseFilter";
import { useT } from "../lib/i18n";

export const Component = () => {
  const t = useT();
  return (
  <>
    <Seo
      title="Expertise | VIDEJO"
      description="De expertises van VIDEJO: film, drones, motion en fotografie voor Belgische merken."
      canonical="https://videjo.be/expertise"
      og={{
        title: "Expertise | VIDEJO",
        description:
          "De expertises van VIDEJO: film, drones, motion en fotografie.",
        type: "website",
        url: "https://videjo.be/expertise",
        image: "https://videjo.be/images/og-image.jpg",
        locale: "nl_BE",
      }}
    />

    <BrandHero title={t.expertise.title} />

    <TabSection title={t.expertise.title}>
      <ExpertiseFilter />
    </TabSection>
  </>
  );
};
