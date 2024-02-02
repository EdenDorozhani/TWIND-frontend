import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../FlatList";
import ScrollPagination from "../ScrollPagination";
import SearchBar from "../InputTypes/SearchBar/SearchBar";
import UserListElement from "../UserListElement";

const UsersList = ({
  shouldInterruptScroll,
  onUserClick,
  configurationData,
  userId,
  updateFollowers,
  inputValue,
  onSearchBarChange,
  type,
  updateFollowingCount,
}) => {
  const module = type ? type : configurationData.paginationData.module;

  return (
    <>
      <div
        style={{
          borderBottom: "1px solid green",
        }}
      >
        <FlexBox justifyContent={"center"} padding={"s"}>
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
        <ScrollPagination
          loadMore={shouldInterruptScroll}
          dataLength={configurationData.paginationData.data.length}
          isLoading={configurationData.isLoading}
          totalCount={configurationData.paginationData.count}
          useWindow={false}
        >
          <FlexBox direction={"column"} padding={"m"} gap={"m"}>
            {configurationData.paginationData.data.length === 0 ? (
              <FlexBox justifyContent={"center"}>
                <SimpleText content={`No ${module}.`} />
              </FlexBox>
            ) : null}
            <FlatList
              data={configurationData.paginationData.data}
              renderItem={(curr) => (
                <UserListElement
                  key={module === "Followers" ? curr.followId : curr.likeId}
                  data={curr}
                  onUserClick={onUserClick}
                  userId={userId}
                  updateFollowers={updateFollowers}
                  type={module}
                  updateFollowingCount={updateFollowingCount}
                />
              )}
            />
          </FlexBox>
        </ScrollPagination>
      </div>
    </>
  );
};

export default UsersList;
