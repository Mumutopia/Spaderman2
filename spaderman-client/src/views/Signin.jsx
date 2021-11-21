import React, { useState, useContext } from "react";
import "../styles/signin.css";
import { Link, Navigate } from "react-router-dom";
// custom tools
import { useAuth } from "../auth/UserContext";
import APIHandler from "../api/APIHandler";

export default function Signin(props) {
  const [email, setEmail] = useState("admin@foobarbaz.io");
  const [password, setPassword] = useState("12345");
  const { isLoggedIn, setCurrentUser, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiRes = await APIHandler.post("/signin", { email, password });
      setCurrentUser(apiRes.data.currentUser);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  return isLoggedIn ? (
    <Navigate to="/home" />
  ) : (
    <div className="signin-wrapper">
      <div className="index-header">
        <img className="index-header-images" src="./img/R2.png" alt="icon" />
        <img className="index-header-images" src="./img/Gr2.png" alt="icon" />
        <div className="index-titles">
          <h1 className="index-title">Spaderman</h1>
          <h2>Coding From Home</h2>
        </div>

        <img className="index-header-images" src="./img/Br2.png" alt="icon" />
        <img className="index-header-images" src="./img/bomb2.png" alt="icon" />
      </div>
      <img
          className="index-grid1 image-title"
          src="./img/blue-shovel4.png"
          alt="avatar"
        />
      <form className="signin-form" onSubmit={handleSubmit}>
        <h1 className="signin-title">Signin</h1>
        <label className="label" htmlFor="email">
          email
        </label>

        <input
          className="input"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label" htmlFor="password">
          password
        </label>
        <input
          className="input"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn">ok</button>
        <p className="parag">
          No account yet ? please{" "}
          <Link to="/signup" className="link">
            signup
          </Link>
        </p>
      </form>
      <img
        className="index-grid3 image-title"
        src="./img/red-shovel4.png"
        alt="avatar"
      />
    </div>
  );
}
