import { Link } from "react-router-dom";
import classes from "./DashboardPage.module.css";

const DashboardPage = () => {
  return (
    <div className={classes.page}>
      <Link className={classes.linkBack} to="/">
        <i className="fa fa-angle-left"></i> Početna stranica
      </Link>
      <div className={classes.layout}>
        <h2 className={classes.heading}>Administratorske opcije:</h2>
        <Link className={classes.option} to="/register">
          Unos novog djelatnika
        </Link>
        <Link className={classes.option}>Upravljanje narudžbama</Link>
        <Link className={classes.option} to="/addArticle">
          Unos novog artikla
        </Link>
        <Link className={classes.option}>Upravljanje posebnim ponudama</Link>
        <Link className={classes.option}>Pregled statistike</Link>
      </div>
    </div>
  );
};

export default DashboardPage;
