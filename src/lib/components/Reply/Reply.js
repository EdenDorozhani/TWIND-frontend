import {
  faEllipsis,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";
import Description from "../Description";

const Reply = ({
  author,
  caption,
  avatarSrc,
  passedTime,
  onReply,
  likeCount,
  openCommentsLikesModal,
  isLiked,
  toggleLike,
  authorId,
  userId,
  handleReplyClick,
  commentId,
  onCommentIconClick,
}) => {
  const replyAction = () => {
    onReply(author, commentId);
    handleReplyClick();
  };

  const commentLikesAction = () => {
    openCommentsLikesModal(commentId);
  };

  return (
    <FlexBox gap={"medium"} padding={"small"} justifyContent={"between"}>
      <FlexBox direction={"column"}>
        <Description
          author={author}
          description={caption}
          avatarSrc={avatarSrc}
        />
        <FlexBox gap={"medium"} padding={"small"}>
          <SimpleText
            content={passedTime}
            size={"s"}
            color={"fade"}
            style={{ wordBreak: "keep-all" }}
          />
          <TextButton
            content={"reply"}
            size={"s"}
            color={"fade"}
            action={replyAction}
          />
          <TextButton
            content={!likeCount ? "" : `${likeCount} like`}
            size={"s"}
            color={"fade"}
            action={commentLikesAction}
          />
          {authorId === userId && (
            <Icon
              iconName={faEllipsis}
              type={"button"}
              action={onCommentIconClick}
              color={"fade"}
            />
          )}
        </FlexBox>
      </FlexBox>
      <Icon
        iconName={isLiked === "1" ? faHeartSolid : faHeartRegular}
        type={"button"}
        action={toggleLike}
      />
    </FlexBox>
  );
};

export default Reply;
