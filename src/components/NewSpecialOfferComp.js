import classes from "./NewSpecialOfferComp.module.css";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const NewSpecialOfferComp = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isError, setIsError] = useState(false);

  const urlCreateOffer = "http://localhost:8080/specialOffer/create";
  const optionsCreateOffer = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      validFrom: fromDate,
      validTo: toDate,
    }),
  };

  const sendEmail = () => {};

  const createSpecialOffer = async () => {
    const response = await fetch(urlCreateOffer, optionsCreateOffer);
    if (!response.ok) {
      setIsError(true);
    } else {
      setIsError(false);
      const data = await response.json();
      console.log(data);
      document.getElementById("creation_form").reset();
      setName("");
      setDescription("");
      setPrice(0);
      setFromDate(new Date());
      setToDate(new Date());
    }
  };

  return (
    <div className={classes.box}>
      <Link className={classes.link1} to="/dashboard">
        <i className="fa fa-angle-left"></i> Natrag
      </Link>
      <h2 className={classes.heading2}>Unos posebne ponude</h2>
      <Form className={classes.form} id="creation_form">
        <Form.Group className="mb-3" controlId="name1">
          <Form.Label>Naziv:</Form.Label>
          <Form.Control
            type="name"
            onChange={(e) => {
              setName(e.target.value);
              setIsError(false);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description1">
          <Form.Label>Opis ponude:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="description"
            onChange={(e) => {
              setDescription(e.target.value);
              setIsError(false);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="price1">
          <Form.Label>Cijena:</Form.Label>
          <Form.Control
            type="price"
            onChange={(e) => {
              setPrice(e.target.value);
              setIsError(false);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="fromDate1">
          <Form.Label>Ponuda traje od:</Form.Label>
          <DatePicker
            className={classes.datePicker}
            selected={fromDate}
            minDate={new Date()}
            onChange={(date) => {
              setFromDate(date);
              setIsError(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="toDate1">
          <Form.Label>Ponuda traje do:</Form.Label>
          <DatePicker
            className={classes.datePicker}
            selected={toDate}
            minDate={new Date()}
            onChange={(date) => {
              setToDate(date);
              setIsError(false);
            }}
          />
        </Form.Group>
      </Form>
      {isError && <p className={classes.createError}>Neuspješno kreiranje!</p>}
      <Button
        className={classes.createBtn}
        size="lg"
        variant="success"
        disabled={
          name === "" ||
          description === "" ||
          price === 0 ||
          fromDate.getTime() > toDate.getTime()
        }
        onClick={() => {
          createSpecialOffer();
        }}
      >
        Dovrši
      </Button>
    </div>
  );
};

export default NewSpecialOfferComp;
