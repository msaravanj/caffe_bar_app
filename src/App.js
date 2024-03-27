import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/admin/AdminPage";
import { useSelector } from "react-redux";

function App() {
  const roleUser = useSelector((state) => state.role);

  return (
    <div className={classes.app}>
      <main>
        <Routes>
          <Route path="/" exact element={<WelcomePage />}></Route>
          {roleUser === 0 && (
            <Route path="/login" element={<LoginPage />}></Route>
          )}
          <Route path="/order" element={<OrderPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
