import React from 'react';

const MinionEdit = ({ name, title, salary, weaknesses, handleChange }) => {
  if (
    name === undefined &&
    title === undefined &&
    salary === undefined &&
    weaknesses === undefined
  ) {
    return <div className="minion-edit">Loading minion data...</div>;
  }

  return (
    <div className="minion-edit">
      <div className="minion-edit-single-rows">
        <div className="minion-edit-row">
          <div className="minion-edit-label">Name:</div>
          <input
            name="name"
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </div>
        <div className="minion-edit-row">
          <div className="minion-edit-label">Title:</div>
          <input
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="minion-edit-row">
          <div className="minion-edit-label">Salary:</div>
          <input
            name="salary"
            type="number"
            value={salary}
            onChange={handleChange}
            placeholder="Enter salary"
          />
        </div>
      </div>
      <div className="minion-edit-label">Weaknesses:</div>
      <div>
        <textarea
          className="minion-input-textarea"
          name="weaknesses"
          value={weaknesses}
          onChange={handleChange}
          placeholder="List weaknesses..."
        />
      </div>
    </div>
  );
};

export default MinionEdit;