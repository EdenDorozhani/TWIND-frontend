import { useEffect, useState } from "react";
import Post from "../../lib/components/Post";
import NotificationPanel from "../../lib/components/NotificationPanel";
import FlatList from "../../lib/components/util/FlatList";
import FlexBox from "../../lib/components/FlexBox";
import { useNavigate } from "react-router-dom";
import { formatImgUrl } from "../../lib/helpers";
import useMultipleData from "../../hooks/useMultipleData";
import Modal from "../../lib/components/Modal";
import useModal from "../../hooks/useModal";
import useLoggedInUser from "../../context/useLoggedInUser";
import UsersList from "../../lib/components/UsersList";
import PostActions from "../../lib/components/PostActions";
import useDataDeleter from "../../hooks/useDataDeleter";
import EndlessScroll from "../../lib/components/EndlessScroll";
import { postFollowers } from "./Home.actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [postId, setPostId] = useState();
  const [popUpVisible, setPopUpVisible] = useState(false);
  const navigate = useNavigate();

  const { userLoggedInData } = useLoggedInUser();

  const { openModal, closeModal, isVisible } = useModal();

  const {
    data: postsData,
    getDataPagination: getFollowingPost,
    isLoading,
    setData: setPostsData,
  } = useMultipleData({
    pageSize: 2,
    path: "getFollowingPostsData",
  });

  const {
    data: notificationsData,
    getDataPagination: getNotificationsData,
    isLoading: isLoadingNotifications,
    setData: setNotificationsData,
  } = useMultipleData({
    pageSize: 2,
    path: "getNotifications",
  });

  const {
    data: postsLikesData,
    getDataPagination: getLikesData,
    resetData: resetLikesData,
    resetPage: resetLikesPage,
    isLoading: isLoadingLikes,
  } = useMultipleData({
    pageSize: 12,
    identifier: postId,
    path: "getPostsLikes",
  });

  const { onDelete } = useDataDeleter({ path: "deletePost" });

  useEffect(() => {
    getFollowingPost();
    getNotificationsData();
  }, []);

  const onPostModal = (postId) => {
    navigate(`p/${postId}`);
  };

  const openLikesModal = (postId) => {
    setPostId(postId);
    getLikesData(postId);
    openModal();
  };

  const closeModalHandler = () => {
    setPostId();
    resetLikesPage();
    resetLikesData();
    setPopUpVisible(false);
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
    setPopUpVisible(true);
  };

  const confirmDelete = async () => {
    const response = onDelete({
      action: closeModalHandler,
      identifier: postId,
    });
    if (!response) return;
    setPostsData((prevState) => ({
      ...prevState,
      data: prevState.data.filter((post) => post.postId !== postId),
    }));
  };

  const updateFollowers = async (isFollow, id) => {
    try {
      await postFollowers(userLoggedInData?.userId, id, isFollow);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeModalHandler}>
        {!postsLikesData.module ? (
          <PostActions
            editAction={nvaigateToEditPage}
            deleteAction={onDeletePost}
            popUpVisible={popUpVisible}
            cancelDelete={closeModalHandler}
            confirmDelete={confirmDelete}
            type={"post"}
          />
        ) : (
          <UsersList
            onUserClick={onUsernamesClick}
            type={postsLikesData.module}
            count={postsLikesData.count}
            shouldInterrupt={() => getLikesData(postId)}
            data={postsLikesData.data}
            isLoading={isLoadingLikes}
            userId={userLoggedInData?.userId}
            updateFollowers={updateFollowers}
          />
        )}
      </Modal>
      <EndlessScroll
        loadMore={getFollowingPost}
        isLoading={isLoading}
        dataLength={postsData.data.length}
        totalCount={postsData.count}
      >
        <FlexBox justifyContent={"center"}>
          <FlexBox padding={"extra large"} direction={"column"} gap={"large"}>
            <FlatList
              data={postsData.data}
              renderItem={(post) => (
                <Post
                  key={post.postId}
                  caption={post.caption}
                  location={post.location}
                  postImg={formatImgUrl(post.postImage)}
                  postId={post.postId}
                  userImg={formatImgUrl(post.userImgURL)}
                  author={post.username}
                  createdAt={post.createdAt}
                  likes={post.likes}
                  likedByUser={post.likedByUser}
                  onPostModal={onPostModal}
                  commentsCount={post.comments}
                  userId={userLoggedInData?.userId}
                  creatorId={post.creatorId}
                  openLikesModal={openLikesModal}
                  onUsernamesClick={onUsernamesClick}
                  onDotsIconClick={onDotsIconClick}
                />
              )}
            />
          </FlexBox>
          <NotificationPanel data={notificationsData.data} />
        </FlexBox>
      </EndlessScroll>
    </>
  );
};

export default Home;
