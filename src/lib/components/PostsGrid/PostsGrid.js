import { useState } from "react";
import SimpleText from "../SimpleText";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatImgUrl } from "../../helpers";

const PostsGrid = ({ action, postData }) => {
  const [isShown, setIsShown] = useState(false);

  const onOpenPost = () => {
    action(postData.postId);
  };

  return (
    <div
      style={{
        flex: "0 0 calc(31%)",
        position: "relative",
        height: "430px",
      }}
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      onClick={onOpenPost}
    >
      {isShown && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <FlexBox alignItems={"center"}>
            <Icon color={"white"} iconName={faHeart} />
            <SimpleText
              content={postData.likesCount}
              color={"white"}
              fontWeight={"bolder"}
            />
          </FlexBox>
          <FlexBox>
            <Icon color={"white"} iconName={faComment} />
            <SimpleText content={postData.commentsCount} color={"white"} />
          </FlexBox>
        </div>
      )}
      <img
        src={formatImgUrl(postData.postImage)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default PostsGrid;
