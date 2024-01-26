import { useState } from "react";
import { pageHelpers } from "./pageHelpers";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../lib/components/Button";
import SimpleForm from "../../lib/components/SimpleForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";
import FlexBox from "../../lib/components/FlexBox";
import SimpleText from "../../lib/components/SimpleText";

const ChangePassword = () => {
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { submit, backendErrors } = useDataPoster({
    requestHeader: "json",
    urlPath: "changePassword",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(pageHelpers.newPasswordValidationSchema),
  });

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const onFormSubmit = async () => {
    const response = await submit({
      dataToSend: { ...inputValue, token, email },
    });
    if (!response) return;
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgb(9, 121, 84)",
      }}
    >
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        style={{ paddingTop: "300px" }}
      >
        <FlexBox
          direction={"column"}
          alignItems={"center"}
          gap={"large"}
          padding={"extra large"}
          style={{
            border: "1px solid white",
            margin: "0px 300px",
            backgroundColor: "white",
          }}
        >
          {backendErrors.changePassword && (
            <SimpleText
              content={backendErrors.changePassword}
              color={"danger"}
            />
          )}
          <SimpleText content={"Change Password"} size={"m"} color={"black"} />
          <SimpleText
            content={
              "password must be at least 8 characters long and include at least one letter and one number"
            }
            size={"s"}
            color={"fade"}
            style={{ wordBreak: "break-word", textAlign: "center" }}
          />
          <SimpleForm
            inputList={pageHelpers.NEW_PASSWORD_INPUTS}
            onInputChange={onInputChange}
            inputValue={inputValue}
            flexDirection={"column"}
            flexAlign={"center"}
            flexJustify={"center"}
            padding={"large"}
            errors={errors}
            register={register}
            control={control}
            backendErrors={backendErrors}
          />
          <Button
            content={"Change Password"}
            action={handleSubmit(onFormSubmit)}
          />
        </FlexBox>
      </form>
    </div>
  );
};

export default ChangePassword;
