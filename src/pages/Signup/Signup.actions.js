import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const signupAction = async (formData) => {
  const url = BASE_URL + "/auth/signup";
  try {
    const response = await axios.post(url, {
      ...formData,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
