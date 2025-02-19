import { useState } from "react";
import { Tray, Add } from "../UI/Actions.js";
import SubjectForm from "../entities/subjects/SubjectForm.js";
import { API } from "../api/API";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import Chapters from "./Chapters"; // Import Chapters Component
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import Action from "../UI/Actions.js";

function Subjects({ loggedinUserID }) {
  // Initialisation
  const subjectsEndpoint = `/subjects`;
  const subjectsUserEndpoint = `/userSubjectAssignments/user/${loggedinUserID}`;

  // State
  const [subjects, loadingMessage, loadSubjects] =
    useLoad(subjectsUserEndpoint);
  const [students, , loadingStudentsMessage] = useLoad(`/users`);
  const [showNewSubjectForm, setShowNewSubjectForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState(0);
  const [showJoinSubjectForm, setShowJoinSubjectForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null); // New State

  // Methods
  const reloadSubjects = () => loadSubjects(subjectsUserEndpoint);
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

  const handleModifySubmit = async (subject) => {
    const response = await API.put(
      `${subjectsEndpoint}/${subject.subject_id}`,
      subject
    );
    if (response.isSuccess) {
      setSelectedForm(0);
      response.isSuccess && reloadSubjects();
    }
  };

  const handleModify = (id) => setSelectedForm(id === selectedForm ? 0 : id);

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

      <p>Welcome {loggedinUserID.UserUsername}</p>

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
              <p>Welcome {subject.UserID}</p>
              <div className="subject-title">{subject.name}</div>
              <div className="subject-image">
                Difficulty: {subject.difficulty}
              </div>
              <div className="subject-image">Level: {subject.level}</div>
              <div className="subject-lecturer">{subject.image}</div>
              <img src={subject.image} alt={subject.name} />

              <ToolTipDecorator message="Modify">
                <Action.Modify
                  showText
                  onClick={(event) => {
                    event.stopPropagation();
                    handleModify(subject.subject_id);
                  }}
                  buttonText="Modify"
                />
              </ToolTipDecorator>

              {selectedForm === subject.subject_id && (
                <SubjectForm
                  onCancel={handleDismissAdd}
                  onSubmit={handleModifySubmit}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <Action.Tray>
        <ToolTipDecorator message="Add new subject">
          <Action.Add
            showText
            onClick={handleAdd}
            buttonText="Add a new subject"
          />
        </ToolTipDecorator>
        <ToolTipDecorator message="Join a subject">
          <Action.Add
            showText
            onClick={handleJoin}
            buttonText="Join a subject"
          />
        </ToolTipDecorator>
      </Action.Tray>

      {showNewSubjectForm && (
        <SubjectForm onCancel={handleDismissAdd} onSubmit={handleSubmit} />
      )}
      {showJoinSubjectForm && (
        /*
        <SubjectassignmentForm
          onCancel={cancelAddSubjectassignmentForm}
          onSubmit={handleAddSubjectassignmentSubmit}
        />
        */
        <p>{"<JoinSubjectForm/>"}</p>
      )}
    </section>
  );
}

export default Subjects;
