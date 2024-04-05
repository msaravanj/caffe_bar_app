import { Row, Image, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CoffeeImg from "../assets/CoffeeImg.jpg";
import classes from "./WelcomePage.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userDataActions } from "../store";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const roleUser = useSelector((state) => state.role);
  const [emailSubscribe, setEmailSubscribe] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isSubscriptionSuccess, setIsSubscriptionSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const urlAddSubscriber = "http://localhost:8080/mailinList/save";
  const optionsAddSubscriber = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailSubscribe,
    }),
  };

  const urlGetAllSubcribers = "http://localhost:8080/mailinList/all";
  const optionsGetAllSubscribers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getAllSubscribersAndCheck = async () => {
    const response = await fetch(urlGetAllSubcribers, optionsGetAllSubscribers);
    const data = await response.json();
    let count = 0;
    let flag = false;
    await data.forEach((subscriber) => {
      if (subscriber.email === emailSubscribe) {
        count++;
      }
    });

    if (count === 0) {
      flag = true;
      setEmailExists(false);
    } else {
      flag = false;
      setEmailExists(true);
    }

    return flag;
  };

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailSubscribe)) {
      setIsEmailInvalid(false);
      return true;
    } else {
      setIsEmailInvalid(true);
      return false;
    }
  };

  const subcribeUser = async () => {
    if (validateEmail() === true) {
      if ((await getAllSubscribersAndCheck()) === true) {
        const response = await fetch(urlAddSubscriber, optionsAddSubscriber);
        if (response.ok) {
          setIsSubscriptionSuccess(true);
        } else {
          setIsSubscriptionSuccess(false);
        }
      } else {
        setIsSubscriptionSuccess(false);
      }
    }
  };

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
          {roleUser === 0 && (
            <Button className={classes.btnOrder} variant="warning" size="lg">
              <Link className={classes.link1} to="/order">
                NARUČI PIĆE
              </Link>
            </Button>
          )}
          {roleUser === 2 && (
            <Button className={classes.btnOrder} variant="warning" size="lg">
              <Link className={classes.link1} to="/dashboard">
                NADZORNA PLOČA
              </Link>
            </Button>
          )}
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
      {roleUser === 0 && (
        <div className={classes.newsletterBox}>
          <p>Preplati se na naš newsletter:</p>
          <div className={classes.newsletter}>
            <Form>
              <Form.Control
                type="email"
                placeholder="Unesi email"
                onChange={(e) => {
                  setEmailSubscribe(e.target.value);
                  setIsEmailInvalid(false);
                  setIsSubscriptionSuccess(false);
                  setEmailExists(false);
                }}
              />
            </Form>
            <Button
              onClick={() => {
                subcribeUser();
              }}
            >
              Pretplati se
            </Button>
          </div>
          {isEmailInvalid && (
            <p className={classes.invalidEmail}>
              Unesena email adresa je neispravna!
            </p>
          )}
          {emailExists === true && (
            <p className={classes.invalidEmail}>
              Email adresa se već nalazi na listi pretplaćenih.
            </p>
          )}
          {isSubscriptionSuccess && (
            <p className={classes.successSubcription}>
              Uspješno ste se pretplatili!
            </p>
          )}
        </div>
      )}
    </Container>
  );
};

export default WelcomePage;
