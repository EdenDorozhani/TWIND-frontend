import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Icon.module.css";

const Icon = ({ iconName, action, color, size, type }) => {
  let styleClass = [classes.icon];

  switch (size) {
    case "s":
      styleClass = [...styleClass, classes.sFont];
      break;
    case "m":
      styleClass = [...styleClass, classes.mFont];
      break;
    case "l":
      styleClass = [...styleClass, classes.lFont];
      break;
    case "xl":
      styleClass = [...styleClass, classes.xlFont];
  }

  switch (color) {
    case "white":
      styleClass = [...styleClass, classes.white];
      break;
    case "warning":
      styleClass = [...styleClass, classes.warning];
      break;
    case "danger":
      styleClass = [...styleClass, classes.danger];
      break;
    case "fade":
      styleClass = [...styleClass, classes.fade];
      break;
    case "blue":
      styleClass = [...styleClass, classes.blue];
  }

  switch (type) {
    case "button":
      styleClass = [...styleClass, classes.button];
      break;
  }

  const onClickHandler = () => {
    !!action && action();
  };
  return (
    <div
      style={{
        width: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FontAwesomeIcon
        icon={iconName}
        onClick={onClickHandler}
        className={styleClass.join(" ")}
      />
    </div>
  );
};

export default Icon;
