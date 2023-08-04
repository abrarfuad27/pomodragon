import React from "react";
import { useContext, useState, useEffect } from "react";
import { userContext } from "./UserContext";
import NavBar from "./navbar";
import axios from "axios";

export default function RecordsPage() {
  const { userInfo, setUserInfo } = React.useContext(userContext);

  return (
    <div className="records-container">
      <NavBar />
      <div className="records-tab"></div>
    </div>
  );
}
