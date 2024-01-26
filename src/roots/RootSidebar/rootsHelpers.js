import { HOME_SIDEBAR_LINKS } from "../../pages/Home/pageHelpers";
import axios from "axios";
import { BASE_URL } from "../../axiosConfig";

export const getUserData = async () => {
  const url = BASE_URL + "/getUserLoggedInData";
  try {
    const response = await axios.get(url);
    return response.data.response;
  } catch (err) {
    throw err;
  }
};

export const onNavigateToLinks = (navigate, userLoggedIn, userPhoto) => {
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
