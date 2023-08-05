import React from "react";
import { useContext, useState, useEffect } from "react";
import { userContext } from "./UserContext";
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecordsPage() {
  const { userInfo, setUserInfo } = React.useContext(userContext);
  const [duration, setDuration] = useState(null);
  const [cycle, setCycle] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  React.useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/records/" + userInfo.username,
          userInfo
        );

        if (response.status === 200) {
          setDuration(response.data.user.duration);
          setCycle(response.data.user.cycle);
        }
      } catch (err) {
        console.log(`Error->${err}`);
      }
    };
    fetchUserRecords();
  }, [userInfo.token, userInfo.username]);

  async function signOut() {
    try {
      const response = await axios.post(
        "http://localhost:4000/signout",
        userInfo
      );
      if (response.status === 200) {
        setUserInfo({
          username: "",
          email: "",
          token: "",
        });
        sessionStorage.clear();
        navigate("/"); // Redirect to the home page after signing out
      }
    } catch (err) {
      console.log(`Error->${err}`);
    }
  }

  return (
    <div className="records-container">
      <NavBar />
      <div className="records-tab">
        <div className="stats">
          <p>Username: {userInfo.username}</p>
          <p>
            {duration === null
              ? "Fetching..."
              : `Minutes completed: ${duration}`}
          </p>{" "}
          <p>
            {cycle === null
              ? "Fetching..."
              : `Pomodoro cycles completed: ${cycle}`}
          </p>
        </div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}
