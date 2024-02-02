import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const postFollowers = async (followerId, followingId, isFollowed) => {
  const url = BASE_URL + `/postFollower`;
  let keyWord;
  if (isFollowed === "0") {
    keyWord = "follow";
  } else {
    keyWord = "unfollow";
  }
  try {
    await axios.post(url, { followingId, followerId, keyWord });
  } catch (err) {
    throw err;
  }
};
