import { useEffect, useState } from "react";
import UserAuth from "../../lib/components/UserAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidationSchema, LOGIN_INPUTS } from "./pageHelpers";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";

const Authentication = () => {
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();

  const { submit } = useDataPoster({
    requestHeader: "json",
    urlPath: "login",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(loginFormValidationSchema) });

  useEffect(() => {
    if (localStorage.getItem("session")) {
      navigate("twind");
    }
  }, []);

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const onFormSubmit = async () => {
    const response = await submit({
      dataToSend: inputValue,
      navigateTo: "/twind",
      toastErr: true,
    });
    if (!response.data) return;
    localStorage.setItem("session", response.data.response.token);
  };

  const onNavigateTo = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* <ScreenLoader isLoading /> */}
      <UserAuth
        buttonContent="Login"
        textContent="create account"
        mainTextContent="Login"
        inputList={LOGIN_INPUTS}
        onInputChange={onInputChange}
        onFormSubmit={handleSubmit(onFormSubmit)}
        inputValue={inputValue}
        flexDirection="column"
        flexAlign="center"
        flexJustify="around"
        padding="extra large"
        onNavigateTo={onNavigateTo}
        register={register}
        control={control}
        errors={errors}
      />
    </>
  );
};

export default Authentication;
