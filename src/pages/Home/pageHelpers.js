export const dateRangeFilter = (notifications) => {
  const currentDate = new Date();

  const newData = notifications.paginationData.data
    .filter((e) => {
      const notificationDate = new Date(e.createdAt);
      const timeDifferenceInSeconds = Math.floor(
        (currentDate - notificationDate) / 1000
      );
      return timeDifferenceInSeconds < 86400;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const thisMonthData = notifications.paginationData.data
    .filter((e) => {
      const notificationDate = new Date(e.createdAt);
      const timeDifferenceInSeconds = Math.floor(
        (currentDate - notificationDate) / 1000
      );
      return (
        timeDifferenceInSeconds > 86400 && timeDifferenceInSeconds < 2678400
      );
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const earlierData = notifications.paginationData.data
    .filter((e) => {
      const notificationDate = new Date(e.createdAt);
      const timeDifferenceInSeconds = Math.floor(
        (currentDate - notificationDate) / 1000
      );
      return timeDifferenceInSeconds > 2678400;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return { newData, thisMonthData, earlierData };
};
