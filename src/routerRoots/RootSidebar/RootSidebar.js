import { Outlet, useNavigate } from "react-router-dom";
import MainSidebar from "../../lib/components/MainSidebar";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { sidebarHelpers } from "./RootSidebarHelpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const RootSidebar = () => {
  const { userLoggedInData, storeData, resetState } = useLoggedInUser();

  const storeUserData = async () => {
    try {
      const response = await sidebarHelpers.getUserData();
      storeData(response);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    storeUserData();
  }, []);

  const resetUserLoggedInData = () => {
    resetState();
  };

  const navigate = useNavigate();

  const onNavigate = sidebarHelpers.onNavigateToLinks(
    navigate,
    userLoggedInData.username,
    userLoggedInData.userImgURL
  );

  return (
    <>
      <MainSidebar
        sideBarLinks={sidebarHelpers.HOME_SIDEBAR_LINKS(
          userLoggedInData.userImgURL
        )}
        action={onNavigate}
        resetUserLoggedInData={resetUserLoggedInData}
      />
      <Outlet />
    </>
  );
};

export default RootSidebar;
