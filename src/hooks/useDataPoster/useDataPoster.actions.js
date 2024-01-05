import axios from "axios";

export const postAction = async ({ url, dataToSend, headers }) => {
  try {
    const response = await axios.post(url, { ...dataToSend }, headers);
    return response;
  } catch (err) {
    throw err;
  }
};
