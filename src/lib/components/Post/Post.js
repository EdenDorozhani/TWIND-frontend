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
import { formatImgUrl } from "../../helpers";

const Post = ({
  onPostModal,
  userId,
  openLikesModal,
  onUsernamesClick,
  onDotsIconClick,
  postData,
  updateLikes,
}) => {
  const [fullContent, setFullContent] = useState(false);
  const [isLiked, setIsLiked] = useState(postData.likedByUser || "0");
  const [likesCount, setLikeCount] = useState(postData.likesCount || 0);

  const toggleLike = () => {
    if (isLiked === "0") {
      setLikeCount(likesCount + 1);
      setIsLiked("1");
    } else {
      setLikeCount(likesCount - 1);
      setIsLiked("0");
    }
    updateLikes(postData.postId, isLiked);
  };

  const textButtonAction = () => {
    setFullContent(true);
  };

  const textTruncated = textTruncation(
    postData.caption,
    fullContent,
    textButtonAction
  );
  const passedTime = getPassedTime(postData.createdAt);

  const onMessageClick = () => {
    onPostModal(postData.postId);
  };

  const onOpenModal = () => {
    openLikesModal(postData.postId);
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
          author={postData.username}
          location={postData.location}
          passedTime={passedTime}
          userImg={formatImgUrl(postData.userImgURL)}
          onUserClickAction={() => onUsernamesClick(postData.username)}
          onIconClick={() => onDotsIconClick(postData.postId)}
          creatorId={postData.creatorId}
          userId={userId}
        />
        <img
          style={{ height: "410px", width: "100%", objectFit: "cover" }}
          src={formatImgUrl(postData.postImage)}
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
              content={likesCount === 0 ? "" : `${likesCount} likes`}
              action={onOpenModal}
            />
          </FlexBox>
          <Description
            author={postData.username}
            textTruncated={textTruncated}
            action={() => onUsernamesClick(postData.username)}
          />
          <TextButton
            content={
              postData.commentsCount !== 0
                ? `View all ${postData.commentsCount} comments`
                : ""
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
