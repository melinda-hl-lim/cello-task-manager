import React from 'react';
import { relativeTime } from '../../utils';

const Action = ({ action }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member small-size">VR</div>
      </div>
      <p>
        <span className="member-name">Victor Reyes</span> {action.description}{" "}
        <small>{relativeTime(action.createdAt)}</small>
      </p>
    </li>
  )
}

export default Action;