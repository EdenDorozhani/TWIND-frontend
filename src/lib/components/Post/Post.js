import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import TextButton from "../TextButton";
import { useState } from "react";
import { getPassedTime, textTruncation } from "./helpers";
import PostHeader from "../PostHeader";
import Description from "../Description";
import useLikeAction from "../../../hooks/useLikeAction";

const Post = ({
  author,
  caption,
  postImg,
  postId,
  location,
  userImg,
  createdAt,
  likes,
  likedByUser,
  onPostModal,
  commentsCount,
  userId,
  openLikesModal,
  onUsernamesClick,
  onDotsIconClick,
  creatorId,
}) => {
  const [fullContent, setFullContent] = useState(false);
  const { isLiked, likeCount, toggleLike } = useLikeAction({
    id: postId,
    likedByUser,
    likes,
    userId: userId,
    type: "updatePostLikes",
  });

  const textButtonAction = () => {
    setFullContent(true);
  };

  const textTruncated = textTruncation(caption, fullContent, textButtonAction);
  const passedTime = getPassedTime(createdAt);

  const onMessageClick = () => {
    onPostModal(postId, isLiked, likeCount);
  };

  const onOpenModal = () => {
    openLikesModal(postId);
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#eef7ed",
        borderRadius: "15px",
        width: "400px",
      }}
    >
      <FlexBox direction={"column"} gap={"medium"}>
        <PostHeader
          author={author}
          location={location}
          passedTime={passedTime}
          userImg={userImg}
          onUserClickAction={() => onUsernamesClick(author)}
          onIconClick={() => onDotsIconClick(postId)}
          creatorId={creatorId}
          userId={userId}
        />
        <img
          style={{ height: "410px", width: "100%", objectFit: "cover" }}
          src={postImg}
        />
        <FlexBox gap={"large"}>
          <Icon
            iconName={isLiked === "1" ? faHeartSolid : faHeartRegular}
            action={toggleLike}
            size={"m"}
            type={"button"}
          />
          <Icon
            iconName={faComment}
            size={"m"}
            type={"button"}
            action={onMessageClick}
          />
        </FlexBox>
        <FlexBox direction={"column"} gap={"small"}>
          <FlexBox>
            <TextButton
              content={likeCount === 0 ? "" : `${likeCount} likes`}
              action={onOpenModal}
            />
          </FlexBox>
          <Description
            author={author}
            textTruncated={textTruncated}
            action={() => onUsernamesClick(author)}
          />
          <TextButton
            content={
              commentsCount !== 0 ? `View all ${commentsCount} comments` : ""
            }
            color={"fade"}
            action={onMessageClick}
          />
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default Post;
