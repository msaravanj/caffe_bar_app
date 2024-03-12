import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className={classes.app}>
      <main>
        <Routes>
          <Route path="/" exact element={<WelcomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
