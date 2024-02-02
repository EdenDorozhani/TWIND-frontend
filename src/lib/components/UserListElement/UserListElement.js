import { useState } from "react";
import FlexBox from "../FlexBox";
import Avatar from "../Avatar";
import TextButton from "../TextButton";
import SimpleText from "../SimpleText";
import Button from "../Button";
import { formatImgUrl } from "../../helpers";
import { motion } from "framer-motion";

const UserListElement = ({
  data,
  onUserClick,
  userId,
  updateFollowers,
  type,
  updateFollowingCount,
}) => {
  const [isFollow, setIsFollow] = useState(data.followedByUser || "0");

  let identifier;
  if (type === "Followers") {
    identifier = data.followingId;
  } else {
    identifier = data.userId;
  }

  const toggleFollow = () => {
    if (isFollow === "0") {
      setIsFollow("1");
    } else {
      setIsFollow("0");
    }
    !!updateFollowingCount && updateFollowingCount(isFollow);
    updateFollowers(isFollow, identifier);
  };

  const condition = identifier !== userId;

  return (
    <FlexBox alignItems={"center"} gap={"l"} justifyContent={"between"}>
      <FlexBox gap={"m"} alignItems={"center"}>
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

export default UserListElement;
