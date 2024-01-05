import classes from "./FlexBox.module.css";

const FlexBox = ({
  children,
  direction,
  alignItems,
  justifyContent,
  padding,
  gap,
  wrap,
  style,
}) => {
  let styleClass = [classes.flexBox];

  switch (direction) {
    case "column":
      styleClass = [...styleClass, classes.column];
  }

  switch (alignItems) {
    case "center":
      styleClass = [...styleClass, classes.alignCenter];
      break;
    case "start":
      styleClass = [...styleClass, classes.alignStart];
      break;
    case "end":
      styleClass = [...styleClass, classes.alignEnd];
  }

  switch (justifyContent) {
    case "between":
      styleClass = [...styleClass, classes.justifyBetween];
      break;
    case "center":
      styleClass = [...styleClass, classes.justifyCenter];
      break;
    case "around":
      styleClass = [...styleClass, classes.justifyAround];
      break;
    case "evenly":
      styleClass = [...styleClass, classes.justifyEvenly];
      break;
    case "end":
      styleClass = [...styleClass, classes.justifyEnd];
  }

  switch (padding) {
    case "small":
      styleClass = [...styleClass, classes.paddingS];
      break;
    case "medium":
      styleClass = [...styleClass, classes.paddingM];
      break;
    case "large":
      styleClass = [...styleClass, classes.paddingL];
      break;
    case "extra large":
      styleClass = [...styleClass, classes.paddingXL];
  }

  switch (gap) {
    case "small":
      styleClass = [...styleClass, classes.gapS];
      break;
    case "medium":
      styleClass = [...styleClass, classes.gapM];
      break;
    case "large":
      styleClass = [...styleClass, classes.gapL];
      break;
    case "extra large":
      styleClass = [...styleClass, classes.gapXl];
  }

  switch (wrap) {
    case true:
      styleClass = [...styleClass, classes.wrap];
  }

  return (
    <div className={styleClass.join(" ")} style={style}>
      {children}
    </div>
  );
};

export default FlexBox;
