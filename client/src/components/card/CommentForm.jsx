import React from 'react';

const CommentForm = () => {
  return (
    <div className="comment">
      <label>
        <textarea required="" rows="1">
          The activities have not been implemented yet.
        </textarea>
        <div>
          <a className="light-button card-icon sm-icon"></a>
          <a className="light-button smiley-icon sm-icon"></a>
          <a className="light-button email-icon sm-icon"></a>
        </div>
        <div>
          <p>You haven&apos;t typed anything!</p>
          <input
            type="submit"
            className="button not-implemented"
            value="Save"
          />
          <i className="x-icon icon"></i>
        </div>
      </label>
    </div>
  )
}

export default CommentForm;