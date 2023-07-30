import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faRedo,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function Timer() {
  const [timerKey, setTimerKey] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerDuration, setTimerDuration] = useState(1500); // Default duration: 25 minutes in seconds
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (isPaused) {
      setIsActive(false);
    }
  }, [isPaused]);

  const handleStartPause = () => {
    setIsActive(!isActive);
    setIsPaused(false);
    setShowDropdown(false); // Close the dropdown when starting the timer
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimerKey((prevKey) => prevKey + 1);
  };

  const handleTimerChange = (event) => {
    const selectedDuration = parseInt(event.target.value, 10);
    setTimerDuration(selectedDuration);
  };

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timerOptions = [
    { label: "25 mins", value: 1500 }, // 25 minutes in seconds
    { label: "40 mins", value: 2400 }, // 40 minutes in seconds
    { label: "50 mins", value: 3000 }, // 50 minutes in seconds
  ];

  return (
    <div className="main-timer">
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isActive}
        duration={timerDuration}
        colors={[["#FE6F6B"]]}
        onComplete={() => {
          setIsActive(false);
          setIsPaused(false);
        }}
        size={400}
      >
        {({ remainingTime }) => renderTime({ remainingTime })}
      </CountdownCircleTimer>

      <div className="timer-buttons">
        {isActive && !isPaused ? (
          <FontAwesomeIcon
            icon={faPause}
            onClick={() => setIsPaused(true)}
            className="timer-icon"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            onClick={handleStartPause}
            className="timer-icon"
          />
        )}

        {(isActive || isPaused) && (
          <FontAwesomeIcon
            icon={faRedo}
            onClick={handleReset}
            className="timer-icon"
          />
        )}
        {!isActive && !isPaused && (
          <div className="timer-settings">
            <FontAwesomeIcon
              icon={faCog}
              onClick={() => setShowDropdown(!showDropdown)}
              className="timer-icon"
            />
            {showDropdown && (
              <select
                className="timer-dropdown"
                onChange={handleTimerChange}
                value={timerDuration}
              >
                {timerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
