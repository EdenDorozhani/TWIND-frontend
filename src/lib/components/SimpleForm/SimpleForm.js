import FlatList from "../util/FlatList";
import FlexBox from "../FlexBox";
import InputFilter from "../util/InputFilter";

const SimpleForm = ({
  inputList,
  onInputChange,
  flexDirection,
  flexAlign,
  flexJustify,
  padding,
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
      padding={padding}
      alignItems={flexAlign}
      justifyContent={flexJustify}
      gap="large"
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
