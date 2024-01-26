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
  const [inputValue, setInputValue] = useState({});
  const [credentialsInputsValue, setCredentialsInputsValue] = useState({});
  const [status, setStatus] = useState("login");
  const { isVisible, openModal, closeModal } = useModal({});
  const navigate = useNavigate();

  const determineData = pageHelpers.determineDataToPost(
    status,
    inputValue,
    credentialsInputsValue
  );

  const { submit, setBackendErrors, backendErrors } = useDataPoster({
    requestHeader: "json",
    urlPath: status,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(pageHelpers.determineSchema(status)),
  });

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
      dataToSend: determineData.values,
      ...determineData,
    });
    if (!response.data) return;
    localStorage.setItem("session", response.data.response.token);
  };

  const onNavigateTo = () => {
    navigate("/signup");
  };

  const resetData = () => {
    setCredentialsInputsValue({});
    reset();
    setBackendErrors({});
    setStatus("login");
    closeModal();
  };

  const onForgetPasswordClick = (status) => {
    setStatus(status);
    openModal();
  };

  const onCloseForgetPasswordClick = () => {
    resetData();
  };

  const onCredentialsInputChange = (name, value) => {
    setCredentialsInputsValue({ ...credentialsInputsValue, [name]: value });
    if (errors) setBackendErrors({});
  };

  const onConfigureEmail = async () => {
    const response = await submit({
      dataToSend: determineData.values,
    });
    if (!response) return;
    resetData();
  };

  // const onChangePassword = async () => {
  //   const response = await submit({
  //     dataToSend: determineData.values,
  //   });
  //   if (!response) return;
  //   resetData();
  //   closeModal();
  //   setStatus("login");
  // };

  const modalContent = {
    title: "Enter your email",
    inputList: pageHelpers.EMAIL_INPUT,
    buttonContent: "Get reset password link",
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={onCloseForgetPasswordClick}>
        <ChangeCredentials
          credentialsModalContent={modalContent}
          handleSubmit={handleSubmit(onConfigureEmail)}
          inputValue={credentialsInputsValue}
          onInputChange={onCredentialsInputChange}
          errors={errors}
          register={register}
          backendErrors={backendErrors}
          backButtonAction={onCloseForgetPasswordClick}
        />
      </Modal>
      <UserAuth
        buttonContent="Login"
        textContent="create account"
        mainTextContent="Login"
        inputList={pageHelpers.LOGIN_INPUTS}
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
        onForgetPasswordClick={() => onForgetPasswordClick("configureEmail")}
      />
    </>
  );
};

export default Authentication;
