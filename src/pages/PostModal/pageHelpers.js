import * as yup from "yup";

export const addCommentValidationSchema = yup.object({
  comment: yup.string().max(200),
});

export const determinePage = (repliesData, id, repliesCount, pageSize) => {
  let page;
  if (!repliesData.hasOwnProperty(id)) {
    page = 1;
  } else if (
    repliesData.hasOwnProperty(id) &&
    repliesData[id]?.length === repliesCount
  ) {
    return;
  } else if (repliesData.hasOwnProperty(id) && !!repliesData[id]) {
    page = repliesData[id].length / pageSize + 1;
  }
  return page;
};

export const setTotalReplies = (setData, identifier, type) => {
  setData((prevState) => ({
    ...prevState,
    data: prevState.data.map((comment) => {
      if (comment.commentId === identifier) {
        return {
          ...comment,
          totalReplies:
            type === "decrease"
              ? comment.totalReplies - 1
              : comment.totalReplies + 1,
        };
      }
      return comment;
    }),
  }));
};
