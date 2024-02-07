import FlexBox from "../FlexBox";
import SimpleText from "../SimpleText";
import FlatList from "../FlatList";
import ScrollPagination from "../ScrollPagination";
import SearchBar from "../InputTypes/SearchBar/SearchBar";
import Spinner from "../Spinner";
import { motion } from "framer-motion";
import UsersListElement from "../UsersListElement";

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
          position: "relative",
        }}
      >
        <ScrollPagination
          loadMore={shouldInterruptScroll}
          dataLength={configurationData.paginationData.data.length}
          isLoading={configurationData.isLoading}
          totalCount={
            inputValue
              ? configurationData.paginationData.data.length
              : configurationData.paginationData.count
          }
          useWindow={false}
        >
          <FlexBox direction={"column"} padding={"m"} gap={"l"}>
            {configurationData.paginationData.isEmpty ? (
              <FlexBox justifyContent={"center"}>
                <SimpleText content={`No ${module}.`} />
              </FlexBox>
            ) : null}

            <FlatList
              data={configurationData.paginationData.data}
              renderItem={(curr) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  key={module === "Followers" ? curr.followId : curr.likeId}
                >
                  <UsersListElement
                    data={curr}
                    onUserClick={onUserClick}
                    userId={userId}
                    updateFollowers={updateFollowers}
                    type={module}
                    updateFollowingCount={updateFollowingCount}
                  />
                </motion.div>
              )}
            />
          </FlexBox>
        </ScrollPagination>
      </div>
    </>
  );
};

export default UsersList;
