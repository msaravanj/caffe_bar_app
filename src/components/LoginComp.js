import { Link, useNavigate } from "react-router-dom";
import classes from "./LoginComp.module.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userDataActions } from "../store";

const LoginComp = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlGetUserByEmail = "http://localhost:8080/user/?email=" + email;
  const optionsGetUserByEmail = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const checkAuth = async () => {
    const response = await fetch(urlGetUserByEmail, optionsGetUserByEmail);
    const data = await response.json();

    if (password === data.password) {
      try {
        dispatch(
          userDataActions.updateUserData({
            id: data.id,
            role: data.role,
            name: data.name,
            email: data.email,
            lastname: data.lastName,
            password: data.password,
          })
        );
        setIsLoginFailed(false);
        return navigate("/");
      } catch (error) {
        console.log(error);
        return error;
      }
    } else {
      setIsLoginFailed(true);
      console.log("Unsuccessful login!");
      return;
    }
  };

  return (
    <div className={classes.box}>
      <Link className={classes.link1} to="/">
        <i className="fa fa-angle-left"></i> Natrag
      </Link>
      <h2>Prijava</h2>
      <Form>
        <Form.Group className="mb-3" controlId="email1">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lozinka1">
          <Form.Label>Lozinka:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
      </Form>
      {isLoginFailed && (
        <p className={classes.loginFailed}>
          Uneseni email i/ili lozinka su pogrešni. Pokušajte ponovno.
        </p>
      )}

      <Button
        className={classes.loginBtn}
        size="lg"
        variant="success"
        onClick={checkAuth}
      >
        Prijava
      </Button>

      <Link className={classes.link2} to="/">
        Ako nisi djelatnik kafića, klikni na poveznicu kako bi naručio svoje
        piće.
      </Link>
    </div>
  );
};

export default LoginComp;
