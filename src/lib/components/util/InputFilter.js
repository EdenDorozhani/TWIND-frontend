import AsyncInputPicker from "../InputTypes/AsyncInputPicker";
import FileInput from "../InputTypes/FileInput";
import PasswordInput from "../InputTypes/PasswordInput";
import SimpleInput from "../InputTypes/SimpleInput";
import TextAreaInput from "../InputTypes/TextAreaInput";

const InputFilter = ({
  inputProps,
  onInputChange,
  errors,
  register,
  control,
  backendErrors,
  mandatory,
  inputValue,
}) => {
  let input;
  switch (inputProps.type) {
    case "text":
    case "email":
      input = (
        <SimpleInput
          name={inputProps.name}
          onChangeAction={onInputChange}
          register={register}
          errors={errors[inputProps.name]}
          backendErrors={backendErrors?.[inputProps.name]}
          inputValue={inputValue[inputProps.name]}
        />
      );
      break;
    case "asyncPicklist":
      input = (
        <AsyncInputPicker
          name={inputProps.name}
          onChangeAction={onInputChange}
          control={control}
          errors={errors[inputProps.name]}
          backendErrors={backendErrors?.[inputProps.name]}
          mandatory={mandatory}
          inputValue={inputValue[inputProps.name]}
        />
      );
      break;
    case "textArea":
      input = (
        <TextAreaInput
          name={inputProps.name}
          onChangeAction={onInputChange}
          register={register}
          errors={errors[inputProps.name]}
          backendErrors={backendErrors?.[inputProps.name]}
        />
      );
      break;
    case "file":
      input = (
        <FileInput
          name={inputProps.name}
          onChangeAction={onInputChange}
          backendErrors={backendErrors?.[inputProps.name]}
        />
      );
      break;
    case "password":
      input = (
        <PasswordInput
          name={inputProps.name}
          onChangeAction={onInputChange}
          register={register}
          errors={errors?.[inputProps.name]}
          backendErrors={backendErrors?.[inputProps.name]}
        />
      );
  }
  return <div style={{ width: "240px" }}>{input}</div>;
};

export default InputFilter;
