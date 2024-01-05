import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import Icon from "../Icon";
import classes from "./ErrorText.module.css";
import FlexBox from "../FlexBox";

const ErrorText = ({ content }) => {
  return (
    <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
      <Icon iconName={faCircleExclamation} color="danger" size="s" />
      <p className={classes.errorText}>{content}</p>
    </div>
  );
};

export default ErrorText;
