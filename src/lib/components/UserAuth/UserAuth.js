import Button from "../Button";
import FlexBox from "../FlexBox";
import MainLogo from "../MainLogo";
import SimpleText from "../SimpleText/SimpleText";
import TextButton from "../TextButton";
import SimpleForm from "../SimpleForm";
import classes from "./UserAuth.module.css";

const UserAuth = ({
  inputList,
  onNavigateTo,
  onFormSubmit,
  onInputChange,
  inputValue,
  errors,
  register,
  control,
  backendErrors,
  mandatory,
  onForgetPasswordClick,
  userAuthUIContent,
  isLoadingButton,
}) => {
  return (
    <div className={classes.pageContainer}>
      <div className={classes.userAuthContainer}>
        <FlexBox direction="column" alignItems="center" padding="s" gap="s">
          <MainLogo />
          <SimpleText content={userAuthUIContent.mainTextContent} size={"l"} />
          <SimpleText content={"to use Twind"} size={"m"} />
        </FlexBox>
        <form onSubmit={onFormSubmit}>
          <SimpleForm
            inputList={inputList}
            onInputChange={onInputChange}
            inputValue={inputValue}
            flexDirection={userAuthUIContent.flexDirection}
            errors={errors}
            register={register}
            control={control}
            flexWrap={userAuthUIContent.flexWrap}
            backendErrors={backendErrors}
            mandatory={mandatory}
          />
          <FlexBox justifyContent="around" alignItems="center" padding="l">
            <TextButton
              content={userAuthUIContent.textContent}
              action={onNavigateTo}
            />
            <Button
              content={userAuthUIContent.buttonContent}
              type={"submit"}
              disabled={isLoadingButton}
            />
            {userAuthUIContent.buttonContent === "Login" ? (
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
