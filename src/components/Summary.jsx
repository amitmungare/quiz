import React from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

const Summary = ({ userAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const incorrectAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div id="summary">
      <h2>Quiz Completed!</h2>
      {correctAnswersShare > 36 && (
        <img src={quizCompleteImg} alt="quiz complete" />
      )}
      <div className="result-container">
        {correctAnswersShare > 36 ? (
          <h2 className="pass-text">Pass</h2>
        ) : (
          <>
            <h2 className="fail-text">Fail</h2>
            <span className="center-text">
              You need atleast 36% to pass, better luck next time
            </span>
          </>
        )}
      </div>

      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">correct</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text">incorrect</span>
        </p>
      </div>
      <div className="button-container">
        <button className="restart-button" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer == null) {
            cssClass += " skipped";
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>Your answer: {answer ?? "skipped"}</p>
              <p className="correct-answer">
                Correct answer: {QUESTIONS[index].answers[0]}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Summary;
