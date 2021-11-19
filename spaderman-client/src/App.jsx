import "./App.css";

import "./styles/MainTitle.css";
import React from "react";

import { Routes, Route } from "react-router-dom";
import Game from "./views/Game";
import Test from "./views/Test";
import Leaderboard from "./views/Leaderboard";
import Index from "./views/Index";
import Home from "./views/Home";
import Play from "./views/Play";
import Lobby from "./views/Lobby";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import { UserContextProvider } from "./auth/UserContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import HowToPlay from "./views/HowToPlay"
// pages components

function App() {
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/game/:id" element={<Game />} />
          <Route path="/lobby/:name" element={<Lobby />} />
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/play" element={<Play />} />
          <Route path="/leaderBoard" element={<Leaderboard />} />
          <Route path="/howtoplay" element={<HowToPlay />} />
        </Routes>
    </UserContextProvider>
  );
}

export default App;
