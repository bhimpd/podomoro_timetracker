import React, { useState, useEffect } from "react";
import taskService from "../../services/taskService";
import TaskForm from "../TaskForm/TaskForm";


const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [taskToEdit, setTaskToEdit] = useState(null); // State for the task being edited

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskService.getTasks();
      console.log("Full API Response:", response); // Debugging
    console.log("Extracted Tasks:", response.data); // Debugging


      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        setError("Invalid data format received from the API");
      }
    } catch (error) {
      setError("Error fetching tasks. Please try again later.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };



  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      setError("Error deleting task. Please try again.");
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>; // Show a loading message
  }

  if (error) {
    return <div className="text-danger">{error}</div>; // Show an error message
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold">Task List</h2>
      <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} fetchTasks={fetchTasks} />

      <ul className="list-unstyled mt-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-3 mb-2 border rounded ${task.completed ? "bg-success text-white" : "bg-light"}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>{task.title}</span>
              <div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="btn btn-danger btn-sm ml-2"
                >
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

export default TaskList;