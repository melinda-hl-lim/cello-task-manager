import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardTile from "./CardTile";
import { updateList } from "../../actions/ListActions";
import { createCard } from "../../actions/CardActions";

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
  const [newCardText, setNewCardText] = useState("");
  const [addButtonEnabled, setAddButtonEnabled] = useState(true);

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

  const handleCardTextChange = (e) => {
    setNewCardText(e.target.value);
  }

  const handleOpenAddCard = () => {
    setAddingCard(true);
  }

  const handleCloseAddCard = () => {
    setAddingCard(false);
  }

  const toggleAddButton = () => {
    setAddButtonEnabled(!addButtonEnabled);
  }

  const handleAddCard = () => {
    if(addButtonEnabled) {
      toggleAddButton();
      dispatch(createCard(newCardText, list.id, list.boardId, () => {
        setNewCardText("");
        setAddingCard(false);
        toggleAddButton();
      }));
    }
  }

  useEffect(() => {
    if (addingCard) {
      addCardInput.current.focus();
    }
  }, [addingCard])

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
            <i className="x-icon icon" ></i>
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
              <textarea ref={addCardInput} name="add-card" value={newCardText} onChange={handleCardTextChange}></textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCard}>Add</a>
            <i className="x-icon icon" onClick={handleCloseAddCard}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={handleOpenAddCard}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
