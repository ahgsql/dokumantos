import React, { createContext, useEffect, useState } from "react";
import langs from "../languages/init";
let LangContext;
/**
 * LangProvider component provides language context
 * and handles setting/getting language in localStorage.
 * Exports provider component to make lang state available to children.
 */
export default function LangProvider({ children }) {
  let check = localStorage.getItem("lang");
  let initialLang;

  if (check == null || undefined) {
    // In first place we need to create
    let langOfBrowser = window.navigator.language.slice(0, 2);
    localStorage.setItem("lang", langOfBrowser);
    initialLang = langOfBrowser;
  } else {
    let langFromLocal = localStorage.getItem("lang");
    initialLang = langFromLocal;
  }
  LangContext = createContext();
  const [lang, setLang] = useState(initialLang);
  const t = (key) => {
    return langs[lang].translations[key];
  };
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t, langs }}>
      {children}
    </LangContext.Provider>
  );
}
export { LangContext };
