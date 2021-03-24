import React, { useState } from 'react';

const AddList = () => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const toggleEdit = e => {
    e.preventDefault();
    setEditing(!editing);
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  return (
    <div id="new-list" className={`new-list ${editing ? "selected" : ""}`}>
      <span  onClick={toggleEdit} >Add a list...</span>
      <input type="text" placeholder="Add a list..." value={title} onChange={handleTitleChange} />
      <div>
        <input type="submit" className="button" value="Save" />
        <i onClick={toggleEdit} className="x-icon icon"></i>
      </div>
    </div>
  )
};

export default AddList;