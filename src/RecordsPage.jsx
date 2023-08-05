import React from "react";
import { useContext, useState, useEffect } from "react";
import { userContext } from "./UserContext";
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
Chart.register(...registerables);

export default function RecordsPage() {
  const { userInfo, setUserInfo } = React.useContext(userContext);
  const [duration, setDuration] = useState(null);
  const [cycle, setCycle] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate(); // Get the navigate function

  React.useEffect(() => {
    if (userInfo.username) {
      const fetchUserRecords = async () => {
        try {
          const response = await axios.get(
            "http://localhost:4000/records/" + userInfo.username
          );

          if (response.status === 200) {
            setDuration(response.data.user.duration);
            setCycle(response.data.user.cycle);
            setActivityData(response.data.user.activityData);
          }
        } catch (err) {
          console.log(`Error->${err}`);
        }
      };
      fetchUserRecords();
    }
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

  const chartData =
    activityData.length > 0
      ? {
          labels: activityData.map((activity) => {
            // Parse the date string using Date constructor
            const parsedDate = new Date(activity.Date);

            // Format the date as needed (e.g., YYYY-MM-DD)
            const formattedDate = parsedDate.toISOString().split("T")[0];

            return formattedDate;
          }),
          datasets: [
            {
              label: "Cycles Completed",
              data: activityData.map((activity) => activity.count),
              backgroundColor: "#FE6F6B",
            },
          ],
        }
      : null;

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
      {chartData && (
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
