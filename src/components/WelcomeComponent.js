import { Row, Image, Col, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CoffeeImg from "../assets/CoffeeImg.jpg";
import classes from "./WelcomeComponent.module.css";

const WelcomeComponent = () => {
  return (
    <Container className={classes.container}>
      <Row className={classes.row}>
        <div className={classes.hero}>
          <h1>Hello & Welcome to our website!</h1>
          <Image className={classes.img} src={CoffeeImg} rounded />
        </div>
      </Row>
      <Row className={classes.row}>
        <div className={classes.btns}>
          <Button
            style={{
              "font-family": "Arial, Helvetica, sans-serif",
              "font-weight": "bold",
              color: "white",
            }}
            variant="warning"
            size="lg"
          >
            ORDER A DRINK
          </Button>
          <Button
            style={{
              "font-family": "Arial, Helvetica, sans-serif",
              color: "black",
            }}
            variant="light"
            size="lg"
          >
            Sign in
          </Button>
        </div>
      </Row>
    </Container>
  );
};

export default WelcomeComponent;
