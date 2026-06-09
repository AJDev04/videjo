import type { ReactNode } from "react";
import Seo, { type SeoProps } from "./Seo";
import SmartLink from "./SmartLink";

interface Stat {
  number: string;
  label: string;
}
interface ServiceItem {
  number: string;
  title: string;
  desc: string;
}

export interface ServicePageData {
  theme: string; // svc-drones | svc-film | svc-motion
  heroId: string;
  ctaId: string;
  label: string;
  titleLines: [string, string];
  subtitle: string;
  showcaseDescription: string;
  stats: Stat[];
  servicesTitle: string;
  services: ServiceItem[];
  ctaHeading: string;
  ctaParagraph: ReactNode;
  seo: SeoProps;
}

export default function ServicePage(data: ServicePageData) {
  return (
    <div className={data.theme}>
      <Seo {...data.seo} />

      <section className="svc-hero" id={data.heroId}>
        <div className="svc-hero-content">
          <p className="svc-label">{data.label}</p>
          <h1 className="svc-title">
            <span className="title-line">{data.titleLines[0]}</span>
            <span className="title-line">{data.titleLines[1]}</span>
          </h1>
          <p className="svc-subtitle">{data.subtitle}</p>
        </div>
        <SmartLink to="#showcase" className="scroll-hint">
          <span>Scroll om te verkennen</span>
          <div className="scroll-line"></div>
        </SmartLink>
      </section>

      <section className="svc-showcase">
        <div className="container" id="showcase">
          <div className="showcase-text">
            <div className="container">
              <h2 className="section-title fade-up">Ons Materiaal</h2>
              <p className="showcase-description fade-up">
                {data.showcaseDescription}
              </p>
              <div className="showcase-stats fade-up">
                {data.stats.map((s) => (
                  <div className="stat" key={s.label}>
                    <span className="stat-number">{s.number}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-services" id="services">
        <div className="container">
          <div className="section-header fade-up">
            <p className="section-subtitle">Toepassingen</p>
            <h2 className="section-title">{data.servicesTitle}</h2>
          </div>
          <div className="services-grid">
            {data.services.map((item) => (
              <div className="service-item fade-up" key={item.number}>
                <div className="service-number">{item.number}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-cta" id={data.ctaId}>
        <div className="container">
          <div className="cta-content fade-up">
            <h2>{data.ctaHeading}</h2>
            <p>{data.ctaParagraph}</p>
            <SmartLink to="/#contact" className="btn btn-primary">
              Neem contact op
            </SmartLink>
          </div>
        </div>
      </section>
    </div>
  );
}
