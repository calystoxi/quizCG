import React from "react";
import "./QuestionCard.css";

export default function QuestionCard({ question, answers, selected, focused, onSelect }) {
  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((answer, i) => {
          const classes = [
            "answer-button",
            selected === i ? "selected" : "",
            focused === i && selected === null ? "focused" : "",
            selected !== null && selected !== i ? "disabled" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              disabled={selected !== null}
              className={classes}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          );
        })}
      </div>
    </div>
  );
}
