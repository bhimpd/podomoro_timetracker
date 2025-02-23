import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";

const TaskForm = ({ taskToEdit, setTaskToEdit, fetchTasks }) => {
  const [task, setTask] = useState({ title: "", description: "", status: "pending" });
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

    if (taskToEdit) {
      // Update existing task
      try {
        await taskService.updateTask(taskToEdit.id, task);
        fetchTasks();
        setTaskToEdit(null);
      } catch (error) {
        setError("Error updating task. Please try again.");
      }
    } else {
      // Add new task
      try {
        await taskService.addTask(task);
        fetchTasks();
        setTask({ title: "", description: "", status: "pending" }); // Reset form after success
      } catch (error) {
        setError("Error adding task. Please try again.");
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
        <button type="submit" className="btn btn-primary">
          {taskToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
