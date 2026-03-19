// ─────────────────────────────────────────────────
// FILE LOCATION: src/LangContext.tsx   ← IMPORTANT
// NOT inside src/components/
// ─────────────────────────────────────────────────
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Lang = 'en' | 'de' | 'sw';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, de: string, sw?: string) => string;
}

const LangContext = createContext<LangCtx>({
  lang: 'en',
  setLang: () => {},
  t: (en) => en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const t = (en: string, de: string, sw?: string) => {
    if (lang === 'sw') return sw || en; // fallback to EN if sw not provided
    if (lang === 'de') return de;
    return en;
  };
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);