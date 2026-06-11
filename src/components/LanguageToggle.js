import { useLanguage } from "../context/LanguageContext";
import "./ThemeToggle.css";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className="theme-toggle language-toggle"
      onClick={toggleLanguage}
      aria-label="Change language"
      title="Change language"
    >
      {language === "fr" ? "FR" : "EN"}
    </button>
  );
}
