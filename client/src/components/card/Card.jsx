import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Action from "./Action";
import Comment from "./Comment";
import {
  fetchCard,
  updateCard,
  createComment,
} from "../../actions/CardActions";
import { longDate, howSoon, pastDue } from "../../utils";
import CardPopover from "./CardPopover";

const Card = () => {
  const { id } = useParams();
  const history = useHistory();
  const [commentText, setCommentText] = useState("");
  const [whichPopover, setWhichPopover] = useState("");
  const [attachedTo, setAttachedTo] = useState(null);
  const card = useSelector((state) =>
    state.cards.find((card) => card.id === id)
  );
  const list = useSelector((state) =>
    state.lists.find((list) => list.id === card?.listId)
  );
  const dispatch = useDispatch();

  const [cardTitle, setCardTitle] = useState(card?.title);
  const [saveCommentEnabled, setSaveCommentEnabled] = useState(true);
  const [editing, setEditing] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");

  useEffect(() => {
    if (!card?.actions) {
      dispatch(fetchCard(id));
    }
    if (card) {
      setCardTitle(card.title);
      setDescriptionText(card.description);
    }
  }, [dispatch, id, card]);

  if (!card || !list || !card.actions) {
    return null;
  }

  const handleCloseModal = () => {
    history.push(`/boards/${card.boardId}`);
    return;
  };

  const handleClosePopover = () => {
    setWhichPopover("");
  }

  const labelsComponents = card.labels.map((label) => {
    return (
      <div className="member-container" key={label}>
        <div className={`${label} label colorblindable`}></div>
      </div>
    );
  });

  const handleSetPopover = (type) => {
    return (e) => {
      setAttachedTo(e.target);
      setWhichPopover(type);
    };
  };

  const handleCardTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const dueDateComponent = card.dueDate ? (
    <li className="due-date-section">
      <h3>Due Date</h3>
      <div
        id="dueDateDisplay"
        className={howSoon(card.dueDate)}
        onClick={handleSetPopover("due-date")}
      >
        <input
          id="dueDateCheckbox"
          type="checkbox"
          className="checkbox"
          checked=""
        />
        {longDate(card.dueDate)} <span>{pastDue(card.dueDate)}</span>
      </div>
    </li>
  ) : null;

  const commentsAndActions = card.comments
    .concat(card.actions)
    .sort(
      (item1, item2) =>
        new Date(item2.createdAt).getTime() -
        new Date(item1.createdAt).getTime()
    )
    .map((item) => {
      if (item.description) {
        // is action
        return <Action key={item.id} action={item} />;
      } else {
        //is comment
        return <Comment key={item.id} comment={item} />;
      }
    });

  const saveTitle = () => {
    dispatch(
      updateCard(
        {
          ...card,
          title: cardTitle,
        },
        (updatedCard) => {
          setCardTitle(updatedCard.title);
        }
      )
    );
  };

  const handleKeyDown = (e) => {
    // if key is enter, save title
    if (e.key === "Enter") {
      saveTitle();
    }
  };

  const handleBlur = () => {
    saveTitle();
  };

  const handleChangeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = () => {
    if (saveCommentEnabled && commentText) {
      setSaveCommentEnabled(false);
      dispatch(
        createComment(card.id, commentText, () => {
          setCommentText("");
          setSaveCommentEnabled(true);
        })
      );
    }
  };

  const handleEditDescription = () => {
    setEditing(true);
  };

  const handleSaveDescription = (e) => {
    e.preventDefault();
    dispatch(
      updateCard(
        {
          ...card,
          description: descriptionText,
        },
        (updatedCard) => {
          setDescriptionText(updatedCard.description);
          setEditing(false);
        }
      )
    );
  };

  const handleChangeDescription = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleCloseDescription = () => {
    setEditing(false);
  };

  const handleDiscardEdits = () => {
    setDescriptionText(card.description);
  };

  return (
    <div id="modal-container">
      <div className="screen"></div>
      <div id="modal">
        <i className="x-icon icon close-modal" onClick={handleCloseModal}></i>

        <header>
          <i className="card-icon icon .close-modal"></i>
          <textarea
            className="list-title"
            style={{ height: "45px" }}
            value={cardTitle}
            onChange={handleCardTitleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <p>
            in list{" "}
            <a className="link" onClick={handleCloseModal}>
              {list.title}
            </a>
            <i className="sub-icon sm-icon"></i>
          </p>
        </header>

        <section className="modal-main">
          <ul className="modal-outer-list">
            <li className="details-section">
              <ul className="modal-details-list">
                <li className="labels-section">
                  <h3>Labels</h3>
                  {labelsComponents}
                  <div className="member-container">
                    <i
                      className="plus-icon sm-icon"
                      onClick={handleSetPopover("labels")}
                    ></i>
                  </div>
                </li>

                <br />

                {dueDateComponent}
              </ul>

              <form className="description">
                <p>Description</p>
                {editing ? (
                  <>
                    <textarea
                      className="textarea-toggle"
                      rows="1"
                      value={descriptionText}
                      onChange={handleChangeDescription}
                      autoFocus
                    />
                    <div>
                      <div
                        className="button"
                        value="Save"
                        onClick={handleSaveDescription}
                      >
                        Save
                      </div>
                      <i
                        className="x-icon icon"
                        onClick={handleCloseDescription}
                      ></i>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      id="description-edit"
                      className="link"
                      onClick={handleEditDescription}
                    >
                      Edit
                    </span>
                    <p className="textarea-overlay">{card.description}</p>
                    <p
                      id="description-edit-options"
                      className={
                        card.description === descriptionText ? "hidden" : ""
                      }
                    >
                      You have unsaved edits on this field.{" "}
                      <span className="link" onClick={handleEditDescription}>
                        View edits
                      </span>{" "}
                      -{" "}
                      <span className="link" onClick={handleDiscardEdits}>
                        Discard
                      </span>
                    </p>
                  </>
                )}
              </form>
            </li>

            <li className="comment-section">
              <h2 className="comment-icon icon">Add Comment</h2>
              <div>
                <div className="member-container">
                  <div className="card-member">TP</div>
                </div>

                <div className="comment">
                  <label>
                    <textarea
                      required=""
                      rows="1"
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={handleChangeCommentText}
                    />
                    <div>
                      <a className="light-button card-icon sm-icon"></a>
                      <a className="light-button smiley-icon sm-icon"></a>
                      <a className="light-button email-icon sm-icon"></a>
                      <a className="light-button attachment-icon sm-icon"></a>
                    </div>
                    <div>
                      <input
                        type="submit"
                        className={`button${
                          commentText ? "" : " not-implemented"
                        }`}
                        value="Save"
                        onClick={handleSubmitComment}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </li>

            <li className="activity-section">
              <h2 className="activity-icon icon">Activity</h2>
              <ul className="horiz-list">
                <li className="not-implemented">Show Details</li>
              </ul>

              <ul className="modal-activity-list">{commentsAndActions}</ul>
            </li>
          </ul>
        </section>
        <aside className="modal-buttons">
          <h2>Add</h2>
          <ul>
            <li className="member-button">
              <i className="person-icon sm-icon"></i>Members
            </li>
            <li className="label-button">
              <i className="label-icon sm-icon"></i>Labels
            </li>
            <li className="checklist-button">
              <i className="checklist-icon sm-icon"></i>Checklist
            </li>
            <li className="date-button" onClick={handleSetPopover("due-date")}>
              <i className="clock-icon sm-icon"></i>Due Date
            </li>
            <li className="attachment-button not-implemented">
              <i className="attachment-icon sm-icon"></i>Attachment
            </li>
          </ul>
          <h2>Actions</h2>
          <ul>
            <li className="move-button" onClick={handleSetPopover("move-card")}>
              <i className="forward-icon sm-icon"></i>Move
            </li>
            <li className="copy-button">
              <i className="card-icon sm-icon"></i>Copy
            </li>
            <li className="subscribe-button">
              <i className="sub-icon sm-icon"></i>Subscribe
              <i className="check-icon sm-icon"></i>
            </li>
            <hr />
            <li className="archive-button">
              <i className="file-icon sm-icon "></i>Archive
            </li>
          </ul>
          <ul className="light-list">
            <li className="not-implemented">Share and more...</li>
          </ul>
        </aside>
      </div>
      <CardPopover type={whichPopover} card={card} attachedTo={attachedTo} onClose={handleClosePopover} />
    </div>
  );
};

export default Card;
