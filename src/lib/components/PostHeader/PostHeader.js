import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";

const PostHeader = ({
  userImg,
  author,
  passedTime,
  location,
  unknown,
  onUserClickAction,
  onIconClick,
  creatorId,
  userId,
  toggleFollow,
}) => {
  const content =
    unknown && creatorId !== userId ? (
      <TextButton
        content={"follow"}
        size={"s"}
        color={"blue"}
        action={toggleFollow}
      />
    ) : (
      <SimpleText content={passedTime} size={"s"} />
    );

  return (
    <FlexBox justifyContent={"between"}>
      <FlexBox gap={"medium"}>
        <Avatar size={"m"} src={userImg} onClickAction={onUserClickAction} />
        <FlexBox direction={"column"} justifyContent={"center"}>
          <FlexBox>
            <TextButton
              content={author}
              size={"s"}
              action={onUserClickAction}
            />
            <span>&#183;</span>
            {content}
          </FlexBox>
          <TextButton
            content={location}
            color={"black"}
            size={"s"}
            fontWeight={"bold"}
          />
        </FlexBox>
      </FlexBox>
      {creatorId === userId && (
        <Icon
          iconName={faEllipsis}
          size={"s"}
          type={"button"}
          action={onIconClick}
        />
      )}
    </FlexBox>
  );
};

export default PostHeader;
