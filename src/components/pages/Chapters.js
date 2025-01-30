import { useEffect, useState } from "react";
import { API } from "../api/API";
import useLoad from "../api/useLoad";
import "./Chapters.css";

function Chapters({ subject, onBack }) {
  const chaptersEndpoint = `/api/chapters/subject/${subject.SubjectID}`;
  console.log("Fetching chapters from:", chaptersEndpoint); // Debugging

  // ✅ Move this hook to the top level
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

      {loadingMessage && <p>{loadingMessage}</p>}

      {!chapters ? (
        <p>Loading...</p>
      ) : chapters.length === 0 ? (
        <p>No chapters found</p>
      ) : (
        <div className="chapters-container">
          {chapters.map((chapter) => (
            <div className="chapters-card" key={chapter.chapterName}>
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
