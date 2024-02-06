import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../../lib/components/Avatar";
import Button from "../../lib/components/Button";
import FlexBox from "../../lib/components/FlexBox";
import Icon from "../../lib/components/Icon";
import SimpleText from "../../lib/components/SimpleText";
import TextButton from "../../lib/components/TextButton";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import usePaginationData from "../../hooks/usePaginationData";
import FlatList from "../../lib/components/FlatList";
import { formatImgUrl } from "../../lib/helpers";
import PostsGrid from "../../lib/components/PostsGrid";
import { getProfileData } from "./Profile.actions";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import ScrollPagination from "../../lib/components/ScrollPagination";
import { postFollowers } from "../Home/Home.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Follow } from "../../context/FollowProvider";
import Modal from "../../lib/components/Modal";
import UsersList from "../../lib/components/UsersList";
import useModal from "../../hooks/useModal";
import { determineFollowersPaginationData } from "./pageHelpers";
import useFilteredPaginationData from "../../hooks/useFilteredPaginationData";

const Profile = () => {
  const [profileUserData, setProfileUserData] = useState({});

  const { username } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { isFollowed, setFollow } = useContext(Follow);
  const { userLoggedInData } = useLoggedInUser();

  const { isVisible, closeModal, openModal } = useModal();

  const { costumeData: profilePosts } = usePaginationData({
    pageSize: 3,
    path: "getProfilePostsData",
  });
  const { costumeData: followers } = usePaginationData({
    pageSize: 5,
    path: "getFollowers",
  });
  const { filteredPaginationData } = useFilteredPaginationData({
    identifier: profileUserData.userId,
    pageSize: 20,
    path: "getFollowers",
  });

  const fetchProfileUserData = async () => {
    try {
      const response = await getProfileData(username);
      setProfileUserData(response);
    } catch (err) {
      if (!err.response.data.success) {
        navigate("/error");
      }
      console.log(err);
      console.log(err);
    }
  };

  useEffect(() => {
    if (state === null) return;
    profilePosts.onDeleteFrontEnd({ identifier: +state.postId, key: "postId" });
  }, [state]);

  useEffect(() => {
    fetchProfileUserData();
    profilePosts.resetState();
    profilePosts.getDataPagination({
      identifier: username,
      initialLastElementId: true,
    });
  }, [username]);

  useEffect(() => {
    setFollow(profileUserData.followedByUser);
  }, [profileUserData.followedByUser]);

  const onOpenPost = (postId) => {
    navigate(`p/${postId}`);
  };

  const onEditProfileNavigation = () => {
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
    followers.getDataPagination({
      identifier: profileUserData.userId,
      withPages: true,
    });
    openModal();
  };

  const closeFollowersModal = () => {
    followers.resetState();
    filteredPaginationData.resetState();
    closeModal();
  };

  const onSearchBarChange = (value) => {
    filteredPaginationData.getSearchBarValue(value);
  };

  const onUserProfileNavigation = (username) => {
    navigate(`/twind/${username}`);
    closeFollowersModal();
  };

  const updateFollowingCount = (actionType) => {
    setProfileUserData((prevState) => ({
      ...prevState,
      followersCount:
        actionType == 1
          ? prevState.followersCount - 1
          : prevState.followersCount + 1,
    }));
  };

  const determineFollowersData = determineFollowersPaginationData({
    filteredPaginationData,
    followers,
    profileUserData,
  });
  return (
    <>
      <Modal isVisible={isVisible} onClose={closeFollowersModal}>
        <UsersList
          configurationData={determineFollowersData}
          shouldInterruptScroll={determineFollowersData.shouldInterrupt}
          updateFollowers={updateFollowers}
          userId={userLoggedInData.userId}
          onSearchBarChange={onSearchBarChange}
          inputValue={filteredPaginationData.searchBarValue}
          onUserClick={onUserProfileNavigation}
          type="Followers"
          updateFollowingCount={updateFollowingCount}
        />
      </Modal>
      <div
        style={{ marginLeft: "370px", height: "100%", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            padding: "15px",
            flexDirection: "column",
            gap: "80px",
          }}
        >
          <FlexBox gap={"xl"}>
            <Avatar
              size={"xl"}
              src={formatImgUrl(profileUserData.userImgURL)}
            />
            <FlexBox direction={"column"} justifyContent={"center"} gap={"l"}>
              <FlexBox gap={"m"}>
                <SimpleText
                  content={profileUserData.username}
                  color={"black"}
                  size={"l"}
                  fontWeight={"bold"}
                />
                {userLoggedInData.username === username ? (
                  <Button
                    content={"Edit profile"}
                    action={onEditProfileNavigation}
                  />
                ) : (
                  <Button
                    content={isFollowed === "0" ? "Follow" : "Following"}
                    color={isFollowed === "0" ? "" : "gray"}
                    action={toggleFollow}
                  />
                )}
              </FlexBox>
              <FlexBox gap={"l"} alignItems={"center"}>
                <SimpleText
                  content={`${
                    !profilePosts.paginationData.count
                      ? 0
                      : profilePosts.paginationData.count
                  } posts`}
                  size={"m"}
                />
                <TextButton
                  content={`${profileUserData.followersCount} following`}
                  fontWeight={"thin"}
                  action={openFollowersModal}
                />
              </FlexBox>
              <FlexBox gap={"s"}>
                <SimpleText content={profileUserData.country} color={"black"} />
              </FlexBox>

              <div style={{ maxWidth: "500px" }}>
                <SimpleText content={profileUserData.about} />
              </div>
            </FlexBox>
          </FlexBox>
          <FlexBox direction={"column"} alignItems={"center"} gap={"m"}>
            {profilePosts.paginationData.count === 0 ||
            profilePosts.paginationData.isEmpty ? (
              <SimpleText
                content={`${
                  profileUserData.username === userLoggedInData.username
                    ? "You"
                    : profileUserData.username
                } have no posts`}
                size={"l"}
              />
            ) : (
              <div style={{ borderTop: "1px solid green" }}>
                <FlexBox gap={"m"} padding={"s"}>
                  <Icon iconName={faTableCells} size={"s"} />
                  <SimpleText content={"Posts"} size={"m"} />
                </FlexBox>
              </div>
            )}

            <ScrollPagination
              loadMore={() =>
                profilePosts.getDataPagination({ identifier: username })
              }
              dataLength={profilePosts.paginationData.data.length}
              isLoading={profilePosts.isLoading}
              totalCount={profilePosts.paginationData.count}
              useWindow={true}
              withTransition={true}
            >
              <FlexBox wrap gap={"s"}>
                <FlatList
                  data={profilePosts.paginationData.data}
                  renderItem={(post) => (
                    <PostsGrid
                      key={post.postId}
                      postData={post}
                      action={onOpenPost}
                    />
                  )}
                />
              </FlexBox>
            </ScrollPagination>
          </FlexBox>
        </div>
      </div>
    </>
  );
};

export default Profile;
