import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoard } from "../../actions/BoardActions";

const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) => {
    return state.boards.find((board) => board.id === id);
  });
  //const lists = useSelector((state) => state.lists);

  // expecting boards.lists to be a list of ids
  // const listComponents = lists.map((list) => {
  //   <List key={list.id} id={listId} />;
  // });

  useEffect(() => {
    dispatch(fetchBoard(id));
  }, [dispatch, id]);

  return (
    <>
      <main>
        <div id="list-container" className="list-container">
          <div id="existing-lists" className="existing-lists">
            <div className="list-wrapper">
              <div className="list-background">
                <div className="list">
                  <a className="more-icon sm-icon" href=""></a>
                  <div>
                    <p className="list-title">Stuff to try (this is a list)</p>
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
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="card-info">
                          <div className="card-label green colorblindable"></div>
                          <div className="card-label yellow colorblindable"></div>
                          <div className="card-label red colorblindable"></div>
                          <div className="card-label orange colorblindable"></div>
                          <div className="card-label blue colorblindable"></div>
                          <div className="card-label purple colorblindable"></div>
                          <p>
                            Cards do many cool things. Click on this card to
                            open it and learn more...
                          </p>
                        </div>
                        <div className="card-icons">
                          <i className="clock-icon sm-icon overdue-recent completed">
                            Aug 4
                          </i>
                          <i className="description-icon sm-icon"></i>
                          <i className="comment-icon sm-icon"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <p>Another list with stuff</p>
                        </div>
                        <div className="card-icons">
                          <i className="clock-icon sm-icon overdue ">Aug 3</i>
                          <i className="description-icon sm-icon"></i>
                        </div>
                      </div>
                    </div>
                    <div className="card-background">
                      <div className="card ">
                        <i className="edit-toggle edit-icon sm-icon"></i>
                        <div className="cover-image"></div>
                        <div className="card-info">
                          <p>
                            Use the + in the top menu to make your first board
                            now.
                          </p>
                        </div>
                        <div className="card-icons"></div>
                      </div>
                    </div>
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
          </div>
          <div id="new-list" className="new-list">
            <span>Add a list...</span>
            <input type="text" placeholder="Add a list..." />
            <div>
              <input type="submit" className="button" value="Save" />
              <i className="x-icon icon"></i>
            </div>
          </div>
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
