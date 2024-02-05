import { useEffect } from "react";
import usePaginationData from "../../hooks/usePaginationData";
import FlexBox from "../../lib/components/FlexBox";
import SearchBar from "../../lib/components/InputTypes/SearchBar/SearchBar";
import PostsGrid from "../../lib/components/PostsGrid";
import UserListElement from "../../lib/components/UserListElement";
import FlatList from "../../lib/components/FlatList";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollPagination from "../../lib/components/ScrollPagination";
import { postFollowers } from "../Home/Home.actions";
import SimpleText from "../../lib/components/SimpleText";
import useFilteredPaginationData from "../../hooks/useFilteredPaginationData/useFilteredPaginationData";
import { motion } from "framer-motion";
import Spinner from "../../lib/components/Spinner";

const Explore = () => {
  const { userLoggedInData } = useLoggedInUser();
  const navigate = useNavigate();

  const { costumeData: allPosts } = usePaginationData({
    pageSize: 2,
    path: "getAllPosts",
  });

  const { filteredPaginationData } = useFilteredPaginationData({
    userLoggedIn: userLoggedInData.userId,
    pageSize: 12,
    path: "getAllUsers",
  });

  useEffect(() => {
    allPosts.getDataPagination({});
  }, []);

  const onSearchBarChange = (value) => {
    filteredPaginationData.getSearchBarValue(value);
  };

  const updateFollowers = async (isFollow, id) => {
    try {
      await postFollowers(userLoggedInData.userId, id, isFollow);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const navigateToUserProfile = (username) => {
    navigate(`/twind/${username}`);
  };

  const onPostsClick = (postId) => {
    navigate(`p/${postId}`);
  };

  return (
    <div
      style={{
        marginLeft: "371px",
        height: "100%",
        position: "relative",
      }}
    >
      <FlexBox direction={"column"}>
        <SearchBar
          onSearchBarChange={onSearchBarChange}
          inputValue={filteredPaginationData.searchBarValue}
        />
        {filteredPaginationData.scrollCondition && (
          <FlexBox direction={"column"}>
            <div
              style={{
                height: "260px",
                overflowY: "scroll",
                backgroundColor: "white",
                position: "absolute",
                marginLeft: "20px",
                width: "97%",
                zIndex: 100000,
                borderRadius: "15px",
              }}
            >
              {!filteredPaginationData.isLoading ? (
                <>
                  {filteredPaginationData.filteredData.isEmpty ? (
                    <SimpleText
                      content={"No users with this username."}
                      style={{ textAlign: "center" }}
                      size={"m"}
                    />
                  ) : (
                    <FlexBox
                      direction={"column"}
                      padding={"m"}
                      gap={"m"}
                      justifyContent={"center"}
                    >
                      <FlatList
                        data={filteredPaginationData.filteredData.data}
                        renderItem={(user) => (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              border: "1px solid green",
                              padding: "15px",
                              borderRadius: "10px",
                            }}
                            key={user.userId}
                          >
                            <UserListElement
                              data={user}
                              onUserClick={navigateToUserProfile}
                              userId={userLoggedInData.userId}
                              updateFollowers={updateFollowers}
                              type={"Users"}
                            />
                          </motion.div>
                        )}
                      />
                    </FlexBox>
                  )}
                </>
              ) : (
                <Spinner isVisible={true} size={"xl"} />
              )}
            </div>
          </FlexBox>
        )}
        <ScrollPagination
          loadMore={() => allPosts.getDataPagination({})}
          dataLength={allPosts.paginationData.data.length}
          isLoading={allPosts.isLoading}
          totalCount={allPosts.paginationData.count}
          withTransition={true}
          useWindow={true}
        >
          <FlexBox wrap gap={"s"} justifyContent={"center"}>
            <FlatList
              data={allPosts.paginationData.data}
              renderItem={(post) => (
                <PostsGrid
                  key={post.postId}
                  postData={post}
                  action={onPostsClick}
                />
              )}
            />
          </FlexBox>
        </ScrollPagination>
      </FlexBox>
    </div>
  );
};

export default Explore;
