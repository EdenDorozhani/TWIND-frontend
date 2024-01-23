import { FormikContext } from "formik";
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
  timePassed,
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
        {!!notification && <SimpleText color={"fade"} content={timePassed} />}
      </div>
      {textTruncated && textTruncated.moreText}
      {!!notification && !!imageSrc && (
        <img
          style={{
            minWidth: "50px",
            maxWidth: "50px",
            height: "50px",
            objectFit: "cover",
          }}
          src={imageSrc}
        />
      )}
    </FlexBox>
  );
};

export default Description;
