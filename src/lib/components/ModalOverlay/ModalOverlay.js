import classes from "./Overlay.module.css";

const ModalOverlay = ({ action, children }) => {
  const onClickHandler = (event) => {
    if (event.target === event.currentTarget) {
      !!action && action();
    }
  };

  return (
    <div className={classes.modalOverlay} onClick={onClickHandler}>
      {children}
    </div>
  );
};

export default ModalOverlay;
