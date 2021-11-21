import React from "react";

export default function DisplayOtherPlayer({ otherScore, otherBomb,hitOtherPlayerImage }) {
  return (
    <div id="otherPlayer-wrapper">
      <div className="players-info">
        <div className="score-info">
          <h3 className="red-score">Score : {otherScore}</h3>
          <img className="ruby-image" src="/img/R2.png" alt="ruby" />
        </div>
        <div className="bomb-info ">
          <img className="bomb-image" src="/img/bomb2.png" alt="abomb" />
          <p >: {otherBomb} </p>
        </div>
      </div>

      <img id="redPlayer-avatar" src={hitOtherPlayerImage} alt="aspade" />
    </div>
  );
}
