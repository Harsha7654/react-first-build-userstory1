import { useEffect, useState } from "react";
import { API } from "../api/API";
import "./Subject.css";

function Subjects() {
  // Initialisation ---------------------------
  const loggedinUserID = 1;
  const endpoint = `/subjects/lecturer/${loggedinUserID}`;

  // State --------------------------------
  const [subjects, setSubjects] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Context ------------------------------
  // Methods ------------------------------
  const apiCall = async (endpoint) => {
    const response = await API.get(endpoint);
    response.isSuccess
      ? setSubjects(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    apiCall(endpoint);
  }, [endpoint]);

  // View ---------------------------------
  return (
    <section>
      <h1>My Subjects</h1>

      {!subjects ? (
        <p>{loadingMessage}</p>
      ) : subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        <div className="subjects-container">
          {subjects.map((subject) => (
            <div className="subject-card" key={subject.SubjectName}>
              <div className="subject-title">{subject.SubjectName}</div>
              <div className="subject-lecturer">
                {subject.SubjectLecturerName}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Subjects;
