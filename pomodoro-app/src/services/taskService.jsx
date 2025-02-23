import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with your backend URL

// Get all tasks
const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add a new task
const addTask = async (name) => {
  try {
    const response = await axios.post(
      `${API_URL}/tasks`,
      { name },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a task
const updateTask = async (id, completed) => {
  try {
    const response = await axios.put(
      `${API_URL}/task/${id}`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/task/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { getTasks, addTask, updateTask, deleteTask };