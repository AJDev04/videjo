import { useRef, useState } from "react";
import Seo from "./Seo";

export interface PortfolioItem {
  videoSrc: string;
  poster: string;
  title: string;
  desc: string;
}

export interface PortfolioItemPageData {
  /** modifier-class, bv. "pf-auto" | "pf-cinematic" | ... */
  theme: string;
  title: string;
  items: PortfolioItem[];
  canonical: string;
  pageCss: string;
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.muted = false;
    v.play();
  };

  const togglePause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      v.muted = true;
      setPlaying(false);
    }
  };

  const onEnded = () => {
    const v = videoRef.current;
    if (v) v.muted = true;
    setPlaying(false);
  };

  return (
    <article className={`pf-card fade-up${playing ? " playing" : ""}`}>
      <div className="pf-video">
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.poster}
          muted
          playsInline
          onClick={togglePause}
          onEnded={onEnded}
        ></video>
        <button className="play-btn" aria-label="Afspelen" onClick={play}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <div className="pf-info">
        <h3 className="pf-title">{item.title}</h3>
        <p className="pf-desc">{item.desc}</p>
      </div>
    </article>
  );
}

export default function PortfolioItemPage(data: PortfolioItemPageData) {
  return (
    <>
      <Seo
        title="VIDEJO"
        canonical={data.canonical}
        pageCss={data.pageCss}
      />
      <section className={`section pf-section ${data.theme}`}>
        <div className="container">
          <header className="section-header fade-up">
            <p className="section-subtitle">Portfolio</p>
            <h2 className="section-title">{data.title}</h2>
          </header>

          <div className="pf-grid stagger-children">
            {data.items.map((item, i) => (
              <PortfolioCard item={item} key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
