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

  axios.interceptors.response.use((response) => {
    if (!response.data.error) {
      return response;
    }
    if (response.data.error.code === 401) {
      localStorage.clear();
      navigate("/");
    }
  });
};
