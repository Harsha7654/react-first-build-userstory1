import "./Card.css";

export function CardContainer(props) {
  return <div className="cardContainer">{props.children}</div>;
}

export function Card(props) {
  // Make sure onClick is properly handled
  const { children, onClick } = props;

  return (
    <div className="card" onClick={onClick}>
      {children}
    </div>
  );
}
