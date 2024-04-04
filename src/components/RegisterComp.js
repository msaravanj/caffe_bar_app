import { useState } from "react";
import classes from "./RegisterComp.module.css";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const RegisterComp = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterFailed, setIsRegisterFailed] = useState(false);
  const [isPasswordOK, setIsPasswordOK] = useState(true);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);

  const urlCreateUser = "http://localhost:8080/user/create";
  const optionsCreateUser = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      lastName: lastname,
      email: email,
      password: password,
      role: role,
    }),
  };

  const checkPassword = () => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  };

  const addNewUser = async () => {
    if (checkPassword() === true) {
      setIsPasswordOK(true);
      const response = await fetch(urlCreateUser, optionsCreateUser);
      if (response.status === 500) {
        setIsRegisterFailed(true);
      } else if (response.ok) {
        setIsRegisterFailed(false);
        setShowRegisterSuccess(true);
        document.getElementById("registration").reset();
        setEmail("");
        setName("");
        setLastname("");
        setRole("");
        setPassword("");
      }
    } else {
      setIsPasswordOK(false);
      setIsRegisterFailed(false);
      return;
    }
  };

  return (
    <div className={classes.box}>
      <Link className={classes.link1} to="/dashboard">
        <i className="fa fa-angle-left"></i> Natrag
      </Link>
      <h2 className={classes.heading2}>Registracija djelatnika</h2>
      <Form className={classes.form} id="registration">
        <Form.Group className="mb-3" controlId="name1">
          <Form.Label>Ime:</Form.Label>
          <Form.Control
            type="name"
            onChange={(e) => {
              setName(e.target.value);
              setIsRegisterFailed(false);
              setShowRegisterSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastname1">
          <Form.Label>Prezime:</Form.Label>
          <Form.Control
            type="lastname"
            onChange={(e) => {
              setLastname(e.target.value);
              setIsRegisterFailed(false);
              setShowRegisterSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email1">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setIsRegisterFailed(false);
              setShowRegisterSuccess(false);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password1">
          <Form.Label>Lozinka:</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setIsRegisterFailed(false);
              setShowRegisterSuccess(false);
              setIsPasswordOK(true);
            }}
          />
          {!isPasswordOK && (
            <p className={classes.passwordBad}>
              Lozinka mora sadržavati barem 8 znamenki, simbol, veliko i malo
              slovo te brojku.
            </p>
          )}
        </Form.Group>
        <Form.Select
          aria-label="select role"
          onChange={(e) => {
            setRole(e.target.value);
            setIsRegisterFailed(false);
            setShowRegisterSuccess(false);
          }}
        >
          <option value="">Odaberi ulogu:</option>
          <option value={1}>Konobar</option>
          <option value={2}>Admin</option>
        </Form.Select>
      </Form>
      {isRegisterFailed && (
        <p className={classes.registerError}>
          Djelatnik s tom email adresom već postoji!
        </p>
      )}
      <Button
        className={classes.registerBtn}
        size="lg"
        variant="success"
        disabled={
          name === "" ||
          lastname === "" ||
          email === "" ||
          password === "" ||
          role === ""
        }
        onClick={addNewUser}
      >
        Dovrši
      </Button>
      {showRegisterSuccess && (
        <p className={classes.registerSuccess}>
          Djelatnik uspješno dodan u sustav!
        </p>
      )}
    </div>
  );
};

export default RegisterComp;
