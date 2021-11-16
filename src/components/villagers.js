import React, { useEffect, useState } from "react";

export default function Villager() {
  const [villagers, setVillagers] = useState([]);
  const [currentVillager, setCurrentVillager] = useState([]);
  const [index, setIndex] = useState(0);

  //retrieve the data
  useEffect(() => {
    fetch("data/villagers.json")
      .then((response) => response.json())
      .then((data) => {
        //save the data
        setVillagers(data.Villagers);
        // console.log(villagers[index].name);
      });
  }, []);

  let bio = villagers.map((villager) => {
    //so basically no
  });

  // let villagerList = villagers.map((villager) => {
  //   let servicesList = villager.services.map((services, ind) => (
  //     <div key={ind}>{services}</div>
  //   ));

  //   return (
  //     <li key={villager.id}>
  //       <div className="title">{villager.name}</div>
  //       <div className="body">Gender: {villager.gender}</div>
  //       <div className="body">Species: {villager.species}</div>
  //       <div className="body">Birthday: {villager.birthday}</div>
  //       <div className="body">Astrology: {villager.astrology}</div>
  //       <div className="body">Services: {servicesList}</div>
  //     </li>
  //   );
  // });

  return (
    <div className="App">
      <div>{bio}</div>
    </div>
  );
}

/* <div>{JSON.stringify(villagers)}</div> */
