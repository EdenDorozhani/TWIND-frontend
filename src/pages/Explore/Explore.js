import { useEffect } from "react";
import useMultipleData from "../../hooks/useMultipleData";
import FlexBox from "../../lib/components/FlexBox";
import SearchBar from "../../lib/components/InputTypes/SearchBar/SearchBar";
import PostsGrid from "../../lib/components/PostsGrid";
import User from "../../lib/components/User";
import FlatList from "../../lib/components/util/FlatList";
import { useState } from "react";
import { getMultipleData } from "../../hooks/useMultipleData/useMultipleData.action";
import { BASE_URL } from "../../axiosConfig";
import useLoggedInUser from "../../context/useLoggedInUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EndlessScroll from "../../lib/components/EndlessScroll";

const Explore = () => {
  const [filteredUsers, setFilteredUsers] = useState({ data: [], module: "" });
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filteredUsersPage, setFilteredUsersPage] = useState(1);
  const [isLoadingFilteredUsers, setIsLoadingFilteredUsers] = useState(false);
  const { userLoggedInData } = useLoggedInUser();
  const navigate = useNavigate();

  const {
    data: explorePosts,
    getDataPagination: getExplorePosts,
    isLoading: isLoadingExplorePosts,
  } = useMultipleData({
    pageSize: 8,
    path: "getExplorePostsData",
  });

  const fetchFilteredUsersData = async (page = null) => {
    const url =
      BASE_URL +
      `/getFollowers?page=${page || filteredUsersPage}&pageSize=${5}`;
    try {
      setIsLoadingFilteredUsers(true);
      const response = await getMultipleData(url);
      if (!page) {
        setFilteredUsersPage(filteredUsersPage + 1);
        setFilteredUsers({
          data: [...filteredUsers.data, ...response.data.response.data],
          module: response.data.response.module,
        });
      } else {
        setFilteredUsers({
          data: response.data.response.data,
          module: response.data.response.module,
        });
      }
      setIsLoadingFilteredUsers(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExplorePosts();
  }, []);

  useEffect(() => {
    if (searchBarValue === 0) return;
    fetchFilteredUsersData(1);
  }, [searchBarValue]);

  const onSearchBarChange = (value) => {
    setSearchBarValue(value);
  };

  const updateFollowers = async (isFollow, id) => {
    try {
      await postFollowers(userLoggedInData.userId, id, isFollow);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onUserClick = (username) => {
    navigate(`${username}`);
  };

  return (
    <div>
      <FlexBox direction={"column"}>
        <div>
          <SearchBar
            onSearchBarChange={onSearchBarChange}
            inputValue={searchBarValue}
          />
          <FlexBox direction={"column"}>
            <EndlessScroll
              loadMore={() => fetchFilteredUsersData()}
              dataLength={filteredUsers.data.length}
              isLoading={isLoadingFilteredUsers}
              useWindow={false}
              totalCount={filteredUsers.data[0].filteredUsersCount}
            >
              <div style={{ height: "400px" }}>
                <FlatList
                  data={filteredUsers.data}
                  renderItem={(user) => (
                    <User
                      key={user.followId}
                      data={user}
                      onUserClick={onUserClick}
                      userId={userLoggedInData.userId}
                      updateFollowers={updateFollowers}
                      type={"Followers"}
                    />
                  )}
                />
              </div>
            </EndlessScroll>
          </FlexBox>
        </div>
        <EndlessScroll
          loadMore={() => getExplorePosts()}
          dataLength={explorePosts.data.length}
          isLoading={isLoadingExplorePosts}
          useWindow={false}
          totalCount={explorePosts.count}
        >
          <FlexBox wrap gap={"small"}>
            <FlatList
              data={explorePosts.data}
              renderItem={(post) => (
                <PostsGrid
                  key={post.postId}
                  postId={post.postId}
                  imageUrl={formatImgUrl(post.postImage)}
                  commentCount={post.comments}
                  likeCount={post.likeCount}
                  action={onOpenPost}
                />
              )}
            />
          </FlexBox>
        </EndlessScroll>
      </FlexBox>
    </div>
  );
};

export default Explore;
