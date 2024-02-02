import axios from "axios";

export const getPaginationData = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
