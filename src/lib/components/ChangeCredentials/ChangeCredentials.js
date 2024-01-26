import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";
import InputFilter from "../util/InputFilter";
import Button from "../Button";

const ChangeCredentials = ({
  credentialsModalContent,
  onInputChange,
  inputValue,
  errors,
  register,
  handleSubmit,
  backendErrors,
  backButtonAction,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FlexBox
        direction={"column"}
        padding={"extra large"}
        gap={"large"}
        alignItems={"center"}
      >
        <SimpleText content={credentialsModalContent.title} color={"fade"} />
        <SimpleText
          content={credentialsModalContent.description}
          color={"fade"}
        />

        <FlatList
          data={credentialsModalContent.inputList}
          renderItem={(input) => (
            <InputFilter
              key={input.name}
              inputProps={input}
              onInputChange={onInputChange}
              inputValue={inputValue}
              errors={errors}
              register={register}
              backendErrors={backendErrors}
            />
          )}
        />
        <FlexBox gap={"extra large"}>
          <Button content={"Back"} color={"gray"} action={backButtonAction} />
          <Button
            content={credentialsModalContent.buttonContent}
            action={handleSubmit}
          />
        </FlexBox>
      </FlexBox>
    </form>
  );
};

export default ChangeCredentials;
