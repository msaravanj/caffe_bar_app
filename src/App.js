import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/admin/AdminPage";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/admin/RegisterPage";
import DashboardPage from "./pages/admin/DashboardPage";
import CreateNewArticlePage from "./pages/admin/CreateNewArticlePage";
import CreateSpecialOfferPage from "./pages/admin/CreateSpecialOfferPage";

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
          {roleUser === 0 && (
            <Route path="/order" element={<OrderPage />}></Route>
          )}
          {roleUser === 2 && (
            <Route path="/admin" element={<AdminPage />}></Route>
          )}
          {roleUser === 2 && (
            <Route path="/register" element={<RegisterPage />}></Route>
          )}
          {roleUser === 2 && (
            <Route path="/dashboard" element={<DashboardPage />}></Route>
          )}
          {roleUser === 2 && (
            <Route
              path="/addArticle"
              element={<CreateNewArticlePage />}
            ></Route>
          )}
          {roleUser === 2 && (
            <Route
              path="/addSpecialOffer"
              element={<CreateSpecialOfferPage />}
            ></Route>
          )}
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
