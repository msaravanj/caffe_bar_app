import classes from "./OrderManagementPage.module.css";
import { Link } from "react-router-dom";
import { Tabs, Tab, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderManagementPage = () => {
  const roleUser = useSelector((state) => state.role);
  const [orders, setOrders] = useState([]);
  const [orderArticles, setOrderArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [update, setUpdate] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const urlUpdateStatus = "http://localhost:8080/order/update/";
  const optionsUpdateStatus = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  };

  const urlGetArticles = "http://localhost:8080/article/all";
  const urlGetOrders = "http://localhost:8080/order/all";
  const urlGetOrderArticles = "http://localhost:8080/orderArticle/all";
  const optionsGet = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getAllOrders = async () => {
    const response = await fetch(urlGetOrders, optionsGet);
    if (!response.ok) {
      setOrders([]);
    } else {
      const data = await response.json();
      data.sort((a, b) => {
        return a.id - b.id;
      });
      setOrders(data);
    }
  };

  const getAllArticles = async () => {
    const response = await fetch(urlGetArticles, optionsGet);
    if (!response.ok) {
      setArticles([]);
    } else {
      const data = await response.json();
      setArticles(data);
    }
  };

  const getAllOrderArticles = async () => {
    const response = await fetch(urlGetOrderArticles, optionsGet);
    if (!response.ok) {
      setOrderArticles([]);
    } else {
      const data = await response.json();
      setOrderArticles(data);
    }
  };

  const getArticle = (orderArticleId) => {
    let art;
    articles.map((article) => {
      if (article.id === orderArticleId) {
        art = article;
      }
    });
    return art;
  };

  useEffect(() => {
    getAllOrders();
    getAllOrderArticles();
    getAllArticles();
  }, [update]);

  return (
    <div className={classes.page}>
      {roleUser === 2 && (
        <Link className={classes.linkBack} to="/dashboard">
          <i className="fa fa-angle-left"></i> Natrag
        </Link>
      )}
      {roleUser === 1 && (
        <Link className={classes.linkBack} to="/">
          <i className="fa fa-angle-left"></i> Natrag
        </Link>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Neuspjela promjena statusa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Promjena statusa za ovu narudžbu nije uspjela. Pokušajte ponovno.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            U redu
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={classes.layout}>
        <Tabs
          className={classes.tabs1}
          defaultActiveKey="inProgress"
          id="orders-tab"
          fill
        >
          <Tab
            eventKey="inProgress"
            title="Aktivne narudžbe"
            className={classes.tabs}
          >
            {orders.map((order) => {
              if (order.orderStatus === 0) {
                const orderArts = [];
                let totalPrice = 0;
                orderArticles.map((orderArticle) => {
                  if (order.id === orderArticle.orderId) {
                    orderArts.push(orderArticle);
                  }
                });
                return (
                  <div className={classes.order} key={order.id}>
                    <div className={classes.rowLayout}>
                      <h3>
                        <b>
                          {new Date(order.issueTimeOfOrder).getHours()}:
                          {new Date(order.issueTimeOfOrder).getMinutes()}
                        </b>
                      </h3>
                      <h3>
                        <b>Stol: {order.tableNumber}</b>
                      </h3>
                    </div>
                    <p className={classes.id}>ID: {order.id}</p>
                    <hr className={classes.line}></hr>
                    {orderArts.map((orderAr) => {
                      const article1 = getArticle(orderAr.articleId);
                      totalPrice = totalPrice + article1.price * orderAr.amount;
                      return (
                        <div className={classes.rowLayout} key={orderAr.id}>
                          <p>{article1.name}</p>
                          <p>
                            {article1.price.toFixed(2)}€ x {orderAr.amount}
                          </p>
                        </div>
                      );
                    })}
                    <hr />
                    <div className={classes.rowLayout}>
                      <div className={classes.btns}>
                        <Button
                          variant="outline-success"
                          title="Označi kao obavljeno"
                          onClick={async () => {
                            const response = await fetch(
                              urlUpdateStatus + order.id + "/1",
                              optionsUpdateStatus
                            );
                            if (!response.ok) {
                              handleShow();
                            } else {
                              const data = await response.json();
                              console.log(data);
                              setUpdate(data);
                            }
                          }}
                        >
                          Obavljeno
                        </Button>
                        <Button
                          variant="danger"
                          title="Otkaži narudžbu"
                          onClick={async () => {
                            const response = await fetch(
                              urlUpdateStatus + order.id + "/2",
                              optionsUpdateStatus
                            );
                            if (!response.ok) {
                              handleShow();
                            } else {
                              const data = await response.json();
                              console.log(data);
                              setUpdate(data);
                            }
                          }}
                        >
                          Otkaži
                        </Button>
                      </div>
                      <p>
                        <b>Ukupna cijena: {totalPrice.toFixed(2)} €</b>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </Tab>
          <Tab eventKey="done" title="Obavljene narudžbe">
            {orders.map((order) => {
              if (order.orderStatus === 1) {
                const orderArts = [];
                let totalPrice = 0;
                orderArticles.map((orderArticle) => {
                  if (order.id === orderArticle.orderId) {
                    orderArts.push(orderArticle);
                  }
                });
                return (
                  <div className={classes.order} key={order.id}>
                    <div className={classes.rowLayout}>
                      <h3>
                        <b>
                          {new Date(order.issueTimeOfOrder).getHours()}:
                          {new Date(order.issueTimeOfOrder).getMinutes()}
                        </b>
                      </h3>
                      <h3>
                        <b>Stol: {order.tableNumber}</b>
                      </h3>
                    </div>
                    <p className={classes.id}>ID: {order.id}</p>
                    <hr className={classes.line}></hr>
                    {orderArts.map((orderAr) => {
                      const article1 = getArticle(orderAr.articleId);
                      totalPrice = totalPrice + article1.price * orderAr.amount;
                      return (
                        <div className={classes.rowLayout} key={orderAr.id}>
                          <p>{article1.name}</p>
                          <p>
                            {article1.price.toFixed(2)}€ x {orderAr.amount}
                          </p>
                        </div>
                      );
                    })}
                    <hr />
                    <div className={classes.rowLayout}>
                      <div className={classes.doneSymbol}>
                        <i className="fa-solid fa-check"></i>
                      </div>
                      <p>
                        <b>Ukupna cijena: {totalPrice.toFixed(2)} €</b>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </Tab>
          <Tab eventKey="cancelled" title="Otkazane narudžbe">
            {orders.map((order) => {
              if (order.orderStatus === 2) {
                const orderArts = [];
                let totalPrice = 0;
                orderArticles.map((orderArticle) => {
                  if (order.id === orderArticle.orderId) {
                    orderArts.push(orderArticle);
                  }
                });
                return (
                  <div className={classes.order} key={order.id}>
                    <div className={classes.rowLayout}>
                      <h3>
                        <b>
                          {new Date(order.issueTimeOfOrder).getHours()}:
                          {new Date(order.issueTimeOfOrder).getMinutes()}
                        </b>
                      </h3>
                      <h3>
                        <b>Stol: {order.tableNumber}</b>
                      </h3>
                    </div>
                    <p className={classes.id}>ID: {order.id}</p>
                    <hr className={classes.line}></hr>
                    {orderArts.map((orderAr) => {
                      const article1 = getArticle(orderAr.articleId);
                      totalPrice = totalPrice + article1.price * orderAr.amount;
                      return (
                        <div className={classes.rowLayout} key={orderAr.id}>
                          <p>{article1.name}</p>
                          <p>
                            {article1.price.toFixed(2)}€ x {orderAr.amount}
                          </p>
                        </div>
                      );
                    })}
                    <hr />
                    <div className={classes.rowLayout}>
                      <div className={classes.cancelledSymbol}>
                        <i className="fa-solid fa-xmark"></i>
                      </div>
                      <p>
                        <b>Ukupna cijena: {totalPrice.toFixed(2)} €</b>
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default OrderManagementPage;
