import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import Nook from "./photos/Tom_Nook.png";
import Brewster from "./photos/Brewster.png";
import Pelly from "./photos/Pelly.png";
import Redd from "./photos/Redd.png";
import Tortimer from "./photos/Tortimer.png";
import { List, Modal, Grid } from "@material-ui/core";
import { CSSTransition, SwitchTransition } from "react-transition-group";
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

  document.onkeydown = checkKey;

  document.onkeydown = checkKey;

  function checkKey(e) {
    e = e || window.event;

    if (e.keyCode == "38") {
      // up arrow
      navUp();
    } else if (e.keyCode == "40") {
      // down arrow
      navDown();
    } else if (e.keyCode == "37") {
      // left arrow
      navDown();
    } else if (e.keyCode == "39") {
      // right arrow
      navUp();
    }
  }

  const [inProp, setInProp] = useState([false, false, false, false]);

  function openBubble(index) {
    if (inProp[index] === false) {
      // inProp = [false, false, false, false];
      inProp[index] = true;
      setInProp([...inProp]);
    } else {
      // inProp = [false, false, false, false];
      inProp[index] = false;
      setInProp([...inProp]);
    }
  }
  const [state, setState] = useState(false);
  //error handling
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      //if successful --> return villager bio
      <div className="villagers">
        <div className="top-content">
          <div className="info-buttons">
            <div
              className="button button1"
              onClick={() => {
                openBubble(0);
              }}
            >
              <CSSTransition in={inProp[0]} timeout={200} classNames="bubble">
                <div className="bubble">
                  <p>I'm a {villagers[index].astrology}!</p>
                </div>
              </CSSTransition>
            </div>
            <div
              className="button button2"
              onClick={() => {
                openBubble(1);
              }}
            >
              <CSSTransition in={inProp[1]} timeout={200} classNames="bubble">
                <div className="bubble">
                  <p>{villagers[index].gender}</p>
                </div>
              </CSSTransition>
            </div>
          </div>
          <div className="big-image">
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={state}
                // addEndListener={(node, done) =>
                //   node.addEventListener("transitioned", done, false)
                // }
                timeout={200}
                classNames="vil-img"
              >
                <img className="vil-img" src={villagerPhoto} alt="Logo" />
              </CSSTransition>
            </SwitchTransition>
          </div>
          <div className="info-buttons">
            <div
              className="button button3"
              onClick={() => {
                openBubble(2);
              }}
            >
              <CSSTransition in={inProp[2]} timeout={200} classNames="bubble">
                <div className="bubble">
                  <p>{villagers[index].species}</p>
                </div>
              </CSSTransition>
            </div>
            <div
              className="button button4"
              onClick={() => {
                openBubble(3);
              }}
            >
              <CSSTransition in={inProp[3]} timeout={200} classNames="bubble">
                <div className="bubble">
                  <p>Services: {villagers[index].services}</p>
                </div>
              </CSSTransition>
            </div>
          </div>
        </div>
        <div className="bot-content">
          <div className="nav-button">
            <Fab
              className="down"
              size="medium"
              color="primary"
              // variant="extended"
              onClick={() => {
                setState((state) => !state);
                navDown();
              }}
            >
              <NavigateBeforeIcon />
            </Fab>
          </div>
          <div className="details">
            <div className>{villagers[index].name}</div>
            <hr></hr>
            <div>Birthday: {villagers[index].birthday}</div>
          </div>
          <div className="nav-button">
            <Fab
              className="up"
              size="medium"
              color="primary"
              // variant="extended"
              onClick={() => {
                setState((state) => !state);
                navUp();
              }}
            >
              <NavigateNextIcon />
            </Fab>
          </div>
        </div>

        {/* <div className="vil-gender">Gender: {villagers[index].gender}</div>
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
        <img className="vil-img" src={villagerPhoto} alt="Logo" />
        <div className="vil-name">{villagers[index].name}</div> */}
        {/* <div className="fab-container">
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
        </div> */}
      </div>
    );
  }
}

/* <div>{JSON.stringify(villagers)}</div> */
