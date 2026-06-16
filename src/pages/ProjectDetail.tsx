import { useParams } from "react-router-dom";
import ProjectPage from "../components/ProjectPage";

/** Dynamische projectpagina: /projecten/:slug → laadt het project uit de API. */
export const Component = () => {
  const { slug } = useParams();
  return <ProjectPage slug={slug ?? ""} />;
};
