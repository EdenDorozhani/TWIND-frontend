import {
  faEllipsis,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";
import { getPassedTime } from "../Post/helpers";
import Description from "../Description";
import useLikeAction from "../../../hooks/useLikeAction";
import { useState } from "react";
import FlatList from "../util/FlatList";
import { formatImgUrl } from "../../helpers";

const Comment = ({
  author,
  caption,
  commentLikes,
  likedByUser,
  passedTime,
  avatarSrc,
  userId,
  commentId,
  onReply,
  handleReplyClick,
  reply,
  openCommentsLikesModal,
  onCommentIconClick,
  authorId,
  onShowReplies,
  repliesData,
  repliesCount,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLiked, likeCount, toggleLike } = useLikeAction({
    likedByUser: likedByUser || "0",
    likes: commentLikes || 0,
    id: commentId,
    userId,
    type: "updateCommentLikes",
  });

  const replyAction = () => {
    onReply(author, commentId);
    handleReplyClick();
  };

  const commentLikesAction = () => {
    openCommentsLikesModal(commentId);
  };

  const textButtonContent = `- ${
    isVisible && repliesData?.length == repliesCount
      ? "Hide replies"
      : `View replies(${
          isVisible ? repliesCount - repliesData?.length : repliesCount
        })`
  }`;

  const onShowRepliesHandler = () => {
    if (isVisible === true && repliesData?.length == repliesCount) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      onShowReplies(commentId);
    }
  };

  return (
    <>
      {!reply && (
        <FlexBox direction={"column"}>
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
              {!repliesCount ? null : (
                <FlexBox style={{ padding: "0px 50px" }}>
                  <TextButton
                    content={textButtonContent}
                    size={"s"}
                    color={"fade"}
                    action={onShowRepliesHandler}
                  />
                </FlexBox>
              )}{" "}
            </FlexBox>
            <Icon
              iconName={isLiked === "1" ? faHeartSolid : faHeartRegular}
              type={"button"}
              action={toggleLike}
            />
          </FlexBox>

          {isVisible ? (
            <FlexBox direction={"column"} style={{ padding: "5px 25px" }}>
              <FlatList
                data={repliesData}
                renderItem={(comment) => (
                  <Comment
                    key={comment.commentId}
                    userId={userId}
                    avatarSrc={formatImgUrl(comment.userImgURL)}
                    passedTime={getPassedTime(comment.createdAt)}
                    author={comment.username}
                    caption={comment.description}
                    commentId={commentId}
                    commentLikes={comment.commentsLikeCount}
                    likedByUser={comment.likedByUser}
                    handleReplyClick={handleReplyClick}
                    openCommentsLikesModal={openCommentsLikesModal}
                    repliesData={repliesData}
                  />
                )}
              />
            </FlexBox>
          ) : null}
        </FlexBox>
      )}
    </>
  );
};

export default Comment;
