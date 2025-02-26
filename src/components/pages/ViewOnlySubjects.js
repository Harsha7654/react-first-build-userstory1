import { useState } from "react";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import Chapters from "./Chapters";

function ViewOnlySubjects() {
  // Initialisation
  //const subjectsUserEndpoint = `/userSubjectAssignments/user/${loggedinUserID}`;
  const subjectsUserEndpoint = `/subjects`;
  // State
  const [subjects, loadingMessage] = useLoad(subjectsUserEndpoint);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject); // Set the clicked subject
  };

  const handleBackToSubjects = () => setSelectedSubject(null);

  if (selectedSubject) {
    return <Chapters subject={selectedSubject} onBack={handleBackToSubjects} />;
  }

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
            <div
              className="subject-card"
              key={subject.subject_id}
              onClick={() => handleSubjectClick(subject)}
            >
              <p>Welcome {subject.UserID}</p>
              <div className="subject-title">{subject.name}</div>
              <div className="subject-image">
                Difficulty: {subject.difficulty}
              </div>
              <div className="subject-image">Level: {subject.level}</div>
              <div className="subject-lecturer">{subject.image}</div>
              <img src={subject.image} alt={subject.name} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ViewOnlySubjects;
