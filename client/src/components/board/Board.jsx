import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";
import List from "../list/List";
import AddList from "./AddList";
import BoardHeader from "./BoardHeader";

const Board = () => {
  const { id: routeId } = useParams();
  const [activeList, setActiveList] = useState(null);
  const dispatch = useDispatch();
  const boardIdMatch = useRouteMatch("/boards/:id");
  let boardId;
  const state = useSelector((state) => state);
  if (boardIdMatch) {
    boardId = routeId;
  } else {
    const card = state?.cards?.find((card) => card?.id === routeId);
    if (card) {
      boardId = card.boardId;
    }
  }

  const board = useSelector((state) => {
    return state.boards.find((board) => board.id === boardId);
  });

  const lists = useSelector((state) =>
    state.lists.filter((list) => list.boardId === board?.id)
  );

  const handleAddCardClick = (id) => {
    setActiveList(id);
  };
  const handleAddCardClose = () => {
    setActiveList(null);
  };

  const listComponents = lists
    ?.sort((a, b) => a.position - b.position)
    .map((list) => (
      <List
        key={list.id}
        id={list.id}
        onAddCardClick={handleAddCardClick}
        onAddCardClose={handleAddCardClose}
        activeList={activeList === list.id}
      />
    ));

  useEffect(() => {
    if (boardId) {
      dispatch(fetchBoard(boardId));
    }
  }, [dispatch, boardId]);

  return (
    <>
      <BoardHeader title={board?.title} />
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            {listComponents}
          </div>
          <AddList boardId={boardId} />
        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>
          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">
                Power-Ups
              </li>
              <li className="stickers-icon menu-icon not-implemented">
                Stickers
              </li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">
                Activity
              </li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="modal-container"></div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default Board;
