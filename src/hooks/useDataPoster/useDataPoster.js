import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../axiosConfig";
import { postAction } from "./useDataPoster.actions";
import { useState } from "react";
import { fromArrayToObject } from "../../lib/helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useDataPoster = ({ requestHeader, urlPath }) => {
  const [backendErrors, setBackendErrors] = useState({});
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

  const submit = async ({
    dataToSend,
    navigateTo = null,
    toastErr,
    toastScc,
  }) => {
    const headers = setHeaderContentType();
    try {
      const response = await postAction({ dataToSend, headers, url });
      if (response.data.success) {
        !toastScc && toast.success(response.data.message);
        navigate(navigateTo);
      }
      return response;
    } catch (err) {
      if (toastErr || err.response.data.message) {
        return toast.error(err.response.data.message);
      } else {
        const errors = fromArrayToObject(err.response.data.response);
        setBackendErrors(errors);
      }
    }
  };

  return { submit, backendErrors, setBackendErrors };
};

export default useDataPoster;
