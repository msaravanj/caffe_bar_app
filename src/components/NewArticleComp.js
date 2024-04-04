import { useState } from "react";
import classes from "./NewArticleComp.module.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewArticleComp = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);

  const [isCreateFailed, setIsCreateFailed] = useState(false);
  const [showCreateSuccess, setShowCreateSuccess] = useState(false);

  const urlCreateArticle = "http://localhost:8080/article/create";
  const optionsCreateArticle = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      description: description,
      price: price,
      availableAmount: amount,
    }),
  };

  const addNewArticle = async () => {
    const response = await fetch(urlCreateArticle, optionsCreateArticle);
    if (response.status === 500) {
      setIsCreateFailed(true);
    } else if (response.ok) {
      setIsCreateFailed(false);
      setShowCreateSuccess(true);
      document.getElementById("creation_form").reset();
      setName("");
      setAmount(0);
      setDescription("");
      setPrice(0);
    }
  };

  return (
    <div className={classes.box}>
      <Link className={classes.link1} to="/dashboard">
        <i className="fa fa-angle-left"></i> Natrag
      </Link>
      <h2 className={classes.heading2}>Unos novog artikla</h2>
      <Form className={classes.form} id="creation_form">
        <Form.Group className="mb-3" controlId="name1">
          <Form.Label>Naziv:</Form.Label>
          <Form.Control
            type="name"
            onChange={(e) => {
              setName(e.target.value);
              setIsCreateFailed(false);
              setShowCreateSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price1">
          <Form.Label>Cijena:</Form.Label>
          <Form.Control
            type="price"
            onChange={(e) => {
              setPrice(e.target.value);
              setIsCreateFailed(false);
              setShowCreateSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="amount1">
          <Form.Label>Dostupna količina:</Form.Label>
          <Form.Control
            type="amount"
            onChange={(e) => {
              setAmount(e.target.value);
              setIsCreateFailed(false);
              setShowCreateSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Select
          aria-label="select description"
          onChange={(e) => {
            setDescription(e.target.value);
            setIsCreateFailed(false);
            setShowCreateSuccess(false);
          }}
        >
          <option value="">Odaberi vrstu pića:</option>
          <option value="Pivo">Pivo</option>
          <option value="Topli napitci">Topli napitci</option>
          <option value="Bezalkoholna pića">Bezalkoholna pića</option>
          <option value="Vino">Vino</option>
          <option value="Domaća alk. pića">Domaća alk. pića</option>
          <option value="Strana alk. pića">Strana alk. pića</option>
        </Form.Select>
      </Form>
      {isCreateFailed && (
        <p className={classes.createError}>Neuspješan unos novog artikla!</p>
      )}
      <Button
        className={classes.createBtn}
        size="lg"
        variant="success"
        disabled={
          name === "" || description === "" || price === 0 || amount === 0
        }
        onClick={addNewArticle}
      >
        Dovrši
      </Button>
      {showCreateSuccess && (
        <p className={classes.createSuccess}>Artikl je uspješno dodan!</p>
      )}
    </div>
  );
};

export default NewArticleComp;
