import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "fr"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  function toggleLanguage() {
    setLanguage((l) => (l === "fr" ? "en" : "fr"));
  }

  function t(key) {
    const value = key
      .split(".")
      .reduce((obj, part) => obj?.[part], translations[language]);
    return value ?? key;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
