import { useState } from "react";
import FlexBox from "../../FlexBox";
import SimpleText from "../../SimpleText";
import { formatText } from "../../../helpers";
import classes from "./PasswordInput.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../Icon";
import ErrorText from "../../ErrorText";

const PasswordInput = ({
  name,
  onChangeAction,
  errors,
  register,
  backendErrors,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHanlder = (e) => {
    const { name, value } = e.target;
    onChangeAction(name, value);
  };

  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const passwordType = showPassword ? "text" : "password";

  const iconName = showPassword ? faEye : faEyeSlash;

  const classNames = [
    classes.passwordInput,
    errors || backendErrors ? classes.danger : "",
  ].join(" ");

  return (
    <FlexBox direction={"column"} gap="s">
      <SimpleText
        content={formatText(name)}
        color={(!!errors || backendErrors) && "danger"}
      />
      {!!errors && <ErrorText content={errors.message} />}
      {!!backendErrors && !errors && <ErrorText content={backendErrors} />}
      <FlexBox alignItems={"end"} justifyContent="between">
        <input
          {...register(name, { onChange: onChangeHanlder })}
          type={passwordType}
          autoComplete="off"
          name={name}
          className={classNames}
        />
        <Icon
          iconName={iconName}
          action={onShowPassword}
          size={"s"}
          color={(!!errors || !!backendErrors) && "danger"}
          type="button"
        />
      </FlexBox>
    </FlexBox>
  );
};

export default PasswordInput;
