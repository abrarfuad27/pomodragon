import React, { useState, useEffect } from "react";
import axios from "axios";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userContext } from "./UserContext";
import {
  faPause,
  faPlay,
  faRedo,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import beepSound from "./sounds/beep.mp3";

export default function Timer() {
  const [timerKey, setTimerKey] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerDuration, setTimerDuration] = useState(1500); // Default duration: 25 minutes in seconds
  const [showDropdown, setShowDropdown] = useState(false);
  const { userInfo, setUserInfo } = React.useContext(userContext);

  useEffect(() => {
    if (isPaused) {
      setIsActive(false);
    }
  }, [isPaused]);

  const playBeepSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
    setIsPaused(false);
    setShowDropdown(false); // Close the dropdown when starting the timer
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimerDuration(1500);
    setTimerKey((prevKey) => prevKey + 1);
  };

  const handleTimerComplete = () => {
    updateDB(); // Move the database update logic here
    playBeepSound();
    resetTimer();
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimerKey((prevKey) => prevKey + 1);
  };

  const updateDB = async () => {
    if (userInfo && userInfo.username) {
      const name = userInfo.username;
      const response = await axios.post("http://localhost:4000/update", {
        name,
        timerDuration,
      });
      if (response.status === 200) {
        console.log(response.data.user);
      }
    }
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
    { label: "60 mins", value: 3600 }, // 50 minutes in seconds
  ];
  // Function to get the current window size and set the timer size accordingly
  const getTimerSize = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const timerSize = Math.min(windowWidth * 0.5, windowHeight * 0.5); // Adjust the scaling factor as needed
    return timerSize;
  };

  // State to store the dynamic timer size
  const [timerSize, setTimerSize] = useState(getTimerSize());

  // Update the timer size when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setTimerSize(getTimerSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main-timer">
      <CountdownCircleTimer
        key={timerKey}
        isPlaying={isActive}
        duration={timerDuration}
        colors={[["#FE6F6B"]]}
        onComplete={() => {
          handleTimerComplete();
        }}
        size={timerSize}
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
