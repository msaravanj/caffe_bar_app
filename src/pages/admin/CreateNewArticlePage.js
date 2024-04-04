import NewArticleComp from "../../components/NewArticleComp";
import classes from "./CreateNewArticlePage.module.css";

const CreateNewArticlePage = () => {
  return (
    <div className={classes.layout}>
      <NewArticleComp />
    </div>
  );
};

export default CreateNewArticlePage;
