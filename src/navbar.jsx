import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [dropdown, setDropdown] = React.useState(false);

  return (
    <>
      <div className="intro">
        <h4>Welcome to PomoDragon- a fast and simple Pomodoro tool</h4>
      </div>
      <nav className="nav-bar">
        <div className="logo-name">
          <Link className="logo-name" style={{ textDecoration: "none" }} to="/">
            <img src="../logo.png" alt="Logo" />
            <h1>PomoDragon</h1>
          </Link>
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
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <div className="menu-container">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setDropdown(!dropdown)}
            className="menu-icon"
          />
          {dropdown && (
            <div className="sidenav">
              <ul className="sidenav-items">
                <li className="sidenav-item">
                  <a
                    href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
                    target="_blank"
                  >
                    Pomodoro
                  </a>
                </li>
                <li className="sidenav-item">
                  <a href="https://abrarfuad.vercel.app/" target="_blank">
                    About
                  </a>
                </li>
                <li className="sidenav-item">
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
