import * as yup from "yup";

import {
  faHome,
  faMagnifyingGlass,
  faRightFromBracket,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

export const HOME_SIDEBAR_LINKS = (userPhoto) => {
  return [
    { content: "Home", icon: faHome, path: "" },
    { content: "Explore", icon: faMagnifyingGlass, path: "explore" },
    { content: "Create", icon: faSquarePlus, path: "create" },
    { content: "Logout", icon: faRightFromBracket, path: "/" },
    {
      content: "Profile",
      src: `http://localhost:3131/${userPhoto}`,
      path: "twind/username",
    },
  ];
};

export const pageSize = 8;

export const dateRangeFilter = (notifications) => {
  const currentDate = new Date();

  const newData = notifications.responseData.data
    .filter((e) => {
      const notificationDate = new Date(e.createdAt);
      const timeDifferenceInSeconds = Math.floor(
        (currentDate - notificationDate) / 1000
      );
      return timeDifferenceInSeconds < 86400;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const thisMonthData = notifications.responseData.data
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

  const earlierData = notifications.responseData.data
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
