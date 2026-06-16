import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import {
  createProject,
  deleteProject,
  getProjects,
  isLoggedIn,
  login,
  logout,
  updateProject,
} from "../lib/api";
import { sortProjects, type AdminProject, type LocalizedText } from "../lib/projects";
import { LANGS, LANG_LABELS, type Lang } from "../lib/lang";
import adminCss from "./Admin.css?inline";

const emptyTri = (): LocalizedText => ({ nl: "", fr: "", en: "" });

const blankDraft = (order: number): AdminProject => ({
  slug: "",
  order,
  logo: "",
  name: emptyTri(),
  videos: [],
  info: emptyTri(),
});

/** Losse transform voor het slug-veld; de worker maakt het finaal schoon. */
const looseSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]+/g, "-");

/**
 * Verborgen beheerpagina (/admin, niet in nav/sitemap, noindex). Inloggen met
 * het admin-wachtwoord, daarna projecten toevoegen/bewerken/verwijderen: logo
 * (upload → data-URL), titel + uitleg in NL/FR/EN, en video-URL's. Schrijft naar
 * de Cloudflare-Worker-API; de wijzigingen verschijnen meteen live in de grid.
 */
export const Component = () => {
  const [authed, setAuthed] = useState(false);

  // login
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // data
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // editor
  const [draft, setDraft] = useState<AdminProject | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [langTab, setLangTab] = useState<Lang>("nl");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const list = await getProjects();
      setProjects(sortProjects(list));
      setLoadError(null);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Kon projecten niet laden");
    }
  };

  // Token pas ná mount lezen (sessionStorage), zodat SSR/hydratie overeenkomen.
  useEffect(() => {
    if (isLoggedIn()) {
      setAuthed(true);
      void refresh();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      await login(password);
      setAuthed(true);
      setPassword("");
      await refresh();
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Inloggen mislukt");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
    setDraft(null);
    setProjects([]);
  };

  const startNew = () => {
    const nextOrder = projects.reduce((m, p) => Math.max(m, p.order), 0) + 1;
    setDraft(blankDraft(nextOrder));
    setEditingSlug(null);
    setSlugTouched(false);
    setLangTab("nl");
    setSaveError(null);
  };

  const startEdit = (p: AdminProject) => {
    setDraft({ ...p, name: { ...p.name }, info: { ...p.info }, videos: [...p.videos] });
    setEditingSlug(p.slug);
    setSlugTouched(true);
    setLangTab("nl");
    setSaveError(null);
  };

  const patch = (partial: Partial<AdminProject>) =>
    setDraft((d) => (d ? { ...d, ...partial } : d));

  const setName = (lang: Lang, value: string) =>
    setDraft((d) => {
      if (!d) return d;
      const name = { ...d.name, [lang]: value };
      const slug = !slugTouched && lang === "nl" ? looseSlug(value) : d.slug;
      return { ...d, name, slug };
    });

  const setInfo = (lang: Lang, value: string) =>
    setDraft((d) => (d ? { ...d, info: { ...d.info, [lang]: value } } : d));

  const onLogoFile = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => patch({ logo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  const setVideo = (i: number, value: string) =>
    setDraft((d) => {
      if (!d) return d;
      const videos = [...d.videos];
      videos[i] = value;
      return { ...d, videos };
    });
  const addVideo = () => setDraft((d) => (d ? { ...d, videos: [...d.videos, ""] } : d));
  const removeVideo = (i: number) =>
    setDraft((d) => (d ? { ...d, videos: d.videos.filter((_, j) => j !== i) } : d));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    const payload: AdminProject = {
      ...draft,
      slug: looseSlug(draft.slug || draft.name.nl),
      order: Number(draft.order) || 0,
      videos: draft.videos.map((v) => v.trim()).filter(Boolean),
    };
    try {
      if (!payload.name.nl.trim()) throw new Error("Titel (NL) is verplicht");
      if (!payload.logo) throw new Error("Logo is verplicht");
      if (editingSlug) await updateProject(editingSlug, payload);
      else await createProject(payload);
      await refresh();
      setDraft(null);
      setEditingSlug(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm(`Project "${slug}" verwijderen?`)) return;
    try {
      await deleteProject(slug);
      if (editingSlug === slug) setDraft(null);
      await refresh();
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Verwijderen mislukt");
    }
  };

  return (
    <>
      <Seo title="Beheer | VIDEJO" robots="noindex, nofollow" pageCss={adminCss} />

      <div className="adm">
        <header className="adm-top">
          <span className="adm-brand">VIDEJO · Beheer</span>
          {authed && (
            <button className="adm-btn adm-ghost" onClick={handleLogout} type="button">
              Uitloggen
            </button>
          )}
        </header>

        {!authed ? (
          <form className="adm-login" onSubmit={handleLogin}>
            <h1 className="adm-login-title">Inloggen</h1>
            <label className="adm-field">
              <span>Wachtwoord</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                autoComplete="current-password"
              />
            </label>
            {loginError && <p className="adm-error">{loginError}</p>}
            <button className="adm-btn" type="submit" disabled={loggingIn}>
              {loggingIn ? "Bezig…" : "Inloggen"}
            </button>
          </form>
        ) : (
          <main className="adm-main">
            <section className="adm-list-col">
              <div className="adm-list-head">
                <h1 className="adm-h1">Projecten</h1>
                <button className="adm-btn" type="button" onClick={startNew}>
                  + Nieuw
                </button>
              </div>
              {loadError && <p className="adm-error">{loadError}</p>}
              {projects.length === 0 && !loadError && (
                <p className="adm-muted">Nog geen projecten.</p>
              )}
              <ul className="adm-list">
                {projects.map((p) => (
                  <li
                    key={p.slug}
                    className={`adm-item${editingSlug === p.slug ? " is-active" : ""}`}
                  >
                    <div className="adm-thumb">
                      {p.logo && <img src={p.logo} alt="" />}
                    </div>
                    <div className="adm-item-meta">
                      <strong>{p.name.nl || p.slug}</strong>
                      <span>/projecten/{p.slug}</span>
                    </div>
                    <div className="adm-item-actions">
                      <button type="button" onClick={() => startEdit(p)}>
                        Bewerken
                      </button>
                      <button
                        type="button"
                        className="adm-danger"
                        onClick={() => handleDelete(p.slug)}
                      >
                        Verwijderen
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {draft && (
              <form className="adm-editor" onSubmit={handleSave}>
                <h2 className="adm-h2">
                  {editingSlug ? "Project bewerken" : "Nieuw project"}
                </h2>

                {/* Logo */}
                <div className="adm-logo-row">
                  <div className="adm-logo-preview">
                    {draft.logo ? <img src={draft.logo} alt="" /> : <span>logo</span>}
                  </div>
                  <label className="adm-field adm-grow">
                    <span>Logo (SVG of PNG aanbevolen)</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      onChange={(e) => onLogoFile(e.target.files?.[0])}
                    />
                  </label>
                </div>

                {/* Taal-tabs voor titel + uitleg */}
                <div className="adm-tabs">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`adm-tab${langTab === l ? " is-active" : ""}`}
                      onClick={() => setLangTab(l)}
                    >
                      {LANG_LABELS[l]}
                      {draft.name[l].trim() && <i className="adm-dot" />}
                    </button>
                  ))}
                </div>

                <label className="adm-field">
                  <span>Titel ({LANG_LABELS[langTab]})</span>
                  <input
                    type="text"
                    value={draft.name[langTab]}
                    onChange={(e) => setName(langTab, e.target.value)}
                  />
                </label>

                <label className="adm-field">
                  <span>Project-info ({LANG_LABELS[langTab]})</span>
                  <textarea
                    rows={5}
                    value={draft.info[langTab]}
                    onChange={(e) => setInfo(langTab, e.target.value)}
                  />
                </label>

                {/* Video's */}
                <div className="adm-field">
                  <span>Video-URL's (YouTube, Vimeo of mp4)</span>
                  {draft.videos.map((v, i) => (
                    <div className="adm-video-row" key={i}>
                      <input
                        type="url"
                        value={v}
                        placeholder="https://…"
                        onChange={(e) => setVideo(i, e.target.value)}
                      />
                      <button
                        type="button"
                        className="adm-mini adm-danger"
                        onClick={() => removeVideo(i)}
                        aria-label="Verwijder video"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button type="button" className="adm-mini" onClick={addVideo}>
                    + Video toevoegen
                  </button>
                </div>

                <div className="adm-grid2">
                  <label className="adm-field">
                    <span>Slug (URL)</span>
                    <input
                      type="text"
                      value={draft.slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        patch({ slug: looseSlug(e.target.value) });
                      }}
                    />
                  </label>
                  <label className="adm-field">
                    <span>Volgorde</span>
                    <input
                      type="number"
                      value={draft.order}
                      onChange={(e) => patch({ order: Number(e.target.value) })}
                    />
                  </label>
                </div>

                {saveError && <p className="adm-error">{saveError}</p>}

                <div className="adm-actions">
                  <button className="adm-btn" type="submit" disabled={saving}>
                    {saving ? "Opslaan…" : "Opslaan"}
                  </button>
                  <button
                    className="adm-btn adm-ghost"
                    type="button"
                    onClick={() => setDraft(null)}
                  >
                    Annuleren
                  </button>
                </div>
              </form>
            )}
          </main>
        )}
      </div>
    </>
  );
};
