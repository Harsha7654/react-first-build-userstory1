import { useState } from "react";
import { useAuth } from "../auth/useAuth.js";
import SubjectForm from "../entities/subjects/SubjectForm.js";
import { API } from "../api/API";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import Chapters from "./Chapters";
import ToolTipDecorator from "../UI/ToolTipDecorator.js";
import Action from "../UI/Actions.js";
import { Modal, useModal } from "../UI/Modal.js";

function Subjects({ loggedinUserID }) {
  // Initialisation
  const subjectsEndpoint = `/subjects`;
  const subjectsUserEndpoint = `/userSubjectAssignments/user/${loggedinUserID}`;

  // State
  const [subjects, loadingMessage, loadSubjects] = useLoad(subjectsEndpoint);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Modal state
  const [showModal, modalContent, openModal, closeModal] = useModal();
  const [modalTitle, setModalTitle] = useState("");

  // Methods
  const reloadSubjects = () => loadSubjects(subjectsEndpoint);
  const handleAdd = () => {
    setModalTitle("Add new subject");
    openModal(<SubjectForm onCancel={closeModal} onSubmit={handleSubmit} />);
  };
  const handleJoin = () => {
    setModalTitle("Join a subject");
    openModal(<p>{"<JoinSubjectForm/>"}</p>);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject); // Set the clicked subject
  };

  const handleBackToSubjects = () => setSelectedSubject(null);

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
      closeModal();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`${subjectsEndpoint}/${id}`);
      if (response.isSuccess) {
        reloadSubjects();
        closeModal();
      } else {
        showErrorModal("Delete failed!", response.message);
      }
    } catch (error) {
      console.error("Failed to delete subject:", error);
      showErrorModal("Delete failed!", "An unexpected error occurred.");
    }
  };

  const deleteModal = (id) => {
    setModalTitle("Delete subject");
    openModal(
      <div>
        <p>Are you sure you want to delete this subject?</p>
        <button onClick={() => handleDelete(id)}>Yes</button>
        <button onClick={closeModal}>No</button>
      </div>
    );
  };

  const showErrorModal = (title, message) => {
    setModalTitle(title);
    openModal(
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        <ToolTipDecorator message="Click to dismiss error message">
          <Action.Close showText onClick={closeModal} />
        </ToolTipDecorator>
      </div>
    );
  };

  const handleModify = (subject) => {
    setModalTitle("Modify subject");
    openModal(
      <SubjectForm
        initialRecord={subject}
        onCancel={closeModal}
        onSubmit={handleModifySubmit}
      />
    );
  };

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

      <Modal show={showModal} title={modalTitle} onClose={closeModal}>
        {modalContent}
      </Modal>
    </section>
  );
}

export default Subjects;
