import React from "react";

export default function DisplayOtherPlayer({ otherScore, otherBomb }) {
  return (
    <div id="otherPlayer-wrapper">
      <div className="players-info">
        <div className="score-info">
          <p>Score : {otherScore}</p>
          <img className="ruby-image" src="/img/R2.png" alt="ruby" />
        </div>
        <div className="bomb-info">
          <img className="bomb-image" src="/img/bomb2.png" alt="abomb" />
          <p>: {otherBomb} </p>
        </div>
      </div>

      <img id="redPlayer-avatar" src="/img/red-shovel4.png" alt="aspade" />
    </div>
  );
}
