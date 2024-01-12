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

export const commentValidationSchema = yup.object({
  comment: yup.string().max(200).required("Comment field must not be empty"),
});

export const pageSize = 8;
