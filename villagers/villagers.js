import React, { useEffect, useState } from "react";

export default function Villagers() {
  const [villagers, setVillagers] = useState([]);

  //retrieve the data
  useEffect(() => {
    fetch("data/villagers.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //save the data
        setVillagers(data.Villagers);
      });
  }, []);

  let villagerList = villagers.map((villager) => {
    let servicesList = villager.services.map((services, ind) => (
      <div key={ind}>{services}</div>
    ));

    return (
      <li key={villager.id}>
        <div className="title">{villager.name}</div>
        <div className="body">Gender: {villager.gender}</div>
        <div className="body">Species: {villager.species}</div>
        <div className="body">Birthday: {villager.birthday}</div>
        <div className="body">Astrology: {villager.astrology}</div>
        <div className="body">Services: {servicesList}</div>
      </li>
    );
  });

  return (
    <div className="App">
      <ul>{villagerList}</ul>
    </div>
  );
}

/* <div>{JSON.stringify(villagers)}</div> */