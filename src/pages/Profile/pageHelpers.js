export const determineResponseData = ({
  scrollCondition,
  followers,
  filteredFollowersData,
  isLoadingFiltered,
  fetchFilteredFollowers,
  profileUserData,
}) => {
  let obj;

  if (scrollCondition) {
    obj = {
      responseData: filteredFollowersData,
      isLoading: isLoadingFiltered,
      shouldInterrupt: () => fetchFilteredFollowers(),
    };
  } else {
    obj = {
      responseData: followers.responseData,
      isLoading: followers.isLoading,
      shouldInterrupt: () =>
        followers.getDataPagination(profileUserData.userId),
    };
  }

  return obj;
};
