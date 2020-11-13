import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";

const CurrencyTable = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [newCurrency, setNewCurrency] = useState("");
  const [newCode, setNewCode] = useState("");
  const [newMid, setNewMid] = useState("");

  useEffect(
    () => {
      axios
        .get("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
        .then((result) => setItems(result.data[0].rates));
    },
    (error) => {
      setError(error);
    },
    []
  );

  const addItem = () => {
    setItems([...items, { currency: newCurrency, code: newCode, mid: newMid }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ValidInput()) return;
    addItem()
    clearInputs()
  };

  const clearInputs = () => {
    setNewCurrency('')
    setNewCode('')
    setNewMid('')
  }

  const ValidInput = () => {
    return newCurrency.trim() === '' || newCode.trim() === '' || newMid.trim() === ''
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
        />

        <ul>
          {items.map((item) => (
            <li key={item.code}>
              {item.currency} {item.code} {item.mid}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default CurrencyTable;
