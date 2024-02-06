import classes from "./Overlay.module.css";
import Icon from "../Icon";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalOverlay = ({ action, children }) => {
  const onClickHandler = (event) => {
    if (event.target === event.currentTarget) {
      action();
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={onClickHandler}>
      <Icon
        iconName={faXmark}
        style={{ position: "absolute", right: "20px", top: "20px" }}
        size={"l"}
        color={"white"}
        type={"button"}
        action={action}
      />
      {children}
    </div>
  );
};

export default ModalOverlay;
