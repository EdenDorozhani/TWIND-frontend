import FlexBox from "../FlexBox";
import DangerPopUp from "../DangerPopUp";
import TextButton from "../TextButton";

const PostActions = ({
  editAction,
  deleteAction,
  isPopUpVisible,
  confirmDelete,
  cancelDelete,
  type,
}) => {
  return (
    <>
      <DangerPopUp
        cancel={cancelDelete}
        confirm={confirmDelete}
        isPopUpVisible={isPopUpVisible}
        type={type}
      />
      {!isPopUpVisible && (
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
          )}
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
