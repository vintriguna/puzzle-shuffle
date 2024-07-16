import React from "react";

export default function Scoreboard({ score, highScore }) {
  return (
    <div className="scoreBoard">
      <div className="curScore">Current Score: {score}</div>
      <div className="highScore">Highest Score: {highScore}</div>
    </div>
  );
}
