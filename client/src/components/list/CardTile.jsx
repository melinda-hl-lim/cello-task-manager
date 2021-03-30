import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shortDate, howSoon } from "../../utils";

const CardTile = ({ id }) => {
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === id)
  );
  const labels = card.labels.map((label) => (
    <div key={label} className={`card-label ${label} colorblindable`}></div>
  ));

  const cardStatus = `${howSoon(card.dueDate)} ${
    card.completed ? "completed" : ""
  }`;
  return (
    <div className="card-background">
      <Link to={`/cards/${card.id}`}>
        <div className="card">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {labels}
            <p>{card.title}</p>
          </div>
          <div className="card-icons">
            <i className={`clock-icon sm-icon ${cardStatus}`}>
              {shortDate(card.dueDate)}
            </i>
            {card.description ? (
              <i className="description-icon sm-icon" />
            ) : null}
            {card.commentCount ? <i className="comment-icon sm-icon" /> : null}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardTile;
