import { useState } from "react";
import TabSection from "./TabSection";
import { useT } from "../lib/i18n";
import { useLanguage } from "../lib/lang";
import { localized, type AdminProject } from "../lib/projects";
import projectBodyCss from "./ProjectBody.css?inline";

/** Zet een video-URL om naar een embed (YouTube/Vimeo via iframe, anders <video>). */
function toEmbed(url: string): { kind: "iframe" | "video"; src: string } {
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return { kind: "iframe", src: `https://www.youtube.com/embed/${yt[1]}` };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { kind: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  return { kind: "video", src: url };
}

/**
 * Inhoud onder de project-landing: een cream TabSection (tab = projectnaam) met
 * een video-carousel (prev/next-pijlen), en daaronder een navy "HET PROJECT"-
 * sectie met de uitleg in de actieve taal. Video's en tekst komen uit de
 * project-data (beheerd via /admin).
 */
export default function ProjectBody({ project }: { project: AdminProject }) {
  const t = useT();
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);

  const name = localized(project.name, lang);
  const info = localized(project.info, lang);
  const videos = project.videos;
  const count = Math.max(videos.length, 1); // minstens 1 (placeholder) slide

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(count - 1, i + 1));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: projectBodyCss }} />

      <TabSection title={name}>
        <div className="pb-showcase">
          {count > 1 && (
            <div className="pb-controls">
              <button
                className="pb-arrow"
                onClick={prev}
                disabled={index === 0}
                aria-label={t.project.prev}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="pb-arrow"
                onClick={next}
                disabled={index === count - 1}
                aria-label={t.project.next}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}

          <div className="pb-viewport">
            <div
              className="pb-track"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {videos.length === 0 ? (
                <div className="pb-slide">
                  <span className="pb-slide-label">Binnenkort beelden</span>
                </div>
              ) : (
                videos.map((url, i) => {
                  const embed = toEmbed(url);
                  return (
                    <div className="pb-slide" key={i} aria-hidden={i !== index}>
                      {embed.kind === "iframe" ? (
                        <iframe
                          src={embed.src}
                          title={`${name} — video ${i + 1}`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <video src={embed.src} controls preload="metadata" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </TabSection>

      {info.trim() !== "" && (
        <section className="pb-about">
          <h2 className="pb-about-title">{t.project.about}</h2>
          <p className="pb-about-text">{info}</p>
        </section>
      )}
    </>
  );
}
