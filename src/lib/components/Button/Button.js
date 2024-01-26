import classes from "./Button.module.css";

const Button = ({ content, action, color }) => {
  const onClickHandler = () => {
    !!action && action();
  };
  let classList = [classes.button];
  if (color === "gray") {
    classList = [...classList, classes.gray].join(" ");
  }

  return (
    <button type="button" className={classList} onClick={onClickHandler}>
      {content}
    </button>
  );
};

export default Button;
