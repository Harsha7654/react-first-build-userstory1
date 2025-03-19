import { useParams, useLocation, useNavigate } from "react-router-dom";
import useLoad from "../api/useLoad";
import "./Quizzes.css";
import { CardContainer } from "../UI/Card.js";
import QuizCard from "../entities/quizzes/QuizCard.js";
import { useState } from "react";
import { Modal, useModal } from "../UI/Modal.js";
import { API } from "../api/API";

function Quizzes() {
  // Get chapter from route params and location state
  const { subjectId, chapterId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get chapter and subject from location state
  const chapter = location.state?.chapter;
  const subject = location.state?.subject;

  // Modal state for actions
  const [showModal, modalContent, openModal, closeModal] = useModal();
  const [modalTitle, setModalTitle] = useState("");

  // Initialisation
  const quizzesEndpoint = `/quizzes/chapter/${chapterId}`;

  // State
  const [quizzes, loadingMessage, loadQuizzes] = useLoad(quizzesEndpoint);

  // Methods
  const handleBackToChapters = () => {
    navigate(`/subjects/${subjectId}/chapters`, { state: { subject } });
  };

  const handleQuizClick = (quiz) => {
    // Navigate to take the quiz or view quiz details
    console.log("Quiz clicked:", quiz);
    // Example: navigate to quiz details/take quiz page
    // navigate(`/subjects/${subjectId}/chapters/${chapterId}/quizzes/${quiz.quiz_id}`, { state: { quiz, chapter, subject } });
  };

  // These handlers are removed or commented out since we don't need them anymore
  // const handleModify = (quiz) => {...}
  // const handleDelete = (quizId) => {...}
  // const confirmDelete = async (quizId) => {...}

  return (
    <section>
      <button onClick={handleBackToChapters}>← Back to Chapters</button>
      <h2>{chapter ? chapter.chapterName : "Chapter"} - Quizzes</h2>

      {!quizzes ? (
        <p>{loadingMessage || "Loading..."}</p>
      ) : quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
        <CardContainer>
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.quiz_id}
              quiz={quiz}
              onQuizClick={handleQuizClick}
              // Remove these props to hide the modify and delete buttons
              // onModify={handleModify}
              // onDelete={handleDelete}
            />
          ))}
        </CardContainer>
      )}

      <Modal show={showModal} title={modalTitle} onClose={closeModal}>
        {modalContent}
      </Modal>
    </section>
  );
}

export default Quizzes;
