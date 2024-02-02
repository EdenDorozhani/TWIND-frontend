import { Outlet } from "react-router-dom";
import React from "react";
import Home from "../pages/Home/Home";

const RootHome = () => {
  return (
    <>
      <Home />
      <Outlet />
    </>
  );
};

export default RootHome;
