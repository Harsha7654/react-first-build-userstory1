import { useParams, useLocation, useNavigate } from "react-router-dom";
import useLoad from "../api/useLoad";
import "./Chapters.css";
import { CardContainer } from "../UI/Card.js";
import ChapterCard from "../entities/chapters/ChapterCard.js";

function Chapters() {
  // Get subject from route params and location state
  const { subjectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get subject from location state or fetch it if not available
  const subject = location.state?.subject;

  // Initialisation
  const chaptersEndpoint = `/chapters/subject/${subjectId}`;

  // State
  const [chapters, loadingMessage, loadChapters] = useLoad(chaptersEndpoint);

  const handleChapterClick = (chapter) => {
    navigate(`/subjects/${subjectId}/chapters/${chapter.chapter_id}/quizzes`, {
      state: { chapter, subject },
    });
  };

  const handleBacktoSubjects = () => {
    navigate("/subjects");
  };

  // Remove or comment out these handlers since we no longer need them
  // const handleModify = (chapter) => {
  //   // Your modify chapter logic
  // };

  // const handleDelete = (chapterId) => {
  //   // Your delete chapter logic
  // };

  return (
    <section>
      <button onClick={handleBacktoSubjects}>← Back to Subjects</button>
      <h2>{subject ? subject.name : "Subject"} - Chapters</h2>

      {!chapters ? (
        <p>Loading...</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <CardContainer>
          {chapters.map((chapter) => (
            <ChapterCard
              key={chapter.chapter_id}
              chapter={chapter}
              onChapterClick={handleChapterClick}
              // Remove these props to hide the modify and delete buttons
              // onModify={handleModify}
              // onDelete={handleDelete}
            />
          ))}
        </CardContainer>
      )}
    </section>
  );
}

export default Chapters;
