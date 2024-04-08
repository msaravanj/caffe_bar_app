import { Link } from "react-router-dom";
import classes from "./DashboardPage.module.css";

const DashboardPage = () => {
  const urlGeneratePdf = "http://localhost:8080/statistic/generatePdf";
  const optionsGeneratePdf = {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/pdf",
    // },
  };

  const generateStatisticPdf = async () => {
    const response = await fetch(urlGeneratePdf, optionsGeneratePdf);
    const blob = await response.blob();
    const newBlob = new Blob([blob]);

    const blobUrl = window.URL.createObjectURL(newBlob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", `daily_orderStatistics.pdf`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
    console.log(response);
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
        <Link className={classes.option}>Upravljanje posebnim ponudama</Link>
        <Link
          className={classes.option}
          onClick={() => {
            generateStatisticPdf();
          }}
        >
          Generiraj dnevnu statistiku
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
