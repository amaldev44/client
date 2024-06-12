import React, { useState, useEffect } from "react";
import { DatePicker, Select } from 'antd';
import moment from 'moment';

const ProjectEditForm = ({ project, onSave, onCancel }) => {
  const [name, setName] = useState(project.name);
  const [status, setStatus] = useState(project.status);
  const [deadline, setDeadline] = useState(project.deadline);
  const [assignee, setAssignee] = useState(project.assignee);

  const [statusOptions] = useState([
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ]);

  const [assigneeOptions] = useState([
    { value: 'amal', label: 'amal' },
    { value: 'nidheesh', label: 'nidheesh' },
    { value: 'nikhesh', label: 'nikhesh' },
    { value: 'lijo', label: 'lijo' },
    { value: 'krishnakumar', label: 'krishnakumar' },
  ]);

  useEffect(() => {
    setName(project.name);
    setStatus(project.status);
    setDeadline(project.deadline);
    setAssignee(project.assignee);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({ id: project.id, name, status, deadline, assignee });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <div className="form-group-wrapper">
        <div className="form-group">
          <input
            type="text"
            id="projectName"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <Select
            id="projectStatus"
            value={status}
            onChange={(value) => setStatus(value)} 
            options={statusOptions}
            required
          />
        </div>
        <div className="form-group">
          <DatePicker
            id="projectDeadline"
            name="deadline"
            value={deadline ? moment(deadline) : null}
            onChange={(date, dateString) => setDeadline(dateString)}
            required
          />
        </div>
        <div className="form-group">
          <Select
            id="projectAssignee"
            name="assignee"
            value={assignee}
            onChange={(value) => setAssignee(value)} 
            options={assigneeOptions}
            required
          />
        </div>
        <div className="form-group">
          <div className="button-wrapper">
            <button type="submit" className="save-change">
              Save
            </button>
            <button
              type="button"
              className="cancel"
              onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectEditForm;
