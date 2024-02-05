import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const getProfileData = async (username) => {
  const url = BASE_URL + `/getProfileUserData?username=${username}`;
  try {
    const response = await axios.get(url);
    return response.data.response;
  } catch (err) {
    throw err;
  }
};
