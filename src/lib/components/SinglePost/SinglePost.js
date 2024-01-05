import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import Comment from "../Comment";
import Description from "../Description";
import FlexBox from "../FlexBox";
import Icon from "../Icon";
import SimpleInput from "../InputTypes/SimpleInput";
import PostHeader from "../PostHeader";
import SimpleText from "../SimpleText";
import {
  faComment,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import TextButton from "../TextButton";
import FlatList from "../util/FlatList";
import EndlessScroll from "../EndlessScroll";
import { formatImgUrl } from "../../helpers";
import { getPassedTime } from "../Post/helpers";

const SinglePost = ({
  inputValue,
  onSendComment,
  onInputChange,
  register,
  errors,
  toggleLike,
  isLiked,
  likeCount,
  comments,
  onReply,
  replyInputRef,
  handleReplyClick,
  openCommentsLikesModal,
  userId,
  openPostLikesModal,
  singlePostData,
  onDotsIconClick,
  backendErrors,
  onShowReplies,
  repliesData,
  isLoadingComments,
  shouldInterrupt,
}) => {
  return (
    <FlexBox>
      <img
        style={{
          objectFit: "cover",
          maxWidth: "800px",
          minWidth: "500px",
          maxHeight: "840px",
        }}
        src={formatImgUrl(singlePostData.postImage)}
      />
      <div style={{ width: "350px", height: "auto" }}>
        <FlexBox
          direction={"column"}
          style={{ height: "100%" }}
          justifyContent={"between"}
        >
          <div>
            <div
              style={{
                borderBottom: "1px solid green",
                padding: "20px 15px",
              }}
            >
              <PostHeader
                author={singlePostData.username}
                location={singlePostData.location}
                userImg={formatImgUrl(singlePostData.userImgURL)}
                unknown
                onIconClick={onDotsIconClick}
              />
            </div>
            {singlePostData.caption && (
              <div
                style={{
                  borderBottom: "1px solid green",
                  padding: "20px 15px",
                }}
              >
                <Description
                  avatarSrc={formatImgUrl(singlePostData.userImgURL)}
                  author={singlePostData.username}
                  description={singlePostData.caption}
                />
              </div>
            )}
            <div
              style={{
                height: "480px",
                borderBottom: "1px solid green",
                padding: "5px 15px",
                overflowY: "scroll",
              }}
            >
              {comments.data.length !== 0 ? (
                <EndlessScroll
                  loadMore={shouldInterrupt}
                  useWindow={false}
                  dataLength={comments.data.length}
                  totalCount={comments.count}
                  isLoading={isLoadingComments}
                >
                  <FlexBox direction={"column"} gap={"small"}>
                    <FlatList
                      data={comments.data}
                      renderItem={(comment) => (
                        <Comment
                          key={comment.commentId}
                          userId={userId}
                          comments={comments.data}
                          author={comment.username}
                          caption={comment.description}
                          commentLikes={comment.commentsLikeCount}
                          likedByUser={comment.likedByUser}
                          postId={comment.postId}
                          passedTime={getPassedTime(comment.createdAt)}
                          commentId={comment.commentId}
                          avatarSrc={formatImgUrl(comment.userImgURL)}
                          onReply={onReply}
                          handleReplyClick={handleReplyClick}
                          reply={comment.reply}
                          authorId={comment.userId}
                          openCommentsLikesModal={openCommentsLikesModal}
                          onShowReplies={onShowReplies}
                          repliesCount={comment.totalReplies}
                          repliesData={repliesData.data}
                        />
                      )}
                    />
                  </FlexBox>
                </EndlessScroll>
              ) : (
                <FlexBox alignItems={"center"} justifyContent={"center"}>
                  <SimpleText content={"No comments yet"} />
                </FlexBox>
              )}
            </div>
          </div>
          <FlexBox direction={"column"}>
            <FlexBox gap={"large"} padding={"small"}>
              <Icon
                iconName={isLiked === "1" ? faHeartSolid : faHeartRegular}
                action={toggleLike}
                size={"m"}
                type={"button"}
              />
              <Icon
                iconName={faComment}
                size={"m"}
                type={"button"}
                action={handleReplyClick}
              />
            </FlexBox>
            <FlexBox padding={"small"}>
              <SimpleText
                color={"fade"}
                content={getPassedTime(singlePostData.createdAt)}
              />
            </FlexBox>
            <FlexBox padding={"small"}>
              {likeCount !== 0 && (
                <TextButton
                  content={`${likeCount} like`}
                  action={openPostLikesModal}
                />
              )}
            </FlexBox>
            <form onSubmit={onSendComment}>
              <SimpleInput
                lable
                placeholder={"Add a comment..."}
                name={"comment"}
                register={register}
                onChangeAction={onInputChange}
                inputValue={inputValue}
                button={inputValue?.length > 0 ? true : false}
                noBreak
                textButtonContent={"Post"}
                errors={errors["comment"]}
                textButtonAction={onSendComment}
                replyInputRef={replyInputRef}
                backendErrors={backendErrors["comment"]}
              />
            </form>
          </FlexBox>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default SinglePost;
