import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./IndexPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { UserContextProvider } from "./UserContext";
import RecordsPage from "./RecordsPage";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <link rel="icon" type="image/png" href="logo.png" sizes="40x40" />
      </Helmet>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/records" element={<RecordsPage />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
