import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";

export default function Villager() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [villagers, setVillagers] = useState([]);
  // const [currentVillager, setCurrentVillager] = useState([]);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {villagers[index].name}
        <button
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          Next
        </button>
      </div>
    );
  }
}

/* <div>{JSON.stringify(villagers)}</div> */
