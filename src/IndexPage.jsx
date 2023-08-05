import { useState, useContext, useEffect } from "react";
import NavBar from "./navbar";
import MotivationalQuote from "./quotes";
import Timer from "./timer";
import { userContext } from "./UserContext";

export default function IndexPage() {
  return (
    <div className="main-container">
      <NavBar />
      <Timer />
      <MotivationalQuote />
      <footer className="footer">© 2023 Pomodragon. All rights reserved</footer>
    </div>
  );
}
