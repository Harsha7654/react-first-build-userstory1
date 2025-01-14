import { useEffect, useState } from "react";
import { Tray, Add } from "../UI/Actions.js";
import SubjectForm from "../entities/subjects/SubjectForm.js";
import { API } from "../api/API";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import Chapters from "./Chapters"; // Import Chapters Component

function Subjects() {
  const subjectsEndpoint = `/subjects`;

  const [subjects, loadingMessage, loadSubjects] = useLoad(subjectsEndpoint);
  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);
  const [showJoinSubjectForm, setShowJoinSubjectForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null); // New State

  const handleAdd = () => setShowNewSubjectForm(true);
  const handleJoin = () => setShowJoinSubjectForm(true);
  const handleDismissAdd = () => setShowNewSubjectForm(false);
  const handleDismissJoin = () => setShowJoinSubjectForm(false);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject); // Set the clicked subject
  };

  const handleBackToSubjects = () => setSelectedSubject(null); // Clear selection

  const handleSubmit = async (subject) => {
    const response = await API.post(subjectsEndpoint, subject);
    return response.isSuccess ? loadSubjects(subjectsEndpoint) || true : false;
  };

  if (selectedSubject) {
    // Render Chapters for the selected subject
    return (
      <Chapters
        subject={selectedSubject}
        onBack={handleBackToSubjects} // Back to Subjects button
      />
    );
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
              key={subject.name}
              onClick={() => handleSubjectClick(subject)} // Handle click
            >
              <div className="subject-title">{subject.name}</div>
              <div className="subject-image">
                Difficulty: {subject.difficulty}
              </div>
              <div className="subject-image">Level: {subject.level}</div>
              <div className="subject-lecturer">{subject.image}</div>
            </div>
          ))}
        </div>
      )}

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
