import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons.js";
import Nook from "./photos/Tom_Nook.png";
import Brewster from "./photos/Brewster.png";
import Pelly from "./photos/Pelly.png";
import Redd from "./photos/Redd.png";
import Tortimer from "./photos/Tortimer.png";
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

  //states to handle the displayed photo
  let villagerPhotos = [Nook, Brewster, Pelly, Redd, Tortimer];
  const [villagerPhoto, setVillagerPhoto] = useState(villagerPhotos[0]);

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
    if (index == 4) {
      //must change from 4 if we add
      setIndex(0);
      setVillagerPhoto(villagerPhotos[0]); //set the villager photo to the name in the array
    } else {
      setIndex(index + 1);
      setVillagerPhoto(villagerPhotos[index + 1]);
    }
  }

  function navDown() {
    if (index == 0) {
      setIndex(4); //must also change from 4 if we add
      setVillagerPhoto(villagerPhotos[4]);
    } else {
      setIndex(index - 1);
      setVillagerPhoto(villagerPhotos[index - 1]);
    }
  }

  //error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      //if successful --> return villager bio
      <div className="villagers">
        <div className="vil-img-container">
          <img className="vil-img" src={villagerPhoto} alt="Logo" />
        </div>
        <div className="vil-name">{villagers[index].name}</div>
        <div className="vil-gender">Gender: {villagers[index].gender}</div>
        <div className="vil-species">Species: {villagers[index].species}</div>
        <div className="vil-birthday">
          Birthday: {villagers[index].birthday}
        </div>
        <div className="vil-astro">Astrology: {villagers[index].astrology}</div>
        <div className="services-title">Services:</div>
        {villagers[index].services.map((services, ind) => (
          <div key={ind} className="vil-services">
            {services}
          </div>
        ))}
        <div className="fab-container">
          <Fab
            className="fab-back"
            size="medium"
            // color="primary"
            // variant="extended"
            onClick={navDown}
          >
            <NavigateBeforeIcon />
          </Fab>
          <Fab
            className="fab-forward"
            size="medium"
            // color="primary"
            // variant="extended"
            onClick={navUp}
          >
            <NavigateNextIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

/* <div>{JSON.stringify(villagers)}</div> */