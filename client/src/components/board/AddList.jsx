import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createList } from '../../actions/ListActions';

const AddList = ({ boardId }) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const dispatch = useDispatch();
  const toggleEdit = e => {
    e.preventDefault();
    setEditing(!editing);
  }

  const handleTitleChange = e => {
    setTitle(e.target.value);
  }

  const handleSave = e => {
    e.preventDefault()
    dispatch(createList(title, boardId, () => {
      setTitle('');
      setEditing(false);
    }));
  }

  return (
    <div id="new-list" className={`new-list ${editing ? "selected" : ""}`}>
      <span  onClick={toggleEdit} >Add a list...</span>
      <input type="text" placeholder="Add a list..." value={title} onChange={handleTitleChange} />
      <div>
        <input type="submit" className="button" value="Save" onClick={handleSave}/>
        <i onClick={toggleEdit} className="x-icon icon"></i>
      </div>
    </div>
  )
};

export default AddList;