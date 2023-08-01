import React, { useState } from "react";
import NavBar from "./navbar";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  function register(ev) {
    ev.preventDefault();
    if(password !== confirmPassword){
        alert('Passwords did not match.Try again.');
    }
  }

  return (
    <div className="register-container">
      <NavBar />
      <form className="register-form" onSubmit={register}>
        <h1 className="register-header">Create Account</h1>
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
        <label for="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          value={email}
          name="email"
          onChange={(ev) => setEmail(ev.target.value)}
          required
        ></input>
        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          value={password}
          name="psw"
          required
          onChange={(ev) => setPassword(ev.target.value)}
        ></input>
        <label for="confirm-psw">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          value={confirmPassword}
          name="confirm-psw"
          required
          onChange={(ev) => setConfirmPassword(ev.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
