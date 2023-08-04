import React from "react";
import { useContext, useState, useEffect } from "react";
import { userContext } from "./UserContext";
import NavBar from "./navbar";
import axios from "axios";

export default function RecordsPage() {
  const { userInfo, setUserInfo } = React.useContext(userContext);
  const [duration, setDuration] = useState(null);
  const [cycle, setCycle] = useState(null);

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

  return (
    <div className="records-container">
      <NavBar />
      <div className="records-tab">
        <h1>{userInfo.username}</h1>
        <h1>
          {duration === null ? "Fetching..." : `Total minutes completed: ${duration}`}
        </h1>{" "}
        <h1>
          {cycle === null ? "Fetching..." : `Total cycles: ${cycle}`}
        </h1>
      </div>
    </div>
  );
}
