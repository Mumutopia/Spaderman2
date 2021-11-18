import React, { useContext } from "react";
import APIHandler from "../api/APIHandler";
import { useAuth } from "../auth/UserContext";


export default function Logout() {
    const {setCurrentUser, currentUser } = useAuth();


    const handleSignout = () =>
    APIHandler.post("/signout").finally(() => {
      setCurrentUser(null);
    });
    
    return (
        <div>
        <button onClick={handleSignout}>La batarrdd</button>
        </div>
    )
}
