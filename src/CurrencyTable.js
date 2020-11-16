import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./style/CurrencyTable.css";
import Favorites from "./Favorites";
import { List, Segment } from "semantic-ui-react";

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
      alert('element znajduje się na liście')
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
      <div className="container">
        <h2>Lista walut:</h2>
        <Segment
          inverted
          style={{
            width: "40vw",
            margin: "0 auto",
            height: "60vh",
            overflow: "auto",
          }}
        >
          <List divided inverted relaxed>
            {currencies.map((item) => (
              <List.Item key={item.code}>
                <List.Content>
                  <List.Header>
                    {item.code} {item.currency}
                  </List.Header>{" "}
                  {item.mid}
                  <i
                    style={{ color: "yellow" }}
                    onClick={() => {
                      addToFav(item);
                    }}
                    class={
                      favs.includes(item) ? "star icon" : "star outline icon"
                    }
                  ></i>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Segment>
      </div>
    </>
  );
};

export default CurrencyTable;
