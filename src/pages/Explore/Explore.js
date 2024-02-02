import { useEffect } from "react";
import usePaginationData from "../../hooks/usePaginationData";
import FlexBox from "../../lib/components/FlexBox";
import SearchBar from "../../lib/components/InputTypes/SearchBar/SearchBar";
import PostsGrid from "../../lib/components/PostsGrid";
import UserListElement from "../../lib/components/UserListElement";
import FlatList from "../../lib/components/FlatList";
import useLoggedInUser from "../../context/useLoggedInUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollPagination from "../../lib/components/ScrollPagination";
import { postFollowers } from "../Home/Home.actions";
import SimpleText from "../../lib/components/SimpleText";
import useFilteredPaginationData from "../../hooks/useFilteredPaginationData/useFilteredPaginationData";

const Explore = () => {
  const { userLoggedInData } = useLoggedInUser();
  const navigate = useNavigate();

  const { costumeData: allPosts } = usePaginationData({
    pageSize: 2,
    path: "getAllPosts",
  });

  const { filteredPaginationData } = useFilteredPaginationData({
    userLoggedIn: userLoggedInData.userId,
    pageSize: 3,
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
      }}
    >
      <FlexBox direction={"column"}>
        <SearchBar
          onSearchBarChange={onSearchBarChange}
          inputValue={filteredPaginationData.searchBarValue}
        />
        {filteredPaginationData.scrollCondition && (
          <FlexBox direction={"column"}>
            <ScrollPagination
              dataLength={filteredPaginationData.filteredData.data.length}
              loadMore={() => filteredPaginationData.getFilteredData({})}
              isLoading={filteredPaginationData.isLoading}
              totalCount={filteredPaginationData.filteredData.count}
              useWindow={false}
            >
              <div
                style={{
                  maxHeight: "500px",
                  minHeight: "30px",
                  overflowY: "scroll",
                  backgroundColor: "white",
                  position: "absolute",
                  marginLeft: "20px",
                  width: "calc(100% - 405px)",
                  zIndex: 100000,
                  borderRadius: "15px",
                }}
              >
                {filteredPaginationData.filteredData.isEmpty ? (
                  <SimpleText
                    content={"No users with this username."}
                    style={{ textAlign: "center" }}
                  />
                ) : (
                  <FlexBox direction={"column"} padding={"m"} gap={"m"}>
                    {!filteredPaginationData.isLoading && (
                      <FlatList
                        data={filteredPaginationData.filteredData.data}
                        renderItem={(user) => (
                          <div
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
                          </div>
                        )}
                      />
                    )}
                  </FlexBox>
                )}
              </div>
            </ScrollPagination>
          </FlexBox>
        )}
        <ScrollPagination
          loadMore={() => allPosts.getDataPagination({})}
          dataLength={allPosts.paginationData.data.length}
          isLoading={allPosts.isLoading}
          totalCount={allPosts.paginationData.count}
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
