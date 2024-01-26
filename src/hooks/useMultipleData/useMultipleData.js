import { useState } from "react";
import { getMultipleData } from "./useMultipleData.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../axiosConfig";

const useMultipleData = ({ pageSize, path }) => {
  const [responseData, setResponseData] = useState({
    data: [],
    count: "",
    module: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const resetState = () => {
    setResponseData({
      data: [],
      count: "",
      module: "",
    });
    setPage(1);
  };

  const getDataPagination = async ({
    identifier,
    conditionalPath,
    initialPage,
    userLoggedIn,
  }) => {
    const url =
      BASE_URL +
      `/${conditionalPath || path}?page=${
        initialPage || page
      }&pageSize=${pageSize}${identifier ? `&identifier=${identifier}` : ""}${
        userLoggedIn ? `&userLoggedIn=${userLoggedIn}` : ""
      }`;
    setIsLoading(true);
    try {
      const response = await getMultipleData(url);
      if (response) {
        const { response: resData } = response?.data;
        setResponseData((prevState) => ({
          data: [...prevState.data, ...resData.data],
          count: resData.count,
          module: resData.module,
        }));
        setPage(page + 1);
        setIsLoading(false);
        return response.data.response.data;
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const multipleData = {
    responseData,
    isLoading,
    setResponseData,
    getDataPagination,
    resetState,
    setPage,
    setPage,
    page,
  };

  return {
    multipleData,
  };
};

export default useMultipleData;
