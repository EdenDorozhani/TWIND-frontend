import { Outlet } from "react-router-dom";
import React from "react";
import Profile from "../pages/Profile/Profile";

const RootProfile = () => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};

export default RootProfile;
