import classes from "./Button.module.css";

const Button = ({ content, action, color, type, disabled }) => {
  const onClickHandler = () => {
    !!action && action();
  };
  let classList = [classes.button];
  if (color === "gray") {
    classList = [...classList, classes.gray].join(" ");
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classList}
      onClick={onClickHandler}
    >
      {content}
    </button>
  );
};

export default Button;
