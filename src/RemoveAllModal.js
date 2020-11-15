import React, { useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const RemoveAllModal = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button> usuń wszystkie </Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <Header> {"Na pewno chcesz usunąć listę ulubionych? "}</Header>{" "}
        </Modal.Description>{" "}
      </Modal.Content>{" "}
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nie{" "}
        </Button>{" "}
        <Button
          content="Tak"
          labelPosition="right"
          icon="checkmark"
          onClick={() => {
            props.removeAllFavs(props.item);
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>{" "}
    </Modal>
  );
};

export default RemoveAllModal;
