import axios from "axios";

export const getMultipleData = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
