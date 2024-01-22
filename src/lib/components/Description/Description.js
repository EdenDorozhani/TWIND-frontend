import Avatar from "../Avatar";
import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";

const Description = ({
  notification,
  author,
  description,
  imageSrc,
  textTruncated,
  avatarSrc,
  action,
}) => {
  return (
    <FlexBox gap={"medium"}>
      {!!avatarSrc && (
        <Avatar size={"m"} src={avatarSrc} onClickAction={action} />
      )}
      <div style={{ marginTop: "5px" }}>
        <SimpleText
          color={"black"}
          size={"s"}
          style={{ wordBreak: "break-word" }}
        >
          <TextButton content={author} action={action} />
          {textTruncated ? textTruncated.formatedText : description}
        </SimpleText>
      </div>

      {textTruncated && textTruncated.moreText}
      {!!notification && (
        <img style={{ minWidth: "50px", height: "50px" }} src={imageSrc} />
      )}
    </FlexBox>
  );
};

export default Description;
