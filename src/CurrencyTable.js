import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

const CurrencyTable = () => {
  const [items, setItems] = useState([]);
  const [favItems, setFavItems] = useState([]);
  const [error, setError] = useState(null);
  const [newCurrency, setNewCurrency] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newMid, setNewMid] = useState("");
  const [newCountry, setNewCountry] = useState("");

  useEffect(
    () => {
      axios
        .get("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
        .then((result) => setItems(result.data[0].rates));
    },
    (error) => {
      setError(error);
    }, []
  );

  const addItem = () => {
    const filteredCodes = items.map((item) => item.code);
    if (filteredCodes.includes(newCode.toUpperCase())) {
      alert("Ta walua już istnieje")}
   
    
      else
      setFavItems([
        ...favItems,
        {
          currency: newCurrency,
          code: newCode,
          mid: newMid,
          country: newCountry,
        },
      ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidInput()) return;
    addItem();
    clearInputs();
  };

  const clearInputs = () => {
    setNewCurrency("");
    setNewCode("");
    setNewMid("");
    setNewCountry("");
  };

  const ValidInput = () => {
    return (
      newCurrency.trim() === "" || newCode.trim() === "" || newMid.trim() === ""
    );
  };

  const removeItem = (code) => {
    setFavItems(favItems.filter((item) => item.code !== code));
  };

  const addToFav = (code) => {
    console.log(favItems)
    const favItem = items.filter(item => item.code === code)
    setFavItems(favItem)
   

  }


  if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <div>
        <Form
          handleSubmit={handleSubmit}
          newCurrency={newCurrency}
          setNewCurrency={setNewCurrency}
          newCode={newCode}
          setNewCode={setNewCode}
          newMid={newMid}
          setNewMid={setNewMid}
          newCountry={newCountry}
          setNewCountry={setNewCountry}
        />
        <h2>Ulubione:</h2>
        <div>
          {favItems.length >= 1 ? (
            <ul>
              {favItems.map((item) => (
                <li key={item.code}>
                  {item.currency} {item.country ? `(${item.country})` : ""}{" "}
                  {item.code} {item.mid}{" "}
                  <button onClick={() => removeItem(item.code)}>x</button>
                </li>
              ))}
            </ul>
          ) : (
            "nie masz ulubionych"
          )}
        </div>
        <h2>Lista walut:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.code}>
              {item.currency} {item.country ? `(${item.country})` : ""}{" "}
              {item.code} {item.mid} 
              <button onClick={() => addToFav(item.code)}>fav</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default CurrencyTable;
