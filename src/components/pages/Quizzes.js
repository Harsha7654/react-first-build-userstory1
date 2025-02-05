import { useState } from "react";
import useLoad from "../api/useLoad";
import "./Quizzes.css";
import Questions from "./Questions";

function Quizzes({ chapter, onBack }) {
  const quizzesEndpoint = `/quizzes/chapter/${chapter.chapter_id}`;
  console.log("Fetching quizzes from:", quizzesEndpoint);

  const [quizzes, loadingMessage, loadQuizzes] = useLoad(quizzesEndpoint);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz);
  };

  if (!chapter || !chapter.chapter_id) {
    console.error("Error: Invalid chapter object", chapter);
    return <p>Error: No chapter data available</p>;
  }

  if (selectedQuiz) {
    return <Questions />;
  }

  return (
    <section>
      <button onClick={onBack}>Back to Chapters</button>
      <h2>{chapter.chapterName} - Quizzes</h2>

      {!quizzes ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
        <div className="quizzes-container">
          {quizzes.map((quiz) => (
            <div
              className="quiz-card"
              key={quiz.quiz_id}
              onClick={() => handleQuizClick(quiz)}
            >
              <div>Quiz Title: {quiz.quizTitle}</div>
              <div>Quiz Duration: {quiz.quizDuration}</div>
              <div>No. of questions: {quiz.quizQuestions}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Quizzes;
