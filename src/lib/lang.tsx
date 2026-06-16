import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "nl" | "fr" | "en";

export const LANGS: Lang[] = ["nl", "fr", "en"];
export const LANG_LABELS: Record<Lang, string> = {
  nl: "Nederlands",
  fr: "Français",
  en: "English",
};

const STORAGE_KEY = "videjo_lang";

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "nl", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  // Start altijd op NL zodat de eerste client-render exact overeenkomt met de
  // (statisch voor-gerenderde) NL-HTML — anders geeft hydratie een mismatch.
  // De opgeslagen voorkeur passen we pas ná mount toe (useEffect).
  const [lang, setLangState] = useState<Lang>("nl");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored && stored !== "nl" && (LANGS as string[]).includes(stored)) {
      setLangState(stored);
    }
  }, []);

  // <html lang="…"> meelaten lopen met de keuze (toegankelijkheid + SEO).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLanguage = () => useContext(LangContext);
