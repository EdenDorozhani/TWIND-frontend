import { useEffect, useState } from "react";
import Post from "../../lib/components/Post";
import NotificationPanel from "../../lib/components/NotificationPanel";
import FlatList from "../../lib/components/util/FlatList";
import FlexBox from "../../lib/components/FlexBox";
import { useLocation, useNavigate } from "react-router-dom";
import useMultipleData from "../../hooks/useMultipleData";
import Modal from "../../lib/components/Modal";
import useModal from "../../hooks/useModal";
import useLoggedInUser from "../../context/useLoggedInUser";
import UsersList from "../../lib/components/UsersList";
import PostActions from "../../lib/components/PostActions";
import useDataDeleter from "../../hooks/useDataDeleter";
import EndlessScroll from "../../lib/components/EndlessScroll";
import { postFollowers } from "./Home.actions";
import { dateRangeFilter } from "./pageHelpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLikes } from "../../hooks/useLikeAction/useLikeAction.action";

const Home = () => {
  const [postId, setPostId] = useState();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { userLoggedInData } = useLoggedInUser();

  const { openModal, closeModal, isVisible } = useModal();

  const { onDelete } = useDataDeleter({ path: "deletePost" });

  const { multipleData: followingPosts } = useMultipleData({
    pageSize: 2,
    path: "getFollowingPostsData",
  });

  const { multipleData: postsLikes } = useMultipleData({
    pageSize: 12,
    path: "getPostsLikes",
  });

  const { multipleData: notifications } = useMultipleData({
    pageSize: 12,
    path: "getNotifications",
  });

  const dateRangeData = dateRangeFilter(notifications);

  useEffect(() => {
    if (!userLoggedInData.userId) return;
    followingPosts.getDataPagination({ identifier: userLoggedInData.userId });
    notifications.getDataPagination({ identifier: userLoggedInData.userId });
    if (!!state?.postId) {
      followingPosts.setResponseData((prevState) => ({
        ...prevState,
        data: prevState.data.filter((post) => post.postId !== postId),
      }));
    }
  }, [userLoggedInData.userId]);

  const onPostModal = (postId) => {
    navigate(`p/${postId}`);
  };

  const openLikesModal = (postId) => {
    setPostId(postId);
    postsLikes.getDataPagination({ identifier: postId });
    openModal();
  };

  const closeModalHandler = () => {
    setPostId();
    postsLikes.resetState();
    setIsPopUpVisible(false);
    closeModal();
  };

  const onUsernamesClick = (username) => {
    navigate(`${username}`);
  };

  const onDotsIconClick = (postId) => {
    openModal();
    setPostId(postId);
  };

  const nvaigateToEditPage = () => {
    navigate(`edit/${postId}`);
  };

  const onDeletePost = () => {
    setIsPopUpVisible(true);
  };

  const confirmDelete = async () => {
    const response = onDelete({
      action: closeModalHandler,
      identifier: postId,
    });
    if (!response) return;
    followingPosts.setResponseData((prevState) => ({
      ...prevState,
      data: prevState.data.map((post, index, array) =>
        post.postId === postId ? { ...post, notShow: true } : post
      ),
    }));

    followingPosts.setPage(1);
  };

  const updateFollowers = async (isFollow, id) => {
    try {
      await postFollowers(userLoggedInData?.userId, id, isFollow);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onNotificationClick = (identifier) => {
    navigate(`/twind/p/${identifier}`);
  };

  const updateLikes = async (id, isLiked) => {
    try {
      await postLikes(id, userLoggedInData?.userId, isLiked, "updatePostLikes");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeModalHandler}>
        {!postsLikes.responseData.module ? (
          <PostActions
            editAction={nvaigateToEditPage}
            deleteAction={onDeletePost}
            isPopUpVisible={isPopUpVisible}
            cancelDelete={closeModalHandler}
            confirmDelete={confirmDelete}
            type={"post"}
          />
        ) : (
          <UsersList
            responseData={postsLikes.responseData}
            isLoading={postsLikes.isLoading}
            userId={userLoggedInData?.userId}
            shouldInterrupt={() =>
              postsLikes.getDataPagination({ identifier: postId })
            }
            onUserClick={onUsernamesClick}
            updateFollowers={updateFollowers}
          />
        )}
      </Modal>
      <EndlessScroll
        loadMore={() =>
          followingPosts.getDataPagination({
            identifier: userLoggedInData?.userId,
          })
        }
        isLoading={followingPosts.isLoading}
        dataLength={followingPosts.responseData.data.length}
        totalCount={followingPosts.responseData.count}
      >
        <FlexBox justifyContent={"center"}>
          <FlexBox padding={"extra large"} direction={"column"} gap={"large"}>
            <FlatList
              data={followingPosts.responseData.data}
              renderItem={(post) => (
                <Post
                  key={post.postId}
                  postData={post}
                  userId={userLoggedInData?.userId}
                  onPostModal={onPostModal}
                  openLikesModal={openLikesModal}
                  onUsernamesClick={onUsernamesClick}
                  onDotsIconClick={onDotsIconClick}
                  updateLikes={updateLikes}
                />
              )}
            />
          </FlexBox>
          <NotificationPanel
            notificationsData={notifications}
            dateRangeData={dateRangeData}
            onNotificationClick={onNotificationClick}
            onUsernamesClick={onUsernamesClick}
            userId={userLoggedInData.userId}
          />
        </FlexBox>
      </EndlessScroll>
    </>
  );
};

export default Home;
