import React from "react";

export default function DisplayWinner({ myScore, otherScore,displayResult}) {
  console.log(displayResult);
  if (myScore === otherScore) {
    return <p className={displayResult}>Draw</p>;
  } else
    return myScore > otherScore ? <p className={displayResult}>you win</p> : <p className={displayResult}> you lose</p>;
}
