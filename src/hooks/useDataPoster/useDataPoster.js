import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../axiosConfig";
import { postAction } from "./useDataPoster.actions";
import { useState } from "react";
import { fromArrayToObject } from "../../lib/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDataPoster = ({ requestHeader, urlPath }) => {
  const [backendErrors, setBackendErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const setHeaderContentType = () => {
    let headers;
    switch (requestHeader) {
      case "multipart":
        return (headers = {
          headers: { "Content-Type": "multipart/form-data" },
        });
      case "json":
        return (headers = null);
    }
    return headers;
  };

  const url = BASE_URL + `/${urlPath}`;

  const submit = async ({ dataToSend, navigateTo = null, toastScc }) => {
    const headers = setHeaderContentType();
    setIsLoading(true);
    try {
      const response = await postAction({ dataToSend, headers, url });
      if (response.data.success) {
        !toastScc && toast.success(response.data.message);
        navigate(navigateTo);
      }
      return response;
    } catch (err) {
      if (
        err.response.data.response !== null &&
        err.response.data.response.length !== 0
      ) {
        const errors = fromArrayToObject(err.response.data.response);
        setBackendErrors(errors);
      } else {
        toast.error(err.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { submit, backendErrors, setBackendErrors, isLoading };
};

export default useDataPoster;
