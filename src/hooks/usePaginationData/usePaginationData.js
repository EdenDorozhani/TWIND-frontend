import { useState } from "react";
import { getPaginationData } from "./usePaginationData.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../axiosConfig";

const usePaginationData = ({ pageSize, path }) => {
  const [paginationData, setPaginationData] = useState({
    data: [],
    count: "",
    module: "",
    isEmpty: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastElementId, setLastElementId] = useState("");
  const [page, setPage] = useState(1);

  const resetState = () => {
    setPaginationData({
      data: [],
      count: "",
      module: "",
    });
    setLastElementId("");
    setPage(1);
  };

  const onDeleteFrontEnd = ({ identifier, key }) => {
    setPaginationData((prevState) => ({
      ...prevState,
      data: prevState.data.filter((data) => data[key] !== identifier),
      count: prevState.count - 1,
    }));
  };

  const getDataPagination = async ({
    identifier,
    conditionalPath,
    userLoggedIn,
    initialLastElementId,
    withPages,
  }) => {
    const url =
      BASE_URL +
      `/${conditionalPath || path}?${
        withPages
          ? `page=${page}`
          : `lastElementId=${initialLastElementId ? "" : lastElementId}`
      }&pageSize=${pageSize}${identifier ? `&identifier=${identifier}` : ""}${
        userLoggedIn ? `&userLoggedIn=${userLoggedIn}` : ""
      }`;
    setIsLoading(true);
    try {
      const response = await getPaginationData(url);
      if (response) {
        const { response: resData } = response?.data;
        setPaginationData((prevState) => ({
          data: [...prevState.data, ...resData.data],
          count: resData.count,
          module: resData.module,
          isEmpty: resData.isEmpty,
        }));
        if (withPages) {
          setPage(page + 1);
        } else {
          setLastElementId(resData.lastElementId);
        }

        return response.data.response.data;
      }
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const costumeData = {
    paginationData,
    isLoading,
    setPaginationData,
    getDataPagination,
    resetState,
    onDeleteFrontEnd,
  };

  return {
    costumeData,
  };
};

export default usePaginationData;
