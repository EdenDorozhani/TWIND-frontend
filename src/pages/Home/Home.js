import { useEffect, useState } from "react";
import Post from "../../lib/components/Post";
import NotificationPanel from "../../lib/components/NotificationPanel";
import FlatList from "../../lib/components/FlatList";
import FlexBox from "../../lib/components/FlexBox";
import { useLocation, useNavigate } from "react-router-dom";
import usePaginationData from "../../hooks/usePaginationData";
import Modal from "../../lib/components/Modal";
import useModal from "../../hooks/useModal";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import UsersList from "../../lib/components/UsersList";
import PostActions from "../../lib/components/PostActions";
import useDataDeleter from "../../hooks/useDataDeleter";
import ScrollPagination from "../../lib/components/ScrollPagination";
import { postFollowers } from "./Home.actions";
import { dateRangeFilter } from "./pageHelpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLikes } from "../../hooks/useLikeAction/useLikeAction.action";
import SimpleText from "../../lib/components/SimpleText";

const Home = () => {
  const [postId, setPostId] = useState();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const navigate = useNavigate();
  const { state: deletedPost } = useLocation();
  const deletedPostId = deletedPost?.postId;

  const { userLoggedInData } = useLoggedInUser();

  const { openModal, closeModal, isVisible } = useModal();

  const { onDelete } = useDataDeleter({ path: "deletePost" });

  const { costumeData: followingPosts } = usePaginationData({
    pageSize: 2,
    path: "getFollowingPostsData",
  });

  const { costumeData: postsLikes } = usePaginationData({
    pageSize: 2,
    path: "getPostsLikes",
  });

  const { costumeData: notifications } = usePaginationData({
    pageSize: 1,
    path: "getNotifications",
  });

  //Filter notifications based on date
  const dateRangeData = dateRangeFilter(notifications);

  useEffect(() => {
    if (!userLoggedInData.userId) return;
    followingPosts.getDataPagination({
      userLoggedIn: userLoggedInData.userId,
    });
    notifications.getDataPagination({
      userLoggedIn: userLoggedInData.userId,
      withPages: true,
    });
    //Delete home posts from PostModal
    if (!!deletedPostId) {
      followingPosts.onDeleteFrontEnd({
        identifier: deletedPostId,
        key: "postId",
      });
    }
  }, [deletedPostId, userLoggedInData.userId]);

  const onOpenPostModal = (postId) => {
    navigate(`p/${postId}`);
  };

  const onOpenLikesModal = (postId) => {
    setPostId(postId);
    postsLikes.getDataPagination({ identifier: postId });
    openModal();
  };

  const onCloseModal = () => {
    setPostId();
    postsLikes.resetState();
    setIsPopUpVisible(false);
    closeModal();
  };

  const navigateToUserProfile = (username) => {
    navigate(`${username}`);
  };

  const onPostOptionsClick = (postId) => {
    openModal();
    setPostId(postId);
  };

  const nvaigateToEditPage = () => {
    navigate(`edit/${postId}`);
  };

  const displayDangerPopup = () => {
    setIsPopUpVisible(true);
  };

  const confirmDelete = async () => {
    const response = onDelete({
      action: onCloseModal,
      identifier: postId,
    });
    if (!response) return;
    followingPosts.onDeleteFrontEnd({ identifier: postId, key: "postId" });
  };

  const updateFollowers = async (isFollowed, id) => {
    try {
      await postFollowers(userLoggedInData.userId, id, isFollowed);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updateLikes = async (id, isLiked) => {
    try {
      await postLikes(id, userLoggedInData.userId, isLiked, "updatePostLikes");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onNotificationPostClick = (identifier) => {
    navigate(`p/${identifier}`);
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={onCloseModal}>
        {!postsLikes.paginationData.module && !postsLikes.isLoading ? (
          <PostActions
            editAction={nvaigateToEditPage}
            deleteAction={displayDangerPopup}
            isPopUpVisible={isPopUpVisible}
            cancelDelete={onCloseModal}
            confirmDelete={confirmDelete}
            type={"post"}
          />
        ) : (
          <UsersList
            configurationData={postsLikes}
            userId={userLoggedInData?.userId}
            shouldInterruptScroll={() =>
              postsLikes.getDataPagination({ identifier: postId })
            }
            onUserClick={navigateToUserProfile}
            updateFollowers={updateFollowers}
          />
        )}
      </Modal>
      <FlexBox justifyContent={"center"}>
        <ScrollPagination
          loadMore={() =>
            followingPosts.getDataPagination({
              userLoggedIn: userLoggedInData?.userId,
            })
          }
          dataLength={followingPosts.paginationData.data.length}
          isLoading={followingPosts.isLoading}
          totalCount={followingPosts.paginationData.count}
          withTransition={true}
        >
          <FlexBox
            padding={"xl"}
            direction={"column"}
            gap={"l"}
            alignItems={"center"}
          >
            {(followingPosts.paginationData.isEmpty ||
              followingPosts.paginationData.count === 0) && (
              <SimpleText content={"No posts in home page."} size={"l"} />
            )}
            <FlatList
              data={followingPosts.paginationData.data}
              renderItem={(post) => (
                <Post
                  key={post.postId}
                  postData={post}
                  userId={userLoggedInData?.userId}
                  onOpenPostModal={onOpenPostModal}
                  onOpenLikesModal={onOpenLikesModal}
                  navigateToUserProfile={navigateToUserProfile}
                  onPostOptionsClick={onPostOptionsClick}
                  updateLikes={updateLikes}
                />
              )}
            />
          </FlexBox>
        </ScrollPagination>
        <NotificationPanel
          notifications={notifications}
          dateRangeData={dateRangeData}
          onNotificationPostClick={onNotificationPostClick}
          navigateToUserProfile={navigateToUserProfile}
          userId={userLoggedInData.userId}
        />
      </FlexBox>
    </>
  );
};

export default Home;
