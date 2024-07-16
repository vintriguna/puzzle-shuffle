import React from "react";

export default function Card({ name, url, id, beenChosen, handleClick }) {
  return (
    <div className="Card" data-id={id} onClick={handleClick}>
      <div>{name}</div>
      <img src={url} />
    </div>
  );
}
