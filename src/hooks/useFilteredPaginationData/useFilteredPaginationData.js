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
  const [searchBarValue, setSearchBarValue] = useState("");

  const scrollCondition = searchBarValue.length !== 0;

  const getFilteredData = async () => {
    if (!scrollCondition) return;
    const url =
      BASE_URL +
      `/${path}?pageSize=${pageSize}${
        userLoggedIn ? `&userLoggedIn=${userLoggedIn}` : ""
      }${
        identifier ? `&identifier=${identifier}` : ""
      }&value=${searchBarValue}`;
    try {
      const response = await getPaginationData(url);
      setFilteredData({
        data: response.data.response.data,
        module: response.data.response.module,
        count: response.data.response.count,
        isEmpty: response.data.response.isEmpty,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = () => {
      if (searchBarValue.length === 0) {
        setFilteredData({
          data: [],
          module: "",
          count: null,
        });
        return;
      }
      getFilteredData();
    };
    const timer = setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
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
