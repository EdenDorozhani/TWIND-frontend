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

  const getDataPagination = async (
    identifier = null,
    conditionalPath = null,
    initialPage = null
  ) => {
    const url =
      BASE_URL +
      `/${!path ? conditionalPath : path}?page=${
        initialPage || page
      }&pageSize=${pageSize}${identifier ? `&identifier=${identifier}` : ""}`;
    setIsLoading(true);
    try {
      const response = await getMultipleData(url);
      const { response: resData } = response?.data;
      setResponseData((prevState) => ({
        data: [...prevState.data, ...resData.data],
        count: resData.count,
        module: resData.module,
      }));
      setPage(page + 1);
      setIsLoading(false);
      return response.data.response.data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const multipleData = {
    responseData,
    isLoading,
    setResponseData,
    getDataPagination,
    resetState,
    setPage,
  };

  return {
    multipleData,
  };
};

export default useMultipleData;
