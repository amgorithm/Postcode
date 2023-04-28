import React from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import useUser from "../../hooks/useUser";
import NavBar from "../../components/NavBar/NavBar";
import UserPosts from "../UserPosts/UserPosts";
import AddPost from "../AddPost/AddPost";
import EditPost from "../EditPost/EditPost";
import DetailPost from "../DetailPost/DetailPost";
import EditUserAbout from "../EditUserAbout/EditUserAbout";
import Footer from "../../components/Footer/Footer";
import About from "../About/About";

function App() {
  const { refreshAuth } = useUser();

  React.useEffect(() => {
    refreshAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className="header">
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="*" element={<Navigate to="/" />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/posts" element={<UserPosts />} />
          <Route exact path="/post/new" element={<AddPost />} />
          <Route exact path="/post/detail/:postID" element={<DetailPost />} />
          <Route exact path="/post/edit/:postID" element={<EditPost />} />
          <Route exact path="/user/edit/:userID" element={<EditUserAbout />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
