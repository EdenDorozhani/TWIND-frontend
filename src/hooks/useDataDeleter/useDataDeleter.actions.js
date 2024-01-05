import axios from "axios";

export const deleteAction = async (url) => {
  try {
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    throw err;
  }
};
