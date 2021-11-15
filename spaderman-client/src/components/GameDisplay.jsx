import React from "react";

export default function GameDisplay({
  myXPosition,
  myYPosition,
  otherXPosition,
  otherYPosition,
  myScore,
  otherScore,
  myBomb,
  otherBomb
}) {
  return (
    <div>
      my pos : [{myXPosition},{myYPosition}] other pos :[{otherXPosition},
      {otherYPosition}] my score :{myScore}
      other score :{otherScore}
      my bombs: {myBomb}
      other bombs : {otherBomb}
    </div>
  );
}
