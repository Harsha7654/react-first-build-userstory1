import { useEffect, useState } from "react";
import { API } from "../api/API";
import useLoad from "../api/useLoad";

function Chapters({ subject, onBack }) {
  //const [chapters, setChapters] = useState([]); // Ensure chapters is always an array
  const [loading, setLoading] = useState(true);

  const chaptersEndpoint = `/chapters/subject/${subject.subject_id}`;

  const [chapters, loadingMessage, loadChapters] = useLoad(chaptersEndpoint);
  return (
    <section>
      <button onClick={onBack}>← Back to Subjects</button>
      <h2>{subject.name} - Chapters</h2>

      {!chapters ? (
        <p>{loadingMessage}</p>
      ) : chapters.length === 0 ? ( // Check only after ensuring chapters is an array
        <p>No chapters found</p>
      ) : (
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.chapter_id}>
              <h3>{chapter.title}</h3>
              <p>{chapter.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Chapters;
