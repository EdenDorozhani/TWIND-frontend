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
import useMultipleData from "../../hooks/useMultipleData";
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
import { getMultipleData } from "../../hooks/useMultipleData/useMultipleData.action";
import { postFollowers } from "../Home/Home.actions";
import { Follow } from "../../context/FollowProvider";
import { postLikes } from "../../hooks/useLikeAction/useLikeAction.action";

const PostModal = () => {
  const [singlePost, setSinglePost] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [commentId, setCommentId] = useState();
  const [replyId, setReplyId] = useState();
  const [repliesData, setRepliesData] = useState({});
  const replyInputRef = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { userLoggedInData } = useLoggedInUser();
  const { setFollow, isFollowed } = useContext(Follow);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({ resolver: yupResolver(addCommentValidationSchema) });

  const { closeModal, isVisible, openModal } = useModal();

  const { backendErrors, submit, setBackendErrors } = useDataPoster({
    urlPath: "postComment",
    requestHeader: "json",
  });

  const {
    data: commentsData,
    getDataPagination: getPaginationCommentsData,
    setData: setDataComments,
    isLoading: isLoadingComments,
  } = useMultipleData({
    pageSize: 8,
    path: "getComments",
  });

  const {
    data: likesData,
    getDataPagination: getPaginationLikesData,
    isLoading: isLoadingLikes,
    resetData: resetLikesData,
    resetPage: resetLikesPage,
  } = useMultipleData({
    pageSize: 8,
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

  const getData = async () => {
    try {
      const response = await getSinglePost(postId);
      setSinglePost(response);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getPaginationCommentsData(postId);
    getData();
  }, []);

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
      setTotalReplies(setDataComments, replyId, "increase");
      setRepliesData((prevState) => ({
        ...prevState,
        [replyId]: [response.data.response, ...(prevState[replyId] || [])],
      }));
    } else {
      setDataComments((prevState) => ({
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
    getPaginationLikesData(commentId, "getCommentsLikes");
    openModal();
  };

  const openPostLikesModal = () => {
    getPaginationLikesData(postId, "getPostsLikes");
    openModal();
  };

  const closeCommentsLikesModal = () => {
    setCommentId();
    setReplyId();
    resetLikesPage();
    resetLikesData();
    setPopUpVisible(false);
    closeModal();
  };

  const onDotsIconClick = (commentId, replyId) => {
    setCommentId(commentId);
    setReplyId(replyId);
    openModal();
  };

  const onNavigateToEditPage = () => {
    navigate(`/twind/edit/${postId}`);
  };

  const onDeletePost = () => {
    setPopUpVisible(true);
  };

  const confirmDeletePost = async () => {
    const response = onDelete({
      identifier: replyId || commentId || postId,
      action: closeCommentsLikesModal,
    });
    if (!response) return;
    if (replyId) {
      setRepliesData((prevState) => {
        const state = prevState[commentId].filter(
          (reply) => reply.commentId !== replyId
        );
        return { ...prevState, [commentId]: state };
      });
      setTotalReplies(setDataComments, commentId, "decrease");
    } else if (!replyId && !!commentId) {
      setDataComments((prevState) => ({
        ...prevState,
        data: prevState.data.filter(
          (comment) => comment.commentId !== commentId
        ),
        count: prevState.count - 1,
      }));
      return;
    } else if (!commentId) {
      navigate(`/twind/${userLoggedInData.username}`, { state: { postId } });
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
      const response = await getMultipleData(url);
      setRepliesData((prevState) => ({
        ...prevState,
        [id]: [...(prevState[id] || []), ...response.data.response.data],
      }));
    } catch (err) {
      console.log(err);
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
      <ModalOverlay action={onCloseModal}>
        <div style={{ backgroundColor: "white" }}>
          <SinglePost
            onInputChange={onInputChange}
            onSendComment={handleSubmit(onSendComment)}
            register={register}
            handleReplyClick={handleReplyClick}
            shouldInterrupt={() => getPaginationCommentsData(postId)}
            openCommentsLikesModal={openCommentsLikesModal}
            openPostLikesModal={openPostLikesModal}
            toggleLike={toggleLike}
            onReply={onReply}
            onDotsIconClick={onDotsIconClick}
            onShowReplies={onShowReplies}
            onUserClickAction={onUserClickAction}
            updateLikes={updateLikes}
            toggleFollow={toggleFollow}
            singlePostData={singlePost}
            errors={errors}
            inputValue={inputValue["comment"]}
            isLiked={isLiked}
            likeCount={likeCount}
            comments={commentsData}
            replyInputRef={replyInputRef}
            userId={userLoggedInData.userId}
            backendErrors={backendErrors}
            repliesData={repliesData}
            isLoadingComments={isLoadingComments}
            isFollow={isFollowed}
          />
        </div>
      </ModalOverlay>
      <Modal isVisible={isVisible} onClose={closeCommentsLikesModal}>
        {!likesData.module ? (
          <PostActions
            deleteAction={onDeletePost}
            editAction={onNavigateToEditPage}
            popUpVisible={popUpVisible}
            cancelDelete={closeCommentsLikesModal}
            confirmDelete={confirmDeletePost}
            type={commentId ? "comment" : "post"}
          />
        ) : (
          <UsersList
            type={likesData.module}
            count={likesData.count}
            isLoading={isLoadingLikes}
            shouldInterrupt={() =>
              getPaginationLikesData(
                commentId || postId,
                commentId ? "getCommentsLikes" : "getPostsLikes"
              )
            }
            data={likesData.data}
            updateFollowers={updateFollowers}
            userId={userLoggedInData?.userId}
            onUserClick={onUserClickAction}
          />
        )}
      </Modal>
    </>
  );
};

export default PostModal;
