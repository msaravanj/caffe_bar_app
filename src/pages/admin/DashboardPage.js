import { Link } from "react-router-dom";
import classes from "./DashboardPage.module.css";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DashboardPage = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const urlGeneratePdf = "http://localhost:8080/statistic/generatePdf";
  const optionsGeneratePdf = {
    method: "GET",
  };

  const generateStatisticPdf = async () => {
    const response = await fetch(urlGeneratePdf, optionsGeneratePdf);
    if (!response.ok) {
      handleShow();
    } else {
      const blob = await response.blob();
      const newBlob = new Blob([blob]);

      const blobUrl = window.URL.createObjectURL(newBlob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `order_statistics.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
      console.log(response);
    }
  };

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
        <Link className={classes.option} to="/addSpecialOffer">
          Upravljanje posebnim ponudama
        </Link>
        <Link
          className={classes.option}
          onClick={() => {
            generateStatisticPdf();
          }}
        >
          Generiraj statistiku narudžbi [PDF]
        </Link>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Neuspješno generiranje dokumenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          PDF dokument nije uspješno generiran. Pokušajte ponovno.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardPage;
