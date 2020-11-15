import React, { useState } from "react";
import { Button, Header, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Modall = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button> x </Button>}
    >
      <Modal.Content>
        <Modal.Description>
          <Header> Na pewno chcesz usunąć element z listy ? </Header>{" "}
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
            props.removeItem();
            setOpen(false);
          }}
          positive
        />
      </Modal.Actions>{" "}
    </Modal>
  );
};

export default Modall;
