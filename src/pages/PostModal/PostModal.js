import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addCommentValidationSchema } from "./pageHelpers";
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

const PostModal = () => {
  const [singlePost, setSinglePost] = useState({});
  const [inputValue, setInputValue] = useState({});
  const [popUpVisible, setPopUpVisible] = useState(false);
  const [commentId, setCommentId] = useState();
  const [replyId, setReplyId] = useState();
  const [identifier, setIdentifier] = useState();
  const [repliesData, setRepliesData] = useState({});
  const [repliesPage, setRepliesPage] = useState(1);
  const [popUpType, setPopUpType] = useState();
  const replyInputRef = useRef(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { userLoggedInData } = useLoggedInUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(addCommentValidationSchema) });

  const { closeModal, isVisible, openModal } = useModal();

  const { backendErrors, submit } = useDataPoster({
    dataToSend: {
      description: inputValue["comment"],
      postId,
      userId: userLoggedInData.userId,
      reply: replyId,
    },
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

  const { onDelete } = useDataDeleter({ path: "deletePost" });

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

  const onInputChange = (name, value) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const onCloseModal = () => {
    navigate(-1);
  };

  const onSendComment = async () => {
    const response = await submit({});
    if (!response) return;
    setDataComments((prevState) => ({
      ...prevState,
      data: [response.data.response, ...prevState.data],
      count: prevState.count + 1,
    }));
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
    resetLikesPage();
    resetLikesData();
    setPopUpVisible(false);
    closeModal();
  };

  const onDotsIconClick = (type) => {
    setPopUpType(type);
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
      identifier: postId,
      action: closeCommentsLikesModal,
    });
    if (!response) return;
    navigate(`/twind/${userLoggedInData.username}`, { state: { postId } });
  };

  const onShowReplies = async (id) => {
    setIdentifier(id);
    let page;
    if (id !== identifier) {
      page = 1;
    } else {
      page = repliesPage;
    }
    const url =
      BASE_URL + `/getReplies?page=${page}&pageSize=${1}&identifier=${id}`;
    try {
      const response = await getMultipleData(url);

      setRepliesData((prevState) => ({
        ...prevState,
        [id]: [...(prevState[id] || []), ...response.data.response.replies],
      }));
      setRepliesPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(errors);
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
          />
        )}
      </Modal>
    </>
  );
};

export default PostModal;
