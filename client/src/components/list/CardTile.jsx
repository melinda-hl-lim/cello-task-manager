import React from 'react';
import { useSelector } from 'react-redux';
import { shortDate, howSoon } from '../../utils';

const CardTile = ({ id }) => {
  const card = useSelector(state => state.cards.find(card => card.id === id))
  const labels = card.labels.map(label => 
    <div key={label} className={`card-label ${label} colorblindable`}></div>
  )
  
  const cardStatus = `${howSoon(card.dueDate)} ${card.completed ? 'completed' : ''}`
  return (
    <div className="card-background">
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          {labels}
          <p>
            {card.title}
          </p>
        </div>
        <div className="card-icons">
          <i className={`clock-icon sm-icon ${cardStatus}`}>
            {shortDate(card.dueDate)}
          </i>
          <i className="description-icon sm-icon"></i>
          <i className="comment-icon sm-icon"></i>
        </div>
      </div>
    </div>   
  )
}

export default CardTile;