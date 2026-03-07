import { createContext, useContext, useState, type ReactNode } from 'react';

type Lang = 'en' | 'de';

interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (en: string, de: string) => string; }

const LangContext = createContext<LangCtx>({ lang: 'en', setLang: () => {}, t: (en) => en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = (en: string, de: string) => lang === 'en' ? en : de;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);