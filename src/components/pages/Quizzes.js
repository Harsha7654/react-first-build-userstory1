import { useParams, useLocation, useNavigate } from "react-router-dom";
import useLoad from "../api/useLoad";
import "./Quizzes.css";

function Quizzes() {
  // Get chapter from route params and location state
  const { subjectId, chapterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get chapter and subject from location state
  const chapter = location.state?.chapter;
  const subject = location.state?.subject;

  // Initialisation
  const quizzesEndpoint = `/quizzes/chapter/${chapterId}`;

  // State
  const [quizzes, loadingMessage] = useLoad(quizzesEndpoint);

  const handleBackToChapters = () => {
    navigate(`/subjects/${subjectId}/chapters`, { state: { subject } });
  };

  return (
    <section>
      <button onClick={handleBackToChapters}>← Back to Chapters</button>
      <h2>{chapter ? chapter.chapterName : "Chapter"} - Quizzes</h2>

      {!quizzes ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
        <div className="quizzes-container">
          {quizzes.map((quiz) => (
            <div className="quiz-card" key={quiz.quiz_id}>
              <div>Title: {quiz.quizTitle}</div>
              <div>Description: {quiz.quizDescription}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Quizzes;
