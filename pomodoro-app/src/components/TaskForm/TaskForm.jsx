import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";

const TaskForm = ({ taskToEdit, setTaskToEdit, fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    estimated_cycles: 1, // Default value
    completed_cycle: 0, // Default value
    status: "pending",
  });
  
  const [error, setError] = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
      });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await taskService.addTask(task);
      fetchTasks();
      setTask({
        title: "",
        description: "",
        estimated_cycles: 1,
        completed_cycle: 0,
        status: "pending",
      });
      setError(null);
    } catch (error) {
      if (error.data) {
        setError(error.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };


  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h3>{taskToEdit ? "Update Task" : "Add New Task"}</h3>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="form-control"
            placeholder="Task Title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="form-control"
            placeholder="Task Description"
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="form-control"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Estimated Cycles</label>
          <input
            type="number"
            value={task.estimated_cycles}
            onChange={(e) => setTask({ ...task, estimated_cycles: parseInt(e.target.value) })}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Completed Cycle</label>
          <input
            type="number"
            value={task.completed_cycle}
            onChange={(e) => setTask({ ...task, completed_cycle: parseInt(e.target.value) })}
            className="form-control"
            required
          />
        </div>


        <button type="submit" className="btn btn-primary">
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
