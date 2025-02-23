import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with your backend URL

const register = async (name, email, password, password_confirmation) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

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