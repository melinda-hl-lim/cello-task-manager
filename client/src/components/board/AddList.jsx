import React, { useState } from 'react';

const AddList = () => {
  const [editing, setEditing] = useState(false)

  const toggleEdit = e => {
    e.preventDefault();
    setEditing(!editing);
  }

  return (
    <div id="new-list" className={`new-list ${editing ? "selected" : ""}`}>
      <span  onClick={toggleEdit} >Add a list span...</span>
      <input type="text" placeholder="Add a list input..." />
      <div>
        <input type="submit" className="button" value="Save" />
        <i onClick={toggleEdit} className="x-icon icon"></i>
      </div>
    </div>
  )
};

export default AddList;