import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardTile from "./CardTile";
import { updateList } from "../../actions/ListActions";

const List = ({ id }) => {
  const dispatch = useDispatch();
  const addCardInput = useRef(null);

  const list = useSelector((state) =>
    state.lists.find((list) => list.id === id)
  );
  const cards = useSelector((state) =>
    state.cards.filter((card) => card.listId === id)
  );

  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);
  const [addingCard, setAddingCard] = useState(false);

  const cardComponents = cards
    ?.sort((a, b) => a.position - b.position)
    .map((card) => <CardTile key={card.id} id={card.id} />);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const startEdit = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  const handleBlur = (e) => {
    saveTitle();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveTitle();
    }
  }

  const saveTitle = () => {
    dispatch(updateList({
      ...list,
      title: newTitle,
    }, (updatedList) => {
      setEditing(false)
      setNewTitle(updatedList.title)
    }))
  }

  const handleToggleAddCard = () => {
    setAddingCard(true);
    addCardInput.current.focus();
  }

  return (
    <div className={`list-wrapper ${addingCard ? "add-dropdown-active" : "" }`}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {editing ? (
              <input
                autoFocus
                className="list-title"
                value={newTitle}
                onChange={handleTitleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p className="list-title" onClick={startEdit}>
                {list.title}
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
          <div className={`add-dropdown add-bottom ${addingCard ? "active-card" : ""}`}>
            <div className="card">
              <div className="card-info"></div>
              <textarea ref={addCardInput} name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={handleToggleAddCard}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
