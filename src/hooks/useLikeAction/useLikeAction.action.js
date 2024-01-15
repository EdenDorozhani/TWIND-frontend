import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const postLikes = async (id, userId, isLiked, type) => {
  const url = BASE_URL + `/${type}`;
  let keyWord;
  if (isLiked === "0") {
    keyWord = "like";
  } else {
    keyWord = "unLike";
  }
  let key = type === "updatePostLikes" ? "postId" : "commentId";
  try {
    await axios.post(url, { [key]: id, userId, keyWord });
  } catch (err) {
    throw err;
  }
};
