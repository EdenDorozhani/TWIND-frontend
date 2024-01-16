import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../lib/components/Avatar";
import Button from "../../lib/components/Button";
import FlexBox from "../../lib/components/FlexBox";
import Icon from "../../lib/components/Icon";
import SimpleText from "../../lib/components/SimpleText";
import TextButton from "../../lib/components/TextButton";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useMultipleData from "../../hooks/useMultipleData";
import FlatList from "../../lib/components/util/FlatList";
import { formatImgUrl } from "../../lib/helpers";
import PostsGrid from "../../lib/components/PostsGrid";
import { getProfileData } from "./Profile.actions";
import useLoggedInUser from "../../context/useLoggedInUser";
import EndlessScroll from "../../lib/components/EndlessScroll";
import { postFollowers } from "../Home/Home.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Follow } from "../../context/FollowProvider";
import Modal from "../../lib/components/Modal";
import UsersList from "../../lib/components/UsersList";
import useModal from "../../hooks/useModal";
import { BASE_URL } from "../../axiosConfig";
import { getMultipleData } from "../../hooks/useMultipleData/useMultipleData.action";

const Profile = () => {
  const [profileUserData, setProfileUserData] = useState({});
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filterFollowersPage, setFilterFollowersPage] = useState(1);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);
  const [filteredFollowersData, setFilteredFollowersData] = useState({
    data: [],
    module: "",
  });
  const [isFollow, setIsFollow] = useState();
  const { username } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userLoggedInData } = useLoggedInUser();
  const { isFollowed } = useContext(Follow);
  const { isVisible, closeModal, openModal } = useModal();

  const {
    data: profilePostsData,
    getDataPagination: getProfilePosts,
    isLoading: isLoadingProfile,
    setData,
  } = useMultipleData({
    pageSize: 12,
    path: "getProfilePostsData",
  });

  const {
    data: followers,
    getDataPagination: getFollowers,
    isLoading: isLoadingFollowers,
    resetPage: resetFollowersPage,
    resetData: resetFollowersData,
  } = useMultipleData({
    pageSize: 3,
    path: "getFollowers",
  });

  const fetchProfileUserData = async () => {
    try {
      const response = await getProfileData(username);
      setProfileUserData(response);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchFilteredFollowers = async (page) => {
    if (searchBarValue.length === 0) return;
    setIsLoadingFiltered(true);
    const url =
      BASE_URL +
      `/getFollowers?page=${
        page ? 1 : filterFollowersPage
      }&pageSize=${3}&identifier=${
        profileUserData.userId
      }&value=${searchBarValue}`;
    try {
      const response = await getMultipleData(url);
      setFilteredFollowersData((prevState) => {
        if (page) {
          return {
            data: response.data.response.data,
            module: response.data.response.module,
          };
        } else {
          return {
            ...prevState,
            data: [...prevState.data, ...response.data.response.data],
            module: response.data.response.module,
          };
        }
      });
      setFilterFollowersPage((prevPage) => prevPage + 1);
      setIsLoadingFiltered(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state === null) return;
    setData((prevState) => ({
      ...prevState,
      data: prevState.data.filter((post) => +state.postId !== post.postId),
    }));
  }, [state]);

  useEffect(() => {
    fetchProfileUserData();
    getProfilePosts(username);
  }, [username]);

  useEffect(() => {
    if (!followers.module) return;
    setFilterFollowersPage(1);
    fetchFilteredFollowers(1);
  }, [searchBarValue]);

  useEffect(() => {
    setIsFollow(isFollowed || profileUserData.followedByUser);
  }, [profileUserData.followedByUser, isFollowed]);

  const onOpenPost = (postId) => {
    navigate(`p/${postId}`);
  };

  const onEditNavigation = () => {
    navigate("/twind/edit-profile");
  };

  const updateFollowers = async (isFollow, id) => {
    try {
      await postFollowers(userLoggedInData?.userId, id, isFollow);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleFollow = () => {
    if (isFollow === "0") {
      setIsFollow("1");
    } else {
      setIsFollow("0");
    }
    updateFollowers(isFollow, profileUserData.userId);
  };

  const openFollowersModal = async () => {
    getFollowers(profileUserData.userId);
    openModal();
  };

  const closeFollowersModal = () => {
    resetFollowersPage();
    resetFollowersData();
    setFilterFollowersPage(1);
    setFilteredFollowersData({ data: [], module: "" });
    setSearchBarValue("");
    closeModal();
  };

  const onSearchBarChange = (value) => {
    setSearchBarValue(value);
  };
  const scrollCondition = searchBarValue.length !== 0;

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeFollowersModal}>
        <UsersList
          type={"Followers"}
          count={
            scrollCondition
              ? filteredFollowersData.data?.[0]?.filteredCount
              : profileUserData.followersCount
          }
          data={scrollCondition ? filteredFollowersData.data : followers.data}
          isLoading={scrollCondition ? isLoadingFiltered : isLoadingFollowers}
          shouldInterrupt={
            scrollCondition
              ? () => fetchFilteredFollowers()
              : () => getFollowers(profileUserData.userId)
          }
          updateFollowers={updateFollowers}
          userId={userLoggedInData.userId}
          onSearchBarChange={onSearchBarChange}
          inputValue={searchBarValue}
        />
      </Modal>
      <div style={{ paddingLeft: "340px", paddingRight: "40px" }}>
        <div
          style={{
            display: "flex",
            padding: "15px",
            flexDirection: "column",
            gap: "80px",
          }}
        >
          <FlexBox gap={"extra large"}>
            <Avatar
              size={"xl"}
              src={formatImgUrl(profileUserData.userImgURL)}
            />
            <FlexBox
              direction={"column"}
              justifyContent={"center"}
              gap={"large"}
            >
              <FlexBox gap={"medium"}>
                <SimpleText
                  content={profileUserData.username}
                  color={"black"}
                  size={"l"}
                  fontWeight={"bold"}
                />
                {userLoggedInData.username === username ? (
                  <Button content={"Edit profile"} action={onEditNavigation} />
                ) : (
                  <Button
                    content={isFollow === "0" ? "Follow" : "Following"}
                    color={isFollow === "0" ? "" : "gray"}
                    action={toggleFollow}
                  />
                )}
              </FlexBox>
              <FlexBox gap={"large"} alignItems={"center"}>
                <SimpleText
                  content={`${profilePostsData.count} posts`}
                  size={"m"}
                />
                <TextButton
                  content={`${profileUserData.followersCount} followers`}
                  fontWeight={"thin"}
                  action={openFollowersModal}
                />
              </FlexBox>
              <FlexBox gap={"small"}>
                <SimpleText content={profileUserData.country} color={"black"} />
              </FlexBox>

              <div style={{ maxWidth: "500px" }}>
                <SimpleText content={profileUserData.about} />
              </div>
            </FlexBox>
          </FlexBox>
          <FlexBox direction={"column"} alignItems={"center"} gap={"medium"}>
            {profilePostsData.data.length === 0 ? (
              <SimpleText content={"You have no posts."} size={"l"} />
            ) : (
              <div style={{ borderTop: "1px solid green" }}>
                <FlexBox gap={"medium"} padding={"small"}>
                  <Icon iconName={faTableCells} size={"s"} />
                  <SimpleText content={"Posts"} size={"m"} />
                </FlexBox>
              </div>
            )}
            <div style={{ width: "100%" }}>
              <EndlessScroll
                loadMore={() => getProfilePosts(username)}
                dataLength={profilePostsData.data.length}
                totalCount={profilePostsData.count}
                isLoading={isLoadingProfile}
              >
                <FlexBox wrap gap={"small"}>
                  <FlatList
                    data={profilePostsData.data}
                    renderItem={(post) => (
                      <PostsGrid
                        key={post.postId}
                        postId={post.postId}
                        imageUrl={formatImgUrl(post.postImage)}
                        commentCount={post.comments}
                        likeCount={post.likeCount}
                        action={onOpenPost}
                        images={profilePostsData.data}
                      />
                    )}
                  />
                </FlexBox>
              </EndlessScroll>
            </div>
          </FlexBox>
        </div>
      </div>
    </>
  );
};

export default Profile;
