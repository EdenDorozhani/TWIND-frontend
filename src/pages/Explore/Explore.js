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
import { postFollowers } from "../Home/Home.actions";
import SimpleText from "../../lib/components/SimpleText";

const Explore = () => {
  const [filteredFollowersData, setFilteredFollowersData] = useState({
    data: [],
    module: "",
    count: null,
  });
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filterFollowersPage, setFilterFollowersPage] = useState(1);
  const { userLoggedInData } = useLoggedInUser();
  const navigate = useNavigate();

  const { multipleData: allPosts } = useMultipleData({
    pageSize: 8,
    path: "getAllPosts",
  });

  const fetchFilteredFollowers = async (page) => {
    if (searchBarValue.length === 0) return;
    setIsLoadingFiltered(true);
    const url =
      BASE_URL +
      `/getAllUsers?page=${
        page ? 1 : filterFollowersPage
      }&pageSize=${3}&value=${searchBarValue}&identifier=${
        userLoggedInData.username
      }`;
    try {
      const response = await getMultipleData(url);
      setFilteredFollowersData((prevState) => ({
        data: page
          ? response.data.response.data
          : [...prevState.data, ...response.data.response.data],
        module: response.data.response.module,
        count: response.data.response.count,
      }));
      setFilterFollowersPage((prevPage) => prevPage + 1);
      setIsLoadingFiltered(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allPosts.getDataPagination();
  }, []);

  useEffect(() => {
    if (searchBarValue.length === 0) {
      setFilteredFollowersData({
        data: [],
        module: "",
        count: null,
      });
      return;
    }
    setFilterFollowersPage(1);
    fetchFilteredFollowers(1);
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
    navigate(`/twind/${username}`);
  };

  const onPostsClick = (postId) => {
    navigate(`p/${postId}`);
  };

  const isUsersListVisible = searchBarValue.length !== 0;
  return (
    <div
      style={{
        marginLeft: "371px",
        backgroundColor: "rgb(220,220,220)",
      }}
    >
      <FlexBox direction={"column"}>
        <div>
          <SearchBar
            onSearchBarChange={onSearchBarChange}
            inputValue={searchBarValue}
          />
          {isUsersListVisible && (
            <FlexBox direction={"column"}>
              <EndlessScroll
                loadMore={() => fetchFilteredFollowers()}
                dataLength={filteredFollowersData.data.length}
                isLoading={isLoadingFiltered}
                useWindow={false}
                totalCount={filteredFollowersData.count}
              >
                <div
                  style={{
                    height: "300px",
                    backgroundColor: "white",
                    overflowY: "auto",
                    position: "absolute",
                    marginLeft: "30px",
                    width: "79%",
                    zIndex: 100000,
                    borderRadius: "15px",
                  }}
                >
                  {filteredFollowersData.data.length === 0 ? (
                    <SimpleText
                      content={"No users with this username."}
                      style={{ textAlign: "center" }}
                    />
                  ) : (
                    <FlexBox
                      direction={"column"}
                      padding={"medium"}
                      gap={"medium"}
                    >
                      <FlatList
                        data={filteredFollowersData.data}
                        renderItem={(user) => (
                          <User
                            key={user.followId}
                            data={user}
                            onUserClick={onUserClick}
                            userId={userLoggedInData.userId}
                            updateFollowers={updateFollowers}
                            type={"Users"}
                          />
                        )}
                      />
                    </FlexBox>
                  )}
                </div>
              </EndlessScroll>
            </FlexBox>
          )}
        </div>
        <EndlessScroll
          loadMore={() => allPosts.getDataPagination()}
          dataLength={allPosts.responseData.data.length}
          isLoading={allPosts.isLoading}
          useWindow={false}
          totalCount={allPosts.responseData.count}
        >
          <FlexBox wrap gap={"small"} justifyContent={"center"}>
            <FlatList
              data={allPosts.responseData.data}
              renderItem={(post) => (
                <PostsGrid
                  key={post.postId}
                  postData={post}
                  action={onPostsClick}
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
