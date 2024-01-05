import { useForm } from "react-hook-form";
import Button from "../../lib/components/Button";
import FlexBox from "../../lib/components/FlexBox";
import SimpleForm from "../../lib/components/SimpleForm";
import { pageHelpers } from "./pageHelpers";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { yupResolver } from "@hookform/resolvers/yup";
import SimpleText from "../../lib/components/SimpleText";
import Icon from "../../lib/components/Icon";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import useModal from "../../hooks/useModal";
import { getUserData } from "../../roots/RootSidebar/rootsHelpers";
import useLoggedInUser from "../../context/useLoggedInUser";
import ImageInput from "../../lib/components/InputTypes/ImageInput";
import { formatImgUrl } from "../../lib/helpers";
import Modal from "../../lib/components/Modal/Modal";
import ChangeCredentials from "../../lib/components/ChangeCredentials";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";

const EditProfile = () => {
  const [inputValue, setInputValue] = useState({});
  const [credentialsInputsValue, setCredentialsInputsValue] = useState({});
  const [modalStatus, setModalStatus] = useState("editProfile");
  const [isLoading, setIsLoading] = useState(false);
  const { userLoggedInData, storeData } = useLoggedInUser();
  const { isVisible, openModal, closeModal } = useModal({});
  const navigate = useNavigate();

  const determineData = pageHelpers.determineDataToPost(
    modalStatus,
    inputValue,
    credentialsInputsValue
  );

  const { backendErrors, submit, setBackendErrors } = useDataPoster({
    dataToSend: {
      ...determineData.values,
      userId: userLoggedInData.userId,
    },
    requestHeader: determineData.headers,
    urlPath: modalStatus,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(pageHelpers.determineSchema(modalStatus)),
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getUserData();
        const keys = pageHelpers.EDIT_PROFILE_INPUTS.map((input) => input.name);
        const defaultValues = keys.reduce(
          (acc, key) => ({ ...acc, [key]: response[key] }),
          {}
        );
        const imageUrl = formatImgUrl(response.userImgURL);
        setInputValue({ ...defaultValues, userImgURL: imageUrl });
        reset({ ...defaultValues, userImgURL: imageUrl });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const resetData = () => {
    setCredentialsInputsValue({});
    reset();
    setBackendErrors({});
    setModalStatus("editProfile");
    closeModal();
  };

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
    if (errors) setBackendErrors({});
  };

  const onEditProfile = async () => {
    const dataToStore = await submit({
      navigateTo: `/twind/${userLoggedInData.username}`,
    });
    if (!dataToStore) return;
    storeData(dataToStore.data.response);
  };

  const onPreviousPage = () => {
    navigate(-1);
  };

  const onCredentialsInputChange = (name, value) => {
    setCredentialsInputsValue({ ...credentialsInputsValue, [name]: value });
    if (errors) setBackendErrors({});
  };

  const onEditCredentials = async () => {
    submit();
    resetData();
  };

  const onOpenCredentialsModal = (type) => {
    setModalStatus(type);
    reset();
    openModal();
  };

  const onCloseCredentialsModal = () => {
    resetData();
  };

  const credentialsModalContent = pageHelpers.updateModalContent(modalStatus);

  return (
    <>
      <Modal isVisible={isVisible} onClose={onCloseCredentialsModal}>
        <ChangeCredentials
          credentialsModalContent={credentialsModalContent}
          handleSubmit={handleSubmit(onEditCredentials)}
          inputValue={credentialsInputsValue}
          onInputChange={onCredentialsInputChange}
          errors={errors}
          register={register}
          backendErrors={backendErrors}
        />
      </Modal>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
          paddingTop: "50px",
        }}
      >
        <SimpleText color={"fade"} content={"Edit profile"} size={"l"} />
        <form onSubmit={handleSubmit(onEditProfile)}>
          <ImageInput
            name={"userImgURL"}
            onChangeAction={onInputChange}
            register={register}
            inputValue={inputValue["userImgURL"]}
            isLoading={isLoading}
          />
          <SimpleForm
            inputList={pageHelpers.EDIT_PROFILE_INPUTS}
            onInputChange={onInputChange}
            inputValue={inputValue}
            flexDirection={"column"}
            flexAlign={"center"}
            errors={errors}
            flexJustify={"center"}
            register={register}
            control={control}
            backendErrors={backendErrors}
            mandatory={true}
          />
        </form>
        <FlexBox direction={"column"} gap={"medium"}>
          <div
            style={{
              border: "1px solid green",
              width: "320px",
              borderRadius: "15px",
            }}
            onClick={() => onOpenCredentialsModal("changePassword")}
          >
            <FlexBox justifyContent={"between"} padding={"medium"}>
              <SimpleText content={"Change Password"} />
              <Icon iconName={faRightToBracket} />
            </FlexBox>
          </div>
          <div
            style={{
              border: "1px solid green",
              width: "320px",
              borderRadius: "15px",
            }}
            onClick={() => onOpenCredentialsModal("changeEmail")}
          >
            <FlexBox justifyContent={"between"} padding={"medium"}>
              <SimpleText content={"Change E-mail"} />
              <Icon iconName={faRightToBracket} />
            </FlexBox>
          </div>
        </FlexBox>
        <FlexBox gap={"extra large"}>
          <Button content={"Back"} action={onPreviousPage} />
          <Button content={"Submit"} action={handleSubmit(onEditProfile)} />
        </FlexBox>
      </div>
    </>
  );
};

export default EditProfile;
