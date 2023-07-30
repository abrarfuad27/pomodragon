import React, { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Timer completed, you can add any desired behavior here
      // For example, you could play a sound or show a notification.
      // For simplicity, we will just stop the timer for now.
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(1500); // Reset to 25 minutes (1500 seconds)
  };

  // Format the time to display minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="main-timer">
      <div className="timer-display">{formatTime(seconds)}</div>
      <button onClick={handleStartPause}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
