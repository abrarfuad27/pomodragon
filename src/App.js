import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<RegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
