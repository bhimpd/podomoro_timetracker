import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Replace with your backend URL

// Get stats
const getStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const { total_pomodoros, total_breaks, total_time_spent } = response.data;
  
      return {
        totalPomodoros: total_pomodoros ?? 0,
        completedTasks: total_breaks ?? 0,
        totalTimeWorked: total_time_spent ?? "0 hours",
      };
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export default { getStats };
  