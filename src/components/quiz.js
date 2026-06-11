import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import useGamepadControls from "./useGamepad";
import { useLanguage } from "../context/LanguageContext";
import "./quiz.css";

const TIME_PER_QUESTION = 20;

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [focused, setFocused] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (!window.__quizData) {
      const category = searchParams.get("category");
      const difficulty = searchParams.get("difficulty");

      let url = "https://opentdb.com/api.php?amount=10&type=multiple";
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;

      axios
        .get(url)
        .then((res) => {
          const formatted = res.data.results.map((q) => ({
            question: q.question,
            correct: q.correct_answer,
            answers: shuffle([...q.incorrect_answers, q.correct_answer]),
          }));
          setQuestions(formatted);
          window.__quizData = formatted;
        })
        .catch((error) => {
          if (error.response?.status === 429) {
            console.warn("Trop de requêtes API, veuillez patienter.");
          } else {
            console.error(error);
          }
        });
    } else {
      setQuestions(window.__quizData);
    }
  }, [searchParams]);

  useEffect(() => {
    if (questions.length === 0 || finished) return;

    setTimeLeft(TIME_PER_QUESTION);
    let remaining = TIME_PER_QUESTION;

    intervalRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        setSelected((s) => (s === null ? -1 : s));
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [index, questions.length, finished]);

  useEffect(() => {
    if (selected !== null && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [selected]);

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleSelect(i) {
    setSelected(i);
  }

  function nextQuestion() {
    if (selected === null) return;
    const current = questions[index];
    const userAnswer = selected === -1 ? null : current.answers[selected];
    const isCorrect = userAnswer === current.correct;

    if (isCorrect) {
      setScore((score) => score + 1);
    }

    setHistory((h) => [
      ...h,
      {
        question: current.question,
        correct: current.correct,
        userAnswer,
        isCorrect,
      },
    ]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setFocused(null);
    } else {
      setFinished(true);
    }
  }

  useGamepadControls(
    () => {
      if (focused !== null && selected === null) {
        setSelected(focused);
      } else if (selected !== null) {
        nextQuestion();
      }
    },
    () => {
      const max = questions[index]?.answers?.length || 0;
      if (max === 0) return;
      setFocused((prev) => (prev === null ? 0 : (prev - 1 + max) % max));
    },
    () => {
      const max = questions[index]?.answers?.length || 0;
      if (max === 0) return;
      setFocused((prev) => (prev === null ? 0 : (prev + 1) % max));
    }
  );

  if (questions.length === 0) return <p>{t("quiz.loading")}</p>;
 if (finished) {
  let message = "";
  const ratio = score / questions.length;

  if (ratio === 1) {
    message = t("quiz.scorePerfect");
  } else if (ratio > 0.7) {
    message = t("quiz.scoreGood");
  } else if (ratio > 0.4) {
    message = t("quiz.scoreOk");
  } else {
    message = t("quiz.scoreLow");
  }

  return (
    <div className="score-container">
      <h2>{t("quiz.score")} : {score} / {questions.length}</h2>
      <p>{message}</p>

      <div className="recap">
        <h3>{t("quiz.recapTitle")}</h3>
        {history.map((h, i) => (
          <div
            key={i}
            className={`recap-item ${h.isCorrect ? "correct" : "incorrect"}`}
          >
            <p
              className="recap-question"
              dangerouslySetInnerHTML={{ __html: `${i + 1}. ${h.question}` }}
            />
            <p className="recap-answer">
              {t("quiz.yourAnswer")}{" "}
              <span
                className={h.isCorrect ? "correct-text" : "incorrect-text"}
                dangerouslySetInnerHTML={{
                  __html: h.userAnswer ?? t("quiz.noAnswer"),
                }}
              />
            </p>
            {!h.isCorrect && (
              <p className="recap-answer">
                {t("quiz.correctAnswer")}{" "}
                <span
                  className="correct-text"
                  dangerouslySetInnerHTML={{ __html: h.correct }}
                />
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="end-actions">
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          {t("quiz.retryButton")}
        </button>
        <button
          onClick={() => {
            window.__quizData = null;
            navigate("/setup");
          }}
          className="retry-button settings-button"
        >
          {t("quiz.changeSettingsButton")}
        </button>
      </div>
    </div>
  );
}


  return (
    <div style={{ maxWidth: 700, margin: "auto", padding: 20, color: "var(--text-color)" }}>
        <div
  style={{
    height: 10,
    width: "100%",
    backgroundColor: "var(--border-color)",
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  }}
>
  <div
    style={{
      height: "100%",
      width: `${((index + 1) / questions.length) * 100}%`,
      backgroundColor: "var(--accent-color)",
      borderRadius: 5,
      transition: "width 0.3s ease",
    }}
  />
</div>

      <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
        <span>{t("quiz.question")} {index + 1} / {questions.length}</span>
        <span className={`timer ${timeLeft <= 5 ? "timer-low" : ""}`}>
          ⏱ {timeLeft}s
        </span>
      </div>
      {selected === -1 && (
        <p className="timeout-message">{t("quiz.timeUp")}</p>
      )}
      <QuestionCard
        question={questions[index].question}
        answers={questions[index].answers}
        selected={selected}
        focused={focused}
        onSelect={handleSelect}
      />
      <button
        onClick={nextQuestion}
        disabled={selected === null}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          fontSize: 16,
          cursor: selected === null ? "not-allowed" : "pointer",
        }}
      >
        {index + 1 === questions.length ? t("quiz.finishButton") : t("quiz.nextButton")}
      </button>
    </div>
  );
}
