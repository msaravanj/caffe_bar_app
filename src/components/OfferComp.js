import classes from "../pages/WelcomePage.module.css";

const OfferComp = (props) => {
  const days = [
    "nedjelje",
    "ponedjeljka",
    "utorka",
    "srijede",
    "četvrtka",
    "petka",
    "subote",
  ];

  return (
    <div className={classes.tab}>
      <div className={classes.specOffer} key={props.offer.id}>
        <h3 className={classes.offerTitle}>{props.offer.name}</h3>
        <p>{props.offer.description}</p>
        <p>
          Ponuda vrijedi od {days[new Date(props.offer.validFrom).getDay()]} (
          {new Date(props.offer.validFrom).getDate()}.
          {new Date(props.offer.validFrom).getMonth() + 1}.
          {new Date(props.offer.validFrom).getFullYear()}.) do{" "}
          {days[new Date(props.offer.validTo).getDay()]} (
          {new Date(props.offer.validTo).getDate()}.
          {new Date(props.offer.validTo).getMonth() + 1}.
          {new Date(props.offer.validTo).getFullYear()}.).
        </p>
      </div>
    </div>
  );
};

export default OfferComp;
