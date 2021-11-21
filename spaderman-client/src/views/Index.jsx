import React from "react";
import "../styles/Index.css";
import MainTitle from "../components/MainTitle";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="index-wrapper">
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

      <div className="index-grid2">
        <div className="signin-signup">
          <Link
            to={{
              pathname: `/signin`,
            }}
          >
            Sign-in
          </Link>
          <Link
            to={{
              pathname: `/signup`,
            }}
          >
            Sign-up
          </Link>
        </div>
      </div>

      <img
        className="index-grid3 image-title"
        src="./img/red-shovel4.png"
        alt="avatar"
      />
    </div>
  );
}
