import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './style/CurrencyTable.css' 
import Favorites from "./Favorites";
import { Card } from 'semantic-ui-react'


const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [favs, setFavs] = useState([]);

  useEffect(
    () => {
      axios
        .get("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
        .then((result) => setCurrencies(result.data[0].rates));
    },
    (error) => {
      setError(error);
    },
    []
  );

  const addToFav = (item) => {
    if (favs.includes(item)) {
      alert("Waluta już jest na liście ulubionych");
    } else {
      setFavs([...favs, currencies.find((el) => el === item)]);
    }
  };

  const removeFav = (item) => {
    setFavs(favs.filter((el) => el !== item));
  };

  const removeAllFavs = () => {
    setFavs([]);
  };

  return (
    <>
      <Favorites
        favs={favs}
        removeFav={removeFav}
        removeAllFavs={removeAllFavs}
      />
      <div className='container'>
      <h2>Lista walut:</h2>
      <Card.Group>
        {currencies.map((item) => (
          <Card key={item.code}>
            <Card.Content>
           <Card.Header>{item.code}</Card.Header> <Card.Description>{item.currency}</Card.Description>  <Card.Header>{item.mid}</Card.Header>{" "}
            <i
              onClick={() => {
                addToFav(item);
              }}
              class={favs.includes(item) ? "heart icon" : "heart outline icon"}
              
            ></i>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
      </div>
    </>
  );
};

export default CurrencyTable;
