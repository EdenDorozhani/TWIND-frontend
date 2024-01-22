import classes from "./Avatar.module.css";

const Avatar = ({ src, size, onClickAction }) => {
  let styleClass = [classes.img];

  switch (size) {
    case "s":
      styleClass = [...styleClass, classes.s];
      break;
    case "m":
      styleClass = [...styleClass, classes.m];
      break;
    case "l":
      styleClass = [...styleClass, classes.l];
      break;
    case "xl":
      styleClass = [...styleClass, classes.xl];
  }

  const onClick = () => {
    !!onClickAction && onClickAction();
  };

  return (
    <div className={styleClass.join(" ")} onClick={onClick}>
      <img src={src} className={styleClass.join(" ")} />
    </div>
  );
};

export default Avatar;
