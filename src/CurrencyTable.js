import React, { useEffect, useState, useRef} from "react";
import axios from "axios";
import Form from "./Form";
import Modall from './Modal'
import { render } from "@testing-library/react";

const CurrencyTable = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [favs, setFavs] = useState([])


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

  const addToFav = (item) => {
    console.log('added to favs')
    setItems(items.filter(el => el !== item))
    setFavs([...favs, item])
   
    
  }

  const removeItem = () => {
    
  }

  return(
    <div>
      <h2>Ulubione:</h2>
      {favs.length > 0 ? favs.map(item => (
       <li key={item.code}> {item.currency} {item.code} {item.mid}  <button onClick={() => {removeItem()}}>x</button> </li>
      )) : "nie ma ulubionych"}
      <h2>Lista walut:</h2>
      <ul>
      {items.map(item => (
        <li key={item.code}>{item.currency} {item.code} {item.mid} <button onClick={() => {addToFav(item)}}>fav</button></li>
      ))}
      </ul>
    </div>
  )

};

export default CurrencyTable;