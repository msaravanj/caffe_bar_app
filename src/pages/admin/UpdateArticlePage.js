import { useEffect, useState } from "react";
import classes from "./UpdateArticlePage.module.css";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const UpdateArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [availableAmount, setAvailableAmount] = useState(0);

  const [isError, setIsError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const [update, setUpdate] = useState();

  const urlGetArticles = "http://localhost:8080/article/all";
  const optionsGetArticles = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const urlUpdateArticle = "http://localhost:8080/article/update";
  const optionsUpdateArticle = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      description: description,
      price: price,
      availableAmount: availableAmount,
    }),
  };

  const updateArticle = async () => {
    const response = await fetch(urlUpdateArticle, optionsUpdateArticle);
    if (!response.ok) {
      setIsError(true);
      setIsUpdated(false);
    } else {
      const data = await response.json();
      console.log(data);
      setIsUpdated(true);
      setIsError(false);
      setUpdate(data);
    }
  };

  const getAllArticles = async () => {
    const response = await fetch(urlGetArticles, optionsGetArticles);
    if (!response.ok) {
      setArticles([]);
    } else {
      const data = await response.json();
      setArticles(data);
    }
  };

  useEffect(() => {
    getAllArticles();
  }, [update]);

  return (
    <div className={classes.page}>
      <Link className={classes.linkBack} to="/dashboard">
        <i className="fa fa-angle-left"></i> Natrag
      </Link>
      <div className={classes.layout}>
        <Modal
          show={modalShow}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Ažuriraj artikl
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className={classes.form} id="creation_form">
              <Form.Group className="mb-3" controlId="id1">
                <Form.Label>ID: {id}</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="name1">
                <Form.Label>Naziv:</Form.Label>
                <Form.Control
                  type="name"
                  defaultValue={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setIsUpdated(false);
                    setIsError(false);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="price1">
                <Form.Label>Cijena:</Form.Label>
                <Form.Control
                  type="price"
                  defaultValue={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setIsUpdated(false);
                    setIsError(false);
                  }}
                />
                {/[a-z]/i.test(price) && (
                  <p className={classes.invalidMessage}>
                    Cijena ne smije sadržavati slova!
                  </p>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="amount1">
                <Form.Label>Dostupna količina:</Form.Label>
                <Form.Control
                  type="amount"
                  defaultValue={availableAmount}
                  onChange={(e) => {
                    setAvailableAmount(e.target.value);
                    setIsUpdated(false);
                    setIsError(false);
                  }}
                />
                {/[a-z]/i.test(availableAmount) && (
                  <p className={classes.invalidMessage}>
                    Količina ne smije sadržavati slova!
                  </p>
                )}
              </Form.Group>
              <Form.Label>Odaberi vrstu pića:</Form.Label>
              <Form.Select
                aria-label="select description"
                defaultValue={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setIsUpdated(false);
                  setIsError(false);
                }}
              >
                <option value="Pivo">Pivo</option>
                <option value="Topli napitci">Topli napitci</option>
                <option value="Bezalkoholna pića">Bezalkoholna pića</option>
                <option value="Vino">Vino</option>
                <option value="Domaća alk. pića">Domaća alk. pića</option>
                <option value="Strana alk. pića">Strana alk. pića</option>
              </Form.Select>
            </Form>
          </Modal.Body>
          {isUpdated && (
            <Alert key="success" variant="success">
              Uspješno ažuriranje!
            </Alert>
          )}
          {isError && (
            <Alert key="danger" variant="danger">
              Ažuriranje nije uspjelo. Pokušajte ponovno.
            </Alert>
          )}
          <Modal.Footer>
            <Button
              variant="success"
              disabled={
                name.length === 0 ||
                description.length === 0 ||
                price.length === 0 ||
                price === "0" ||
                /[a-z]/i.test(price) ||
                /[a-z]/i.test(availableAmount) ||
                availableAmount.length === 0
              }
              onClick={() => {
                updateArticle();
              }}
            >
              Spremi promjene
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                setModalShow(false);
                setIsUpdated(false);
                setIsError(false);
              }}
            >
              Zatvori
            </Button>
          </Modal.Footer>
        </Modal>
        <h3>Odaberite artikl za ažuriranje</h3>
        {articles.map((article) => {
          return (
            <div
              key={article.id}
              className={classes.articleBox}
              onClick={() => {
                setId(article.id);
                setName(article.name);
                setDescription(article.description);
                setPrice(article.price);
                setAvailableAmount(article.availableAmount);
                setModalShow(true);
              }}
            >
              <p className={classes.articleId}>ID: {article.id}</p>
              <div className={classes.articleInfo}>
                <h4>{article.name}</h4>
                <h4>{article.price.toFixed(2)} €</h4>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpdateArticlePage;
