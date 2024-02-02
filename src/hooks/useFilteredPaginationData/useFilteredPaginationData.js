import { useEffect, useState } from "react";
import { BASE_URL } from "../../axiosConfig";
import { getPaginationData } from "../usePaginationData/usePaginationData.action";

const useFilteredPaginationData = ({
  path,
  pageSize,
  identifier,
  userLoggedIn,
}) => {
  const [filteredData, setFilteredData] = useState({
    data: [],
    module: "",
    count: null,
    isEmpty: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchBarValue, setSearchBarValue] = useState("");

  const scrollCondition = searchBarValue.length !== 0;

  const getFilteredData = async ({ initialPage = false }) => {
    if (!scrollCondition) return;
    const url =
      BASE_URL +
      `/${path}?page=${initialPage ? 1 : page}&pageSize=${pageSize}${
        userLoggedIn ? `&userLoggedIn=${userLoggedIn}` : ""
      }${
        identifier ? `&identifier=${identifier}` : ""
      }&value=${searchBarValue}`;
    setIsLoading(true);
    try {
      const response = await getPaginationData(url);
      setFilteredData((prevState) => ({
        data: initialPage
          ? response.data.response.data
          : [...prevState.data, ...response.data.response.data],
        module: response.data.response.module,
        count: response.data.response.count,
        isEmpty: response.data.response.isEmpty,
      }));
      setPage((prevState) => prevState + 1);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchBarValue.length === 0) {
      setFilteredData({
        data: [],
        module: "",
        count: null,
      });
      return;
    }
    setPage(1);
    getFilteredData({ initialPage: true });
  }, [searchBarValue]);

  const getSearchBarValue = (value) => {
    setSearchBarValue(value);
  };

  const resetState = () => {
    setFilteredData({
      data: [],
      module: "",
      count: null,
    });
    setPage(1);
    setSearchBarValue("");
  };

  const filteredPaginationData = {
    setFilteredData,
    getFilteredData,
    getSearchBarValue,
    resetState,
    filteredData,
    isLoading,
    scrollCondition,
    searchBarValue,
  };

  return { filteredPaginationData };
};

export default useFilteredPaginationData;
