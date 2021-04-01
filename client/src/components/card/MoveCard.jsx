import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListsFromBoard, fetchBoards } from "../../actions/BoardActions";

const MoveCard = ({ card }) => {
  const dispatch = useDispatch();
  const boards = useSelector(state => state.boards);
  
  const [selectedBoard, setSelectedBoard] = useState(null);

  const boardsComponent = boards.map((board) => 
        <option key={board.id} value={board.id} selected={card.boardId === board.id ? "selected" : ""}>
          {board.title} {card.boardId === board.id ? "(current)" : ""}
        </option>
  );

  useEffect(() => {
    dispatch(fetchBoards((boards) => {
      boards.forEach(board => {
        dispatch(fetchListsFromBoard(board.id));
      })
    }))
  }, [dispatch]);

  useEffect(() => {
    setSelectedBoard(boards?.find(board => board.id === card.boardId));
  }, [card, boards]);

  if (!boards || !selectedBoard) {
    return null;
  }

  const handleSelectBoardChange = (e) => {
    setSelectedBoard(boards.find(board => board.id === e.target.value));
  }

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
          <select onChange={handleSelectBoardChange}>
            {boardsComponent} 
          </select>
        </div>
        <div>
          <div className="button-link setting list">
            <span className="label">List</span>
            <span className="value js-list-value">Intermediate</span>
            <label>List</label>
            <select>
              <option value="1">Basics</option>
              <option value="2" selected="selected">
                Intermediate (current)
              </option>
              <option value="3">Advanced</option>
            </select>
          </div>
          <div className="button-link setting position">
            <span className="label">Position</span>
            <span className="value">1</span>
            <label>Position</label>
            <select>
              <option value="top" selected="selected">
                1 (current)
              </option>
              <option value="98303">2</option>
              <option value="163839">3</option>
              <option value="212991">4</option>
              <option value="245759">5</option>
              <option value="278527">6</option>
              <option value="311295">7</option>
              <option value="bottom">8</option>
            </select>
          </div>
        </div>

        <button className="button" type="submit">
          Move
        </button>
      </div>
    </div>
  );
}

export default MoveCard;