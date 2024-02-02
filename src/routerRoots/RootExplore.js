import { Outlet } from "react-router-dom";
import React from "react";
import Explore from "../pages/Explore/Explore";

const RootExplore = () => {
  return (
    <>
      <Explore />
      <Outlet />
    </>
  );
};

export default RootExplore;
