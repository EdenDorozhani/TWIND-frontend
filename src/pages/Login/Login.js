import { useEffect, useState } from "react";
import UserAuth from "../../lib/components/UserAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pageHelpers } from "./pageHelpers";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";
import Modal from "../../lib/components/Modal/Modal";
import ChangeCredentials from "../../lib/components/ChangeCredentials";
import useModal from "../../hooks/useModal";

const Authentication = () => {
  const [loginInputsValue, setLoginInputsValue] = useState({});
  const [resetPasswordInputValue, setResetPasswordInputValue] = useState({});
  const [pageStatus, setPageStatus] = useState("login");

  const navigate = useNavigate();

  const { isVisible, openModal, closeModal } = useModal({});

  const { submit, isLoading, backendErrors } = useDataPoster({
    requestHeader: "json",
    urlPath: pageStatus,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(pageHelpers.determineSchema(pageStatus)),
  });

  //Dont let the user come to the login page if it's already logged in
  useEffect(() => {
    if (localStorage.getItem("session")) {
      navigate("twind");
    }
  }, []);

  const onLoginInputsChange = (name, value) => {
    setLoginInputsValue({ ...loginInputsValue, [name]: value });
  };

  const onFormSubmit = async () => {
    const response = await submit({
      dataToSend: loginInputsValue,
      navigateTo: "/twind",
    });
    if (!response) return;
    localStorage.setItem("session", response.data.response.token);
  };

  const onNavigateTo = () => {
    navigate("/signup");
  };

  //Reset states when you close the reset password modal
  const resetData = () => {
    setResetPasswordInputValue({});
    reset();
    setPageStatus("login");
    closeModal();
  };

  const onForgetPasswordClick = (status) => {
    setPageStatus(status);
    setLoginInputsValue({});
    reset();
    openModal();
  };

  const onCloseModal = () => {
    resetData();
  };

  const onResetPasswordInputChange = (name, value) => {
    setResetPasswordInputValue({ ...resetPasswordInputValue, [name]: value });
  };

  const onResetPassword = async () => {
    const response = await submit({
      dataToSend: resetPasswordInputValue,
    });
    if (response) {
      resetData();
    }
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={onCloseModal}>
        <ChangeCredentials
          credentialsModalContent={pageHelpers.modalContent}
          handleSubmit={handleSubmit(onResetPassword)}
          inputValue={resetPasswordInputValue}
          onInputChange={onResetPasswordInputChange}
          errors={errors}
          register={register}
          backButtonAction={onCloseModal}
          backendErrors={backendErrors}
        />
      </Modal>
      <UserAuth
        userAuthUIContent={pageHelpers.userAuthUIContent}
        onNavigateTo={onNavigateTo}
        register={register}
        onInputChange={onLoginInputsChange}
        onFormSubmit={handleSubmit(onFormSubmit)}
        inputList={pageHelpers.LOGIN_INPUTS}
        inputValue={loginInputsValue}
        control={control}
        errors={errors}
        onForgetPasswordClick={() => onForgetPasswordClick("resetPassword")}
        isLoadingButton={isLoading}
      />
    </>
  );
};

export default Authentication;
