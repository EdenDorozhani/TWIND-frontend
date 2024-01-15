import { useState } from "react";
import UserAuth from "../../lib/components/UserAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDataFormValidationSchema, SIGNUP_INPUTS } from "./pageHelpers";
import "react-toastify/dist/ReactToastify.css";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";

const Authentication = () => {
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();
  const { submit, backendErrors, setBackendErrors } = useDataPoster({
    requestHeader: "json",
    urlPath: "signup",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(userDataFormValidationSchema) });

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
    if (errors) setBackendErrors((prevState) => ({ ...prevState, [name]: "" }));
  };

  const onFormSubmit = async () => {
    submit({ dataToSend: inputValue, navigateTo: "/" });
  };

  const onNavigateTo = () => {
    navigate("/");
  };
  return (
    <UserAuth
      buttonContent="Submit"
      textContent="existing account"
      mainTextContent="Signup"
      inputList={SIGNUP_INPUTS}
      onInputChange={onInputChange}
      onFormSubmit={handleSubmit(onFormSubmit)}
      inputValue={inputValue}
      flexAlign="center"
      flexJustify="around"
      padding="extra large"
      onNavigateTo={onNavigateTo}
      register={register}
      control={control}
      errors={errors}
      backendErrors={backendErrors}
      flexWrap={true}
      mandatory={true}
    />
  );
};

export default Authentication;
