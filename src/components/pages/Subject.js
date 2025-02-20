import { useState } from "react";
import { Tray, Add } from "../UI/Actions.js";
import SubjectForm from "../entities/subjects/SubjectForm.js";
import { API } from "../api/API";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import Chapters from "./Chapters"; // Import Chapters Component
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import Action from "../UI/Actions.js";
import { Modal, useModal } from "../UI/Modal.js";

function Subjects({ loggedinUserID }) {
  // Initialisation
  const subjectsEndpoint = `/subjects`;
  const subjectsUserEndpoint = `/userSubjectAssignments/user/${loggedinUserID}`;

  // State
  const [subjects, loadingMessage, loadSubjects] = useLoad(subjectsEndpoint);
  const [students, , loadingStudentsMessage] = useLoad(`/users`);
  const [selectedSubject, setSelectedSubject] = useState(null); // New State

  // Modal state
  const [showModal, modalContent, openModal, closeModal] = useModal();

  // Methods
  const reloadSubjects = () => loadSubjects(subjectsEndpoint);
  const handleAdd = () =>
    openModal(<SubjectForm onCancel={closeModal} onSubmit={handleSubmit} />);
  const handleJoin = () => openModal(<p>{"<JoinSubjectForm/>"}</p>);
  const handleDismissAdd = () => closeModal();
  const handleDismissJoin = () => closeModal();

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
      reloadSubjects();
      closeModal(); // Close the modal after successful modification
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`${subjectsEndpoint}/${id}`);
      if (response.isSuccess) {
        reloadSubjects(); // Reload subjects after successful deletion
        closeModal(); // Close the modal after successful modification
      } else {
        showErrorModal("Delete failed!", response.message);
      }
    } catch (error) {
      console.error("Failed to delete subject:", error);
      showErrorModal("Delete failed!", "An unexpected error occurred.");
    }
  };

  const deleteModal = (id) => {
    openModal(
      <div>
        <p>Are you sure you want to delete this subject?</p>
        <button onClick={() => handleDelete(id)}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    );
  };

  const showErrorModal = (title, message) =>
    openModal(
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <ToolTipDecorator message="Click to dismiss error message">
          <Action.Close showText onClick={closeModal} />
        </ToolTipDecorator>
      </div>
    );

  const handleModify = (subject) =>
    openModal(
      <SubjectForm
        initialRecord={subject}
        onCancel={closeModal}
        onSubmit={handleModifySubmit}
      />
    );

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
              key={subject.subject_id}
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
                    handleModify(subject);
                  }}
                  buttonText="Modify"
                />
              </ToolTipDecorator>

              <ToolTipDecorator message="Delete">
                <Action.Delete
                  showText
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteModal(subject.subject_id);
                  }}
                  buttonText="Delete"
                />
              </ToolTipDecorator>
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

      <Modal show={showModal} title="Subject Form" onClose={closeModal}>
        {modalContent}
      </Modal>
    </section>
  );
}

export default Subjects;
