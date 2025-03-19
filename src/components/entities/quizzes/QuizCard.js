import React from "react";
import CardComponent from "../../UI/CardComponent";
import Action from "../../UI/Actions";

const QuizCard = ({ quiz, onQuizClick, onModify, onDelete }) => {
  // Ensure the click handler is working correctly
  const handleClick = () => {
    if (onQuizClick) {
      onQuizClick(quiz);
    }
  };

  // Prepare actions for the card
  const actions = [];

  // Add modify action if onModify is provided
  if (onModify) {
    actions.push({
      tooltip: "Modify",
      component: (
        <Action.Modify
          showText
          onClick={(event) => {
            event.stopPropagation();
            onModify(quiz);
          }}
          buttonText="Modify"
        />
      ),
    });
  }

  // Add delete action if onDelete is provided
  if (onDelete) {
    actions.push({
      tooltip: "Delete",
      component: (
        <Action.Delete
          showText
          onClick={(event) => {
            event.stopPropagation();
            onDelete(quiz.quiz_id);
          }}
          buttonText="Delete"
        />
      ),
    });
  }

  // Prepare details for the card
  const details = [
    { label: "Description", value: quiz.quizBrief },
    { label: "Level", value: quiz.quizLevel },
    // Add other quiz properties as needed
    ...(quiz.duration
      ? [{ label: "Duration", value: `${quiz.duration} min` }]
      : []),
    ...(quiz.difficulty
      ? [{ label: "Difficulty", value: quiz.difficulty }]
      : []),
    ...(quiz.totalPoints
      ? [{ label: "Total Points", value: quiz.totalPoints }]
      : []),
  ];

  return (
    <CardComponent
      item={quiz}
      title={quiz.quizTitle}
      details={details}
      image={quiz.image ? { src: quiz.image, alt: quiz.quizTitle } : null}
      actions={actions}
      onClick={handleClick}
    />
  );
};

export default QuizCard;
