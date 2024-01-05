import classes from "./MainLogo.module.css";

const MainLogo = ({ animated }) => {
  const styles = [classes.mainLogo, !!animated ? classes.animated : ""].join(
    " "
  );

  return <div className={styles}>{".)(."}</div>;
};

export default MainLogo;
