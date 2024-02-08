import { useState } from "react";
import { getPaginationData } from "./usePaginationData.action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../axiosConfig";
import { useNavigate } from "react-router-dom";

const usePaginationData = ({ pageSize, path }) => {
  const [paginationData, setPaginationData] = useState({
    data: [],
    count: 0,
    module: "",
    isEmpty: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [lastElementId, setLastElementId] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const resetState = () => {
    setPaginationData({
      data: [],
      count: "",
      module: "",
      isEmpty: false,
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
    interrupt = false,
  }) => {
    const url =
      BASE_URL +
      `/${conditionalPath || path}?${
        withPages
          ? `page=${page}`
          : `lastElementId=${initialLastElementId ? "" : lastElementId}`
      }&pageSize=${pageSize}${identifier ? `&identifier=${identifier}` : ""}${
        userLoggedIn ? `&userLoggedIn=${userLoggedIn}` : ""
      }&interrupt=${interrupt}`;
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
      if (!err.response) {
        return navigate("/error");
      }
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
