import { Button, Modal } from "react-bootstrap";
import DrinkComp from "../components/DrinkComp";
import classes from "./OrderPage.module.css";
import { useEffect, useState } from "react";
import OrderCreatedModal from "../components/OrderCreatedModal";

const OrderPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedDrinks, setOrderedDrinks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getAllArticles();
  }, []);

  const urlGetArticles = "http://localhost:8080/article/all";
  const optionsGetArticles = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getAllArticles = async () => {
    const response = await fetch(urlGetArticles, optionsGetArticles);
    const data = await response.json();
    setArticles(data);
  };

  const resetMessages = () => {
    setIsError(false);
    setIsOrderCreated(false);
  };

  const changeTotalPrice = (parameter) => {
    setTotalPrice(totalPrice + parameter);
  };

  const addOrderedDrink = (drink) => {
    getTimeNow();
    orderedDrinks.forEach((d) => {
      if (drink.name === d.name) {
        const index = orderedDrinks.indexOf(d);
        orderedDrinks.splice(index, 1);
      }
    });
    if (orderedDrinks.length === 0) {
      setOrderedDrinks([drink]);
    } else {
      setOrderedDrinks([...orderedDrinks, drink]);
    }
  };

  const removeOrderedDrink = (drink) => {
    orderedDrinks.forEach((d) => {
      if (drink.name === d.name) {
        const index = orderedDrinks.indexOf(d);
        orderedDrinks.splice(index, 1);
        setOrderedDrinks(orderedDrinks);
      }
    });
  };

  const getTimeNow = () => {
    const date = new Date(Date.now() + 7200000);
    const timeNow = date.toISOString();
    const time1 = timeNow.replace("T", " ");
    const time = time1.split(".");
    return time[0];
  };

  const urlCreateOrder = "http://localhost:8080/order/create";
  const optionsCreateOrder = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      issueTimeOfOrder: getTimeNow(),
      orderStatus: 0,
      tableNumber: Math.floor(Math.random() * 20) + 1,
    }),
  };

  const optionsCreateOrderArticle = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderedDrinks),
  };

  const createOrder = async () => {
    const response = await fetch(urlCreateOrder, optionsCreateOrder);
    const data = await response.json();
    return data.id;
  };

  return (
    <div className={classes.layout}>
      <h2 className={classes.heading2}>Pivo</h2>
      {articles.map((article) => {
        if (article.description === "Pivo") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <h2 className={classes.heading2}>Topli napitci</h2>
      {articles.map((article) => {
        if (article.description === "Topli napitci") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <h2 className={classes.heading2}>Bezalkoholna pića</h2>
      {articles.map((article) => {
        if (article.description === "Bezalkoholna pića") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <h2 className={classes.heading2}>Vino</h2>
      {articles.map((article) => {
        if (article.description === "Vino") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <h2 className={classes.heading2}>Domaća alkoholna pića</h2>
      {articles.map((article) => {
        if (article.description === "Domaća alk. pića") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <h2 className={classes.heading2}>Strana alkoholna pića</h2>
      {articles.map((article) => {
        if (article.description === "Strana alk. pića") {
          return (
            <DrinkComp
              key={article.id}
              id={article.id}
              name={article.name}
              price={article.price}
              changeTotalPrice={changeTotalPrice}
              addOrderedDrink={addOrderedDrink}
              removeOrderedDrink={removeOrderedDrink}
              resetMessages={resetMessages}
            />
          );
        }
      })}
      <div className={classes.orderStatus}>
        {orderedDrinks.map((drink) => {
          return (
            <p className={classes.orderedItem} key={drink.name + drink.counter}>
              {drink.amount} x {drink.name}
            </p>
          );
        })}
        <p className={classes.totalPrice}>
          Ukupna cijena: {totalPrice.toFixed(2)} €
        </p>
      </div>
      {isOrderCreated && (
        <p className={classes.successText}>Narudžba je uspješno poslana!</p>
      )}
      {isError && (
        <p className={classes.errorText}>
          Narudžba nije uspjela! Pokušajte ponovno.
        </p>
      )}
      <OrderCreatedModal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          window.location.reload();
        }}
      />
      <Button
        className={classes.btn}
        variant="success"
        size="lg"
        disabled={orderedDrinks.length === 0}
        onClick={async () => {
          const id = await createOrder();
          console.log("order id: " + id);
          const response = await fetch(
            "http://localhost:8080/orderArticle/saveArticles/" + id + "/",
            optionsCreateOrderArticle
          );
          if (response.ok) {
            setIsOrderCreated(true);
            setIsError(false);
            setModalShow(true);
          } else {
            setIsOrderCreated(false);
            setIsError(true);
          }
        }}
      >
        NARUČI
      </Button>
    </div>
  );
};

export default OrderPage;
