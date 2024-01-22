import { useState } from "react";
import { getMultipleData } from "./useMultipleData.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../axiosConfig";

const useMultipleData = ({ pageSize, path }) => {
  const [data, setData] = useState({
    data: [],
    count: "",
    module: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const resetData = () => {
    setData({
      data: [],
      count: "",
      module: "",
    });
  };

  const resetPage = () => {
    setPage(1);
  };

  const getDataPagination = async (
    identifier,
    conditionalPath = null,
    initialPage = null
  ) => {
    const url =
      BASE_URL +
      `/${!path ? conditionalPath : path}?page=${
        initialPage || page
      }&pageSize=${pageSize}${!!identifier ? `&identifier=${identifier}` : ""}`;
    setIsLoading(true);
    try {
      const response = await getMultipleData(url);
      const { response: resData } = response?.data;
      setData((prevState) => ({
        data: [...prevState.data, ...resData.data],
        count: resData.count,
        module: resData.module,
      }));
      setIsLoading(false);
      setPage(page + 1);
      return response.data.response.data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    getDataPagination,
    data,
    setData,
    isLoading,
    resetData,
    resetPage,
    setPage,
  };
};

export default useMultipleData;
