import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard, fetchBoards } from "../../actions/BoardActions";
import { updateCard } from "../../actions/CardActions";
import { fetchListsFromBoard } from "../../actions/ListActions";
//  fetchListsFromBoard,
const MoveCard = ({ card, onClose }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const lists = useSelector((state) =>
    state.lists.filter((list) => list.boardId === selectedBoard?.id)
  );

  const boardsComponents = boards.map((board) => (
    <option key={board.id} value={board.id}>
      {board.title} {card.boardId === board.id ? "(current)" : ""}
    </option>
  ));

  const listsComponents = lists.map((list) => (
    <option key={list.id} value={list.id}>
      {list.title} {card.listId === list.id ? "(current)" : ""}
    </option>
  ));

  const fetchBoardCallback = useCallback(
    (id, callback) => {
      dispatch(fetchBoard(id, callback));
    },
    [dispatch]
  );
  const fetchBoardsCallback = useCallback(
    (id, callback) => {
      dispatch(fetchBoards(callback));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchBoardsCallback();
  }, [fetchBoardsCallback]);

  // When a board is selected
  useEffect(() => {
    if (selectedBoard) {
      fetchBoardCallback(selectedBoard.id, (board) => {
        setSelectedList(board.lists[0] || null);
      });
    }
  }, [fetchBoardCallback, selectedBoard]);

  // Setting the inital selected board
  useEffect(() => {
    if (boards && !selectedBoard) {
      setSelectedBoard(boards.find((board) => board.id === card.boardId));
    }
  }, [card, boards, selectedBoard]);

  useEffect(() => {
    if (lists && !selectedList) {
      setSelectedList(lists.find((list) => list.id === card.listId));
    }
  }, [card, lists, selectedList]);

  if (!boards || !selectedBoard || !selectedList) {
    return null;
  }

  const handleSelectBoardChange = (e) => {
    setSelectedBoard(boards.find((board) => board.id === e.target.value));
  };

  const handleMoveCard = (e) => {
    e.preventDefault();
    // update the card
    dispatch(
      updateCard(
        {
          ...card,
          listId: selectedList.id,
          boardId: selectedBoard.id,
        },
        () => {
          onClose();
        }
      )
    );
    dispatch(removeCardFromList());
    // update the old list
    // update the new list
  };

  return (
    <div>
      <header>
        <span>Move Card</span>
        <a href="#" className="icon-sm icon-close"></a>
      </header>
      <div className="content">
        <div className="button-link setting board">
          <span className="label">Board</span>
          <span className="value js-board-value">{selectedBoard.title}</span>
          <label>Board</label>
          <select value={selectedBoard.id} onChange={handleSelectBoardChange}>
            {boardsComponents}
          </select>
        </div>
        <div>
          <div className="button-link setting list">
            <span className="label">List</span>
            <span className="value js-list-value">{selectedList.title}</span>
            <label>List</label>
            <select>{listsComponents}</select>
          </div>
          {/* <div className="button-link setting position">
            <span className="label">Position</span>
            <span className="value">1</span>
            <label>Position</label>
            <select>
              <option value="top">1 (current)</option>
              <option value="98303">2</option>
              <option value="163839">3</option>
              <option value="212991">4</option>
              <option value="245759">5</option>
              <option value="278527">6</option>
              <option value="311295">7</option>
              <option value="bottom">8</option>
            </select>
          </div> */}
        </div>

        <button className="button" type="submit" onClick={handleMoveCard}>
          Move
        </button>
      </div>
    </div>
  );
};

export default MoveCard;
