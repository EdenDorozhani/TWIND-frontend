import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FileInput from "../../lib/components/InputTypes/FileInput";
import FlexBox from "../../lib/components/FlexBox";
import TextAreaInput from "../../lib/components/InputTypes/TextAreaInput";
import Button from "../../lib/components/Button";
import SimpleText from "../../lib/components/SimpleText";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MANAGE_POST_INPUTS, managePostValidationSchema } from "./pageHelpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatImgUrl } from "../../lib/helpers";
import { getSinglePost } from "../PostModal/PostModal.actions";
import AsyncInputPicker from "../../lib/components/InputTypes/AsyncInputPicker";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const ManagePost = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();

  const { userLoggedInData } = useLoggedInUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ resolver: yupResolver(managePostValidationSchema) });

  const path = !postId
    ? `create?identifier=${userLoggedInData?.userId}`
    : `editPost?identifier=${postId}`;

  const { backendErrors, submit } = useDataPoster({
    requestHeader: "multipart",
    urlPath: path,
  });

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const response = await getSinglePost(postId, userLoggedInData.userId);
      const keys = MANAGE_POST_INPUTS.map((input) => input.name);
      const defaultValues = keys.reduce(
        (acc, key) => ({ ...acc, [key]: response[key] }),
        {}
      );
      const postImage = formatImgUrl(response.postImage);
      setInputValue({ ...defaultValues, postImage });
      reset({
        ...defaultValues,
        postImage,
      });
      setIsLoading(false);
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setInputValue({});
    if (!postId || !userLoggedInData.userId) return;
    fetchPostData();
  }, [postId, userLoggedInData.userId]);

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };
  const onFormSubmit = async () => {
    await submit({
      dataToSend: inputValue,
      navigateTo: `/twind/${userLoggedInData.username}`,
    });
  };

  return (
    <div
      style={{
        height: "calc(100% - 30px)",
        display: "flex",
        paddingTop: "30px",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
        marginLeft: "370px",
      }}
    >
      <SimpleText
        content={postId ? "edit post" : "create a post"}
        size={"l"}
        fontWeight={"bolder"}
      />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div style={{ border: "1px solid black" }}>
          <FlexBox>
            <FileInput
              onChangeAction={onInputChange}
              name={"postImage"}
              register={register}
              backendErrors={backendErrors["postImage"]}
              inputValue={inputValue["postImage"]}
              isLoading={isLoading}
              postId={postId}
            />
            <div style={{ borderLeft: "1px solid black" }}>
              <FlexBox
                direction={"column"}
                gap={"medium"}
                alignItems={"center"}
                justifyContent={"between"}
              >
                <TextAreaInput
                  noLable
                  register={register}
                  name={"caption"}
                  onChangeAction={onInputChange}
                  placeholder={"Write a caption..."}
                  noBorder
                  errors={errors["caption"]}
                />
                <div style={{ width: "100%" }}>
                  <AsyncInputPicker
                    onChangeAction={onInputChange}
                    control={control}
                    name={"location"}
                    inputValue={inputValue["location"]}
                  />
                </div>
              </FlexBox>
            </div>
          </FlexBox>
        </div>
      </form>
      {inputValue["postImage"] && (
        <Button
          content={postId ? "Submit" : "Share"}
          action={handleSubmit(onFormSubmit)}
          type={"button"}
        />
      )}
    </div>
  );
};

export default ManagePost;
