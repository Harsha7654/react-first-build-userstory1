import { useEffect, useState } from "react";
import { API } from "../api/API";

function Subjects() {
  // Initialisation ---------------------------
  const loggedinUserID = 5;
  const endpoint = `/subjects/users/${loggedinUserID}`;

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
        subjects.map((subject) => (
          <p key={subject.SubjectName}>
            {subject.SubjectName} - {subject.SubjectLecturerName}
          </p>
        ))
      )}
    </section>
  );
}

export default Subjects;
