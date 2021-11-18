import React, {useState, useEffect} from "react";
import "../styles/Leaderboard.css";
import APIHandler from "../api/APIHandler.js"

export default function Leaderboard() {
    const [displayData,setDisplayData] = useState("") 

const fetchData = async() =>{
 try {
     const dataBoard = await APIHandler.get("/leaderboard")
     setDisplayData(dataBoard.data)
     console.log(displayData)
 } catch  (err) {
    console.error(err);
  }

}

  return (
    <div className="leaderboard-wrapper">
      <div className="grid-1-leaderboard">Leaderboard</div>
      <div className="grid-2-leaderboard-buttons">
          <button  className="leaderboard-buttons" >Wins</button><button className="leaderboard-buttons" onClick={fetchData}>Highest Scores</button>
      </div>
      <div className="grid-3-table-leaderboard">
        <table>
          <thead>
            <tr>
              <th>content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>list</td>
            </tr>
            <tr>
              <td>list</td>
            </tr>
            <tr>
              <td>list</td>
            </tr>
            <tr>
              <td>list</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
