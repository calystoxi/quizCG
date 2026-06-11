import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Changer de thème"
      title="Changer de thème"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
