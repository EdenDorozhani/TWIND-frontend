import FlatList from "../FlatList";
import FlexBox from "../FlexBox";
import InputFilter from "../InputFilter";

const SimpleForm = ({
  inputList,
  onInputChange,
  flexDirection,
  errors,
  register,
  control,
  flexWrap,
  backendErrors,
  mandatory,
  inputValue,
}) => {
  return (
    <FlexBox
      direction={flexDirection}
      padding={"xl"}
      alignItems={"center"}
      justifyContent={"around"}
      gap="l"
      wrap={flexWrap}
    >
      <FlatList
        data={inputList}
        renderItem={(input) => (
          <InputFilter
            key={input.name}
            inputProps={input}
            onInputChange={onInputChange}
            errors={errors}
            register={register}
            control={control}
            backendErrors={backendErrors}
            mandatory={mandatory}
            inputValue={inputValue}
          />
        )}
      />
    </FlexBox>
  );
};

export default SimpleForm;
