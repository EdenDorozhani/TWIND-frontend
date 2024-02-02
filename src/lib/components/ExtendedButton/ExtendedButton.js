import classes from "./ExtendedButton.module.css";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import FlexBox from "../FlexBox";
import Avatar from "../Avatar";

const ExtendedButton = ({
  icon,
  textContent,
  backgroundColor,
  buttonSize,
  textColor,
  iconColor,
  textSize,
  gap,
  iconSize,
  src,
  action,
}) => {
  const onClickAction = () => {
    !!action && action();
  };

  let styleClass = [classes.container];

  switch (buttonSize) {
    case "s":
      styleClass = [...styleClass, classes.s];
      break;
    case "m":
      styleClass = [...styleClass, classes.m];
      break;
    case "l":
      styleClass = [...styleClass, classes.l];
  }

  switch (backgroundColor) {
    case "white":
      styleClass = [...styleClass, classes.white];
      break;
    case "warning":
      styleClass = [...styleClass, classes.warning];
      break;
    case "danger":
      styleClass = [...styleClass, classes.danger];
      break;
    case "blue":
      styleClass = [...styleClass, classes.blue];
  }

  return (
    <div className={styleClass.join(" ")} onClick={onClickAction}>
      <FlexBox gap={gap}>
        <span>
          {!!src ? (
            <Avatar size={"s"} src={src} />
          ) : (
            <Icon iconName={icon} color={iconColor} size={iconSize} />
          )}
        </span>
        <SimpleText content={textContent} size={textSize} color={textColor} />
      </FlexBox>
    </div>
  );
};

export default ExtendedButton;
