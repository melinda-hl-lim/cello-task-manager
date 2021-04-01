import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CardLocationFormContainer from "./CardLocationFormContainer";
import calculatePosition from "../../lib/PositionCalculator";
import * as actions from "../../actions/CardActions";

const MoveCardForm = (props) => {
  const [boardIdLocation, setBoardIdLocation] = useState(undefined);
  const [listIdLocation, setListIdLocation] = useState(undefined);
  const [positionLocation, setPositionLocation] = useState(undefined);
  const history = useHistory();

  const stateCards = useSelector((state) => state.cards);

  const dispatch = useDispatch();

  const updateCard = useCallback(
    (card, callback) => {
      dispatch(actions.updateCard(card, callback));
    },
    [dispatch]
  );

  const handleLocationChange = useCallback((boardId, listId, position) => {
    setBoardIdLocation(boardId);
    setListIdLocation(listId);
    setPositionLocation(position);
  }, []);

  const isSubmitDisabled = useCallback(() => {
    return (
      boardIdLocation == null ||
      listIdLocation == null ||
      positionLocation == null
    );
  }, [boardIdLocation, listIdLocation, positionLocation]);

  const handleSubmit = useCallback(
    (e) => {
      if (isSubmitDisabled()) {
        return;
      }

      e.preventDefault();
      const listCards = stateCards.filter(c => c.listId === listIdLocation)

      const sourceBoardId = props.card.boardId;
      const changingBoard = boardIdLocation !== sourceBoardId;

      const currentIndex = listCards.findIndex(
        (card) => card.id === props.card.id
      );

      updateCard(
        {
          ...props.card,
          listId: listIdLocation,
          position: calculatePosition(
            listCards,
            positionLocation,
            currentIndex
          ),
        },
        () => {
          if (changingBoard) {
            history.push(`/boards/${sourceBoardId}`);
          } else {
            props.onClose(new Event("click"));
          }
        }
      );
    },
    [
      isSubmitDisabled,
      updateCard,
      boardIdLocation,
      listIdLocation,
      positionLocation,
      props,
      history,
      stateCards,
    ]
  );
  return (
    <div>
      <header>
        <span>Move Card</span>
        <a href="#" className="icon-sm icon-close" onClick={props.onClose}></a>
      </header>
      <div className="content">
        <CardLocationFormContainer
          card={props.card}
          onLocationChange={handleLocationChange}
        />
        <button
          className="button"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitDisabled()}
        >
          Move
        </button>
      </div>
    </div>
  );
};

export default MoveCardForm;
