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

const ManagePost = () => {
  const [inputValue, setInputValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({ resolver: yupResolver(managePostValidationSchema) });

  const path = !postId ? "create" : `editPost?postId=${postId}`;

  const { backendErrors, submit } = useDataPoster({
    dataToSend: { ...inputValue, postId },
    requestHeader: "multipart",
    urlPath: path,
  });

  const fetchPostData = async () => {
    setIsLoading(true);
    try {
      const response = await getSinglePost(postId);
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
    if (!postId) return;
    setInputValue({});
    fetchPostData();
  }, [postId]);

  const onInputChange = (name, value) => {
    console.log(value);
    setInputValue({ ...inputValue, [name]: value });
  };

  const onFormSubmit = async () => {
    submit({ navigateTo: "/twind" });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        paddingTop: "30px",
        flexDirection: "column",
        gap: "30px",
        alignItems: "center",
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
        />
      )}
    </div>
  );
};

export default ManagePost;
