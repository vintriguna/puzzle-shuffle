import React from "react";
import BarLoader from "react-spinners/BarLoader.js";

export default function LoadingScreen() {
  return (
    <div className="loadingContainer">
      <div className="loadingLabel">Loading</div>
      <BarLoader
        height="1.5em"
        width="20em"
        color="#9ec5ff"
        speedMultiplier={1.2}
      />
    </div>
  );
}
