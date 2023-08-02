import React from "react";
import NavBar from "./navbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { userContext } from "./UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = React.useContext(userContext);

  async function login(ev) {
    ev.preventDefault();
    const userData = { username, password };
    try {
      const response = await axios.post(
        "http://localhost:4000/login",
        userData
      );

      if (response.status === 200) {
        alert("Login successful");
        setUserInfo(response.data.user);
        setRedirect(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-container">
      <NavBar />
      <form className="login-form" onSubmit={login}>
        <h1 className="login-header">Sign In</h1>
        <label for="uname">
          <b>Username</b>
        </label>
        <input
          type="text"
          value={username}
          name="uname"
          onChange={(ev) => setUsername(ev.target.value)}
          required
        />
        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          value={password}
          name="psw"
          required
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
      <p>
        Don't have an account? Create <Link to="/signup">here</Link>
      </p>
    </div>
  );
}
