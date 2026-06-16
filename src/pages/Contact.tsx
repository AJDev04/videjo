import { useState, type ChangeEvent, type FormEvent } from "react";
import Seo from "../components/Seo";
import BrandHero from "../components/BrandHero";
import TabSection from "../components/TabSection";
import { useT } from "../lib/i18n";
import { sendContact } from "../lib/contact";
import contactCss from "../../css/contact.css?inline";

// Centraal contactadres (zelfde als waar het EmailJS-formulier naartoe stuurt).
const EMAIL = "info@videjo.be";
const PHONES = [
  { label: "+32 494 27 62 76", tel: "+32494276276" },
  { label: "+32 475 83 13 51", tel: "+32475831351" },
];
const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/videjobe/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/videjo.be/", icon: "instagram" },
  { label: "TikTok", href: "https://www.tiktok.com/@videjo.be", icon: "tiktok" },
] as const;

// Kleine inline-iconen (geen icon-library nodig). currentColor volgt de CSS.
const Icon = ({ name }: { name: "mail" | "phone" | "linkedin" | "instagram" | "tiktok" }) => {
  switch (name) {
    case "mail":
      return (
        <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z" />
        </svg>
      );
  }
};

export const Component = () => {
  const t = useT();
  const [form, setForm] = useState({ naam: "", bedrijf: "", email: "", project: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const update =
    (key: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  // Verstuurt via EmailJS (src/lib/contact.ts → naar info@videjo.be). Geen
  // backend nodig; bij succes leegt het formulier, bij fout tonen we een melding.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    sendContact({
      name: form.naam,
      company: form.bedrijf,
      email: form.email,
      message: form.project,
    })
      .then(() => {
        setStatus("sent");
        setForm({ naam: "", bedrijf: "", email: "", project: "" });
      })
      .catch(() => setStatus("error"));
  };

  return (
    <>
      <Seo
        title="Contact | VIDEJO"
        description="Neem contact op met VIDEJO. Vertel ons over je project — film, drone, motion of fotografie — en we maken jouw visie een realiteit."
        canonical="https://videjo.be/contact"
        og={{
          title: "Contact | VIDEJO",
          description:
            "Neem contact op met VIDEJO en laat ons jouw visie een realiteit maken.",
          type: "website",
          url: "https://videjo.be/contact",
          image: "https://videjo.be/images/og-image.jpg",
          locale: "nl_BE",
        }}
        pageCss={contactCss}
      />

      <BrandHero title={t.contact.title} titleAbove />

      <TabSection title={t.contact.title}>
        <div className="contact-inner">
          <div className="contact-info">
            <h2 className="contact-tagline">{t.contact.tagline}</h2>

            <ul className="contact-details">
              <li>
                <Icon name="mail" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              {PHONES.map((p) => (
                <li key={p.tel}>
                  <Icon name="phone" />
                  <a href={`tel:${p.tel}`}>{p.label}</a>
                </li>
              ))}
            </ul>

            <div className="contact-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className="contact-social"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="naam">{t.contact.naam}</label>
              <input
                id="naam"
                name="naam"
                type="text"
                required
                value={form.naam}
                onChange={update("naam")}
                placeholder={t.contact.naamPh}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="bedrijf">{t.contact.bedrijf}</label>
              <input
                id="bedrijf"
                name="bedrijf"
                type="text"
                value={form.bedrijf}
                onChange={update("bedrijf")}
                placeholder={t.contact.bedrijfPh}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="email">{t.contact.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder={t.contact.emailPh}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="project">{t.contact.project}</label>
              <textarea
                id="project"
                name="project"
                required
                value={form.project}
                onChange={update("project")}
                placeholder={t.contact.projectPh}
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? t.contact.sending : t.contact.submit}
            </button>

            {status === "sent" && (
              <p className="contact-note">{t.contact.note}</p>
            )}
            {status === "error" && (
              <p className="contact-note contact-note--error">
                {t.contact.error}
              </p>
            )}
          </form>
        </div>
      </TabSection>
    </>
  );
};
