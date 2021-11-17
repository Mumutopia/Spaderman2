import "./App.css";

import "./styles/MainTitle.css"
import React from "react";

import { Routes, Route } from "react-router-dom";
import Game from "./views/Game";
import Test from "./views/Test";
import Index from "./views/Index";
import Home from "./views/Home";
import Play from "./views/Play";
import Lobby from "./views/Lobby"
// pages components

function App() {
  return (
    <React.Fragment>
        

      <Routes>
        
        <Route path="/game/:id" element={<Game />} />
        <Route path="/lobby/:name" element={<Lobby />} />
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/leaderBoard" element={<Play />} />
        <Route path="/howtoplay" element={<Play />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
