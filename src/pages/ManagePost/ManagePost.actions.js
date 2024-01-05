import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const postActions = async (formData, postId) => {
  let url;
  if (!postId) {
    url = BASE_URL + "/twind/create";
  } else {
    url = BASE_URL + `/twind/editPost?postId=${postId}`;
  }

  try {
    const response = await axios.post(
      url,
      { ...formData },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getPostData = async (postId) => {
  const url = BASE_URL + `/twind/postData?postId=${postId}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};
