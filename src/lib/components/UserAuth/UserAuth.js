import Button from "../Button";
import FlexBox from "../FlexBox";
import MainLogo from "../MainLogo";
import SimpleText from "../SimpleText/SimpleText";
import TextButton from "../TextButton";
import SimpleForm from "../SimpleForm";
import classes from "./UserAuth.module.css";

const UserAuth = ({
  inputList,
  mainTextContent,
  onNavigateTo,
  onFormSubmit,
  onInputChange,
  defaultValues,
  buttonContent,
  inputValue,
  filterOptions,
  flexDirection,
  flexAlign,
  flexJustify,
  padding,
  errors,
  register,
  control,
  flexWrap,
  textContent,
  backendErrors,
  mandatory,
}) => {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.userAuthContainer}>
        <FlexBox
          direction="column"
          alignItems="center"
          padding="small"
          gap="small"
        >
          <MainLogo />
          <SimpleText content={mainTextContent} size={"l"} />
          <SimpleText content={"to use Twind"} size={"m"} />
        </FlexBox>
        <form onSubmit={onFormSubmit}>
          <SimpleForm
            inputList={inputList}
            onInputChange={onInputChange}
            defaultValues={defaultValues}
            textContent={textContent}
            buttonContent={buttonContent}
            inputValue={inputValue}
            filterOptions={filterOptions}
            flexDirection={flexDirection}
            flexAlign={flexAlign}
            flexJustify={flexJustify}
            padding={padding}
            errors={errors}
            register={register}
            control={control}
            flexWrap={flexWrap}
            backendErrors={backendErrors}
            mandatory={mandatory}
          />
          <FlexBox justifyContent="around" alignItems="center" padding="large">
            <TextButton content={textContent} action={onNavigateTo} />
            <Button content={buttonContent} />
          </FlexBox>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
