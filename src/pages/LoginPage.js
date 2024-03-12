import LoginComp from "../components/LoginComp";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={classes.layout}>
      <LoginComp />
    </div>
  );
};

export default LoginPage;
