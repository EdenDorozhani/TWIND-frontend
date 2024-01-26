import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const getSinglePost = async (postId, userId) => {
  const url = BASE_URL + `/getSinglePost?postId=${postId}&userId=${userId}`;
  try {
    const response = await axios.get(url);
    return response.data.response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const postComment = async (description, postId, userId, reply) => {
  const url = BASE_URL + "/twind/post/comment";
  try {
    return axios.post(url, { description, postId, userId, reply });
  } catch (err) {
    throw new Error(err.message);
  }
};
