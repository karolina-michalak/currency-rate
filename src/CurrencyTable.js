import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './style/CurrencyTable.css' 
import Favorites from "./Favorites";

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
      <ul>
        {currencies.map((item) => (
          <li key={item.code}>
           {item.code} {item.currency}  {item.mid}{" "}
            <i
              onClick={() => {
                addToFav(item);
              }}
              class={favs.includes(item) ? "heart icon" : "heart outline icon"}
              
            ></i>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default CurrencyTable;
