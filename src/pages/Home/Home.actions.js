import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const postFollowers = async (followerId, followingId, isFollow) => {
  const url = BASE_URL + `/postFollower`;
  let keyWord;
  if (isFollow === "0") {
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

export const getNotificationsData = async () => {
  const url = BASE_URL + `/getNotifications`;

  try {
    await axios.get(url);
  } catch (err) {
    throw err;
  }
};
