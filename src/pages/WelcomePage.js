import { Row, Image, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CoffeeImg from "../assets/CoffeeImg.jpg";
import classes from "./WelcomePage.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userDataActions } from "../store";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const roleUser = useSelector((state) => state.role);
  const role = 0;

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
          <Button className={classes.btnOrder} variant="warning" size="lg">
            <Link className={classes.link1} to="/order">
              NARUČI PIĆE
            </Link>
          </Button>
          {roleUser === 0 ? (
            <Button className={classes.btnLogin} variant="light" size="lg">
              <Link className={classes.link} to="/login">
                Prijavi se
              </Link>
            </Button>
          ) : (
            <Button
              className={classes.btnLogin}
              variant="light"
              size="lg"
              onClick={() => {
                dispatch(
                  userDataActions.updateUserData({
                    id: null,
                    role: 0,
                    name: null,
                    email: null,
                    lastname: null,
                    password: null,
                  })
                );
              }}
            >
              Odjavi se
            </Button>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default WelcomePage;
