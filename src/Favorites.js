import React from "react";
import ModalWindow from "./ModalWindow";
import RemoveAllModal from "./RemoveAllModal";

const Favorites = (props) => {
  return (
    <>
      <h2>Ulubione:</h2>

      {props.favs.length > 0
        ? props.favs.map((item) => (
            <li key={item.code}>
              {" "}
              {item.currency} {item.code} {item.mid}{" "}
              <ModalWindow removeFav={props.removeFav} item={item} />
            </li>
          ))
        : "nie ma ulubionych"}
      {props.favs.length > 0 ? (
        <RemoveAllModal removeAllFavs={props.removeAllFavs} favs={props.favs} />
      ) : (
        ""
      )}
    </>
  );
};

export default Favorites;
