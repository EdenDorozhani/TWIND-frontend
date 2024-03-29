import { useState } from "react";
import UserAuth from "../../lib/components/UserAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupPageHelpers } from "./pageHelpers";
import "react-toastify/dist/ReactToastify.css";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";

const Signup = () => {
  const [inputValue, setInputValue] = useState({});

  const navigate = useNavigate();

  const { submit, backendErrors, setBackendErrors, isLoading } = useDataPoster({
    requestHeader: "json",
    urlPath: "signup",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(signupPageHelpers.userDataFormValidationSchema),
  });

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
      userAuthUIContent={signupPageHelpers.userAuthUIContent}
      inputList={signupPageHelpers.SIGNUP_INPUTS}
      onInputChange={onInputChange}
      onFormSubmit={handleSubmit(onFormSubmit)}
      inputValue={inputValue}
      onNavigateTo={onNavigateTo}
      register={register}
      control={control}
      errors={errors}
      backendErrors={backendErrors}
      mandatory={true}
      isLoadingButton={isLoading}
    />
  );
};

export default Signup;
