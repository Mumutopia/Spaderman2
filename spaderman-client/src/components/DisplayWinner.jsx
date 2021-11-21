import React from "react";
import '../styles/DisplayWinner.css'

export default function DisplayWinner({ myScore, otherScore,displayResult}) {
  
  if (myScore === otherScore) {
    return <h2 id="draw" className={displayResult}>Draw</h2>;
  } else
    return myScore > otherScore ? <h2 id="blue-winner" className={displayResult}>you win</h2> : <h2 id="red-winner" className={displayResult}> you lose</h2>;
}
