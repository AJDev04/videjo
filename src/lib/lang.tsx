import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "nl" | "fr" | "en";

export const LANGS: Lang[] = ["nl", "fr", "en"];
export const LANG_LABELS: Record<Lang, string> = {
  nl: "Nederlands",
  fr: "Français",
  en: "English",
};

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: "nl", setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "nl";
    const stored = localStorage.getItem("videjo_lang") as Lang | null;
    return stored && (LANGS as string[]).includes(stored) ? stored : "nl";
  });

  const setLang = (l: Lang) => {
    localStorage.setItem("videjo_lang", l);
    setLangState(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLanguage = () => useContext(LangContext);
