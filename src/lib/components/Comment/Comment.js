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
  authorId,
  onShowReplies,
  repliesData,
  repliesCount,
  onDotsIconClick,
  replyId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { isLiked, likeCount, toggleLike } = useLikeAction({
    likedByUser: likedByUser || "0",
    likes: commentLikes || 0,
    id: replyId || commentId,
    userId,
    type: "updateCommentLikes",
  });

  const replyAction = () => {
    onReply(author, commentId);
    handleReplyClick();
  };

  const commentLikesAction = () => {
    openCommentsLikesModal(replyId || commentId);
  };

  const conditinTextButton = isVisible && repliesData?.length == repliesCount;

  const textButtonContent = `- ${
    conditinTextButton
      ? "Hide replies"
      : `View replies(${
          isVisible && !!repliesData
            ? repliesCount - repliesData?.length
            : repliesCount
        })`
  }`;
  const onShowRepliesHandler = () => {
    if (isVisible === true && repliesData?.length == repliesCount) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      onShowReplies(commentId, repliesCount);
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
                  noBreak
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
                    action={() => onDotsIconClick(commentId, replyId)}
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
                    replyId={comment.commentId}
                    commentLikes={comment.commentsLikeCount}
                    likedByUser={comment.likedByUser}
                    handleReplyClick={handleReplyClick}
                    openCommentsLikesModal={openCommentsLikesModal}
                    repliesData={repliesData}
                    onReply={onReply}
                    authorId={comment.userId}
                    onDotsIconClick={onDotsIconClick}
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
