import React from "react";
import NavBar from "./navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login(ev) {
    ev.preventDefault();
    console.log({ username, password });
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
