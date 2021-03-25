import React, { useState } from "react";
import { useSelector } from "react-redux";
import CardTile from "./CardTile";

const List = ({ id }) => {
  const { position, title } = useSelector((state) =>
    state.lists.find((list) => list.id === id)
  );
  const cards = useSelector((state) =>
    state.cards.filter((card) => card.listId === id)
  );

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const cardComponents = cards
    ?.sort((a, b) => a.position - b.position)
    .map((card) => <CardTile key={card.id} id={card.id} />);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setEditing(!editing);
  };

  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editing ? (
              <input
                className="list-title"
                value={newTitle}
                onChange={handleTitleChange}
              />
            ) : (
              <p className="list-title" onClick={toggleEdit}>
                {title}
              </p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cardComponents}
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
