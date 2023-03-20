import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="header">
        <h1>Postcode</h1>
        <NavBar />
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
