import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";
import EndlessScroll from "../EndlessScroll";
import SearchBar from "../InputTypes/SearchBar/SearchBar";
import User from "../User/User";

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
      <SearchBar
        inputValue={inputValue}
        onSearchBarChange={onSearchBarChange}
      />
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
