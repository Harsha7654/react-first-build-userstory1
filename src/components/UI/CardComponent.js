import React from "react";
import { Card } from "./Card";
import ToolTipDecorator from "./ToolTipDecorator";
import "./CardComponent.css";

const CardComponent = ({
  item,
  title,
  details = [],
  image,
  actions = [],
  onClick,
  additionalContent,
}) => {
  // Ensure the onClick function is properly passed to the Card component
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Card>
      {/* Add onClick to the div instead of the Card component for better control */}
      <div className="card-content" onClick={handleClick}>
        <div className="card-title">{title}</div>

        <div className="card-details">
          {details.map((detail, index) => (
            <div key={index} className="card-detail">
              {detail.label && (
                <span className="detail-label">{detail.label}: </span>
              )}
              <span className="detail-value">{detail.value}</span>
            </div>
          ))}
        </div>

        {image && (
          <div className="card-image">
            <img src={image.src} alt={image.alt || title} />
          </div>
        )}

        {additionalContent && (
          <div className="card-additional-content">{additionalContent}</div>
        )}

        {/* Make sure actions don't trigger the card click */}
        {actions.length > 0 && (
          <div className="card-actions" onClick={(e) => e.stopPropagation()}>
            {actions.map((action, index) => (
              <ToolTipDecorator key={index} message={action.tooltip}>
                {action.component}
              </ToolTipDecorator>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardComponent;
