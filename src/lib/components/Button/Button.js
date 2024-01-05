import classes from "./Button.module.css";

const Button = ({ content, action }) => {
  const onClickHandler = () => {
    !!action && action();
  };

  return (
    <button className={classes.button} onClick={onClickHandler}>
      {content}
    </button>
  );
};

export default Button;
