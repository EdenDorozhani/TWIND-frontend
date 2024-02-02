import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";

const DangerPopUp = ({ type, cancel, confirm, isPopUpVisible }) => {
  if (!isPopUpVisible && type !== "Account") return;

  return (
    <FlexBox
      alignItems={"center"}
      direction={"column"}
      justifyContent={"center"}
      padding={"l"}
      gap={"l"}
    >
      <SimpleText content={`Delete ${type}?`} size={"l"} color={"black"} />
      <SimpleText
        content={`Are you sure you want to delete this ${type}?`}
        color={"black"}
      />
      <FlexBox gap={"xl"}>
        <TextButton content={"Cancel"} color={"black"} action={cancel} />
        <TextButton content={"Delete"} color={"danger"} action={confirm} />
      </FlexBox>
    </FlexBox>
  );
};

export default DangerPopUp;
