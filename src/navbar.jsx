import React from "react";

export default function NavBar() {
  return (
    <>
      <div className="intro">
        <h4>Welcome to PomoDragon- a fast and simple Pomodoro tool</h4>
      </div>
      <nav className="nav-bar">
        <div className="logo-name">
          <img src="../logo.png" />
          <h1>PomoDragon</h1>
        </div>
        <ul className="nav-items">
          <li className="nav-item">
            <a
              href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
              target="_blank"
            >
              Pomodoro
            </a>
          </li>
          <li className="nav-item">
            <a href="https://abrarfuad.vercel.app/" target="_blank">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="" target="_blank">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
