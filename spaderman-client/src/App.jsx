import "./App.css";

import "./styles/MainTitle.css"
import React from "react";

import { Routes, Route } from "react-router-dom";
import Test from "./views/Test";
import Index from "./views/Index";
import Home from "./views/Home";
import Play from "./views/Play";
// pages components

function App() {
  return (
    <React.Fragment>
        

      <Routes>
        
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/play" element={<Play />} />
        <Route path="/home/leaderBoard" element={<Play />} />
        <Route path="/home/howtoplay" element={<Play />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
