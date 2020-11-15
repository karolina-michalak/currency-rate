import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Form from "./Form";
import Modall from "./Modal";
import { render } from "@testing-library/react";

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
      alert("element juz istnieje");
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
    <div>
      <h2>Ulubione:</h2>

      {favs.length > 0
        ? favs.map((item) => (
            <li key={item.code}>
              {" "}
              {item.currency} {item.code} {item.mid}{" "}
              <button
                onClick={() => {
                  removeFav(item);
                }}
              >
                x
              </button>{" "}
            </li>
          ))
        : "nie ma ulubionych"}
      {favs.length > 0 ? (
        <button onClick={() => removeAllFavs()}>remove all</button>
      ) : (
        ""
      )}
      <h2>Lista walut:</h2>
      <ul>
        {currencies.map((item) => (
          <li key={item.code}>
            {item.currency} {item.code} {item.mid}{" "}
            <button
              onClick={() => {
                addToFav(item);
              }}
            >
              fav
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyTable;
