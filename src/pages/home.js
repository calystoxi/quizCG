import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Home.css";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="home-container">
      <h1>{t("home.title")}</h1>
      <p className="home-description">{t("home.description")}</p>
      <Link to="/setup" className="start-link">
        <button className="start-button" aria-label={t("home.startButton")}>
          {t("home.startButton")}
        </button>
      </Link>
    </div>
  );
}
