import React, { useEffect, useState } from "react";
import "./villagers.css";

export default function Buttons(props) {
  return (
    <div>
      <button
        className="vil-button"
        onClick={() => {
          if (props.index == 0) {
            props.setIndex(4); //needs to change with added villagers
          } else {
            props.setIndex(props.index - 1);
          }
        }}
      >
        Previous Villager
      </button>
      <button
        className="vil-button"
        onClick={() => {
          if (props.index == 4) {
            props.setIndex(0);
          } else {
            props.setIndex(props.index + 1);
          }
        }}
      >
        Next Villager
      </button>
    </div>
  );
}
