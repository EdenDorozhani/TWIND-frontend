import ErrorText from "../../ErrorText";
import FlexBox from "../../FlexBox";
import SimpleText from "../../SimpleText";
import classes from "./TextAreaInput.module.css";

const TextAreaInput = ({
  name,
  onChangeAction,
  noBorder,
  errors,
  placeholder,
  noLable,
  register,
  backendErrors,
}) => {
  const onChangeHanlder = (e) => {
    const { name, value } = e.target;
    onChangeAction(name, value);
  };

  const classNames = [
    classes.textArea,
    errors ? classes.danger : "",
    noBorder ? classes.noBorder : "",
  ].join(" ");

  return (
    <FlexBox direction={"column"}>
      {noLable ? (
        ""
      ) : (
        <SimpleText content={name} color={!!errors && "danger"} />
      )}
      {!!backendErrors && <ErrorText content={backendErrors} />}
      {!!errors && <ErrorText content={errors?.message} />}
      <textarea
        {...register(name)}
        className={classNames}
        placeholder={placeholder}
        rows="3"
        name={name}
        onChange={onChangeHanlder}
      />
    </FlexBox>
  );
};

export default TextAreaInput;
