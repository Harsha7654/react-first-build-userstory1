import React from "react";
import CardComponent from "../../UI/CardComponent";

const SubjectViewCard = ({ subject, onSubjectClick }) => {
  // Ensure the click handler is working correctly
  const handleClick = () => {
    console.log("Subject card clicked:", subject);
    if (onSubjectClick) {
      onSubjectClick(subject);
    }
  };

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
      onClick={handleClick}
    />
  );
};

export default SubjectViewCard;
