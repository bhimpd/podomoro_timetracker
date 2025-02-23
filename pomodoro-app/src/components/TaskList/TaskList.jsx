import React, { useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: tasks.length + 1, name: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold">Task List</h2>
      <ul className="list-unstyled mt-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-3 mb-2 border rounded ${task.completed ? "bg-success text-white" : "bg-light"}`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <span>{task.name}</span>
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`btn btn-sm ${task.completed ? "btn-secondary" : "btn-primary"}`}
              >
                {task.completed ? "Completed" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="d-flex gap-2 mt-3">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
          placeholder="New task"
        />
        <button
          onClick={addTask}
          className="btn btn-primary"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskList;