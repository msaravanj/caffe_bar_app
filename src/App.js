import WelcomeComponent from "./components/WelcomeComponent";
import classes from "./App.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className={classes.app}>
      <WelcomeComponent />
    </div>
  );
}

export default App;
