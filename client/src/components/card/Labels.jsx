import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCardLabel } from "../../actions/CardActions";

const Labels = ({ card, onClose }) => {
  const ALL_LABELS = ["green", "yellow", "orange", "red", "purple", "blue"];
  const dispatch = useDispatch();

  const handleToggleLabel = (label) => {
    return () => {
      dispatch(toggleCardLabel(card, label))
    }
  }

  const labelComponents = ALL_LABELS.map((label, idx) => (
    <li key={label} onClick={handleToggleLabel(label)}>
      <div className={`${label} colorblindable`} data-id={idx}>
        { card.labels.includes(label) ? <i className="check-icon sm-icon"></i> : null }
      </div>
      <div className={`label-background ${label}`}></div>
      <div className="label-background-overlay"></div>
      <i className="edit-icon icon not-implemented"></i>
    </li>
  ));

  return (
    <div id="add-options-labels-dropdown">
      <header>
        <span>Labels</span>
        <a href="#" className="icon-sm icon-close" onClick={onClose}></a>
      </header>
      <div className="content">
        <input
          className="dropdown-input"
          placeholder="Search labels..."
          type="text"
        />
        <div className="labels-search-results">
          <ul className="label-list">{labelComponents}</ul>
          <ul className="light-list">
            <li className="not-implemented">Create a new label</li>
            <hr />
            <li className="toggleColorblind">
              Enable color blind friendly mode.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Labels;
