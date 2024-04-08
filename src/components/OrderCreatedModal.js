import { Modal, Button } from "react-bootstrap";

const OrderCreatedModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Narudžba uspješna
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Vaša narudžba je uspješno poslana. Uskoro ćete biti posluženi.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Zatvori</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderCreatedModal;
