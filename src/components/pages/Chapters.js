import { useState, useEffect } from "react";
import { Tray, Add } from "../UI/Actions";
import useLoad from "../api/useLoad";
import SubjectForm from "../entities/subjects/SubjectForm";

function Chapters({ subject, onBack }) {
  const chaptersEndpoint = `/chapters?subjectId=${subject.id}`; // Fetch chapters by subject ID
  const [chapters, loadingMessage, loadChapters] = useLoad(chaptersEndpoint);
  const [showNewChapterForm, setShowNewChapterForm] = useState(false);

  const handleAdd = () => setShowNewChapterForm(true);
  const handleDismissAdd = () => setShowNewChapterForm(false);

  const handleSubmit = async (chapter) => {
    console.log("Chapters - handleSubmit");
    // Post new chapter for the selected subject
    /*
    chapter.subjectId = subject.id;
    const response = await API.post(chaptersEndpoint, chapter);
    return response.isSuccess ? loadChapters(chaptersEndpoint) || true : false;
    */
  };

  return (
    <section>
      <h1>Chapters for {subject.name}</h1>
      <button onClick={onBack}>Back to Subjects</button> {/* Back button */}
      {!chapters ? (
        <p>{loadingMessage}</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <div className="subjects-container">
          {chapters.map((chapter) => (
            <div className="subject-card" key={chapter.chapterName}>
              <div className="subject-title">{chapter.chapterName}</div>
              <div className="subject-image">
                Author: {chapter.chapterAuthor}
              </div>
              <div className="subject-lecturer">{chapter.chapterImage}</div>
            </div>
          ))}
        </div>
      )}
      <Tray>
        <Add showText onClick={handleAdd} buttonText="Add new Chapter" />
      </Tray>
      {showNewChapterForm && (
        <SubjectForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}
    </section>
  );
}

export default Chapters;
