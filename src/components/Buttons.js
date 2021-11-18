import React, { useState } from "react";

export default function Buttons(props) {
  return (
    <div>
      <button
        onClick={() => {
          if (props.index == 0) {
            props.setIndex(3);
          } else {
            props.setIndex(props.index - 1);
          }
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (props.index == 3) {
            props.setIndex(0);
          } else {
            props.setIndex(props.index + 1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
}
