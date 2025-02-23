import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with your Laravel backend URL

// Register a new user
const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Login user
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout user
const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default { register, login, logout };