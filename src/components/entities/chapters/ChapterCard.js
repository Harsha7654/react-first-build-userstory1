import React from "react";
import CardComponent from "../../UI/CardComponent";

const ChapterCard = ({ chapter, onChapterClick }) => {
  // Prepare details for the card
  const details = [
    { label: "Author", value: chapter.chapterAuthor },
    // Add more details as needed
  ];

  return (
    <CardComponent
      item={chapter}
      title={chapter.chapterName}
      details={details}
      onClick={() => onChapterClick(chapter)}
    />
  );
};

export default ChapterCard;
