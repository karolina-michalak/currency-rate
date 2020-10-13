import React, { useState, useEffect } from "react";

function CurrencyTable() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result[0].rates);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>{error.message}</div>;
  } else {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.currency}>
            {item.currency} {item.code} {item.mid}
          </li>
        ))}
      </ul>
    );
  }
}

export default CurrencyTable;
