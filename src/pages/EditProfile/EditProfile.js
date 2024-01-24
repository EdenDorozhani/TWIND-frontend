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
import DangerPopUp from "../../lib/components/DangerPopUp";
import useDataDeleter from "../../hooks/useDataDeleter";

const EditProfile = () => {
  const [inputValue, setInputValue] = useState({});
  const [credentialsInputsValue, setCredentialsInputsValue] = useState({});
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
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

  const { onDelete } = useDataDeleter({ path: "deleteAccount" });

  const { backendErrors, submit, setBackendErrors } = useDataPoster({
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
    setIsPopUpVisible(false);
  };

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
    if (errors) setBackendErrors({});
  };

  const onEditProfile = async () => {
    const dataToStore = await submit({
      dataToSend: {
        ...determineData.values,
        userId: userLoggedInData.userId,
      },
    });
    if (!dataToStore) return;
    storeData(dataToStore.data.response);
    navigate(`/twind/${dataToStore.data.response.username}`);
  };

  const onPreviousPage = () => {
    navigate(-1);
  };

  const onCredentialsInputChange = (name, value) => {
    setCredentialsInputsValue({ ...credentialsInputsValue, [name]: value });
    if (errors) setBackendErrors({});
  };

  const onEditCredentials = async () => {
    const response = await submit({
      dataToSend: {
        ...determineData.values,
        userId: userLoggedInData.userId,
      },
    });
    if (!response) return;
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

  const confirmDeleteAction = () => {
    localStorage.removeItem("session");
    navigate("/");
  };

  const confirmDelete = async () => {
    onDelete({
      action: confirmDeleteAction,
      identifier: userLoggedInData.userId,
    });
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={onCloseCredentialsModal}>
        {modalStatus === "deleteProfile" ? (
          <DangerPopUp
            isPopUpVisible={isPopUpVisible}
            cancel={onCloseCredentialsModal}
            type={"Account"}
            confirm={confirmDelete}
          />
        ) : (
          <ChangeCredentials
            credentialsModalContent={credentialsModalContent}
            handleSubmit={handleSubmit(onEditCredentials)}
            inputValue={credentialsInputsValue}
            onInputChange={onCredentialsInputChange}
            errors={errors}
            register={register}
            backendErrors={backendErrors}
          />
        )}
      </Modal>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "50px",
          paddingTop: "25px",
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
          <div
            style={{
              border: "1px solid red",
              width: "320px",
              borderRadius: "15px",
            }}
            onClick={() => onOpenCredentialsModal("deleteProfile")}
          >
            <FlexBox justifyContent={"between"} padding={"medium"}>
              <SimpleText content={"Delete Account"} color={"danger"} />
              <Icon iconName={faRightToBracket} color={"danger"} />
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
