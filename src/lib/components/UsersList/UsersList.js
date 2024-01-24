import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../util/FlatList";
import EndlessScroll from "../EndlessScroll";
import SearchBar from "../InputTypes/SearchBar/SearchBar";
import User from "../User/User";

const UsersList = ({
  shouldInterrupt,
  onUserClick,
  isLoading,
  userId,
  updateFollowers,
  inputValue,
  onSearchBarChange,
  responseData,
  type,
}) => {
  const module = type ? type : responseData.module;

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid green",
        }}
      >
        <FlexBox justifyContent={"center"} padding={"small"}>
          <SimpleText content={module} fontWeight={"bolder"} />
        </FlexBox>
      </div>
      {module === "Followers" && (
        <SearchBar
          inputValue={inputValue}
          onSearchBarChange={onSearchBarChange}
        />
      )}
      <div
        style={{
          height: "340px",
          overflowY: "scroll",
        }}
      >
        <EndlessScroll
          useWindow={false}
          loadMore={shouldInterrupt}
          dataLength={responseData.data.length}
          isLoading={isLoading}
          totalCount={responseData.count}
        >
          <FlexBox direction={"column"} padding={"medium"} gap={"medium"}>
            {responseData.data.length === 0 ? (
              <FlexBox justifyContent={"center"}>
                <SimpleText content={`No ${module}.`} />
              </FlexBox>
            ) : null}
            <FlatList
              data={responseData.data}
              renderItem={(curr) => (
                <User
                  key={module === "Followers" ? curr.followId : curr.likeId}
                  data={curr}
                  onUserClick={onUserClick}
                  userId={userId}
                  updateFollowers={updateFollowers}
                  type={module}
                />
              )}
            />
          </FlexBox>
        </EndlessScroll>
      </div>
    </>
  );
};

export default UsersList;
