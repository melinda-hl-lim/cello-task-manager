import React from "react";
import { relativeTime } from "../../utils";

const Comment = ({ comment }) => {
  return (
    <li>
      <div className="member-container">
        <div className="card-member">TP</div>
      </div>
      <h3>Taylor Peat</h3>
      <div className="comment static-comment">
        <span>{comment.text}</span>
      </div>
      <small>
        {relativeTime(comment.createdAt)} - <span className="link">Edit</span> -{" "}
        <span className="link">Delete</span>
      </small>
    </li>
  );
};

export default Comment;
