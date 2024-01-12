import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";

const PostActions = ({
  editAction,
  deleteAction,
  popUpVisible,
  confirmDelete,
  cancelDelete,
  type,
}) => {
  console.log(type);
  return (
    <>
      {popUpVisible ? (
        <FlexBox
          alignItems={"center"}
          direction={"column"}
          justifyContent={"center"}
          padding={"large"}
          gap={"large"}
        >
          <SimpleText content={`Delete ${type}?`} size={"l"} color={"black"} />
          <SimpleText
            content={`Are you sure you want to delete this ${type}?`}
            color={"black"}
          />
          <FlexBox gap={"extra large"}>
            <TextButton
              content={"Cancel"}
              color={"black"}
              action={cancelDelete}
            />
            <TextButton
              content={"Delete"}
              color={"danger"}
              action={confirmDelete}
            />
          </FlexBox>
        </FlexBox>
      ) : (
        <>
          {type === "post" && (
            <div
              style={{
                borderBottom: "1px solid green",
                padding: "10px",
              }}
            >
              <FlexBox alignItems={"center"} justifyContent={"center"}>
                <TextButton content={"Edit"} action={editAction} />
              </FlexBox>
            </div>
          )}{" "}
          <div
            style={{
              padding: "10px",
            }}
          >
            <FlexBox alignItems={"center"} justifyContent={"center"}>
              <TextButton
                color={"danger"}
                content={"Delete"}
                action={deleteAction}
              />
            </FlexBox>
          </div>
        </>
      )}
    </>
  );
};

export default PostActions;
