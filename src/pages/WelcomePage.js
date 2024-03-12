import { Row, Image, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CoffeeImg from "../assets/CoffeeImg.jpg";
import classes from "./WelcomePage.module.css";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Container className={classes.container}>
      <Row className={classes.row}>
        <div className={classes.hero}>
          <h1>Dobar dan i dobrodošli na našu web stranicu!</h1>
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
            NARUČI PIĆE
          </Button>
          <Button
            style={{
              "font-family": "Arial, Helvetica, sans-serif",
              color: "black",
            }}
            variant="light"
            size="lg"
          >
            <Link className={classes.link} to="/login">
              Prijavi se
            </Link>
          </Button>
        </div>
      </Row>
    </Container>
  );
};

export default WelcomePage;
