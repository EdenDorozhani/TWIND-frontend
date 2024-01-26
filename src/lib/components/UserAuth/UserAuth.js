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
  buttonContent,
  inputValue,
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
  onForgetPasswordClick,
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
            inputValue={inputValue}
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

            <Button content={buttonContent} action={onFormSubmit} />
            {buttonContent === "Login" ? (
              <TextButton
                content={"Forgot password"}
                size={"s"}
                color={"black"}
                action={onForgetPasswordClick}
              />
            ) : (
              ""
            )}
          </FlexBox>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
