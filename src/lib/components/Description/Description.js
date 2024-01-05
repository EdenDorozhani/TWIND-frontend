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
    <FlexBox gap={"medium"} alignItems={"center"}>
      {!!avatarSrc && <Avatar size={"m"} src={avatarSrc} />}
      <SimpleText color={"black"} size={"s"}>
        <TextButton content={author} action={action} />
        {textTruncated ? textTruncated.formatedText : description}
      </SimpleText>
      {textTruncated && textTruncated.moreText}
      {!!notification && (
        <img style={{ width: "50px", height: "50px" }} src={imageSrc} />
      )}
    </FlexBox>
  );
};

export default Description;
