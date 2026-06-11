import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";
import "./Setup.css";

export default function Setup() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories))
      .catch((error) => console.error(error));
  }, []);

  function handleStart() {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (difficulty) params.set("difficulty", difficulty);
    navigate(`/quiz?${params.toString()}`);
  }

  return (
    <div className="setup-container">
      <h1>{t("setup.title")}</h1>

      <div className="setup-field">
        <label htmlFor="category">{t("setup.categoryLabel")}</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">{t("setup.allCategories")}</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="setup-field">
        <label htmlFor="difficulty">{t("setup.difficultyLabel")}</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">{t("setup.allDifficulties")}</option>
          <option value="easy">{t("setup.easy")}</option>
          <option value="medium">{t("setup.medium")}</option>
          <option value="hard">{t("setup.hard")}</option>
        </select>
      </div>

      <button className="start-button" onClick={handleStart}>
        {t("setup.startButton")}
      </button>
    </div>
  );
}
