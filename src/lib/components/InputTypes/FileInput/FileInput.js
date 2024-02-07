import { useEffect, useState } from "react";
import classes from "./FileInput.module.css";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import SimpleText from "../../SimpleText";
import FlexBox from "../../FlexBox";
import Icon from "../../Icon";
import ErrorText from "../../ErrorText";
import TextButton from "../../TextButton";

const FileInput = ({
  name,
  onChangeAction,
  register,
  backendErrors,
  inputValue,
  isLoading,
  postId,
  emptyFile,
}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (!postId) {
      return setImage();
    }
    setImage(inputValue);
  }, [isLoading, postId]);

  const onChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    const { name } = e.target;
    onChangeAction(name, selectedFile);
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  const discardImage = () => {
    setImage();
    emptyFile();
  };

  return (
    <FlexBox direction="column" gap="s">
      {!!backendErrors && <ErrorText content={backendErrors} />}
      <div className={classes.inputFileContainer}>
        {inputValue ? (
          <div style={{ padding: "10px" }} onClick={discardImage}>
            {" "}
            <TextButton content={`discard image`} size="s" color={"danger"} />
          </div>
        ) : (
          <label className={classes.costumFileInput}>
            <input
              {...register(name, {
                onChange: onChangeHandler,
              })}
              type="file"
              name={name}
              className={classes.fileInput}
            />
            <div className={classes.fileInputContent}>
              <span>
                <Icon iconName={faFileImport} color="white" />
              </span>
              <SimpleText content={`upload image`} size="s" color="white" />
            </div>
          </label>
        )}
        {!image && (
          <SimpleText
            content="No image is uploaded, please upload an image."
            size="s"
          />
        )}
        {image && <img src={image} className={classes.previewImg} />}
      </div>
    </FlexBox>
  );
};

export default FileInput;
