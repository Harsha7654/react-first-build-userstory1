import { useState } from "react";
import "./Subject.css";
import useLoad from "../api/useLoad.js";
import { useNavigate } from "react-router-dom";
import { CardContainer } from "../UI/Card.js";

import SubjectViewCard from "../entities/subjects/SubjectViewCard.js";

function ViewOnlySubjects() {
  // Initialisation
  const subjectsUserEndpoint = `/subjects`;
  const navigate = useNavigate();

  // State
  const [subjects, loadingMessage] = useLoad(subjectsUserEndpoint);

  // Methods
  const handleSubjectClick = (subject) => {
    // Navigate to the chapters page
    navigate(`/subjects/${subject.subject_id}/chapters`, {
      state: { subject },
    });
  };

  return (
    <section>
      <h1>My Subjects</h1>
      {!subjects ? (
        <p>{loadingMessage}</p>
      ) : subjects.length === 0 ? (
        <p>No subjects found</p>
      ) : (
        <CardContainer>
          {subjects.map((subject) => (
            <SubjectViewCard
              key={subject.subject_id}
              subject={subject}
              onSubjectClick={handleSubjectClick}
              // Don't pass onModify or onDelete props to hide those buttons
            />
          ))}
        </CardContainer>
      )}
    </section>
  );
}

export default ViewOnlySubjects;
