import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Spinner.module.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Spinner = ({ size, isVisible }) => {
  if (!isVisible) {
    return;
  }

  let styleClass = [classes.spinner];

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

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        zIndex: "100000000",
        position: "absolute",
        left: "0",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesomeIcon icon={faSpinner} className={styleClass.join(" ")} />
    </div>
  );
};

export default Spinner;
