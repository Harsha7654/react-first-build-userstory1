import { useState } from "react";

function Subjects() {
  // Initialisation ---------------------------
  const loggedinUserID = 5;
  const endpoint = `/subjects/users/${loggedinUserID}`;

  // State --------------------------------
  const [subjects, setSubjects] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  // Context ------------------------------
  // Methods ------------------------------
  const URL = "http://localhost:5000/api";
  const endpointAddress = URL + endpoint;

  fetch("http://localhost:5000/api/subjects/users/5", { mode: "no-cors" })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));

  // View ---------------------------------
  return (
    <section>
      <h1>My Subjects</h1>

      {!subjects ? (
        <p>{loadingMessage}</p>
      ) : subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        subjects.map((subject) => <p>{subject.SubjectName}</p>)
      )}
    </section>
  );
}

export default Subjects;
