import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Space, DatePicker, Select, Input } from 'antd';
import moment from 'moment';

const { Option } = Select;

function App() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState("To Do");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectAssignee, setProjectAssignee] = useState("select assignee");
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const addProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/projects", {
        name: projectName,
        status: projectStatus,
        deadline: projectDeadline,
        assignee: projectAssignee,
      });
      setProjects([
        ...projects,
        {
          id: response.data.id,
          name: projectName,
          status: projectStatus,
          deadline: projectDeadline,
          assignee: projectAssignee,
        },
      ]);
      setProjectName("");
      setProjectStatus("To Do");
      setProjectDeadline("");
      setProjectAssignee("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const updateProject = async (projectId, updatedProject) => {
    try {
      await axios.put(
        `http://localhost:5000/projects/${projectId}`,
        updatedProject
      );
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${projectId}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleEditChange = (name, value) => {
    setEditingProject({ ...editingProject, [name]: value });
  };

  const handleDateChange = (date, dateString) => {
    setEditingProject({ ...editingProject, deadline: dateString });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await updateProject(editingProject.id, editingProject);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
  };

  return (
    <div className="container">
      <h1 className="project-main-title">Project Management</h1>
      <div className="project-list-container">
        <h2 className="project-main-title">Projects</h2>
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
              {editingProject && editingProject.id === project.id ? (
                <form onSubmit={saveEdit} className="edit-form">
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <Input
                        id="projectName"
                        name="name"
                        value={editingProject.name}
                        onChange={(e) => handleEditChange(e.target.name, e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <Select
                        id="projectStatus"
                        name="status"
                        value={editingProject.status}
                        onChange={(value) => handleEditChange('status', value)}>
                        <Option value="To Do">To Do</Option>
                        <Option value="In Progress">In Progress</Option>
                        <Option value="Completed">Completed</Option>
                      </Select>
                    </div>
                    <div className="form-group">
                      <DatePicker
                        id="projectDeadline"
                        name="deadline"
                        value={editingProject.deadline ? moment(editingProject.deadline) : null}
                        onChange={handleDateChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <Select
                        id="projectAssignee"
                        name="assignee"
                        value={editingProject.assignee}
                        onChange={(value) => handleEditChange('assignee', value)}
                        required>
                        <Option value="amal">amal</Option>
                        <Option value="nidheesh">nidheesh</Option>
                        <Option value="nikhesh">nikhesh</Option>
                        <Option value="lijo">lijo</Option>
                        <Option value="krishnakumar">krishnakumar</Option>
                      </Select>
                    </div>
                    <div className="form-group">
                      <div className="button-wrapper">
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button onClick={cancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <>
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
                      <Button
                        onClick={() => handleEdit(project)}>
                        Edit
                      </Button>
                      <Button
                        danger
                        onClick={() => deleteProject(project.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={addProject} className="edit-form">
        <div className="form-group-wrapper">
          <div className="form-group">
            <label htmlFor="projectName">Project Name:</label>
            <Input
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
              onChange={(value) => setProjectStatus(value)}>
              <Option value="To Do">To Do</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>
          <div className="form-group">
            <label htmlFor="projectDeadline">Deadline:</label>
            <DatePicker
              id="projectDeadline"
              value={projectDeadline ? moment(projectDeadline) : null}
              onChange={(date, dateString) => setProjectDeadline(dateString)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="projectAssignee">Assignee:</label>
            <Select
              id="projectAssignee"
              value={projectAssignee}
              onChange={(value) => setProjectAssignee(value)}
              required>
              <Option value="amal">amal</Option>
              <Option value="nidheesh">nidheesh</Option>
              <Option value="nikhesh">nikhesh</Option>
              <Option value="lijo">lijo</Option>
              <Option value="krishnakumar">krishnakumar</Option>
            </Select>
          </div>
          <div className="form-group">
            <div className="button-wrapper">
              <Button type="primary" htmlType="submit">
                Add Project
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
