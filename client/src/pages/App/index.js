import React from "react";
import "./App.css";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import AddPost from "../AddPost/AddPost";
import EditPost from "../EditPost/EditPost";
import DetailPost from "../DetailPost/DetailPost";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="header">
        <Link to="/">
          <h1>Postcode</h1>
        </Link>
        <NavBar />
      </header>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/post/new" element={<AddPost />} />
        <Route exact path="/post/detail/:postID" element={<DetailPost />} />
        <Route exact path="/post/edit/:postID" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;
