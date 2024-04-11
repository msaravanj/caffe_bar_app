import { Button } from "react-bootstrap";
import classes from "./DrinkComp.module.css";
import { useState } from "react";

const DrinkComp = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div className={classes.drink}>
      <h4 className={classes.first}>{props.name}</h4>
      <h4 className={classes.third}>{props.price.toFixed(2)} €</h4>
      <div className={classes.fourth}>
        <Button
          variant="outline-dark"
          className={classes.btn}
          onClick={() => {
            count > 0 && setCount(count - 1);
            count > 0 && props.changeTotalPrice(-props.price);
            count > 1 &&
              props.addOrderedDrink({
                amount: count - 1,
                articleId: props.id,
                pricePerUnit: props.price,
                name: props.name,
              });
            count === 1 &&
              props.removeOrderedDrink({
                amount: count - 1,
                articleId: props.id,
                pricePerUnit: props.price,
                name: props.name,
              });
            props.resetMessages();
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </Button>
        <div className={classes.number}>
          <h4>{count}</h4>
        </div>
        <Button
          variant="outline-dark"
          className={classes.btn}
          onClick={() => {
            count < 10 && setCount(count + 1);
            count < 10 && props.changeTotalPrice(props.price);
            count < 10 &&
              props.addOrderedDrink({
                amount: count + 1,
                articleId: props.id,
                pricePerUnit: props.price,
                name: props.name,
              });
            props.resetMessages();
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
    </div>
  );
};

export default DrinkComp;
