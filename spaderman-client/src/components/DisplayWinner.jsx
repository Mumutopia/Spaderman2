import React from "react";

export default function DisplayWinner({ myScore, otherScore,displayResult}) {
  console.log(displayResult);
  if (myScore === otherScore) {
    return <h2 className={displayResult}>Draw</h2>;
  } else
    return myScore > otherScore ? <h2 className={displayResult}>you win</h2> : <h2 className={displayResult}> you lose</h2>;
}
