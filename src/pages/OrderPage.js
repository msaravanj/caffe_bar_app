import { Button } from "react-bootstrap";
import DrinkComp from "../components/DrinkComp";
import classes from "./OrderPage.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedDrinks, setOrderedDrinks] = useState([]);

  const changeTotalPrice = (parameter) => {
    setTotalPrice(totalPrice + parameter);
  };

  return (
    <div className={classes.layout}>
      <DrinkComp
        name="Coca Cola"
        dose="0,25l"
        price={2.3}
        changeTotalPrice={changeTotalPrice}
      />
      <DrinkComp
        name="Fanta"
        dose="0,25l"
        price={2.5}
        changeTotalPrice={changeTotalPrice}
      />
      <DrinkComp
        name="Kava s mlijekom velika"
        price={3.0}
        changeTotalPrice={changeTotalPrice}
      />
      <div className={classes.orderStatus}>
        {orderedDrinks.forEach((drink) => {
          return <p>{drink}</p>;
        })}
        <p>TOTAL PRICE: {totalPrice.toFixed(2)} €</p>
      </div>
      <Button className={classes.btn} variant="success" size="lg">
        NARUČI
      </Button>
    </div>
  );
};

export default OrderPage;
