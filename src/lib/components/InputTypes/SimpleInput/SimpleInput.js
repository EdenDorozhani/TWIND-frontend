import classes from "./SimpleInput.module.css";
import FlexBox from "../../FlexBox";
import SimpleText from "../../SimpleText";
import { formatText } from "../../../helpers";
import ErrorText from "../../ErrorText";
import TextButton from "../../TextButton";
const SimpleInput = ({
  name,
  onChangeAction,
  errors,
  placeholder,
  lable,
  register,
  button,
  textButtonContent,
  textButtonAction,
  replyInputRef,
  backendErrors,
  inputValue,
}) => {
  const getRef = () => {
    if (replyInputRef) {
      return replyInputRef;
    } else {
      const { ref } = register(name);
      return ref;
    }
  };
  const onChangeHanlder = (e) => {
    const { name, value } = e.target;
    onChangeAction(name, value);
  };

  const classNames = [
    classes.simpleInput,
    errors || backendErrors ? classes.danger : "",
  ].join(" ");

  const placeholderEmal = name === "email" ? "e.g. example@gmail.com" : "";

  return (
    <FlexBox direction={"column"} gap="small">
      {lable ? (
        ""
      ) : (
        <SimpleText
          content={formatText(name)}
          color={(!!errors || !!backendErrors) && "danger"}
        />
      )}
      {!!errors && <ErrorText content={errors.message} />}
      {!!backendErrors && !errors && <ErrorText content={backendErrors} />}
      <FlexBox alignItems={"center"}>
        <input
          {...register(name, {
            onfocus: (event) => true,
            onChange: onChangeHanlder,
          })}
          autoComplete="off"
          placeholder={placeholder ? placeholder : placeholderEmal}
          value={inputValue || ""}
          name={name}
          ref={getRef()}
          className={classNames}
        />
        {button && (
          <TextButton
            content={textButtonContent}
            action={textButtonAction}
            size={"s"}
            noBreak
          />
        )}
      </FlexBox>
    </FlexBox>
  );
};

export default SimpleInput;
