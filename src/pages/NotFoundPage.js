import { Link } from "react-router-dom";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={classes.layout}>
      <h2>Stranica nije pronađena</h2>
      <Link className={classes.link} to="/">
        Idi na početnu stranicu
      </Link>
    </div>
  );
};

export default NotFoundPage;
