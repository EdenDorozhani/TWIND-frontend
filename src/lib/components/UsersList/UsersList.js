import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";
import Avatar from "../Avatar";
import TextButton from "../TextButton";
import Button from "../Button";
import { formatImgUrl } from "../../helpers";
import EndlessScroll from "../EndlessScroll";
import { useState } from "react";
import SearchBar from "../InputTypes/SearchBar/SearchBar";

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

const UsersList = ({
  type,
  shouldInterrupt,
  count,
  data,
  onUserClick,
  isLoading,
  userId,
  updateFollowers,
  inputValue,
  onSearchBarChange,
}) => {
  return (
    <>
      <div
        style={{
          borderBottom: "1px solid green",
        }}
      >
        <FlexBox justifyContent={"center"} padding={"small"}>
          <SimpleText content={type} fontWeight={"bolder"} />
        </FlexBox>
      </div>
      {/* <SearchBar
        inputValue={inputValue}
        onSearchBarChange={onSearchBarChange}
      /> */}
      <EndlessScroll
        loadMore={shouldInterrupt}
        dataLength={data.length}
        isLoading={isLoading}
        totalCount={count}
      >
        <div
          style={{
            overflowY: "auto",
            height: "340px",
          }}
        >
          <FlexBox direction={"column"} padding={"medium"} gap={"medium"}>
            {data.length === 0 ? (
              <FlexBox justifyContent={"center"}>
                <SimpleText content={`No ${type}.`} />
              </FlexBox>
            ) : null}
            <FlatList
              data={data}
              renderItem={(curr) => (
                <User
                  key={type === "Followers" ? curr.followId : curr.likeId}
                  data={curr}
                  onUserClick={onUserClick}
                  userId={userId}
                  updateFollowers={updateFollowers}
                  type={type}
                />
              )}
            />
          </FlexBox>
        </div>
      </EndlessScroll>
    </>
  );
};

export default UsersList;
