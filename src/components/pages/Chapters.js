import useLoad from "../api/useLoad";
import "./Chapters.css";

function Chapters({ subject, onBack }) {
  const chaptersEndpoint = `/chapters/subject/${subject.SubjectID}`;
  console.log("Fetching chapters from:", chaptersEndpoint); // Debugging

  const [chapters, loadingMessage, loadChapters] = useLoad(chaptersEndpoint);

  // Ensure subject is valid before proceeding
  if (!subject || !subject.SubjectID) {
    console.error("Error: Invalid subject object", subject);
    return <p>Error: No subject data available.</p>;
  }

  return (
    <section>
      <button onClick={onBack}>← Back to Subjects</button>
      <h2>{subject.name} - Chapters</h2>

      {!chapters ? (
        <p>Loading...</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <div className="chapters-container">
          {chapters.map((chapter) => (
            <div className="chapters-card" key={chapter.chapter_id}>
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
