import React from "react";
import "../styles/Index.css";
import MainTitle from "../components/MainTitle";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="index-wrapper">
      
        <div className="index-header">
          <img className="index-header-images"  src="./img/R2.png" alt="icon" />
          <img className="index-header-images"  src="./img/Gr2.png" alt="icon" />
          <h1 className="title">Spaderman</h1>
          <img className="index-header-images"  src="./img/Br2.png" alt="icon" />
          <img  className="index-header-images" src="./img/bomb2.png" alt="icon" />
        </div>
        
        <div className="index-grid1"> <img
            className="image-title"
            src="./img/blue-shovel4.png"
            alt="avatar"
          /></div>
        <div className="index-grid2"><div className="signin-signup">
            <div>

              <Link 
              to={{
                  pathname: `/signin`,
                  
                }}>Sign-in
              </Link>
              <Link
              to={{
                  pathname: `/signup`,
                  
                }}>
                Sign-up
              </Link>
            </div>
            
          </div></div>
        <div className="index-grid3"> <img
            className="image-title"
            src="./img/red-shovel4.png"
            alt="avatar"
          /></div>
      
    </div>
  );
}
