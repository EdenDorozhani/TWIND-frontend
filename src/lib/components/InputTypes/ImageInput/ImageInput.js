import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../Avatar";
import SimpleText from "../../SimpleText";
import Icon from "../../Icon";
import { useEffect, useState } from "react";
import ErrorText from "../../ErrorText";

const ImageInput = ({
  onChangeAction,
  name,
  register,
  isLoading,
  inputValue,
  backendErrors,
}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(inputValue);
  }, [isLoading]);

  const onChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    const { name } = e.target;
    onChangeAction(name, selectedFile);
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <>
      {backendErrors && <ErrorText content={backendErrors} />}
      <div
        style={{
          width: "400px",
          padding: "0px 20px",
          height: "100px",
          border: "1px solid green",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "25px",
        }}
      >
        <Avatar src={image} />
        <label>
          <input
            {...register(name, {
              onChange: onChangeHandler,
            })}
            style={{ display: "none" }}
            type="file"
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "5px 10px",
              border: "1px solid green",
              borderRadius: "25px",
              backgroundColor: "rgb(9, 121, 84)",
            }}
          >
            <span>
              <Icon iconName={faFileImport} color="white" />
            </span>
            <SimpleText content="upload image" size="s" color="white" />
          </div>
        </label>
      </div>
    </>
  );
};

export default ImageInput;
