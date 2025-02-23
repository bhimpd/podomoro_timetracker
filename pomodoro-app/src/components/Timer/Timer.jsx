import React, { useState, useEffect } from "react";

const Timer = () => {
  const [time, setTime] = useState(25 * 60); // Start with 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(time - 1), 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-info min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="bg-white p-5 rounded shadow-lg text-center w-100" style={{ maxWidth: "400px" }}>
        <h2 className="display-4 font-weight-bold text-dark">Pomodoro Timer</h2>
        <div className="display-1 font-weight-bold text-dark mt-4">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="mt-5 d-flex justify-content-center gap-3">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="btn btn-success btn-lg px-5 py-3"
          >
            Start
          </button>
          <button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="btn btn-warning btn-lg px-5 py-3"
          >
            Pause
          </button>
          <button
            onClick={resetTimer}
            className="btn btn-secondary btn-lg px-5 py-3"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;