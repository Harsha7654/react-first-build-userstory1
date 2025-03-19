import React from "react";
import CardComponent from "../../UI/CardComponent";
import Action from "../../UI/Actions";

const SubjectCard = ({ subject, onSubjectClick, onModify, onDelete }) => {
  // Ensure the click handler is working correctly
  const handleClick = () => {
    console.log("Subject card clicked:", subject);
    if (onSubjectClick) {
      onSubjectClick(subject);
    }
  };

  // Prepare actions for the card
  const actions = [
    {
      tooltip: "Modify",
      component: (
        <Action.Modify
          showText
          onClick={(event) => {
            event.stopPropagation();
            onModify(subject);
          }}
          buttonText="Modify"
        />
      ),
    },
    {
      tooltip: "Delete",
      component: (
        <Action.Delete
          showText
          onClick={(event) => {
            event.stopPropagation();
            onDelete(subject.subject_id);
          }}
          buttonText="Delete"
        />
      ),
    },
  ];

  // Prepare details for the card
  const details = [
    { label: "Difficulty", value: subject.difficulty },
    { label: "Level", value: subject.level },
  ];

  return (
    <CardComponent
      item={subject}
      title={subject.name}
      details={details}
      image={subject.image ? { src: subject.image, alt: subject.name } : null}
      actions={actions}
      onClick={handleClick}
    />
  );
};

export default SubjectCard;
