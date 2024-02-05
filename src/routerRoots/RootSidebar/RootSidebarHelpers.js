import {
  faHome,
  faMagnifyingGlass,
  faRightFromBracket,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

const getUserData = async () => {
  const url = BASE_URL + "/getUserLoggedInData";
  try {
    const response = await axios.get(url);
    return response.data.response;
  } catch (err) {
    throw err;
  }
};

const HOME_SIDEBAR_LINKS = (userPhoto) => {
  return [
    { content: "Home", icon: faHome, path: "" },
    { content: "Explore", icon: faMagnifyingGlass, path: "explore" },
    { content: "Create", icon: faSquarePlus, path: "create" },
    { content: "Logout", icon: faRightFromBracket, path: "/" },
    {
      content: "Profile",
      src: userPhoto ? `http://localhost:3131/${userPhoto}` : null,
      path: "twind/username",
    },
  ];
};

const onNavigateToLinks = (navigate, userLoggedIn, userPhoto) => {
  return HOME_SIDEBAR_LINKS(userPhoto).reduce((acc, link) => {
    let action;

    switch (link.path) {
      case "":
        action = () => {
          navigate("");
        };
        break;
      case "/":
        action = () => {
          localStorage.removeItem("session");
          navigate("/");
        };
        break;
      case "twind/username":
        action = () => {
          navigate(`${userLoggedIn}`);
        };
        break;
      case "create":
        action = () => {
          navigate("create");
        };
        break;
      case "messages":
        action = () => {
          navigate("messages");
        };
        break;
      case "explore":
        action = () => {
          navigate("explore");
        };
    }
    return { ...acc, [link.path]: action };
  }, {});
};

export const sidebarHelpers = {
  getUserData,
  onNavigateToLinks,
  HOME_SIDEBAR_LINKS,
};
