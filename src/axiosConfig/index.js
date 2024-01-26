import axios from "axios";

//API URL
export const BASE_URL = "http://localhost:3131";

//MAKING SESSION IMPLEMENT AUTOMATICALLY FOR EVERY API CALL

export const axiosConfigurations = (navigate) => {
  axios.interceptors.request.use((config) => {
    const session = localStorage.getItem("session");
    if (session) {
      config.headers["Authorization"] = `Bearer ${session}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response;
      } else {
        return Promise.reject(new Error("Invalid response structure"));
      }
    },
    (err) => {
      if (err.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }

      return Promise.reject(err);
    }
  );
};
