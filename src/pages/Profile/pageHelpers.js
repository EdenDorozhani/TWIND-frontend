export const determineFollowersPaginationData = ({
  filteredPaginationData,
  followers,
  profileUserData,
}) => {
  let obj;

  if (filteredPaginationData.scrollCondition) {
    obj = {
      paginationData: filteredPaginationData.filteredData,
      isLoading: filteredPaginationData.isLoading,
      shouldInterrupt: () => filteredPaginationData.getFilteredData({}),
    };
  } else {
    obj = {
      paginationData: followers.paginationData,
      isLoading: followers.isLoading,
      shouldInterrupt: () =>
        followers.getDataPagination({
          identifier: profileUserData.userId,
          withPages: true,
        }),
    };
  }

  return obj;
};
