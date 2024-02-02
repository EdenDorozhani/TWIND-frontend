import {
  faEllipsis,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import SimpleText from "../SimpleText";
import TextButton from "../TextButton";
import { getPassedTime } from "../../helpers";
import Description from "../Description";
import { useState } from "react";
import FlatList from "../FlatList";
import { formatImgUrl } from "../../helpers";

const Comment = ({
  comments,
  userId,
  onReply,
  handleReplyClick,
  openCommentsLikesModal,
  onShowReplies,
  repliesData,
  onOpenActionsModal,
  onUserClickAction,
  updateLikes,
  replyId,
  parentCommentId,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(comments.likedByUser || "0");
  const [likeCount, setLikeCount] = useState(comments.commentsLikeCount || 0);

  const toggleLike = () => {
    if (isLiked === "0") {
      setLikeCount(likeCount + 1);
      setIsLiked("1");
    } else {
      setLikeCount(likeCount - 1);
      setIsLiked("0");
    }
    updateLikes(replyId || parentCommentId, isLiked);
  };

  const replyAction = () => {
    onReply(comments.username, parentCommentId);
    handleReplyClick();
  };

  const commentLikesAction = () => {
    openCommentsLikesModal(replyId || parentCommentId);
  };

  const conditinTextButton =
    isVisible && repliesData?.length == comments.totalReplies;

  const textButtonContent = `- ${
    conditinTextButton
      ? "Hide replies"
      : `View replies(${
          isVisible && !!repliesData
            ? comments.totalReplies - repliesData?.length
            : comments.totalReplies
        })`
  }`;
  const onShowRepliesHandler = () => {
    if (isVisible === true && repliesData?.length == comments.totalReplies) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      onShowReplies(parentCommentId, comments.totalReplies);
    }
  };
  console.log(isVisible);
  return (
    <>
      <FlexBox direction={"column"}>
        <FlexBox gap={"m"} padding={"s"} justifyContent={"between"}>
          <FlexBox direction={"column"}>
            <Description
              author={comments.username}
              description={comments.description}
              avatarSrc={formatImgUrl(comments.userImgURL)}
              action={() => onUserClickAction(comments.username)}
            />
            <FlexBox gap={"m"} padding={"s"}>
              <SimpleText
                content={getPassedTime(comments.createdAt)}
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
                noBreak
              />
              {comments.userId === userId && (
                <Icon
                  iconName={faEllipsis}
                  type={"button"}
                  action={() => onOpenActionsModal(parentCommentId, replyId)}
                  color={"fade"}
                />
              )}
            </FlexBox>
            {!comments.totalReplies ? null : (
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
          <FlexBox direction={"column"} style={{ padding: "5px 20px" }}>
            <FlatList
              data={repliesData}
              renderItem={(replies) => (
                <Comment
                  key={replies.commentId}
                  comments={replies}
                  replyId={replies.commentId}
                  userId={userId}
                  parentCommentId={comments.commentId}
                  handleReplyClick={handleReplyClick}
                  openCommentsLikesModal={openCommentsLikesModal}
                  repliesData={repliesData}
                  onReply={onReply}
                  onOpenActionsModal={onOpenActionsModal}
                  onUserClickAction={onUserClickAction}
                  updateLikes={updateLikes}
                />
              )}
            />
          </FlexBox>
        ) : null}
      </FlexBox>
    </>
  );
};

export default Comment;
