import { useEffect, useState } from "react";
import { Tray, Add } from "../UI/Actions.js";
import SubjectForm from "../entities/subjects/SubjectForm.js";
import { API } from "../api/API";
import "./Subject.css";

function Subjects() {
  // Initialisation ---------------------------
  const loggedinUserID = 1;
  //const endpoint = `/subjects/lecturer/${loggedinUserID}`;
  const subjectsEndpoint = `/subjects`;

  // State --------------------------------
  const [subjects, setSubjects] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading records ...");

  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);
  const [showJoinSubjectForm, setShowJoinSubjectForm] = useState(false);

  // Context ------------------------------
  // Methods ------------------------------
  const getSubjects = async () => {
    const response = await API.get(`/subjects`);
    response.isSuccess
      ? setSubjects(response.result)
      : setLoadingMessage(response.message);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const handleAdd = () => setShowNewSubjectForm(true);
  const handleJoin = () => setShowJoinSubjectForm(true);
  const handleDismissAdd = () => setShowNewSubjectForm(false);
  const handleDismissJoin = () => setShowJoinSubjectForm(false);

  const handleSubmit = async (subject) => {
    const response = await API.post(subjectsEndpoint, subject);
    return response.isSuccess ? getSubjects() || true : false;
  };

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
              <div className="subject-image">{subject.SubjectImageURL}</div>
              <div className="subject-lecturer">
                {subject.SubjectLecturerName}
              </div>
            </div>
          ))}
        </div>
      )}

      <p>&nbsp;</p>
      <Tray>
        <Add showText onClick={handleAdd} buttonText="Add new Subject" />
        <Add showText onClick={handleJoin} buttonText="Join a Subject" />
      </Tray>

      {showNewSubjectForm && (
        <SubjectForm onDismiss={handleDismissAdd} onSubmit={handleSubmit} />
      )}
      {showJoinSubjectForm && <p>{"<JoinSubjectForm />"}</p>}
    </section>
  );
}

export default Subjects;
