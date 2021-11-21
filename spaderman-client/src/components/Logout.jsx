import React, { useContext } from "react";
import APIHandler from "../api/APIHandler";
import { useAuth } from "../auth/UserContext";
import {  Navigate } from "react-router-dom";

export default function Logout() {
    const {setCurrentUser, currentUser } = useAuth();
    
    
    const handleSignout = () =>
    
    {APIHandler.post("/signout").finally(() => {
      setCurrentUser(null);
    });
    <Navigate to="/play" />
  }
    
    return (
        <div >
        <button className="logout-button" onClick={handleSignout}>Logout</button>
        </div>
    )
}
