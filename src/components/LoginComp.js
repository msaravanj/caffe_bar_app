import { Link } from "react-router-dom";
import classes from "./LoginComp.module.css";
import { Button, Form } from "react-bootstrap";

const LoginComp = () => {
  return (
    <div className={classes.box}>
      <Link className={classes.link1} to="/">
        <i class="fa fa-angle-left"></i> Natrag
      </Link>
      <h2>Prijava</h2>
      <Form>
        <Form.Group className="mb-3" controlId="email1">
          <Form.Label>E-mail:</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lozinka1">
          <Form.Label>Lozinka:</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
      </Form>

      <Button className={classes.loginBtn} size="lg" variant="success">
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
