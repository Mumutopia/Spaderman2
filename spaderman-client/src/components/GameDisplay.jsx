import React from "react";

export default function GameDisplay({ myScore, myBomb,displayDugitems }) {
  return (
    <div id="myplayer-wrapper">
      <div className="players-info">
        <div className="score-info">
          <p>Score :{myScore}</p>
          <img className="ruby-image" src="/img/R2.png" alt="ruby" />
        </div>
        <div className="bomb-info">
          <img className="bomb-image" src="/img/bomb2.png" alt="abomb" />
          <p> : {myBomb} </p>
        </div>
      </div>
    <div className="avatar-item-wrapper">
    <img id="bluePlayer-avatar" src="/img/blue-shovel4.png" alt="aspade" />
    <div  id="items-dug">
      <div id={displayDugitems}></div>
    </div>
    </div>
      
    </div>
  );
}
