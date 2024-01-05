import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const loginAction = async (formData) => {
  const url = BASE_URL + "/auth/login";
  try {
    const response = await axios.post(url, {
      ...formData,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
