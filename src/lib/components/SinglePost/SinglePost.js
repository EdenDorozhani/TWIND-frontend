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
import FlatList from "../FlatList";
import ScrollPagination from "../ScrollPagination";
import { formatImgUrl } from "../../helpers";
import { getPassedTime } from "../../helpers";

const SinglePost = ({
  inputValue,
  onSendComment,
  onInputChange,
  register,
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
  onOpenActionsModal,
  backendErrors,
  onShowReplies,
  repliesData,
  isLoadingComments,
  shouldInterrupt,
  toggleFollow,
  isFollow,
  onUserClickAction,
  updateLikes,
}) => {
  return (
    <FlexBox>
      <img
        src={formatImgUrl(singlePostData.postImage)}
        style={{
          objectFit: "cover",
          maxWidth: "800px",
          maxHeight: "850px",
        }}
      />
      <div style={{ width: "360px", height: "auto" }}>
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
                unknown={isFollow === "1" ? false : true}
                onIconClick={onOpenActionsModal}
                toggleFollow={toggleFollow}
                userId={userId}
                creatorId={singlePostData.creatorId}
                onUserClickAction={() =>
                  onUserClickAction(singlePostData.username)
                }
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
                  action={() => onUserClickAction(singlePostData.username)}
                />
              </div>
            )}
            <div
              style={{
                height: "500px",
                borderBottom: "1px solid green",
                padding: "5px 15px",
                overflowY: "scroll",
              }}
            >
              {comments.data.length !== 0 ? (
                <ScrollPagination
                  loadMore={shouldInterrupt}
                  dataLength={comments.data.length}
                  totalCount={comments.count}
                  isLoading={isLoadingComments}
                  useWindow={false}
                >
                  <FlexBox direction={"column"} gap={"s"}>
                    <FlatList
                      data={comments.data}
                      renderItem={(comment) => (
                        <Comment
                          key={comment.commentId}
                          userId={userId}
                          comments={comment}
                          onReply={onReply}
                          handleReplyClick={handleReplyClick}
                          openCommentsLikesModal={openCommentsLikesModal}
                          onShowReplies={onShowReplies}
                          repliesData={repliesData?.[comment.commentId]}
                          onOpenActionsModal={onOpenActionsModal}
                          onUserClickAction={onUserClickAction}
                          updateLikes={updateLikes}
                          parentCommentId={comment.commentId}
                        />
                      )}
                    />
                  </FlexBox>
                </ScrollPagination>
              ) : (
                <FlexBox alignItems={"center"} justifyContent={"center"}>
                  <SimpleText content={"No comments yet"} />
                </FlexBox>
              )}
            </div>
          </div>
          <FlexBox direction={"column"}>
            <FlexBox gap={"l"} padding={"s"}>
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
            <FlexBox padding={"s"}>
              <SimpleText
                color={"fade"}
                content={getPassedTime(singlePostData.createdAt)}
              />
            </FlexBox>
            <FlexBox padding={"s"}>
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
                border
                textButtonContent={"Post"}
                textButtonAction={onSendComment}
                replyInputRef={replyInputRef}
                backendErrors={backendErrors["description"]}
              />
            </form>
          </FlexBox>
        </FlexBox>
      </div>
    </FlexBox>
  );
};

export default SinglePost;
