import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";
import Avatar from "../Avatar";
import TextButton from "../TextButton";
import Button from "../Button";
import { formatImgUrl } from "../../helpers";
import EndlessScroll from "../EndlessScroll";

const UsersList = ({
  type,
  shouldInterrupt,
  count,
  data,
  onUserClick,
  isLoading,
}) => {
  return (
    <>
      <FlexBox justifyContent={"center"} padding={"small"}>
        <SimpleText content={type} fontWeight={"bolder"} />
      </FlexBox>
      <EndlessScroll
        loadMore={shouldInterrupt}
        dataLength={data.length}
        isLoading={isLoading}
        totalCount={count}
      >
        <div
          style={{
            overflowY: "auto",
            borderTop: "1px solid green",
            height: "340px",
          }}
        >
          <FlexBox direction={"column"} padding={"medium"} gap={"medium"}>
            <FlatList
              data={data}
              renderItem={(like) => (
                <FlexBox
                  key={like.likeId}
                  alignItems={"center"}
                  gap={"large"}
                  justifyContent={"between"}
                >
                  <FlexBox gap={"medium"} alignItems={"center"}>
                    <Avatar
                      size={"m"}
                      src={formatImgUrl(like.userImgURL)}
                      onClickAction={() => onUserClick(like.username)}
                    />
                    <FlexBox direction={"column"}>
                      <TextButton
                        content={like.username}
                        size={"s"}
                        action={() => onUserClick(like.username)}
                      />
                      <SimpleText
                        content={like.country}
                        color={"fade"}
                        size={"s"}
                      />
                    </FlexBox>
                  </FlexBox>
                  <Button content={"Follow"} />
                </FlexBox>
              )}
            />
          </FlexBox>
        </div>
      </EndlessScroll>
    </>
  );
};

export default UsersList;
