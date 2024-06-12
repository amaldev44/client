import React from "react";

const ProjectList = ({ projects, onEdit, onDelete }) => {
  return (
    <div className="project-list-container">
    
      <div className="project-title">
        <div className="project-title-col">
          <h4>Project name</h4>
        </div>
        <div className="project-title-col">
          <h4>Project Status</h4>
        </div>
        <div className="project-title-col">
          <h4>Project Deadline</h4>
        </div>
        <div className="project-title-col">
          <h4>Assignee</h4>
        </div>
        <div className="project-title-col"></div>
      </div>
      <ul className="projectList-wrapper">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="projectList">
              <div className="col">
                <p>{project.name}</p>
              </div>
              <div className="col">
                <p> {project.status}</p>
              </div>
              <div className="col">
                <p>{project.deadline}</p>
              </div>
              <div className="col">
                <p>{project.assignee}</p>
              </div>
              <div className="col button-wrapper">
                <button
                  className="edit"
                  onClick={() => onEdit(project)}>
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => onDelete(project.id)}>
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
