import React, { useState, useEffect } from "react";
import statsService from "../../services/statsService";

const Stats = () => {
  const [stats, setStats] = useState({
    totalPomodoros: 0,
    completedTasks: 0,
    totalTimeWorked: "0 hours",
  });

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await statsService.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold">Stats</h2>
      <div className="mt-3">
        <div className="d-flex justify-content-between mb-2">
          <span>Total Pomodoros:</span>
          <span>{stats?.totalPomodoros ?? 0}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Completed Tasks:</span>
          <span>{stats?.completedTasks ?? 0}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Total Time Worked:</span>
          <span>{stats?.totalTimeWorked ?? 0}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;