import classes from "./TextButton.module.css";

const TextButton = ({ content, action, color, size, fontWeight, noBreak }) => {
  let styleClass = [classes.text];

  const onClickHandler = () => {
    !!action && action();
  };

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

  switch (fontWeight) {
    case "thin":
      styleClass = [...styleClass, classes.thin];
      break;
    case "bold":
      styleClass = [...styleClass, classes.bold];
      break;
    case "bolder":
      styleClass = [...styleClass, classes.bolder];
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
    case "black":
      styleClass = [...styleClass, classes.black];
      break;
    case "blue":
      styleClass = [...styleClass, classes.blue];
  }
  switch (noBreak) {
    case true:
      styleClass = [...styleClass, classes.noBreak];
      break;
  }

  return (
    <span onClick={onClickHandler} className={styleClass.join(" ")}>
      {content}
    </span>
  );
};

export default TextButton;
