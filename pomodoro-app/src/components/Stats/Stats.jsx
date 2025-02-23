import React from "react";

const Stats = () => {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <h2 className="h4 font-weight-bold">Stats</h2>
      <div className="mt-3">
        <div className="d-flex justify-content-between mb-2">
          <span>Total Pomodoros:</span>
          <span>15</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Completed Tasks:</span>
          <span>10</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Total Time Worked:</span>
          <span>5 hours</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;