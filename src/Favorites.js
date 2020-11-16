import React from "react";
import ModalWindow from "./ModalWindow";
import RemoveAllModal from "./RemoveAllModal";
import { Card, List, Segment } from "semantic-ui-react";

const Favorites = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <h2>Ulubione:</h2>
      <Card.Group style={{ textAlign: "center" }}>
        {props.favs.length > 0 ? (
          props.favs.map((item) => (
            <Card key={item.code}>
              {" "}
              <Card.Content>
                {" "}
                <Card.Header>
                  {item.code} {item.currency}
                </Card.Header>{" "}
                {item.mid}{" "}
              </Card.Content>
             <ModalWindow removeFav={props.removeFav} item={item} />
            </Card>
          ))
        ) : (
          <p>dodaj element</p>
        )}
       {props.favs.length > 0 ? (
         <RemoveAllModal
            removeAllFavs={props.removeAllFavs}
            favs={props.favs}
          />
        
        ) : (
          ""
        )}
      </Card.Group>
    </div>
  );
};

export default Favorites;
