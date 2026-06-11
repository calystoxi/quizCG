import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/quiz";
import Home from "./pages/home";
import Setup from "./pages/Setup";
import ThemeToggle from "./components/ThemeToggle";
import LanguageToggle from "./components/LanguageToggle";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ThemeToggle />
          <LanguageToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

