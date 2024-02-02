import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../FlatList";
import InputFilter from "../InputFilter";
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
        padding={"xl"}
        gap={"l"}
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
        <FlexBox gap={"xl"}>
          <Button
            content={"Back"}
            color={"gray"}
            action={backButtonAction}
            type="button"
          />
          <Button
            content={credentialsModalContent.buttonContent}
            type="submit"
          />
        </FlexBox>
      </FlexBox>
    </form>
  );
};

export default ChangeCredentials;
