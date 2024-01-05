import { Outlet, useNavigate } from "react-router-dom";
import MainSidebar from "../../lib/components/MainSidebar";
import { getUserData, onNavigateToLinks } from "./rootsHelpers";
import { HOME_SIDEBAR_LINKS } from "../../pages/Home/pageHelpers";
import useLoggedInUser from "../../context/useLoggedInUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const RootSidebar = () => {
  const { userLoggedInData, storeData } = useLoggedInUser();

  const storeUserData = async () => {
    try {
      const response = await getUserData();
      storeData(response);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    storeUserData();
  }, []);

  const navigate = useNavigate();

  const onNavigate = onNavigateToLinks(
    navigate,
    userLoggedInData.username,
    userLoggedInData.userImgURL
  );

  return (
    <>
      <MainSidebar
        sideBarLinks={HOME_SIDEBAR_LINKS(userLoggedInData.userImgURL)}
        action={onNavigate}
      />
      <Outlet />
    </>
  );
};

export default RootSidebar;
