import { useState } from "react";
import FlexBox from "../FlexBox";
import Avatar from "../Avatar";
import TextButton from "../TextButton";
import SimpleText from "../SimpleText";
import Button from "../Button";

const User = ({ data, onUserClick, userId, updateFollowers, type }) => {
  const [isFollow, setIsFollow] = useState(data.followedByUser || "0");

  const toggleFollow = () => {
    if (isFollow === "0") {
      setIsFollow("1");
    } else {
      setIsFollow("0");
    }
    updateFollowers(isFollow, data.followingId);
  };

  let condition;

  if (type === "Followers") {
    condition = data.followingId !== userId;
  } else {
    condition = data.userId !== userId;
  }
  return (
    <FlexBox
      key={data.likeId}
      alignItems={"center"}
      gap={"large"}
      justifyContent={"between"}
    >
      <FlexBox gap={"medium"} alignItems={"center"}>
        <Avatar
          size={"m"}
          src={formatImgUrl(data.userImgURL)}
          onClickAction={() => onUserClick(data.username)}
        />
        <FlexBox direction={"column"}>
          <TextButton
            content={data.username}
            size={"s"}
            action={() => onUserClick(data.username)}
          />
          <SimpleText content={data.country} color={"fade"} size={"s"} />
        </FlexBox>
      </FlexBox>
      {condition && (
        <Button
          content={isFollow === "0" ? "Follow" : "Following"}
          color={isFollow === "0" ? "" : "gray"}
          action={toggleFollow}
        />
      )}
    </FlexBox>
  );
};

export default User;
