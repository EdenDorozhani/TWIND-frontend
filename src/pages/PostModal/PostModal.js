import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  addCommentValidationSchema,
  determinePage,
  setTotalReplies,
} from "./pageHelpers";
import { getSinglePost } from "./PostModal.actions";
import SinglePost from "../../lib/components/SinglePost";
import usePaginationData from "../../hooks/usePaginationData";
import useLikeAction from "../../hooks/useLikeAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalOverlay from "../../lib/components/ModalOverlay";
import useModal from "../../hooks/useModal";
import Modal from "../../lib/components/Modal";
import useLoggedInUser from "../../context/useLoggedInUser";
import UsersList from "../../lib/components/UsersList";
import PostActions from "../../lib/components/PostActions";
import useDataPoster from "../../hooks/useDataPoster/useDataPoster";
import useDataDeleter from "../../hooks/useDataDeleter";
import { BASE_URL } from "../../axiosConfig";
import { getPaginationData } from "../../hooks/usePaginationData/usePaginationData.action";
import { postFollowers } from "../Home/Home.actions";
import { Follow } from "../../context/FollowProvider";
import { postLikes } from "../../hooks/useLikeAction/useLikeAction.action";
import { motion } from "framer-motion";

const PostModal = () => {
  const [singlePost, setSinglePost] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [commentId, setCommentId] = useState();
  const [replyId, setReplyId] = useState();
  const [repliesData, setRepliesData] = useState({});
  const [isSinglePostLoading, setIsSinglePostLoading] = useState(false);

  const replyInputRef = useRef(null);
  const navigate = useNavigate();
  const { postId, username } = useParams();

  const { userLoggedInData } = useLoggedInUser();
  const { setFollow, isFollowed } = useContext(Follow);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(addCommentValidationSchema) });

  const { closeModal, isVisible, openModal } = useModal();
  const { backendErrors, submit, setBackendErrors } = useDataPoster({
    urlPath: "postComment",
    requestHeader: "json",
  });
  const { costumeData: comments } = usePaginationData({
    pageSize: 2,
    path: "getComments",
  });
  const { costumeData: likes } = usePaginationData({
    pageSize: 3,
  });

  const { onDelete } = useDataDeleter({
    path: commentId ? "deleteComment" : "deletePost",
  });

  const { isLiked, likeCount, toggleLike } = useLikeAction({
    id: postId,
    singlePost: singlePost,
    type: "updatePostLikes",
    userId: userLoggedInData.userId,
  });

  const getSinglePostData = async () => {
    setIsSinglePostLoading(true);
    try {
      const response = await getSinglePost(postId, userLoggedInData.userId);
      setSinglePost(response);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSinglePostLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoggedInData.userId) return;
    comments.getDataPagination({
      identifier: postId,
      userLoggedIn: userLoggedInData.userId,
    });
    getSinglePostData();
  }, [userLoggedInData.userId]);

  useEffect(() => {
    setFollow(singlePost.followedByUser);
  }, [singlePost.followedByUser]);

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const onCloseModal = () => {
    navigate(-1);
  };

  const onSendComment = async () => {
    const response = await submit({
      dataToSend: {
        description: inputValue["comment"],
        postId,
        userId: userLoggedInData.userId,
        reply: replyId,
      },
    });
    if (!response) return;
    if (replyId) {
      setTotalReplies(comments.setPaginationData, replyId, "increase");
      setRepliesData((prevState) => ({
        ...prevState,
        [replyId]: [response.data.response, ...(prevState[replyId] || [])],
      }));
    } else {
      comments.setPaginationData((prevState) => ({
        ...prevState,
        data: [response.data.response, ...prevState.data],
        count: prevState.count + 1,
      }));
    }
    setBackendErrors({});
    setInputValue({});
    setReplyId();
  };

  const onReply = (username, id) => {
    setInputValue({ ...inputValue, comment: `@${username} ` });
    setReplyId(id);
  };

  const handleReplyClick = () => {
    replyInputRef.current.focus();
  };

  const openCommentsLikesModal = (commentId) => {
    setCommentId(commentId);
    likes.getDataPagination({
      identifier: commentId,
      conditionalPath: "getCommentsLikes",
    });
    openModal();
  };

  const openPostLikesModal = () => {
    likes.getDataPagination({
      identifier: postId,
      conditionalPath: "getPostsLikes",
    });
    openModal();
  };

  const closeLikesAndActionModal = () => {
    setCommentId();
    setReplyId();
    likes.resetState();
    setIsPopUpVisible(false);
    closeModal();
  };

  const onOpenActionsModal = (commentId, replyId) => {
    setCommentId(commentId);
    setReplyId(replyId);
    openModal();
  };

  const onNavigateToEditPage = () => {
    navigate(`/twind/edit/${postId}`);
  };

  const onDeletePost = () => {
    setIsPopUpVisible(true);
  };

  const confirmDelete = async () => {
    console.log(replyId, commentId, postId);
    const response = onDelete({
      identifier: replyId || commentId || postId,
      action: closeLikesAndActionModal,
    });
    if (!response) return;
    if (replyId) {
      setRepliesData((prevState) => {
        const state = prevState[commentId].filter(
          (reply) => reply.commentId !== replyId
        );
        return { ...prevState, [commentId]: state };
      });
      setTotalReplies(comments.setPaginationData, commentId, "decrease");
    } else if (!replyId && !!commentId) {
      return comments.onDeleteFrontEnd({
        identifier: commentId,
        key: "commentId",
      });
    } else if (!commentId) {
      console.log(username);
      navigate(`/twind${username ? `/${username}` : ""}`, {
        state: { postId },
      });
    }
  };

  const onShowReplies = async (id, repliesCount) => {
    const pageSize = 2;
    const page = determinePage(repliesData, id, repliesCount, pageSize);
    if (!page) return;
    const url =
      BASE_URL +
      `/getReplies?page=${page}&pageSize=${pageSize}&identifier=${id}`;
    try {
      const response = await getPaginationData(url);
      setRepliesData((prevState) => ({
        ...prevState,
        [id]: [...(prevState[id] || []), ...response.data.response.data],
      }));
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const updateFollowers = async (isFollow, id) => {
    const value = isFollow === "0" ? "1" : "0";
    setFollow(value);
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
    updateFollowers(isFollowed, singlePost.creatorId);
  };

  const onUserClickAction = (username) => {
    navigate(`/twind/${username}`);
  };

  const updateLikes = async (id, isLiked) => {
    try {
      await postLikes(
        id,
        userLoggedInData.userId,
        isLiked,
        "updateCommentLikes"
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <ModalOverlay action={onCloseModal} isVisible={isVisible}>
          {!isSinglePostLoading ? (
            <div style={{ backgroundColor: "white" }}>
              <SinglePost
                onInputChange={onInputChange}
                onSendComment={handleSubmit(onSendComment)}
                register={register}
                handleReplyClick={handleReplyClick}
                shouldInterrupt={() =>
                  comments.getDataPagination({
                    identifier: postId,
                    userLoggedIn: userLoggedInData.userId,
                  })
                }
                openCommentsLikesModal={openCommentsLikesModal}
                openPostLikesModal={openPostLikesModal}
                toggleLike={toggleLike}
                onReply={onReply}
                onOpenActionsModal={onOpenActionsModal}
                onShowReplies={onShowReplies}
                onUserClickAction={onUserClickAction}
                updateLikes={updateLikes}
                toggleFollow={toggleFollow}
                singlePostData={singlePost}
                errors={errors}
                inputValue={inputValue["comment"]}
                isLiked={isLiked}
                likeCount={likeCount}
                comments={comments.paginationData}
                replyInputRef={replyInputRef}
                userId={userLoggedInData.userId}
                backendErrors={backendErrors}
                repliesData={repliesData}
                isLoadingComments={comments.isLoading}
                isFollow={isFollowed}
              />
            </div>
          ) : null}
        </ModalOverlay>
      </motion.div>
      {!likes.isLoading ? (
        <Modal isVisible={isVisible} onClose={closeLikesAndActionModal}>
          {!likes.paginationData.module ? (
            <PostActions
              deleteAction={onDeletePost}
              editAction={onNavigateToEditPage}
              isPopUpVisible={isPopUpVisible}
              cancelDelete={closeLikesAndActionModal}
              confirmDelete={confirmDelete}
              type={commentId ? "comment" : "post"}
            />
          ) : (
            <UsersList
              paginationData={likes}
              isLoading={likes.isLoading}
              shouldInterruptScroll={() =>
                likes.getDataPagination({
                  identifier: commentId || postId,
                  conditionalPath: commentId
                    ? "getCommentsLikes"
                    : "getPostsLikes",
                })
              }
              updateFollowers={updateFollowers}
              userId={userLoggedInData?.userId}
              onUserClick={onUserClickAction}
              configurationData={likes}
            />
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default PostModal;
