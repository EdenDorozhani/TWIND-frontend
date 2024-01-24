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
import { determineResponseData } from "./pageHelpers";

const Profile = () => {
  const [profileUserData, setProfileUserData] = useState({});
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filterFollowersPage, setFilterFollowersPage] = useState(1);
  const [isLoadingFiltered, setIsLoadingFiltered] = useState(false);
  const [filteredFollowersData, setFilteredFollowersData] = useState({
    data: [],
    module: "",
    count: "",
  });

  const { username } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { isFollowed, setFollow } = useContext(Follow);
  const { userLoggedInData } = useLoggedInUser();

  const { isVisible, closeModal, openModal } = useModal();
  const { multipleData: profilePosts } = useMultipleData({
    pageSize: 8,
    path: "getProfilePostsData",
  });
  const { multipleData: followers } = useMultipleData({
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

  const scrollCondition = searchBarValue.length !== 0;

  const fetchFilteredFollowers = async (page) => {
    if (!scrollCondition) return;
    const correctPage = page ? 1 : filterFollowersPage;
    setIsLoadingFiltered(true);
    const url =
      BASE_URL +
      `/getFollowers?page=${correctPage}&pageSize=${3}&identifier=${
        profileUserData.userId
      }&value=${searchBarValue}`;
    try {
      const response = await getMultipleData(url);
      setFilteredFollowersData((prevState) => {
        return {
          ...prevState,
          data: page
            ? response.data.response.data
            : [...prevState.data, ...response.data.response.data],
          module: response.data.response.module,
          count: response.data.response.count,
        };
      });
      setFilterFollowersPage((prevPage) => prevPage + 1);
      setIsLoadingFiltered(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (state === null) return;
    profilePosts.setResponseData((prevState) => ({
      ...prevState,
      data: prevState.data.filter((post) => +state.postId !== post.postId),
    }));
  }, [state]);

  useEffect(() => {
    fetchProfileUserData();
    const fetch = async () => {
      const response = await profilePosts.getDataPagination(username, "", 1);
      profilePosts.setResponseData((prevState) => ({
        ...prevState,
        data: response,
      }));
    };
    fetch();
  }, [username]);

  useEffect(() => {
    if (!followers.responseData.module) return;
    setFilterFollowersPage(1);
    fetchFilteredFollowers(1);
  }, [searchBarValue]);

  useEffect(() => {
    setFollow(profileUserData.followedByUser);
  }, [profileUserData.followedByUser]);

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
    if (isFollowed === "0") {
      setFollow("1");
    } else {
      setFollow("0");
    }
    updateFollowers(isFollowed, profileUserData.userId);
  };

  const openFollowersModal = async () => {
    followers.getDataPagination(profileUserData.userId);
    openModal();
  };

  const closeFollowersModal = () => {
    followers.resetState();
    setFilterFollowersPage(1);
    setFilteredFollowersData({ data: [], module: "" });
    setSearchBarValue("");
    closeModal();
  };

  const onSearchBarChange = (value) => {
    setSearchBarValue(value);
  };

  const onUserClick = (username) => {
    navigate(`/twind/${username}`);
    closeFollowersModal();
  };

  const determineResData = determineResponseData({
    fetchFilteredFollowers,
    filteredFollowersData,
    followers,
    isLoadingFiltered,
    profileUserData,
    scrollCondition,
  });

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeFollowersModal}>
        <UsersList
          shouldInterrupt={determineResData.shouldInterrupt}
          isLoading={determineResData.isLoading}
          responseData={determineResData.responseData}
          updateFollowers={updateFollowers}
          userId={userLoggedInData.userId}
          onSearchBarChange={onSearchBarChange}
          inputValue={searchBarValue}
          onUserClick={onUserClick}
          type="Followers"
        />
      </Modal>
      <div style={{ paddingLeft: "460px" }}>
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
                    content={isFollowed === "0" ? "Follow" : "Following"}
                    color={isFollowed === "0" ? "" : "gray"}
                    action={toggleFollow}
                  />
                )}
              </FlexBox>
              <FlexBox gap={"large"} alignItems={"center"}>
                <SimpleText
                  content={`${profilePosts.responseData.count} posts`}
                  size={"m"}
                />
                <TextButton
                  content={`${profileUserData.followersCount} following`}
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
            {profilePosts.responseData.data.length === 0 ? (
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
                loadMore={() => profilePosts.getDataPagination(username)}
                dataLength={profilePosts.responseData.data.length}
                totalCount={profilePosts.responseData.count}
                isLoading={profilePosts.isLoading}
              >
                <FlexBox wrap gap={"small"}>
                  <FlatList
                    data={profilePosts.responseData.data}
                    renderItem={(post) => (
                      <PostsGrid
                        key={post.postId}
                        postData={post}
                        action={onOpenPost}
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
