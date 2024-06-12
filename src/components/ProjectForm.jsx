import React, { useState } from "react";
import { DatePicker, Select,Input  } from 'antd';
import moment from 'moment';

const ProjectForm = ({ onSubmit, projectName, setProjectName, projectStatus, setProjectStatus, projectDeadline, setProjectDeadline, projectAssignee, setProjectAssignee }) => {
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

  return (
    <form onSubmit={onSubmit} className="edit-form">
      <div className="form-group-wrapper">
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <Input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectStatus">Status:</label>
          <Select
            id="projectStatus"
            value={projectStatus}
            onChange={(value) => setProjectStatus(value)} 
            options={statusOptions}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectDeadline">Deadline:</label>
          <DatePicker
            id="projectDeadline"
            value={projectDeadline ? moment(projectDeadline) : null} 
            onChange={(date, dateString) => { 
              setProjectDeadline(dateString); 
            }} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectAssignee">Assignee:</label>
          <Select
           style={{ width: '100%' }}
            id="projectAssignee"
            value={projectAssignee}
            onChange={(value) => setProjectAssignee(value)} 
            options={assigneeOptions}
            required
          />
        </div>
        <div className="form-group">
          <div className="button-wrapper">
            <button type="submit" className="save-change">
              Add Project
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
