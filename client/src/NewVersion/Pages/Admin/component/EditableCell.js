import React, { useState } from 'react';

const EditableCell = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    onSave(inputValue);
    setEditing(false);
  };

  const handleCancel = () => {
    setInputValue(value);
    setEditing(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex">
      {editing ? (
        <div className="flex items-center">
          <input
            type="number"
            className="border rounded px-2 py-1 mr-2"
            value={inputValue}
            onChange={handleChange}
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-3 py-1 rounded ml-2 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span>{value}</span>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-3 py-1 rounded ml-2 hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableCell;
