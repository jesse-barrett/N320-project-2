import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons.js";
import "./villagers.css";

//import material UI components here
import Fab from "@mui/material/Fab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function Villager() {
  //states to handle the initial project load
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  //states to handle displayed data
  const [villagers, setVillagers] = useState([]);
  const [index, setIndex] = useState(0);

  //retrieve the data
  useEffect(() => {
    fetch("data/villagers.json")
      .then((response) => response.json())
      .then(
        (data) => {
          //save the data
          setVillagers(data.Villagers);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  //functions that cycle up and down through the villagers array
  function navUp() {
    let limit = villagers.length;
    if (index == 3) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  function navDown() {
    if (index == 0) {
      setIndex(3);
    } else {
      setIndex(index - 1);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="villagers">
        {villagers[index].name}
        <div>
          <Fab onClick={navDown}>
            {" "}
            <NavigateBeforeIcon />
          </Fab>
          <Fab onClick={navUp}>
            {" "}
            <NavigateNextIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

/* <div>{JSON.stringify(villagers)}</div> */
