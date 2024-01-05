import MainLogo from "../MainLogo";
import classes from "./ScreenLoader.module.css";

const ScreenLoader = ({ isLoading }) => {
  if (!isLoading) {
    return;
  }

  return (
    <div className={classes.screen}>
      <MainLogo animated />
    </div>
  );
};

export default ScreenLoader;
