import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import useLoad from "../api/useLoad";
import "./Chapters.css";

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

  // Methods
  const handleChapterClick = (chapter) => {
    navigate(`/subjects/${subjectId}/chapters/${chapter.chapter_id}/quizzes`, {
      state: { chapter, subject },
    });
  };

  const handleBacktoSubjects = () => {
    navigate("/subjects");
  };

  // Ensure subject ID is valid before proceeding
  if (!subjectId) {
    console.error("Error: Invalid subject ID");
    return <p>Error: No subject data available.</p>;
  }

  return (
    <section>
      <button onClick={handleBacktoSubjects}>← Back to Subjects</button>
      <h2>{subject ? subject.name : "Subject"} - Chapters</h2>

      {!chapters ? (
        <p>Loading...</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <div className="chapters-container">
          {chapters.map((chapter) => (
            <div
              className="chapters-card"
              key={chapter.chapter_id}
              onClick={() => handleChapterClick(chapter)}
            >
              <p> Welcome {chapter.chapter_id}</p>
              <div>Title: {chapter.chapterName}</div>
              <div>Author: {chapter.chapterAuthor}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Chapters;
